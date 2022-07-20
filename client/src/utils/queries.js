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
        commentText
        username
      }
    }
  }
`;