import React from "react";
import { Link } from "react-router-dom";
import { motion, useAnimation } from "framer-motion";
import "../../assets/scss/components/acceuil/titreacceuil.scss";

const TitreAcceuil = () => {
  const containerControls = useAnimation();
  const titleControls = useAnimation();

  const animateContainer = async () => {
    await containerControls.start({ opacity: 1, y: 0 });
    await titleControls.start({ opacity: 1, x: 0 });
  };

  return (
    <motion.section initial={{ opacity: 1, y: -50 }} animate={containerControls} onLoad={animateContainer}>
      <motion.div className="round-section">
        <div className="content-container-acceuil">
          <div className="image-container-acceuil">
            <img className="img-acceuil" src="https://imgur.com/iVJQT6L.png" alt="Placeholder" />
          </div>
          <div className="container-texte-boutons">
            <div className="text-container">
              <h2 className="titre-acceuil">Votre Son.</h2>
              <h3 className="soustitre-acceuil">Votre Instant.</h3>
            </div>
            <div className="button-container">
              <Link to="authentification">
                <button className="button-acceuil-connexion">Se Connecter</button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div className="welcome-container">
        <motion.h1 className="big-title-displaced" initial={{ opacity: 1, x: -50 }} animate={titleControls}>
          Bienvenue!
        </motion.h1>
        <motion.h1 className="big-title" initial={{ opacity: 1, x: -50 }} animate={titleControls}>
          Bienvenue!
        </motion.h1>
        <motion.h1 className="big-title-displaced2" initial={{ opacity: 1, x: -50 }} animate={titleControls}>
          Bienvenue!
        </motion.h1>
      </motion.div>
      <motion.h2 className="small-title" initial={{ opacity: 1 }} animate={{ opacity: 1, y: 0 }}>
        Voici ce qu'Apollon a à offrir:
      </motion.h2>
    </motion.section>
  );
};

export default TitreAcceuil;
