import React, { useState, useEffect, useContext } from "react";

import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { BiSolidSkipNextCircle } from "react-icons/bi";

import { BsShuffle } from "react-icons/bs";
import { RxLoop } from "react-icons/rx";
import { CgAdd } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";

import { IoVolumeOff } from "react-icons/io5";
import { IoVolumeLow } from "react-icons/io5";
import { IoVolumeMedium } from "react-icons/io5";
import { IoVolumeHigh } from "react-icons/io5";
import { IoVolumeMute } from "react-icons/io5";

import { useAudio, useAudioProgress } from "../../context/audiotim";
import { SongInfoContext } from "../../context/SongInfoContext";
import { useFavorites } from "../../context/FavoritesContext";
import PlaybarFull from "./PlaybarFull";
import { PlaylistsContext } from "../../context/playlistsContext";
import { PlaybarContext } from "../../context/playbarContext";
import Coeur from "../Coeur/Coeur";


const Playbar = () => {
  const {
    play,
    pause,
    isPaused,
    changeSource,
    isReady,
    stop,
    togglePause,
    duration,
    volume,
    changeVolume,
  } = useAudio();

  // const [isFullbarOpen, setIsFullbarOpen] = useState(false);

  const { isFullbarOpen, setIsFullbarOpen } = useContext(PlaybarContext);

  const [isMuted, setIsMuted] = useState(false);
  const [lastVolume, setLastVolume] = useState(0.5);
  const [isDragging, setIsDragging] = useState(false);

  const { progress, changeProgress } = useAudioProgress();
  const { songInfo, updateSongInfo } = useContext(SongInfoContext);
  const { selectedSong, setSelectedSong } = useContext(PlaylistsContext);

  // Fonction pour jouer ou mettre en pause la chanson
  const handlePlayPause = () => {
    togglePause();
    console.log(songInfo);
  };



  const handleMouseDown = (e) => {
    e.preventDefault(); // Empêcher le comportement de sélection du texte ou autre
    setIsDragging(true);
    handleProgressChange(e);
  };

  const handleMouseUp = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    e.preventDefault();
    if (isDragging) {
      handleProgressChange(e);
    }
  };
  const handleProgressChange = (e) => {
    const progressBar = e.currentTarget;
    const progressBarRect = progressBar.getBoundingClientRect();
    const newProgress = (e.pageX - progressBarRect.left) / progressBarRect.width;
    changeProgress(Math.min(Math.max(newProgress, 0), 1));
  };


  const { addToFavorites } = useFavorites();

  // Fonction pour ajouter la chanson aux favoris
  const handleAddToFavorites = () => {
    addToFavorites(songInfo);

    // addToFavorites({
    //   id: songInfo.id,
    //   title: songInfo.title,
    //   artist: songInfo.artist,
    //   coverUrl: songInfo.coverUrl,
    // });
    console.log("Song added to favorites : " + songInfo.title);
  };




  const handleClick = (e) => {
    if (e.target.classList.contains("playbar__inner")) {
      setIsFullbarOpen(!isFullbarOpen);
    } else {
      return;
    }
  };

  const handleVolume = (e) => {
    changeVolume(e.target.value);
    setLastVolume(e.target.value);
    if (e.target.value > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      changeVolume(lastVolume);
    } else {
      setIsMuted(true);
      setLastVolume(volume);
      changeVolume(0);
    }
  };
  // console.log(songInfo);

  const urlImg = "/src/assets/img/jpg/placeholder.jpg";

  
  return (
    <aside className="playbar">
      {/* Mettre le composant PlaybarFull si on clique quelque part */}
      {/* A enlever pour voir */}

      {/* ------------------- setIsFullbarOpen à false quand on change de location.pathname */}
      {isFullbarOpen && (
        <>
          <PlaybarFull
            songInfo={songInfo}
            progress={progress}
            duration={duration}
          >
            <div className="outer" onClick={() => setIsFullbarOpen(false)}>
              <div className="inner">
                <label>Retour</label>
              </div>
            </div>
          </PlaybarFull>
          <div className="cover">
            <img src={urlImg} alt="" />
          </div>
        </>
      )}
      <div className="playbar__inner" onClick={handleClick}>
        <section className="playbar__inner__left">
          <div className="iconeShuffleLoop">
            <BsShuffle size={"2rem"} color="var(--noir)" />
          </div>
          <div className="iconeShuffleLoop">
            <RxLoop size={"2rem"} color="var(--noir)" />
          </div>

          <div className="playbar__inner__left__cover">
            <img
              src={songInfo.coverUrl ? songInfo.coverUrl : urlImg}
              alt="cover"
            />
          </div>
          <div className="playbar__inner__left__info">
            <span>{songInfo.title}</span>
            <span>{songInfo.artist}</span>
          </div>
        </section>
        <section className="playbar__inner__center">
          <BiSolidSkipNextCircle size={"3rem"} color="var(--blanc)" />

          {isPaused ? (
            <>
              <FaPlayCircle
                onClick={handlePlayPause}
                size={"4rem"}
                color="var(--blanc)"
              />
            </>
          ) : (
            <>
              <FaPauseCircle
                onClick={handlePlayPause}
                size={"4rem"}
                color="var(--blanc)"
              />
            </>
          )}
          <BiSolidSkipNextCircle size={"3rem"} color="var(--blanc)" />
        </section>
        <section className="playbar__inner__right">
          {/* <BiHeart size={"3.5rem"} color="var(--rose)" onClick={handleAddToFavorites} /> */}
          <Coeur />
          <CgAdd size={"3.5rem"} color="var(--blanc)" />

          {isMuted ? (
            <IoVolumeMute
              size={"3.5rem"}
              color="var(--blanc)"
              onClick={handleMute}
            />
          ) : volume <= 0 && !isMuted ? (
            <IoVolumeOff
              size={"3.5rem"}
              color="var(--blanc)"
              onClick={handleMute}
            />
          ) : volume < 0.5 && !isMuted ? (
            <IoVolumeLow
              size={"3.5rem"}
              color="var(--blanc)"
              onClick={handleMute}
            />
          ) : volume < 0.75 && !isMuted ? (
            <IoVolumeMedium
              size={"3.5rem"}
              color="var(--blanc)"
              onClick={handleMute}
            />
          ) : (
            volume >= 0.75 && (
              <IoVolumeHigh
                size={"3.5rem"}
                color="var(--blanc)"
                onClick={handleMute}
              />
            )
          )}
          <div className="volume">
            <div
              className="progress"
              style={{
                width: `
                calc(${volume * 100}% + ${15 - volume * 15}px)`,
              }}
            ></div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolume}
              disabled={!isReady}
            />
          </div>
        </section>
        <section className="playbar__inner__center__progress"
        >
          <span>
            0:{(progress * duration).toFixed(0) < 10 ? "0" : ""}
            {(progress * duration).toFixed(0)}
          </span>{" "}
          <div
            className="playbar__inner__center__progress__bar"
            onClick={handleProgressChange}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseUp}
            onMouseUp={handleMouseUp}
            style={{ width: `${(duration / duration) * 100}%` }}
          >
            <div
              className="playbar__inner__center__progress__bar__inner"
              style={{ width: `${progress * 100}%` }}
            >
              <div className="draggable"></div>
            </div>
          </div>
          <span>0:{duration.toFixed(0)}</span>
        </section>
      </div>
    </aside>
  );
};

