import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@apollo/client";
import "./SetlistView.css";
// queries and mutations
import { GET_SETLIST } from "../../utils/queries";
import { ADD_LIKE, ADD_COMMENT } from "../../utils/mutations";
// components
import { Header } from "../../components/Header/Header";
import { Song } from "../../components/Song/Song";
import { SearchCard } from "../../components/SearchCard/SearchCard";
import { Comment } from "../../components/Comment/Comment";
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
const blackHeart = require("../../assets/black-heart.png");
const user = require("../../assets/user.png");

export const SetlistView = () => {
  // get the setlist data
  const setListId = useParams().id;

  // get the user's id from the token in localstorage
  const userId = Auth.getProfile().data._id;
  const username = Auth.getProfile().data.username;

  // query to get setlist info
  const { loading, data } = useQuery(GET_SETLIST, {
    variables: { setListId: setListId },
  });
  // save setlist data to variable
  const setListData = data?.getSetlist;

  // save searchData variable if user wants to add song
  const [searchData, setSearchData] = useState();

  // set active song
  const [active, setActive] = useState("");

  // variable for checking if the active delete menu is active in any song
  const [activeDelete, setActiveDelete] = useState(false);

  // variable for checking if the active delete menu is active in any comment
  const [activeDeleteComment, setActiveDeleteComment] = useState(false);

  // mutation for adding likes
  const [addLike, { error }] = useMutation(ADD_LIKE, {
    refetchQueries: [{ query: GET_SETLIST, variables: { setListId } }],
  });
  const [addNewComment, { error2 }] = useMutation(ADD_COMMENT, {
    refetchQueries: [{ query: GET_SETLIST, variables: { setListId } }],
  });

  // For opening and closing the add setlist modal
  const toggleModal = (e) => {
    e.preventDefault();
    const modal = document.querySelector(".modal-container");
    if (modal.classList.contains("open-modal")) {
      modal.classList.remove("open-modal");
      document.querySelector(".add-setlist-form").classList.remove('new-height')
    } else {
      // remove searchData if modal is closed
      if (searchData) {
        setSearchData();
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
    document.querySelector(".add-setlist-form").classList.add('new-height')
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

  const likeSetlist = (e) => {
    e.preventDefault();

    addLike({ variables: { setListId, _id: userId } });
  };

  // Add post button if text field has something in it
  const addPostButton = (e) => {
    e.preventDefault();
    const postButton = document.querySelector(".post-button");
    postButton.classList.add("post-appear");
  };

  const addComment = (e) => {
    e.preventDefault();
    const commentText = document.querySelector(".comment-input").value;
    if (commentText === "") {
      return;
    }
    addNewComment({ variables: { commentText, username, setList: setListId } });

    document.querySelector(".comment-input").value = "";
  };

  // if no data yet
  if (loading) {
    return "";
  }
  return (
    <div className="d-flex flex-column justify-content-center">
      <Header />
      {/* ADD SONG MODAL */}
      <div className="setlist-add-modal modal-container position-absolute">
        <FORM className="add-setlist-form position-relative">
          <div className="d-flex justify-content-between w-100">
            <h2 className="setlist-add-title">Search for a song</h2>
            <button className="add-setlist" type="button" onClick={toggleModal}>
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
                    toggleModal={toggleModal}
                    key={song.result.id}
                    song={song.result}
                  />
                  </APPEARDIV>
                ))
              : null}
          </div>
        </FORM>
      </div>
      {/* SONGS */}
      <div className="mobile-desktop-flex d-flex flex-column container">
        <APPEARDIV className="setlist-container w-50">
          <div className="row">
            <div className="col-10 setlist-header m-0 d-flex align-items-center">
              <img className="guitar-pick" src={pick} alt="guitar pick" />
              <h2 className="setlists-title">{setListData.setListName}</h2>
              <img
                className="setlist-likes"
                alt="likes"
                onClick={likeSetlist}
                src={blackHeart}
              />
              <p className="setlist-likes-count">{setListData.likes}</p>
            </div>
            {username === setListData.setListCreator ? (
              <div className="col-2 plus-col">
                <button
                  className="add-setlist"
                  type="button"
                  onClick={toggleModal}
                >
                  <img className="plus" src={plus} alt="add playlist" />
                </button>
              </div>
            ) : null}
          </div>
          <div className="row">
            {/* If there is only one song */}
            {setListData.songs.length === 1 ? (
              <div className="col-12" key={setListData.song[0].artist}>
                <Song song={setListData.songs[0]} />
              </div>
            ) : (
              // if there are many songs
              setListData.songs.map((song, i) => (
                <div
                  className="col-12"
                  key={`${song.artist}-${song.songTitle}`}
                >
                  <Song
                    currentUser={username}
                    setListCreator={setListData.setListCreator}
                    activeDelete={activeDelete}
                    setActiveDelete={setActiveDelete}
                    songOrder={i}
                    song={song}
                  />
                </div>
              ))
            )}
          </div>
        </APPEARDIV>
        <APPEARDIV
          style={{ animationDelay: "0.2s" }}
          className="comments-width d-flex flex-column align-items-center justify-content-center w-50"
        >
          <div className="comments-container d-flex flex-column align-items-start">
            <h2 className="comment-title">Comments:</h2>
            <form
              className="d-flex align-items-center comment-form"
              onSubmit={addComment}
            >
              <div className="add-comment-container d-flex align-items-center position-relative">
                <img className="current-user" alt="current-user" src={user} />
                <INPUT
                  className="comment-input"
                  placeholder={`Add a comment as ${username}`}
                  onChange={addPostButton}
                ></INPUT>
                <button className="post-button">Post</button>
              </div>
            </form>
            {setListData.comments.map((comment) => (
              <Comment
                key={comment._id}
                activeDeleteComment={activeDeleteComment}
                setActiveDeleteComment={setActiveDeleteComment}
                setListCreator={setListData.setListCreator}
                currentUser={username}
                comment={comment}
              />
            ))}
          </div>
        </APPEARDIV>
      </div>
    </div>
  );
};
