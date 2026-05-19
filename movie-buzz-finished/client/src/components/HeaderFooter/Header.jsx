import React from 'react';
import './header.css';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <div className="logo-section">
            <div className="logo-text">
              <h1>🎬 Movie Buzz</h1>
              <p>Where all the best movies live...</p>
            </div>
          </div>
        </Link>
        
        <nav className="header-nav">
          <Link to="/" className="nav-link">
            <button className="btn btn-secondary">Home</button>
          </Link>
          <Link to="/add" className="nav-link">
            <button className="btn btn-primary">Add Movie</button>
          </Link>
        </nav>
      </div>
    </header>
  )
};

export default Header;