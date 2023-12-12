import React from "react";
import { Link } from "react-router-dom";
import ItemPlaylist from "../../Playlist/ItemPlaylist";

const sectionlistesdelecture = () => {
  
    return (
        <section>
            <div>
                <h1 className="titre-listesdelecture">Mes listes de lecture</h1>

                <div className="itemplaylist-tdb">
                <ItemPlaylist/>
                <ItemPlaylist/>
                <ItemPlaylist/>
                <ItemPlaylist/>
                <ItemPlaylist/>
                <ItemPlaylist/>
                </div>
                
            </div>
        </section>
    );
  };


export default sectionlistesdelecture;