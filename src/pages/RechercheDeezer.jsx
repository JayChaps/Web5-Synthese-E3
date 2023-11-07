import React, { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import LayoutAuth from "../components/LayoutAuth";

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
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RechercheDeezer;
