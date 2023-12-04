import { Outlet } from "react-router-dom";
import Nav from "./Nav";
import Playbar from "./Playbar";
import { SongInfoProvider } from "../context/SongInfoContext";

const LayoutAuth = () => {
  return (
    <SongInfoProvider>
      <div className="container-fluid">
        <Nav
          links={[
            { name: "Profil", url: "/profil" },
            { name: "Recherche", url: "/search" },
            { name: "Vos playlists", url: "/playlist" },
          ]}
          />

        <main>
          <Outlet/>
          <Playbar/>
        </main>
      </div>
    </SongInfoProvider>
  );
};

export default LayoutAuth;
