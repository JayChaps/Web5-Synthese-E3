// Playlist.jsx : 
import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, doc, updateDoc, deleteField, deleteDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { SongInfoContext } from "../context/SongInfoContext";
import { PlaylistsContext } from "../context/playlistsContext";

const Playlist = () => {
    // const [playlists, setPlaylists] = useState([]);

    const { handlePlaySong } = useContext(SongInfoContext);
    const { createNewPlaylist, deletePlaylist, 
            addToPlaylist, removeSongFromPlaylist, 
            newPlaylistName, setNewPlaylistName, 
            selectedPlaylistId, setSelectedPlaylistId,
            fetchPlaylists, fetchPlaylist, 
            playlists, setPlaylists, 
            playlist, setPlaylist,
            selectedSong, setSelectedSong } = useContext(PlaylistsContext);

    // Récupération des playlists
    useEffect(() => {
        fetchPlaylists();
    }, []);


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


    // Lancer la chanson 
    const JouerLaChanson = (song) => {
        setSelectedSong(song);
        handlePlaySong(song);
    }

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
                                    { marginLeft: '0px',backgroundColor: 'darkred', color: 'white', 
                                    borderRadius: '5px', border: 'none', cursor: 'pointer', 
                                    scale: '50%', height: '50%',}} >
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
                                                <button onClick={() => JouerLaChanson(song)}>Lire</button>
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
