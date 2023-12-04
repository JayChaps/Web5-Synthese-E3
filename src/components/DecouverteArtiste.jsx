import { useParams, Link } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import { useEffect, useState } from "react";
import '../css/DecouverteArtiste.css'

// const encodedSearchTerm = encodeURIComponent(searchTerm);
// const url = `https://api.deezer.com/search?q=${filter}:\"${encodedSearchTerm}\"&output=jsonp`;
// console.log(url);

// fetchJsonp(url)
//     .then(response => response.json())
//     .then(data => {
//         setSearchResults(data.data || []);
//         console.log(data.data);
//     })
//     .catch(error => {
//         console.error("Erreur lors de la recherche:", error);
//     });

const DecouverteArtiste = () => {
    const [popularSongs, setPopularSongs] = useState([]);
    const [relatedArtist, setRelatedArtist] = useState([]);
    const [albums, setAlbums] = useState([]);
    const { idArtist } = useParams();


    const topRelatedArtist = () => {
        setRelatedArtist([]);
        const url = `https://api.deezer.com/artist/${idArtist}/related?output=jsonp`

        fetchJsonp(url)
            .then(resp => resp.json())
            .then(data => {
                setRelatedArtist(data.data || []);

            })
            .catch(error => {
                console.error("Erreur lors de la recherche:", error);
            })
    };

    const allAlbums = () => {
        setAlbums([]);
        const url = `https://api.deezer.com/artist/${idArtist}/albums?output=jsonp`

        fetchJsonp(url)
            .then(resp => resp.json())
            .then(data => {
                setAlbums(data.data || []);

            })
            .catch(error => {
                console.error("Erreur lors de la recherche:", error);
            })
    };


    const topSongs = () => {
        setPopularSongs([]);
        const url = `https://api.deezer.com/artist/${idArtist}/top?&output=jsonp`

        fetchJsonp(url)
            .then(resp => resp.json())
            .then(data => {
                setPopularSongs(data.data || []);

            })
            .catch(error => {
                console.error("Erreur lors de la recherche:", error);
            })
    };

    useEffect(() => {
        if (idArtist != null) {
            topSongs();
            allAlbums();
            topRelatedArtist();
        }
    }, [idArtist]);




    return (
        <div>
            <h1>Populaire</h1>
            {
                popularSongs.map((data, id) => {
                    return (

                        <div className="topSongs" key={id}>
                            <img src={data.album.cover} alt="" />
                            <h2>{data.title}</h2>
                        </div>

                    )
                })
            }

            <h1>Discographie</h1>
            <div className="albums">
                {
                    albums.map((data, id) => {
                        return (
                            <Link to={`/album/${data.id}`} key={id}>
                                <div className="album">
                                    <img src={data.cover} alt="" />
                                    <h2>{data.title}</h2>
                                </div>
                            </Link>
                        )
                    }
                    )
                }
            </div>

            <h1 className="h1">Les fans aiment aussi</h1>
            <div className="relatedArtist">
                {
                    relatedArtist.map((data, id) => {
                        return (
                            <Link to={`/artist/${data.id}`} key={id}>
                                <div >
                                    <img src={data.picture} alt="" />
                                    <h2>{data.name}</h2>
                                </div>
                            </Link>
                        )
                    }
                    )}
            </div>
        </div>
    )
}


export default DecouverteArtiste;