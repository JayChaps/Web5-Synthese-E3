import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const AnimationLecteur = () => {
  const music = "src/assets/song/titanium-170190.mp3";
  const listener = new THREE.AudioListener();
  const sound = new THREE.Audio(listener);
  const analyser = new THREE.AudioAnalyser(sound, 32);

  const frequence1Ref = useRef();
  const frequence2Ref = useRef();
  const frequence3Ref = useRef();
  const frequence4Ref = useRef();
  const frequence5Ref = useRef();
  const frequence6Ref = useRef();

  const linesRef = useRef();

  useEffect(() => {
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(music, function (buffer) {
      sound.setBuffer(buffer);
      sound.setLoop(true);
      sound.setVolume(0.5);
    });

    window.addEventListener("click", () => {
      if (sound.isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
    });
  }, []);
  return <div className="animationLecteur"></div>;
};

export default AnimationLecteur;
