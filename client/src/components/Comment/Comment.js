import React from "react";
import "./Comment.css";
const user = require("../../assets/user.png");
export const Comment = () => {
  return (
    <div className="d-flex justify-content-center">
      <div className="comment">
        <img className="user-avatar" src={user} alt="" />
        <p className="comment-text">
          <span className="username">margenice</span>
          This is the comment I'm making. I want it to be semi-long so I can see
          what it looks like
        </p>
      </div>
    </div>
  );
};
