import React, { useEffect, useState, useContext } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import fetchJsonp from "fetch-jsonp";
import Coeur from "../../Coeur/Coeur";
import { Link } from "react-router-dom";
import { SongInfoContext } from "../../../context/SongInfoContext";

const PropositionChansons = ({ albumId }) => {
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState({});
  const { handlePlaySong } = useContext(SongInfoContext);

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const url = `https://api.deezer.com/album/${albumId}/tracks?output=jsonp`;
        const resp = await fetchJsonp(url);
        const data = await resp.json();
        setSongs(data.data || []);

        const albumResp = await fetchJsonp(`https://api.deezer.com/album/${albumId}?output=jsonp`);
        const albumData = await albumResp.json();
        setAlbum(albumData || {});
      } catch (error) {
        console.error("Erreur info album:", error);
      }
    };

    fetchAlbumData();
  }, [albumId]);

  return (
    <section className="prop">
      {songs.map((song, index) => (
        <section key={index} className="propositionchansons">
          <div className="left">
            {album.cover && <img src={album.cover_big} alt={`Song Image ${index}`} />}
          </div>
          <div className="center">
            <h2 className="song-name">{song.title}</h2>
            <p className="artist-name">{song.artist.name}</p>
          </div>
          <div className="right">
            <Coeur />
            <Link to={`/artist/${song.artist.id}`}>
              <FaPlayCircle
                size={"1.2rem"}
                color="var(--blanc)"
                className="add-icon"
                onClick={() => handlePlaySong(song)}
              />
            </Link>
          </div>
        </section>
      ))}
    </section>
  );
};

export default PropositionChansons;
