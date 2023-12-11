import React from "react";
import { CgAdd } from "react-icons/cg";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import CreerPlaylistInput from "../RechercheDeezer/CreerPlaylistInput";

const ItemPlaylistFirst = () => {
    
  const urlImg = "/src/assets/img/jpg/placeholder.jpg";
  return (
    <article className="itemplaylist itemplaylistfirst">
      <div className="wrapperitem">
        <CreerPlaylistInput
          placeholder={"Créer une playlist"}
          autoFocus={false}
        />
        <CgAdd size={"4rem"} color="var(--blanc)" />
      </div>
    </article>
  );
};

export default ItemPlaylistFirst;
