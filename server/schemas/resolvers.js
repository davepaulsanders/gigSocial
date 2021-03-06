const { User, Setlist, Song, Comment } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      const user = await (
        await User.findOne({ _id: _id })
      ).populate("setlists");

      return user;
    },
    getSetlist: async (parent, { setListId }) => {
      const setlist = await Setlist.findOne({ setListId })
        .populate("songs")
        .populate({
          path: "comments",
          sort: { createdAt: 1 },
        });
      return setlist;
    },
    getLink: async (parent, args) => {
      // grabbing genius link from env
      const linkUrl = process.env.GENIUS_LINK;
      // returning it
      return { url: linkUrl };
    },
    getClient: async (parent, args) => {
      const id = process.env.CLIENT_ID;
      const secret = process.env.CLIENT_SECRET;
      return { id, secret };
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      // create user
      const user = await User.create(args);
      // sign token with user info
      const token = signToken(user);
      // send both back
      return { token, user };
    },
    login: async (parent, args) => {
      const { email, password } = args;
      // find the user
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // check password
      const passwordValidation = await user.isCorrectPassword(password);

      if (!passwordValidation) {
        throw new AuthenticationError("Incorrect credentials");
      }
      // sign token with user info
      const token = signToken(user);
      return { token, user };
    },
    addSetlist: async (parent, args) => {
      try {
        // create setlist
        const setlist = await Setlist.create(args);
        return setlist;
      } catch (err) {
        console.log(err);
      }
    },
    addSong: async (parent, args) => {
      // create song
      const song = await Song.create(args);
      return song;
    },
    addSongToSetlist: async (parent, { _id, setListId }) => {
      // find setlist and update array of song ids
      const setlist = await Setlist.findOneAndUpdate(
        { setListId },
        { $push: { songs: _id } },
        { new: true }
      );
      return setlist;
    },
    addLikeToSetlist: async (parent, { setListId, _id }) => {
      // check if the user has already liked the setlist
      const user = await User.findOne({
        _id,
      });
      const checkForSetlist = user.likedSetlists.indexOf(setListId);
      // if they haven't, add a like to the setlist
      if (checkForSetlist === -1) {
        const setlist = await Setlist.findOneAndUpdate(
          { setListId },
          { $inc: { likes: 1 } }
        );
        // add the setlist to the user's liked setlists
        await User.findOneAndUpdate(
          { _id },
          { $push: { likedSetlists: setListId } },
          { new: true }
        );
        return setlist;
      } else {
        // if they have liked the setlist, decrement the like instead
        const setlist = await Setlist.findOneAndUpdate(
          { setListId },
          { $inc: { likes: -1 } }
        );
        await User.findOneAndUpdate(
          { _id },
          { $pull: { likedSetlists: setListId } },
          { new: true }
        );
        return setlist;
      }
    },
    addComment: async (parent, args) => {
      // create comment
      const comment = await Comment.create(args);
      return comment;
    },
    deleteSong: async (parent, { _id, setListId }) => {
      // delete song
      const song = await Song.findOneAndDelete({ _id });
      const setList = await Setlist.findOneAndUpdate(
        { setListId },
        { $pull: { songs: _id } }
      );
      console.log(setList);
      return song;
    },
    deleteSetlist: async (parent, { _id, setListCreator }) => {
      // delete the setlist
      const setlist = await Setlist.findOneAndDelete({ _id });
      // also delete the record of the setlist in the user model
      await User.findOneAndUpdate(
        { username: setListCreator },
        { $pull: { setlists: setlist._id } },
        { new: true }
      );

      return setlist;
    },
    deleteComment: async (parent, { _id }) => {
      // delete comment, comment is deleted in user and setlist in model middleware
      const comment = await Comment.findOneAndDelete({ _id });
      return comment;
    },
  },
};

module.exports = resolvers;
