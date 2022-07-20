import React from "react";
import "./Header.css";
import Auth from "../../utils/frontEndAuth";
const hamburger = require("../../assets/hamburger-menu.png");
export const Header = () => {
  return (
    <div>
      <div className="header-container d-flex justify-content-between align-items-center">
        <a href="/">
          <p className="header-title">GIG</p>
          <p className="header-title">SOCIAL</p>
        </a>
        <nav className="d-flex">
          <img className="hamburger" src={hamburger} alt="" />
          <a className="nav-link" href="">
            Browse
          </a>
          <a className="nav-link" href="/setlists">
            Setlists
          </a>
          <button
            onClick={() => Auth.logout()}
            className="nav-log-out nav-link me-4"
          >
            Log Out
          </button>
        </nav>
      </div>
    </div>
  );
};
