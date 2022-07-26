import { gql } from "@apollo/client";

export const LOGIN = gql`
  mutation ($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation ($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_SETLIST = gql`
  mutation ($setListName: String!, $setListCreator: String!) {
    addSetlist(setListName: $setListName, setListCreator: $setListCreator) {
      setListName
      likes
      countSongs
      setListCreator
    }
  }
`;

export const DELETE_SETLIST = gql`
  mutation ($setListId: ID!, $setListCreator: String!) {
    deleteSetlist(setListId: $setListId, setListCreator: $setListCreator){
      setListName
    }
  }
`;

export const ADD_SONG = gql`
  mutation (
    $artist: String!
    $image: String!
    $lyrics: String!
    $bpm: Int!
    $embed: String
    $songTitle: String!
  ) {
    addSong(
      songTitle: $songTitle
      artist: $artist
      image: $image
      lyrics: $lyrics
      bpm: $bpm
      embed: $embed
    ) {
      _id
      songTitle
    }
  }
`;

export const ADD_SONG_TO_SETLIST = gql`
  mutation ($_id: ID!, $setListId: ID!) {
    addSongToSetlist(_id: $_id, setListId: $setListId) {
      setListName
      songs {
        _id
      }
    }
  }
`;

export const DELETE_SONG = gql`
  mutation deleteSong($_id: ID!, $setListId: ID!) {
    deleteSong(_id: $_id, setListId: $setListId) {
      songTitle
    }
  }
`;

export const ADD_LIKE = gql`
  mutation addLike($setListId: ID!, $_id: ID!) {
    addLikeToSetlist(setListId: $setListId, _id: $_id) {
      likes
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment(
    $commentText: String!
    $username: String!
    $setList: ID!
  ) {
    addComment(
      commentText: $commentText
      username: $username
      setList: $setList
    ) {
      commentText
    }
  }
`;

export const DELETE_COMMENT = gql`
  mutation deleteComment($_id: ID!) {
    deleteComment(_id: $_id) {
      commentText
    }
  }
`;
