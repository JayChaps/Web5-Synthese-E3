import { Outlet } from "react-router-dom";
import Nav from "./Nav";

const LayoutAuth = () => {
  return (
    <div className="container-fluid">
      <Nav
        links={[
          { name: "Accueil", url: "/home" },
          { name: "Profil", url: "/profil" },
          { name: "Recherche", url: "/search" },
          { name: "Vos playlists", url: "/playlist" },
        ]}
      />

      <main>
        <Outlet/>
      </main>
    </div>
  );
};

export default LayoutAuth;
