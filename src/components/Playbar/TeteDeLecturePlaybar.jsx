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
    const progressBar = e.currentTarget;
    const progressBarRect = progressBar.getBoundingClientRect();
    const newProgress =
      (e.pageX - progressBarRect.left) / progressBarRect.width;
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
