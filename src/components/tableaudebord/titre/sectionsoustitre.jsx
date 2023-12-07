import React from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";

const sectionsoustitre = () => {
  
    return (
        <div className="containersectionsoustitre">
            <div>
            <FaPlayCircle
                    size={"3rem"}
                    color="var(--noir)"
                    className="play-icon-sous-titre"
            />
                <h2 className="titresectionsoustitre">titrealbum</h2>
            <div className="soustitre-image"><img src="src\assets\img\jpg\placeholder.jpg" alt="lol" /></div>
            </div>
        </div>
    );
  };


export default sectionsoustitre;