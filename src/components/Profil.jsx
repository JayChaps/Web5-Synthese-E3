import { useState } from "react";
import { useAuth } from "../context/auhContext";
import Playlist from "../pages/Playlist";
import SliderPlaylists from "./Playlist/SliderPlaylists";

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
          <div className={
            isThemeOpen ? "open selecttheme" : "selecttheme"
          } onClick={handleTheme}>
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
        <div className="nomcompte">
          <h1>{userName}</h1>
          <h2>{user.email}</h2>
        </div>
      </header>
      <Playlist />
      <SliderPlaylists />
      <h2>Chansons aimées : </h2>
    </div>
  );
};

export default Profil;
