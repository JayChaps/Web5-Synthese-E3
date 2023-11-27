import React from "react";
import { Link } from "react-router-dom";
import "../../assets/scss/components/tableaudebord/sectiontitre.scss"

import PropositionChansons from "../tableaudebord/propositionchansons";


const sectiontitre = () => {
  
    return (
        <section className="containersectiontitre">
            <div>
                <h1 className="titresectiontitre">titresection</h1>
                <PropositionChansons />
                <PropositionChansons />
                <PropositionChansons />
            </div>

        </section>
    );
  };


export default sectiontitre;