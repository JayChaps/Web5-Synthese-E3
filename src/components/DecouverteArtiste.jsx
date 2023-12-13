import { useEffect, useState, useContext } from "react";
import { motion, useAnimation } from "framer-motion";
import { useParams, Link } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import { FaPlayCircle } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import "../assets/scss/components/decouverte/decouverteartiste.scss";
import PlaylistSelector from "./RechercheDeezer/PlaylistSelector";
import { SongInfoContext } from "../context/SongInfoContext";

const DecouverteArtiste = () => {
  const [selectorActif, setSelectorActif] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const [relatedArtist, setRelatedArtist] = useState([]);
  const [albums, setAlbums] = useState([]);
  const nom = "";
  const { idArtist } = useParams();
  const { handlePlaySong } = useContext(SongInfoContext);
  const controls = useAnimation();
  const controlsAlbums = useAnimation();

  const topRelatedArtist = () => {
    setRelatedArtist([]);
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

  const allAlbums = () => {
    setAlbums([]);
    const url = `https://api.deezer.com/artist/${idArtist}/albums?output=jsonp`;

    fetchJsonp(url)
      .then((resp) => resp.json())
      .then((data) => {
        setAlbums(data.data || []);
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche:", error);
      });
  };

  const topSongs = () => {
    setPopularSongs([]);
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
    allAlbums();
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = window.innerHeight * 0.1;

      if (scrollPosition > threshold) {
        controls.start({ opacity: 1, y: 0 });
        controlsAlbums.start({ opacity: 1, y: 0 });
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [idArtist, controls, controlsAlbums]);

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
        {popularSongs.map((data, id) => {
          console.log(data);
          return (
            <motion.div
              className="topSongs"
              key={id}
              initial={{ opacity: 0, y: 50 }}
              animate={controls}
              whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
              onClick={() => handlePlaySong(data)}
            >
              <img src={data.album.cover} alt="" className="img-populaire" />
              <h2 className="titre-populaire">{data.title}</h2>
              <FaPlayCircle size={"3rem"} color="var(--blanc)" className="play-icon-decouverte" />
            </motion.div>
          );
        })}
      </div>
      <h1 className="titre-discographie">Discographie</h1>
      <motion.div className="albums" initial={{ opacity: 0, y: 50 }} animate={controlsAlbums}>
        {albums.map((data, id) => {
          return(
            <Link to={`/album/${data.id}`} key={id} className="album-link">
              <div className="album">
                <img src={data.cover_xl} alt="" className="img-discographie" />
                <div className="album-overlay">
                  <h2 className="sous-titre-discographie">{data.title}</h2>
                </div>
              </div>
            </Link>
          )})}
      </motion.div>

      <motion.h1 className="titre-fans" initial={{ opacity: 0, y: 50 }} animate={controls}>
        Les fans aiment aussi:
      </motion.h1>

      <motion.div className="relatedArtist" initial={{ opacity: 0, y: 50 }} animate={controls}>
        {relatedArtist.map((data, id) => {
          console.log(data)
          return(
            <Link to={`/artist/${data.id}`} key={id}>
              <motion.div
                className="container-decouvertes"
                key={id}
                initial={{ opacity: 0, y: 50 }}
                animate={controls}
                whileHover={{ scale: 1.05, filter: "brightness(1.2)" }}
              >
                <div className="artistes-decouvertes">
                  <img src={data.picture_xl} alt="" className="img-decouverte" />
                  <h2 className="titre-chanteur2">{data.name}</h2>
                  <h2 className="titre-chanteur">{data.name}</h2>
                  <h2 className="titre-chanteur3">{data.name}</h2>
                </div>
              </motion.div>
            </Link>
          )})}
      </motion.div>
    </div>
  );
};

export default DecouverteArtiste;
