import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { ADD_SONG, ADD_SONG_TO_SETLIST } from "../../utils/mutations";
import { GET_SETLIST } from "../../utils/queries";
import {
  SONG_CONTAINER,
  FORM,
  INPUT,
  BUTTON,
} from "../../styled-components/styled-components";
import "./SearchCard.css";
const plus = require("../../assets/plus.png");

export const SearchCard = ({ song, active, setActive, toggleModal }) => {
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
      toggleModal(e)
    } catch (err) {
      console.log(err);
    }
  };

  if (!songChosen) {
    return (
      <SONG_CONTAINER
        className={songId === active ? "song-data chosen-song" : "song-data"}
        id={song.id}
        onClick={highlightSong}
      >
        <img className="album-art" src={image} alt="album art" />
        <div className="d-flex flex-row">
          <div>
            <p className="px-3 album-info song-name">{songTitle}</p>
            <p className="px-3 album-info">{artist}</p>
          </div>
          <BUTTON
            className={songId === active ? "add-song appear" : "add-song"}
            onClick={selectSong}
          >
            Add song
          </BUTTON>
        </div>
      </SONG_CONTAINER>
    );
  } else {
    return (
      <SONG_CONTAINER
        className={songId === active ? "song-data chosen-song" : "song-data"}
        id={song.id}
        onClick={highlightSong}
      >
        <img className="album-art" src={image} alt="album art" />
        <p>Choose a bpm</p>
        <select id="bpm-select">
          <option value="60" key="">
            60
          </option>
          <option value="70" key="">
            70
          </option>
          <option value="80" key="">
            80
          </option>
          <option value="90" key="">
            90
          </option>
          <option value="100" key="">
            100
          </option>
        </select>
        <BUTTON onClick={addToSetlist}>Add</BUTTON>
      </SONG_CONTAINER>
    );
  }
};
