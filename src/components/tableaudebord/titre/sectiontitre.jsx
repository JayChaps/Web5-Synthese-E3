import React from "react";
import { Link } from "react-router-dom";
import "../../../assets/scss/components/tableaudebord/sectiontitre.scss"
import { FaPlayCircle } from "react-icons/fa";

import PropositionChansons from "../titre/propositionchansons";


const sectiontitre = () => {
  
    return (
        <section className="containersectiontitre">
            <div>
                <FaPlayCircle
                    size={"4rem"}
                    color="var(--blanc)"
                    className="play-icon"
                />
                <h1 className="titresectiontitre">titrealbum</h1>
                <PropositionChansons />
                <PropositionChansons />
            </div>

        </section>
    );
  };


export default sectiontitre;