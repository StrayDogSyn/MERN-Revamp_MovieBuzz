import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import SearchBar from './components/SearchBar';
import FilterControls from './components/FilterControls';
import './App.css';

// Import sample data (replace with API call after Week 16)
import moviesData from './data/movies.json';

/**
 * Movie Buzz App with Advanced Search/Filter/Sort
 *
 * This is a complete working example demonstrating:
 * - Real-time search across multiple fields
 * - Genre and rating filtering
 * - Multiple sort options
 * - Safe handling of MongoDB array fields
 */
function App() {
  // Core movie state
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search and filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Load movies on component mount
  useEffect(() => {
    // Option 1: Load from static data (for learning/testing)
    loadStaticData();

    // Option 2: Load from API (after Week 16)
    // loadFromAPI();
  }, []);

  // Load static movie data
  const loadStaticData = () => {
    try {
      setLoading(true);
      // Simulate API delay for realistic experience
      setTimeout(() => {
        setMovies(moviesData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Failed to load movies:', error);
      setLoading(false);
    }
  };

  // Load from API (uncomment after Week 16)
  // const loadFromAPI = async () => {
  //   try {
  //     setLoading(true);
  //     const response = await fetch('http://localhost:4000/api/movies');
  //     const result = await response.json();
  //     setMovies(result.data || result);
  //   } catch (error) {
  //     console.error('Failed to load movies:', error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  /**
   * Filter and sort movies based on current state
   * This function demonstrates proper handling of MongoDB array fields
   */
  const getFilteredMovies = () => {
    // Start with a copy of all movies (avoid mutating state)
    let filtered = [...movies];

    // STEP 1: Apply Search Filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();

      filtered = filtered.filter(movie => {
        // Search in movie name
        const nameMatches = movie.name?.toLowerCase().includes(term) || false;

        // Search in director name
        const directorMatches = movie.director?.toLowerCase().includes(term) || false;

        // Search in stars array (CRITICAL: Safe array handling!)
        const starsMatch =
          Array.isArray(movie.stars) &&
          movie.stars.some(star =>
            star.toLowerCase().includes(term)
          );

        // Return true if ANY field matches
        return nameMatches || directorMatches || starsMatch;
      });
    }

    // STEP 2: Apply Genre Filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie => {
        // CRITICAL: MongoDB stores genre as an array
        return (
          Array.isArray(movie.genre) &&
          movie.genre.some(g =>
            g.toLowerCase() === selectedGenre.toLowerCase()
          )
        );
      });
    }

    // STEP 3: Apply Rating Filter
    if (selectedRating !== 'all') {
      filtered = filtered.filter(movie =>
        movie.rating === selectedRating
      );
    }

    // STEP 4: Apply Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          // Alphabetical by name (A-Z)
          return a.name.localeCompare(b.name);

        case 'year':
          // By year (newest first)
          return b.year - a.year;

        case 'rating':
          // Alphabetical by rating
          return a.rating.localeCompare(b.rating);

        case 'genre':
          // By first genre in array (alphabetical)
          const genreA = (Array.isArray(a.genre) && a.genre[0]) || '';
          const genreB = (Array.isArray(b.genre) && b.genre[0]) || '';
          return genreA.localeCompare(genreB);

        default:
          return 0;
      }
    });

    return filtered;
  };

  // Get filtered and sorted movies
  const filteredMovies = getFilteredMovies();

  // Handle clear all filters
  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGenre('all');
    setSelectedRating('all');
    setSortBy('name');
  };

  // Loading state
  if (loading) {
    return (
      <div className="App">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading movies...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎬 Movie Buzz</h1>
        <p className="subtitle">Advanced Search & Filter Demo</p>
      </header>

      {/* Search Bar */}
      <SearchBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      {/* Filter Controls */}
      <FilterControls
        selectedGenre={selectedGenre}
        selectedRating={selectedRating}
        sortBy={sortBy}
        onGenreChange={setSelectedGenre}
        onRatingChange={setSelectedRating}
        onSortChange={setSortBy}
      />

      {/* Results Info */}
      <div className="results-info">
        <p>
          Showing <strong>{filteredMovies.length}</strong> of{' '}
          <strong>{movies.length}</strong> movies
        </p>
        {(searchTerm || selectedGenre !== 'all' || selectedRating !== 'all') && (
          <button
            onClick={handleClearFilters}
            className="clear-all-button"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Movie List or Empty State */}
      {filteredMovies.length > 0 ? (
        <MoviesList movies={filteredMovies} />
      ) : (
        <div className="empty-state">
          <h3>No movies found</h3>
          <p>Try adjusting your search or filters</p>
          <button onClick={handleClearFilters} className="btn-primary">
            Clear All Filters
          </button>
        </div>
      )}

      <footer className="app-footer">
        <p>
          <strong>Note:</strong> This demonstrates the Supplemental Advanced Search Feature.
          Integrate with your Movie Buzz app after completing Week 16!
        </p>
      </footer>
    </div>
  );
}

export default App;
