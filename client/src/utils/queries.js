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
        setListName
        likes
        countSongs
      }
    }
  }
`;
