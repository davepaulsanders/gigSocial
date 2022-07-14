import React from "react";
import { SONG_CONTAINER } from "../../styled-components/styled-components";
import "./Song.css";
const lyrics = require("../../assets/lyrics.png");
export const Setlist = () => {
  return (
    <SONG_CONTAINER>
      <img
        className="album-art"
        src="https://images.genius.com/5bcfb76690b3fb068a317c76579b70b5.300x300x1.jpg"
        alt="album art"
      />
      <div className="album-info-container">
        <p className="album-info song-name">Chandelier</p>
        <p className="album-info">Sia</p>
      </div>
      <p className="bpm">150bpm</p>
      <img className="lyrics" src={lyrics} alt="lyrics" />
    </SONG_CONTAINER>
  );
};
