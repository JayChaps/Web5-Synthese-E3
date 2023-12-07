import React from "react";
import { FaPen } from "react-icons/fa6";
import { GrSubtractCircle } from "react-icons/gr";
import { FaPlayCircle } from "react-icons/fa";
import SliderPlaylists from "../components/Playlist/SliderPlaylists";

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
    </div>
  );
};

export default LesPlaylist;
