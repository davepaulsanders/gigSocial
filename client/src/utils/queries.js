import { gql } from "@apollo/client";

export const GET_LINK = gql`
  query getLink {
    getLink {
      url
    }
  }
`;

export const GET_CLIENT = gql`
  query getClient {
    getClient {
      id
      secret
    }
  }
`;

export const GET_ME = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      username
      email
      setlists {
        setListId
        setListCreator
        setListName
        likes
        countSongs
      }
    }
  }
`;
export const GET_SETLIST = gql`
  query setlist($setListId: ID!) {
    getSetlist(setListId: $setListId) {
      setListName
      setListCreator
      setListId
      likes
      songs {
        _id
        songTitle
        artist
        image
        bpm
        embed
        lyrics
      }
      comments {
        _id
        setList
        createdAt
        commentText
        username
      }
    }
  }
`;

export const GET_ALL_SETLISTS = gql`
  query getAllSetlists($username: String!) {
    getAllSetlists(username: $username) {
      setListName
      setListCreator
      setListId
      likes
      songs {
        _id
        songTitle
        artist
        image
        bpm
        embed
        lyrics
      }
    }
  }
`;
