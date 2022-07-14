import React from "react";
import { BUTTON } from "../../styled-components/styled-components";
import "./Profile.css";
import { Header } from "../../components/Header/Header";
import Auth from "../../utils/frontEndAuth"
import { Song } from "../../components/Song/Song"
import { Setlist } from "../../components/Setlist/Setlist"

const CLIENT_ID =
"Q5kRxC0twZ2MRDhNOFRYuNme6W1LiGmPols-Dddpwup8cnBQ5AB9h-mk_Y11O43M";
const CLIENT_SECRET =
"UDZmx2IDkOMuHphTTh6J3YU77NxcZqX2tpdx5bQykIGKWlnIGRp1rngHPSRG_Xy7vFuGPmoUJRszeAfDBT4iFQ";

// link to request token from Genius
const link = `https://api.genius.com/oauth/authorize?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=http://localhost:3000/profile&scope=me&state=statevalue&response_type=code`;

export const Profile = () => {

  const { username } = Auth.getProfile().data
  return (
    <div>
      <Header />
      <div className="profile-container">
        <p className="genius-prompt">
          Hey <span className="username">{username}</span>, you need to log in or create an account at Genius to use{" "}
          <span className="gig-social">Gig Social!</span>
        </p>
        <a href={link}>
          <BUTTON>Connect</BUTTON>
        </a>
      </div>
        <Song />
        <Setlist />
    </div>
  );
};
