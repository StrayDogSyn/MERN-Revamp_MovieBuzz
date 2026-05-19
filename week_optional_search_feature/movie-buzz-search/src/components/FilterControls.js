import React from 'react';
import './FilterControls.css';

/**
 * FilterControls Component
 *
 * Provides dropdown controls for filtering by genre, rating, and sorting movies.
 *
 * Props:
 * - selectedGenre: Currently selected genre filter
 * - selectedRating: Currently selected rating filter
 * - sortBy: Currently selected sort option
 * - onGenreChange: Function called when genre changes
 * - onRatingChange: Function called when rating changes
 * - onSortChange: Function called when sort option changes
 */
function FilterControls({
  selectedGenre,
  selectedRating,
  sortBy,
  onGenreChange,
  onRatingChange,
  onSortChange
}) {
  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label htmlFor="genre-filter">Genre:</label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Genres</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="thriller">Thriller</option>
          <option value="horror">Horror</option>
          <option value="romance">Romance</option>
          <option value="animation">Animation</option>
          <option value="family">Family</option>
          <option value="crime">Crime</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="rating-filter">Rating:</label>
        <select
          id="rating-filter"
          value={selectedRating}
          onChange={(e) => onRatingChange(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Ratings</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
          <option value="NC-17">NC-17</option>
          <option value="NR">Not Rated</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-by">Sort By:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="filter-select"
        >
          <option value="name">Name (A-Z)</option>
          <option value="year">Year (Newest)</option>
          <option value="rating">Rating</option>
          <option value="genre">Genre</option>
        </select>
      </div>
    </div>
  );
}

export default FilterControls;
