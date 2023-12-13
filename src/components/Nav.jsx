import React, { useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/auhContext";

import { TiHomeOutline } from "react-icons/ti";
import { PiPlaylistBold } from "react-icons/pi";
import { MdAccountCircle } from "react-icons/md";
import { MdSupervisorAccount } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import RechercheDeezer from "../pages/RechercheDeezer";
import { PlaybarContext } from "../context/playbarContext";

const Nav = () => {
  const { user, googleSignIn, logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const { isFullbarOpen, setIsFullbarOpen } = useContext(PlaybarContext);

  const links = [
    { name: "Accueil", url: "/home" },
    { name: "Profil", url: "/profil" },
    { name: "Recherche", url: "/search" },
    { name: "Vos playlists", url: "/playlist" },
  ];

  const logoUrl = "../../src/assets/img/svg/logo.svg";
  console.log(links);

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.pathname.startsWith("/search")) {
      navigate(-1);
      toggleBar();
    } else {
      navigate("/search");
      toggleBar();
    }
  };

  const toggleBar = () => {
    if(isFullbarOpen){
      setIsFullbarOpen(false)
    }
  }


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
    size: "3rem",
    color: "var(--blanc)",
  };

  // useEffect(() => {
  //   // This function will be called whenever the location changes
  //   window.scrollTo({
  //     top: 0,
  //     behavior: "smooth"
  //   });
  // }, [location]);
  
  useEffect(() => {
    // This function will be called whenever the location changes
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }, [location]);

  return (
    <nav>
      <ul className="nav">
        <li className="nav__logo">
          <Link to="/home" onClick={toggleBar}>
            <img src={logoUrl} alt="Logo" />
          </Link>
        </li>
        <li
          className={
            location.pathname.startsWith("/home")
              ? "active nav__accueil"
              : "nav__accueil"
          }
        >
          <Link to="/home" onClick={toggleBar}>
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
          <Link onClick={handleSearch}>
            <IoIosSearch {...settings} />
          </Link>
        </li>
        <li
          className={
            location.pathname.startsWith("/playlist")
              ? "active nav__playlist"
              : "nav__playlist"
          }
        >
          <Link to="/playlist" onClick={toggleBar}>
            <PiPlaylistBold {...settings} />
          </Link>
        </li>
        <li
          className={
            location.pathname.startsWith("/profil")
              ? "active nav__compte"
              : "nav__compte"
          }
        >
          <Link to="/profil" onClick={toggleBar}>
            <MdAccountCircle {...settings} />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
