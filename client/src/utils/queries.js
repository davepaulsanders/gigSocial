import { gql } from "@apollo/client";

export const GET_LINK = gql`
query getLink {
    getLink {
      url
    } 
  }
  `