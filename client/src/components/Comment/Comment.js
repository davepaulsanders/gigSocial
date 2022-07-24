import React from "react";
import "./Comment.css";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "../../utils/mutations";
import { GET_SETLIST } from "../../utils/queries";

// images
const user = require("../../assets/user.png");
const trash = require("../../assets/black-trash.png");

export const Comment = ({
  comment,
  currentUser,
  setListCreator,
  activeDeleteComment,
  setActiveDeleteComment,
}) => {
  const { commentText, username, setList, _id } = comment;

  const [deleteComment, { error }] = useMutation(DELETE_COMMENT, {
    refetchQueries: [{ query: GET_SETLIST, variables: { setListId: setList } }],
  });

  // open delete comment menu
  const openDeleteConfirm = (e) => {
    e.preventDefault();

    const closestContainer = e.target.previousElementSibling;
    // if any other comment has the delete menu open
    if (activeDeleteComment) {
      return;
    }
    // find delete container

    closestContainer.classList.add("delete-container-appear");
    setActiveDeleteComment(true);
  };

  // close delete comment menu
  const closeDeleteConfirm = (e) => {
    e.preventDefault();
    const closestContainer = e.target.closest(".delete-comment-container");
    closestContainer.classList.remove("delete-container-appear");
    setActiveDeleteComment(false);
  };

  // delete comment
  const confirmCommentDelete = (e) => {
    e.preventDefault();
    deleteComment({ variables: { _id } });
    setActiveDeleteComment(false);
  };

  return (
    <div className="d-flex justify-content-center position-relative overflow-hidden">
      <div className="comment">
        <img className="user-avatar" alt="user-avatar" src={user} />
        <p className="comment-text">
          <span className="username">{username}</span>
          {commentText}
        </p>
      </div>
      {/* If the viewer created the setlist, or they made the specific comment */}
      {currentUser === setListCreator || currentUser === username ? (
        <>
          <div className="delete-comment-container">
            <button
              className="delete-comment-confirm"
              onClick={confirmCommentDelete}
            >
              Delete
            </button>
            <button
              className="delete-comment-cancel"
              onClick={closeDeleteConfirm}
            >
              Cancel
            </button>
          </div>
          <img
            className="comment-trash"
            alt="delete comment"
            src={trash}
            onClick={openDeleteConfirm}
          />
        </>
      ) : null}
    </div>
  );
};
