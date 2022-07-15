import { gql } from "@apollo/client";

export const GET_LINK = gql`
query getLink {
    getLink {
      url
    } 
  }
  `

export const GET_CLIENT = gql`
query getClient {
    getClient {
      id
      secret
    } 
  }
  `