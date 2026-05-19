import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <Link to="/" className="logo-section">
          <h1>🎬 Movie Buzz</h1>
          <p>Where all the best movies live...</p>
        </Link>

        <nav className="header-nav">
          <Link to="/" className="btn btn-secondary">Home</Link>
          <Link to="/add" className="btn btn-primary">Add Movie</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
