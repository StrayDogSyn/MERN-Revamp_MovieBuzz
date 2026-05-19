import { useState, useCallback, useMemo } from 'react';

// ============================================================
// Week 7: Custom Hooks - useMovies
// ============================================================
// Custom hooks let you extract component logic into reusable
// functions. Any function starting with "use" that calls other
// hooks is a custom hook.
//
// useCallback: Memoizes a function so it keeps the same reference
//   between renders (prevents unnecessary child re-renders).
//
// useMemo: Memoizes a computed VALUE so expensive calculations
//   only run when their dependencies change.
// ============================================================

function useMovies(initialMovies = []) {
  const [movies, setMovies] = useState(initialMovies);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  // TODO: Implement addMovie using useCallback to prevent re-renders
  // useCallback returns a memoized version of the function that only
  // changes if one of its dependencies changes.
  // The empty dependency array [] means the function reference stays
  // the same across renders (it uses the functional form of setMovies).
  const addMovie = useCallback((newMovie) => {
    // TODO: Add movie with generated id, ensure genre/stars are arrays
    // Hint:
    // setMovies(prev => [...prev, {
    //   ...newMovie,
    //   id: Date.now(),
    //   genre: typeof newMovie.genre === 'string'
    //     ? newMovie.genre.split(',').map(g => g.trim()).filter(g => g.length > 0)
    //     : newMovie.genre,
    //   stars: typeof newMovie.stars === 'string'
    //     ? newMovie.stars.split(',').map(s => s.trim()).filter(s => s.length > 0)
    //     : newMovie.stars
    // }]);
  }, []);

  // TODO: Implement deleteMovie with useCallback
  const deleteMovie = useCallback((movieId) => {
    // TODO: Filter out the movie with matching id
    // Hint: setMovies(prev => prev.filter(movie => movie.id !== movieId));
  }, []);

  // TODO: Implement updateMovie with useCallback
  const updateMovie = useCallback((updatedMovie) => {
    // TODO: Map over movies and replace the one with matching id
    // Hint:
    // setMovies(prev => prev.map(movie =>
    //   movie.id === updatedMovie.id ? updatedMovie : movie
    // ));
  }, []);

  // TODO: Use useMemo to create filtered movies
  // useMemo only recalculates the filtered list when movies,
  // searchTerm, or selectedGenre change. This avoids filtering
  // on every single render.
  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      // TODO: Filter by search term (check name, director, stars array)
      // Hint:
      // const matchesSearch = searchTerm === '' ||
      //   movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //   movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
      //   (Array.isArray(movie.stars) && movie.stars.some(star =>
      //     star.toLowerCase().includes(searchTerm.toLowerCase())
      //   ));

      // TODO: Filter by selected genre (check genre array)
      // Hint:
      // const matchesGenre = selectedGenre === 'all' ||
      //   (Array.isArray(movie.genre) && movie.genre.some(genre =>
      //     genre.toLowerCase().includes(selectedGenre.toLowerCase())
      //   ));

      // TODO: Return matchesSearch && matchesGenre;
      return true; // Placeholder - implement filtering logic
    });
  }, [movies, searchTerm, selectedGenre]);

  // TODO: Use useMemo to get all unique genres from movies
  // This extracts every genre from every movie, deduplicates them,
  // and sorts alphabetically. It only recalculates when movies change.
  const allGenres = useMemo(() => {
    // TODO: Extract all genres from all movies, deduplicate, and sort
    const genres = new Set();
    movies.forEach(movie => {
      if (Array.isArray(movie.genre)) {
        movie.genre.forEach(g => genres.add(g));
      }
    });
    return ['all', ...Array.from(genres).sort()];
  }, [movies]);

  return {
    movies,
    filteredMovies,
    allGenres,
    searchTerm,
    selectedGenre,
    setSearchTerm,
    setSelectedGenre,
    addMovie,
    deleteMovie,
    updateMovie
  };
}

export default useMovies;
