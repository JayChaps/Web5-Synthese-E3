import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Playbar from "./Playbar/Playbar";
import PlaybarFull from "./Playbar/PlaybarFull";
import { SongInfoProvider } from "../context/SongInfoContext";

const LayoutAuth = () => {
  return (
    <SongInfoProvider>
      <div className="interface">
        <Nav
          links={[
            { name: "Accueil", url: "/home" },
            { name: "Profil", url: "/profil" },
            { name: "Recherche", url: "/search" },
            { name: "Vos playlists", url: "/playlist" },
          ]}
        />

        <main>
          <Outlet />
          <PlaybarFull />
          <Playbar />
        </main>
      </div>
    </SongInfoProvider>
  );
};

export default LayoutAuth;
