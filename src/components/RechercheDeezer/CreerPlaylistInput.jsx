import React, { useContext } from "react";
import { CgAdd } from "react-icons/cg";
import { PlaylistsContext } from "../../context/playlistsContext";
const CreerPlaylistInput = ({ value, handleInputChange, action, autoFocus, placeholder }) => {
  
  const { createNewPlaylist, deletePlaylist,
    addToPlaylist, removeSongFromPlaylist,
    newPlaylistName, setNewPlaylistName,
    selectedPlaylistId, setSelectedPlaylistId,
    fetchPlaylists, fetchPlaylist,
    playlists, setPlaylists,
    playlist, setPlaylist,
    selectedSong, setSelectedSong,
    createNewPlaylistAndAddSong } = useContext(PlaylistsContext);
  
  const handleNameChange = (e) => {
    setNewPlaylistName(e.target.value);
  }

  return (
    <div className="playlist__recherche">
      <div className="lesplaylists__playlist__recherche__inner">
        <CgAdd size={"2rem"} color="var(--noir)" onClick={action}/>
        <div>
          <input type="text" value={value} onChange={handleNameChange}
            autoFocus={autoFocus} 
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default CreerPlaylistInput;
