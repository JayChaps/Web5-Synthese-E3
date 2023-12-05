import React from 'react'
import { FaPen } from "react-icons/fa6";
import { GrSubtractCircle } from "react-icons/gr";
import { FaPlayCircle } from "react-icons/fa";
import SliderPlaylists from '../components/Playlist/SliderPlaylists';

const LesPlaylist = () => {
  const urlImg = "src/assets/img/jpg/placeholder.jpg";
  return (
    <div className='lesplaylists'>

    <SliderPlaylists />
      <header>
        <section className="lesplaylists__infos">
          <h1>NomPlaylist</h1>
          <h1>NomPlaylist</h1>
          <h1>NomPlaylist</h1>
          <h1>NomPlaylist</h1>
          <section className='lesplaylists__infos__icones'>
            <div className="lesplaylistcompte">
              <img src={urlImg} alt="" />
              <span></span>
            </div>
            <FaPen size={"2rem"} color="var(--noir)" />
            <GrSubtractCircle size={"2rem"} color="var(--noir)" />
            <FaPlayCircle
            size={"4rem"}
            color="var(--noir)"
          />
          </section>
        </section>
      </header>
    </div>
  )
}

export default LesPlaylist