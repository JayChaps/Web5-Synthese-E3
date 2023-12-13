// playlistsContext.jsx :
import React, { createContext, useCallback, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, setDoc, doc, arrayUnion, getDocs, addDoc, getDoc, deleteDoc, updateDoc, arrayRemove } from "firebase/firestore";

// Créer le contexte
const PlaylistsContext = createContext();

const PlaylistsProvider = ({ children }) => {

    const [playlist, setPlaylist] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
    const [selectedPlaylist, setSelectedPlaylist] = useState([]);
    const [selectedSong, setSelectedSong] = useState("");

    const [clickedPlaylist, setClickedPlaylist] = useState([]);

    // const [shouldFetchPlaylist, setShouldFetchPlaylist] = useState(false);
    // const [shouldFetchPlaylists, setShouldFetchPlaylists] = useState(false);

    // Récupération des playlists
    const fetchPlaylists = useCallback (async () => {

        // Récupération du uuid 
        const userId = auth.currentUser.uid;

        // Obtenir le document de l'utilisateur
        const userRef = doc(db, "users", userId);
        const userSnapshot = await getDoc(userRef);

        if (userSnapshot.exists()) {
            const userData = userSnapshot.data();
            const userPlaylistsIds = userData.playlistsIds || [];

            // Récupérer les playlists correspondant aux IDs
            const playlistsPromises = userPlaylistsIds.map(playlistId => {
                const playlistRef = doc(db, "playlists", playlistId);
                return getDoc(playlistRef);
            });

            const playlistsSnapshot = await Promise.all(playlistsPromises);
            const userPlaylists = playlistsSnapshot.map(snap => ({
                id: snap.id,
                ...snap.data()
            }));
            
            setPlaylists(userPlaylists);
        }
        // const querySnapshot = await getDocs(collection(db, "playlists"));
        // setPlaylists(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        console.log("fetchPlaylists() done");
    }, []);

    // Récupération d'une playlist
    const fetchPlaylist = async (targetId) => {
        const querySnapshot = await getDoc(doc(db, "playlists", targetId));
        setPlaylist(querySnapshot.data());

        console.log("fetchPlaylist() done");
    };
    
    // Ajout d'une nouvelle playlist
    const createNewPlaylist = async (name) => {
        if (newPlaylistName.trim() !== '') {
            const userId = auth.currentUser.uid;
            console.log("userId: "+userId);
            // Création de la nouvelle playlist
            const docRef = await addDoc(collection(db, "playlists"), {
                name: name,
                songs: [],
                createdBy: userId,
            });

            // Mise à jour du document de l'utilisateur pour inclure l'ID de la nouvelle playlist
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
                playlistsIds: arrayUnion(docRef.id)
            });

            setSelectedPlaylistId(docRef.id); // Sélectionne la nouvelle playlist
            setSelectedPlaylist(docRef); // Sélectionne la nouvelle playlist
            setNewPlaylistName(''); // Reset le nom après création
        }

        console.log("createNewPlaylist() done");
    };

    // Ajout d'une chanson à une playlist
    const addToPlaylist = async (song) => {
        console.log(selectedPlaylistId, song);
        if (selectedPlaylistId && selectedPlaylistId.trim() !== '') {
            const playlistRef = doc(db, "playlists", selectedPlaylistId);

            const songToAdd = song;
            console.log("SongToAdd: "+songToAdd);
            // const songToAdd = selectedSong;

            await setDoc(playlistRef, {
                songs: arrayUnion(songToAdd)
            }, { merge: true });
            console.log("Document successfully updated!");
        } 
        else {
            console.error("Error updating document");
        }

        console.log("addToPlaylist() done");
    }

    // Suppression d'une chanson d'une playlist
    const removeSongFromPlaylist = async (playlistId, song) => {
        const playlistRef = doc(db, "playlists", playlistId);
        
        // Obtenir la playlist correspondante
        const playlistSnapshot = await getDoc(playlistRef);
        if (playlistSnapshot.exists()) {
            const playlistData = playlistSnapshot.data();
            console.log("Bonjour"+playlistData);

            // Filtrer les chansons pour exclure celle que vous souhaitez supprimer
            const newSongs = (playlistData.songs || []).filter((s) => s.id !== song.id);

            // Mettre à jour la playlist avec les nouvelles chansons
            await updateDoc(playlistRef, {
                songs: newSongs
            });

            // Mettre à jour l'état après suppression
            setPlaylists(playlists.map(playlist => {
                if (playlist.id === playlistId) {
                    return {
                        ...playlist,
                        songs: newSongs
                    };
                }
                return playlist;
            }));
        }

        console.log("removeSongFromPlaylist() done");
    };

    // Créer une nouvelle playlist ET ajouter une chanson
    const createNewPlaylistAndAddSong = async (name, song) => {
        if (newPlaylistName.trim() !== '') {
            const userId = auth.currentUser.uid;
            const userName = auth.currentUser.displayName;
            // Création de la nouvelle playlist
            const docRef = await addDoc(collection(db, "playlists"), {
                name: name,
                songs: [song],
                createdBy: userId,
                creatorName: userName,
            });

            // Mise à jour du document de l'utilisateur pour inclure l'ID de la nouvelle playlist
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
                playlistsIds: arrayUnion(docRef.id)
            });

            setSelectedPlaylistId(docRef.id); // Sélectionne la nouvelle playlist
            setSelectedPlaylist(docRef); // Sélectionne la nouvelle playlist
            setNewPlaylistName(''); // Reset le nom après création
            console.log("Playlist created and song added!");
        }

        console.log("createNewPlaylistAndAddSong() done");
    };


    // Suppression d'une playlist
    const deletePlaylist = async (playlistId) => {

        const userId = auth.currentUser.uid;

        // Suppression de la playlist de la collection 'playlists'
        await deleteDoc(doc(db, "playlists", playlistId));

        // Suppression de l'ID de la playlist du document de l'utilisateur
        const userRef = doc(db, "users", userId);
        await updateDoc(userRef, {
            playlistsIds: arrayRemove(playlistId)
        });

        // Mettre à jour l'état après suppression
        setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));

        console.log("deletePlaylist() done");
    };

    return (
        <PlaylistsContext.Provider value={{ createNewPlaylist, deletePlaylist, 
                                            addToPlaylist, removeSongFromPlaylist, 
                                            newPlaylistName, setNewPlaylistName, 
                                            selectedPlaylistId, setSelectedPlaylistId,
                                            selectedPlaylist, setSelectedPlaylist,
                                            fetchPlaylists, fetchPlaylist, 
                                            playlists, setPlaylists, 
                                            playlist, setPlaylist,
                                            selectedSong, setSelectedSong,
                                            createNewPlaylistAndAddSong,
                                            clickedPlaylist, setClickedPlaylist }}>
            {children}
        </PlaylistsContext.Provider>
    );
};

export { PlaylistsContext, PlaylistsProvider };