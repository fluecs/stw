import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./header.css";

export default function TopNav() {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
  };

  // Scroll to section if hash is present on mount
  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      const sectionId = location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100); // wait for DOM
      }
    }
  }, [location]);

  const handleNavClick = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate('/#' + sectionId);
    }
  };

  return (
    <div className="topnav">
      <div className="topnav-wrapper">
        <div className="nav-left">
          <Link className="navbutton" to="">
            <img src="/logo.png" alt="Logo" />
          </Link>
          <button className="navbutton textbutton" onClick={() => handleNavClick('home')}>
            <p>Why Choose Us</p>
          </button>
          <button className="navbutton textbutton" onClick={() => handleNavClick('destinations')}>
            <p>Destinations</p>
          </button>
          <button className="navbutton textbutton" onClick={() => handleNavClick('activities')}>
            <p>Activities</p>
          </button>
          <button className="navbutton textbutton" onClick={() => handleNavClick('contact')}>
            <p>Contact</p>
          </button>
        </div>
        <div className="nav-right">
          {user ? (
            <div className="user-section">
              <Link to="/bookings" className="auth-button view-bookings-button">
                View Bookings
              </Link>
              <button onClick={handleLogout} className="auth-button logout-button">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="auth-button signin-button">
                Sign In
              </Link>
              <Link to="/register" className="auth-button signup-button">
                Sign Up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 