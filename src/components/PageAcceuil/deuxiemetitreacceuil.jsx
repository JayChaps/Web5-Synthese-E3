import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "../../assets/scss/components/acceuil/deuxiemetitreacceuil.scss";

const DeuxiemeTitreAcceuil = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const containerTop = containerRef.current.offsetTop;
      const scrollPosition = window.scrollY;
      const triggerPoint = containerTop - window.innerHeight / 2;

      if (scrollPosition > triggerPoint) {
        controls.start({ opacity: 1, y: 0 });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <section>
      <motion.div
        className="deuxiemetitres-container"
        ref={containerRef}
        initial={{ opacity: 0, y: 50 }}
        animate={controls}
        transition={{ duration: 0.6 }}
      >
        <h1 className="titre-haut">Lecteur audio</h1>
        <h1 className="titre-milieu">Lecteur audio</h1>
        <h1 className="titre-bas">Lecteur audio</h1>
      </motion.div>
      <div className="lignes-a-nico">
      <svg id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 415.57 73.47">
  <g id="Calque_1-2" data-name="Calque 1">
    <polyline class="cls-3" 
    stroke="#fc5571"
    fill="none"
    stroke-miterlimit="10"
    stroke-width="1.69px"
    
    points=".36 55.95 93.01 12.28 146.88 60.72 216.55 1.16 279.4 65.48 350.48 13.86 415.14 51.98"/>
    <polyline class="cls-2"
    stroke="#7e35e3"
    fill="none"
    stroke-miterlimit="10"
    stroke-width="1.69px"
     points=".36 59.3 93.01 15.62 146.88 64.06 216.55 4.5 279.4 68.83 350.48 17.21 415.14 55.33"/>
    <polyline class="cls-1" 
    stroke="#222c32"
    fill="none"
    stroke-miterlimit="10"
    stroke-width="1.69px"
    
    points=".36 62.82 93.01 19.14 146.88 67.58 216.55 8.03 279.4 72.35 350.48 20.73 415.14 58.85"/>
  </g>
</svg>
      </div>
      <div className="container-info">
        <div className="deuxiemetitres-info">
          <p className="info">
            Notre lecteur audio combine une interface intuitive en forme d'onde
            avec une qualité audio exceptionnelle, offrant une expérience
            immersive et sans compromis pour les mélomanes exigeants.
          </p>
        </div>
      </div>
    </section>
  );
};

export default DeuxiemeTitreAcceuil;
