// RechercheDeezer.jsx :
import React, { useState, useEffect, useContext } from "react";
import {  Link, useNavigate } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
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

const RechercheDeezer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [filter, setFilter] = useState("");
  // const { estActif, setActif } = PlaylistSelector();
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

    const searchFilters = ["artist","album","track"]

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
    console.log(url);

    fetchJsonp(url)
      .then((response) => response.json())
      .then((data) => {
        setSearchResults(data.data || []);
        console.log(data.data);
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
            console.log("useEffect fetchPlaylist");
        }
    // }, [newPlaylistName, playlists, createNewPlaylist]);
    }, [shouldFetchPlaylist]);
    

  const filters = (e) => {
    setFilter("");
    setFilter(e.target.value);
    console.log(e.target.value);
  };

  const handlePlaylistSelector = (song) => {
        setShouldFetchPlaylist(true);
    setSelectorActif(!selectorActif);
    if (!selectorActif) {
      setSelectedSong(song);
    }
    console.log(selectedSong);
  };

  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  }

  return (
    <div className="deezer">
      <Link onClick={handleBack}>
        <div className="outer">
          <div className="inner">
            <label>Retour</label>
          </div>
        </div>
      </Link>
      <h1>Recherche</h1>
      <div className="recherche">
        <RechercheDeezerInput
          autoFocus={true}
          value={searchTerm}
          handleInputChange={handleInputChange}
          handleSearch={handleSearch}
          placeholder={"Que voulez-vous écouter ?"}
          icone={"search"}
        />
        {/* <button onClick={handleSearch}>Rechercher</button> */}
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
        {searchResults.map((result, index) => {
          return (
            <li key={index}>
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
                <CgAdd size={"2rem"} color="var(--blanc)"  onClick={() => handlePlaylistSelector(result)}/>
                <FaPlayCircle size={"2rem"} color="var(--blanc)" onClick={() => handlePlaySong(result)}/>
              </div>
              {selectorActif && (
                <PlaylistSelector
                  estActif={selectorActif}
                  setActif={setSelectorActif}
                  theSong={result}
                />
              )}
              {/* <button onClick={() => fetchLyrics(result.id)}>Afficher les paroles</button> */}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default RechercheDeezer;
