import { Navigate, RouterProvider, createBrowserRouter, useNavigate,Link, Outlet } from 'react-router-dom';
import Layout from './Layout';
import LayoutAuth from './LayoutAuth';
import RechercheDeezer from '../pages/RechercheDeezer';
import { AuthProvider, useAuth } from "../context/auhContext";
import { useEffect, useState } from 'react';
import Playlist from '../pages/Playlist';
import { AudioProvider, useAudio } from '../context/audiotim';
import Profil from './Profil';
import DecouverteArtiste from './DecouverteArtiste';
import DecouverteAlbum from './DecouverteAlbum';


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
                    element: <Navigate to="/profil" />
                },
                {
                    path: 'profil',
                    element: <Profil/>
                },
                {
                    path: 'search',
                    element: <RechercheDeezer />,
                }, {
                    path: 'playlist',
                    element: <Playlist />,
                }, 
                {
                    path: 'artist',
                    element: <Outlet/>,
                    children:[
                        {
                            path:':idArtist',
                            element:<DecouverteArtiste/>,
                        }
                    ]
                },
                {
                    path: 'album',
                    element: <Outlet/>,
                    children:[
                        {
                            path:':idAlbum',
                            element:<DecouverteAlbum/>,
                        }
                    ]
                }
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