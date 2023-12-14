// ItemPlaylist.jsx :
import React, { useContext, useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgRemove } from "react-icons/cg";
import { PlaylistsContext } from "../../context/playlistsContext";

const ItemPlaylist = ({ playlist, name, songs }) => {
  const urlImg = "https://i.imgur.com/xaJK7nC.jpg";

  const [laFirstSong, setLaFirstSong] = useState({});
  const [laSecondSong, setLaSecondSong] = useState({});
  const [laThirdSong, setLaThirdSong] = useState({});
  const [laFourthSong, setLaFourthSong] = useState({});

  const [firstCov, setFirstCov] = useState("");
  const [secondCov, setSecondCov] = useState("");
  const [thirdCov, setThirdCov] = useState("");
  const [fourthCov, setFourthCov] = useState("");

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
    setPlaylist,
    playlists,
    setPlaylists,
    selectedSong,
    setSelectedSong,
    createNewPlaylistAndAddSong,
    clickedPlaylist,
    setClickedPlaylist,
    firstBigCov,
    setFirstBigCov,
    secondBigCov,
    setSecondBigCov,
    thirdBigCov,
    setThirdBigCov,
    fourthBigCov,
    setFourthBigCov,
  } = useContext(PlaylistsContext);

  useEffect(() => {
    if (songs) {
      if (songs.length != 0) {
        setLaFirstSong(songs[0]);

        if (songs.length === 2) {
          setLaSecondSong(songs[1]);
        }
        if (songs.length === 3) {
          setLaThirdSong(songs[2]);
        }
        if (songs.length === 4) {
          setLaFourthSong(songs[3]);
        }

        if (songs.length == 1) {
          setFirstCov(songs[0].album.cover_big);
          setSecondCov(songs[0].album.cover_big);
          setThirdCov(songs[0].album.cover_big);
          setFourthCov(songs[0].album.cover_big);
        }
        if (songs.length == 2) {
          setFirstCov(songs[0].album.cover_big);
          setSecondCov(songs[1].album.cover_big);
          setThirdCov(songs[0].album.cover_big);
          setFourthCov(songs[1].album.cover_big);
        }

        if (songs.length == 3) {
          setFirstCov(songs[0].album.cover_big);
          setSecondCov(songs[1].album.cover_big);
          setThirdCov(songs[2].album.cover_big);
          setFourthCov(songs[0].album.cover_big);
        }

        if (songs.length > 3) {
          setFirstCov(songs[0].album.cover_big);
          setSecondCov(songs[1].album.cover_big);
          setThirdCov(songs[2].album.cover_big);
          setFourthCov(songs[3].album.cover_big);
        }
      } else {
        console.log("pas de songs");
        setFirstCov(urlImg);
        setSecondCov(urlImg);
        setThirdCov(urlImg);
        setFourthCov(urlImg);
      }
    }
  }, [songs]);

  // Add playlist as a dependency to the useEffect hook

  const click = (e) => {
    e.preventDefault();
    console.log("click " + playlist.id);
    // setPlaylist(playlist);
    setClickedPlaylist(playlist);
    console.log(playlist.songs);
    // console.log("clickedPlaylist " + clickedPlaylist)

    setFirstBigCov(firstCov);
    setSecondBigCov(secondCov);
    setThirdBigCov(thirdCov);
    setFourthBigCov(fourthCov);
  };

  return (
    <article className="itemplaylist">
      <div className="wrapperitem">
        <h3>{name}</h3>

        <>
          <img src={firstCov} alt="" />
          <img src={secondCov} alt="" />
          <img src={thirdCov} alt="" />
          <img src={fourthCov} alt="" />
        </>

        <Link to="/playlist" onClick={click} className="itema">
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
