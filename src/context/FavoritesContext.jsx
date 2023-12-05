import React, { createContext, useContext, useState } from 'react';
import { auth, db } from '../config/firebase';
import { getDoc, setDoc, updateDoc, doc, arrayUnion, increment } from 'firebase/firestore';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([]);

    // const increment = FieldValue.increment(1);
    // const increment = firebase.firestore().FieldValue.increment(1);

    const addToFavorites = async (song) => {
        if (!auth.currentUser) return;

        const userId = auth.currentUser.uid;
        const userRef = doc(db, 'users', userId);
        const likesDocRef = doc(db, 'likes', 'likesDoc');

        const monIncrement = increment(1);


        // Ajout de la chanson aux favoris de l'utilisateur
        await updateDoc(userRef, {
            favorites: arrayUnion(song)
        });

        // Ajout à la liste des likes globaux et incrémentation du compteur likesAmount
        // S'il n'y a pas de likesAmount, on le crée et on l'initialise à 1
        // if(!song.likesAmount) {
            await updateDoc(likesDocRef, {
                songs: arrayUnion({song, likesAmount: monIncrement})
                // songs: arrayUnion({song, likesAmount: 1}),
                // songs: arrayUnion({song, likesAmount: increment(1)})
            });

        // }
        // Sinon, on incrémente le compteur likesAmount
        // else {
        //     await updateDoc(likesDocRef, {
        //         songs: arrayUnion({song, likesAmount: likesAmount++ })
        //     });
        // }

            

        // Mettre à jour le state si nécessaire
        setFavorites((prevFavorites) => [...prevFavorites, song]);
    }

    return (
        <FavoritesContext.Provider value={{
            favorites,
            setFavorites,
            addToFavorites
        }}>
            {children}
        </FavoritesContext.Provider>
    )
};

export const useFavorites = () => {
    return useContext(FavoritesContext);
};