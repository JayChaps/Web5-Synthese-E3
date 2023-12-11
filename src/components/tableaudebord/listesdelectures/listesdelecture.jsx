import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { FaPlayCircle } from "react-icons/fa";

const ListesDeLectures = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const element = document.querySelector(".container-listes-de-lecture");
      const elementY = element.offsetTop;

      const triggerPoint = elementY - window.innerHeight + 100;

      if (scrollY > triggerPoint) {
        controls.start({ opacity: 1, y: 0 });
      } else {
        controls.start({ opacity: 0, y: 50 });
      }
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <div className="outer-container">
      <motion.section
        className="container-listes-de-lecture"
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="image-container-liste">
          <FaPlayCircle
            size={"3rem"}
            color="var(--noir)"
            className="play-icon-listes-de-lecture"
          />
          <h2 className="titre-liste">Liste de lecture # </h2>
          <img
            src="src\assets\img\jpg\placeholder.jpg"
            alt="listedelecture"
            className="cover-mask"
          />
        </div>
      </motion.section>
    </div>
  );
};

export default ListesDeLectures;
