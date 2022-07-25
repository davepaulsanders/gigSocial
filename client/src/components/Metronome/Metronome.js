import React, { useState } from "react";
import "./Metronome.css";
const upArrow = require("../../assets/up.png");
export const Metronome = () => {
  let [bpm, setBpm] = useState(120);

  const toggleMetronome = (e) => {
    e.preventDefault();
    const metronome = document.querySelector(".metronome-circle");
    if (metronome.classList.contains("pulse")) {
      metronome.classList.remove("pulse");
    } else {
      metronome.classList.add("pulse");
    }
  };

  const bpmTempoSet = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("up-arrow")) {
      if (bpm === 350) {
        return;
      }
      setBpm(++bpm);
    }
    if (e.target.classList.contains("down-arrow")) {
      if (bpm === 40) {
        return;
      }
      setBpm(--bpm);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center">
      <img
        onClick={bpmTempoSet}
        className="down-arrow"
        src={upArrow}
        alt="increase metronome"
      />
      <div onClick={toggleMetronome} className="metronome-circle mx-2">
        <p className="metronome-bpm">{bpm}</p>
      </div>
      <img
        onClick={bpmTempoSet}
        className="up-arrow"
        src={upArrow}
        alt="increase metronome"
      />
    </div>
  );
};
