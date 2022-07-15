import React from "react";
import { BUTTON } from "../../styled-components/styled-components";
import "./Profile.css";
import { useQuery } from "@apollo/client";
import { GET_LINK } from "../../utils/queries"

export const Profile = () => {
  const {loading, data} = useQuery(GET_LINK)
  const { username } = Auth.getProfile().data

  const handleClick = (e) => {
    e.preventDefault()
      const { url } = data.getLink
      window.location.assign(url)
  }
  return (
    <div>
      <Header />
      <div className="profile-container">
        <p className="genius-prompt">
          Hey <span className="username">{username}</span>, you need to log in or create an account at Genius to use{" "}
          <span className="gig-social">Gig Social!</span>
        </p>
          <BUTTON onCLick={handleClick}>Connect</BUTTON>
      </div>
        <Song />
        <Setlist />
    </div>
  );
};
