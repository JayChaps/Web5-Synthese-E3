import React from "react";
import { Link } from "react-router-dom";

import AlbumsPopulaires from "../populaires/albumspopulaires";

const sectionpopulaires = () => {
  
    return (
        <section>
            <div>
                <h1 className="titrepopulaires">Populaires</h1>
            </div>

            <AlbumsPopulaires />
            <AlbumsPopulaires />
            <AlbumsPopulaires />
            <AlbumsPopulaires />

        </section>
    );
  };


export default sectionpopulaires;