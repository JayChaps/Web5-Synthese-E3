import React, { useContext, useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { CgRemove } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";
import Coeur from "../Coeur/Coeur";
import { PlaylistsContext } from "../../context/playlistsContext";
import { SongInfoContext } from "../../context/SongInfoContext";

const ItemChansons = ({ song, handleDeleteSong, JouerLaChanson, index }) => {

  const urlImg = "src/assets/img/jpg/placeholder.jpg";

  const { handlePlaySong } = useContext(SongInfoContext);
  const { createNewPlaylist, deletePlaylist,
    addToPlaylist, removeSongFromPlaylist,
    newPlaylistName, setNewPlaylistName,
    selectedPlaylistId, setSelectedPlaylistId,
    fetchPlaylists, fetchPlaylist,
    playlists, setPlaylists,
    playlist, setPlaylist,
    selectedSong, setSelectedSong,
    createNewPlaylistAndAddSong, 
    clickedPlaylist, setClickedPlaylist } = useContext(PlaylistsContext);

  useEffect(() => {
    console.log(song);
  }, [song]);


  return (
    <article>
      <div className="chansonnumber">
        <span>{index+1}</span>
      </div>
      <div className="info">
        <div className="chansoncover">
          <img src={song.album.cover} alt="" />
          <FaPlayCircle 
            size={"2rem"} 
            color="var(--noir)" 
            onClick={() => JouerLaChanson(song)}
          />
        </div>
        <div className="infoschansons">
          <span>{song.title}</span>
          <span>{song.artist.name}</span>
        </div>

        <div className="album">
          <span>{song.album.title}</span>
        </div>

        <div className="duree">
          <span>
            { song.duration % 60 < 10 ? 
            Math.floor(song.duration / 60) + ":0" + song.duration % 60 : 
            Math.floor(song.duration / 60) + ":" + song.duration % 60 }
          </span>
        </div>

        <div className="icones">
          <Coeur />
          <CgRemove size={"2rem"} color="var(--noir)" 
            onClick={() => handleDeleteSong(clickedPlaylist.id, song.id)}
          />
        </div>
      </div>
    </article>
  );
};

export default ItemChansons;
