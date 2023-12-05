import Glider from "react-glider";
import "glider-js/glider.min.css";
import ItemPlaylist from "./ItemPlaylist";

const SliderPlaylists = () => {
    const settings = {
        slidesToShow: 3,
        draggable: true,
    };
    return (
        <section className="sliderplaylist">
            <Glider {...settings}>
                <ItemPlaylist />
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
    )
}

export default SliderPlaylists