import React, { useContext, useEffect } from "react";
import AnimationLecteur from "./AnimationLecteur";
import ChansonsSuivantes from "./ChansonsSuivantes";
import SliderPlaybarFull from "./SliderPlaybarFull";
import { motion, useAnimation } from "framer-motion";
import TempsPlaybarfull from "./TempsPlaybarfull";
import { SongInfoContext } from "../../context/SongInfoContext";

const PlaybarFull = ({ children }) => {
  const controls = useAnimation();

  const { songInfo, updateSongInfo } = useContext(SongInfoContext);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  }, [controls]);

  const infoChansonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="playbarfull"
      style={{ overflow: "hidden" }}
      initial={{ opacity: 0, y: "100%" }}
      animate={controls}
    >
      <div className="playbarfull__inner">
        {children}
        <motion.section
          className="infoChanson"
          initial="hidden"
          animate="visible"
          variants={infoChansonVariants}
        >
          {/* Redirection album */}
          <motion.h2 className="titreChanson">{songInfo.title}</motion.h2>
          {/* redirection découvert artiste */}
          <motion.h2 className="artisteChanson">{songInfo.artist}</motion.h2>
        </motion.section>
        <ChansonsSuivantes />
        <SliderPlaybarFull />
        <AnimationLecteur />
        <TempsPlaybarfull />
      </div>
    </motion.div>
  );
};

export default PlaybarFull;
