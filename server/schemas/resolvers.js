const { User, Setlist, Song } = require("../models");
const { signToken } = require("../utils/auth");
const { AuthenticationError } = require("apollo-server-express");

const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      const user = await User.findOne({ _id: _id });
      console.log(user);
      return user;
    },
    getSetlist: async (parent, { _id }) => {
      const setlist = await Setlist.findOne({ _id: _id });
      return setlist;
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
    addSongToSetlist: async (parent, { _id, setListName }) => {
      // find setlist and update array of song ids
      const setlist = await Setlist.findOneAndUpdate(
        { setListName },
        { $push: { songs: _id } },
        { new: true }
      );
      return setlist;
    },
    deleteSong: async (parent, { _id, setListName }) => {
      // delete song
      const song = await Song.findOneAndDelete({ _id });
      await Setlist.findOneAndUpdate(
        { setListName },
        { $pull: { songs: { _id } } }
      );
      return song;
    },
    deleteSetlist: async (parent, { _id, setListCreator }) => {
      const setlist = await Setlist.findOneAndDelete({ _id });

      await User.findOneAndUpdate(
        { username: setListCreator },
        { $pull: { setlists: setlist._id } },
        { new: true }
      );

      return setlist;
    },
  },
};

module.exports = resolvers;
