import React, { useContext, useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { CgAdd } from "react-icons/cg";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PlaylistSelector from "./PlaylistSelector";
import { SongInfoContext } from "../../context/SongInfoContext";
import { PlaylistsContext } from "../../context/playlistsContext";

const ItemRecherche = ({ result }) => {
  const {
    createNewPlaylist,
    deletePlaylist,
    addToPlaylist,
    removeSongFromPlaylist,
    newPlaylistName,
    setNewPlaylistName,
    selectedPlaylistId,
    setSelectedPlaylistId,
    fetchPlaylists,
    fetchPlaylist,
    playlists,
    setPlaylists,
    playlist,
    setPlaylist,
    selectedSong,
    setSelectedSong,
    createNewPlaylistAndAddSong,
  } = useContext(PlaylistsContext);

  const [shouldFetchPlaylist, setShouldFetchPlaylist] = useState(false);
  const [shouldFetchPlaylists, setShouldFetchPlaylists] = useState(false);

  const { handlePlaySong, handlePlaySongRecherche, songInfo } = useContext(SongInfoContext);

  const [selectorActif, setSelectorActif] = useState(false);
  const controls = useAnimation();

  const handlePlaylistSelector = (song) => {
    setShouldFetchPlaylist(true);
    setSelectorActif(!selectorActif);
    if (!selectorActif) {
      setSelectedSong(song);
    }
  };

  useEffect(() => {
    if (shouldFetchPlaylists) {
      fetchPlaylists();
      setShouldFetchPlaylists(false);
      console.log("useEffect fetchPlaylist");
    }
  }, [shouldFetchPlaylists]);

  const startAnimation = async () => {
    await controls.start({ opacity: 1, y: 0, scale: 1 });
  };

  useEffect(() => {
    startAnimation();
  }, []);


  const faireJouer = (laChanson) => {
    handlePlaySong(laChanson);
    setSelectedSong(laChanson);
  };


  return (
    <>
      {selectorActif && (
        <PlaylistSelector
          estActif={selectorActif}
          setActif={setSelectorActif}
          theSong={result}
        />
      )}
      <motion.li
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={controls}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.05, boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)" }}
      >
        <h4 className="titrestroke">{result.title}</h4>
        <div className="infos">
          <h2>{result.title}</h2>
          <Link to={`/artist/${result.artist.id}`}>
            <p>{result.artist.name}</p>
          </Link>
        </div>
        <div className="imgrecherche">
          <motion.img
            // onClick={() => handlePlaySong(result)}
            onClick={() => faireJouer(result)}
            src={result.album.cover}
            alt={`Couverture de l'album ${result.album.title}`}
            whileHover={{ scale: 1.05 }}
          />
        </div>
        <div className="boutons">
          <CgAdd
            size={"2rem"}
            color="var(--blanc)"
            onClick={() => handlePlaylistSelector(result)}
          />
          <FaPlayCircle
            size={"2rem"}
            color="var(--blanc)"
            // onClick={() => handlePlaySong(result)}
            onClick={() => faireJouer(result)}
          />
        </div>
      </motion.li>
    </>
  );
};

export default ItemRecherche;
