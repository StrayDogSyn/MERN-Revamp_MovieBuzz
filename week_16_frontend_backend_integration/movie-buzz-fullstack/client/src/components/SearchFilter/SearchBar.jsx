import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, onSearchChange }) {
  // TODO: Students will understand how client-side search works with API data
  const handleInputChange = (e) => {
    onSearchChange(e.target.value);
  };

  const handleClear = () => {
    onSearchChange('');
  };

  return (
    <div className="search-bar">
      <div className="search-input-container">
        <input
          type="text"
          placeholder="Search movies by title, director, or stars..."
          value={searchTerm}
          onChange={handleInputChange}
          className="search-input"
        />
        {searchTerm && (
          <button 
            onClick={handleClear}
            className="clear-button"
            type="button"
            title="Clear search"
          >
            ✕
          </button>
        )}
      </div>
      {searchTerm && (
        <div className="search-info">
          <span className="search-results-text">
            🔍 Searching for: "{searchTerm}"
          </span>
        </div>
      )}
    </div>
  );
}

export default SearchBar;