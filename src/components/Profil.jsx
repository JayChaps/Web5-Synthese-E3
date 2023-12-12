import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auhContext";
import SliderPlaylists from "./Playlist/SliderPlaylists";
import ItemChansons from "./Playlist/ItemChansons";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChromePicker } from 'react-color';

const AnimatedItem = ({ children, delay = 0.3 }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={controls}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

const Profil = () => {
  const { user, googleSignIn, logOut } = useAuth();
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [color, setColor] = useState('#fff'); // State for the color picker
  const userName = user?.displayName || "No name available";

  const handleChangeComplete = (color) => {
    setColor(color.hex);
    document.documentElement.style.setProperty('--background-color', color.hex);
  };

  const handleTheme = () => {
    setIsThemeOpen(!isThemeOpen);
    console.log(isThemeOpen);
  };

  return (
    <motion.div
      className="profil"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <header>
        <div className="boutonsprofil">
          <AnimatedItem>
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
          </AnimatedItem>

          <AnimatedItem delay={0.1}>
            <div className="button-container">
              <button
                onClick={user === null ? googleSignIn : logOut}
                className="button-acceuil-connexion"
              >
                {user === null ? "Se connecter avec Google" : "Se déconnecter"}
              </button>
            </div>
          </AnimatedItem>
        </div>
      </header>
      <div className="bodyprofil">
        <div>
          <ChromePicker
            color={color}
            onChangeComplete={handleChangeComplete}
          />
          <div style={{ backgroundColor: 'var(--background-color)', width: '100px', height: '100px' }}>
            Preview
          </div>
        </div>
        <AnimatedItem delay={0.2}>
          <div className="nomcompte">
            <h1>{userName}</h1>
            <h2>{user?.email}</h2>
            <img src={user?.photoURL} alt={userName} />
          </div>
        </AnimatedItem>

        <AnimatedItem delay={0.3}>
          <div className="playlists">
            <div className="soustitreprofil">
              <h3>Mes playlists</h3>
            </div>
            <SliderPlaylists />
          </div>
        </AnimatedItem>

        <AnimatedItem delay={0.4}>
          <div className="chansonsaimees">
            <div className="soustitreprofil alt">
              <h3>Chansons aimées</h3>
            </div>

            <div className="lesplaylists__playlist__inner__chansons__chansons">
              <AnimatedItem>
                <ItemChansons />
              </AnimatedItem>
              <AnimatedItem delay={0.1}>
                <ItemChansons />
              </AnimatedItem>
              <AnimatedItem delay={0.2}>
                <ItemChansons />
              </AnimatedItem>
              <AnimatedItem delay={0.3}>
                <ItemChansons />
              </AnimatedItem>
              <AnimatedItem delay={0.4}>
                <ItemChansons />
              </AnimatedItem>
              <AnimatedItem delay={0.5}>
                <ItemChansons />
              </AnimatedItem>
              <AnimatedItem delay={0.6}>
                <ItemChansons />
              </AnimatedItem>
              <AnimatedItem delay={0.7}>
                <ItemChansons />
              </AnimatedItem>
              <AnimatedItem delay={0.8}>
                <ItemChansons />
              </AnimatedItem>
            </div>
          </div>
        </AnimatedItem>
      </div>

    </motion.div>

  );
};

export default Profil;
