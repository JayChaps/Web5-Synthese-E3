import React, { useEffect, useState } from "react";
import { useAudioVisual } from "../../context/audiotim";

const AnimationLecteur = () => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );
  const audio = useAudioVisual();

  // Nombre de points par ligne
  const numPoints = 16;

  // Utilisez l'état (state) pour gérer les points dynamiquement pour chaque ligne
  const [lines, setLines] = useState(
    Array.from({ length: 8 }, () => {
      return Array.from({ length: numPoints }, (_, index) => ({
        x: index * (windowDimensions.width / (numPoints - 1)),

        y: 0,
      }));
    })
  );

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // Utilisez useEffect pour mettre à jour les lignes lorsque les données audio changent
  useEffect(() => {
    // En supposant que "audio" est un tableau de valeurs
    // Mettez à jour l'état des lignes avec les nouvelles données audio
    setLines((prevLines) =>
      prevLines.map((line, lineIndex) => {
        return line.map((point, pointIndex) => {
          // Modifiez ici les propriétés du point en fonction de vos données audio
          return {
            ...point,
            y:
            Math.sin((pointIndex + 1) *10) *
            (audio[lineIndex * numPoints + pointIndex] || 0),
          
          };
        });
      })
    );
  }, [audio]);
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height,
    };
  }
  return (
    <div className="animationLecteur">
      <div className="animationcontainer">
        <svg preserveAspectRatio="none" viewBox={`0 0 ${windowDimensions.width} 1`}>
          {lines.map((line, lineIndex) => (
            <polyline
              key={lineIndex}
              points={line.map((point) => `${point.x},${point.y}`).join(" ")}
              style={{ strokeWidth: "1", fill: "none" }}
            />
          ))}
        </svg>
      </div>
    </div>
  );
};

export default AnimationLecteur;
