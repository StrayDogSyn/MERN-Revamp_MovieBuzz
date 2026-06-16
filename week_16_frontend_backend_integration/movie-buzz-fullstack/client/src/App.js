import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import MoviesList from './components/MoviesList/MoviesList';
import MovieForm from './components/MovieForm/MovieForm';
import SearchBar from './components/SearchFilter/SearchBar';
import FilterControls from './components/SearchFilter/FilterControls';
import { movieService } from './services/movieService';

function App() {
  const navigate = useNavigate();

  // State management
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  // Search and filter state (from Week 4 - now with API data!)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Fetch movies when component mounts
  useEffect(() => {
    fetchMovies();
  }, []);

  // READ: Fetch all movies from API
  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Students will implement
      // Step 1: Call movieService.getAll()
      // const moviesData = await movieService.getAll();

      // Step 2: Update movies state with fetched data
      // setMovies(moviesData);

      // Placeholder - remove when implementing
      console.log('TODO: Implement fetchMovies');
      setMovies([
        {
          _id: '1',
          name: 'Sample Movie',
          year: 2024,
          rating: 'PG-13',
          description: 'This is a placeholder movie. Implement API integration to see real movies!',
          genre: ['Action'],
          director: 'John Doe',
          stars: ['Jane Doe']
        }
      ]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // CREATE: Add new movie — called by MovieForm at /add
  const handleAddMovie = async (movieData) => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Students will implement
      // Step 1: Call movieService.create(movieData)
      // const newMovie = await movieService.create(movieData);

      // Step 2: Refresh movies list or add to state
      // await fetchMovies(); // Option 1: Refetch all
      // OR
      // setMovies([...movies, newMovie]); // Option 2: Add to state

      // Step 3: Show success message (MovieForm navigates back to '/' after submission)
      // setSuccessMessage('Movie added successfully!');

      console.log('TODO: Implement handleAddMovie', movieData);
      setSuccessMessage('TODO: Connect to API to add movie');
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw so MovieForm can display the error
    } finally {
      setLoading(false);
    }
  };

  // UPDATE: Edit existing movie — called by MovieForm at /edit/:movieId
  // Receives (id, movieData) where id comes from the :movieId URL param
  const handleUpdateMovie = async (id, movieData) => {
    try {
      setLoading(true);
      setError(null);

      // TODO: Students will implement
      // Step 1: Call movieService.update(id, movieData)
      // const updatedMovie = await movieService.update(id, movieData);

      // Step 2: Update movie in state
      // setMovies(movies.map(movie =>
      //   movie._id === id ? updatedMovie : movie
      // ));

      // Step 3: Show success message (MovieForm navigates back to '/' after submission)
      // setSuccessMessage('Movie updated successfully!');

      console.log('TODO: Implement handleUpdateMovie', id, movieData);
      setSuccessMessage('TODO: Connect to API to update movie');
    } catch (err) {
      setError(err.message);
      throw err; // Re-throw so MovieForm can display the error
    } finally {
      setLoading(false);
    }
  };

  // DELETE: Remove movie
  const handleDeleteMovie = async (id) => {
    try {
      if (!window.confirm('Are you sure you want to delete this movie?')) {
        return;
      }

      setLoading(true);
      setError(null);

      // TODO: Students will implement
      // Step 1: Call movieService.delete(id)
      // await movieService.delete(id);

      // Step 2: Remove movie from state
      // setMovies(movies.filter(movie => movie._id !== id));

      // Step 3: Show success message
      // setSuccessMessage('Movie deleted successfully!');

      console.log('TODO: Implement handleDeleteMovie', id);
      setSuccessMessage('TODO: Connect to API to delete movie');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Clear success message after delay
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(''), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  // Filter and sort movies (combining Week 4 logic with API data)
  const getFilteredAndSortedMovies = () => {
    let filteredMovies = movies.filter(movie => {
      const matchesSearch = searchTerm === '' ||
        movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(movie.stars) && movie.stars.some(star =>
          star.toLowerCase().includes(searchTerm.toLowerCase())
        ));

      const matchesGenre = selectedGenre === 'all' ||
        (Array.isArray(movie.genre) && movie.genre.some(genre =>
          genre.toLowerCase().includes(selectedGenre.toLowerCase())
        ));

      const matchesRating = selectedRating === 'all' || movie.rating === selectedRating;

      return matchesSearch && matchesGenre && matchesRating;
    });

    filteredMovies.sort((a, b) => {
      switch(sortBy) {
        case 'name': return a.name.localeCompare(b.name);
        case 'year': return b.year - a.year;
        case 'rating': return a.rating.localeCompare(b.rating);
        case 'genre': {
          const genreA = Array.isArray(a.genre) && a.genre.length > 0 ? a.genre[0] : '';
          const genreB = Array.isArray(b.genre) && b.genre.length > 0 ? b.genre[0] : '';
          return genreA.localeCompare(genreB);
        }
        default: return 0;
      }
    });

    return filteredMovies;
  };

  const filteredAndSortedMovies = getFilteredAndSortedMovies();

  return (
    <div className="App">
      <header className="App-header">
        <h1>🎬 Movie Buzz</h1>
        <p className="subtitle">Your Netflix-Style Movie Database</p>
      </header>

      <main className="main-content">
        {/* Success Message */}
        {successMessage && (
          <div className="success-message">
            <p>{successMessage}</p>
            <button onClick={() => setSuccessMessage('')}>×</button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={fetchMovies}>Retry</button>
          </div>
        )}

        {/* Loading Indicator */}
        {loading && <div className="loading-state"><p>Loading...</p></div>}

        {/*
          Routes:
            /              — movie list with search/filter
            /add           — add new movie form
            /edit/:movieId — edit existing movie form
        */}
        <Routes>
          <Route path="/" element={
            <>
              {/* Search and Filter Controls (only show when movies exist) */}
              {movies.length > 0 && (
                <>
                  <SearchBar
                    searchTerm={searchTerm}
                    onSearchChange={setSearchTerm}
                  />
                  <FilterControls
                    selectedGenre={selectedGenre}
                    onGenreChange={setSelectedGenre}
                    selectedRating={selectedRating}
                    onRatingChange={setSelectedRating}
                    sortBy={sortBy}
                    onSortChange={setSortBy}
                    totalMovies={movies.length}
                    filteredCount={filteredAndSortedMovies.length}
                  />
                </>
              )}

              <div className="actions">
                <button className="btn btn-primary" onClick={() => navigate('/add')}>
                  + Add New Movie
                </button>
                <button className="btn btn-secondary" onClick={fetchMovies}>
                  🔄 Refresh
                </button>
              </div>

              {/* Movies List */}
              {!loading && (
                <MoviesList
                  movies={filteredAndSortedMovies}
                  onDelete={handleDeleteMovie}
                />
              )}

              {/* Empty State — no movies at all */}
              {!loading && movies.length === 0 && (
                <div className="empty-state">
                  <h2>No movies yet!</h2>
                  <p>Add your first movie to get started.</p>
                </div>
              )}

              {/* Empty State — filters produced no results */}
              {!loading && movies.length > 0 && filteredAndSortedMovies.length === 0 && (
                <div className="empty-state">
                  <h2>No movies match your filters</h2>
                  <p>Try adjusting your search terms or filters to see more results.</p>
                  <button
                    className="btn btn-secondary"
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedGenre('all');
                      setSelectedRating('all');
                      setSortBy('name');
                    }}
                  >
                    Clear All Filters
                  </button>
                </div>
              )}
            </>
          } />

          {/* Add Movie — MovieForm calls handleAddMovie(movieData) on submit */}
          <Route path="/add" element={
            <MovieForm
              onSubmit={handleAddMovie}
              movies={movies}
            />
          } />

          {/* Edit Movie — MovieForm calls handleUpdateMovie(movieId, movieData) on submit */}
          <Route path="/edit/:movieId" element={
            <MovieForm
              onSubmit={handleUpdateMovie}
              movies={movies}
              isEditing={true}
            />
          } />
        </Routes>
      </main>

      <footer className="App-footer">
        <p>Week 16: Full-Stack Integration</p>
      </footer>
    </div>
  );
}

export default App;
