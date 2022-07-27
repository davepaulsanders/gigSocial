import React, { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import "./Profile.css";

// queries and mutations
import { GET_CLIENT, GET_ME } from "../../utils/queries";
import { ADD_SETLIST } from "../../utils/mutations";

// components
import { Header } from "../../components/Header/Header";
import { Setlist } from "../../components/Setlist/Setlist";
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

export const Profile = () => {
  if (!Auth.loggedIn()) {
    window.location.replace("/");
  }

  // Getting userId from token to get user data
  const userId = Auth.getProfile().data._id;

  // This query retrieves client info to get geniusAPI token
  const [getClient, { loading, data }] = useLazyQuery(GET_CLIENT);

  // Retreiving user data and setlists
  const { loading: userLoading, data: userData } = useQuery(GET_ME, {
    variables: { _id: userId },
  });
  // storing that data to variable
  const userProfile = userData?.user;

  // mutation to add setlist
  const [createSetlist, { error }] = useMutation(ADD_SETLIST, {
    // refetch get me to refresh cache
    refetchQueries: [{ query: GET_ME, variables: { _id: userId } }],
  });

  useEffect(() => {
    if (window.location.href.indexOf("code") > 0) {
      const code = window.location.href.split("=")[1].split("&")[0];
      fetchTokenForUser(code);
    }
  }, []);

  // Add a setlist
  const addSetlist = (e) => {
    e.preventDefault();
    const setListName = document.querySelector("#setListName").value;
    const setListInfo = { setListName, setListCreator: userProfile.username };
    createSetlist({ variables: { ...setListInfo } });
    toggleModal(e);
    // somehow we need to update the mutation
  };

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

  const fetchTokenForUser = async (code) => {
    const geniusToken = localStorage.getItem("genius_token");
    if (geniusToken) {
      return;
    }
    const client = await getClient();
    const clientInfo = client.data.getClient;
    const { id, secret } = clientInfo;
    console.log("fetching genius token...");
    const body = `client_secret=${secret}&grant_type=authorization_code&code=${code}&client_id=${id}&redirect_uri=http://localhost:3000/setlists&response_type=code`;
    try {
      const token = await fetch("https://api.genius.com/oauth/token/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body,
      });
      const tokenResponse = await token.json();
      //console.log(tokenResponse.access_token);
      localStorage.setItem("genius_token", tokenResponse.access_token);
      return;
    } catch (err) {
      console.log(err);
    }
  };

  if (userLoading) {
    return <h1>Loading setlists...</h1>;
  }
  return (
    <div className="d-flex flex-column justify-content-center">
      <Header />
      {/* ADD SETLIST MODAL */}
      <div className="modal-container modal-setlist-container position-absolute">
        <FORM className="add-setlist-form position-relative">
          <div className="d-flex justify-content-between w-100">
            <h2 className="setlist-modal-title">Name your new setlist!</h2>
            <button className="add-setlist" type="button" onClick={toggleModal}>
              <img className="close" src={plus} alt="add playlist" />
            </button>
          </div>
          <INPUT
            type="text"
            placeholder="Name your setlist"
            id="setListName"
          ></INPUT>
          <BUTTON onClick={addSetlist}>Save setlist</BUTTON>
        </FORM>
      </div>
      {/* SETLISTS */}
      <APPEARDIV className="setlist-container container">
        <div className="row">
          <div className="col-6 setlist-header-profile d-flex">
            <img className="guitar-pick" src={pick} alt="guitar pick" />
            <h2 className="setlists-title">Setlists</h2>
          </div>
          <div className="col-6 plus-col">
            <button className="add-setlist" type="button" onClick={toggleModal}>
              <img className="plus" src={plus} alt="add playlist" />
            </button>
          </div>
        </div>
        <div className="row my-2">
          {/* If no setlists */}
          {userProfile.setlists.length === 0 ||
          userProfile.setlists === undefined ? (
            <div className="my-5">
              <h2 className="no-setlists">No setlists yet!</h2>
            </div>
          ) : null}
          {/* If there is only one setlist */}
          {userProfile.setlists.length === 1 ? (
            <div className="col" key={userProfile.setlists[0].setListName}>
              <Setlist
                userId={userId}
                username={userProfile.username}
                setlist={userProfile.setlists[0]}
              />
            </div>
          ) : (
            // if there are many setlists
            userProfile.setlists.map((set) => (
              <div className="col-md-6" key={set.setListName}>
                <Setlist
                  userId={userId}
                  username={userProfile.username}
                  setlist={set}
                />
              </div>
            ))
          )}
        </div>
      </APPEARDIV>
    </div>
  );
};
