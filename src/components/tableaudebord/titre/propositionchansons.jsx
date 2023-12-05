import React from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";

const PropositionChansons = () => {
  return (
    <section className="propositionchansons">
      <div className="left">
        <img src="src\assets\jpg\placeholder.jpg" alt="Song Image" />
      </div>
      <div className="center">
        <h2 className="song-name">Chanson</h2>
        <p className="artist-name">Artiste</p>
      </div>
      <div className="right">
        <BiHeart size={"1.2rem"} color="var(--blanc)" className="like-icon" />
        <FaPlayCircle size={"1.2rem"} color="var(--blanc)" className="add-icon" />
      </div>
    </section>
  );
};

export default PropositionChansons;
