// PlaylistSelector.jsx :
import React, { useContext, useEffect, useState } from "react";
import { PlaylistsContext } from "../../context/playlistsContext";
import { SongInfoContext } from "../../context/SongInfoContext";

import CreerPlaylistInput from "./CreerPlaylistInput";

export const PlaylistSelector = ({ estActif, setActif, theSong }) => {
  // const [ estActif, setActif ] = useState(false);
  const [champNomActif, setChampNomActif] = useState(false);

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

  const ajouter = (id) => {
    setSelectedPlaylistId(id);
    addToPlaylist(theSong);
    setChampNomActif(false);
    setActif(false);
  };

  useEffect(() => {
    fetchPlaylists();
  }, [newPlaylistName, playlists, createNewPlaylist, estActif]);

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
      <div className="playlistSelector__header">
        <h2>Playlists</h2>
        <div className="outer" onClick={() => setActif(false)}>
          <div className="inner"></div>
        </div>
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
