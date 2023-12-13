import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { CgAdd, CgRemove } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";
import Coeur from "../Coeur/Coeur";

const ItemChansonRecomande = ({ premier = false }) => {
  const urlImg = "src/assets/img/jpg/placeholder.jpg";
  return (
    <article className={premier? "premier recommande":"recommande"}>
        <div className="chansoncover">
          <img src={urlImg} alt="" />
          <FaPlayCircle size={"2rem"} color="var(--noir)" />
        </div>
        <div className="infoschansons">
          <span>Titre</span>
          <span>Artiste</span>
        </div>

        <div className="albumplaylist">
          <span>Album</span>
        </div>

        <div className="duree">
          <span>3:00</span>
        </div>

        <div className="icones">
          <Coeur />
          <CgAdd size={"2rem"} color="var(--noir)" />
        </div>
  
    </article>
  );
};

export default ItemChansonRecomande;
