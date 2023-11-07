import React, { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import { db } from "../config/firebase";
import { collection, setDoc, doc, arrayUnion } from "firebase/firestore";

const RechercheDeezer = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            handleSearch();
        }
    }, [searchTerm]);

    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const url = `https://api.deezer.com/search?q=${encodedSearchTerm}&output=jsonp`;

        fetchJsonp(url)
            .then(response => response.json())
            .then(data => {
                setSearchResults(data.data || []);
                console.log(data.data);
            })
            .catch(error => {
                console.error("Erreur lors de la recherche:", error);
            });
    };


    const addToPlaylist = async (song) => {
        try {
            const playlistRef = doc(db, "playlists", "playlist3");

            const songToAdd = {
                id: song.id,
                title: song.title,
            };

            await setDoc(playlistRef, {
                songs: arrayUnion(songToAdd)
                // songs: arrayUnion(song)
            });
            console.log("Document successfully updated!");
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    }

    return (
        <div>
            <h1>Recherche sur Deezer</h1>
            <input
                type="text"
                placeholder="Rechercher un titre/artiste/album"
                value={searchTerm}
                onChange={handleInputChange}
            />
            <button onClick={handleSearch}>Rechercher</button>

            <ul>
                {searchResults.map((result, index) => (
                    <li key={index}>
                        <h2>{result.title}</h2>
                        <p>{result.artist.name}</p>
                        <img src={result.album.cover} alt={`Couverture de l'album ${result.album.title}`} />
                        <button onClick={() => addToPlaylist(result)}>Ajouter à la playlist</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RechercheDeezer;
