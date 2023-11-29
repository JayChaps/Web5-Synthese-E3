// SongInfoContext.js :
import React, { useState, createContext } from 'react';
import { useAudio } from './audiotim';

// Créer le contexte
const SongInfoContext = createContext();

export const useSongInfo = () => useContext(SongInfoContext);

const SongInfoProvider = ({ children }) => {
    const [songInfo, setSongInfo] = useState({
        title: '',
        artist: '',
        coverUrl: ''
    });
    const { changeSource } = useAudio();

    // Fonction pour mettre à jour les informations de la chanson
    const updateSongInfo = (info) => {
        setSongInfo(info);
    };

    // Fonction pour jouer une chanson
    const handlePlaySong = (song) => {
        console.log(song);
        changeSource(song.preview); // Définit la source de la chanson
        updateSongInfo({
            title: song.title,
            artist: song.artist.name,
            coverUrl: song.album.cover
        });
    };

    return (
        <SongInfoContext.Provider value={{ songInfo, updateSongInfo, handlePlaySong }}>
            {children}
        </SongInfoContext.Provider>
    );
};

export { SongInfoContext, SongInfoProvider };