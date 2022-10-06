import React from "react";
import {
  SONG_CONTAINER,
  BUTTON,
} from "../../styled-components/styled-components";
import { DELETE_SETLIST } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
import { useMutation } from "@apollo/client";

import "./Setlist.css";
const notes = require("../../assets/notes.png");
const heart = require("../../assets/heart.png");
const garbageIcon = require("../../assets/garbage.png");

export const Setlist = ({ userId, username, setlist }) => {
  const colorsArray = [
    "#444444",
    "#8A202C",
    "#2C46B7",
    "#31502D",
    "#F078A2",
    "#D09172",
    "#A5BBD2",
  ];
  const randomColor = colorsArray[Math.floor(Math.random() * 7)];
  const { setListId, setListCreator, setListName, countSongs, likes } = setlist;
  const [deleteSetlist, { error }] = useMutation(DELETE_SETLIST, {
    refetchQueries: [{ query: GET_ME, variables: { _id: userId } }],
  });

  // open delete setlist menu
  const deleteSetlistMenu = (e) => {
    e.preventDefault();

    const container = e.target.nextSibling;
    container.classList.add("setlist-delete-appear");
  };
  // cancel delete setlist menu
  const cancelDeleteSetlist = (e) => {
    e.preventDefault();
    const container = e.target.parentElement;
    container.classList.remove("setlist-delete-appear");
  };
  // confirm delete of setlist
  const confirmDeleteSetlist = (e) => {
    e.preventDefault();

    deleteSetlist({ variables: { setListId, setListCreator } });
  };
  return (
    <>
      <a href={`/setlists/${setListId}`}>
        <SONG_CONTAINER className="position-relative">
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
          <div>
            <div className="likes-songs-container">
              <img className="likes" src={heart} alt="likes" />
              <p className="like-count">{likes}</p>
            </div>
            <p className="song-number">
              {countSongs > 1`${countSongs} songs`}: {`${countSongs} song`}
            </p>
          </div>
          <img
            className="setlist-delete ms-5 me-3"
            src={garbageIcon}
            alt="delete setlist"
            onClick={deleteSetlistMenu}
          />
          <div className="delete-setlist-confirm-container align-items-center d-flex position-absolute">
            <BUTTON
              onClick={confirmDeleteSetlist}
              className="delete-setlist-yes"
            >
              Delete
            </BUTTON>
            <BUTTON onClick={cancelDeleteSetlist} className="delete-setlist-no">
              Cancel
            </BUTTON>
          </div>
        </SONG_CONTAINER>
      </a>
    </>
  );
};
