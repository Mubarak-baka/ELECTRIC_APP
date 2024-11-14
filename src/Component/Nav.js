import React from "react";
import { Link } from "react-router-dom";



function Nav() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container-fluid">
        {/* Logo */}
        <div className="navbar-logo">
          <img src="src/Component/Image/DALL·E 2024-11-11 19.25.10 - A beautiful logo design for 'Musas Electronic Shop' with a modern, clean, and sleek look. The logo includes the text 'Musas Electronic Shop' in a bold.webp" alt="logo" className="logo-image" />
        </div>

        {/* Title */}
        <div className="navbar-brand">
          <span>Musas Electronic Shop</span>
        </div>

        {/* Navigation Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/About">About</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/Cart">Cart</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
