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
        let newIndex = currentIndex + 1;
        if (newIndex >= songsInPlaylist.length) {
            newIndex = 0; // Loop back to the start if at the end
        }
        setCurrentIndex(newIndex);
        setCurrentSong(songsInPlaylist[newIndex]);
    };
    
    const handlePreviousSong = () => {
        let newIndex = currentIndex - 1;
        if (newIndex < 0) {
            newIndex = songsInPlaylist.length - 1; // Loop back to the end if at the start
        }
        setCurrentIndex(newIndex);
        setCurrentSong(songsInPlaylist[newIndex]);
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
