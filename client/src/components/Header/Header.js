import React from "react";
import "./Header.css";
import Auth from "../../utils/frontEndAuth";
const hamburger = require("../../assets/hamburger-menu.png");
const plus = require("../../assets/plus.png");

export const Header = () => {
    const toggleMenu = (e) => {
        e.preventDefault();
        const nav = document.querySelector(".nav-list");
    if (nav.classList.contains("closed")) {
      nav.classList.remove("closed");
      nav.classList.add("open");
    } else {
      nav.classList.remove("open");
      nav.classList.add("closed");
    }
  };
  window.addEventListener("resize", () => {
    
  });
  return (
    <header>
      <div className="header-container d-flex justify-content-between align-items-center">
        <a href="/">
          <p className="header-title">GIG</p>
          <p className="header-title">SOCIAL</p>
        </a>
        <img
          className="hamburger"
          onClick={toggleMenu}
          src={hamburger}
          alt=""
        />
        <nav className="d-flex align-items-center">
          <ul className="nav-list d-flex align-items-center closed">
            <li className="nav-link">
              <a href="/browse">Browse</a>
            </li>
            <li className="nav-link">
              <a href="/setlists">Setlists</a>
            </li>
            <li className="nav-link">
              <button
                onClick={() => Auth.logout()}
                className="nav-log-out me-4"
              >
                Log Out
              </button>
            </li>
            <img
              onClick={toggleMenu}
              className="plus-menu-exit"
              src={plus}
              alt="exit"
            />
          </ul>
        </nav>
      </div>
    </header>
  );
};
