import React from "react";
import "../../assets/scss/components/acceuil/couche-acceuil-info.scss"
import { BiSolidPlaylist } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";
import { IoVolumeHigh } from "react-icons/io5";

import PetitsPoints from "../petitspoints";


const CoucheAcceuil1 = () => {
  
  return (
    <section className="couchesinfo">
        <div className="container-icon-couche1">
            <div className="section1">
                <div className="sous-section1">
                    <div className="sous-section-icon1">
                        <BiSolidPlaylist style={{ fontSize: "4rem", color: "white" }} className="icon1"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-info-couche1">
            <div className="info-couche1">
                <p>Listes de lectures 
                   optimisées pour 
                   une expérience 
                   musicale fluide.</p>
            </div>
        </div>
        <div className="container-icon-couche1">
            <div className="section2">
                <div className="sous-section2">
                    <div className="sous-section-icon2">
                        <BiSearch style={{ fontSize: "4rem", color: "white" }} className="icon2"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-info-couche2">
            <div className="info-couche1">
                <p>Recherche musicale 
                   précise, rapide et 
                   intuitive.</p>
            </div>
        </div>
        <div className="container-icon-couche1">
            <div className="section3">
                <div className="sous-section3">
                    <div className="sous-section-icon3">
                        <IoVolumeHigh style={{ fontSize: "4rem", color: "white" }} className="icon1"/>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-info-couche3">
            <div className="info-couche1">
                <p>Qualité studio 
                   inégalée.</p>
            </div>
        </div>
    </section>
  );
};

export default CoucheAcceuil1;