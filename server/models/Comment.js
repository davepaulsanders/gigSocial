const { Schema, model, default: mongoose } = require("mongoose");

const commentSchema = new Schema({
  commentText: {
    type: "String",
    required: true,
  },
  username: {
    type: "String",
    required: true,
  },
  setList: {
    type: Schema.Types.ObjectId,
    required: true,
  },
});

commentSchema.post("save", async (comment) => {
  await model("User").findOneAndUpdate(
    { username: comment.username },
    { $push: { comments: comment._id } },
    { new: true }
  );
  await model("Setlist").findOneAndUpdate(
    { _id: comment.setList },
    { $push: { comments: comment._id } },
    { new: true }
  );
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
