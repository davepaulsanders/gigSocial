import React from "react";
import "./LandingPage.css";

export default function LandingPage() {
  return (
    <div>
      <div className="title-container">
        <p className="site-title">GIG</p>
        <p className="site-title">SOCIAL</p>
      </div>
      <div className="landing-page">
        <h2 className="site-description">
          <span className="site-name">Gig Social</span> is a website to help
          musicians keep track of their setlists, lyrics, and get feedback from
          friends ...
        </h2>
        <div className="button-container">
          <button className="log-in-button">Log In</button>
          <button className="sign-up-button">Sign Up</button>
        </div>
      </div>
    </div>
  );
}
