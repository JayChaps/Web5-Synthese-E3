// LesPlaylist.jsx :
import React, { useContext, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { GrSubtractCircle } from "react-icons/gr";
import { FaPlayCircle } from "react-icons/fa";
import { CgRemove } from "react-icons/cg";
import { motion, useAnimation } from "framer-motion";
import SliderPlaylists from "../components/Playlist/SliderPlaylists";
import ItemChansons from "../components/Playlist/ItemChansons";
import ItemChansonRecomande from "../components/Playlist/ItemChansonRecomande";
import { Link } from "react-router-dom";
import RechercheDeezerInput from "../components/RechercheDeezer/RechercheInput";
import { useInView } from "react-intersection-observer";

const AnimatedItem = ({ children, delay = 0.3 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};
import { PlaylistsContext } from "../context/playlistsContext";
import { SongInfoContext } from "../context/SongInfoContext";
import ItemPlaylist from "../components/Playlist/ItemPlaylist";

const LesPlaylist = () => {
  const urlImg = "/src/assets/img/jpg/placeholder.jpg";

  const { handlePlaySong } = useContext(SongInfoContext);
  const {
    createNewPlaylist,
    deletePlaylist,
    addToPlaylist,
    removeSongFromPlaylist,
    newPlaylistName,
    setNewPlaylistName,
    selectedPlaylistId,
    setSelectedPlaylistId,
    selectedPlaylist,
    setSelectedPlaylist,
    fetchPlaylists,
    fetchPlaylist,
    playlists,
    setPlaylists,
    playlist,
    setPlaylist,
    selectedSong,
    setSelectedSong,
    createNewPlaylistAndAddSong,
    clickedPlaylist,
    setClickedPlaylist,
  } = useContext(PlaylistsContext);

  // Récupération des playlists
  // useEffect(() => {
  //   let isSubscribed = true;
  //   if (selectedPlaylistId && isSubscribed) {
  //     fetchPlaylist(selectedPlaylistId);
  //   }
  //   return () => (isSubscribed = false);
  // }, [selectedPlaylistId, fetchPlaylist]);

  // useEffect(() => {
  //   let isSubscribed = true;
  //   if (isSubscribed) {
  //     fetchPlaylists();
  //   }
  //   return () => (isSubscribed = false);
  // }, [fetchPlaylists]);

  useEffect(() => {
    fetchPlaylists();
  }, [fetchPlaylists]);

  const JouerLaChanson = (song) => {
    setSelectedSong(song);
    handlePlaySong(song);
  };

  const handleDeleteSong = (playlistId, song) => {
    removeSongFromPlaylist(playlistId, song);
  };

  const handleDeletePlaylist = (playlistId) => {
    deletePlaylist(playlistId);
  };

  const [creator, setCreator] = useState("");
  const [plName, setPlName] = useState("NomPlaylist");
  const [defaultPlaylist, setDefaultPlaylist] = useState([]);

  // useEffect(() => {
  //   setDefaultPlaylist(selectedPlaylist);
  // }, [selectedPlaylist]);

  // useEffect(() => {
  //   if (clickedPlaylist && clickedPlaylist.id) {
  //     fetchPlaylist(clickedPlaylist.id);
  //     setCreator(clickedPlaylist.creatorName);
  //     setPlName(clickedPlaylist.name);
  //   }
  // }, [clickedPlaylist]);

  // if(!clickedPlaylist || !clickedPlaylist.songs)
  // {
  //   console.log("ta mere");
  // }

  useEffect(() => {
    setPlName(clickedPlaylist.name);
    setCreator(clickedPlaylist.creatorName);
  }, [clickedPlaylist]);

  return (
    <motion.div
      className="lesplaylists"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <SliderPlaylists />

      <header>
        <motion.section
          className="lesplaylists__infos"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="titreplaylist">
            <div className="titreinner">
              <h1>{plName ? plName : "Créez votre playlist !"}</h1>
              <h1>{plName ? plName : "Créez votre playlist !"}</h1>
              <h1>{plName ? plName : "Créez votre playlist !"}</h1>
              <h1>{plName ? plName : "Créez votre playlist !"}</h1>
            </div>
          </div>
          <motion.section
            className="lesplaylists__infos__icones"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            
            <div className="lesplaylistcompte">
              <div>
                <img src={urlImg} alt="" />
              </div>
              <span>{creator}</span>
            </div>
            <div className="lesplaylists__infos__icones__icones">
              <FaPen size={"1rem"} color="var(--noir)" />
              <CgRemove size={"1rem"} color="var(--noir)" />
              <FaPlayCircle size={"2rem"} color="var(--noir)" />
            </div>
          </motion.section>
        </motion.section>

        {
          // playlist.songs[0].album.cover &&
          <div className="coverplaylist">
            <img src={urlImg} alt="" />
            <img src={urlImg} alt="" />
            <img src={urlImg} alt="" />
            <img src={urlImg} alt="" />
          </div>
        }
      </header>

      <motion.section
        className="lesplaylists__playlist"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Link to="/search">
          <RechercheDeezerInput
            placeholder={"Ajoutez une chanson !"}
            icone={"add"}
          />
        </Link>

        <motion.section
          className="lesplaylists__playlist__inner__chansons"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="lesplaylists__playlist__inner__chansons__infos">
            <span className="chansons__infos__number">#</span>
            <span className="chansons__infos__titre">Titre</span>
            <span className="chansons__infos__album">Album</span>
            <span className="chansons__infos__duree">Durée</span>
          </div>
          <motion.div
            className="lesplaylists__playlist__inner__chansons__chansons"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {playlist.songs.map((song, index) => {
              return (
                <AnimatedItem key={song.id}>
                  <ItemChansons
                    song={song}
                    index={index}
                    handleDeleteSong={handleDeleteSong}
                    playlistId={clickedPlaylist.id}
                    JouerLaChanson={JouerLaChanson}
                  />
                </AnimatedItem>
              );
            })}

            {/* <AnimatedItem>
                <ItemChansons />
              </AnimatedItem>

              <AnimatedItem delay={0.1}>
                <ItemChansons />
              </AnimatedItem>

              <AnimatedItem delay={0.2}>
                <ItemChansons />
              </AnimatedItem>

              <AnimatedItem delay={0.3}>
                <ItemChansons />
              </AnimatedItem>

              <AnimatedItem delay={0.4}>
                <ItemChansons />
              </AnimatedItem>

              <AnimatedItem delay={0.5}>
                <ItemChansons />
              </AnimatedItem>

              <AnimatedItem delay={0.6}>
                <ItemChansons />
              </AnimatedItem>

              <AnimatedItem delay={0.7}>
                <ItemChansons />
              </AnimatedItem> */}
          </motion.div>
        </motion.section>

        <div className="separateur">
          <span>Chansons recommandées</span>
        </div>

        <motion.section
          className="lesplaylists__playlist__inner__chansons__chansons recommande"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <AnimatedItem>
            <ItemChansonRecomande premier={true} />
          </AnimatedItem>
          <AnimatedItem delay={0.1}>
            <ItemChansonRecomande />
          </AnimatedItem>
          <AnimatedItem delay={0.2}>
            <ItemChansonRecomande />
          </AnimatedItem>
          <AnimatedItem delay={0.3}>
            <ItemChansonRecomande />
          </AnimatedItem>
          <AnimatedItem delay={0.4}>
            <ItemChansonRecomande />
          </AnimatedItem>
          <AnimatedItem delay={0.5}>
            <ItemChansonRecomande />
          </AnimatedItem>
          <AnimatedItem delay={0.6}>
            <ItemChansonRecomande />
          </AnimatedItem>
          <AnimatedItem delay={0.7}>
            <ItemChansonRecomande />
          </AnimatedItem>
        </motion.section>
      </motion.section>
    </motion.div>
  );
};

export default LesPlaylist;
