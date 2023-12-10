import { useState } from "react";
import { useAuth } from "../context/auhContext";
import Playlist from "../pages/Playlist";
import SliderPlaylists from "./Playlist/SliderPlaylists";
import ItemChansons from "./Playlist/ItemChansons";

const Profil = () => {
  const { user, googleSignIn, logOut } = useAuth();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const userName = user?.displayName || "No name available";

  const handleTheme = () => {
    setIsThemeOpen(!isThemeOpen);
    console.log(isThemeOpen);
  };
  return (
    <div className="profil">
      <header>
        <div className="boutonsprofil">
          <div
            className={isThemeOpen ? "open selecttheme" : "selecttheme"}
            onClick={handleTheme}
          >
            <span>Votre thème</span>
            <ul name="theme" id="theme" className="themes">
              <li value="theme1">Thème 1</li>
              <li value="theme2">Thème 2</li>
            </ul>
          </div>

          <div className="button-container">
            <button
              onClick={user === null ? googleSignIn : logOut}
              className="button-acceuil-connexion"
            >
              {user === null ? "Se connecter avec Google" : "Se déconnecter"}
            </button>
          </div>
        </div>
      </header>
      <div className="bodyprofil">
        <div className="nomcompte">
          <h1>{userName}</h1>
          <h2>{user.email}</h2>
        </div>
        {/* <Playlist /> */}
        <div className="playlists">
          <div className="soustitreprofil">
            <h3>Mes playlists</h3>
            <h3>Mes playlists</h3>
            <h3>Mes playlists</h3>
          </div>
          <SliderPlaylists />
        </div>
        <div className="chansonsaimees">
          <div className="soustitreprofil alt">
            <h3>Chansons aimées</h3>
            <h3>Chansons aimées</h3>
            <h3>Chansons aimées</h3>
          </div>

          <div className="lesplaylists__playlist__inner__chansons__chansons">
            <ItemChansons />
            <ItemChansons />
            <ItemChansons />
            <ItemChansons />
            <ItemChansons />
            <ItemChansons />
            <ItemChansons />
            <ItemChansons />
            <ItemChansons />
            <ItemChansons />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profil;
