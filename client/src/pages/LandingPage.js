import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "../utils/mutations";
import { ADD_USER } from "../utils/mutations";
import "./LandingPage.css";
import {
  FORM,
  INPUT,
  BUTTON,
  APPEARDIV,
} from "../styled-components/styled-components";

export default function LandingPage() {
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
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const { data } = await signUpData({ variables: { ...signUpFormState } });
      console.log(data);
    } catch (err) {
      console.error(err);
    }
  };
  const handleChangeLogIn = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setLogInFormState({ ...logInFormState, [name]: value });
  };
  const handleChangeSignUp = (e) => {
    e.preventDefault();
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
            <h2>Log In</h2>
            <label htmlFor="email">Email: </label>
            <INPUT type="email" name="email" onChange={handleChangeLogIn} />
            <label htmlFor="password">Password: </label>
            <INPUT
              type="password"
              name="password"
              onChange={handleChangeLogIn}
            />
            <BUTTON className="form-button">Log In</BUTTON>
          </FORM>
        )}
        {signUp && (
          <FORM id="signup" onSubmit={handleSignUp}>
            <h2>Sign Up</h2>
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
}
