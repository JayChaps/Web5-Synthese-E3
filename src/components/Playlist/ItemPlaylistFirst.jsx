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
    createNewPlaylistAndAddSong,
    clickedPlaylist, setClickedPlaylist, } = useContext(PlaylistsContext);

  const handleCreateNewPlaylist = (e) => {
    e.preventDefault();
    createNewPlaylist(newPlaylistName);
  }

  return (
    <article className="itemplaylist itemplaylistfirst">
      <div className="wrapperitem">
        <CreerPlaylistInput
          placeholder={"Créer une playlist"}
          autoFocus={false}
        />
        {/* <Link to="/playlist" > */}
          <CgAdd size={"4rem"} color="var(--blanc)" onClick={handleCreateNewPlaylist}/>
        {/* </Link> */}
      </div>
    </article>
  );
};

export default ItemPlaylistFirst;
