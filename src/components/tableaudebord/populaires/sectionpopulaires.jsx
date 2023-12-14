import React from "react";
import { Link } from "react-router-dom";

import AlbumsPopulaires from "../populaires/albumspopulaires";

const sectionpopulaires = () => {
  return (
    <section>
      <div>
        <h1 className="titrepopulaires">Populaire</h1>
      </div>
      <div className="albumspopvl">
        <AlbumsPopulaires />
        <AlbumsPopulaires />
        <AlbumsPopulaires />
        <AlbumsPopulaires />
      </div>
    </section>
  );
};

export default sectionpopulaires;
