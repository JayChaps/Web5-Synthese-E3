import React, { useContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '../config/firebase'


const authContext = React.createContext({
    googleSignIn: () => { },
    logOut: () => { },
    user: null,
    isConnected:false,
    _v: 0
});


const AuthProvider = ({ children }) => {

    const [user, setUser] = useState({});
    const [isConnected,setIsConnected] = useState(false);
    const [loading,setLoading] = useState(true);

    const googleSignIn = async () => {
        setLoading(true);
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        // setIsConnected(true);
    }
    const logOut = async () => {
        await signOut(auth);
        // setIsConnected(false)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setIsConnected(!!currentUser);
            setLoading(false);
            console.log('User', currentUser)
        });
        return unsubscribe;
    }, [])

    return <authContext.Provider value={{ googleSignIn, logOut, user, isConnected,loading, _v: 1 }}>
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