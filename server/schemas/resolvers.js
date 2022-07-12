const { User, Setlist } = require("../models");
const { signToken } = require("../utils/auth");

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
  },
};

module.exports = resolvers;
