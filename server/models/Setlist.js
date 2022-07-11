const { Schema, model } = require("mongoose");

const setListSchema = new Schema({
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
  likes: {
    type: Number,
    default: 0,
  },
});

// add created at and updated at
setListSchema.set("timestamps", true);

const Setlist = model("Setlist", setListSchema);

module.exports = Setlist;
