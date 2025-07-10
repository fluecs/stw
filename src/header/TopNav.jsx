import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./header.css";

export default function TopNav() {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  const scrollToSection = (sectionId) => {
    if (location.pathname === '/') {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="topnav">
      <div className="topnav-wrapper">
        <div className="nav-left">
          <Link className="navbutton" to="/">
            <img src="/logo.png" alt="Logo" />
          </Link>
          <button className="navbutton textbutton" onClick={() => scrollToSection('home')}>
            <p>Why Choose Us</p>
          </button>
          <button className="navbutton textbutton" onClick={() => scrollToSection('destinations')}>
            <p>Destinations</p>
          </button>
          <button className="navbutton textbutton" onClick={() => scrollToSection('activities')}>
            <p>Activities</p>
          </button>
          <button className="navbutton textbutton" onClick={() => scrollToSection('contact')}>
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