import React from "react";
import "./Metronome.css"
const upArrow = require('../../assets/up.png')
export const Metronome = () => {
  return (
    <div className="d-flex justify-content-center align-items-center">
      <img className="down-arrow" src={upArrow} alt="increase metronome" />
      <div className="metronome-circle mx-2">
        <p className="metronome-bpm">120</p>
      </div>
      <img className="up-arrow" src={upArrow} alt="increase metronome" />
    </div>
  );
};
