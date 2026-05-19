import React, { useState } from 'react';

function MovieBlock({ movie, isFavorite, onToggleFavorite, onDelete }) {
  // TODO: Students will add state for expanded description
  const [isExpanded, setIsExpanded] = useState(false);

  // TODO: Students will create click handler for expand/collapse
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`movie-block ${isExpanded ? 'expanded' : ''}`}>
      <div className="movie-poster">
        <img 
          src={movie.poster || '/images/movie-placeholder.png'} 
          alt={`${movie.name} poster`}
          loading="lazy"
        />
        {/* TODO: Students will add heart icon that changes based on isFavorite prop */}
        <button 
          className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
          onClick={onToggleFavorite}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>
      <div className="movie-content">
        <div className="movie-header">
          <h3>{movie.name}</h3>
          {/* TODO: Students will add expand/collapse button */}
          <button 
            className="expand-btn"
            onClick={toggleExpanded}
            title={isExpanded ? 'Show less' : 'Show more'}
          >
            {isExpanded ? '▲' : '▼'}
          </button>
        </div>
        <div className="movie-info">
          <p><strong>Year:</strong> {movie.year}</p>
          <p><strong>Rating:</strong> {movie.rating}</p>
          <p><strong>Length:</strong> {movie.length}</p>
        </div>
        
        {/* TODO: Students will add conditional rendering for expanded content */}
        {isExpanded && (
          <div className="movie-expanded-content">
            <div className="movie-description">
              <p><strong>Description:</strong> {movie.description}</p>
            </div>
            <div className="movie-details">
              <p><strong>Genre:</strong> {movie.genre.join(', ')}</p>
              <p><strong>Director:</strong> {movie.director}</p>
              <p><strong>Stars:</strong> {movie.stars.join(', ')}</p>
            </div>
          </div>
        )}
        
        {/* TODO: Students can add a preview description when collapsed */}
        {!isExpanded && (
          <div className="movie-preview">
            <p className="description-preview">
              {movie.description.length > 100 
                ? `${movie.description.substring(0, 100)}...` 
                : movie.description}
            </p>
            <p className="genre-preview">
              <strong>Genre:</strong> {movie.genre.join(', ')}
            </p>
          </div>
        )}
        
        {/* TODO: Students will add delete button (preview for Week 5) */}
        <div className="movie-actions">
          <button 
            className="delete-btn"
            onClick={onDelete}
            title="Delete this movie"
          >
            🗑️ Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default MovieBlock;