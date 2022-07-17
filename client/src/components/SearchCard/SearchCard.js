import React, { useState } from "react";
import {
  SONG_CONTAINER,
  FORM,
  INPUT,
  BUTTON,
} from "../../styled-components/styled-components";
import "./SearchCard.css";
const plus = require("../../assets/plus.png");

export const SearchCard = ({ song, active, setActive, toggleModal }) => {
  const artist = song.primary_artist.name;
  const image = song.song_art_image_thumbnail_url;
  const title = song.title;
  const songId = song.id.toString();

  const chooseSong = (e) => {
    e.preventDefault();
    const activeSongId = e.target.closest(".song-data").getAttribute("id");
    setActive(activeSongId);
  };

  const addSong = (e) => {
    e.preventDefault();
    toggleModal(e);
  };
  console.log(song);
  return (
    <SONG_CONTAINER
      className={songId === active ? "song-data chosen-song" : "song-data"}
      id={song.id}
      onClick={chooseSong}
    >
      <img className="album-art" src={image} alt="album art" />
      <div className="d-flex flex-row">
        <div>
          <p className="px-3 album-info song-name">{title}</p>
          <p className="px-3 album-info">{artist}</p>
        </div>
        <BUTTON
          className={songId === active ? "add-song appear" : "add-song"}
          onClick={addSong}
        >
          Add song
        </BUTTON>
      </div>
    </SONG_CONTAINER>
  );
};
