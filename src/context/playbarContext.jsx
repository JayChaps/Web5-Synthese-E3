// playbarContext.jsx :
import React, { createContext, useState, useEffect } from "react";

// Créer le contexte
const PlaybarContext = createContext();

const PlaybarProvider = ({ children }) => {

    // const [isFull, setIsFull] = useState(false);
    const [isFullbarOpen, setIsFullbarOpen] = useState(false);


    return (
        // <PlaybarContext.Provider value={{ isFull, setIsFull }}>
        <PlaybarContext.Provider value={{ isFullbarOpen, setIsFullbarOpen }}>
            {children}
        </PlaybarContext.Provider>
    )
};

export { PlaybarContext, PlaybarProvider };