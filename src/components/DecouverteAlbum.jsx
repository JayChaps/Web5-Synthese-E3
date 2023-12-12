import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import { motion } from "framer-motion";
import { SongInfoContext } from "../context/SongInfoContext";
import { FaPlayCircle } from "react-icons/fa";

const DecouverteAlbum = () => {
  const { idAlbum } = useParams();
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState({});
  const [track, setTrack] = useState([]);
  const [contributorsByTrack, setContributorsByTrack] = useState({});
  const { handlePlaySong } = useContext(SongInfoContext);

  const titleAlbum = async () => {
    const url = `https://api.deezer.com/album/${idAlbum}/tracks?output=jsonp`;

    try {
      const resp = await fetchJsonp(url);
      const data = await resp.json();
      setSongs(data.data || []);

      let tempContributors = {};
      let tracksTemp = [];

      for (let track of data.data) {
        const response = await fetchJsonp(
          `https://api.deezer.com/track/${track.id}?output=jsonp`
        );
        const dataTrack = await response.json();
        tracksTemp.push(dataTrack || []);
        tempContributors[track.id] = dataTrack.contributors || [];
      }
      setContributorsByTrack(tempContributors);
      setTrack(tracksTemp);
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  const infoAlbum = async () => {
    const url = `https://api.deezer.com/album/${idAlbum}?output=jsonp`;
    try {
      const resp = await fetchJsonp(url);
      const data = await resp.json();
      setAlbum(data || {});
    } catch (error) {
      console.error("Erreur lors de la recherche:", error);
    }
  };

  useEffect(() => {
    infoAlbum();
    titleAlbum();
  }, [idAlbum]);

  return (
    <motion.div className="decouverte-album" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="album-info" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        {album.cover && (
          <motion.img src={album.cover_big} alt="image de l'album" className="album-cover" />
        )}
        <div className="album-details">
          <motion.h1 className="album-title-big">{album.title}</motion.h1>
          {album.artist && songs.length > 0 && (
            <div className="decouverte-artist">
              <Link to={`/artist/${songs[0].artist.id}`}>
                <div>
                  <motion.img src={album.artist.picture_small} alt={album.artist.name} className="artiste-profil-img" />
                  <motion.h1 className="artiste-name">{songs[0].artist.name}</motion.h1>
                </div>
              </Link>
            </div>
          )}
        </div>
      </motion.div>

      <motion.div initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.5 }}>
        <h1 className="title-chansons">Titres:</h1>
        <motion.div className="decouverte-songs" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 1 }}>
          {songs.length > 0 &&
            songs.map((song, id) => (
              <motion.div className="song" key={id} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 1 }} >
                <div className="list">
                  <h2 className="titre-chanson-position">{song.track_position}</h2>
                </div>
                <div className="songInfos">
                  <h4 className="titre-chanson-speciale">{song.title}</h4>
                  <div className="nom">
                    {contributorsByTrack[song.id] &&
                      contributorsByTrack[song.id] && (
                        <>
                          {contributorsByTrack[song.id].map(
                            (contributor, contributorId) => (
                              <div className="feature-div" key={contributorId}>
                                <Link to={`/artist/${contributor.id}`}>
                                  <h2 className="feature">{contributor.name},</h2>
                                </Link>
                              </div>
                            )
                          )}
                          <FaPlayCircle
                            size={"3rem"}
                            color="var(--blanc)"
                            onClick={() => handlePlaySong(track[id])}
                            className="bouton-play-chanson-album"
                         />
                        </>
                      )}
                  </div>
                </div>
              </motion.div>
            ))}
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default DecouverteAlbum;
