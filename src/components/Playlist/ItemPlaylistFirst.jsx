import React, { useContext } from "react";
import { CgAdd } from "react-icons/cg";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import CreerPlaylistInput from "../RechercheDeezer/CreerPlaylistInput";
import { PlaylistsContext } from "../../context/playlistsContext";

const ItemPlaylistFirst = () => {
    
  const urlImg = "/src/assets/img/jpg/placeholder.jpg";

  const { createNewPlaylist, deletePlaylist,
    addToPlaylist, removeSongFromPlaylist,
    newPlaylistName, setNewPlaylistName,
    selectedPlaylistId, setSelectedPlaylistId,
    fetchPlaylists, fetchPlaylist,
    playlists, setPlaylists,
    playlist, setPlaylist,
    selectedSong, setSelectedSong,
    createNewPlaylistAndAddSong } = useContext(PlaylistsContext);

  const handleCreateNewPlaylist = () => {
    createNewPlaylist(newPlaylistName);
  }

  return (
    <article className="itemplaylist itemplaylistfirst">
      <div className="wrapperitem">
        <CreerPlaylistInput
          placeholder={"Créer une playlist"}
          autoFocus={false}
        />
        <CgAdd size={"4rem"} color="var(--blanc)" onClick={handleCreateNewPlaylist}/>
      </div>
    </article>
  );
};

export default ItemPlaylistFirst;
