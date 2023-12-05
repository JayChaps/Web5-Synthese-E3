import React from "react";
import { Link, useLocation} from "react-router-dom";
import { AuthProvider, useAuth } from "../context/auhContext";
import { useEffect} from 'react';

const Nav = ({ links }) => {
  const { user,googleSignIn,logOut } = useAuth();
  const location = useLocation();

  return (
    <nav>
      <ul className="nav">
        {Array.isArray(links) && links.map(({ name, url }) => (
          <li
            data-cy={`lnk-${url}`}
            key={name}
            className={location.pathname.startsWith(url) ? "active" : ""}
          >
            <Link to={url}>{name}</Link>
          </li>
        ))}
        <button onClick={user === null ? googleSignIn : logOut}>
          {user === null ? "Se connecter" : "Se déconnecter"}
        </button>
      </ul>
    </nav>
  );
};

export default Nav;
