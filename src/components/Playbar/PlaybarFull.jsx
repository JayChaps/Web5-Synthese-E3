import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AnimationLecteur from "./AnimationLecteur";
import ChansonsSuivantes from "./ChansonsSuivantes";
import SliderPlaybarFull from "./SliderPlaybarFull";
import { motion, useAnimation } from "framer-motion";
import TempsPlaybarfull from "./TempsPlaybarfull";
import { SongInfoContext } from "../../context/SongInfoContext";
import fetchJsonp from "fetch-jsonp";

const PlaybarFull = ({ children }) => {
  const controls = useAnimation();

  const { songInfo, updateSongInfo } = useContext(SongInfoContext);
  const [track, setTrack] = useState([]);

  const trackSongInfo = () => {
    if(songInfo !== "") {
    const url = `https://api.deezer.com/track/${songInfo.id}?&output=jsonp`;

    fetchJsonp(url)
      .then((resp) => resp.json())
      .then((data) => {
        setTrack(data || []);
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche:", error);
      });
    }
  };

  useEffect(() => {
    if (songInfo.id !== "") {
      trackSongInfo();
    }
  }, [songInfo]);

  useEffect(() => {
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeInOut" },
    });
  }, [controls]);

  const infoChansonVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeInOut" },
    },
  };

  return (
    <motion.div
      className="playbarfull"
      style={{ overflow: "hidden" }}
      initial={{ opacity: 0, y: "100%" }}
      animate={controls}
    >
      <div className="playbarfull__inner">
        {children}
        <motion.section
          className="infoChanson"
          initial="hidden"
          animate="visible"
          variants={infoChansonVariants}
        >
          {
            track && track.album && track.artist && (
              <>
                <Link to={`/album/${track.album.id}`}><motion.h2 className="titreChanson">{songInfo.title}</motion.h2></Link>
                <Link to={`/artist/${track.artist.id}`}><motion.h2 className="artisteChanson">{songInfo.artist}</motion.h2></Link>
              </>
            )
          }

        </motion.section>
        <ChansonsSuivantes />
        <SliderPlaybarFull />
        <AnimationLecteur />
        <TempsPlaybarfull />
      </div>
    </motion.div>
  );
};

export default PlaybarFull;
