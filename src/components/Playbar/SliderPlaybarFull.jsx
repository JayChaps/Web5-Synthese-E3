import React, { useEffect, useState } from "react";

const SliderPlaybarFul = ({ progress, duration }) => {
  const [value, setValue] = useState(0);
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

  const mathValue = value <= 50 ? 50 - value : value - 50;

  const width = windowDimensions.width < 800 ? windowDimensions.width : 800;
  const heightSlider = 40; // Meme valeur que dans le css(height: 20px)
  const widthSliderknob = 30;
  const radius = width / 2;
  const cos = mathValue / 100;

  const opposite = Math.sin(Math.acos(cos)) * radius * 2;

  // degré fonctionne pas avec les cosinus
  const degree =
    value <= 50
      ? Math.acos(cos) 
      * (180 / Math.PI)
      : 180 - Math.acos(cos) * (180 / Math.PI);

  console.log(degree);

  const tailStyle = {
    background: `conic-gradient(
    var(--mauve) 0deg,
    var(--rose) ${degree}deg,
    transparent ${degree}deg)`,
  };
  const thumbContainerStyle = {
    transform: `translateY(calc(${

      -opposite +
      width +
      heightSlider / 2 -
      widthSliderknob / 2 -
      (Math.abs(value - 50) / 100) * 50
    }px - 50%
      )) translateX(calc(${
        (value / 100) * (width * 0.85 - widthSliderknob) -
        radius * 0.85 +
        widthSliderknob / 2
      }px))`,
  };
  const sliderStyle = {
    transform: `translateY(calc(${
      -opposite +
      width +
      heightSlider / 2 -
      widthSliderknob / 2 -
      (Math.abs(value - 50) / 100) * 50
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
          className="radial-slider__input"
          style={sliderStyle}
          type="range"
          min="0"
          max="100"
          step="0.25"
          value={value}
          onChange={(e) => setValue(e.target.value)}
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
