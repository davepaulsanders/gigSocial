import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../../utils/mutations";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/frontEndAuth";
import "./LandingPage.css";
import {
  FORM,
  INPUT,
  BUTTON,
  APPEARDIV,
} from "../../styled-components/styled-components";

export const LandingPage = () => {
  const geniusToken = localStorage.getItem("genius_token");
  if (Auth.loggedIn() && geniusToken) {
    window.location.replace("/setlists");
  }

  // selector for log in and sign up errors
  const loginError = document.querySelector(".login-form-errors");
  const signupError = document.querySelector(".signup-form-errors");

  const [signUp, setSignUp] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [logInFormState, setLogInFormState] = useState({
    email: "",
    password: "",
  });
  const [signUpFormState, setSignUpFormState] = useState({
    email: "",
    password: "",
  });

  const [logInData, { error }] = useMutation(LOGIN);
  const [signUpData, { error1 }] = useMutation(ADD_USER);

  const handleLogIn = async (e) => {
    e.preventDefault();
    try {
      const { data } = await logInData({ variables: { ...logInFormState } });
      Auth.login(data.login.token);
    } catch (err) {
      if (err) {
        loginError.style.backgroundColor = "#000";
        loginError.textContent = "Wrong email/password combination!";
      }
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signUpData({ variables: { ...signUpFormState } });
      Auth.login(data.login.token);
    } catch (err) {
      if (err) {
        signupError.style.backgroundColor = "#000";
        signupError.textContent = "Sorry, something went wrong!";
      }
    }
  };
  const handleChangeLogIn = (e) => {
    e.preventDefault();
    // resetting errors if necessary
    document.querySelector(".login-form-errors").style.backgroundColor = "";
    document.querySelector(".login-form-errors").textContent = "";

    const { name, value } = e.target;
    setLogInFormState({ ...logInFormState, [name]: value });
  };
  const handleChangeSignUp = (e) => {
    e.preventDefault();
    // resetting errors if necessary
    document.querySelector(".signup-form-errors").style.backgroundColor = "";
    document.querySelector(".signup-form-errors").textContent = "";

    const { name, value } = e.target;
    setSignUpFormState({ ...signUpFormState, [name]: value });
  };
  return (
    <div>
      <div className="title-container">
        <a href="/">
          <p className="site-title">GIG</p>
          <p className="site-title">SOCIAL</p>
        </a>
      </div>
      <div className="landing-page">
        {logIn && (
          <FORM id="login" onSubmit={handleLogIn}>
            <h2 className="form-title">Log In</h2>
            <label htmlFor="email">Email: </label>
            <INPUT type="email" name="email" onChange={handleChangeLogIn} />
            <label htmlFor="password">Password: </label>
            <INPUT
              type="password"
              name="password"
              onChange={handleChangeLogIn}
            />
            <p className="login-form-errors w-100"></p>
            <BUTTON className="form-button">Log In</BUTTON>
          </FORM>
        )}
        {signUp && (
          <FORM id="signup" onSubmit={handleSignUp}>
            <h2 className="form-title">Sign Up</h2>
            <label htmlFor="username">Username: </label>
            <INPUT type="text" name="username" onChange={handleChangeSignUp} />
            <label htmlFor="email">Email: </label>
            <INPUT type="email" name="email" onChange={handleChangeSignUp} />
            <label htmlFor="password">Password: </label>
            <INPUT
              type="password"
              name="password"
              onChange={handleChangeSignUp}
            />
            <p className="signup-form-errors w-100"></p>
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
            <APPEARDIV style={{ animationDelay: "0.1s" }}>
              <BUTTON className="log-in-button" onClick={() => setLogIn(true)}>
                Log In
              </BUTTON>

              <BUTTON
                className="sign-up-button"
                onClick={() => setSignUp(true)}
              >
                Sign Up
              </BUTTON>
            </APPEARDIV>
          </div>
        )}
      </div>
    </div>
  );
};
