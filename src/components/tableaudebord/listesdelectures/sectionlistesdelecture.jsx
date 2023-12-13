import React from "react";
import { Link } from "react-router-dom";
import ItemPlaylist from "../../Playlist/ItemPlaylist";
import SliderPlaylists from "../../Playlist/SliderPlaylists"

const sectionlistesdelecture = () => {
  
    return (
        <section>
            <div className="slider-playlist-tdb">
                <h1 className="titre-listesdelecture">Mes listes de lecture</h1>

                {/* <div className="itemplaylist-tdb">
                <ItemPlaylist/>
                <ItemPlaylist/>
                <ItemPlaylist/>
                <ItemPlaylist/>
                <ItemPlaylist/>
                <ItemPlaylist/>
                </div> */}
                <SliderPlaylists/>
                
            </div>
        </section>
    );
  };


export default sectionlistesdelecture;