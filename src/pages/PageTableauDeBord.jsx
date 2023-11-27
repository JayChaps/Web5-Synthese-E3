import React from "react";
import { Link } from "react-router-dom";
import "../assets/scss/pages/tableaudebord.scss";

import SectionTitre from "../components/tableaudebord/sectiontitre";
import SectionSousTitre from "../components/tableaudebord/sectionsoustitre";
import SectionAutreSousTitre from "../components/tableaudebord/sectionautresoustitre";

const PageTableauDeBord = () => {
  
    return (
      <div>
        <SectionTitre />
        <SectionSousTitre />
        <SectionSousTitre />
        <SectionAutreSousTitre />
        <SectionAutreSousTitre />
        <SectionAutreSousTitre />
      </div>
    );
  };


export default PageTableauDeBord;