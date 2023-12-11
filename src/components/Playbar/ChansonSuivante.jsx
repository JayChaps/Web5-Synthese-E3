import React from "react";
import { BiHeart } from "react-icons/bi";
import { CgRemove } from "react-icons/cg";
import Coeur from "../Coeur/Coeur";

  <CgRemove size={"2rem"} color="var(--noir)" />
const ChansonSuivante = () => {
  return (
    <article className="chansonsuivante">
      <div className="chansonsuivante__inner">
        <div className="chansonsuivante__cover">
          <img src="src\assets\img\jpg\placeholder.jpg" alt="cover" />
        </div>

        <div className="chansonsuivante__icones">
          <Coeur />
          <CgRemove size={"2rem"} color="var(--blanc)" />
        </div>

        <div className="chansonsuivante__info">
          <span>Titre</span>
          <span>Artiste</span>
        </div>
      </div>
    </article>
  );
};

export default ChansonSuivante;
