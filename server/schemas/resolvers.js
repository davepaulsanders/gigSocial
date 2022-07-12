const { User, Setlist } = require("../models");
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
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const passwordValidation = await user.isCorrectPassword(password);
      if (!passwordValidation) {
        throw new AuthenticationError("Incorrect credentials");
      }
      const token = signToken(user);
      return { token, user };
    },
  },
};

module.exports = resolvers;
