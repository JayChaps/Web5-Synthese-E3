import { useParams } from "react-router-dom";
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
    const [popularSongs,setPopularSongs] = useState([]);
    const nom = "";
    const {idArtist} = useParams();
    console.log(idArtist);

    const topSongs = () =>{
         const url = `https://api.deezer.com/artist/${idArtist}/top&output=jsonp`
    console.log(url);

    fetchJsonp(url)
        .then(resp => resp.json())
        .then(data =>{
            setPopularSongs(data.data || []);
            console.log(data.data);
            
        })
        .catch(error => {
            console.error("Erreur lors de la recherche:", error);
        })

       
    }
     useEffect(() => {
            if (idArtist !=null) {
                setPopularSongs([]);
                topSongs();
                console.log(popularSongs);
            }
        }, []);
   
    


    return(
        <div>
            <h1>Populaire</h1>
            {
                popularSongs.map((data,id)=>{
                    console.log()
                    // if(id == 0 )
                    // {
                    //     return(
                    //         <h1>{popularSongs[0].artist.name}</h1>
                    //     )
                    // }
                    return(
                        
                        <div className="topSongs" key={id}>
                            <img src={data.album.cover} alt="" />
                            <h2>{data.title}</h2>
                        </div>
                        
                    )
                })
            }
        </div>
    )
}

export default DecouverteArtiste;