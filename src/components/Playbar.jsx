import React, { useState, useEffect, useContext } from "react";
import "../css/Playbar.css";
import { useAudio, useAudioProgress } from "../context/audiotim";
import { SongInfoContext } from "../context/SongInfoContext";

const Playbar = () => {

    const { play, pause, isPaused, changeSource, isReady, 
        stop, togglePause, duration, volume, changeVolume } = useAudio();

    const { progress , changeProgress} = useAudioProgress();
    const { songInfo, updateSongInfo } = useContext(SongInfoContext);
    const [isDragging, setIsDragging] = useState(false);

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

                    <div className="playbar__inner__center__progress"
                     onClick={handleProgressChange} 
                     onMouseDown={handleMouseDown}
                     onMouseMove={handleMouseMove}
                     onMouseLeave={handleMouseUp} // Ajouté pour s'assurer que le glissement s'arrête si la souris quitte la barre
                     onMouseUp={handleMouseUp}>
                        <div className="playbar__inner__center__progress__time">
                            <span>0:{(progress * duration).toFixed(0) < 10 ? "0" : ""}{(progress * duration).toFixed(0)}</span>
                        </div>
                        <div className="playbar__inner__center__progress__bar"
                            style={{ width: `${duration / duration * 100}%` }}
                        >--------------------------------------
                            <div className="playbar__inner__center__progress__bar__inner "
                           
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
