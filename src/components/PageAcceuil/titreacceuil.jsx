import React from "react";
import "../../assets/scss/components/acceuil/titreacceuil.scss"


const TitreAcceuil = () => {
  
  return (
    <section>
    <div className="round-section">
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
          <button className="button-acceuil-inscription">S'inscrire</button>
          <button className="button-acceuil-connexion">Se Connecter</button>
        </div>
        </div>
      </div>
    </div>
    <div className="welcome-container">
        <h1 className="big-title-displaced">Bienvenue!</h1>
        <h1 className="big-title">Bienvenue!</h1>
        <h1 className="big-title-displaced2">Bienvenue!</h1>
    </div>
    <h2 className="small-title">Voici ce qu'Apollon a à offrir:</h2>
    </section>
  );
};

export default TitreAcceuil;