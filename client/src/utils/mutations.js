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
      username
    }
  }
`;
