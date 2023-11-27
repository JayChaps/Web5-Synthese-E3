import React from "react";
import { Link } from "react-router-dom";
import "../assets/scss/pages/tableaudebord.scss";

import SectionTitre from "../components/tableaudebord/sectiontitre";
import SectionSousTitre from "../components/tableaudebord/sectionsoustitre";

const PageTableauDeBord = () => {
  
    return (
      <div>
        <SectionTitre />
        <SectionSousTitre />
        <SectionSousTitre />
      </div>
    );
  };


export default PageTableauDeBord;