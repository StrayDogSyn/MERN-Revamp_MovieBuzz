import React from 'react';
import "./movie-block.css";
import { Link } from 'react-router-dom'
import placeholderImage from '../../assets/movie-placeholder.png';

// Netflix-style MovieBlock component
function MovieBlock({ movie, deleteMovie }) {
  return (
    <div className="movie-block">
      <div className="movie-poster">
        <img 
          src={movie.poster || placeholderImage} 
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
          <p><strong>Genre:</strong> {Array.isArray(movie.genre) ? movie.genre.join(', ') : (movie.genre || 'N/A')}</p>
          <p><strong>Director:</strong> {movie.director}</p>
          <p><strong>Stars:</strong> {Array.isArray(movie.stars) ? movie.stars.join(', ') : (movie.stars || 'N/A')}</p>
        </div>
        
        <div className="movie-actions">
          <Link to={`/edit/${movie._id}`}>
            <button type="button" className="btn btn-edit">Edit</button>
          </Link>
          <button type="button" className="btn btn-delete" onClick={() => deleteMovie(movie._id)}>Delete</button>
        </div>
      </div>
    </div>
  )
};

export default MovieBlock;