import React from "react";
import { Link } from "react-router-dom";

import { FaPlayCircle } from "react-icons/fa";

const listesdelectures = () => {
  return (
    <section className="container-listes-de-lecture">
      <div>
        <h2 className="titre-liste">Liste de lecture</h2>
      </div>
      <div>
        <FaPlayCircle
          size={"3rem"}
          color="var(--noir)"
          className="play-icon-listes-de-lecture"
        />
      </div>
      <div className="image-container-liste">
        <img
          src="src\assets\img\jpg\placeholder.jpg" // Changer ici
          alt="listedelecture"
          className="cover-mask"
        />
      </div>
    </section>
  );
};

export default listesdelectures;