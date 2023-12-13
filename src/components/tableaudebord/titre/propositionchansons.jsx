import React, { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { BiHeart } from "react-icons/bi";
import fetchJsonp from "fetch-jsonp";

const PropositionChansons = ({ albumId }) => {
  const [songs, setSongs] = useState([]);
  const [album, setAlbum] = useState({});

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
        console.error("Error fetching album data:", error);
      }
    };

    
    fetchAlbumData();
  }, [albumId]);

  return (
    <>
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
            <BiHeart size={"1.2rem"} color="var(--blanc)" className="like-icon" />
            <FaPlayCircle size={"1.2rem"} color="var(--blanc)" className="add-icon" />
          </div>
        </section>
      ))}
    </>
  );
};

export default PropositionChansons;
