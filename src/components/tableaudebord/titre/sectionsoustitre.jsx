import React, { useEffect, useState, useContext } from "react";
import { motion } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import { SongInfoContext } from "../../../context/SongInfoContext";

const Sectionsoustitre = () => {
  const [randomAlbum, setRandomAlbum] = useState(null);
  const { handlePlaySong } = useContext(SongInfoContext);
  const navigate = useNavigate();

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
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  const iconVariants = {
    hidden: { opacity: 0, rotate: -180 },
    visible: {
      opacity: 1,
      rotate: 0,
      transition: { duration: 0.8, ease: 'easeInOut' },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { delay: 0.2, duration: 0.8, ease: 'easeInOut' },
    },
  };

  const handlePlayButtonClick = () => {
    if (randomAlbum) {
      handlePlaySong(randomAlbum);
    }
  };

  const albumLink = `/album/${randomAlbum?.id}`;

  return (
    <motion.div
      className="containersectionsoustitre"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div>
        <Link to={albumLink}>
          <motion.div
            size={"3rem"}
            color="var(--noir)"
            className="play-icon-sous-titre"
            variants={iconVariants}
            onClick={handlePlayButtonClick}
          >
            <FaPlayCircle size={"3rem"} color="var(--blanc)" className="icon-sous-titre" />
          </motion.div>
        </Link>
        <motion.h2 className="titresectionsoustitre" variants={titleVariants}>
          {randomAlbum && randomAlbum.title}
        </motion.h2>
        <motion.div className="soustitre-image" variants={imageVariants}>
          {randomAlbum && <img src={randomAlbum.cover_big} alt={randomAlbum.title} />}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Sectionsoustitre;
