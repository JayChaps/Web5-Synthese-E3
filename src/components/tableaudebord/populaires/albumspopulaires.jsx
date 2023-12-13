import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import fetchJsonp from "fetch-jsonp";

const Albumspopulaires = () => {
  const [randomAlbum, setRandomAlbum] = useState(null);
  const controls = useAnimation();

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

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const triggerPoint = 500;

      if (scrollY > triggerPoint) {
        controls.start({ opacity: 1, x: 0 });
      } else {
        controls.start({ opacity: 0, x: -50 });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <div className="container-complet-albums">
      <motion.section
        className="container-albums-populaires"
        initial={{ opacity: 0, x: -50 }}
        animate={controls}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div>
          <h2 className="titrealbumspopulaire">{randomAlbum && randomAlbum.title}</h2>
        </div>
        <div>
          <FaPlayCircle
            size={"3rem"}
            color="var(--blanc)"
            className="play-icon-populaires"
          />
        </div>
        <div className="image-container">
          {randomAlbum && <img src={randomAlbum.cover_big} alt={randomAlbum.title} className="cover-mask" />}
        </div>
      </motion.section>
    </div>
  );
};

export default Albumspopulaires;
