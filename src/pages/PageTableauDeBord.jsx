import React from "react";
import { Link } from "react-router-dom";


import SectionTitre from "../components/tableaudebord/titre/sectiontitre";
import SectionSousTitre from "../components/tableaudebord/titre/sectionsoustitre";
import SectionAutreSousTitre from "../components/tableaudebord/titre/sectionautresoustitre";
import SectionPopulaires from "../components/tableaudebord/populaires/sectionpopulaires";
import SectionListesdeLecture from "../components/tableaudebord/listesdelectures/sectionlistesdelecture";
const PageTableauDeBord = () => {
  
    return (
      <main className="tableau-de-bord">
        <SectionTitre />
        <div className="sous-titre">
        <SectionSousTitre />
        <SectionSousTitre />
        </div>
        <div className="sous-sous-titre">
        <SectionAutreSousTitre />
        <SectionAutreSousTitre />
        <SectionAutreSousTitre />
        <SectionAutreSousTitre />
        </div>
        <SectionPopulaires />
        <SectionListesdeLecture />
      </main>
    );
  };


export default PageTableauDeBord;