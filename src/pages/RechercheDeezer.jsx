import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import { motion } from "framer-motion";
// import LayoutAuth from "../components/LayoutAuth";
import { db } from "../config/firebase";
import {
    collection,
    setDoc,
    doc,
    arrayUnion,
    getDocs,
    addDoc,
} from "firebase/firestore";
// import { useAudio } from "../context/audiotim";
import { SongInfoContext } from "../context/SongInfoContext";
// import { useSongInfo } from "../context/SongInfoContext";
import { PlaylistsContext } from "../context/playlistsContext";
import { PlaylistSelector } from "../components/RechercheDeezer/PlaylistSelector";

import RechercheDeezerInput from "../components/RechercheDeezer/RechercheInput";

import { CgAdd } from "react-icons/cg";
import { FaPlayCircle } from "react-icons/fa";
import RechercheDeezerInput from "../components/RechercheDeezer/RechercheInput";
import { PlaylistSelector } from "../components/RechercheDeezer/PlaylistSelector";
import { SongInfoContext } from "../context/SongInfoContext";
import { PlaylistsContext } from "../context/playlistsContext";

const RechercheDeezer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectorActif, setSelectorActif] = useState(false);
  const navigate = useNavigate();

    // const { changeSource, play, pause } = useAudio();
    const { handlePlaySong } = useContext(SongInfoContext);
    const { createNewPlaylist, deletePlaylist,
        addToPlaylist, removeSongFromPlaylist,
        newPlaylistName, setNewPlaylistName,
        selectedPlaylistId, setSelectedPlaylistId,
        fetchPlaylists, fetchPlaylist,
        playlists, setPlaylists,
        playlist, setPlaylist,
        selectedSong, setSelectedSong,
        createNewPlaylistAndAddSong } = useContext(PlaylistsContext);

    const [shouldFetchPlaylist, setShouldFetchPlaylist] = useState(false);
    const [shouldFetchPlaylists, setShouldFetchPlaylists] = useState(false);

    const searchFilters = ["artist", "album", "track"]

    useEffect(() => {
        if (searchTerm) {
            handleSearch();
        }
    }, [searchTerm, filter]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

  const handleSearch = () => {
    const encodedSearchTerm = encodeURIComponent(searchTerm);
    const url = `https://api.deezer.com/search?q=${filter}:\"${encodedSearchTerm}\"&output=jsonp`;

    fetchJsonp(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.data || []);
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche:", error);
      });
  };

    // useEffect(() => {
    //     console.log("SelectedSong: "+ {selectedSong});
    // }, [selectedSong, selectorActif]);

    // Récupération de la playlist
    useEffect(() => {
        if (shouldFetchPlaylist) {
            fetchPlaylist();
            setShouldFetchPlaylist(false);
            console.log("useEffect fetchPlaylist");
        }
        // }, [newPlaylistName, playlists, createNewPlaylist]);
    }, [shouldFetchPlaylist]);


  const filters = (e) => {
    setFilter("");
    setFilter(e.target.value);
  };

  const handlePlaylistSelector = (song) => {
        setShouldFetchPlaylist(true);
    setSelectorActif(!selectorActif);
    if (!selectorActif) {
      setSelectedSong(song);
    }
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
      className="deezer"
    >
      <Link to="/" className="outer">
        <div className="inner">
          <label>Retour</label>
        </div>
      </Link>
      <h1>Recherche</h1>
      <div className="recherche">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <RechercheDeezerInput
            autoFocus={true}
            value={searchTerm}
            handleInputChange={handleInputChange}
            handleSearch={handleSearch}
            placeholder={"Que voulez-vous écouter ?"}
            icone={"search"}
          />
        </motion.div>
      </div>
      <div className="filtres">
        <button
          value={searchFilters[0]}
          onClick={filters}
          className={filter === searchFilters[0] ? "active" : ""}
        >
          Artistes
        </button>
        <button
          value={searchFilters[1]}
          onClick={filters}
          className={filter === searchFilters[1] ? "active" : ""}
        >
          Albums
        </button>
        <button
          value={searchFilters[2]}
          onClick={filters}
          className={filter === searchFilters[2] ? "active" : ""}
        >
          Titres
        </button>
      </div>

      <ul>
        {searchResults.map((result, index) => (
          <motion.li
            key={index}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <h4 className="titrestroke">{result.title}</h4>
            <div className="infos">
              <h2>{result.title}</h2>
              <Link to={`/artist/${result.artist.id}`}>
                <p>{result.artist.name}</p>
              </Link>
            </div>
            <div className="imgrecherche">
              <img
                onClick={() => handlePlaySong(result)}
                src={result.album.cover}
                alt={`Couverture de l'album ${result.album.title}`}
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
                onClick={() => handlePlaySong(result)}
              />
            </div>
            {selectorActif && (
              <PlaylistSelector
                estActif={selectorActif}
                setActif={setSelectorActif}
                theSong={result}
              />
            )}
          </motion.li>
        ))}
      </ul>
    </motion.div>
  );
};

export default RechercheDeezer;
