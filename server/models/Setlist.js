const { Schema, model, default: mongoose } = require("mongoose");
const User = require("./User");
const setListSchema = new Schema(
  {
    setListId: {
      type: Schema.Types.ObjectId,
      unique: true,
      required: true,
      auto: true,
    },
    setListName: {
      type: String,
      required: true,
      trim: true,
    },
    setListCreator: {
      type: String,
      required: true,
    },
    songs: [
      {
        type: Schema.Types.ObjectId,
        ref: "Song",
      },
    ],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    likes: {
      type: Number,
      default: 0,
    },
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

// add created at and updated at
setListSchema.set("timestamps", true);

setListSchema.post("save", async (setlist) => {
  await User.findOneAndUpdate(
    { username: setlist.setListCreator },
    { $push: { setlists: setlist._id } },
    { new: true }
  );
});

setListSchema.virtual("countSongs").get(function () {
  return this.songs.length;
});
const Setlist = model("Setlist", setListSchema);

module.exports = Setlist;
