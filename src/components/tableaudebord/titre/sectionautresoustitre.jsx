import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import fetchJsonp from "fetch-jsonp";

const SectionAutresoustitre = () => {
  const [randomAlbum, setRandomAlbum] = useState(null);

  useEffect(() => {
    const getRandomAlbum = async () => {
      try {
       
        const resp = await fetchJsonp("https://api.deezer.com/chart/0/albums?output=jsonp");
        const data = await resp.json();

       
        const randomIndex = Math.floor(Math.random() * data.data.length);
        const selectedAlbum = data.data[randomIndex];

        setRandomAlbum(selectedAlbum);
      } catch (error) {
        console.error("Erreur lors de la recherche:", error);
      }
    };

    getRandomAlbum();
  }, []);

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
        <motion.div
          size={"2rem"}
          color="var(--noir)"
          className="play-icon-autre-sous-titre"
          variants={iconVariants}
        >
          <FaPlayCircle size={"2rem"} color="var(--blanc)" className="icon-autre-sous-titre" />
        </motion.div>
        <motion.h4 className="titresectionautresoustitre" variants={titleVariants}>
          {randomAlbum && randomAlbum.title}
        </motion.h4>
        <motion.div className="autresoustitre-image" variants={imageVariants}>
          {randomAlbum && <img src={randomAlbum.cover_big} alt={randomAlbum.title} />}
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default SectionAutresoustitre;
