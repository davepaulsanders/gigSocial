import React from "react";
import { BUTTON, SONG } from "../../styled-components/styled-components";
import "./Profile.css";
const lyrics = require("../../assets/lyrics.png");
const notes = require("../../assets/notes.png");
const heart = require("../../assets/heart.png");

const link = `https://api.genius.com/oauth/authorize?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&redirect_uri=https://localhost:3000/profile&scope=me&state=statevalue&response_type=code`;

export const Profile = () => {
  return (
    <div>
      <a href={link}>
        <BUTTON>Click to connect to genius</BUTTON>
      </a>
    </div>
  );
};
