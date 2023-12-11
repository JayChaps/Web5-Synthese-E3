import Glider from "react-glider";
import "glider-js/glider.min.css";
import ItemPlaylist from "./ItemPlaylist";
import ItemPlaylistFirst from "./ItemPlaylistFirst";
import { useContext, useEffect } from "react";
import { PlaylistsContext } from "../../context/playlistsContext";

const SliderPlaylists = () => {
  const settings = {
    slidesToShow: 4,
    draggable: true,
  };

  const { createNewPlaylist, deletePlaylist, 
    addToPlaylist, removeSongFromPlaylist, 
    newPlaylistName, setNewPlaylistName, 
    selectedPlaylistId, setSelectedPlaylistId,
    fetchPlaylists, fetchPlaylist, 
    playlists, setPlaylists, 
    playlist, setPlaylist,
    selectedSong, setSelectedSong } = useContext(PlaylistsContext);

  useEffect(() => {
    fetchPlaylists();
    console.log(playlists);
  } , []);

  return (
    <section className="sliderplaylist">
      {/* Premier item pour créer une playlist */}
      <ItemPlaylistFirst />
      <Glider {...settings}>
        {/* Deuxieme item = chansons aimées */}
        {/* <ItemPlaylist 
            playlist = {playlist}
            name = {playlist.name}
        /> */}

        {/* faire boucle ici */}

        {playlists.map((playlist) => {
          <>
            <ItemPlaylist 
              playlist = {playlist}
              name = {playlist.name}
            />
          </>
          // console.log("playlist dans SliderPlaylists: ", playlist);
        })}

        {/* <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist /> */}
      </Glider>
    </section>
  );
};

export default SliderPlaylists;