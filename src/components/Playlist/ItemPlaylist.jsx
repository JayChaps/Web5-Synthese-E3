
import React, { useContext, useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CgRemove } from "react-icons/cg";
import { PlaylistsContext } from "../../context/playlistsContext";



const ItemPlaylist = ({ playlist, name, songs }) => {
  const urlImg = "/src/assets/img/jpg/placeholder.jpg";

  const [ laFirstSong, setLaFirstSong ] = useState({});
  const [ laSecondSong, setLaSecondSong ] = useState({});
  const [ laThirdSong, setLaThirdSong ] = useState({});
  const [ laFourthSong, setLaFourthSong ] = useState({});

  const [ firstCov, setFirstCov ] = useState("");
  const [ secondCov, setSecondCov ] = useState("");
  const [ thirdCov, setThirdCov ] = useState("");
  const [ fourthCov, setFourthCov ] = useState("");


  const [covers, setCovers] = useState([]);
  const theSongsArray = songs ;

  useEffect(() => {
    if (theSongsArray) {
      setLaFirstSong(theSongsArray[0]);
      setLaSecondSong(theSongsArray[1]);
      setLaThirdSong(theSongsArray[2]);
      setLaFourthSong(theSongsArray[3]);
    }
  }, [playlist]); // Add playlist as a dependency to the useEffect hook

  const click = (e) => {
    e.preventDefault();
    setClickedPlaylist(playlist);
  };

  return (
    <article className="itemplaylist">
      <div className="wrapperitem">
        <h3>{name}</h3>
        {covers.map((cover, index) => (
          <img key={index} src={cover} alt={`Cover ${index + 1}`} />
        ))}
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
