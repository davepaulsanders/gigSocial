import React from "react";
import { SONG_CONTAINER } from "../../styled-components/styled-components";
import "./Setlist.css";
const notes = require("../../assets/notes.png");
const heart = require("../../assets/heart.png");

export const Setlist = ({ username, setlist }) => {
  const colorsArray = ["#444444", "#8A202C", "#2C46B7", "#31502D"];
  const randomColor = colorsArray[Math.floor(Math.random() * 4)];
  const { setListName, countSongs, likes } = setlist;
  return (
    <SONG_CONTAINER>
      <img
        className="setlist-art"
        style={{ backgroundColor: randomColor }}
        src={notes}
        alt="setlist"
      />
      <div className="setlist-info-container">
        <p className="album-info song-name">{setListName}</p>
        <p className="album-info">{username}</p>
      </div>
      <div className="">
        <div className="likes-songs-container">
          <img className="likes" src={heart} alt="likes" />
          <p className="like-count">{likes}</p>
        </div>
        <p className="song-number">{countSongs} songs</p>
      </div>
    </SONG_CONTAINER>
  );
};
