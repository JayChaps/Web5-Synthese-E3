import React, { useState, useEffect, useContext } from "react";
import { useAuth } from "../context/auhContext";
import SliderPlaylists from "./Playlist/SliderPlaylists";
import ItemChansons from "./Playlist/ItemChansons";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChromePicker } from 'react-color';
import { db } from '../config/firebase'; // Importez votre instance de base de données
import { doc, setDoc, getDoc } from "firebase/firestore";
import { PlaylistsContext } from "../context/playlistsContext";

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
  const [defaultColors, setDefaultColors] = useState({
    rose: '#fc5571',
    mauve: '#7e35e3',
    blanc: '#f8f8f8',
    gris: '#9b9b9b',
    grisFonce: '#222c32',
    noir: '#050625'
  });
  const [currentTheme, setCurrentTheme] = useState("theme1");
  const [colors, setColors] = useState(defaultColors);
  const [showPickers, setShowPickers] = useState({
    rose: false,
    mauve: false,
    blanc: false,
    gris: false,
    grisFonce: false,
    noir: false,
  });

  const { playlists } = useContext(PlaylistsContext);

  
  const userName = user?.displayName || "No name available";
  
  useEffect(() => {
    if (user?.uid) {
      fetchUserColors(currentTheme);
    }
  }, [user?.uid]);
  
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme') || "theme1";
    setCurrentTheme(savedTheme);
    if (user?.uid) {
      if (savedTheme === "theme2") {
        fetchUserColors(savedTheme);
      } else {
        applyColors(defaultColors);
      }
    }
  }, [user?.uid]);

  

  const fetchUserColors = async (savedTheme) => {
    const userColorsRef = doc(db, "userColors", user?.uid);
    const docSnap = await getDoc(userColorsRef);

    if (docSnap.exists() && savedTheme === "theme2") {
      const fetchedColors = docSnap.data().colors;
      setColors(fetchedColors);
      applyColors(fetchedColors);
      console.log("--------------------")
    } else {
      applyColors(defaultColors);
    }
  };

  const saveColorsToFirebase = async () => {
    const userColorsRef = doc(db, "userColors", user?.uid);
    await setDoc(userColorsRef, { colors });
    applyColors(colors);
  };

  const applyColors = (newColors) => {
    Object.keys(newColors).forEach(colorName => {
      document.documentElement.style.setProperty(`--${colorName}`, newColors[colorName]);
    });
  };

  const handleColorClick = (colorName) => {
    setShowPickers(prev => ({ ...prev, [colorName]: !prev[colorName] }));
  };

  const handleChangeComplete = (colorName, color) => {
    setColors(prev => ({ ...prev, [colorName]: color.hex }));
    if (currentTheme === "theme2") {
      document.documentElement.style.setProperty(`--${colorName}`, color.hex);
    }
  };

  const handleThemeSelection = async (themeName) => {
    localStorage.setItem('selectedTheme', themeName);
    setCurrentTheme(themeName);
    setIsThemeOpen(false);

    if (themeName === "theme1") {
      applyColors(defaultColors);
    } else if (themeName === "theme2") {
      fetchUserColors(themeName);
      applyColors(colors);
    }
  };

  const handleThemeToggle = () => {
    setIsThemeOpen(!isThemeOpen);
  };

  const handleButtonClick = () => {
    if (user === null) {
      googleSignIn();
    } else {
      logOut();
    }
    handleThemeSelection("theme1");
    localStorage.setItem('selectedTheme', "theme1")
  };
  


  return (
    <motion.div className="profil" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <header>
        <div className="boutonsprofil">
          <AnimatedItem>
            <div onClick={handleThemeToggle} className={isThemeOpen ? "open selecttheme" : "selecttheme"}>
              <span>{currentTheme}</span>
              <ul name="theme" id="theme" className="themes">
                <li
                  value="theme1"
                  onClick={() => handleThemeSelection("theme1")}
                >
                  Thème 1
                </li>
                <li
                  value="theme2"
                  onClick={() => handleThemeSelection("theme2")}
                >
                  Thème 2
                </li>
              </ul>
            </div>
          </AnimatedItem>
          <AnimatedItem delay={0.1}>

            <div className="button-container">
              <button
                onClick={handleButtonClick}
                className="button-acceuil-connexion">
                {user === null ? "Se connecter avec Google" : "Se déconnecter"}
              </button>
            </div>


          </AnimatedItem>
        </div>
      </header>
      <div className="bodyprofil">
        {currentTheme === "theme2" && (
          <section className="sectioncouleur">
            <div className="color-picker-container">
              <div className="inner">
                {Object.keys(showPickers).map((colorName) => (
                  // Afficher seulement si theme2 est sélectionné
                  <div
                    key={colorName}
                    style={{
                      backgroundColor: colors[colorName],
                    }}
                  >
                    <div onClick={() => handleColorClick(colorName)}>
                      <span>
                        {colorName.charAt(0).toUpperCase() + colorName.slice(1)}
                      </span>
                      <span>{colors[colorName]}</span>
                    </div>

                    {showPickers[colorName] && (
                      <div>
                        <ChromePicker
                          color={colors[colorName]}
                          onChangeComplete={(color) =>
                            handleChangeComplete(colorName, color)
                          }
                        />
                        <button onClick={() => handleColorClick(colorName)}>
                          Fermer
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {currentTheme === "theme2" ? (
              <button onClick={saveColorsToFirebase}>
                Enregistrer les changements
              </button>
            ) : null}
          </section>
        )}
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
            <SliderPlaylists playlists={playlists} />
          </div>
        </AnimatedItem>

        <AnimatedItem delay={0.4}>
          <div className="chansonsaimees">
            <div className="soustitreprofil alt">
              <h3>Chansons aimées</h3>
            </div>

            <div className="lesplaylists__playlist__inner__chansons__chansons">
              {/* <AnimatedItem>
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
              </AnimatedItem> */}
            </div>
          </div>
        </AnimatedItem>
      </div>
    </motion.div>
  );
};

export default Profil;
