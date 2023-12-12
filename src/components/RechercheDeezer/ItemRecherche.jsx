import React, { useContext, useEffect, useState } from "react";
import { CgAdd } from "react-icons/cg";
import { FaPlayCircle } from "react-icons/fa";
import { Link } from "react-router-dom";
import PlaylistSelector from "./PlaylistSelector";
import { SongInfoContext } from "../../context/SongInfoContext";
import { PlaylistsContext } from "../../context/playlistsContext";

const ItemRecherche = ({ result }) => {
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
    playlists,
    setPlaylists,
    playlist,
    setPlaylist,
    selectedSong,
    setSelectedSong,
    createNewPlaylistAndAddSong,
  } = useContext(PlaylistsContext);

  const [shouldFetchPlaylist, setShouldFetchPlaylist] = useState(false);
  const [shouldFetchPlaylists, setShouldFetchPlaylists] = useState(false);
  const { handlePlaySong } = useContext(SongInfoContext);
  const [selectorActif, setSelectorActif] = useState(false);
  const handlePlaylistSelector = (song) => {
    setShouldFetchPlaylist(true);
    setSelectorActif(!selectorActif);
    if (!selectorActif) {
      setSelectedSong(song);
    }
  };

  useEffect(() => {
    if (shouldFetchPlaylists) {
      fetchPlaylists();
      setShouldFetchPlaylists(false);
      console.log("useEffect fetchPlaylist");
    }
    // }, [newPlaylistName, playlists, createNewPlaylist]);
  }, [shouldFetchPlaylists]);
  return (
    <li>
      <h4 className="titrestroke">{result.title}</h4>
      <div className="infos">
        <h2>{result.title}</h2>
        <Link to={`/artist/${result.artist.id}`}>
          <p>{result.artist.name}</p>
        </Link>
      </div>
      <div className="imgrecherche">
        <img
          onClick={() => handlePlaySong(result)}
          src={result.album.cover}
          alt={`Couverture de l'album ${result.album.title}`}
        />
      </div>
      <div className="boutons">
        <CgAdd
          size={"2rem"}
          color="var(--blanc)"
          onClick={() => handlePlaylistSelector(result)}
        />
        <FaPlayCircle
          size={"2rem"}
          color="var(--blanc)"
          onClick={() => handlePlaySong(result)}
        />
      </div>
      {selectorActif && (
        <PlaylistSelector
          estActif={selectorActif}
          setActif={setSelectorActif}
          theSong={result}
        />
      )}
    </li>
  );
};

export default ItemRecherche;
