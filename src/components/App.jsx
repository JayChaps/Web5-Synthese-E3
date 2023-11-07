import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Layout from './Layout';
import RechercheDeezer from '../pages/RechercheDeezer';

const App = () => {

    const routes = [
        {
            path: '',
            element: <Layout />,
            children: [
                {
                    index: true,
                    element: <Navigate to = "/search" replace/>
                }, {
                    path: 'search',
                    element: <RechercheDeezer />,
                    
                }, 
            ]
        },
        {
            path: '*',
            element: <Navigate to = "/search" replace/>
        }
    
    ];

    return <RouterProvider router = {createBrowserRouter(routes)} />;

};

export default App;