import React from 'react';

function Login() {
  return (
    <div className="login">
      <h1 className="login-title">Connexion</h1>
      <div className="login-options">
        <button className="login-button google">Login with Google</button>
        <button className="login-button facebook">Login with Facebook</button>
      </div>
    </div>
  );
}

export default Login;

