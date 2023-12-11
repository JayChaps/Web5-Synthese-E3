import React, { useEffect } from "react";
import AnimationLecteur from "./AnimationLecteur";
import ChansonsSuivantes from "./ChansonsSuivantes";
import SliderPlaybarFull from "./SliderPlaybarFull";
import { motion, useAnimation } from "framer-motion";

const PlaybarFull = ({ children }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      scale: 1, // Reset scale to 1
      transition: { duration: 0.8, ease: "easeOut" }, // Slightly decrease the duration
    });
  }, [controls]);

  return (
    <motion.div
      className="playbarfull"
      initial={{ opacity: 0, y: 50, scale: 0.8 }}
      animate={controls}
    >
      <div className="playbarfull__inner">
        {children}
        <section className="infoChanson">
          {/* Redirection album */}
          <h2 className="titreChanson">Titre</h2>
          {/* redirection découvert artiste */}
          <h2 className="artisteChanson">Artiste</h2>
        </section>
        <ChansonsSuivantes />
        <SliderPlaybarFull />
        <AnimationLecteur />
        <div className="temps">
          <span>0:00</span>
          <span>0:30</span>
        </div>
      </div>
    </motion.div>
  );
};

export default PlaybarFull;
