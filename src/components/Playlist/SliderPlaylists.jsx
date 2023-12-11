import Glider from "react-glider";
import "glider-js/glider.min.css";
import ItemPlaylist from "./ItemPlaylist";
import ItemPlaylistFirst from "./ItemPlaylistFirst";

const SliderPlaylists = () => {
  const settings = {
    slidesToShow: 4,
    draggable: true,
  };
  return (
    <section className="sliderplaylist">
      {/* Premier item pour créer une playlist */}
      <ItemPlaylistFirst />
      <Glider {...settings}>
        {/* Deuxieme item = chansons aimées */}
        <ItemPlaylist />

        {/* faire boucle ici */}
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
        <ItemPlaylist />
      </Glider>
    </section>
  );
};

export default SliderPlaylists;
