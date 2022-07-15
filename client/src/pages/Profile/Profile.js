import React from "react";
import { BUTTON } from "../../styled-components/styled-components";
import "./Profile.css";
import { useQuery } from "@apollo/client";
import { GET_LINK, GET_CLIENT } from "../../utils/queries"
import Auth from "../../utils/frontEndAuth"
import { Header } from "../../components/Header/Header"
import { responsePathAsArray } from "graphql";

export const Profile = () => {
  const {loading, data} = useQuery(GET_LINK)
  const {loading: loadingClient, data: clientInfo} = useQuery(GET_CLIENT)
  const { username } = Auth.getProfile().data
  
  const handleClick = (e) => {
    e.preventDefault()
    const { url } = data.getLink
    window.location.assign(url)
  }
  
  const fetchTokenForUser = async (code) => {
    const id = await clientInfo?.getClient.id
    const secret = await clientInfo?.getClient.secret
    const body = `client_secret=${secret}&grant_type=authorization_code&code=${code}&client_id=${id}&redirect_uri=http://localhost:3000/profile&response_type=code`
      
    const token = await fetch("https://api.genius.com/oauth/token/", {
      method: "POST",
      headers: {"Content-Type": "application/x-www-form-urlencoded"},
      body
     })
     const tokenResponse = await token.json()
     console.log(tokenResponse)
     localStorage.setItem('genius_token', tokenResponse.access_token)
     return
  }

  if (window.location.href.indexOf('localhost:3000/profile?code=') !== -1) {     
    
    const geniusToken = localStorage.getItem("genius_token")
    if (!geniusToken) {
    const code = window.location.href.split("=")[1].split("&")[0]
      fetchTokenForUser(code)
    }
  }
  return (
    <div>
      <Header />
      <div className="profile-container">
        <p className="genius-prompt">
          Hey <span className="username">{username}</span>, you need to log in or create an account at Genius to use{" "}
          <span className="gig-social">Gig Social!</span>
        </p>
          <BUTTON className="genius-button" onClick={handleClick}>Connect</BUTTON>
      </div>
    </div>
  );
};
