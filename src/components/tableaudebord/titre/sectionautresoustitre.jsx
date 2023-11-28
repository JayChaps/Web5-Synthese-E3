import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/scss/components/tableaudebord/sectionautresoustitre.scss"
import { FaPlayCircle } from "react-icons/fa";

const sectionautresoustitre = () => {
  
    return (
        <section className="containersectionautresoustitre">
            <div>
            <FaPlayCircle
                    size={"2rem"}
                    color="var(--blanc)"
            />
                <h4 className="titresectionautresoustitre">titrealbum</h4>
            </div>

        </section>
    );
  };


export default sectionautresoustitre;