export default Playbar;

// <div className="playbar__inner">
//   <section className="playbar__inner__left">
//     <div className="playbar__inner__left__cover">
//       <img src={songInfo.coverUrl} alt="cover" />
//     </div>
//     <div className="playbar__inner__left__song">
//       <div className="playbar__inner__left__song__title">
//         <span>{songInfo.title}</span>
//       </div>
//       <div className="playbar__inner__left__song__artist">
//         <span>{songInfo.artist}</span>
//       </div>
//     </div>
//   </section>
//   <section className="playbar__inner__center">
//     <button className="playbar__inner__center__buttons__previous">
//       <b className="fas fa-step-backward">{"⏮"}</b>
//     </button>
//     <button
//       className="playbar__inner__center__buttons__play"
//       onClick={handlePlayPause}
//     >
//       <b className="fas fa-play">{isPaused ? "▶️" : "⏸"}</b>
//     </button>
//     <button className="playbar__inner__center__buttons__next">
//       <b className="fas fa-step-forward">{"⏭"}</b>
//     </button>
//   </section>

//   <button className="playbar__inner__center__buttons__shuffle">
//     <b className="fas fa-random">{"🔀"}</b>
//   </button>
//   <button className="playbar__inner__center__buttons__repeat">
//     <b className="fas fa-redo">{"🔁"}</b>
//   </button>

//   <section className="playbar__inner__center__progress">
//     <div className="playbar__inner__center__progress__time">
//       <span>
//         0:{(progress * duration).toFixed(0) < 10 ? "0" : ""}
//         {(progress * duration).toFixed(0)}
//       </span>
//     </div>
//     <div
//       className="playbar__inner__center__progress__bar"
//       style={{ width: `${(duration / duration) * 100}%` }}
//     >
//       --------------------------------------
//       <div
//         className="playbar__inner__center__progress__bar__inner"
//         style={{ width: `${progress * 100}%` }}
//       ></div>
//     </div>
//     <div className="playbar__inner__center__progress__time">
//       <span>{duration}</span>
//     </div>
//   </section>
// </div>
