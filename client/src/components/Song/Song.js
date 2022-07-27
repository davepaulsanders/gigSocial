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

export const Song = ({
  song,
  songOrder,
  activeDelete,
  setActiveDelete,
  currentUser,
  setListCreator,
  setBpm,
}) => {
  const setListId = useParams().id;
  const { songTitle, artist, bpm, embed, image, lyrics, _id } = song;
  const [deleteSongMutation, { error }] = useMutation(DELETE_SONG, {
    // refetch get me to refresh cache
    refetchQueries: [{ query: GET_SETLIST, variables: { setListId } }],
  });

  // pull up the options to delete or cancel deleting a song
  const deleteSongMenu = (e) => {
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

  // exit the delete menu
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

  // Delete a song
  const confirmDelete = (e) => {
    e.preventDefault();
    deleteSongMutation({ variables: { _id, setListId } });
    setActiveDelete(false);
  };

  const getNewBpm = (e) => {
    e.preventDefault();
    // remove pulse if it's happening
    document.querySelector(".metronome-circle").classList.remove("pulse");
    // set new bpm
    const newBpm = Number(e.target.getAttribute("data-bpm"));
    setBpm(newBpm);
  };

  return (
    <SONG_CONTAINER className="song position-relative">
      <p className="song-order position-absolute">{songOrder + 1}</p>
      <img className="album-art" src={image} alt="album art" />
      <div className="album-info-container">
        <p className="album-info song-name">{songTitle}</p>
        <p className="album-info">{artist}</p>
      </div>
      <a href={lyrics} target="_blank">
        <img className="lyrics" src={lyricsimg} alt="lyrics" />
      </a>
      <p className="bpm" onClick={getNewBpm} data-bpm={bpm}>
        {bpm}bpm
      </p>
      {currentUser === setListCreator ? (
        <>
          <img
            onClick={deleteSongMenu}
            className="garbage"
            src={garbageIcon}
            alt="delete"
          />
          <div className="confirm-container delete-confirm d-flex justify-content-center position-absolute">
            <BUTTON onClick={confirmDelete} className="delete-button">
              Delete
            </BUTTON>
            <BUTTON onClick={cancelDelete} className="delete-cancel">
              Cancel
            </BUTTON>
          </div>
        </>
      ) : null}
    </SONG_CONTAINER>
  );
};
