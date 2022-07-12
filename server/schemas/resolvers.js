const { User, Setlist } = require("../models");


const resolvers = {
  Query: {
    user: async (parent, { _id }) => {
      const user = await User.findOne({ _id: _id });
      console.log(user)
      return user;
    },
    getSetlist: async (parent, { _id }) => {
      const setlist = await Setlist.findOne({ _id: _id });
      return setlist;
    },
  },
};

module.exports = resolvers;
