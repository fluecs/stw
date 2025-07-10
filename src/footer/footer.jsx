import React from "react";
import "./foot.css";
const Footer = () => {
  return (
    <footer>
<nav className="footer-nav">
        <a href="/">Home</a>
        <a href="/locations">Destinations</a>
        <a href="/activities">Activities</a>
        <a href="/team">Meet the Teams</a>
      </nav>

<div className="footer-box">
      <p>&copy; {new Date().getFullYear()} See The World. All rights reserved.</p>
      </div>
    </footer>
  );
};



export default Footer;