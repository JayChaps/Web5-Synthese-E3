import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { CgRemove } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";
import Coeur from "../Coeur/Coeur";
import { Link } from "react-router-dom";

const ItemChansons = () => {
  const urlImg = "src/assets/img/jpg/placeholder.jpg";
  return (
    <article>
      <div className="chansonnumber">
        <span>1</span>
      </div>
      <div className="info">
        <div className="chansoncover">
          <img src={urlImg} alt="" />
          <FaPlayCircle size={"2rem"} color="var(--noir)" />
        </div>
        <div className="infoschansons">
          <Link>
          <span>Titre</span>
          </Link>
          <Link>
          <span>Artiste</span>
          </Link>
        </div>

        <div className="albumplaylist">
          <span>Album</span>
        </div>

        <div className="duree">
          <span>3:00</span>
        </div>

        <div className="icones">
          <Coeur />
          <CgRemove size={"2rem"} color="var(--noir)" />
        </div>
      </div>
    </article>
  );
};

export default ItemChansons;
