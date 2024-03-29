const { User, Setlist, Song, Comment } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");
require("dotenv").config();

const resolvers = {
  Query: {
    user: async (parent, { _id }, context) => {
      if (context.user) {
        const user = await (
          await User.findOne({ _id: _id })
        ).populate("setlists");

        return user;
      }
    },
    getSetlist: async (parent, { setListId }, context) => {
      if (context.user) {
        const setlist = await Setlist.findOne({ setListId })
          .populate("songs")
          .populate({
            path: "comments",
            options: { sort: { createdAt: -1 } },
          });
        return setlist;
      }
    },
    getLink: async (parent, args) => {
      // grabbing genius link from env
      const linkUrl = process.env.GENIUS_LINK;
      // returning it
      return { url: linkUrl };
    },
    getClient: async (parent, args, context) => {
      if (context.user) {
        const id = process.env.CLIENT_ID;
        const secret = process.env.CLIENT_SECRET;
        return { id, secret };
      }
    },
    getAllSetlists: async (parent, { username }, context) => {
      if (context.user) {
        const setlists = await Setlist.find({
          setListCreator: { $ne: username },
        });
        return setlists;
      }
    },
  },
  Mutation: {
    addUser: async (parent, args) => {
      try {
        // create user
        const user = await User.create(args);
        // sign token with user info
        const token = signToken(user);
        // send both back
        return { token, user };
      } catch (err) {
        if (err) {
          return err;
        }
      }
    },
    login: async (parent, args) => {
      try {
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
      } catch (err) {
        if (err) {
          console.log(err);
          return err;
        }
      }
    },
    addSetlist: async (parent, args, context) => {
      if (context.user) {
        try {
          // create setlist
          const setlist = await Setlist.create(args);
          return setlist;
        } catch (err) {
          console.log(err);
        }
      }
    },
    addSong: async (parent, args, context) => {
      if (context.user) {
        // create song
        const song = await Song.create(args);
        return song;
      }
    },
    addSongToSetlist: async (parent, { _id, setListId }, context) => {
      if (context.user) {
        // find setlist and update array of song ids
        const setlist = await Setlist.findOneAndUpdate(
          { setListId },
          { $push: { songs: _id } },
          { new: true }
        );
        return setlist;
      }
    },
    addLikeToSetlist: async (parent, { setListId, _id }, context) => {
      if (context.user) {
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
      }
    },
    addComment: async (parent, args, context) => {
      if (context.user) {
        // create comment
        const comment = await Comment.create(args);
        return comment;
      }
    },
    deleteSong: async (parent, { _id, setListId }, context) => {
      if (context.user) {
        // delete song
        const song = await Song.findOneAndDelete({ _id });
        const setList = await Setlist.findOneAndUpdate(
          { setListId },
          { $pull: { songs: _id } }
        );
        return song;
      }
    },
    deleteSetlist: async (parent, { setListId, setListCreator }, context) => {
      if (context.user) {
        // delete the setlist
        const setlist = await Setlist.findOneAndDelete({ setListId });
        // also delete the record of the setlist in the user model
        await User.findOneAndUpdate(
          { username: setListCreator },
          { $pull: { setlists: setlist.setListId } },
          { new: true }
        );

        return setlist;
      }
    },
    deleteComment: async (parent, { _id }, context) => {
      if (context.user) {
        // delete comment, comment is deleted in user and setlist in model middleware
        const comment = await Comment.findOneAndDelete({ _id });
        return comment;
      }
    },
  },
};

module.exports = resolvers;
