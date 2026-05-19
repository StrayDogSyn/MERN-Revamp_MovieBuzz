import React from "react";
import "./MoviesList.css";
// TODO: Import the MovieBlock component from './MovieBlock'

function MoviesList({ movies }) {
  // TODO: Accept 'movies' as a prop from App.js (already set up above)

  return (
    <div className="trending-section">
      <h2 className="trending-title">Your Movie Collection ({movies.length} movies)</h2>
      <p className="trending-subtitle">Discover and manage your favorite films</p>

      <div className="trending-cards">
        {/* TODO: Use the .map() method to loop through the movies array */}
        {/* TODO: For each movie, render a MovieBlock component */}
        {/* TODO: Pass the movie object and index as props */}
        {/* TODO: Don't forget to add a unique 'key' prop! */}

        {/* Example of what one item looks like:
            <MovieBlock movie={movie} index={index} key={movie.id} />
        */}
      </div>
    </div>
  );
}

export default MoviesList;
