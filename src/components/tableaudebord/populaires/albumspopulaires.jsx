import React from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";


const albumspopulaires = () => {
  
    return (
        <section className="container-albums-populaires">
            <div>
                <h2 className="titrealbumspopulaire">Chanson/Album</h2>
            </div>
            <div>
                <FaPlayCircle
                    size={"3rem"}
                    color="var(--noir)"
                    className="play-icon-populaires"
                />
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