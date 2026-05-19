import React from 'react';
import './Header.css';

// TODO: Students will import Link from react-router-dom in Step 2
// import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        {/* TODO: Students will convert this to a Link component */}
        <div className="logo-section">
          <h1>🎬 Movie Buzz</h1>
          <p>Where all the best movies live...</p>
        </div>
        
        <nav className="header-nav">
          {/* TODO: Students will add navigation links here */}
          <button className="btn btn-secondary">Home</button>
          <button className="btn btn-primary">Add Movie</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;