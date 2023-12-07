import React from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

const ListesDeLectures = () => {
  return (
    <div className="outer-container">
      <section className="container-listes-de-lecture">
        <div className="image-container-liste">
          <FaPlayCircle
            size={"3rem"}
            color="var(--noir)"
            className="play-icon-listes-de-lecture"
          />
          <h2 className="titre-liste">Liste de lecture # </h2>
          <img
            src="src\assets\img\jpg\placeholder.jpg" // Change image here
            alt="listedelecture"
            className="cover-mask"
          />
        </div>
      </section>
    </div>
  );
};

export default ListesDeLectures;
