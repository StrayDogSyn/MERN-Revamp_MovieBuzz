import React from "react";

// TODO: Create a functional component called MovieBlock
// TODO: Accept 'movie' and 'index' as props using destructuring
// Hint: function MovieBlock({ movie, index }) { ... }

function MovieBlock(props) {
  // TODO: Destructure 'movie' and 'index' from props
  // Hint: const { movie, index } = props;
  return (
    <div className="trending-card">
      {/* TODO: Add the movie poster image */}
      {/* Hint: Use <img> with src="/images/movie-placeholder.png" and className="card-image" */}

      {/* TODO: Add the rank number using the index prop */}
      {/* Hint: Use <span className="card-rank">{index + 1}</span> */}

      <div className="card-content">
        {/* TODO: Display the movie name */}
        {/* Hint: Use <span className="card-title">{movie.name}</span> */}

        <div className="card-info">
          {/* TODO: Display movie year, length, and rating */}
          {/* Hint: {movie.year} | {movie.length} | Rated: {movie.rating} */}
        </div>

        <div className="card-meta">
          {/* TODO: Display the genre - remember genre is an array! */}
          {/* Hint: Use Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre */}

          {/* TODO: Display the director */}
          {/* Hint: <span className="card-director">Director: {movie.director}</span> */}
        </div>
      </div>
    </div>
  );
}

export default MovieBlock;
