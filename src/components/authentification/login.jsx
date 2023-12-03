import React from 'react';

function Login() {
  return (
    <div className="login-container">
      <h1 className="login-title">Bienvenu!</h1>
      <div className="login-options">
        <button className="login-button google">Login with Google</button>
        <button className="login-button facebook">Login with Facebook</button>
      </div>
      <button className="confirmation-button">Confirm</button>
    </div>
  );
}

export default Login;
