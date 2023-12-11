import React, { useContext, useEffect, useState } from "react";
import { FaPen } from "react-icons/fa6";
import { GrSubtractCircle } from "react-icons/gr";
import { FaPlayCircle } from "react-icons/fa";
import SliderPlaylists from "../components/Playlist/SliderPlaylists";
import ItemChansons from "../components/Playlist/ItemChansons";
import { CgRemove } from "react-icons/cg";
import ItemChansonRecomande from "../components/Playlist/ItemChansonRecomande";
import { Link } from "react-router-dom";
import RechercheDeezerInput from "../components/RechercheDeezer/RechercheInput";
import { PlaylistsContext } from "../context/playlistsContext";
import { SongInfoContext } from "../context/SongInfoContext";
import ItemPlaylist from "../components/Playlist/ItemPlaylist";

const LesPlaylist = () => {
  const [windowDimensions, setWindowDimensions] = useState(window.innerWidth);
  const urlImg = "/src/assets/img/jpg/placeholder.jpg";

  const { handlePlaySong } = useContext(SongInfoContext);
  const { createNewPlaylist, deletePlaylist,
    addToPlaylist, removeSongFromPlaylist,
    newPlaylistName, setNewPlaylistName,
    selectedPlaylistId, setSelectedPlaylistId,
    fetchPlaylists, fetchPlaylist,
    playlists, setPlaylists,
    playlist, setPlaylist,
    selectedSong, setSelectedSong } = useContext(PlaylistsContext);

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowDimensions(window.innerWidth);
    });

    return () => {
      window.removeEventListener("resize", () => { });
    };
  }, []);

  // Récupération des playlists
  useEffect(() => {
    fetchPlaylists();
  }, []);

  const JouerLaChanson = (song) => {
    setSelectedSong(song);
    handlePlaySong(song);
  }

  const handleDeleteSong = (playlistId, song) => {
    removeSongFromPlaylist(playlistId, song);
  };

  const handleDeletePlaylist = (playlistId) => {
    deletePlaylist(playlistId);
  };


  return (
    <div className="lesplaylists">
      <SliderPlaylists />
      {/* ... Reste du JSX ... */}
      {playlists.map((playlist) => (
        <section className="lesplaylists__playlist" key={playlist.id}>
          {/* ... */}
          <ItemPlaylist
            playlist = {playlist}
            name = {playlist.name}
          />
          <div className="lesplaylists__playlist__inner__chansons__chansons">
            {playlist.songs.map((song, index) => (
              <ItemChansons
                key={song.id}
                index={index + 1} // numéro de la chanson
                img={song.coverUrl} // url de l'image
                title={song.title} // titre de la chanson
                artist={song.artist.name} // artiste
                album={song.album.title} // album
                duration={song.duration} // durée
                onPlay={() => handlePlaySong(song)} // Fonction pour jouer la chanson
                onDelete={() => removeSongFromPlaylist(playlist.id, song)} // Fonction pour supprimer la chanson
              />
            ))}
          </div>
          {/* ... */}
          <CgRemove onClick={() => deletePlaylist(playlist.id)} className="delete-playlist-icon" />
          {/* ... */}
        </section>
      ))}
      {/* ... Reste du JSX ... */}
    </div>
  );

  // return (
  //   <div className="lesplaylists">
  //     <SliderPlaylists />
  //     {/* ... autres éléments de l'interface utilisateur */}
  //     {playlists.map((playlist) => (
  //       <div key={playlist.id}>
  //         <h2>{playlist.name}</h2>
  //         {/* Bouton pour supprimer une playlist */}
  //         <button onClick={() => handleDeletePlaylist(playlist.id)}>Supprimer la playlist</button>
  //         {/* Affichage des chansons */}
  //         {playlist.songs.map((song, index) => (
  //           <div key={song.id}>
  //             {/* Affichez les détails de la chanson ici */}
  //             <button onClick={() => JouerLaChanson(song)}>Lire</button>
  //             <button onClick={() => handleDeleteSong(playlist.id, song)}>Supprimer</button>
  //           </div>
  //         ))}
  //       </div>
  //     ))}
  //     {/* ... autres éléments de l'interface utilisateur */}
  //   </div>
  // );

  // return (
  //   <div className="lesplaylists">
  //     <SliderPlaylists />
  //     <header>
  //       <section className="lesplaylists__infos">
  //         <div className="titreplaylist">
  //           <div className="titreinner">
  //             <h1>NomPlaylist</h1>
  //             <h1>NomPlaylist</h1>
  //             <h1>NomPlaylist</h1>
  //             <h1>NomPlaylist</h1>
  //           </div>
  //         </div>
  //         <section className="lesplaylists__infos__icones">
  //           <div className="lesplaylistcompte">
  //             <div>
  //               <img src={urlImg} alt="" />
  //             </div>
  //             <span>Nicolas Lauzon</span>
  //           </div>
  //           <div className="lesplaylists__infos__icones__icones">
  //             <FaPen size={"1rem"} color="var(--noir)" />
  //             <CgRemove size={"1rem"} color="var(--noir)" />
  //             <FaPlayCircle size={"2rem"} color="var(--noir)" />
  //           </div>
  //         </section>
  //       </section>
  //       {/* Cover de la playlist 1 image dans chaque coin */}
  //       <div className="coverplaylist">
  //         <img src={urlImg} alt="" />
  //         <img src={urlImg} alt="" />
  //         <img src={urlImg} alt="" />
  //         <img src={urlImg} alt="" />
  //       </div>
  //     </header>

  //     <section className="lesplaylists__playlist">
  //       <Link to="/search">
  //         <RechercheDeezerInput
  //           placeholder={"Ajoutez une chanson !"}
  //           icone={"add"}
  //         />
  //       </Link>

  //       <section className="lesplaylists__playlist__inner__chansons">
  //         <div className="lesplaylists__playlist__inner__chansons__infos">
  //           <span className="chansons__infos__number">#</span>
  //           <span className="chansons__infos__titre">Titre</span>
  //           <span className="chansons__infos__album">Album</span>
  //           <span className="chansons__infos__duree">Durée</span>
  //         </div>
  //         <div className="lesplaylists__playlist__inner__chansons__chansons">

  //           {/* faire boucle ici */}
  //           {/* À passer:
  //             numéro de la chanson
  //             img
  //             titre
  //             artiste
  //             album
  //             durée
  //           */}
  //           <ItemChansons />
  //           <ItemChansons />
  //           <ItemChansons />
  //           <ItemChansons />
  //           <ItemChansons />
  //           <ItemChansons />
  //           <ItemChansons />
  //           <ItemChansons />
  //           <ItemChansons />
  //           <ItemChansons />
  //         </div>
  //       </section>
  //       <div className="separateur">
  //         <span>Chansons recommandées</span>
  //       </div>
  //       <section className="lesplaylists__playlist__inner__chansons__chansons recommande">
  //         {/* premier item a le props premier *Important* */}
  //         <ItemChansonRecomande premier={true} />
  //         <ItemChansonRecomande />
  //         <ItemChansonRecomande />
  //         <ItemChansonRecomande />
  //         <ItemChansonRecomande />
  //         <ItemChansonRecomande />
  //         <ItemChansonRecomande />
  //       </section>
  //     </section>
  //   </div>
  // );

};

export default LesPlaylist;
