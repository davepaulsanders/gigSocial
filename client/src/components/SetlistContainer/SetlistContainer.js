import React, { useState } from "react";
import { APPEARDIV } from "../../styled-components/styled-components";
import { Metronome } from "../../components/Metronome/Metronome";
import { useMutation } from "@apollo/client";
import { GET_SETLIST } from "../../utils/queries";
import { ADD_LIKE } from "../../utils/mutations";
import { Song } from "../Song/Song";
import "./SetlistContainer.css";

const plus = require("../../assets/plus.png");
const pick = require("../../assets/guitar-pick.png");
const blackHeart = require("../../assets/black-heart.png");

export const SetlistContainer = ({
  userId,
  username,
  setListId,
  setListData,
  setOpenModal,
}) => {
  // variable for checking if the active delete menu is active in any song
  const [activeDelete, setActiveDelete] = useState(false);
  // keeping track of bpm
  let [bpm, setBpm] = useState(120);

  // mutation for adding likes
  const [addLike, { error }] = useMutation(ADD_LIKE, {
    refetchQueries: [{ query: GET_SETLIST, variables: { setListId } }],
  });

  const likeSetlist = (e) => {
    e.preventDefault();

    addLike({ variables: { setListId, _id: userId } });
  };

  return (
    <APPEARDIV className="setlist-container w-50">
      <div className="row">
        <div className="col-6 setlist-header m-0 d-flex align-items-center">
          <img className="guitar-pick" src={pick} alt="guitar pick" />
          <h2 className="setlists-title">{setListData.setListName}</h2>
          <img
            className="setlist-likes"
            alt="likes"
            onClick={likeSetlist}
            src={blackHeart}
          />
          <p className="setlist-likes-count">{setListData.likes}</p>
        </div>
        <div className="col-4">
          <Metronome bpm={bpm} setBpm={setBpm} />
        </div>
        {username === setListData.setListCreator ? (
          <div className="col-2 plus-col">
            <button className="add-setlist" type="button">
              <img
                className="plus"
                src={plus}
                alt="add playlist"
                onClick={() => setOpenModal(true)}
              />
            </button>
          </div>
        ) : null}
      </div>
      <div className="row">
        {/* If there is only one song */}
        {setListData.songs.length === 1 ? (
          <div className="col-12" key={setListData.song[0].artist}>
            <Song bpm={bpm} setBpm={setBpm} song={setListData.songs[0]} />
          </div>
        ) : (
          // if there are many songs
          setListData.songs.map((song, i) => (
            <div className="col-12" key={`${song.artist}-${song.songTitle}`}>
              <Song
                bpm={bpm}
                setBpm={setBpm}
                currentUser={username}
                setListCreator={setListData.setListCreator}
                activeDelete={activeDelete}
                setActiveDelete={setActiveDelete}
                songOrder={i}
                song={song}
              />
            </div>
          ))
        )}
      </div>
    </APPEARDIV>
  );
};
