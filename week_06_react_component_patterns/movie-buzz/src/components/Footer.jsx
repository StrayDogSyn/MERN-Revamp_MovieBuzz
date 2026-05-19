import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; 2025 Movie Buzz, Inc. All rights reserved.</p>
          <div className="footer-links">
            <span>About</span>
            <span>&bull;</span>
            <span>Contact</span>
            <span>&bull;</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
