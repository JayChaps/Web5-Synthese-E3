import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import LayoutAuth from './LayoutAuth';
import RechercheDeezer from '../pages/RechercheDeezer';

const App = () => {

    const routes = [
        {
            path: '',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Navigate to = "/" replace/>
                }
            ]
        },
        {
            path:'',
            element: <LayoutAuth/>,
            children : [
                {
                    index:true,
                    element: <Navigate to="/home"/>
                },
                {
                    path:'home',
                    element: (
                        <h1>Home</h1>
                    )
                },
                {
                    path:'profil',
                    element:(
                        <h1>Profil</h1>
                    )
                },
                {
                    path:'search',
                    element:(
                        <h1>Recherche</h1>
                    )
                },
                {
                    path:'playlist',
                    element:(
                        <h1>Playlist</h1>
                    )
                }
            ]
        },
        {
            path: '*',
            element: <Navigate to = "/" replace/>
        }
    
    ];

    return <RouterProvider router = {createBrowserRouter(routes)} />;

};

export default App;