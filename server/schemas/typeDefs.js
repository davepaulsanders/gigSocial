const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID
    username: String
    email: String
    password: String
    setlists: [Setlist]
    comments: [Comment]
  }
  type Setlist {
    _id: ID
    setListName: String
    setListCreator: String
    songs: [Song]
    comments: [Comment]
    likes: Int
    createdAt: String
    updatedAt: String
    countSongs: Int
  }
  type Song {
    _id: ID
    songTitle: String
    artist: String
    image: String
    bpm: Int
    embed: String
    lyrics: String
  }
  type Comment {
    _id: ID
    commentText: String
    username: String
    setList: ID
  }
  type Auth {
    token: ID!
    user: User
  }
  type Genius {
    url: String
  }
  type Client {
    id: String
    secret: String
  }
  type Query {
    user(_id: ID!): User
    getSetlist(_id: ID): Setlist
    getLink: Genius
    getClient: Client
  }
  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    addSetlist(setListName: String!, setListCreator: String!): Setlist
    addSong(
      songTitle: String!
      artist: String!
      image: String!
      lyrics: String!
      bpm: Int
      embed: String!
    ): Song
    addSongToSetlist(_id: ID!, setListName: String): Setlist
    addComment(commentText: String!, username: String!, setList: ID!): Comment
    deleteSetlist(_id: ID!, setListCreator: String!): Setlist
    deleteSong(_id: ID!, setListName: String!): Song
    deleteComment(_id: ID!): Comment
  }
`;

module.exports = typeDefs;
