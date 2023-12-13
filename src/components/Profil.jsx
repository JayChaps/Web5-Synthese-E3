import React, { useState, useEffect } from "react";
import { useAuth } from "../context/auhContext";
import SliderPlaylists from "./Playlist/SliderPlaylists";
import ItemChansons from "./Playlist/ItemChansons";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChromePicker } from "react-color";
import { db } from "../config/firebase"; // Importez votre instance de base de données
import { doc, setDoc, getDoc } from "firebase/firestore";

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
  const [colors, setColors] = useState({
    rose: "#fc5571",
    mauve: "#7e35e3",
    blanc: "#f8f8f8",
    gris: "#9b9b9b",
    grisFonce: "#222c32",
    noir: "#050625",
  });
  const saveColorsToFirebase = async () => {
    try {
      // Remplacez 'userId' par l'identifiant de l'utilisateur actuel
      const userColorsRef = doc(db, "userColors", user?.uid);

      await setDoc(userColorsRef, {
        colors: colors, // 'colors' est l'objet contenant les couleurs choisies
      });
    } catch (error) {
      console.error("Error writing document: ", error);
    }
  };

  useEffect(() => {
    const fetchUserColors = async () => {
      if (!user?.uid) return;

      const userColorsRef = doc(db, "userColors", user?.uid);
      const docSnap = await getDoc(userColorsRef);

      if (docSnap.exists()) {
        const fetchedColors = docSnap.data().colors;
        // Mettre à jour les couleurs
        setColors(fetchedColors);
        // Vérifier si le thème 2 est actif
        checkCurrentTheme(fetchedColors);
      } else {
        console.log("No such document!");
      }
    };

    fetchUserColors();
  }, [user?.uid]);

  useEffect(() => {
    const rootStyles = getComputedStyle(document.documentElement);
    setDefaultColors({
      rose: rootStyles.getPropertyValue("--roseDefault").trim(),
      mauve: rootStyles.getPropertyValue("--mauveDefault").trim(),
      blanc: rootStyles.getPropertyValue("--blancDefault").trim(),
      gris: rootStyles.getPropertyValue("--grisDefault").trim(),
      grisFonce: rootStyles.getPropertyValue("--grisFonceDefault").trim(),
      noir: rootStyles.getPropertyValue("--noirDefault").trim(),
    });
  }, []);

  const checkIfDefaultColors = () => {
    return Object.keys(defaultColors).every((colorName) => {
      const currentColor = getComputedStyle(document.documentElement)
        .getPropertyValue(`--${colorName}`)
        .trim();
      return defaultColors[colorName] === currentColor;
    });
  };

  const checkCurrentTheme = (fetchedColors) => {
    const isDefaultTheme = Object.keys(defaultColors).every((colorName) => {
      return fetchedColors[colorName] === defaultColors[colorName];
    });

    setCurrentTheme(isDefaultTheme ? "theme1" : "theme2");
  };

  useEffect(() => {
    // Mettre à jour le thème actuel en fonction de la comparaison des couleurs
    const isDefault = checkIfDefaultColors();
    setCurrentTheme(isDefault ? "theme1" : "theme2");
  }, [colors, defaultColors]);

  const handleColorClick = (colorName) => {
    setShowPickers((prevState) => ({
      ...prevState,
      [colorName]: !prevState[colorName],
    }));
  };

  const handleChangeComplete = (colorName, color) => {
    setColors(prev => ({ ...prev, [colorName]: color.hex }));
    if (currentTheme === "theme2") {
      setColors((prevColors) => ({
        ...prevColors,
        [colorName]: color.hex,
      }));
      document.documentElement.style.setProperty(
        `--${colorName}Default`,
        color.hex
      );
    }
  };

  const handleThemeSelection = async (themeName) => {
    localStorage.setItem('selectedTheme', themeName);
    setCurrentTheme(themeName);
    setIsThemeOpen(false);

    if (themeName === "theme1") {
      // Appliquer les couleurs par défaut pour le thème 1
      Object.keys(defaultColors).forEach((colorName) => {
        document.documentElement.style.setProperty(
          `--${colorName}`,
          defaultColors[colorName]
        );
      });
    } else if (themeName === "theme2") {
      // Tenter de charger les couleurs personnalisées pour le thème 2
      try {
        const userColorsRef = doc(db, "userColors", user?.uid);
        const docSnap = await getDoc(userColorsRef);

        if (docSnap.exists()) {
          const fetchedColors = docSnap.data().colors;
          Object.keys(fetchedColors).forEach((colorName) => {
            // Mettre à jour les variables CSS globales pour le thème 2
            document.documentElement.style.setProperty(
              `--${colorName}`,
              fetchedColors[colorName]
            );
            setColors((prevColors) => ({
              ...prevColors,
              [colorName]: fetchedColors[colorName],
            }));
          });
        } else {
          console.log(
            "No custom colors found for theme 2. Using default colors."
          );
        }
      } catch (error) {
        console.error("Error fetching document: ", error);
      }
    }
  };

  const handleTheme = () => {
    setIsThemeOpen(!isThemeOpen);
  };

  const handleButtonClick = () => {
    if (user === null) {
      googleSignIn();
    } else {
      logOut();
    }
    handleThemeSelection("theme1");
    localStorage.setItem('selectedTheme', "theme1");
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
            <SliderPlaylists />
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
