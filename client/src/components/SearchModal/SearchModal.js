import React, { useState } from "react";
import { SearchCard } from "../SearchCard/SearchCard";
import {
  FORM,
  INPUT,
  BUTTON,
  APPEARDIV,
} from "../../styled-components/styled-components";
import "./SearchModal.css";

const plus = require("../../assets/plus.png");

export const SearchModal = ({ openModal, setOpenModal }) => {
  // save searchData variable if user wants to add song
  const [searchData, setSearchData] = useState();

  // set active song
  const [active, setActive] = useState("");

  // For closing the add setlist modal
  const closeModal = (e) => {
    e.preventDefault();
    const modal = document.querySelector(".modal-container");
    if (modal.classList.contains("open-modal")) {
      modal.classList.remove("open-modal");
      document
        .querySelector(".add-setlist-form")
        .classList.remove("new-height");

      // remove searchData
      if (searchData) {
        setSearchData();
      }
      // setState in parent
      setOpenModal(false);
      // clear input field
      document.querySelector("#song-search").value = "";
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
    document.querySelector(".add-setlist-form").classList.add("new-height");
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
  return (
    <div
      className={
        openModal
          ? "setlist-add-modal modal-container position-absolute open-modal"
          : "setlist-add-modal modal-container position-absolute"
      }
    >
      <FORM className="add-setlist-form position-relative">
        <div className="d-flex justify-content-between w-100">
          <h2 className="setlist-add-title">Search for a song</h2>
          <button className="add-setlist" type="button" onClick={closeModal}>
            <img className="close" src={plus} alt="add playlist" />
          </button>
        </div>
        <INPUT
          type="text"
          placeholder="Type to search genius for a song"
          id="song-search"
        ></INPUT>
        <BUTTON onClick={searchGenius}>Search Genius</BUTTON>
        {/* SEARCH DATA */}

        <div className="results-container">
          {searchData !== undefined
            ? searchData.map((song) => (
                <APPEARDIV key={song.result.id}>
                  <SearchCard
                    active={active}
                    setActive={setActive}
                    key={song.result.id}
                    song={song.result}
                  />
                </APPEARDIV>
              ))
            : null}
        </div>
      </FORM>
    </div>
  );
};
