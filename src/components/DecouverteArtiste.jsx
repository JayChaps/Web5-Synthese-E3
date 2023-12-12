import { useEffect, useState,useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { useParams } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import { FaPlayCircle } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import "../assets/scss/components/decouverte/decouverteartiste.scss";
import PlaylistSelector from "./RechercheDeezer/PlaylistSelector";
import { SongInfoContext } from '../context/SongInfoContext';



const DecouverteArtiste = () => {
  const [selectorActif, setSelectorActif] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const [relatedArtist, setRelatedArtist] = useState([]);
  const { idArtist } = useParams();
    const { handlePlaySong } = useContext(SongInfoContext);
  const controls = useAnimation();

  const topRelatedArtist = () => {
    const url = `https://api.deezer.com/artist/${idArtist}/related?output=jsonp`;

    fetchJsonp(url)
      .then((resp) => resp.json())
      .then((data) => {
        setRelatedArtist(data.data || []);
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche:", error);
      });
  };

  const topSongs = () => {
    const url = `https://api.deezer.com/artist/${idArtist}/top?&output=jsonp`;

    fetchJsonp(url)
      .then((resp) => resp.json())
      .then((data) => {
        setPopularSongs(data.data || []);
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche:", error);
      });
  };

  useEffect(() => {
    topSongs();
    topRelatedArtist();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = window.innerHeight * 0.1;

      if (scrollPosition > threshold) {
        controls.start({ opacity: 1, y: 0 });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [idArtist, controls]);

  const handlePlaylistSelector = (song) => {
    setSelectorActif(!selectorActif);
    if (!selectorActif) {
      setSelectedSong(song);
    }
  };

  return (
    <div>
       <h1 className="titre-decouverte3" initial={{ opacity: 1, y: 50 }} animate={controls}>
        Populaire
      </h1>
      <h1 className="titre-decouverte" initial={{ opacity: 1, y: 50 }} animate={controls}>
        Populaire
      </h1>
      <h1 className="titre-decouverte2" initial={{ opacity: 1, y: 50 }} animate={controls}>
        Populaire
      </h1>

      <div className="containertest">
      {popularSongs.map((data, id) => (
        <motion.div
          className="topSongs"
          key={id}
          initial={{ opacity: 0, y: 50 }}
          animate={controls}
          whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
        >
          <img src={data.album.cover} alt="" className="img-populaire" />
          <h2 className="titre-populaire">{data.title}</h2>
          <FaPlayCircle size={"3rem"} color="var(--blanc)" className="play-icon-decouverte" />
        </motion.div>

))}
</div>

      <motion.h1 className="titre-fans" initial={{ opacity: 0, y: 50 }} animate={controls}>
        Les fans aiment aussi:
      </motion.h1>

      <motion.div className="relatedArtist" initial={{ opacity: 0, y: 50 }} animate={controls}>
        {relatedArtist.map((data, id) => (
          <motion.div
            className="container-decouvertes"
            key={id}
            initial={{ opacity: 0, y: 50 }}
            animate={controls}
            whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
          >
            <div className="artistes-decouvertes">
              <img src={data.picture} alt="" className="img-decouverte" />
              <h2 className="titre-chanteur2">{data.name}</h2>
              <h2 className="titre-chanteur">{data.name}</h2>
              <h2 className="titre-chanteur3">{data.name}</h2>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DecouverteArtiste;
