import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
  useNavigate,
  Link,
  Outlet,
} from "react-router-dom";
import Layout from "./Layout";
import LayoutAuth from "./LayoutAuth";
import RechercheDeezer from "../pages/RechercheDeezer";
import PageTableauDeBord from "../pages/PageTableauDeBord";
import { AuthProvider, useAuth } from "../context/auhContext";
import { useEffect, useState } from "react";
import Playlist from "../pages/Playlist";
import { AudioProvider, useAudio } from "../context/audiotim";
import { PlaylistsProvider } from "../context/playlistsContext";
import Profil from "./Profil";
import DecouverteArtiste from "./DecouverteArtiste";

const Routes = () => {
  const { isConnected, loading } = useAuth();
  if (loading) return <div>loading...</div>;

  const routes = [
    !isConnected && {
      path: "",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Navigate to="/" replace />,
        },
      ],
    },
    isConnected && {
      path: "",
      element: <LayoutAuth />,
      children: [
        {
          index: true,
          element: <Navigate to="/home" />,
        },
        {
          path: "home",
          element: <PageTableauDeBord />,
        },
        {
          path: "profil",
          element: <Profil />,
        },
        {
          path: "search",
          element: <RechercheDeezer />,
        },
        {
          path: "playlist",
          element: <Playlist />,
        },
        {
          path: "artist",
          element: <Outlet />,
          children: [
            {
              path: ":idArtist",
              element: <DecouverteArtiste />,
            },
          ],
        },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/" replace />,
    },
  ];
  return <RouterProvider router={createBrowserRouter(routes)} />;
};

const App = () => {
  return (
    <AudioProvider>
      <PlaylistsProvider>
        <AuthProvider>
          <Routes />
        </AuthProvider>
      </PlaylistsProvider>
    </AudioProvider>
  );
};

export default App;
