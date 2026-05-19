import React, { useState } from "react";
import "./MoviesList.css";

function MoviesList({ movies }) {
  // TODO: Students will implement selected movie state
  const [selectedMovie, setSelectedMovie] = useState(null);

  // TODO: Students will implement this click handler
  const handleMovieClick = (movie) => {
    setSelectedMovie(selectedMovie?.id === movie.id ? null : movie);
  };

  // TODO: Students will learn about conditional rendering
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <h2>🎬 No Movies Yet!</h2>
        <p>Add some movies to get started!</p>
      </div>
    );
  }

  return (
    <div className="trending-section">
      <h2 className="trending-title">Your Movie Collection ({movies.length} movies)</h2>
      <p className="trending-subtitle">Discover and manage your favorite films</p>
      
      <div className="trending-cards">
        {/* TODO: Students will learn about the map function and event handling */}
        {movies.map((movie, index) => (
          <div className="trending-card" key={movie.id} onClick={() => handleMovieClick(movie)}>
            <img 
              src={movie.poster || "/images/movie-placeholder.png"} 
              alt={movie.name} 
              className="card-image" 
            />
            <span className="card-rank">{index + 1}</span>
            <div className="card-content">
              <span className="card-title">{movie.name}</span>
              <div className="card-info">
                {movie.year} | {movie.length} | Rated: {movie.rating}
              </div>
              <div className="card-meta">
                <span className="card-genre">{movie.genre}</span>
                <span className="card-director">Director: {movie.director}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* TODO: Students will learn about conditional rendering with state */}
      <div className="movie-description-box">
        {selectedMovie ? (
          <>
            <h3>{selectedMovie.name} - Description</h3>
            <p>{selectedMovie.description}</p>
            <div className="description-stars">
              <strong>Stars:</strong> {selectedMovie.stars}
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