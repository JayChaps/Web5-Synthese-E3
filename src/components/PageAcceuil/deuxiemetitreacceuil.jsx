import React from "react";
import "../../assets/scss/components/acceuil/deuxiemetitreacceuil.scss"


const DeuxiemeTitreAcceuil = () => {
  
  return (
    <section>
        <div className="deuxiemetitres-container">
            <h1 className="titre-haut">Lecteur audio</h1>
            <h1 className="titre-milieu">Lecteur audio</h1>
            <h1 className="titre-bas">Lecteur audio</h1>
        </div>
        <div>
            <h1 className="lignes-nico">Lignes à Nico ici</h1>
        </div>
        <div className="container-info">
        <div className="deuxiemetitres-info">
            <p className="info">
            Notre lecteur audio combine 
            une interface intuitive en forme 
            d'onde avec une qualité audio
            exceptionnelle, offrant une expérience 
            immersive et sans compromis 
            pour les mélomanes exigeants.
            </p>
        </div>
        </div>
    </section>
  );
};

export default DeuxiemeTitreAcceuil;