import React, { useEffect, useState } from "react";
import TitreAcceuil from "../PageAcceuil/titreacceuil";
import CoucheInfo1 from "../PageAcceuil/couche-acceuil-info";
import DeuxiemeTitreAcceuil from "../PageAcceuil/deuxiemetitreacceuil";
import PetitsPoints from "../petitspoints";
import { motion, useAnimation } from "framer-motion";

import "../../assets/scss/components/acceuil/acceuil.scss";

const Acceuil = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = window.scrollY;
    const progress = (scrolled / scrollHeight) * 100;
    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="acceuil">
      {scrollProgress > 0 && <ScrollProgress progress={scrollProgress} />}
      <TitreAcceuil />
      <CoucheInfo1 />
      <PetitsPoints />
      <DeuxiemeTitreAcceuil />
    </div>
  );
};

const ScrollProgress = ({ progress }) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({ strokeDashoffset: 100 - progress });
  }, [progress, controls]);

  return (
    <motion.div className="scroll-progress-container">
      <motion.svg
        className="scroll-progress-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        animate={controls}
      >
        <motion.path
          className="scroll-progress-shape"
          d="M7.954 12.304V1a1 1 0 0 1 1-1h.028a1 1 0 0 1 1 1v14.065c.197 1.969-1.42 3.99-3.874 4.693-2.69.772-5.368-.333-5.98-2.468-.612-2.135 1.073-4.491 3.764-5.263 1.47-.421 2.935-.283 4.062.277zm-2.4 5.521c1.698-.487 2.645-1.81 2.37-2.77-.276-.961-1.78-1.582-3.478-1.095-1.698.487-2.645 1.81-2.37 2.771.276.96 1.78 1.581 3.478 1.094z"


        />
      </motion.svg>
    </motion.div>
  );
};

export default Acceuil;
