import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        {/* Brand / Logo */}
        <div className="footer__brand">
          <h2>📚 BookCollection</h2>
          <p>Manage your reading journey smarter in 2025.</p>
        </div>

        {/* Navigation Links */}
        <div className="footer__links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
          </ul>
        </div>

        {/* Contact / Social */}
        <div className="footer__social">
          <h4>Connect with Us</h4>
          <div className="social-icons">
            <a
              href="https://github.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Twitter"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} BookCollection. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
