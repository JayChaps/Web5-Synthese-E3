import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";

const Albumspopulaires = () => {
  const controls = useAnimation();

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
        <h2 className="titrealbumspopulaire">Chanson/Album</h2>
      </div>
      <div>
        <FaPlayCircle
          size={"3rem"}
          color="var(--blanc)"
          className="play-icon-populaires"
        />
      </div>
      <div className="image-container">
        <img
          src="src\assets\img\jpg\placeholder.jpg"
          alt="populaires"
          className="cover-mask"
        />
      </div>
    </motion.section>
    <motion.section
      className="container-albums-populaires"
      initial={{ opacity: 0, x: -50 }}
      animate={controls}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div>
        <h2 className="titrealbumspopulaire">Chanson/Album</h2>
      </div>
      <div>
        <FaPlayCircle
          size={"3rem"}
          color="var(--blanc)"
          className="play-icon-populaires"
        />
      </div>
      <div className="image-container">
        <img
          src="src\assets\img\jpg\placeholder.jpg"
          alt="populaires"
          className="cover-mask"
        />
      </div>
    </motion.section>
    </div>
  );
};

export default Albumspopulaires;
