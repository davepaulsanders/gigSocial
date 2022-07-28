import React, { useState } from "react";
import { SearchCard } from "../SearchCard/SearchCard";
import {
  FORM,
  INPUT,
  BUTTON,
  APPEARDIV,
} from "../../styled-components/styled-components";
import "./SearchModal.css";
import { selectHttpOptionsAndBody } from "@apollo/client";

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
      // Setting scroll to top again
      document.querySelector(".add-song-form").scrollTop = 0;

      // closing modal and removing extra height and form errors
      document.querySelector(".genius-search-errors").style.backgroundColor =
        "transparent";
      document.querySelector(".genius-search-errors").textContent = "";
      modal.classList.remove("open-modal");
      document.querySelector(".add-song-form").classList.remove("new-height");
      document
        .querySelector(".results-container")
        .classList.remove("results-container-expand");
      // remove searchData from parent
      if (searchData) {
        setSearchData();
      }
      // set modal state to closed
      setOpenModal(false);
      document.querySelector("body").style.overflowY = "";
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
    if (!searchTerm) {
      document.querySelector(".genius-search-errors").style.backgroundColor =
        "#000";
      document.querySelector(".genius-search-errors").textContent =
        "Please fill out the form";
      return;
    }
    songSearch(searchTerm);
    document.querySelector(".add-song-form").classList.add("new-height");
    document
      .querySelector(".results-container")
      .classList.add("results-container-expand");
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
      <FORM className="add-song-form position-fixed">
        <div className="modal-title d-flex justify-content-between w-100">
          <h2 className="setlist-add-title">Search for a song</h2>
          <button className="add-setlist" type="button" onClick={closeModal}>
            <img className="close search" src={plus} alt="add playlist" />
          </button>
        </div>
        <p className="genius-search-errors text-danger">Test</p>
        <INPUT
          type="text"
          placeholder="Type to search genius for a song"
          id="song-search"
          onFocus={() => {
            document.querySelector(
              ".genius-search-errors"
            ).style.backgroundColor = "transparent";
            document.querySelector(".genius-search-errors").textContent = "";
          }}
        ></INPUT>
        <BUTTON className="genius-search-button" onClick={searchGenius}>
          Search Genius
        </BUTTON>
        {/* SEARCH DATA */}
        <div className="results-container">
          {searchData
            ? searchData.map((song) => (
                <APPEARDIV key={song.result.id}>
                  <SearchCard
                    closeModal={closeModal}
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
