import React from 'react';
import './FilterControls.css';

function FilterControls({ 
  selectedGenre, 
  onGenreChange, 
  selectedRating, 
  onRatingChange,
  sortBy,
  onSortChange,
  totalMovies,
  filteredCount,
  genres = []
}) {
  const handleGenreChange = (e) => {
    onGenreChange(e.target.value);
  };

  const handleRatingChange = (e) => {
    onRatingChange(e.target.value);
  };

  const handleSortChange = (e) => {
    onSortChange(e.target.value);
  };

  const resetFilters = () => {
    onGenreChange('all');
    onRatingChange('all');
    onSortChange('name');
  };

  return (
    <div className="filter-controls">
      <div className="filter-row">
        <div className="filter-group">
          <label htmlFor="genre-filter" className="filter-label">
            🎭 Genre:
          </label>
          <select
            id="genre-filter"
            value={selectedGenre}
            onChange={handleGenreChange}
            className="filter-select"
          >
            <option value="all">All Genres</option>
            {genres.map(genre => (
              <option key={genre} value={genre}>{genre}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="rating-filter" className="filter-label">
            🏆 Rating:
          </label>
          <select
            id="rating-filter"
            value={selectedRating}
            onChange={handleRatingChange}
            className="filter-select"
          >
            <option value="all">All Ratings</option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
            <option value="NR">Not Rated</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sort-select" className="filter-label">
            📊 Sort by:
          </label>
          <select
            id="sort-select"
            value={sortBy}
            onChange={handleSortChange}
            className="filter-select"
          >
            <option value="name">Name (A-Z)</option>
            <option value="year">Year (Newest)</option>
            <option value="rating">Rating</option>
            <option value="genre">Genre</option>
          </select>
        </div>

        <div className="filter-group">
          <button
            onClick={resetFilters}
            className="reset-filters-btn"
            type="button"
            title="Reset all filters"
          >
            🔄 Reset
          </button>
        </div>
      </div>
      
      <div className="results-summary">
        <span className="results-count">
          📽️ Showing {filteredCount} of {totalMovies} movies
        </span>
        {(selectedGenre !== 'all' || selectedRating !== 'all') && (
          <span className="active-filters">
            {selectedGenre !== 'all' && <span className="filter-tag">Genre: {selectedGenre}</span>}
            {selectedRating !== 'all' && <span className="filter-tag">Rating: {selectedRating}</span>}
          </span>
        )}
      </div>
    </div>
  );
}

export default FilterControls;