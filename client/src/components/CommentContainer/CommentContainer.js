import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { APPEARDIV, INPUT } from "../../styled-components/styled-components";
import { ADD_COMMENT } from "../../utils/mutations";
import { GET_SETLIST } from "../../utils/queries";
import { Comment } from "../Comment/Comment";
import "./CommentContainer.css";
const user = require("../../assets/user.png");
export const CommentContainer = ({ username, setListId, setListData }) => {
  // variable for checking if the active delete menu is active in any comment
  const [activeDeleteComment, setActiveDeleteComment] = useState(false);

  const [addNewComment, { error2 }] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_SETLIST, variables: { setListId } }],
  });

  //Add post button if text field has something in it

  const addPostButton = (e) => {
    e.preventDefault();
    const postButton = document.querySelector(".post-button");
    postButton.classList.add("post-appear");
  };
  const removePostButton = (e) => {
    e.preventDefault();
    const postButton = document.querySelector(".post-button");
    if (postButton.classList.contains("post-appear")) {
      postButton.classList.remove("post-appear");
    }
  };

  const addComment = (e) => {
    e.preventDefault();
    const commentText = document.querySelector(".comment-input").value;
    if (commentText === "") {
      return;
    }
    addNewComment({ variables: { commentText, username, setList: setListId } });
    removePostButton(e);
    document.querySelector(".comment-input").value = "";
  };
  return (
    <APPEARDIV
      style={{ animationDelay: "0.2s" }}
      className="comments-width d-flex flex-column align-items-center justify-content-center w-50"
    >
      <div className="comments-container d-flex flex-column align-items-start">
        <h2 className="comment-title">Comments:</h2>
        <form
          className="d-flex align-items-center comment-form"
          onSubmit={addComment}
        >
          <div className="add-comment-container d-flex align-items-center position-relative">
            <img className="current-user" alt="current-user" src={user} />
            <INPUT
              className="comment-input"
              placeholder={`Add a comment as ${username}`}
              onChange={addPostButton}
              onBlur={removePostButton}
            ></INPUT>
            <button className="post-button">Post</button>
          </div>
        </form>
        {setListData.comments.map((comment) => (
          <Comment
            key={comment._id}
            activeDeleteComment={activeDeleteComment}
            setActiveDeleteComment={setActiveDeleteComment}
            setListCreator={setListData.setListCreator}
            currentUser={username}
            comment={comment}
          />
        ))}
      </div>
    </APPEARDIV>
  );
};
