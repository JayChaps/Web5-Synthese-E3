// SongInfoContext.js :
import React, { useState, createContext, useEffect } from 'react';
import { useAudio } from './audiotim';

// Créer le contexte
const SongInfoContext = createContext();

export const useSongInfo = () => useContext(SongInfoContext);

const SongInfoProvider = ({ children }) => {
    const [songInfo, setSongInfo] = useState({
        id: '',
        title: '',
        artist: '',
        coverUrl: '',
    });
    const { changeSource } = useAudio();

    // Fonction pour mettre à jour les informations de la chanson
    const updateSongInfo = (info) => {
        setSongInfo(info);
    };

    
    // Fonction pour jouer une chanson
    const handlePlaySong = (song) => {

        // Logs whatever called this function
        console.log('handlePlaySong called');
        
        if (songInfo.id !== song.id) {
            console.log(song);
            changeSource(song.preview); // Définit la source de la chanson
            updateSongInfo({
                id: song.id,
                title: song.title,
                artist: song.artist.name,
                coverUrl: song.album.cover,
            });
        }

    };

    // Fonction pour jouer une chanson mais dans le recherche maybe
    const handlePlaySongRecherche = (song) => {
        // if (songInfo.id !== song.id) {
            console.log(song);
            changeSource(song.preview); // Définit la source de la chanson
            updateSongInfo({
                id: song.id,
                title: song.title,
                artist: song.artist.name,
                coverUrl: song.album.cover,
            });
        // }
    };

    return (
        <SongInfoContext.Provider value={{ songInfo, updateSongInfo, handlePlaySong, handlePlaySongRecherche }}>
            {children}
        </SongInfoContext.Provider>
    );
};

export { SongInfoContext, SongInfoProvider };