import React from 'react';
import './SearchBar.css';

/**
 * SearchBar Component
 *
 * Provides a text input for searching movies with a clear button
 * when search term is present.
 *
 * Props:
 * - searchTerm: Current search value
 * - onSearchChange: Function to call when search changes
 */
function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies, directors, or actors..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
        aria-label="Search movies"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="clear-button"
          aria-label="Clear search"
          title="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
