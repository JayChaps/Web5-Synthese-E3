import React from "react";

const Footer = ({ classe }) => {

  const urlLogo = "/src/assets/img/svg/logo.svg";
  return (
    <footer className={classe + " accueil"}>
      <div className="footerinner">
      <div className="logo">
        <img src={urlLogo} alt="" />
      </div>


      </div>
    </footer>
  );
};

export default Footer;
