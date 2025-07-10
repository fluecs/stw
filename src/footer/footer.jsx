import React from "react";
import "./foot.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
<nav className="footer-nav">
        <Link to="/">Home</Link>
        <Link to="/locations">Destinations</Link>
        <Link to="/activities">Activities</Link>
        <Link to="/team">Meet the Teams</Link>
      </nav>

<div className="footer-box">
      <p>&copy; {new Date().getFullYear()} See The World. All rights reserved.</p>
      </div>
    </footer>
  );
};



export default Footer;