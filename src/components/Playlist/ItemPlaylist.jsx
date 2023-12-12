// ItemPlaylist.jsx :
import React, { useContext, useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgRemove } from "react-icons/cg";
import { PlaylistsContext } from "../../context/playlistsContext";



const ItemPlaylist = ({key, playlist, name, songs}) => {

  const urlImg = "/src/assets/img/jpg/placeholder.jpg";

  const [ laFirstSong, setLaFirstSong ] = useState({});
  const [ laSecondSong, setLaSecondSong ] = useState({});
  const [ laThirdSong, setLaThirdSong ] = useState({});
  const [ laFourthSong, setLaFourthSong ] = useState({});

  const [ firstCov, setFirstCov ] = useState("");
  const [ secondCov, setSecondCov ] = useState("");
  const [ thirdCov, setThirdCov ] = useState("");
  const [ fourthCov, setFourthCov ] = useState("");

  const theSongsArray = songs;

  const { createNewPlaylist, deletePlaylist, 
    addToPlaylist, removeSongFromPlaylist, 
    newPlaylistName, setNewPlaylistName, 
    selectedPlaylistId, setSelectedPlaylistId,
    fetchPlaylists, fetchPlaylist, 
    playlists, setPlaylists, 
    selectedSong, setSelectedSong,
    createNewPlaylistAndAddSong, 
    clickedPlaylist, setClickedPlaylist } = useContext(PlaylistsContext);
  
  
  

  useEffect(() => {
    if (playlist && songs) {
      const firstSong = theSongsArray[0];
      if(firstSong) {setLaFirstSong(firstSong); setFirstCov(firstSong.album.cover);}
      else if(!firstSong) { 
        setFirstCov(urlImg); setSecondCov(urlImg); 
        setThirdCov(urlImg); setFourthCov(urlImg); };

      const secondSong = theSongsArray[1];
      if(secondSong) {setLaSecondSong(secondSong); setSecondCov(secondSong.album.cover);}
      else if(!secondSong) {setLaSecondSong(firstSong); setSecondCov(firstSong.album.cover);}
      
      const thirdSong = theSongsArray[2];
      if(thirdSong) {setLaThirdSong(thirdSong); setThirdCov(thirdSong.album.cover);}
      else if(!thirdSong) {
        if(secondSong) {setLaThirdSong(secondSong); setThirdCov(secondSong.album.cover);}
        else if(!secondSong) {setLaThirdSong(firstSong); setThirdCov(firstSong.album.cover);}
      }

      const fourthSong = theSongsArray[3];
      if(fourthSong) {setLaFourthSong(fourthSong); setFourthCov(fourthSong.album.cover);}
      else if(!fourthSong) {
        if(thirdSong) {setLaFourthSong(thirdSong); setFourthCov(thirdSong.album.cover);}
        else if(!thirdSong) {
          if(secondSong) {setLaFourthSong(firstSong); setFourthCov(firstSong.album.cover);}
          else if(!secondSong) {setLaFourthSong(firstSong); setFourthCov(firstSong.album.cover);}
        }
      }
    }
  }, [playlist]); // Add playlist as a dependency to the useEffect hook
  


  const click = (e) => {
    e.preventDefault();
    console.log("click " + playlist.id);
    setClickedPlaylist(playlist);
    console.log("clickedPlaylist " + clickedPlaylist)
  };


  
  return (
    <article className="itemplaylist">
      <div className="wrapperitem">
        <h3>{name}</h3>
        {(firstCov && 
          <>
            <img src={firstCov} alt="" />
            <img src={secondCov} alt="" />
            <img src={thirdCov} alt="" />
            <img src={fourthCov} alt="" />
          </>
        )}
        <Link to="/playlist" onClick={click} className="itema" >
          <FaPlayCircle size={"4rem"} color="var(--blanc)" />
        </Link>
        <CgRemove 
          size={"2rem"} 
          color="var(--blanc)" 
          onClick={() => deletePlaylist(playlist.id)}
        />
      </div>
    </article>
  );
};

export default ItemPlaylist;
