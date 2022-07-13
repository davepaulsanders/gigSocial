import React, { useState } from "react";
import "./LandingPage.css";
import { FORM, INPUT, BUTTON, APPEARDIV } from "../styled-components/styled-components";

export default function LandingPage() {
  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);

  return (
    <div>
      <a href="/">
        <div className="title-container">
          <p className="site-title">GIG</p>
          <p className="site-title">SOCIAL</p>
        </div>
      </a>
      <div className="landing-page">
        {logIn && (
          <FORM>
            <h2>Log In</h2>
            <label htmlFor="email">Email: </label>
            <INPUT type="text" />
            <label htmlFor="password">Password: </label>
            <INPUT type="text" />
            <BUTTON className="form-button">Log In</BUTTON>
          </FORM>
        )}
        {signUp && (
          <FORM>
            <h2>Sign Up</h2>
            <label htmlFor="username">Username: </label>
            <INPUT type="text" />
            <label htmlFor="email">Email: </label>
            <INPUT type="text" />
            <label htmlFor="password">Password: </label>
            <INPUT type="text" />
            <BUTTON className="form-button">Sign Up</BUTTON>
          </FORM>
        )}
        {logIn ||
          (signUp ? null : (
            <APPEARDIV>
              <h2 className="site-description">
                <span className="site-name">Gig Social</span> is a website to
                help musicians keep track of their setlists, lyrics, and get
                feedback from friends
              </h2>
            </APPEARDIV>
          ))}
        {logIn || signUp ? null : (
          <div className="button-container">
            <APPEARDIV style={{animationDelay: "0.2s"}}>
            <BUTTON className="log-in-button" onClick={() => setLogIn(true)}>
              Log In
            </BUTTON>

            <BUTTON className="sign-up-button" onClick={() => setSignUp(true)}>
              Sign Up
            </BUTTON>
          </APPEARDIV>
          </div>
        )}
      </div>
    </div>
  );
}
