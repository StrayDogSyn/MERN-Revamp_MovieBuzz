import React from 'react';
import { Link } from 'react-router-dom';

// ============================================================
// MovieBlock - Working component carried forward from Week 5
// ============================================================
// Displays a single movie card with poster on left and content on right.
// genre and stars are ARRAYS: use Array.isArray() and .join(', ') for display.
//
// WEEK 6 TODO: Refactor using reusable component patterns
// -------------------------------------------------
// TODO: Replace the raw HTML structure with the Card compound component:
//
//   <Card>
//     <Card.Header>{movie.name}</Card.Header>
//     <Card.Body>
//       ... movie info, description, details ...
//     </Card.Body>
//     <Card.Footer>
//       ... action buttons ...
//     </Card.Footer>
//   </Card>
//
// TODO: Use Badge components for genre tags instead of plain text:
//   {movie.genre.map(g => <Badge key={g} variant="gold">{g}</Badge>)}
//
// TODO: Extract the action buttons into a separate MovieActions component
//   This demonstrates the "single responsibility" principle.

function MovieBlock({ movie, isFavorite, onToggleFavorite, onDeleteMovie, onEditMovie }) {
  return (
    <div className="movie-block">
      <div className="movie-poster">
        <img
          src={movie.poster || '/images/movie-placeholder.png'}
          alt={`${movie.name} poster`}
          loading="lazy"
        />
      </div>
      <div className="movie-content">
        <div className="movie-header">
          <h3>{movie.name}</h3>
        </div>
        <div className="movie-info">
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Length:</strong> {movie.length}</p>
        </div>
        <div className="movie-description">
          <p>{movie.description}</p>
        </div>
        <div className="movie-details">
          <p>
            <strong>Genre:</strong>{' '}
            {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
          </p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p>
            <strong>Stars:</strong>{' '}
            {Array.isArray(movie.stars) ? movie.stars.join(', ') : movie.stars}
          </p>
        </div>

        {/* Movie action buttons */}
        <div className="movie-actions">
          <button
            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
            onClick={() => onToggleFavorite(movie.id)}
          >
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <Link to={`/edit/${movie.id}`}>
            <button
              className="btn-edit"
              onClick={() => onEditMovie(movie.id)}
            >
              Edit
            </button>
          </Link>
          <button
            className="btn-delete"
            onClick={() => onDeleteMovie(movie.id)}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieBlock;
