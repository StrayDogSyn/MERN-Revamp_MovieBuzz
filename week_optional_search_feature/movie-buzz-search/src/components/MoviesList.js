import React from 'react';
import './MoviesList.css';

/**
 * MoviesList Component
 *
 * Displays a grid of movie cards with proper handling of array fields
 * (genre and stars from MongoDB)
 *
 * Props:
 * - movies: Array of movie objects to display
 */
function MoviesList({ movies }) {
  if (!movies || movies.length === 0) {
    return null;
  }

  return (
    <div className="movies-list">
      {movies.map(movie => (
        <div key={movie.id || movie._id} className="movie-card">
          <div className="movie-header">
            <h3 className="movie-title">{movie.name}</h3>
            <span className="movie-year">{movie.year}</span>
          </div>

          <div className="movie-meta">
            <span className="movie-rating">{movie.rating}</span>
            <span className="movie-length">{movie.length}</span>
          </div>

          <p className="movie-description">{movie.description}</p>

          <div className="movie-details">
            <div className="detail-row">
              <strong>Director:</strong>
              <span>{movie.director}</span>
            </div>

            {/* IMPORTANT: Safe handling of genre array */}
            <div className="detail-row">
              <strong>Genre:</strong>
              <span>
                {Array.isArray(movie.genre)
                  ? movie.genre.join(', ')
                  : movie.genre || 'N/A'}
              </span>
            </div>

            {/* IMPORTANT: Safe handling of stars array */}
            <div className="detail-row">
              <strong>Stars:</strong>
              <span>
                {Array.isArray(movie.stars)
                  ? movie.stars.join(', ')
                  : movie.stars || 'N/A'}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MoviesList;
