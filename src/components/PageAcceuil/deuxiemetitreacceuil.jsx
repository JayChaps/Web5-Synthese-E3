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
      <div>
        <h1 className="lignes-nico">Lignes à Nico ici</h1>
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
