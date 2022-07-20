import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { SONG_CONTAINER } from "../../styled-components/styled-components";
import "./Song.css";
import { useMutation } from "@apollo/client";
import { DELETE_SONG } from "../../utils/mutations";
import { GET_SETLIST } from "../../utils/queries";
import { BUTTON } from "../../styled-components/styled-components";
const lyricsimg = require("../../assets/lyrics.png");
const garbageIcon = require("../../assets/garbage.png");

export const Song = ({ song, activeDelete, setActiveDelete }) => {
  const setListId = useParams().id;
  const { songTitle, artist, bpm, embed, image, lyrics, _id } = song;
  const [deleteSongMutation, { error }] = useMutation(DELETE_SONG, {
    // refetch get me to refresh cache
    refetchQueries: [{ query: GET_SETLIST, variables: { setListId } }],
  });

  const deleteSong = (e) => {
    e.preventDefault();

    if (activeDelete) {
      return;
    }
    // have to find the closest parent first, otherwise it will only select the first one
    const closestSong = e.target.closest(".song");
    closestSong
      .querySelector(".delete-confirm")
      .classList.add("delete-confirm-visible");
    closestSong
      .querySelector(".delete-cancel")
      .classList.add("delete-confirm-visible");
    setActiveDelete(true);
  };

  const cancelDelete = (e) => {
    e.preventDefault();
    const closestSong = e.target.closest(".song");
    closestSong
      .querySelector(".delete-confirm")
      .classList.remove("delete-confirm-visible");
    closestSong
      .querySelector(".delete-cancel")
      .classList.remove("delete-confirm-visible");
    setActiveDelete(false);
  };

  const confirmDelete = (e) => {
    e.preventDefault();
    deleteSongMutation({ variables: { _id, setListId } });
    setActiveDelete(false)
  };
  return (
    <SONG_CONTAINER className="song position-relative justify-content-center align-items-center">
      <img className="album-art" src={image} alt="album art" />
      <div className="album-info-container">
        <p className="album-info song-name">{songTitle}</p>
        <p className="album-info">{artist}</p>
      </div>
      <a href={lyrics}>
        <img className="lyrics" src={lyricsimg} alt="lyrics" />
      </a>
      <p className="bpm">{bpm}bpm</p>
      <img
        onClick={deleteSong}
        className="garbage"
        src={garbageIcon}
        alt="delete"
      />
      <div className="d-flex position-absolute">
        <BUTTON onClick={confirmDelete} className="delete-confirm">
          Delete
        </BUTTON>
        <BUTTON onClick={cancelDelete} className="delete-cancel">
          Cancel
        </BUTTON>
      </div>
    </SONG_CONTAINER>
  );
};
