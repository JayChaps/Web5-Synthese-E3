import React, { useState } from "react";
import { useAudio, useAudioProgress } from "../../context/audiotim";

const TeteDeLecturePlaybar = () => {
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
  const [isDragging, setIsDragging] = useState(false);
  const { progress, changeProgress } = useAudioProgress();

  const handleTouchStart = (e) => {
    e.preventDefault();
    setIsDragging(true);
    handleProgressChange(e.touches[0]);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    if (isDragging) {
      handleProgressChange(e.touches[0]);
    }
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
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
    const progressBar = document.querySelector(".playbar__inner__center__progress__bar");
    const progressBarRect = progressBar.getBoundingClientRect();
    const clientX = e.clientX || e.pageX; // Utilisez clientX pour les événements tactiles
    const newProgress = (clientX - progressBarRect.left) / progressBarRect.width;
    changeProgress(Math.min(Math.max(newProgress, 0), 1));
  };
  return (
    <section className="playbar__inner__center__progress">
      <span>
        0:{(progress * duration).toFixed(0) < 10 ? "0" : ""}
        {(progress * duration).toFixed(0)}
      </span>
      <div
        className="playbar__inner__center__progress__bar"
        onClick={handleProgressChange}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseUp}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ width: `${(duration / duration) * 100}%` }}
      >
        <div
          className="playbar__inner__center__progress__bar__inner"
          style={{ width: `${progress * 100}%` }}
        >
          <div className="draggable"></div>
        </div>
      </div>
      <span>0:{Math.max(0, duration.toFixed(0))}</span>

    </section>
  );
};

export default TeteDeLecturePlaybar;
