import React from "react";
import { SONG_CONTAINER } from "../../styled-components/styled-components";

export const SearchCard = ({ song }) => {
  
  const artist = song.primary_artist.name;
  const image = song.song_art_image_thumbnail_url;
  const title = song.title;
  return (
    <SONG_CONTAINER>
      <img className="album-art" src={image} alt="album art" />
      <div className="album-info-container">
        <p className="album-info song-name">{title}</p>
        <p className="album-info">{artist}</p>
      </div>
    </SONG_CONTAINER>
  );
};
