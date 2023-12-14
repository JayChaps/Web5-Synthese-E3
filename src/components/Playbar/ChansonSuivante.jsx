// ChansonSuivante.jsx :
import React from "react";
import { BiHeart } from "react-icons/bi";
import { CgRemove } from "react-icons/cg";
import Coeur from "../Coeur/Coeur";

  // <CgRemove size={"2rem"} color="var(--noir)" />
const ChansonSuivante = ({song}) => {

  const coverImg = song.album.cover ? song.album.cover : "src/assets/img/jpg/placeholder.jpg";
  const songTitle = song.title ? song.title : "Titre inconnu";
  const artistName = song.artist.name ? song.artist.name : "Artiste inconnu";


  return (
    <article className="chansonsuivante">
      <div className="chansonsuivante__inner">
        <div className="chansonsuivante__cover">
          <img src={coverImg} alt="cover" />
        </div>

        <div className="chansonsuivante__icones">
          <Coeur />
          <CgRemove size={"2rem"} color="var(--blanc)" />
        </div>

        <div className="chansonsuivante__info">
          <span>{songTitle}</span>
          <span>{artistName}</span>
        </div>
      </div>
    </article>
  );
};

export default ChansonSuivante;
