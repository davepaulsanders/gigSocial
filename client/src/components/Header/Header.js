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
      document.querySelector(".plus-menu-exit").style.display = "block";
    } else {
      nav.classList.remove("open");
      nav.classList.add("closed");
    }
  };
  window.addEventListener("resize", () => {
    const nav = document.querySelector(".nav-list");
    if (window.innerWidth > 700) {
      nav.classList.remove("closed");
      nav.classList.add("open");
      document.querySelector(".plus-menu-exit").style.display = "none";
    }
    if (window.innerWidth < 700) {
      nav.classList.remove("open");
      nav.classList.add("closed");
    }
  });

  document.body.addEventListener("scroll", () => {
    if (document.body.scrollTop > 0) {
      document.querySelector(".hamburger-container").style.display = "none";
    } else {
      if (
        (document.querySelector(".hamburger-container").style.display = "none")
      ) {
        document.querySelector(".hamburger-container").style.display = "block";
      }
    }
  });

  return (
    <header>
      <div className="header-container d-flex justify-content-between align-items-center">
        <a href="/">
          <p className="header-title">GIG</p>
          <p className="header-title">SOCIAL</p>
        </a>
        <div className="hamburger-container">
          <img
            className="hamburger"
            onClick={toggleMenu}
            src={hamburger}
            alt=""
          />
        </div>
        <nav className="d-flex align-items-center">
          <ul
            className={
              window.innerWidth < 700
                ? "nav-list d-flex justify-content-end align-items-center closed"
                : "nav-list d-flex justify-content-end align-items-center open"
            }
          >
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
            <li className="nav-link">
              <img
                onClick={toggleMenu}
                className="plus-menu-exit"
                src={plus}
                alt="exit"
              />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
