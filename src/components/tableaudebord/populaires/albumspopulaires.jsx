import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";

const Albumspopulaires = () => {
  const [randomArtist, setRandomArtist] = useState(null);
  const controls = useAnimation();

  useEffect(() => {
    const getRandomArtist = async () => {
      try {
        const resp = await fetchJsonp("https://api.deezer.com/chart/0/artists?output=jsonp");
        const data = await resp.json();

        const randomIndex = Math.floor(Math.random() * data.data.length);
        const selectedArtist = data.data[randomIndex];

        setRandomArtist(selectedArtist);
      } catch (error) {
        console.error("Erreur lors de la recherche:", error);
      }
    };

    getRandomArtist();
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

  const artistLink = `/artist/${randomArtist?.id}`; // Adjust this based on your API response structure

  return (
    <div className="container-complet-albums">
      <motion.section
        className="container-albums-populaires"
        initial={{ opacity: 0, x: -50 }}
        animate={controls}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div>
          <h2 className="titrealbumspopulaire">{randomArtist && randomArtist.name}</h2>
        </div>
        <div>
          <Link to={artistLink}>
            <FaPlayCircle
              size={"3rem"}
              color="var(--blanc)"
              className="play-icon-populaires"
            />
          </Link>
        </div>
        <div className="image-container">
          {randomArtist && <img src={randomArtist.picture_big} alt={randomArtist.name} className="cover-mask" />}
        </div>
      </motion.section>
    </div>
  );
};

export default Albumspopulaires;
