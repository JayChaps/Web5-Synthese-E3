// soloPlaylistContext.jsx :
import React, { createContext, useContext, useEffect, useState } from "react";
import { PlaylistsContext } from "./playlistsContext";
import { SongInfoContext } from "./SongInfoContext";

const SoloPlaylistContext = createContext();

const SoloPlaylistProvider = ({ children }) => {

    const { handlePlaySong } = useContext(SongInfoContext);
    const { createNewPlaylist, deletePlaylist,
        addToPlaylist, removeSongFromPlaylist,
        newPlaylistName, setNewPlaylistName,
        selectedPlaylistId, setSelectedPlaylistId,
        selectedPlaylist, setSelectedPlaylist,
        fetchPlaylists, fetchPlaylist,
        playlists, setPlaylists,
        playlist, setPlaylist,
        selectedSong, setSelectedSong,
        createNewPlaylistAndAddSong,
        clickedPlaylist, setClickedPlaylist } = useContext(PlaylistsContext);

    // Make an array of the song in the clickedPlaylist/selectedPlaylist/whatever
    // in order to be able to play them as a queue

    const [previousSong, setPreviousSong] = useState({});
    const [currentSong, setCurrentSong] = useState({});
    const [nextSong, setNextSong] = useState({});

    const [songsInPlaylist, setSongsInPlaylist] = useState([]); // Array of songs in the playlist
    const [currentIndex, setCurrentIndex] = useState(0); // Index of the current song in the array

    useEffect(() => {
        // Update songsInPlaylist based on the clickedPlaylist
        setSongsInPlaylist(clickedPlaylist.songs);
        console.log("setSongsInPlaylist", clickedPlaylist.songs);
    }, [clickedPlaylist]);

    const handleAllThreeSongs = (song, index) => {
        // Sets the previous, current and next songs
        setCurrentSong(song); 
        setCurrentIndex(index);
        setPreviousSong(index > 0 ? songsInPlaylist[index - 1] : songsInPlaylist[songsInPlaylist.length - 1]);
        setNextSong(index < songsInPlaylist.length - 1 ? songsInPlaylist[index + 1] : songsInPlaylist[0]);

        console.log("previousSong", previousSong);
        console.log("currentSong", currentSong);
        console.log("nextSong", nextSong);
    };

    const handleNextSong = () => {
        if (currentIndex < songsInPlaylist.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
    };

    const handlePreviousSong = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    return (
        <SoloPlaylistContext.Provider
            value={{ previousSong, setPreviousSong, 
                    currentSong, setCurrentSong, 
                    nextSong, setNextSong,
                    handleNextSong, handlePreviousSong,
                    handleAllThreeSongs }}>
            {children}
        </SoloPlaylistContext.Provider>
    );
};

export { SoloPlaylistContext, SoloPlaylistProvider };
