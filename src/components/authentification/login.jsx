import React from 'react';
import "../../assets/scss/components/authentification/login.scss";
function Login() {
  return (
    <div className="login">
      <h1 className="login-title">Connexion</h1>
      <div className="login-options">
        <button className="login-button google">Login with Google</button>
      </div>
      
    </div>
    
  );
}

export default Login;

