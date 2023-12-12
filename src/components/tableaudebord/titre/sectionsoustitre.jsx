import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

const Sectionsoustitre = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const iconVariants = {
    hidden: { opacity: 0, rotate: -180 },
    visible: { opacity: 1, rotate: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1, transition: { delay: 0.2, duration: 0.8, ease: 'easeInOut' } },
  };

  return (
    <motion.div className="containersectionsoustitre" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div>
        <motion.FaPlayCircle
          size={"3rem"}
          color="var(--noir)"
          className="play-icon-sous-titre"
          variants={iconVariants}
        />
        <motion.h2 className="titresectionsoustitre" variants={titleVariants}>
          Titre album
        </motion.h2>
        <motion.div className="soustitre-image" variants={imageVariants}>
          <img src="src\assets\img\jpg\placeholder.jpg" alt="lol" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Sectionsoustitre;
