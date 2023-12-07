import React from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

import PropositionChansons from "../titre/propositionchansons";

const SectionTitre = () => {
  return (
    <section className="containersectiontitre">
      <div className="content">
        <FaPlayCircle size={"4rem"} color="var(--blanc)" className="play-icon" />
        <h1 className="titresectiontitre1">Titre album</h1>
        <h1 className="titresectiontitre2">Titre album</h1>
        <h1 className="titresectiontitre3">Titre album</h1>
        <div className="small-image"><img src="src\assets\jpg\placeholder.jpg" alt="" /></div>
        <PropositionChansons />
        <PropositionChansons />
        <PropositionChansons />
        <PropositionChansons />
      </div>
    </section>
  );
};

export default SectionTitre;

