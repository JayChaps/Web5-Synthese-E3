import React from "react";
import { Link , useLocation } from "react-router-dom";

const Nav = ({ links }) => {

    const location = useLocation();
    return (
      <nav>
        <ul className="nav">
          {links.map(({name,url}) => (
            <li data-cy={`lnk-${url}`} key={name} className={location.pathname.startsWith(url) ? "active": ""}>
              <Link to={url}>{name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  };
  
  export default Nav;