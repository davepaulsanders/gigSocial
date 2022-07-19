import React from "react";
import { SONG_CONTAINER } from "../../styled-components/styled-components";
import "./Song.css";
const lyricsimg = require("../../assets/lyrics.png");

export const Song = ({ setListCreator, song }) => {
  const { songTitle, artist, bpm, embed, image, lyrics } = song;
  return (
    <SONG_CONTAINER>
      <img className="album-art" src={image} alt="album art" />
      <div className="album-info-container">
        <p className="album-info song-name">{songTitle}</p>
        <p className="album-info">{artist}</p>
      </div>
      <p className="bpm">{bpm}bpm</p>
      <a href={lyrics}>
        <img className="lyrics" src={lyricsimg} alt="lyrics" />
      </a>
    </SONG_CONTAINER>
  );
};
