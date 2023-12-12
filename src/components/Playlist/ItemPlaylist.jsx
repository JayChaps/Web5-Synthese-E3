import React from "react";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgRemove } from "react-icons/cg";



const ItemPlaylist = ({playlist, name}) => {

  const urlImg = "/src/assets/img/jpg/placeholder.jpg";

  const click = () => {
    console.log("click");
    console.log(name);
  };

  
  return (
    <article className="itemplaylist">
      <div className="wrapperitem">
        <h3>{name}</h3>
        <img src={urlImg} alt="" />
        <img src={urlImg} alt="" />
        <img src={urlImg} alt="" />
        <img src={urlImg} alt="" />
        <Link to="/playlist" onClick={click} className="itema">
          <FaPlayCircle size={"4rem"} color="var(--blanc)" />
        </Link>
        <CgRemove size={"2rem"} color="var(--blanc)" />
      </div>
    </article>
  );
};

export default ItemPlaylist;
