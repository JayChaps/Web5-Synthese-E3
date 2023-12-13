import React, { useEffect, useState } from "react";
import { useAudio, useAudioProgress } from "../../context/audiotim";

const SliderPlaybarFul = () => {
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
  const [isDragging, setIsDragging] = useState(false);
  const handleProgressChange = (e) => {
    const newProgress = e.target.value / 100; // Convertir en valeur de 0-1
    changeProgress(newProgress);
  };
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const mathValue =
    progress * 100 <= 50 ? 50 - progress * 100 : progress * 100 - 50;
  const width = windowDimensions.width < 800 ? windowDimensions.width : 800;
  const heightSlider = 40; // Meme valeur que dans le css(height: 20px)
  const widthSliderknob = 30;
  const radius = width / 2;
  const cos = mathValue / 100;

  const opposite = Math.sin(Math.acos(cos)) * radius * 2;
  // const smoothAddition = (value, limit) => {
  //   const smoothFactor = Math.abs(value - 50) / 100;
  //   return smoothFactor * limit;
  // };

  const degree =
    progress * 100 <= 50
      ? Math.acos(cos) * (180 / Math.PI)
      : 180 - Math.acos(cos) * (180 / Math.PI);

  const tailStyle = {
    background: `conic-gradient(
    var(--mauve) 0deg,
    var(--rose) ${degree}deg,
    transparent ${degree}deg)`,
  };
  const thumbContainerStyle = {
    transform: `translateY(calc(${
      -opposite * 0.85 +
      (width + heightSlider) * 0.85 -
      heightSlider / 2 -
      widthSliderknob / 2
    }px - 50%
      )) translateX(calc(${
        ((progress * 100) / 100) * (width * 0.85 - widthSliderknob) -
        radius * 0.85 +
        widthSliderknob / 2
      }px))`,
  };
  const sliderStyle = {
    transform: `translateY(calc(${
      -opposite * 0.85 +
      (width + heightSlider) * 0.85 -
      heightSlider +
      widthSliderknob / 4
    }px - 50%)) translateX(-50%)`,
  };

  // Math.sqrt(window.innerWidth - window.innerWidth * 0.95) -
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return (
    <section className="sliderplaybarfull">
      <div className="radial-slider">
        <input
         style={sliderStyle}
         className="radial-slider__input"
         type="range"
         min="0"
         max="100"
         value={progress * 100}
         onChange={handleProgressChange}
        />

        <div className="radial-slider__tail" style={tailStyle}>
          <div className="radial-slider__tail-inner">
            <div className="radial-slider__tail-inner__progress" />
          </div>
        </div>
        <div
          className="radial-slider__thumb-container"
          style={thumbContainerStyle}
        >
          <div className="radial-slider__thumb">
            <div className="radial-slider__thumb-shadow" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SliderPlaybarFul;
