import React from "react";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import { BiHeart } from "react-icons/bi";
import { GrSubtractCircle } from "react-icons/gr";

const ChansonSuivante = () => {
  return (
    <article className="chansonsuivante">
      <div className="chansonsuivante__inner">
        <div className="chansonsuivante__cover">
          <img src="src\assets\img\jpg\placeholder.jpg" alt="cover" />
        </div>

        <div className="chansonsuivante__icones">
          <BiHeart size={"2rem"} color="var(--rose)" />
          <GrSubtractCircle size={"2rem"} color="var(--noir)" />
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
