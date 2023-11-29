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
      sound.setVolume(20);
    });

    window.addEventListener("click", () => {
      if (sound.isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
    });

    // Animation du visualiseur
    function animate() {
      const data = analyser.getFrequencyData();

      // Ajustez la position des span en fonction des données audio
      if (frequence1Ref.current) {
        frequence1Ref.current.style.transform = `translateY(${data[1]}px)`;
      }
      if (frequence2Ref.current) {
        frequence2Ref.current.style.transform = `translateY(${data[2]}px)`;
      }
      if (frequence3Ref.current) {
        frequence3Ref.current.style.transform = `translateY(${data[3]}px)`;
      }
      if (frequence4Ref.current) {
        frequence4Ref.current.style.transform = `translateY(${data[5]}px)`;
      }
      if (frequence5Ref.current) {
        frequence5Ref.current.style.transform = `translateY(${data[8]}px)`;
      }
      if (frequence6Ref.current) {
        frequence6Ref.current.style.transform = `translateY(${data[12]}px)`;
      }

      // Ajustez la courbure des lignes en fonction des données audio
      if (linesRef.current) {
        const vertices = linesRef.current.geometry.attributes.position.array;
        const numVertices = vertices.length / 3;

        for (let i = 0; i < numVertices; i++) {
          const factor = data[i % data.length] / 50; // Ajustez cette valeur selon vos besoins
          vertices[i * 3 + 1] = Math.sin(i / 10) * factor;
        }

        linesRef.current.geometry.attributes.position.needsUpdate = true;
      }

      requestAnimationFrame(animate);
    }

    // Lancer l'animation
    animate();

    // Nettoyer les ressources lors de la suppression du composant
    return () => {
      // Arrêter la lecture audio ou effectuer d'autres nettoyages si nécessaire
    };
  }, [
    analyser,
    frequence1Ref,
    frequence2Ref,
    frequence3Ref,
    frequence4Ref,
    frequence5Ref,
    frequence6Ref,
    linesRef,
  ]);

  return (
    <div className="animationLecteur">
      <span ref={frequence1Ref} className="frequence1"></span>
      <span ref={frequence2Ref} className="frequence2"></span>
      <span ref={frequence3Ref} className="frequence3"></span>
      <span ref={frequence4Ref} className="frequence4"></span>
      <span ref={frequence5Ref} className="frequence5"></span>
      <span ref={frequence6Ref} className="frequence6"></span>
      <Lines ref={linesRef} />
    </div>
  );
};
function generateRandomVertices(numVertices) {
  const vertices = [];
  for (let i = 0; i < numVertices; i++) {
    vertices.push(new THREE.Vector3(i - numVertices / 2, 0, 0));
  }
  return vertices;
}
// Composant Lines pour représenter les lignes courbées
// Composant Lines pour représenter les lignes courbées
const Lines = React.forwardRef((props, ref) => {
  const numVertices = 200;
  const curve = new THREE.CatmullRomCurve3(generateRandomVertices(numVertices));
  const points = curve.getPoints(numVertices);
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const material = new THREE.LineBasicMaterial({
    color: 0xffffff,
    linewidth: 2,
  });
  const lines = new THREE.Line(geometry, material);

  // Attacher la référence pour la mise à jour des vertices
  React.useImperativeHandle(ref, () => ({
    geometry: lines.geometry,
  }));

  const time = useRef(0);

  useEffect(() => {
    // Animation des vagues
    function animateWaves() {
      const vertices = lines.geometry.attributes.position.array;
      const numVertices = vertices.length / 3;

      for (let i = 0; i < numVertices; i++) {
        const offsetY =
          Math.sin((i / numVertices) * Math.PI * 2 + time.current) * 10; // Ajustez selon vos besoins
        vertices[i * 3 + 1] = offsetY;
      }

      lines.geometry.attributes.position.needsUpdate = true;
      time.current += 0.01;

      requestAnimationFrame(animateWaves);
    }

    // Lancer l'animation des vagues
    animateWaves();

    return () => {
      // Nettoyer les ressources lors de la suppression du composant
    };
  }, [lines]);

  return <primitive object={lines} />;
});

export default AnimationLecteur;
