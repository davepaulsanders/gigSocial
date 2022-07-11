const { Schema, model } = require("mongoose");

const commentSchema = new Schema({
  commentText: {
    type: "String",
    required: true,
  },
  username: {
    type: "String",
    required: true,
  },
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
