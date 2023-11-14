import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, updateDoc, deleteField, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const Playlist = () => {
    const [playlists, setPlaylists] = useState([]);

    // Récupération des playlists
    useEffect(() => {
        const fetchPlaylists = async () => {
            const querySnapshot = await getDocs(collection(db, "playlists"));
            setPlaylists(querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        };

        fetchPlaylists();
    }, []);

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

    // Suppression d'une playlist
    const deletePlaylist = async (playlistId) => {
        await deleteDoc(doc(db, "playlists", playlistId));
        // Mettre à jour l'état après suppression
        setPlaylists(playlists.filter((playlist) => playlist.id !== playlistId));
    };

    // Gérer le déplacement des chansons
    const onDragEnd = async (result) => {
        const { source, destination } = result;

        if (!destination || destination.index === source.index) return;

        const playlistId = result.type;
        const playlist = playlists.find(p => p.id === playlistId);
        const newSongs = Array.from(playlist.songs);
        const [movedSong] = newSongs.splice(source.index, 1);
        newSongs.splice(destination.index, 0, movedSong);

        // Mettre à jour la playlist dans l'état local
        const newPlaylists = playlists.map(p => {
            if (p.id === playlistId) {
                return { ...p, songs: newSongs };
            }
            return p;
        });
        setPlaylists(newPlaylists);

        // Mettre à jour Firestore
        const playlistRef = doc(db, "playlists", playlistId);
        await updateDoc(playlistRef, { songs: newSongs });
    };

    return (
        <div>
            <h1>Playlists</h1>
            <DragDropContext onDragEnd={onDragEnd}>
                {playlists.map((playlist) => (
                    <Droppable droppableId={playlist.id.toString()} key={playlist.id} type={playlist.id.toString()}>
                        {(provided) => (
                            <div {...provided.droppableProps} ref={provided.innerRef}>
                                <h2>{playlist.name}
                                <button 
                                onClick={() => deletePlaylist(playlist.id)} 
                                style={
                                    { marginLeft: '10px',backgroundColor: 'darkred', color: 'white', 
                                    borderRadius: '5px', border: 'none', cursor: 'pointer', 
                                    scale: '100%', height: '100%',}} >
                                    Supprimer Playlist
                                </button>
                                </h2>
                                {playlist.songs?.map((song, index) => (
                                    <Draggable key={song.id} draggableId={song.id.toString()} index={index}>
                                        {(provided) => (
                                            <div
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                            >
                                                <span>{song.title}</span>
                                                <button onClick={() => removeSongFromPlaylist(playlist.id, song)}>Supprimer</button>
                                            </div>
                                        )}
                                    </Draggable>
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                ))}
            </DragDropContext>
        </div>
    );
};

export default Playlist;
