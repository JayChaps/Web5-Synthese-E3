// PlaylistSelector.jsx :
import React, { useContext, useEffect, useState } from "react";
import { PlaylistsContext } from "../../context/playlistsContext";
import { SongInfoContext } from "../../context/SongInfoContext";

import CreerPlaylistInput from "./CreerPlaylistInput";

import { CgAdd } from "react-icons/cg";

export const PlaylistSelector = ({ estActif, setActif, theSong }) => {
  // const [ estActif, setActif ] = useState(false);
  const [champNomActif, setChampNomActif] = useState(false);

  const { handlePlaySong } = useContext(SongInfoContext);
  const { createNewPlaylist, deletePlaylist, 
    addToPlaylist, removeSongFromPlaylist, 
    newPlaylistName, setNewPlaylistName, 
    selectedPlaylistId, setSelectedPlaylistId,
    fetchPlaylists, fetchPlaylist, 
    playlists, setPlaylists, 
    playlist, setPlaylist,
    selectedSong, setSelectedSong,
    createNewPlaylistAndAddSong, } = useContext(PlaylistsContext);

  const [shouldFetchPlaylist, setShouldFetchPlaylist] = useState(false);
  const [shouldFetchPlaylists, setShouldFetchPlaylists] = useState(false);

  const ajouter = (id) => {
    setSelectedPlaylistId(id);
    addToPlaylist(theSong);
    setChampNomActif(false);
    setActif(false);
  };

  useEffect(() => {
    if (shouldFetchPlaylists) {
      fetchPlaylists();
      setShouldFetchPlaylists(false);
      console.log(
        "useEffect fetchPlaylists avec un S pcq shouldFetchPlaylists est true"
      );
    }
    // }, [newPlaylistName, createNewPlaylist, estActif]);
  }, [shouldFetchPlaylists]);
  // }, []);

  // useEffect(() => {
  //     if (estActif) {
  //         fetchPlaylists();
  //         console.log("useEffect fetchPlaylists avec un S pcq estActif est true");
  //     }
  // }, [estActif]);

  const creerEtAjouter = () => {
    if (newPlaylistName !== "") {
      createNewPlaylistAndAddSong(newPlaylistName, theSong);
      setChampNomActif(false);
    }
  };

  // useEffect(() => {
  //     setSelectedSong(theSong);
  //     console.log("SelectedSong: "+ {selectedSong});
  // }, [theSong, estActif]);

  return (
    <div className="playlistSelector">
      <div className="outer" onClick={() => setActif(false)}>
        <div className="inner">
          <label>Retour</label>
        </div>
      </div>
      <div className="playlistSelector__header">
        <h2>Mes playlists</h2>
      </div>
      <div className="playlistSelector__body">
        <CreerPlaylistInput
          value={newPlaylistName}
          handleInputChange={(e) => setNewPlaylistName(e.target.value)}
          action={() => creerEtAjouter()}
          placeholder={"Créer une playlist"}
        />
        {/* <input
                type="text"
                value={newPlaylistName}
                onChange={(e) => setNewPlaylistName(e.target.value)}
                // onSubmit={() => creerEtAjouter()}
              /> */}
        {/* <button onClick={() => creerEtAjouter()}>Créer</button> */}

        <ul>
          {playlists.map((playlist) => (
            <li key={playlist.id}>
              <CgAdd size={"2rem"} color="var(--blanc)" />
              <button onClick={() => ajouter(playlist.id)}>
                {playlist.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PlaylistSelector;
