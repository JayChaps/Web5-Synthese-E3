// ItemChansons.jsx :
import React, { useContext, useEffect } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { CgRemove } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";
import Coeur from "../Coeur/Coeur";
import { PlaylistsContext } from "../../context/playlistsContext";
import { SongInfoContext } from "../../context/SongInfoContext";
import { Link } from "react-router-dom";
import { SoloPlaylistContext } from "../../context/soloPlaylistContext";

// const ItemChansons = ({ song, handleDeleteSong, JouerLaChanson, index }) => {
const ItemChansons = ({ song, handleDeleteSong, index }) => {

  const urlImg = "https://i.imgur.com/xaJK7nC.jpg";

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

  const { previousSong, setPreviousSong,
    currentSong, setCurrentSong,
    nextSong, setNextSong,
    handleNextSong, handlePreviousSong,
    handleAllThreeSongs } = useContext(SoloPlaylistContext);	

  useEffect(() => {
    console.log(song);
  }, [song]);

  const JouerLaChanson = (song, index) => {
    setSelectedSong(song);
    handlePlaySong(song);
    setCurrentSong(song);
    handleAllThreeSongs(song, index);
  };
  

  const coverImg = song.album.cover ? song.album.cover : urlImg;
  const songTitle = song.title ? song.title : "Titre inconnu";
  const artistName = song.artist.name ? song.artist.name : "Artiste inconnu";
  const albumTitle = song.album.title ? song.album.title : "Album inconnu";

  return (
    <article>
      <div className="chansonnumber">
        <span>{index+1}</span>
      </div>
      <div className="info">
        <div className="chansoncover">
          <img src={coverImg} alt="" />
          <FaPlayCircle 
            size={"2rem"} 
            color="var(--blanc)"
            onClick={() => JouerLaChanson(song, index)}
          />
        </div>
        <div className="infoschansons">
          <Link>
          <span>{songTitle}</span>
          </Link>
          <Link>
          <span>{artistName}</span>
          </Link>
        </div>

        <div className="albumplaylist">
          <span>{albumTitle}</span>
        </div>

        <div className="duree">
          <span>
            { song.duration % 60 < 10 ? 
            Math.floor(song.duration / 60) + ":0" + song.duration % 60 : 
            Math.floor(song.duration / 60) + ":" + song.duration % 60 }
          </span>
        </div>

        <div className="icones">
          <Coeur 
            songToAdd={song}
          />
          <CgRemove size={"2rem"} color="var(--noir)" 
            onClick={() => handleDeleteSong(clickedPlaylist.id, song)}
          />
        </div>
      </div>
    </article>
  );
};

export default ItemChansons;
