// soloPlaylistContext.jsx :
import React, { createContext, useState } from "react";

const SoloPlaylistContext = createContext();

const SoloPlaylistProvider = ({ children }) => {

    const [ firstCovCon, setFirstCovCon ] = useState("");
    const [ secondCovCon, setSecondCovCon ] = useState("");
    const [ thirdCovCon, setThirdCovCon ] = useState("");
    const [ fourthCovCon, setFourthCovCon ] = useState("");


}

