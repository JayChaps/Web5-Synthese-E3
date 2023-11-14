import React, { useState, useEffect, useContext } from "react";
import "../css/Playbar.css";
import { useAudio, useAudioProgress } from "../context/audiotim";
import { SongInfoContext } from "../context/SongInfoContext";

const Playbar = () => {

    const { play, pause, isPaused, changeSource, isReady, 
        stop, togglePause, duration, volume, changeVolume } = useAudio();

    const { progress } = useAudioProgress();
    const { songInfo, updateSongInfo } = useContext(SongInfoContext);

    // Fonction pour jouer ou mettre en pause la chanson
    const handlePlayPause = () => {
        togglePause();
        console.log(songInfo);
    };

    

    return (
        <div className="playbar">
            <div className="playbar__inner">
                <div className="playbar__inner__left">
                    <div className="playbar__inner__left__cover">
                        <img src={songInfo.coverUrl} alt="cover" />
                    </div>
                    <div className="playbar__inner__left__song">
                        <div className="playbar__inner__left__song__title">
                            <span>{songInfo.title}</span>
                        </div>
                        <div className="playbar__inner__left__song__artist">
                            <span>{songInfo.artist}</span>
                        </div>
                    </div>
                </div>
                <div className="playbar__inner__center">
                    <div className="playbar__inner__center__buttons">
                        <button className="playbar__inner__center__buttons__previous">
                            <b className="fas fa-step-backward">{"⏮"}</b>
                        </button>
                        <button className="playbar__inner__center__buttons__play" onClick={handlePlayPause}>
                        <b className="fas fa-play">{isPaused ? "▶️" : "⏸"}</b>
                        </button>
                        <button className="playbar__inner__center__buttons__next">
                            <b className="fas fa-step-forward">{"⏭"}</b>
                        </button>
                        <button className="playbar__inner__center__buttons__shuffle">
                            <b className="fas fa-random">{"🔀"}</b>
                        </button>
                        <button className="playbar__inner__center__buttons__repeat">
                            <b className="fas fa-redo">{"🔁"}</b>
                        </button>
                    </div>

                    <div className="playbar__inner__center__progress">
                        <div className="playbar__inner__center__progress__time">
                            <span>{progress * duration}</span>
                        </div>
                        <div className="playbar__inner__center__progress__bar"
                            style={{ width: `${duration / duration * 100}%` }}
                        >--------------------------------------
                            <div className="playbar__inner__center__progress__bar__inner" 
                            style={{ width: `${progress * 100}%` }}></div>
                        </div>
                        <div className="playbar__inner__center__progress__time">
                            <span>{duration}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default Playbar;