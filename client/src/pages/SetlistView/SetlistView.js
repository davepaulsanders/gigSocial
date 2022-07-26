import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./SetlistView.css";
import { useQuery } from "@apollo/client";
import { GET_SETLIST } from "../../utils/queries";
// components
import { Header } from "../../components/Header/Header";
import { SearchModal } from "../../components/SearchModal/SearchModal";
import { SetlistContainer } from "../../components/SetlistContainer/SetlistContainer";
import { CommentContainer } from "../../components/CommentContainer/CommentContainer";

// authentication
import Auth from "../../utils/frontEndAuth";

//images

export const SetlistView = () => {
  if (!Auth.loggedIn()) {
    window.location.replace("/");
  }
  // get the setlist data
  const setListId = useParams().id;

  // query to get setlist info
  const { loading, data } = useQuery(GET_SETLIST, {
    variables: { setListId: setListId },
  });
  // save setlist data to variable
  const setListData = data?.getSetlist;

  // get the user's id from the token in localstorage
  const userId = Auth.getProfile().data._id;
  const username = Auth.getProfile().data.username;
  const [openModal, setOpenModal] = useState(false);

  // if no data yet
  if (loading) {
    return "";
  }
  return (
    <div className="d-flex flex-column justify-content-center">
      <Header />
      <SearchModal openModal={openModal} setOpenModal={setOpenModal} />
      {/* SONGS */}
      <div className="mobile-desktop-flex d-flex flex-column align-items-center justify-content-center container">
        <SetlistContainer
          setListId={setListId}
          username={username}
          userId={userId}
          setListData={setListData}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        <CommentContainer
          setListId={setListId}
          username={username}
          setListData={setListData}
        />
      </div>
    </div>
  );
};
