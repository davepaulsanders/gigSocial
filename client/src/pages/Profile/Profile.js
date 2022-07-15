import React from "react";
import { BUTTON } from "../../styled-components/styled-components";
import "./Profile.css";
import { useQuery } from "@apollo/client";
import { GET_LINK } from "../../utils/queries"

const link = ""

export const Profile = () => {
  
  const {loading, data} = useQuery(GET_LINK)
  const handleClick = (e) => {
    e.preventDefault()
      const { url } = data.getLink
      window.location.assign(url)
  }
  
  return (
    <div>
        <BUTTON onClick={handleClick}>Click to connect to genius</BUTTON>
    </div>
  );
};
