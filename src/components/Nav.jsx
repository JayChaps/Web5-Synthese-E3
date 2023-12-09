import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auhContext";

import { TiHomeOutline } from "react-icons/ti";
import { PiPlaylistBold } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { MdSupervisorAccount } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import RechercheDeezer from "../pages/RechercheDeezer";

const Nav = () => {
 
  const location = useLocation();
  const navigate = useNavigate();

  const links = [
    { name: "Accueil", url: "/home" },
    { name: "Profil", url: "/profil" },
    { name: "Recherche", url: "/search" },
    { name: "Vos playlists", url: "/playlist" },
  ];

  const icones = [];

  console.log(links);
  //   useEffect(()=>{
  //     if(user !== null){
  //         navigate('/home');
  //     }
  //     else
  //     {
  //         navigate('/')
  //     }
  // },[user])

  const settings = {
    size: "2rem",
    color: "var(--blanc)",
  };

  return (
    <nav>
      <ul className="nav">
        <li className="nav__logo"></li>
        <li
          className={
            location.pathname.startsWith("/home")
              ? "active nav__accueil"
              : "nav__accueil"
          }
        >
          <Link to="/home">
            <TiHomeOutline {...settings} />
          </Link>
        </li>
        <li
          className={
            location.pathname.startsWith("/search")
              ? "active nav__recherche"
              : "nav__recherche"
          }
        >
          <button >
            <IoIosSearch {...settings} />
          </button>
          {/* <RechercheDeezer /> */}
        </li>
        <li
          className={
            location.pathname.startsWith("/playlist")
              ? "active nav__playlist"
              : "nav__playlist"
          }
        >
          <Link to="/playlist">
            <PiPlaylistBold {...settings} />
          </Link>
        </li>
        <li className="nav__contact">
          <Link to="/profil">
            <MdSupervisorAccount {...settings} />
          </Link>
        </li>
        <li
          className={
            location.pathname.startsWith("/profil")
              ? "active nav__compte"
              : "nav__compte"
          }
        >
          <Link to="/profil">
            <MdAccountCircle {...settings} />
          </Link>

        </li>
      </ul>
    </nav>
  );
};

export default Nav;
