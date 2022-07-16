import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { GET_CLIENT, GET_ME } from "../../utils/queries";
import { ADD_SETLIST } from "../../utils/mutations";
import { Header } from "../../components/Header/Header";
import { Setlist } from "../../components/Setlist/Setlist";
import Auth from "../../utils/frontEndAuth";
import "./Profile.css";
import { FORM, INPUT, BUTTON } from "../../styled-components/styled-components";
const plus = require("../../assets/plus.png");
const pick = require("../../assets/guitar-pick.png");

export const Profile = () => {
  // Getting userId from token to get user data
  const userId = Auth.getProfile().data._id;
  // Creating query hook and then querying that data immediately
  const { loading, data } = useQuery(GET_CLIENT);
  const { loading: userLoading, data: userData } = useQuery(GET_ME, {
    variables: { _id: userId },
  });
  // storing that data to variable
  const userProfile = userData?.user;

  // mutation to add setlist
  const [createSetlist, { error }] = useMutation(ADD_SETLIST);

  // variable to add genius token
  const [genius, setGenius] = useState("");

  // Add a setlist
  const addSetlist = (e) => {
    e.preventDefault();
    const setListName = document.querySelector("#setListName").value;
    const setListInfo = { setListName, setListCreator: userProfile.username };
    createSetlist({ variables: { ...setListInfo } });
    toggleModal();
    // somehow we need to update the mutation
  };
  console.log(userProfile);
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
    const id = await data?.getClient.id;
    const secret = await data?.getClient.secret;
    const body = `client_secret=${secret}&grant_type=authorization_code&code=${code}&client_id=${id}&redirect_uri=http://localhost:3000/profile&response_type=code`;
    if (!id || !secret) {
      return;
    }
    const token = await fetch("https://api.genius.com/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const tokenResponse = await token.json();
    localStorage.setItem("genius_token", tokenResponse.access_token);
    setGenius(tokenResponse.access_token);
    return;
  };

  //   if (!genius) {
  // const code = window.location.href.split("=")[1].split("&")[0]
  // fetchTokenForUser(code)
  //   }
  if (userLoading) {
    return <h1>Loading setlists...</h1>;
  }
  return (
    <div className="d-flex flex-column justify-content-center">
      <Header />
      {/* ADD SETLIST MODAL */}
      <div className="modal-container position-absolute">
        <FORM className="add-setlist-form position-relative">
          <div className="d-flex justify-content-between w-100">
            <h2>Name your new setlist!</h2>
            <button className="add-setlist" type="button" onClick={toggleModal}>
              <img className="close" src={plus} alt="add playlist" />
            </button>
          </div>
          <INPUT type="text" id="setListName"></INPUT>
          <BUTTON onClick={addSetlist}>Save setlist</BUTTON>
        </FORM>
      </div>
      {/* SETLISTS */}
      <div className="setlist-container container">
        <div className="row">
          <div className="col setlist-header d-flex">
            <img className="guitar-pick" src={pick} alt="guitar pick" />
            <h2 className="setlists-title">Setlists</h2>
          </div>
          <div className="col plus-col">
            <button className="add-setlist" type="button" onClick={toggleModal}>
              <img className="plus" src={plus} alt="add playlist" />
            </button>
          </div>
        </div>
        <div className="row">
          {/* If there is only one setlist */}
          {userProfile.setlists.length === 1 ? (
            <div className="col">
              <Setlist
                username={userProfile.username}
                setlist={userProfile.setlists[0]}
              />
            </div>
          ) : (
            // if there are many setlists
            userProfile.setlists.map((set) => (
              <div className="col-md-6">
                <Setlist username={userProfile.username} setlist={set} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
