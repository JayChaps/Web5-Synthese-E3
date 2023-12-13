// SliderPlaylists.jsx :
import Glider from "react-glider";
import "glider-js/glider.min.css";
import ItemPlaylist from "./ItemPlaylist";
import ItemPlaylistFirst from "./ItemPlaylistFirst";
import { useContext, useEffect } from "react";
import { PlaylistsContext } from "../../context/playlistsContext";

const SliderPlaylists = ({playlists}) => {
  const settings = {
    slidesToShow: 4,
    draggable: true,
  };


  // useEffect(() => {
  //   fetchPlaylists();
  //   console.log(playlists);
  // } , []);

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

        {
          playlists &&
        playlists.map((playlist) => {
          return (
            <ItemPlaylist 
            key = {playlist.id}
            playlist = {playlist}
            name = {playlist.name}
            songs = {playlist.songs}
            />
          )
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
