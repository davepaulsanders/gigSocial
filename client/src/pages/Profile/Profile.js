import React from "react";
import { BUTTON, SONG } from "../../styled-components/styled-components";
import "./Profile.css";
import { Header } from "../../components/Header/Header";
// const link = `https://api.genius.com/oauth/authorize?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=https://localhost:3000/profile&scope=me&state=statevalue&response_type=code`;
import Auth from "../../utils/frontEndAuth"
export const Profile = () => {

  const { username, _id } = Auth.getProfile().data
  return (
    <div>
      <Header />
      <div className="profile-container">
        <p className="genius-prompt">
          Hey <span className="username">{username}</span>, you need to log in or create an account at Genius to use{" "}
          <span className="gig-social">Gig Social!</span>
        </p>
        <a href="">
          <BUTTON>Connect</BUTTON>
        </a>
      </div>
    </div>
  );
};
