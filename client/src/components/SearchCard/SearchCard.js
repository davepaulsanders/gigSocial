import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_SONG, ADD_SONG_TO_SETLIST } from "../../utils/mutations";
import { GET_SETLIST } from "../../utils/queries";
import {
  SONG_CONTAINER,
  BUTTON,
} from "../../styled-components/styled-components";
import "./SearchCard.css";
const plus = require("../../assets/plus.png");

export const SearchCard = ({ song, active, setActive, closeModal }) => {
  // variables used for queries and rendering

  const artist = song.primary_artist.name;
  const image = song.song_art_image_thumbnail_url;
  const songTitle = song.title;
  const songId = song.id.toString();
  const lyrics = song.url;
  const setListId = useParams().id;
  const [songChosen, setSongChosen] = useState(false);

  const [addSong, { error }] = useMutation(ADD_SONG);
  const [addSongToSetList, { error1 }] = useMutation(ADD_SONG_TO_SETLIST, {
    // refetch get me to refresh cache
    refetchQueries: [{ query: GET_SETLIST, variables: { setListId } }],
  });

  // show that song is selected
  const highlightSong = (e) => {
    e.preventDefault();
    const activeSongId = e.target.closest(".song-data").getAttribute("id");
    setActive(activeSongId);
  };

  // select song and render bpm select
  const selectSong = (e) => {
    e.preventDefault();
    setSongChosen(true);
  };

  // add song to setlist
  const addToSetlist = async (e) => {
    e.preventDefault();
    // getting parent node and bpm from select
    const activeSong = e.target.closest(".song-data");
    const bpm = Number(activeSong.querySelector("#bpm-select").value);
    try {
      const songInfo = await addSong({
        variables: {
          lyrics: lyrics,
          artist: artist,
          bpm: bpm,
          songTitle: songTitle,
          image: image,
        },
      });
      const { _id } = songInfo.data.addSong;
      await addSongToSetList({ variables: { _id: _id, setListId: setListId } });
      closeModal(e);
    } catch (err) {
      console.log(err);
    }
  };

  if (!songChosen) {
    return (
      <SONG_CONTAINER
        className={
          songId === active
            ? "song-data chosen-song position-relative"
            : "song-data position-relative"
        }
        id={song.id}
        onClick={highlightSong}
      >
        <img className="album-art" src={image} alt="album art" />
        <div className="d-flex flex-row justify-content-between">
          <div className="info-album">
            <p className="px-3 album-info song-name">{songTitle}</p>
            <p className="px-3 album-info">{artist}</p>
          </div>
          <BUTTON
            className={songId === active ? "add-song appear" : "add-song"}
            onClick={selectSong}
          >
            Add
          </BUTTON>
        </div>
      </SONG_CONTAINER>
    );
    // If there is an active song and it matches the songId of this song
  } else if (songChosen && active === songId) {
    return (
      <SONG_CONTAINER
        className={
          songId === active
            ? "song-data chosen-song width-increase"
            : "song-data"
        }
        id={song.id}
        onClick={highlightSong}
      >
        <img className="album-art album-increase" src={image} alt="album art" />
        <div className="d-flex">
          <div className="bpm-container d-flex flex-column justify-content-center">
            <p className="choose-bpm-title my-0">Choose a bpm</p>
            <select id="bpm-select">
              
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
              <option value="100">100</option>
            </select>
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <BUTTON className="add-cancel-button" onClick={addToSetlist}>
              Add
            </BUTTON>
            <BUTTON
              className="add-cancel-button cancel"
              onClick={() => setSongChosen(false)}
            >
              Cancel
            </BUTTON>
          </div>
        </div>
      </SONG_CONTAINER>
    );
  }
};
