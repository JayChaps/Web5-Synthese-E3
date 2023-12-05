import React, { useState, useEffect, useContext } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { BsShuffle } from "react-icons/bs";
import { RxLoop } from "react-icons/rx";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { BiHeart } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { useAudio, useAudioProgress } from "../../context/audiotim";
import { SongInfoContext } from "../../context/SongInfoContext";

import PlaybarFull from "./PlaybarFull";
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

  const [isFullbarOpen, setIsFullbarOpen] = useState(false);

  const { progress } = useAudioProgress();
  const { songInfo, updateSongInfo } = useContext(SongInfoContext);

  // Fonction pour jouer ou mettre en pause la chanson
  const handlePlayPause = () => {
    togglePause();
  };

  const handleClick = (e) => {
    if (e.target.classList.contains("playbar__inner")) {
      setIsFullbarOpen(!isFullbarOpen);
    } else {
      return;
    }
  };
  const urlImg = "src/assets/img/jpg/placeholder.jpg";
  return (
    <aside className="playbar">
      {/* Mettre le composant PlaybarFull si on clique quelque part */}
      {/* A enlever pour voir */}
      {isFullbarOpen && (
        <>
          <PlaybarFull
            songInfo={songInfo}
            progress={progress}
            duration={duration}
          />
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
            <img src={songInfo.coverUrl} alt="cover" />
          </div>
          <div className="playbar__inner__left__info">
            <span>{songInfo.title}</span>
            <span>{songInfo.artist}</span>
          </div>
        </section>
        <section className="playbar__inner__center">
          <BiSolidSkipNextCircle size={"3rem"} color="var(--blanc)" />

          {/* changer icone si en play ou en pause */}
          <FaPlayCircle
            onClick={handlePlayPause}
            size={"4rem"}
            color="var(--blanc)"
          />
          <BiSolidSkipNextCircle size={"3rem"} color="var(--blanc)" />
        </section>
        <section className="playbar__inner__right">
          <BiHeart size={"3.5rem"} color="var(--rose)" />
          <GrAddCircle size={"3rem"} color="var(--blanc)" />
        </section>
        <section className="playbar__inner__center__progress">
          <span>
            0:{(progress * duration).toFixed(0) < 10 ? "0" : ""}
            {(progress * duration).toFixed(0)}
          </span>{" "}
          <div
            className="playbar__inner__center__progress__bar"
          >
            <div
              className="playbar__inner__center__progress__bar__inner"
              style={{ width: `${progress * 100}%` }}
            >
              <div className="draggable"></div>
            </div>
          </div>
          <span>{duration}</span>

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
