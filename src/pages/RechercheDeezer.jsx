import React, { useState, useEffect, useContext } from "react";
import fetchJsonp from "fetch-jsonp";
import LayoutAuth from "../components/LayoutAuth";
import { db } from "../config/firebase";
import { collection, setDoc, doc, arrayUnion, getDocs, addDoc } from "firebase/firestore";
import { useAudio } from "../context/audiotim";
import { SongInfoContext } from "../context/SongInfoContext";

const RechercheDeezer = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const [playlist, setPlaylist] = useState([]);
    const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [filter,setFilter] = useState("");

    const { changeSource, play, pause } = useAudio();
    const { songInfo, updateSongInfo } = useContext(SongInfoContext);

    const searchFilters = ["artist","album","track"]

    useEffect(() => {
        if (searchTerm) {
            handleSearch();
        }
    }, [searchTerm,filter]);

    const handleInputChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        const encodedSearchTerm = encodeURIComponent(searchTerm);
        const url = `https://api.deezer.com/search?q=${filter}:\"${encodedSearchTerm}\"&output=jsonp`;
        console.log(url);

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

    const handlePlaySong = (song) => {
        changeSource(song.preview); // Définit la source de la chanson
        updateSongInfo({
            title: song.title,
            artist: song.artist.name,
            coverUrl: song.album.cover
        });
    };

    useEffect(() => {
        const fetchPlaylist = async () => {
            const querySnapshot = await getDocs(collection(db, "playlists"));
            setPlaylist(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };
        fetchPlaylist();
    }, [newPlaylistName]);

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

    // Ajout d'une nouvelle playlist
    const createNewPlaylist = async () => {
        if (newPlaylistName.trim() !== '') {
            await addDoc(collection(db, "playlists"), {
                name: newPlaylistName,
                songs: []
            });
            setNewPlaylistName(''); // Reset le nom après création
        }
    };

    const filters = (e) => {
        setFilter("");
        setFilter(e.target.value);
        console.log(e.target.value);
    }

    // // Fetch the lyrics using https://www.deezer.com/ajax/gw-light.php?method=song.getLyrics&api_version=1.0&api_token=_TESoTTYiz5BU7nrOONE1DJjaoQml8.p&sng_id=[SONG_ID] :
    // const fetchLyrics = async (songId) => {
    //     const url = `https://www.deezer.com/ajax/gw-light.php?method=song.getLyrics&api_version=1.0&api_token=_TESoTTYiz5BU7nrOONE1DJjaoQml8.p&sng_id=${songId}`;
    //     console.log("url " + url);
    //     const response = await fetch(url);
    //     console.log("response " + response);
    //     const data = await response.json();
    //     console.log("data " + data);
    //     const lyrics = data.results.LYRICS_TEXT;
    //     console.log("lyrics " + lyrics);
    //     return lyrics;
    // }


    return (
        <div>
            <h1>Recherche sur Deezer</h1>
            <button value={searchFilters[0]} onClick={filters}>Artistes</button>
            <button value={searchFilters[1]} onClick={filters}>Albums</button>
            <button value={searchFilters[2]} onClick={filters}>Titres</button>

            <div>
                <input
                    type="text"
                    placeholder="Rechercher un titre/artiste/album"
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <button onClick={handleSearch}>Rechercher</button>
            </div>


            <select
                value={selectedPlaylistId}
                onChange={(e) => setSelectedPlaylistId(e.target.value)}
            >
                <option value="">Choisir une playlist</option>
                {playlist.map((playlist) => (
                    <option key={playlist.id} value={playlist.id}>{playlist.name}</option>
                ))}
            </select>

            {/* Création d'une nouvelle playlist */}
            <div>
                <input
                    type="text"
                    value={newPlaylistName}
                    onChange={(e) => setNewPlaylistName(e.target.value)}
                    placeholder="Nom de la nouvelle playlist"
                />
                <button onClick={createNewPlaylist}>Créer une playlist</button>
            </div>

            <ul>
                {searchResults.map((result, index) => (
                    <li key={index}>
                        <h2>{result.title}</h2>
                        <p>{result.artist.name}</p>
                        <img src={result.album.cover} alt={`Couverture de l'album ${result.album.title}`} />
                        <button onClick={() => addToPlaylist(result)}>Ajouter à la playlist</button>
                        {/* <button onClick={() => fetchLyrics(result.id)}>Afficher les paroles</button> */}
                        <button onClick={() => handlePlaySong(result)}>Lire</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RechercheDeezer;
