import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db, incrementValue } from '../config/firebase';
import { getDoc, setDoc, updateDoc, doc, arrayUnion, arrayRemove, deleteDoc } from 'firebase/firestore';

const FavoritesContext = createContext();

const FavoritesProvider = ({ children }) => {

    const [favorites, setFavorites] = useState([]);

    const increment = incrementValue(1);
    const decrement = incrementValue(-1);

    const fetchFavorites = async () => {
        if (!auth.currentUser) return;

        const userId = auth.currentUser.uid;
        const userRef = doc(db, 'users', userId);
        const userDoc = await getDoc(userRef);

        if (userDoc.exists()) {
            const userData = userDoc.data();
            setFavorites(userData.favorites);
        }
    };

    const addToFavorites = async (song) => {
        if (!auth.currentUser) return;

        const userId = auth.currentUser.uid;
        const userRef = doc(db, 'users', userId);
        const songId = song.id.toString();
        const likesRef = doc(db, 'likes', songId);

        // Check if the song is already in favorites
        const userDoc = await getDoc(userRef);
        if (userDoc.exists() && userDoc.data().favorites.some(fav => fav.id === song.id)) {
            console.log("Song already in favorites", userDoc.data().favorites.some(fav => fav.id));
            return; // Exit if already in favorites
        }

        // Add song to favorites and increment likes
        await updateDoc(userRef, {
            favorites: arrayUnion(song)
        });

        const likesDoc = await getDoc(likesRef);
        if (!likesDoc.exists()) {
            await setDoc(likesRef, { ...song, likesAmount: 1 });
        } else {
            await updateDoc(likesRef, { likesAmount: increment });
        }

        setFavorites(prev => [...prev, song]);
    };

    const removeFromFavorites = async (song) => {
        if (!auth.currentUser) return;

        const userId = auth.currentUser.uid;
        const userRef = doc(db, 'users', userId);
        const songId = song.id.toString();
        const likesRef = doc(db, 'likes', songId);

        // Remove song from favorites and decrement likes
        await updateDoc(userRef, {
            favorites: arrayRemove(song)
        });

        const likesDoc = await getDoc(likesRef);
        if (likesDoc.exists()) {
            await updateDoc(likesRef, { likesAmount: decrement });
        }
        
        setFavorites(prev => prev.filter(fav => fav.id !== song.id));
    };

    useEffect(() => {
        fetchFavorites();
    }, [addToFavorites, removeFromFavorites]);

    return (
        <FavoritesContext.Provider value={{
            favorites, setFavorites,
            addToFavorites, removeFromFavorites
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export { FavoritesContext, FavoritesProvider }




// import React, { createContext, useContext, useState } from 'react';
// import { auth, db } from '../config/firebase';
// import { getDoc, setDoc, updateDoc, doc, arrayUnion, increment } from 'firebase/firestore';

// const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {

//     const [favorites, setFavorites] = useState([]);

//     // const increment = FieldValue.increment(1);
//     // const increment = firebase.firestore().FieldValue.increment(1);

//     const addToFavorites = async (song) => {
//         if (!auth.currentUser) return;

//         const userId = auth.currentUser.uid;
//         const userRef = doc(db, 'users', userId);
//         const likesDocRef = doc(db, 'likes', 'likesDoc');

//         const monIncrement = increment(1);


//         // Ajout de la chanson aux favoris de l'utilisateur
//         await updateDoc(userRef, {
//             favorites: arrayUnion(song)
//         });

//         // Ajout à la liste des likes globaux et incrémentation du compteur likesAmount
//         // S'il n'y a pas de likesAmount, on le crée et on l'initialise à 1
//         // if(!song.likesAmount) {
//             await updateDoc(likesDocRef, {
//                 songs: arrayUnion({song, likesAmount: monIncrement})
//                 // songs: arrayUnion({song, likesAmount: 1}),
//                 // songs: arrayUnion({song, likesAmount: increment(1)})
//             });

//         // }
//         // Sinon, on incrémente le compteur likesAmount
//         // else {
//         //     await updateDoc(likesDocRef, {
//         //         songs: arrayUnion({song, likesAmount: likesAmount++ })
//         //     });
//         // }

            

//         // Mettre à jour le state si nécessaire
//         setFavorites((prevFavorites) => [...prevFavorites, song]);
//     }

//     return (
//         <FavoritesContext.Provider value={{
//             favorites,
//             setFavorites,
//             addToFavorites
//         }}>
//             {children}
//         </FavoritesContext.Provider>
//     )
// };

// export const useFavorites = () => {
//     return useContext(FavoritesContext);
// };