import React from 'react';
import { AuthProvider, useAuth } from "../../context/auhContext";
import "../../assets/scss/components/authentification/login.scss";

function Login() {
  const { user, googleSignIn, logOut } = useAuth();

  return (
    <div className="login">
      <h1 className="login-title">Connexion</h1>
      <h1 className="login-title2">Connexion</h1>
      <h1 className="login-title3">Connexion</h1>
      <h1 className="login-title4">Connexion</h1>
      <div className="button-wrapper">
        <button className="login-button" onClick={user === null ? googleSignIn : logOut}>
          <img src="src\assets\png\google-logo.png" alt="" className='logo-google'/>
          {user === null ? "Se connecter avec Google" : "Se déconnecter"}
        </button>
      </div>
    </div>
  );
}

export default Login;
