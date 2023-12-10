import React from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/auhContext";
import { useEffect} from 'react';

import Acceuil from "../components/PageAcceuil/Acceuil";

const Nav = ({ links }) => {
  const { user,googleSignIn,logOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
    

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
        {user === null && (
          <div>
            <Acceuil/>
          </div>
        )}
        <button onClick={user === null ? googleSignIn : logOut}>
          {user === null ? "Se connecter avec Google" : "Se déconnecter"}
        </button>
      </ul>
    </nav>
  );
};

export default Nav;
