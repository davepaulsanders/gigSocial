import React from "react";
import "./Header.css";
import Auth from "../../utils/frontEndAuth";
const hamburger = require("../../assets/hamburger-menu.png");
const plus = require("../../assets/plus.png");

export const Header = () => {
  const toggleMenu = (e) => {
    e.preventDefault();
    const nav = document.querySelector(".nav-list");
    if (nav.classList.contains('closed')) {
        nav.classList.remove("closed");
        nav.classList.add("open");
        
    } else {
        nav.classList.remove('open')
        nav.classList.add('closed')
    }
  };

  return (
    <div>
      <div className="header-container d-flex justify-content-between align-items-center">
        <a href="/">
          <p className="header-title">GIG</p>
          <p className="header-title">SOCIAL</p>
        </a>
        <img className="hamburger" onClick={toggleMenu} src={hamburger} alt="" />
        <nav className="nav-list d-flex align-items-center closed">
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
          <img onClick={toggleMenu} className="plus-menu-exit" src={plus} alt="exit" />
        </nav>
      </div>
    </div>
  );
};
