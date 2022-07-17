import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";

// queries and mutations
import { GET_SETLIST } from "../../utils/queries";

// components
import { Header } from "../../components/Header/Header";
import { Song } from "../../components/Song/Song";
import { FORM, INPUT, BUTTON } from "../../styled-components/styled-components";

// authentication
import Auth from "../../utils/frontEndAuth";

//images
const plus = require("../../assets/plus.png");
const pick = require("../../assets/guitar-pick.png");

export const SetlistView = () => {
  const setListId = useParams().id;
  const { loading, data } = useQuery(GET_SETLIST, {
    variables: { _id: setListId },
  });

  const setListData = data?.getSetlist;

  // For opening and closing the add setlist modal
  const toggleModal = (e) => {
    e.preventDefault();
    const modal = document.querySelector(".modal-container");
    if (modal.classList.contains("open-modal")) {
      modal.classList.remove("open-modal");
    } else {
      modal.classList.add("open-modal");
    }
  };
  //console.log(setListData)
  const songSearch = async () => {
    const geniusToken = localStorage.getItem("genius_token");
    console.log(geniusToken);
    const songs = await fetch(
      `https://api.genius.com/search?q=Sia&access_token=${geniusToken}`
    );
    const list = await songs.json();
    console.log(list);
  };

  // if no data yet
  if (loading) {
    return "";
  }
  return (
    <div className="d-flex flex-column justify-content-center">
      <Header />
      <button onClick={songSearch}>Click</button>
      {/* ADD SONG MODAL */}
      <div className="modal-container position-absolute">
        <FORM className="add-setlist-form position-relative">
          <div className="d-flex justify-content-between w-100">
            <h2>Name your new setlist!</h2>
            <button className="add-setlist" type="button" onClick={toggleModal}>
              <img className="close" src={plus} alt="add playlist" />
            </button>
          </div>
          <INPUT type="text" id="setListName"></INPUT>
          <BUTTON>Save setlist</BUTTON>
        </FORM>
      </div>
      {/* SONGS */}
      <div className="setlist-container container">
        <div className="row">
          <div className="col setlist-header d-flex">
            <img className="guitar-pick" src={pick} alt="guitar pick" />
            <h2 className="setlists-title">{setListData.setListName}</h2>
          </div>
          <div className="col plus-col">
            <button className="add-setlist" type="button" onClick={toggleModal}>
              <img className="plus" src={plus} alt="add playlist" />
            </button>
          </div>
        </div>
        <div className="row">
          {/* If there is only one song */}
          {setListData.songs.length === 1 ? (
            <div className="col" key={setListData.song[0].songTitle}>
              <Song
                setListCreator={setListData.setListCreator}
                song={setListData.songs[0]}
              />
            </div>
          ) : (
            // if there are many songs
            setListData.songs.map((song) => (
              <div className="col-md-6" key={song.songTitle}>
                <Song setListCreator={setListData.setListCreator} song={song} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
