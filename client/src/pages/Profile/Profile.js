import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_CLIENT, GET_ME } from "../../utils/queries";
import { Header } from "../../components/Header/Header";
import { Setlist } from "../../components/Setlist/Setlist";
import Auth from "../../utils/frontEndAuth";
import "./Profile.css";
const plus = require("../../assets/plus.png");
const pick = require("../../assets/guitar-pick.png");

export const Profile = () => {
  const userId = Auth.getProfile().data._id;

  const { loading, data } = useQuery(GET_CLIENT);
  const { loading: userLoading, data: userData } = useQuery(GET_ME, {
    variables: { _id: userId },
  });
  const [genius, setGenius] = useState("");
  const userProfile = userData?.user;
  console.log(userProfile)
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
    <div>
      <Header />
      <div className="setlist-container container">
        <div className="row">
          <div className="col setlist-header d-flex">
            <img className="guitar-pick" src={pick} alt="guitar pick" />
            <h2 className="setlists-title">Setlists</h2>
          </div>
          <div className="col plus-col">
            <img className="plus" src={plus} alt="add playlist" />
          </div>
        </div>
        <div className="row">
          {userProfile.setlists.map((set) => {
            return (
              <div key={set.setListName} className="col-md-6">
                <Setlist username={userProfile.username} setlist={set} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
