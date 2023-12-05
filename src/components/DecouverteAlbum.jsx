import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import '../css/DecouverteAlbum.css'

const DecouverteAlbum = () => {
    const { idAlbum } = useParams();
    const [songs, setSongs] = useState([]);
    const [album, setAlbum] = useState({});
    const [contributorsByTrack, setContributorsByTrack] = useState({});

    const titleAlbum = async () => {
        const url = `https://api.deezer.com/album/${idAlbum}/tracks?output=jsonp`;

        try {
            const resp = await fetchJsonp(url);
            const data = await resp.json();
            setSongs(data.data || []);

            let tempContributors = {};

            // const tracksPromise = data.data.map(track => {
            //     return fetchJsonp(`https://api.deezer.com/track/${track.id}?output=jsonp`)
            //     .then(response => response.json())
            // });

            // Promise.all(tracksPromise).then(results => {
            //     console.log(results);
            // });



            for (let track of data.data) {
                const response = await fetchJsonp(`https://api.deezer.com/track/${track.id}?output=jsonp`);
                const dataTrack = await response.json();
                tempContributors[track.id] = dataTrack.contributors || [];
            }
            setContributorsByTrack(tempContributors);
        } catch (error) {
            console.error("Erreur lors de la recherche:", error);
        }
    };

    const infoAlbum = async () => {
        const url = `https://api.deezer.com/album/${idAlbum}?output=jsonp`;
        try {
            const resp = await fetchJsonp(url);
            const data = await resp.json();
            setAlbum(data || {});
        } catch (error) {
            console.error("Erreur lors de la recherche:", error);
        }
    };

    useEffect(() => {
        infoAlbum();
        titleAlbum();
    }, [idAlbum]);

    return (
        <>
            <div className="decouverte-album">
                <div>
                    <h1>{album.title}</h1>
                    {album.cover && <img src={album.cover_big} alt="image de l'album" />}
                </div>

                {album.artist && songs.length > 0 &&
                    <div className="decouverte">
                        <Link to={`/artist/${songs[0].artist.id}`}>
                            <div className="decouverte-artist">
                                <img src={album.artist.picture_small} alt={album.artist.name} />
                                <h1>{songs[0].artist.name}</h1>
                            </div>
                        </Link>
                    </div>
                }
            </div>
            <div>
                <h1>Titres</h1>
                <div className="decouverte-songs">
                    {songs.length > 0 && songs.map((song, id) => (
                        <div className="song" key={id}>
                            <div className="list">
                                <h2>{song.track_position}</h2>
                            </div>
                            <div className="songInfos">
                                <h3>{song.title}</h3>
                                <div className="nom">
                                    {
                                        contributorsByTrack[song.id] && contributorsByTrack[song.id].map((contributor, contributorId) => {
                                            return (
                                                <div className="feature-div">
                                                    <Link to={`/artist/${contributor.id}`}>
                                                        <h2 key={contributorId} className="feature">{contributor.name},</h2>
                                                    </Link>
                                                </div>
                                            )
                                        }
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DecouverteAlbum;
