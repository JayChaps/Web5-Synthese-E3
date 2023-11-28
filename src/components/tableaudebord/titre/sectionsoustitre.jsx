import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/scss/components/tableaudebord/sectionsoustitre.scss"
import { FaPlayCircle } from "react-icons/fa";

const sectionsoustitre = () => {
  
    return (
        <section className="containersectionsoustitre">
            <div>
            <FaPlayCircle
                    size={"3rem"}
                    color="var(--blanc)"
            />
                <h2 className="titresectionsoustitre">titrealbum</h2>
            </div>

        </section>
    );
  };


export default sectionsoustitre;