const { Schema, model, default: mongoose } = require("mongoose");

const commentSchema = new Schema(
  {
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
  },
  { timestamps: true }
);

commentSchema.post("save", async (comment) => {
  await mongoose
    .model("User")
    .findOneAndUpdate(
      { username: comment.username },
      { $push: { comments: comment._id } },
      { new: true }
    );
  await mongoose
    .model("Setlist")
    .findOneAndUpdate(
      { setListId: comment.setList },
      { $push: { comments: comment._id } },
      { new: true }
    );
});

commentSchema.post("findOneAndDelete", async (comment) => {
  await mongoose
    .model("User")
    .findOneAndUpdate(
      { username: comment.username },
      { $pull: { comments: comment._id } },
      { new: true }
    );
  await mongoose
    .model("Setlist")
    .findOneAndUpdate(
      { username: comment.username },
      { $pull: { comments: comment._id } },
      { new: true }
    );
});

const Comment = model("Comment", commentSchema);

module.exports = Comment;
