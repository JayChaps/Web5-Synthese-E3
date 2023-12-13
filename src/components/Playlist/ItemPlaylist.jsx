
import React, { useContext, useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgRemove } from "react-icons/cg";
import { PlaylistsContext } from "../../context/playlistsContext";



const ItemPlaylist = ({ playlist}) => {
  const urlImg = "/src/assets/img/jpg/placeholder.jpg";

  const [covers, setCovers] = useState([]);

  const click = (e) => {
    e.preventDefault();
    setClickedPlaylist(playlist);
  };

  useEffect(() => {
    if (playlist.songs.length > 0) {
      const covers = playlist.songs.map((song) => song.cover);
      setCovers(covers);
    }
  }
  , [playlist]);

  return (
    <article className="itemplaylist">
      <div className="wrapperitem">
        <h3>{}</h3>
        {covers.map((cover, index) => (
          <img key={index} src={cover} alt={`Cover ${index + 1}`} />
        ))}
        <Link to="/playlist" onClick={click} className="itema">
          <FaPlayCircle size={"4rem"} color="var(--blanc)" />
        </Link>
        <CgRemove
          size={"2rem"}
          color="var(--blanc)"
          onClick={() => deletePlaylist(playlist.id)}
        />
      </div>
    </article>
  );
};

export default ItemPlaylist;
