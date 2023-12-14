// ChansonSuivante.jsx :
import React, { useContext, useEffect, useState } from "react";
import { BiHeart } from "react-icons/bi";
import { CgRemove } from "react-icons/cg";
import Coeur from "../Coeur/Coeur";
import { FaPlayCircle } from "react-icons/fa";
import { SongInfoContext } from "../../context/SongInfoContext";
import fetchJsonp from "fetch-jsonp";
import { Link } from "react-router-dom";
import { PlaybarContext } from "../../context/playbarContext";

// <CgRemove size={"2rem"} color="var(--noir)" />
const ChansonSuivante = ({ song }) => {
  const { songInfo, updateSongInfo } = useContext(SongInfoContext);
  const [track, setTrack] = useState([]);
  const { isFullbarOpen, setIsFullbarOpen } = useContext(PlaybarContext);
  const trackSongInfo = () => {
    if (songInfo !== "") {
      const url = `https://api.deezer.com/track/${songInfo.id}?&output=jsonp`;

      fetchJsonp(url)
        .then((resp) => resp.json())
        .then((data) => {
          setTrack(data || []);
        })
        .catch((error) => {
          console.error("Erreur lors de la recherche:", error);
        });
    }
  };

  useEffect(() => {
    if (songInfo.id !== "") {
      trackSongInfo();
    }
  }, [songInfo]);

  const coverImg = song.album.cover
    ? song.album.cover
    : "src/assets/img/jpg/placeholder.jpg";
  const songTitle = song.title ? song.title : "Titre inconnu";
  const artistName = song.artist.name ? song.artist.name : "Artiste inconnu";

  const toggleBar = () => {
    if (isFullbarOpen) {
      setIsFullbarOpen(false);
    }
  };

  return (
    <article className="chansonsuivante">
      <div className="chansonsuivante__inner">
        <div className="chansonsuivante__cover">
          <img src={coverImg} alt="cover" />
        </div>
        <div className="chansonsuivante__icones">
          <Coeur />
          <CgRemove size={"2rem"} color="var(--blanc)" />
        </div>

        <div className="chansonsuivante__info">
          <span>{songTitle}</span>
          {track.artist && (
            <Link to={`/artist/${track.artist.id}`} onClick={toggleBar}>
              <span>{artistName}</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  );
};

export default ChansonSuivante;
