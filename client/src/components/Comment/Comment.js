import React from "react";
import "./Comment.css";
const user = require("../../assets/user.png");
export const Comment = ({ comment }) => {
  const { commentText, username } = comment;
  
  return (
    <div className="d-flex justify-content-center">
      <div className="comment">
        <img className="user-avatar" src={user} alt="" />
        <p className="comment-text">
          <span className="username">{username}</span>{commentText}
        </p>
      </div>
    </div>
  );
};
