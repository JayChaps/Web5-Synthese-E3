import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/scss/components/tableaudebord/albumspopulaires.scss"


const albumspopulaires = () => {
  
    return (
        <section className="container-albums-populaires">
            <div>
                <h2 className="titrealbumspopulaire">Chanson/Album</h2>
            </div>
            <div className="image-container">
                <img
                    src="src\assets\jpg\placeholder.jpg" // Changer ici
                    alt="populaires"
                    className="cover-mask"
               />
      </div>

        </section>
    );
  };


export default albumspopulaires;