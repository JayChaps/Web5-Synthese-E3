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

  return (
    <footer className={`${classe} ${isVisible ? "visible" : ""} accueil`} ref={footerRef}>
      <div className="footerinner">
      <div className="logo">
      <svg
              id="Calque_2"
              data-name="Calque 2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1186.49 207.23"
            >
              <g id="Calque_1-2" data-name="Calque 1">
                <g>
                  <g>
                    <path
                      class="cls-3"
                      fill="#6e53a2"
                      d="m159.42,85.91c0,16.93-3.05,51.07-9.15,102.44l-56.09-7.68,1.48-21.55-31.88.89,1.48,20.08-56.68,7.38C2.85,135.51,0,100.87,0,83.55c0-23.42,7.28-42.26,21.85-56.54C36.41,12.75,55.4,5.61,78.82,5.61s42.46,7.58,57.72,22.73c15.25,15.16,22.88,34.35,22.88,57.57Zm-60.52,7.08c0-6.69-1.58-12.5-4.72-17.42-3.74-5.71-8.76-8.56-15.06-8.56-5.9,0-10.48,2.41-13.73,7.23-3.25,4.83-4.87,10.38-4.87,16.68,0,14.17.39,26.87,1.18,38.08l36.02-.59c.78-10.23,1.18-22.04,1.18-35.43Z"
                    />
                    <path
                      class="cls-3"
                      fill="#6e53a2"
                      d="m351.31,62.59c0,22.24-11.02,40.94-33.06,56.09-19.68,13.58-41.14,20.37-64.36,20.37l-10.63-23.91v70.26l-53.14-.59-2.07-116.02c-6.89,1.77-13.29,3.74-19.19,5.9l-7.09-54.62c26.17-12,62.29-18.01,108.35-18.01,21.65,0,39.85,4.53,54.62,13.58,17.71,10.83,26.57,26.47,26.57,46.94Zm-62.29,8.27c0-8.07-8.37-12.1-25.09-12.1-6.69,0-13.58.29-20.67.89v38.97c10.82-1.57,20.17-4.13,28.05-7.68,11.81-5.31,17.71-12,17.71-20.08Z"
                    />
                    <path
                      class="cls-3"
                      fill="#6e53a2"
                      d="m679.6,178.9c-37.99,2.36-67.21,3.54-87.68,3.54-10.83,0-24.5-.2-41.04-.59-1.18-23.03-1.77-46.05-1.77-69.08s1.08-56.19,3.25-101.26l54.03.29c-1.18,39.17-1.77,64.16-1.77,74.99v41.04l74.69-.59.3,51.66Z"
                    />
                    <path
                      class="cls-3"
                      fill="#6e53a2"
                      d="m823.66,178.9c-37.99,2.36-67.21,3.54-87.68,3.54-10.83,0-24.5-.2-41.04-.59-1.18-23.03-1.77-46.05-1.77-69.08s1.08-56.19,3.25-101.26l54.03.29c-1.18,39.17-1.77,64.16-1.77,74.99v41.04l74.69-.59.3,51.66Z"
                    />
                    <path
                      class="cls-3"
                      fill="#6e53a2"
                      d="m1004.34,93.59c0,25.39-8.46,47.24-25.39,65.54-17.32,18.89-38.58,28.34-63.77,28.34s-46.45-9.45-63.77-28.34c-16.93-18.3-25.39-40.15-25.39-65.54s8.56-47.33,25.68-65.83c17.12-18.5,38.28-27.75,63.47-27.75s46.35,9.25,63.47,27.75c17.12,18.5,25.68,40.45,25.68,65.83Zm-53.73,0c0-10.82-3.15-20.56-9.45-29.23-6.69-9.64-15.35-14.47-25.98-14.47s-19.09,4.83-25.98,14.47c-6.3,8.66-9.45,18.4-9.45,29.23s3.15,20.86,9.45,29.52c6.89,9.45,15.54,14.17,25.98,14.17s19.29-4.72,25.98-14.17c6.3-8.66,9.45-18.5,9.45-29.52Z"
                    />
                    <path
                      class="cls-3"
                      fill="#6e53a2"
                      d="m1186.49,17.42l-3.25,162.37-62-.89-49.6-81.78c.39,19.88.78,33.95,1.18,42.22.59,15.75,1.57,29.72,2.95,41.92l-56.39-2.66c-2.56-24.6-3.84-50.38-3.84-77.35s.19-55.6.59-86.5l66.42-2.07,48.71,89.45,3.25-86.5,51.96,1.77Z"
                    />
                  </g>
                  <g id="harpe">
                    <path
                      class="cls-1"
                      fill=" #222c32"
                      d="m444.2,138.49h-3.27V40.3h3.27v98.2Zm-8.73-98.2h-3.27v98.2h3.27V40.3Zm17.47,0h-3.27v98.2h3.27V40.3Zm8.73,0h-3.27v98.2h3.27V40.3Z"
                    />
                    <rect
                      class="cls-2"
                      fill="#fc5571"
                      x="417.46"
                      y="37.02"
                      width="58.46"
                      height="6.55"
                    />
                    <path
                      class="cls-2"
                      fill="#fc5571"
                      d="m479.65,138.49c0,3.27-3.27,3.27-3.27,3.27h-58.92s-3.27,0-3.27-3.27,3.27-3.27,3.27-3.27h58.92s3.27,0,3.27,3.27Z"
                    />
                    <path
                      class="cls-2"
                      fill="#fc5571"
                      d="m513,90.77c9.51,14.53,13.68,32.19,10.79,49.39-1.6,9.56-5.94,18.59-12.98,25.33-.9.87-2.85,2.49-2.88,2.5-4.65,3.68-10.07,6.32-15.79,7.92-8.51,3.47-17.95,6.5-25.58,8.4-13.09,3.27-19.64,22.91-19.64,22.91,0,0-6.55-19.64-19.64-22.91-7.61-1.9-17.05-4.93-25.56-8.4-5.73-1.6-11.15-4.24-15.81-7.92-.02-.02-1.96-1.64-2.86-2.5-7.04-6.74-11.37-15.78-12.98-25.33-2.9-17.2,1.28-34.86,10.79-49.39,5.34-8.17,12.01-15.27,18.51-22.5,3.14-3.49,6.46-7.04,8.85-11.1,1.87-3.16,3.32-7.54,2.37-11.23-1.55-6.09-3.57-12.11-7.23-17.3-5.02-7.38-13.58-10.72-22.01-6.91-1.87.85-3.83,2.06-5.2,3.62-1.33,1.52-1.47,2.91-1.13,4.98.54,3.16,3.29,6.2,6.3,7.27,1.77.64,1.24,3.45-.7,3.19-1.21-.02-2.59-.61-3.68-1.1-3.24-1.42-5.88-3.98-7.28-7.25-1.52-3.53-1.77-7.25-.03-10.75,1.75-3.53,4.62-6.4,7.87-8.59,7.54-5.06,17.35-6.19,25.79-2.8,8.94,3.58,15.27,11,20.15,19.02,2.68,4.42,5.22,9.39,6.06,14.57,1.11,6.82-1.31,13.37-4.39,19.36-4.44,8.64-9.89,16.71-14.17,25.43-4.42,8.97-7.33,18.54-8.97,28.39-.87,5.17-1.44,10.38-1.7,15.6-.23,4.68-.46,10.61,1.67,14.84,3.78,7.15,10.57,12.32,19.98,12.32,4.5,0,15.65-5.88,13.32-14.79-.26-1.05-.7-2.14-1.39-3.27h26.19c-.67,1.13-1.13,2.23-1.41,3.27-2.27,8.92,8.85,14.79,13.35,14.79,9.41,0,16.2-5.17,19.98-12.32,2.13-4.24,1.9-10.16,1.67-14.84-.26-5.22-.85-10.43-1.7-15.6-1.65-9.85-4.55-19.43-8.97-28.39-4.29-8.72-9.74-16.79-14.17-25.43-3.08-5.99-5.5-12.54-4.39-19.36.83-5.17,3.37-10.15,6.06-14.57,4.88-8.02,11.21-15.43,20.15-19.02,8.44-3.39,18.25-2.26,25.79,2.8,3.26,2.19,6.12,5.06,7.87,8.59,1.72,3.5,1.49,7.22-.03,10.75-1.41,3.27-4.06,5.83-7.3,7.25-1.08.49-2.45,1.08-3.68,1.1-1.93.26-2.45-2.55-.69-3.19,3.01-1.06,5.76-4.11,6.3-7.27.34-2.06.18-3.45-1.15-4.98-1.36-1.55-3.32-2.77-5.2-3.62-8.41-3.81-16.97-.47-22.01,6.91-3.65,5.19-5.66,11.21-7.22,17.3-.95,3.68.51,8.07,2.36,11.23,2.41,4.06,5.73,7.61,8.87,11.1,6.5,7.23,13.17,14.34,18.51,22.5Z"
                    />
                    <path
                      class="cls-4"
                      opacity="0.1"
                      d="m523.79,140.16c-1.6,9.56-5.94,18.59-12.98,25.33-.9.87-2.85,2.49-2.88,2.5-4.65,3.68-10.07,6.32-15.79,7.92-8.51,3.47-17.95,6.5-25.58,8.4-13.09,3.27-19.64,22.91-19.64,22.91,0,0-1.52-4.57-4.58-9.67,2.83-6.04,8.72-15.91,17.68-18.15,7.63-1.9,17.07-4.93,25.58-8.4,5.73-1.6,11.15-4.24,15.79-7.92.03-.02,1.98-1.64,2.88-2.5,7.04-6.74,11.37-15.78,12.98-25.33,2.9-17.15.29-36.79-9.16-51.31,1.73,2.21,3.39,4.47,4.93,6.82,9.51,14.53,13.68,32.19,10.79,49.39Z"
                    />
                  </g>
                </g>
              </g>
            </svg>
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
                <span>Vincent Lizotte</span>
                <span>Développeur</span>
                <span>Front-End/Artiste</span>
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
                <span>Jérémy Chaput</span>
                <span>Développeur</span>
                <span>Front-End/Logique</span>
              </div>
            </li>
            <li>
              <div>
                <span>Kevin Le Bihan</span>
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
