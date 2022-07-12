const { Schema, model } = require("mongoose");

const songSchema = new Schema({
  songTitle: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
  },
  image: {
    type: String,
  },
  bpm: {
    type: Number,
  },
  embed: {
    type: String,
  },
  lyrics: {
    type: String,
  },
});

const Song = model("Song", songSchema);

module.exports = Song;
