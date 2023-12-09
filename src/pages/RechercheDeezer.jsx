// RechercheDeezer.jsx :
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
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
import { PlaylistSelector } from "../components/PlaylistSelector";


import { IoIosSearch } from "react-icons/io";
import RechercheDeezerInput from "../components/RechercheDeezer/RechercheDeezerInput";

const RechercheDeezer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [filter, setFilter] = useState("");
  // const { estActif, setActif } = PlaylistSelector();
  const [selectorActif, setSelectorActif] = useState(false);

  // const { changeSource, play, pause } = useAudio();
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

  const searchFilters = ["artist", "album", "track"];

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
    fetchPlaylist();
  }, [newPlaylistName, playlists, createNewPlaylist]);

  const filters = (e) => {
    setFilter("");
    setFilter(e.target.value);
    console.log(e.target.value);
  };

  const handlePlaylistSelector = (song) => {
    setSelectorActif(!selectorActif);
    if (!selectorActif) {
      setSelectedSong(song);
    }
    console.log(selectedSong);
  };

  return (
    <section className="deezer">
      <h1>Recherche</h1>
      <div className="recherche">
        <RechercheDeezerInput 

        value={searchTerm}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
        />
        {/* <button onClick={handleSearch}>Rechercher</button> */}
      </div>
      <div className="filtres">
        <button value={searchFilters[0]} onClick={filters}>
          Artistes
        </button>
        <button value={searchFilters[1]} onClick={filters}>
          Albums
        </button>
        <button value={searchFilters[2]} onClick={filters}>
          Titres
        </button>
      </div>

      <ul>
        {searchResults.map((result, index) => {
          return (
            <li key={index}>
              <h2>{result.title}</h2>
              <Link to={`/artist/${result.artist.id}`}>
                <p>{result.artist.name}</p>
              </Link>
              <div className="imgrecherche">
                <img
                  onClick={() => handlePlaySong(result)}
                  src={result.album.cover}
                  alt={`Couverture de l'album ${result.album.title}`}
                />
              </div>
              <button onClick={() => handlePlaylistSelector(result)}>
                Ajouter à la playlist
              </button>
              {selectorActif && (
                <PlaylistSelector
                  estActif={selectorActif}
                  setActif={setSelectorActif}
                  theSong={result}
                />
              )}
              {/* <button onClick={() => fetchLyrics(result.id)}>Afficher les paroles</button> */}
              <button onClick={() => handlePlaySong(result)}>Lire</button>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default RechercheDeezer;
