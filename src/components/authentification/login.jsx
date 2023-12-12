import React from 'react';
import { motion } from 'framer-motion';
import { AuthProvider, useAuth } from "../../context/auhContext";
import "../../assets/scss/components/authentification/login.scss";

function Login() {
  const { user, googleSignIn, logOut } = useAuth();

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: 'easeInOut' } },
  };

  const titleVariants = {
    hidden: { opacity: 0.5, y: -50 },
    visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.5, ease: 'easeInOut' } },
  };

  const titleVariants2 = {
    hidden: { opacity: 0.5, y: -50 },
    visible: { opacity: 0.5, y: 0, transition: { delay: 0.3, duration: 0.6, ease: 'easeInOut' } },
  };
  const titleVariants3 = {
    hidden: { opacity: 0.5, y: -50 },
    visible: { opacity: 0.3, y: 0, transition: { delay: 0.4, duration: 0.7, ease: 'easeInOut' } },
  };
  const titleVariants4 = {
    hidden: { opacity: 0.5, y: -50 },
    visible: { opacity: 0.15, y: 0, transition: { delay: 0., duration: 0.8, ease: 'easeInOut' } },
  };

  return (
    <motion.div className="login" variants={containerVariants} initial="hidden" animate="visible">
      <motion.h1 className="login-title" variants={titleVariants}>Connexion</motion.h1>
      <motion.h1 className="login-title2" variants={titleVariants2}>Connexion</motion.h1>
      <motion.h1 className="login-title3" variants={titleVariants3}>Connexion</motion.h1>
      <motion.h1 className="login-title4" variants={titleVariants4}>Connexion</motion.h1>
      <main className="button-wrapper">
        <button className="login-button" onClick={user === null ? googleSignIn : logOut}>
          <img src="src\assets\png\google-logo.png" alt="" className='logo-google'/>
          {user === null ? "Se connecter avec Google" : "Se déconnecter"}
        </button>
      </main>
    </motion.div>
  );
}

export default Login;
