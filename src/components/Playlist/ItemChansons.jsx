import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { CgRemove } from "react-icons/cg";

const ItemChansons = () => {
  const urlImg = "src/assets/img/jpg/placeholder.jpg";
  return (
    <article>
      <div className="chansonnumber">
        <span>1</span>
      </div>
      <div>
        <div className="chansoncover">
          <img src={urlImg} alt="" />
          <FaPlayCircle size={"2rem"} color="var(--noir)" />
        </div>
        <div className="infoschansons">
          <span>Titre</span>
          <span>Artiste</span>
        </div>

        <div className="album">
          <span>Album</span>
        </div>

        <div className="duree">
          <span>3:00</span>
        </div>

        <div className="icones">
          <FaPlayCircle size={"2rem"} color="var(--noir)" />
          <CgRemove size={"2rem"} color="var(--noir)" />
        </div>
      </div>
    </article>
  );
};

export default ItemChansons;
