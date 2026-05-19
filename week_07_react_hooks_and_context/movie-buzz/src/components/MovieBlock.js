import React from 'react';
import { useNavigate } from 'react-router-dom';

// TODO (Week 7): Import React.memo to prevent unnecessary re-renders
//   Wrap the component export: export default React.memo(MovieBlock);
//   React.memo is a higher-order component that only re-renders when props change

function MovieBlock({ movie, isFavorite, onToggleFavorite, onDeleteMovie, onEditMovie }) {
  const navigate = useNavigate();

  const handleDelete = () => {
    if (onDeleteMovie) {
      onDeleteMovie(movie.id);
    }
  };

  const handleEdit = () => {
    if (onEditMovie) {
      onEditMovie(movie.id);
    }
    navigate(`/edit/${movie.id}`);
  };

  const handleToggleFavorite = () => {
    if (onToggleFavorite) {
      onToggleFavorite(movie.id);
    }
  };

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

        <div className="movie-actions">
          <button
            className={`btn-favorite ${isFavorite ? 'active' : ''}`}
            onClick={handleToggleFavorite}
          >
            {isFavorite ? 'Unfavorite' : 'Favorite'}
          </button>
          <button className="btn-edit" onClick={handleEdit}>
            Edit
          </button>
          <button className="btn-delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieBlock;
