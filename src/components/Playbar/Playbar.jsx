// Playbar.jsx :
import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { FaPlayCircle } from "react-icons/fa";
import { FaPauseCircle } from "react-icons/fa";
import { BiSolidSkipNextCircle } from "react-icons/bi";
import { BsShuffle } from "react-icons/bs";
import { RxLoop } from "react-icons/rx";
import { CgAdd } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";
import { FaArrowCircleUp } from "react-icons/fa";
import fetchJsonp from "fetch-jsonp";
import {
  IoVolumeOff,
  IoVolumeLow,
  IoVolumeMedium,
  IoVolumeHigh,
  IoVolumeMute,
} from "react-icons/io5";
import { motion, useAnimation } from "framer-motion";

import { useAudio, useAudioProgress } from "../../context/audiotim";
import { SongInfoContext } from "../../context/SongInfoContext";
import { FavoritesContext } from "../../context/FavoritesContext";
import PlaybarFull from "./PlaybarFull";
import { PlaylistsContext } from "../../context/playlistsContext";
import { PlaybarContext } from "../../context/playbarContext";
import Coeur from "../Coeur/Coeur";
import TeteDeLecturePlaybar from "./TeteDeLecturePlaybar";
import PlaylistSelector from "../RechercheDeezer/PlaylistSelector";
import { SoloPlaylistContext } from "../../context/soloPlaylistContext";


const Playbar = () => {
  const { isPaused, changeSource, isReady, togglePause, volume, changeVolume } =
    useAudio();

  const [selectorActif, setSelectorActif] = useState(false);
  // const [isFullbarOpen, setIsFullbarOpen] = useState(false);

  const { isFullbarOpen, setIsFullbarOpen } = useContext(PlaybarContext);

  const [isMuted, setIsMuted] = useState(false);
  const [lastVolume, setLastVolume] = useState(0.5);
  const [track, setTrack] = useState([]);

  const { songInfo, updateSongInfo, handlePlaySong } = useContext(SongInfoContext);
  const { selectedSong, setSelectedSong } = useContext(PlaylistsContext);
  const controls = useAnimation();

  const { currentSong, previousSong, nextSong,
    handleNextSong, handlePreviousSong } = useContext(SoloPlaylistContext);


  const { favorites, setFavorites, addToFavorites } = useContext(FavoritesContext);


  useEffect(() => {
    controls.start({ opacity: 1, y: 0, transition: { duration: 1 } });
  }, [controls]);

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

  const handlePlayPause = () => {
    togglePause();
  };

  // const { addToFavorites } = useFavorites();

  const handleAddToFavorites = () => {
    console.log("Song added to favorites: ", songInfo.id);
    addToFavorites(songInfo);
  };

  const handleClick = (e) => {

      setIsFullbarOpen(!isFullbarOpen);

  };

  const handleVolume = (e) => {
    changeVolume(e.target.value);
    setLastVolume(e.target.value);
    if (e.target.value > 0 && isMuted) {
      setIsMuted(false);
    }
  };

  const handleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      changeVolume(lastVolume);
    } else {
      setIsMuted(true);
      setLastVolume(volume);
      changeVolume(0);
    }
  };

  const urlImg = "https://i.imgur.com/xaJK7nC.jpg";

  useEffect(() => {
    if (songInfo.id !== "") {
      trackSongInfo();
    }
  }, [songInfo]);

  useEffect(() => {
    if (currentSong && currentSong.id) {
      handlePlaySong(currentSong);
    }
  }, [currentSong]);


  return (
    <>
      {selectorActif && <PlaylistSelector setActif={setSelectorActif} />}
      <motion.aside
        className="playbar"
        initial={{ opacity: 0, y: "100%" }}
        animate={controls}
      >
        {isFullbarOpen && (
          <>
            <PlaybarFull>
              <div className="outer" onClick={() => setIsFullbarOpen(false)}>
                <div className="inner">
                  <label>Retour</label>
                </div>
              </div>
            </PlaybarFull>
            <div className="cover">
              <img src={track.album ? track.album.cover_xl : urlImg} alt="" />
            </div>
          </>
        )}

        <div className="playbar__inner">
          {
            !isFullbarOpen &&
            <FaArrowCircleUp
            className="arrowPlaybar"
            size={"3rem"}
            color="var(--noir)"
            onClick={() => setIsFullbarOpen(!isFullbarOpen)}
            />
          }
          <section className="playbar__inner__left">
            <div className="iconeShuffleLoop">
              <BsShuffle size={"2rem"} color="var(--noir)" />
            </div>
            <div className="iconeShuffleLoop">
              <RxLoop size={"2rem"} color="var(--noir)" />
            </div>

            <div className="playbar__inner__left__cover">
              <img
                src={songInfo.coverUrl ? songInfo.coverUrl : urlImg}
                alt="cover"
              />
            </div>
            <div className="playbar__inner__left__info">
              {track && track.album && track.artist && (
                <>
                  <Link to={`/album/${track.album.id}`}>
                    <span>{songInfo.title}</span>
                  </Link>
                  <Link to={`/artist/${track.artist.id}`}>
                    <span>{songInfo.artist}</span>
                  </Link>
                </>
              )}
            </div>
          </section>
          <section className="playbar__inner__center">
            <BiSolidSkipNextCircle 
              size={"3rem"} 
              color="var(--blanc)" 
              onClick={handlePreviousSong}
            />

            {isPaused ? (
              <>
                <FaPlayCircle
                  onClick={handlePlayPause}
                  size={"4rem"}
                  color="var(--blanc)"
                />
              </>
            ) : (
              <>
                <FaPauseCircle
                  onClick={handlePlayPause}
                  size={"4rem"}
                  color="var(--blanc)"
                />
              </>
            )}
            <BiSolidSkipNextCircle 
              size={"3rem"} 
              color="var(--blanc)" 
              onClick={handleNextSong}
            />
          </section>
          <section className="playbar__inner__right">
            <Coeur 
              songToAdd = {track}
            />
            <CgAdd
              size={"3.5rem"}
              color="var(--blanc)"
              onClick={() => setSelectorActif(!selectorActif)}
            />

            {isMuted ? (
              <IoVolumeMute
                size={"3.5rem"}
                color="var(--blanc)"
                onClick={handleMute}
              />
            ) : volume <= 0 && !isMuted ? (
              <IoVolumeOff
                size={"3.5rem"}
                color="var(--blanc)"
                onClick={handleMute}
              />
            ) : volume < 0.5 && !isMuted ? (
              <IoVolumeLow
                size={"3.5rem"}
                color="var(--blanc)"
                onClick={handleMute}
              />
            ) : volume < 0.75 && !isMuted ? (
              <IoVolumeMedium
                size={"3.5rem"}
                color="var(--blanc)"
                onClick={handleMute}
              />
            ) : (
              volume >= 0.75 && (
                <IoVolumeHigh
                  size={"3.5rem"}
                  color="var(--blanc)"
                  onClick={handleMute}
                />
              )
            )}
            <div className="volume">
              <div
                className="progress"
                style={{
                  width: `calc(${volume * 100}% + ${15 - volume * 15}px)`,
                }}
              ></div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={volume}
                onChange={handleVolume}
                disabled={!isReady}
              />
            </div>
          </section>

          <TeteDeLecturePlaybar />
        </div>
      </motion.aside>
    </>
  );
};

export default Playbar;
