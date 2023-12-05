// playlistsContext.jsx :
import React, { createContext, useEffect, useState } from "react";
import { auth, db } from "../config/firebase";
import { collection, setDoc, doc, arrayUnion, getDocs, addDoc, getDoc, deleteDoc, updateDoc } from "firebase/firestore";

// Créer le contexte
const PlaylistsContext = createContext();

const PlaylistsProvider = ({ children }) => {

    const [playlist, setPlaylist] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [selectedPlaylistId, setSelectedPlaylistId] = useState("");
    const [selectedSong, setSelectedSong] = useState("");

    // Récupération des playlists
    const fetchPlaylists = async () => {

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
    };

    // Récupération d'une playlist
    const fetchPlaylist = async () => {
        const querySnapshot = await getDocs(collection(db, "playlists"));
        setPlaylist(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
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
            setNewPlaylistName(''); // Reset le nom après création
        }
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
    };

    // Créer une nouvelle playlist ET ajouter une chanson
    const createNewPlaylistAndAddSong = async (name, song) => {
        if (newPlaylistName.trim() !== '') {
            const userId = auth.currentUser.uid;
            // Création de la nouvelle playlist
            const docRef = await addDoc(collection(db, "playlists"), {
                name: name,
                songs: [song],
                createdBy: userId,
            });

            // Mise à jour du document de l'utilisateur pour inclure l'ID de la nouvelle playlist
            const userRef = doc(db, "users", userId);
            await updateDoc(userRef, {
                playlistsIds: arrayUnion(docRef.id)
            });

            setSelectedPlaylistId(docRef.id); // Sélectionne la nouvelle playlist
            setNewPlaylistName(''); // Reset le nom après création
            console.log("Playlist created and song added!");
        }
    };


    // Suppression d'une playlist
    const deletePlaylist = async (playlistId) => {
        await deleteDoc(doc(db, "playlists", playlistId));
        // Mettre à jour l'état après suppression
        setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
    };

    return (
        <PlaylistsContext.Provider value={{ createNewPlaylist, deletePlaylist, 
                                            addToPlaylist, removeSongFromPlaylist, 
                                            newPlaylistName, setNewPlaylistName, 
                                            selectedPlaylistId, setSelectedPlaylistId,
                                            fetchPlaylists, fetchPlaylist, 
                                            playlists, setPlaylists, 
                                            playlist, setPlaylist,
                                            selectedSong, setSelectedSong,
                                            createNewPlaylistAndAddSong }}>
            {children}
        </PlaylistsContext.Provider>
    );
};

export { PlaylistsContext, PlaylistsProvider };