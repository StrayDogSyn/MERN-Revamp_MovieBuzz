import React from 'react';
import MovieBlock from './MovieBlock';

// ============================================================
// MoviesList - Working component carried forward from Week 5
// ============================================================
// This component receives a list of movies and renders MovieBlock for each.
// It also passes down favorite, delete, and edit handler props.
//
// WEEK 6 TODO: Refactor using component patterns
// -------------------------------------------------
// TODO: Consider using the Container/Presentational pattern here.
//   - MoviesList could become the "container" (handles logic)
//   - MovieBlock stays as the "presentational" component (handles display)
//
// TODO: Add conditional rendering for loading and error states
//   - If movies is empty, show an empty state message
//   - You could use the LoadingSpinner and ErrorMessage components here
//
// TODO: Use the Card compound component inside MovieBlock
//   - Wrap movie data in <Card>, <Card.Header>, <Card.Body>, <Card.Footer>

function MoviesList({ movies, favoriteIds, onToggleFavorite, onDeleteMovie, onEditMovie }) {
  // Empty state when no movies exist
  if (!movies || movies.length === 0) {
    return (
      <div className="empty-state">
        <h2>No Movies Yet!</h2>
        <p>Your movie collection is empty. Add some movies to get started!</p>
      </div>
    );
  }

  return (
    <div className="movies-list">
      {movies.map(movie => (
        <MovieBlock
          key={movie.id}
          movie={movie}
          isFavorite={favoriteIds.includes(movie.id)}
          onToggleFavorite={onToggleFavorite}
          onDeleteMovie={onDeleteMovie}
          onEditMovie={onEditMovie}
        />
      ))}
    </div>
  );
}

export default MoviesList;
