// ItemPlaylist.jsx :
import React, { useContext, useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgRemove } from "react-icons/cg";
import { PlaylistsContext } from "../../context/playlistsContext";



const ItemPlaylist = ({playlist, name, songs}) => {

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
                    setPlaylist, 
    playlists, setPlaylists, 
    selectedSong, setSelectedSong,
    createNewPlaylistAndAddSong, 
    clickedPlaylist, setClickedPlaylist } = useContext(PlaylistsContext);
  
  
  useEffect(() => {
    if (playlist && songs) {

      const firstSong = theSongsArray[0] ? theSongsArray[0] : null;
      if (firstSong) {
        setLaFirstSong(firstSong);
        setFirstCov(firstSong.album.cover);

        const secondSong = theSongsArray[1] ? theSongsArray[1] : null;
        if (secondSong) {
          setLaSecondSong(secondSong);
          setSecondCov(secondSong.album.cover);

          const thirdSong = theSongsArray[2] ? theSongsArray[2] : null;
          if (thirdSong) {
            setLaThirdSong(thirdSong);
            setThirdCov(thirdSong.album.cover);

            const fourthSong = theSongsArray[3] ? theSongsArray[3] : null;
            if (fourthSong) {
              setLaFourthSong(fourthSong);
              setFourthCov(fourthSong.album.cover);
            } else if (!fourthSong) {
              setLaFourthSong(firstSong);
              setFourthCov(firstSong.album.cover);
              console.log("no fourth song", playlist.name);
              return;
            }
          } else if (!thirdSong) {
            setLaThirdSong(firstSong);
            setThirdCov(firstSong.album.cover);
            console.log("no third song", playlist.name);
            return;
          } 
        } else if (!secondSong) {
          setLaSecondSong(firstSong);
          setSecondCov(firstSong.album.cover);
          console.log("no second song", playlist.name);
          return;
        }
      } else if (!firstSong) {
        setFirstCov(urlImg);
        setSecondCov(urlImg);
        setThirdCov(urlImg);
        setFourthCov(urlImg);
        console.log("no first song", playlist.name);
        return;
      };



      // const firstSong = theSongsArray[0] ? theSongsArray[0] : null;
      // if(firstSong) {setLaFirstSong(firstSong); setFirstCov(firstSong.album.cover);}
      // else if(!firstSong) { 
      //   setFirstCov(urlImg); setSecondCov(urlImg); 
      //   setThirdCov(urlImg); setFourthCov(urlImg); 
      //   return;};

      // const secondSong = theSongsArray[1] ? theSongsArray[1] : null;
      // if(secondSong) {setLaSecondSong(secondSong); setSecondCov(secondSong.album.cover);}
      // else if(!secondSong) {setLaSecondSong(firstSong); setSecondCov(firstSong.album.cover); return;}
      
      // const thirdSong = theSongsArray[2] ? theSongsArray[2] : null;
      // if(thirdSong) {setLaThirdSong(thirdSong); setThirdCov(thirdSong.album.cover);}
      // else if(!thirdSong) {
      //   if(secondSong) {setLaThirdSong(secondSong); setThirdCov(secondSong.album.cover);}
      //   else if(!secondSong) {setLaThirdSong(firstSong); setThirdCov(firstSong.album.cover); return;}
      // }

      // const fourthSong = theSongsArray[3] ? theSongsArray[3] : null;
      // if(fourthSong) {setLaFourthSong(fourthSong); setFourthCov(fourthSong.album.cover);}
      // else if(!fourthSong) {
      //   if(thirdSong) {setLaFourthSong(thirdSong); setFourthCov(thirdSong.album.cover);}
      //   else if(!thirdSong) {
      //     if(secondSong) {setLaFourthSong(firstSong); setFourthCov(firstSong.album.cover);}
      //     else if(!secondSong) {setLaFourthSong(firstSong); setFourthCov(firstSong.album.cover); return;}
          
      //   }
      // }

    }
  }, [playlist]); // Add playlist as a dependency to the useEffect hook
  


  const click = (e) => {
    e.preventDefault();
    console.log("click " + playlist.id);
    // setPlaylist(playlist);
    setClickedPlaylist(playlist);
    console.log(playlist);
    // console.log("clickedPlaylist " + clickedPlaylist)
  };

  useEffect(() => {
    console.log("clickedPlaylist " + clickedPlaylist)
  }, [clickedPlaylist]);
  
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
