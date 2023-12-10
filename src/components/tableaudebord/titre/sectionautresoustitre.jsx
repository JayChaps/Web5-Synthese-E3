import React from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

const sectionautresoustitre = () => {
  
    return (
        <section className="containersectionautresoustitre">
            <div>
            <FaPlayCircle
                    size={"2rem"}
                    color="var(--noir)"
                    className="play-icon-autre-sous-titre"
            />
                <h4 className="titresectionautresoustitre">titrealbum</h4>
                <div className="autresoustitre-image"><img src="src\assets\img\jpg\placeholder.jpg" alt="lol" /></div>
            </div>

        </section>
    );
  };


export default sectionautresoustitre;