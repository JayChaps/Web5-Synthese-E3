import React from "react";
import { BiHeart } from "react-icons/bi";
import { CgRemove } from "react-icons/cg";

  <CgRemove size={"2rem"} color="var(--noir)" />
const ChansonSuivante = () => {
  return (
    <article className="chansonsuivante">
      <div className="chansonsuivante__inner">
        <div className="chansonsuivante__cover">
          <img src="src\assets\img\jpg\placeholder.jpg" alt="cover" />
        </div>

        <div className="chansonsuivante__icones">
          <BiHeart size={"2.2rem"} color="var(--rose)" />
          <CgRemove size={"2rem"} color="var(--noir)" />
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
