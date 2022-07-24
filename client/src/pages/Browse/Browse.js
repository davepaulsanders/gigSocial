import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_SETLISTS } from "../../utils/queries";
import { Header } from "../../components/Header/Header";
import { Setlist } from "../../components/Setlist/Setlist";

const pick = require("../../assets/guitar-pick.png");

export const Browse = () => {
  const { loading, data } = useQuery(GET_ALL_SETLISTS);

  const setListData = data?.getAllSetlists;

  if (loading) {
    return "loading";
  }
  return (
    <div className="d-flex flex-column justify-content-center">
      <Header />
      <div className="setlist-container container">
        <div className="row">
          <div className="col setlist-header d-flex">
            <img className="guitar-pick" src={pick} alt="guitar pick" />
            <h2 className="setlists-title">Setlists</h2>
          </div>
        </div>
        <div className="row">
          {/* If there is only one setlist */}
          {setListData.length === 1 ? (
            <div className="col" key={setListData[0].setListName}>
              <Setlist
                username={setListData.setListCreator}
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
      </div>
    </div>
  );
};
