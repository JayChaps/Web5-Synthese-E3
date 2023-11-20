// SongInfoContext.js :
import React, { useState, createContext } from 'react';

// Créer le contexte
const SongInfoContext = createContext();

const SongInfoProvider = ({ children }) => {
    const [songInfo, setSongInfo] = useState({
        title: '',
        artist: '',
        coverUrl: ''
    });

    // Fonction pour mettre à jour les informations de la chanson
    const updateSongInfo = (info) => {
        setSongInfo(info);
    };

    return (
        <SongInfoContext.Provider value={{ songInfo, updateSongInfo }}>
            {children}
        </SongInfoContext.Provider>
    );
};

export { SongInfoContext, SongInfoProvider };