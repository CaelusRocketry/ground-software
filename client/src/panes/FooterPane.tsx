import React from "react";
import Logo from "../images/logo.png"
import FooterSequence from "../components/FooterSequence";


const FooterPane = () => (
  <div className="footer">
    <img src={Logo} id="logo" alt="Logo" />
    <FooterSequence/>
  </div>
);

export default FooterPane;