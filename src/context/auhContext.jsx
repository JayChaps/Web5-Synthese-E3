import React, { useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../firebase';


const authContext = React.createContext({
    // login: async (email, password) => {},
    // register: async(email, password) => {},
    googleSignIn: () => { },
    // logout: () => {},
    logOut: () => { },
    user: null,
    _v: 0
});


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const googleSignIn = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }

    const logOut = () => {
        signOut(auth);
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            console.log('User', currentUser)
        });
        return () => {
            unsubscribe();
        }
    }, [])


    // const login = async (email, password) => {};
    // const register = async (email, password) => {};
    // const logout = () => {};

    // return <authContext.Provider value={{ googleSignIn ,login, register, logout,logOut, user, _v: 1 }}>
    return <authContext.Provider value={{ googleSignIn, logOut, user, _v: 1 }}>
        {children}
    </authContext.Provider>;
};

const useAuth = () => {
    const ctx = useContext(authContext);

    if (ctx._v === 0) {
        console.error('Vous devez utiliser la composante AuthProvider');
    }

    return ctx;
};

export { AuthProvider, useAuth }