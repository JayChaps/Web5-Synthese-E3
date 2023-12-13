import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Footer = ({ classe }) => {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  const handleScroll = () => {
    const footerTop = footerRef.current.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    setIsVisible(footerTop < windowHeight);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const urlLogo = "/src/assets/img/svg/logo.svg";

  return (
    <footer className={`${classe} ${isVisible ? "visible" : ""} accueil`} ref={footerRef}>
      <div className="footerinner">
      <div className="logo">
          <img src={urlLogo} alt="" />
        </div>
        <ul className="nav">
          <li className="home">
            <Link to="/home">Accueil</Link>
          </li>

          <li className="playlists">
            <Link to="/playlist">Playlist</Link>
          </li>

          <li className="profil">
            <Link to="/profil">Compte</Link>
          </li>

          <li className="search">
            <Link to="/search">Recherche</Link>
          </li>
        </ul>

        <div className="footerbas">
          <ul>
            <li>
              <div>
                <span>Vincent Lizot</span>
                <span>Développeur</span>
                <span>Front-End/Artiste</span>
                <span>8 ans</span>
              </div>
            </li>
            <li>
              <div>
                <span>Nicolas Lauzon</span>
                <span>Développeur</span>
                <span>Front-End/Artiste</span>
              </div>
            </li>
            <li>
              <div>
                <span>Jérémy Chat</span>
                <span>Développeur</span>
                <span>Front-End/Logique</span>
              </div>
            </li>
            <li>
              <div>
                <span>Kevin Le</span>
                <span>Développeur</span>
                <span>Front-End/Logique</span>
              </div>
            </li>
          </ul>
        </div>
        <div className="decofooter decoalt">
          <svg
            id="PatternCercle"
            xmlns="http://www.w3.org/2000/svg"
            width="256"
            height="256"
            viewBox="0 0 256 256"
          >
            <circle
              id="Ellipse_3"
              data-name="Ellipse 3"
              cx="29"
              cy="29"
              r="29"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_17"
              data-name="Ellipse 17"
              cx="29"
              cy="29"
              r="29"
              transform="translate(0 132)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_7"
              data-name="Ellipse 7"
              cx="29"
              cy="29"
              r="29"
              transform="translate(0 66)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_18"
              data-name="Ellipse 18"
              cx="29"
              cy="29"
              r="29"
              transform="translate(0 198)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_4"
              data-name="Ellipse 4"
              cx="29"
              cy="29"
              r="29"
              transform="translate(66)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_12"
              data-name="Ellipse 12"
              cx="29"
              cy="29"
              r="29"
              transform="translate(66 132)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_8"
              data-name="Ellipse 8"
              cx="29"
              cy="29"
              r="29"
              transform="translate(66 66)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_13"
              data-name="Ellipse 13"
              cx="29"
              cy="29"
              r="29"
              transform="translate(66 198)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_5"
              data-name="Ellipse 5"
              cx="29"
              cy="29"
              r="29"
              transform="translate(132)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_14"
              data-name="Ellipse 14"
              cx="29"
              cy="29"
              r="29"
              transform="translate(132 132)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_9"
              data-name="Ellipse 9"
              cx="29"
              cy="29"
              r="29"
              transform="translate(132 66)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_15"
              data-name="Ellipse 15"
              cx="29"
              cy="29"
              r="29"
              transform="translate(132 198)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_6"
              data-name="Ellipse 6"
              cx="29"
              cy="29"
              r="29"
              transform="translate(198)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_16"
              data-name="Ellipse 16"
              cx="29"
              cy="29"
              r="29"
              transform="translate(198 132)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_10"
              data-name="Ellipse 10"
              cx="29"
              cy="29"
              r="29"
              transform="translate(198 66)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_11"
              data-name="Ellipse 11"
              cx="29"
              cy="29"
              r="29"
              transform="translate(198 198)"
              fill="#fc5571"
              opacity="0.39"
            />
          </svg>
        </div>
        <div className="decofooter">
          <svg
            id="PatternCercle"
            xmlns="http://www.w3.org/2000/svg"
            width="256"
            height="256"
            viewBox="0 0 256 256"
          >
            <circle
              id="Ellipse_3"
              data-name="Ellipse 3"
              cx="29"
              cy="29"
              r="29"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_17"
              data-name="Ellipse 17"
              cx="29"
              cy="29"
              r="29"
              transform="translate(0 132)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_7"
              data-name="Ellipse 7"
              cx="29"
              cy="29"
              r="29"
              transform="translate(0 66)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_18"
              data-name="Ellipse 18"
              cx="29"
              cy="29"
              r="29"
              transform="translate(0 198)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_4"
              data-name="Ellipse 4"
              cx="29"
              cy="29"
              r="29"
              transform="translate(66)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_12"
              data-name="Ellipse 12"
              cx="29"
              cy="29"
              r="29"
              transform="translate(66 132)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_8"
              data-name="Ellipse 8"
              cx="29"
              cy="29"
              r="29"
              transform="translate(66 66)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_13"
              data-name="Ellipse 13"
              cx="29"
              cy="29"
              r="29"
              transform="translate(66 198)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_5"
              data-name="Ellipse 5"
              cx="29"
              cy="29"
              r="29"
              transform="translate(132)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_14"
              data-name="Ellipse 14"
              cx="29"
              cy="29"
              r="29"
              transform="translate(132 132)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_9"
              data-name="Ellipse 9"
              cx="29"
              cy="29"
              r="29"
              transform="translate(132 66)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_15"
              data-name="Ellipse 15"
              cx="29"
              cy="29"
              r="29"
              transform="translate(132 198)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_6"
              data-name="Ellipse 6"
              cx="29"
              cy="29"
              r="29"
              transform="translate(198)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_16"
              data-name="Ellipse 16"
              cx="29"
              cy="29"
              r="29"
              transform="translate(198 132)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_10"
              data-name="Ellipse 10"
              cx="29"
              cy="29"
              r="29"
              transform="translate(198 66)"
              fill="#fc5571"
              opacity="0.39"
            />
            <circle
              id="Ellipse_11"
              data-name="Ellipse 11"
              cx="29"
              cy="29"
              r="29"
              transform="translate(198 198)"
              fill="#fc5571"
              opacity="0.39"
            />
          </svg>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
