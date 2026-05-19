import React from 'react';
import MovieBlock from './MovieBlock';

// TODO (Week 7): Import useMovieContext from '../context/MovieContext'
//   Then get movies, favorites, and dispatch from context
//   instead of receiving them as props

// TODO (Week 7): Import useMemo from 'react' and use it to memoize
//   the rendered movie list to avoid unnecessary re-renders

function MoviesList({ movies, favoriteIds, onToggleFavorite, onDeleteMovie, onEditMovie }) {
  // TODO (Week 7): Replace props with context
  //   const { state, dispatch } = useMovieContext();
  //   const { movies, favorites } = state;

  if (!movies || movies.length === 0) {
    return (
      <div className="no-movies">
        <h3>No Movies Found</h3>
        <p>Add some movies to get started!</p>
      </div>
    );
  }

  return (
    <div className="movies-list">
      {movies.map(movie => (
        <MovieBlock
          key={movie.id}
          movie={movie}
          isFavorite={favoriteIds ? favoriteIds.includes(movie.id) : false}
          onToggleFavorite={onToggleFavorite}
          onDeleteMovie={onDeleteMovie}
          onEditMovie={onEditMovie}
        />
      ))}
    </div>
  );
}

export default MoviesList;
