import React, { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../../context/FavoritesContext";

const Coeur = ({ songToAdd }) => {

  const { favorites, addToFavorites, removeFromFavorites } = useContext(FavoritesContext);

  // After 1 second of loading, a new const "theId" is created with the value of the song id
  const [theId, setTheId] = useState(1);
  useEffect(() => {
    setTimeout(() => {
      setTheId(songToAdd.id);
    }, 200);
    console.log("theId", theId);
  }, [songToAdd]);
  
  const [isFavorited, setIsFavorited] = useState(true);

  useEffect(() => {
    setIsFavorited(favorites?.some(fav => fav.id === theId));
  }, [favorites, theId]);

  const handleLikeClick = () => {
    setIsFavorited(!isFavorited);
    if (!isFavorited && songToAdd) {
      removeFromFavorites(songToAdd);
    } else {
      addToFavorites(songToAdd);
    }
  };


  return (
    <label className="coeur">
      {/* checked={isLiked} */}
    <input 
      type="checkbox" 
      checked={isFavorited} 
      readOnly 
    />
    <div className="checkmark" 
      onClick={() => handleLikeClick()}
    >
      <svg viewBox="0 0 256 256">
        <rect fill="none" height="256" width="256"></rect>
        <path
          d="M224.6,51.9a59.5,59.5,0,0,0-43-19.9,60.5,60.5,0,0,0-44,17.6L128,59.1l-7.5-7.4C97.2,28.3,59.2,26.3,35.9,47.4a59.9,59.9,0,0,0-2.3,87l83.1,83.1a15.9,15.9,0,0,0,22.6,0l81-81C243.7,113.2,245.6,75.2,224.6,51.9Z"
          strokeWidth="20px" stroke="var(--blanc)" fill="none"></path>
      </svg>
    </div>
  </label>
  );
};

export default Coeur;
