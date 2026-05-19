import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MoviesList.css";
import moviePlaceholder from "../../assets/movie-placeholder.png";

function MoviesList({ movies, onDelete }) {
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Handle empty state
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <h2>🎬 No Movies Yet!</h2>
        <p>Your movie collection is empty. Start building your library by adding your first movie.</p>
        <Link to="/add">
          <button className="btn btn-primary">Add Your First Movie</button>
        </Link>
      </div>
    );
  }

  const handleMovieClick = (movie) => {
    setSelectedMovie(selectedMovie?._id === movie._id ? null : movie);
  };

  return (
    <div className="trending-section">
      <h2 className="trending-title">Your Movie Collection ({movies.length} movies)</h2>
      <p className="trending-subtitle">Discover and manage your favorite films</p>
      <div className="trending-cards">
        {movies.map((movie, index) => (
          <div className="trending-card" key={movie._id} onClick={() => handleMovieClick(movie)}>
            <img src={movie.poster || moviePlaceholder} alt={movie.name} className="card-image" />
            <span className="card-rank">{index + 1}</span>
            <div className="card-content">
              <span className="card-title">{movie.name}</span>
              <div className="card-info">
                {movie.year} | {movie.length} | Rated: {movie.rating}
              </div>
              <div className="card-meta">
                <span className="card-genre">{Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}</span>
                <span className="card-director">Director: {movie.director}</span>
              </div>
              <div className="card-actions">
                <Link to={`/edit/${movie._id}`} className="edit-btn">Edit</Link>
                <button onClick={(e) => { e.stopPropagation(); onDelete(movie._id); }} className="delete-btn">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="movie-description-box">
        {selectedMovie ? (
          <>
            <h3>{selectedMovie.name} - Description</h3>
            <p>{selectedMovie.description}</p>
            <div className="description-stars">
              <strong>Stars:</strong> {Array.isArray(selectedMovie.stars) ? selectedMovie.stars.join(', ') : selectedMovie.stars}
            </div>
          </>
        ) : (
          <div className="description-placeholder">
            <h3>📽️ Movie Details</h3>
            <p>Click on a movie card above to display the description and stars information.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MoviesList;