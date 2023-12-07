import React from "react";
import { FaPen } from "react-icons/fa6";
import { GrSubtractCircle } from "react-icons/gr";
import { FaPlayCircle } from "react-icons/fa";
import SliderPlaylists from "../components/Playlist/SliderPlaylists";
import RecherchePlaylist from "../components/Playlist/RecherchePlaylist";

const LesPlaylist = () => {
  const urlImg = "src/assets/img/jpg/placeholder.jpg";
  return (
    <div className="lesplaylists">
      <SliderPlaylists />
      <header>
        <section className="lesplaylists__infos">
          <div className="titreplaylist">
            <h1>NomPlaylist</h1>
            <h1>NomPlaylist</h1>
            <h1>NomPlaylist</h1>
            <h1>NomPlaylist</h1>
          </div>
          <section className="lesplaylists__infos__icones">
            <div className="lesplaylistcompte">
              <div>
                <img src={urlImg} alt="" />
              </div>
              <span>Nicolas Lauzon</span>
            </div>
            <div className="lesplaylists__infos__icones__icones">

              <FaPen size={"1rem"} color="var(--noir)" />
              <GrSubtractCircle size={"1rem"} color="var(--noir)" />
              <FaPlayCircle size={"2rem"} color="var(--noir)" />
            </div>
          </section>

        </section>
        {/* Cover de la playlist 1 image dans chaque coin */}
        <div className="coverplaylist">
          <img src={urlImg} alt="" />
          <img src={urlImg} alt="" />
          <img src={urlImg} alt="" />
          <img src={urlImg} alt="" />
        </div>
      </header>

      <section className="lesplaylists__playlist">
        <div className="lesplaylists__playlist__inner">
          <RecherchePlaylist />
        </div>

        <section className="lesplaylists__playlist__inner__chansons">
          <div className="lesplaylists__playlist__inner__chansons__infos">
            <span className="chansons__infos__number">
              #
            </span>
            <span className="chansons__infos__titre">
              Titre
            </span>
            <span className="chansons__infos__album">
              Artiste
            </span>
            <span className="chansons__infos__duree">
              Durée
            </span>
          </div>

          <div className="lesplaylists__playlist__inner__chansons__chansons">
          </div>
        </section>
      </section>
    </div>
  );
};

export default LesPlaylist;
