import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-content">
          <p>&copy; 2025 Movie Buzz, Inc. All rights reserved.</p>
          <div className="footer-links">
            {/* TODO: Students can add additional footer links here */}
            <span>About</span>
            <span>•</span>
            <span>Contact</span>
            <span>•</span>
            <span>Privacy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;