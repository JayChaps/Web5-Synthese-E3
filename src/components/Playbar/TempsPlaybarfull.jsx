import React from "react";
import { useAudio, useAudioProgress } from "../../context/audiotim";

const TempsPlaybarfull = () => {
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

  const { progress, changeProgress } = useAudioProgress();
  return (
    <div className="temps">
      <span>
        0:{(progress * duration).toFixed(0) < 10 ? "0" : ""}
        {(progress * duration).toFixed(0)}
      </span>
      <span>0:{Math.max(0, duration.toFixed(0))}</span>
    </div>
  );
};

export default TempsPlaybarfull;
