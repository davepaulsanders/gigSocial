import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_SETLISTS } from "../../utils/queries";
import { Header } from "../../components/Header/Header";
import { Setlist } from "../../components/Setlist/Setlist";
import { APPEARDIV } from "../../styled-components/styled-components";
import Auth from "../../utils/frontEndAuth";
import "./Browse.css"

const pick = require("../../assets/guitar-pick.png");

export const Browse = () => {
  const username = Auth.getProfile().data.username;
  const { loading, data } = useQuery(GET_ALL_SETLISTS, {
    variables: { username },
  });

  const setListData = data?.getAllSetlists;

  if (loading) {
    return "loading";
  }
  return (
    <div className="d-flex flex-column justify-content-center">
      <Header />
      <APPEARDIV className="setlist-container container">
        <div className="row">
          <div className="col setlist-header d-flex">
            <img className="guitar-pick-browse" src={pick} alt="guitar pick" />
            <h2 className="setlists-browse-title">
              Check out these other setlists!
            </h2>
          </div>
        </div>
        <div className="row">
          {/* If there is only one setlist */}
          {setListData.length === 1 ? (
            <div className="col" key={setListData[0].setListName}>
              <Setlist
                username={setListData[0].setListCreator}
                setlist={setListData[0]}
              />
            </div>
          ) : (
            // if there are many setlists
            setListData.map((set) => (
              <div className="col-md-6" key={set.setListName}>
                <Setlist username={set.setListCreator} setlist={set} />
              </div>
            ))
          )}
        </div>
      </APPEARDIV>
    </div>
  );
};
