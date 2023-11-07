import React, { useState, useEffect } from "react";
import fetchJsonp from "fetch-jsonp";
import { db } from "../config/firebase";
import { collection, setDoc, doc, arrayUnion, getDocs } from "firebase/firestore";

const RechercheDeezer = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [playlist, setPlaylist] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState("");

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


    useEffect(() => {
        const fetchPlaylist = async () => {
            const querySnapshot = await getDocs(collection(db, "playlists"));
            setPlaylist(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchPlaylist();
    }, []);

    // const addToPlaylist = async (song) => {
    //     try {
    //         const playlistRef = doc(db, "playlists", "playlist3");

    //         const songToAdd = { id: song.id, title: song.title, };

    //         // await setDoc(playlistRef, {
    //         //     songs: arrayUnion(song)
    //         // });
    //         await setDoc(playlistRef, {
    //             songs: arrayUnion(songToAdd)
    //         }, { merge: true });
    //         console.log("Document successfully updated!");
    //     } catch (e) {
    //         console.error("Error updating document: ", e);
    //     }
    // }

    const addToPlaylist = async (song) => {
        if (selectedPlaylistId) {
            const playlistRef = doc(db, "playlists", selectedPlaylistId);

            const songToAdd = { id: song.id, title: song.title, };

            await setDoc(playlistRef, {
                songs: arrayUnion(songToAdd)
            }, { merge: true });
            console.log("Document successfully updated!");
        } else {
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


            <select 
                value={selectedPlaylistId}
                onChange={(e) => setSelectedPlaylistId(e.target.value)}
            >
                <option value="">Choisir une playlist</option>
                {playlist.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                ))}
            </select>



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
