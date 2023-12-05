import { useParams, Link } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import { useEffect, useState,useContext } from "react";
import '../css/DecouverteArtiste.css'
import { SongInfoContext } from '../context/SongInfoContext';

const DecouverteArtiste = () => {
    const [popularSongs, setPopularSongs] = useState([]);
    const [relatedArtist, setRelatedArtist] = useState([]);
    const [albums, setAlbums] = useState([]);
    const { idArtist } = useParams();
    const { handlePlaySong } = useContext(SongInfoContext);


  const topRelatedArtist = () => {
    const url = `https://api.deezer.com/artist/${idArtist}/related?output=jsonp`;
    console.log(url);

    fetchJsonp(url)
      .then((resp) => resp.json())
      .then((data) => {
        setRelatedArtist(data.data || []);
        console.log(data.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche:", error);
      });
  };

  const topSongs = () => {
    const url = `https://api.deezer.com/artist/${idArtist}/top?&output=jsonp`;
    console.log(url);

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
                  // console.log(data);

                    return (

                        <div className="topSongs" key={id}>
                            <img src={data.album.cover} alt="" />
                            <h2>{data.title}</h2>
                            <button onClick={() => handlePlaySong(data)}>Lire</button>
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
        {relatedArtist.map((data, id) => {
          console.log(data);
          return (
            <div cla>
              <img src={data.picture} alt="" />
              <h2>{data.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DecouverteArtiste;
