import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import "../../assets/scss/components/acceuil/titreacceuil.scss";

const TitreAcceuil = () => {
  return (
    <motion.section>
      <motion.div
        className="round-section"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="content-container-acceuil">
          <div className="image-container-acceuil">
            <img
              className="img-acceuil"
              src="src\assets\png\img-acceuil.png"
              alt="Placeholder"
            />
          </div>
          <div className="container-texte-boutons">
            <div className="text-container">
              <h2 className="titre-acceuil">Votre Son.</h2>
              <h3 className="soustitre-acceuil">Votre Instant.</h3>
            </div>
            <div className="button-container">
              <Link to="authentification">
                <button className="button-acceuil-connexion">
                  Se Connecter
                </button>
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
      <motion.div
        className="welcome-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <motion.h1 className="big-title-displaced">Bienvenue!</motion.h1>
        <motion.h1 className="big-title">Bienvenue!</motion.h1>
        <motion.h1 className="big-title-displaced2">Bienvenue!</motion.h1>
      </motion.div>
      <motion.h2
        className="small-title"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        Voici ce qu'Apollon a à offrir:
      </motion.h2>
    </motion.section>
  );
};

export default TitreAcceuil;
