import React from "react";
import { SONG_CONTAINER } from "../../styled-components/styled-components";
import "./Setlist.css";
const notes = require("../../assets/notes.png");
const heart = require("../../assets/heart.png");
export const Setlist = () => {
  return (
    <SONG_CONTAINER>
      <img className="setlist-art" src={notes} alt="setlist" />
      <div className="album-info-container">
        <p className="album-info song-name">Setlist 1</p>
        <p className="album-info">davepsandy</p>
      </div>
      <div className="setlist-info-container">
        <div className="likes-songs-container">
          <img className="likes" src={heart} alt="likes" />
          <p className="like-count">25</p>
        </div>
        <p className="song-number">10 songs</p>
      </div>
    </SONG_CONTAINER>
  );
};
