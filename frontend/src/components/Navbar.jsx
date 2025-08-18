import React from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const HandleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("user");
      navigate("/");
    }
  };

  return (
    <header className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <Link to="/dashboard" className="navbar__logo">
          📚 BookCollection
        </Link>

        {/* Navigation Links */}
        <nav className="navbar__nav" aria-label="Main navigation">
          <ul className="navbar__links">
            <li>
              <Link to="/home" className="navbar__link">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="navbar__link">
                About
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="navbar__link">
                Dashboard
              </Link>
            </li>
          </ul>
          <button className="navbar__logout" onClick={HandleLogout}>
            Logout
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
