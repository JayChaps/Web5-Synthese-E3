import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auhContext";
import SliderPlaylists from "./Playlist/SliderPlaylists";
import ItemChansons from "./Playlist/ItemChansons";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { AlphaPicker, BlockPicker, ChromePicker, CirclePicker, CompactPicker, GithubPicker, HuePicker, PhotoshopPicker, SketchPicker, SwatchesPicker, TwitterPicker } from 'react-color';

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
  const [defaultColors, setDefaultColors] = useState({});
  const [currentTheme, setCurrentTheme] = useState("theme1");
  const userName = user?.displayName || "No name available";
  const [showPickers, setShowPickers] = useState({
    rose: false,
    mauve: false,
    blanc: false,
    gris: false,
    grisFonce: false,
    noir: false
  });
  const [colors, setColors] = useState({
    rose: '#fc5571',
    mauve: '#7e35e3',
    blanc: '#f8f8f8',
    gris: '#9b9b9b',
    grisFonce: '#222c32',
    noir: '#050625'
  });

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setDefaultColors({
      rose: rootStyles.getPropertyValue('--roseDefault').trim(),
      mauve: rootStyles.getPropertyValue('--mauveDefault').trim(),
      blanc: rootStyles.getPropertyValue('--blancDefault').trim(),
      gris: rootStyles.getPropertyValue('--grisDefault').trim(),
      grisFonce: rootStyles.getPropertyValue('--grisFonceDefault').trim(),
      noir: rootStyles.getPropertyValue('--noirDefault').trim(),
    });
  }, []);

  const handleColorClick = (colorName) => {
    setShowPickers(prevState => ({
      ...prevState,
      [colorName]: !prevState[colorName]
    }));
  };

  const handleChangeComplete = (colorName, color) => {
    if (currentTheme === "theme2") {
      setColors(prevColors => ({
        ...prevColors,
        [colorName]: color.hex
      }));
      document.documentElement.style.setProperty(`--${colorName}Default`, color.hex);
    }
  };
  const handleThemeSelection = (themeName) => {
    setCurrentTheme(themeName);
    if (themeName === "theme1") {
      // Appliquer les couleurs par défaut pour le thème 1
      Object.keys(defaultColors).forEach(colorName => {
        document.documentElement.style.setProperty(`--${colorName}Default`, defaultColors[colorName]);
      });
    } else if (themeName === "theme2") {
      // Appliquer les couleurs choisies pour le thème 2
      Object.keys(colors).forEach(colorName => {
        document.documentElement.style.setProperty(`--${colorName}Default`, colors[colorName]);
      });
    }
  };

  const handleTheme = () => {
    setIsThemeOpen(!isThemeOpen);
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
              <span>{currentTheme === "theme1" ? "Thème 1" : "Thème 2"}</span>
              <ul name="theme" id="theme" className="themes">
                <li value="theme1" onClick={()=>handleThemeSelection("theme1")}>Thème 1</li>
                <li value="theme2" onClick={()=>handleThemeSelection("theme2")}>Thème 2</li>
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
      {currentTheme === "theme2" && Object.keys(showPickers).map((colorName) => (
          // Afficher seulement si theme2 est sélectionné
          <div key={colorName} style={{ position: 'relative', marginBottom: '10px' }}>
            <div
              style={{ backgroundColor: colors[colorName], width: '100px', height: '100px' }}
              onClick={() => handleColorClick(colorName)}
            >
              {colorName.charAt(0).toUpperCase() + colorName.slice(1)} Default
            </div>
            {showPickers[colorName] && (
              <div style={{ position: 'absolute', zIndex: 10, bottom: '100%', left: '0' }}>
                <ChromePicker
                  color={colors[colorName]}
                  onChangeComplete={(color) => handleChangeComplete(colorName, color)}
                />
                <button onClick={() => handleColorClick(colorName)}>Fermer</button>
              </div>
            )}
          </div>
        ))}
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
