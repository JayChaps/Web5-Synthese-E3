import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

const SectionAutresoustitre = () => {
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
    <motion.section className="containersectionautresoustitre" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div>
        <motion.FaPlayCircle
          size={"2rem"}
          color="var(--noir)"
          className="play-icon-autre-sous-titre"
          variants={iconVariants}
        />
        <motion.h4 className="titresectionautresoustitre" variants={titleVariants}>
          Titre album
        </motion.h4>
        <motion.div className="autresoustitre-image" variants={imageVariants}>
          <img src="src\assets\img\jpg\placeholder.jpg" alt="" />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default SectionAutresoustitre;
