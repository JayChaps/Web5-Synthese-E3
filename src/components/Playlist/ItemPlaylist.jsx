
import React, { useContext, useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgRemove } from "react-icons/cg";
import { PlaylistsContext } from "../../context/playlistsContext";



const ItemPlaylist = ({ playlist, name, songs }) => {
  const urlImg = "/src/assets/img/jpg/placeholder.jpg";

  const [covers, setCovers] = useState([]);

  useEffect(() => {
    if (songs && songs.length > 0) {
      const coversArray = songs.slice(0, 4).map((song) => song.album?.cover || urlImg);
      setCovers(coversArray);
    } else {
      // Handle the case where no songs are available
      setCovers([urlImg, urlImg, urlImg, urlImg]);
    }
  }, [songs]);

  const click = (e) => {
    e.preventDefault();
    setClickedPlaylist(playlist);
  };

  return (
    <article className="itemplaylist">
      <div className="wrapperitem">
        <h3>{name}</h3>
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
