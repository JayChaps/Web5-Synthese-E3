import { Navigate, RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import LayoutAuth from './LayoutAuth';
import RechercheDeezer from '../pages/RechercheDeezer';
import PageTableauDeBord from '../pages/PageTableauDeBord';
import { AuthProvider, useAuth } from "../context/auhContext";
import { useEffect, useState } from 'react';
import Playlist from '../pages/Playlist';
import { AudioProvider, useAudio } from '../context/audiotim';


const Routes = () =>{
    const {isConnected,loading} = useAuth();
    if(loading) return <div>loading...</div>

    const routes = [
        !isConnected &&{
            path: '',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/" replace />
                }
            ]
        },
        isConnected &&{
            path: '',
            element: <LayoutAuth />,
            children: [
                {
                    index: true,
                    element: <Navigate to="/home" />
                },
                {
                    path: 'home',
                    element: <PageTableauDeBord />,
                    
                },
                {
                    path: 'profil',
                    element: (
                        <h1>Profil</h1>
                    )
                },
                {
                    path: 'search',
                    element: <RechercheDeezer />,
                }, {
                    path: 'playlist',
                    element: <Playlist />,
                }, 
            ]
        },
        {
            path: '*',
            element: <Navigate to="/" replace />
        }

    ];
    return <RouterProvider router={createBrowserRouter(routes)} />
}



const App = () => {
    


    return (
        <AudioProvider>
            <AuthProvider>
                <Routes/>
            </AuthProvider>
        </AudioProvider>
    );

};

export default App;