import React from "react";
import { Link } from "react-router-dom";
import "../assets/scss/pages/tableaudebord.scss";

import SectionTitre from "../components/tableaudebord/titre/sectiontitre";
import SectionSousTitre from "../components/tableaudebord/titre/sectionsoustitre";
import SectionAutreSousTitre from "../components/tableaudebord/titre/sectionautresoustitre";
import SectionPopulaires from "../components/tableaudebord/populaires/sectionpopulaires";

const PageTableauDeBord = () => {
  
    return (
      <div>
        <SectionTitre />
        <SectionSousTitre />
        <SectionSousTitre />
        <SectionAutreSousTitre />
        <SectionAutreSousTitre />
        <SectionAutreSousTitre />
        <SectionPopulaires />
      </div>
    );
  };


export default PageTableauDeBord;