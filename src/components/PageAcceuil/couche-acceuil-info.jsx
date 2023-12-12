import React, { useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";
import "../../assets/scss/components/acceuil/couche-acceuil-info.scss";
import { BiSolidPlaylist, BiSearch } from "react-icons/bi";
import { IoVolumeHigh } from "react-icons/io5";
import PetitsPoints from "../petitspoints";

const CoucheAcceuil1 = () => {
  const containerRef = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const containerTop = containerRef.current.offsetTop;
      const scrollPosition = window.scrollY;
      const triggerPoint = containerTop - window.innerHeight / 2;

      if (scrollPosition > triggerPoint) {
        controls.start({ opacity: 1, y: 0 });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [controls]);

  return (
    <motion.section
      className="couchesinfo"
      ref={containerRef}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.25 }}
    >
      <div className="containerinfo1">
      <div className="container-icon-couche1">
        <div className="section1">
          <div className="sous-section1">
            <div className="sous-section-icon1">
              <BiSolidPlaylist style={{ fontSize: "4rem", color: "white" }} className="icon1" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-info-couche1">
        <div className="info-couche1">
          <p>Listes de lectures optimisées pour une expérience musicale fluide.</p>
        </div>
      </div>

      </div>
      <div className="containerinfo2">
      <div className="container-icon-couche1">
        <div className="section2">
          <div className="sous-section2">
            <div className="sous-section-icon2">
              <BiSearch style={{ fontSize: "4rem", color: "white" }} className="icon2" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-info-couche2">
        <div className="info-couche1">
          <p>Recherche musicale précise, rapide et intuitive.</p>
        </div>
      </div>

      </div>
      <div className="containerinfo3">
      <div className="container-icon-couche1">
        <div className="section3">
          <div className="sous-section3">
            <div className="sous-section-icon3">
              <IoVolumeHigh style={{ fontSize: "4rem", color: "white" }} className="icon1" />
            </div>
          </div>
        </div>
      </div>
      <div className="container-info-couche3">
        <div className="info-couche1">
          <p>Qualité studio inégalée.</p>
        </div>
      </div>

      </div>
    </motion.section>
  );
};

export default CoucheAcceuil1;
