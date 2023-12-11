import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

import PropositionChansons from "../titre/propositionchansons";

const SectionTitre = () => {
  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: 'easeInOut' } },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
  };
  const titleVariants2 = {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 0.5, y: 0, transition: { duration: 0.8, ease: 'easeInOut' } },
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
    <motion.section className="containersectiontitre" variants={containerVariants} initial="hidden" animate="visible">
      <motion.div className="content">
        <motion.FaPlayCircle size={"4rem"} color="var(--blanc)" className="play-icon" variants={iconVariants} />
        <motion.h1 className="titresectiontitre1" variants={titleVariants2}>Titre album</motion.h1>
        <motion.h1 className="titresectiontitre2" variants={titleVariants}>Titre album</motion.h1>
        <motion.h1 className="titresectiontitre3" variants={titleVariants2}>Titre album</motion.h1>
        <motion.div className="small-image" variants={imageVariants}><img src="src\assets\jpg\placeholder.jpg" alt="" /></motion.div>
        <PropositionChansons />
        <PropositionChansons />
        <PropositionChansons />
        <PropositionChansons />
      </motion.div>
    </motion.section>
  );
};

export default SectionTitre;
