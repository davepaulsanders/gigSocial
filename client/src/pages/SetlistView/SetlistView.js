import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import "./SetlistView.css";
// queries and mutations
import { GET_SETLIST } from "../../utils/queries";

// components
import { Header } from "../../components/Header/Header";
import { Song } from "../../components/Song/Song";
import { SearchCard } from "../../components/SearchCard/SearchCard";
import {
  FORM,
  INPUT,
  BUTTON,
  APPEARDIV,
} from "../../styled-components/styled-components";

// authentication
import Auth from "../../utils/frontEndAuth";

//images
const plus = require("../../assets/plus.png");
const pick = require("../../assets/guitar-pick.png");

export const SetlistView = () => {
  // get the setlist data
  const setListId = useParams().id;

  const { loading, data } = useQuery(GET_SETLIST, {
    variables: { setListId: setListId },
  });
  const setListData = data?.getSetlist;

  // save searchData variable
  const [searchData, setSearchData] = useState();

  // set active song
  const [active, setActive] = useState("");
  const [activeDelete, setActiveDelete] = useState(false);
  // For opening and closing the add setlist modal
  const toggleModal = (e) => {
    e.preventDefault();
    const modal = document.querySelector(".modal-container");
    if (modal.classList.contains("open-modal")) {
      modal.classList.remove("open-modal");
    } else {
      // remove searchData if modal is closed
      if (searchData) {
        setSearchData([]);
      }
      modal.classList.add("open-modal");
    }
  };
  // clean up search term and send it to fetch
  const searchGenius = (e) => {
    e.preventDefault();

    const searchTerm = document
      .querySelector("#song-search")
      .value.replace(" ", "%20")
      .trim();
    songSearch(searchTerm);
  };

  // fetch function for getting songs from genius
  const songSearch = async (searchTerm) => {
    const geniusToken = localStorage.getItem("genius_token");
    const songs = await fetch(
      `https://api.genius.com/search?q=${searchTerm}&access_token=${geniusToken}`
    );
    const list = await songs.json();
    setSearchData(list.response.hits);
  };
  const test = (e) => {
    e.preventDefault();
    console.log("click");
  };

  // if no data yet
  if (loading) {
    return "";
  }
  return (
    <div className="d-flex flex-column justify-content-center">
      <Header />
      {/* ADD SONG MODAL */}
      <div onClick={test} className="modal-container position-absolute">
        <FORM className="add-setlist-form position-relative">
          <div className="d-flex justify-content-between w-100">
            <h2>Search for a song</h2>
            <button className="add-setlist" type="button" onClick={toggleModal}>
              <img className="close" src={plus} alt="add playlist" />
            </button>
          </div>
          <INPUT type="text" id="song-search"></INPUT>
          <BUTTON onClick={searchGenius}>Search Genius</BUTTON>
          {/* SEARCH DATA */}

          <div className="results-container">
            {searchData ? (
              <p className="choose">Choose a song to add!</p>
            ) : null}
            {searchData !== undefined
              ? searchData.map((song) => (
                  <SearchCard
                    active={active}
                    setActive={setActive}
                    toggleModal={toggleModal}
                    style={"cursor: pointer"}
                    key={song.result.id}
                    song={song.result}
                  />
                ))
              : null}
          </div>
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
            <div className="col" key={setListData.song[0].artist}>
              <Song song={setListData.songs[0]} />
            </div>
          ) : (
            // if there are many songs
            setListData.songs.map((song) => (
              <div
                className="col-md-6"
                key={`${song.artist}-${song.songTitle}`}
              >
                <Song
                  activeDelete={activeDelete}
                  setActiveDelete={setActiveDelete}
                  song={song}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
