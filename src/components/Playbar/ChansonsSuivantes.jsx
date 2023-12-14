// ChansonsSuivantes.jsx :
import ChansonSuivante from "./ChansonSuivante";
import Glider from "react-glider";
import "glider-js/glider.min.css";
import React, { useContext, useEffect, useState } from "react";
import { SongInfoContext } from "../../context/SongInfoContext";
import { PlaylistsContext } from "../../context/playlistsContext";
import { SoloPlaylistContext } from "../../context/soloPlaylistContext";
const ChansonsSuivantes = () => {

  const settings = {
    slidesToShow: 3,
    draggable: true,
  };

  const { createNewPlaylist, deletePlaylist,
    addToPlaylist, removeSongFromPlaylist,
    newPlaylistName, setNewPlaylistName,
    selectedPlaylistId, setSelectedPlaylistId,
    selectedPlaylist, setSelectedPlaylist,
    fetchPlaylists, fetchPlaylist,
    playlists, setPlaylists,
    playlist, setPlaylist,
    selectedSong, setSelectedSong,
    createNewPlaylistAndAddSong,
    clickedPlaylist, setClickedPlaylist,
    firstBigCov, setFirstBigCov,
    secondBigCov, setSecondBigCov,
    thirdBigCov, setThirdBigCov,
    fourthBigCov, setFourthBigCov, } = useContext(PlaylistsContext);

    const { handlePlaySong } = useContext(SongInfoContext);

    const { currentSong, setCurrentSong,
            currentIndex, setCurrentIndex,
            songsInPlaylist, setSongsInPlaylist,  
            nextSong, setNextSong,
            previousSong, setPreviousSong, } = useContext(SoloPlaylistContext);

    const [nextSongs, setNextSongs] = useState([]); // Array of songs in the playlist

    useEffect(() => {
      setNextSongs(currentIndex < songsInPlaylist.length - 1
        ? songsInPlaylist.slice(currentIndex + 1) : []);
      console.log("nextSongs", nextSongs)
    }, [currentIndex, songsInPlaylist]);


  return (
    <section className="chansonssuivantes">
      <Glider {...settings}>
        
        {nextSongs.map((song, index) => (
          <ChansonSuivante
            key={index}
            song={song}
          />
        ))}


      </Glider>
    </section>
  );
};

export default ChansonsSuivantes;
