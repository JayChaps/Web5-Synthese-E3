// ChansonSuivante.jsx :
import React, { useContext } from "react";
import { BiHeart } from "react-icons/bi";
import { CgRemove } from "react-icons/cg";
import Coeur from "../Coeur/Coeur";
import { SongInfoContext } from "../../context/SongInfoContext";
import { PlaylistsContext } from "../../context/playlistsContext";
import { SoloPlaylistContext } from "../../context/soloPlaylistContext";

const ChansonSuivante = ({song}) => {

  const { handlePlaySong } = useContext(SongInfoContext);

  const { selectedSong, setSelectedSong, } = useContext(PlaylistsContext);

  const { currentIndex, setCurrentIndex, 
          currentSong, setCurrentSong } = useContext(SoloPlaylistContext);

  const coverImg = song.album.cover ? song.album.cover : "src/assets/img/jpg/placeholder.jpg";
  const songTitle = song.title ? song.title : "Titre inconnu";
  const artistName = song.artist.name ? song.artist.name : "Artiste inconnu";

  // const faireJouer = (laChanson) => {
  //   handlePlaySong(laChanson);
  //   setSelectedSong(laChanson);
  // };

  return (
    <article className="chansonsuivante"
      // onClick={() => faireJouer(song)}
    >
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
          <span>{artistName}</span>
        </div>
      </div>
    </article>
  );
};

export default ChansonSuivante;
