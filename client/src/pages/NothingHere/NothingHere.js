import React from "react";
import "./NothingHere.css";
import { BUTTON } from "../../styled-components/styled-components";
const errorIcon = require("../../assets/404.png");

export const NothingHere = () => {
  return (
    <div className="nothing-container d-flex justify-content-center align-items-center">
      <div>
        <img className="my-4" src={errorIcon} alt="404" />
        <h2 className="nothing-message">Sorry, there's nothing here!</h2>
        <BUTTON onClick={() => window.location.replace("/")}>Home</BUTTON>
      </div>
    </div>
  );
};
