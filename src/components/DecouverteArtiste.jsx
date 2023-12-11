import { useParams, Link } from "react-router-dom";
import fetchJsonp from "fetch-jsonp";
import { useEffect, useState } from "react";
import { FaPlayCircle } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";
import "../assets/scss/components/decouverte/decouverteartiste.scss";
import PlaylistSelector from "./RechercheDeezer/PlaylistSelector";

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
  const [selectorActif, setSelectorActif] = useState(false);
  const [popularSongs, setPopularSongs] = useState([]);
  const [relatedArtist, setRelatedArtist] = useState([]);
  const nom = "";
  const { idArtist } = useParams();
  console.log(idArtist);

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
      .then((resp) => resp.json())
      .then((data) => {
        setPopularSongs(data.data || []);
        console.log(data.data);
      })
      .catch((error) => {
        console.error("Erreur lors de la recherche:", error);
      });
  };
  useEffect(() => {
    if (idArtist != null) {
      setRelatedArtist([]);
      setPopularSongs([]);
      topSongs();
      topRelatedArtist();
      console.log(popularSongs);
    }
  }, []);

  const handlePlaylistSelector = (song) => {
  setSelectorActif(!selectorActif);
  if (!selectorActif) {
    setSelectedSong(song);
  }
  console.log(selectedSong);
};

  return (
    <div>


      <h1 className="titre-decouverte">Populaire</h1>


      {popularSongs.map((data, id) => {
        console.log();
        // if(id == 0 )
        // {
        //     return(
        //         <h1>{popularSongs[0].artist.name}</h1>
        //     )
        // }
        return (
          <div className="topSongs" key={id}>
            <img src={data.album.cover} alt="" className="img-populaire"/>
            <h2 className="titre-populaire">{data.title}</h2>
            {/* {selectorActif && (
                <PlaylistSelector
                  estActif={selectorActif}
                  setActif={setSelectorActif}
                  theSong={data}
                />
              )}
            <CgAdd size={"2rem"} color="var(--blanc)"  onClick={() => handlePlaylistSelector(result)}/> */}
            <FaPlayCircle size={"3rem"} color="var(--blanc)" className="play-icon-decouverte" />
          </div>
        );
      })}

      
      <h1 className="titre-fans">Les fans aiment aussi:</h1>
      

      <div className="relatedArtist">
        {relatedArtist.map((data, id) => {
          console.log(data);
          return (
            <div className="container-decouvertes">
            <div className="artistes-decouvertes">
              <img src={data.picture} alt="" className="img-decouverte"/>
              <h2 className="titre-chanteur2">{data.name}</h2>
              <h2 className="titre-chanteur">{data.name}</h2>
              <h2 className="titre-chanteur3">{data.name}</h2>
            </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DecouverteArtiste;
