import React, { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import axios from 'axios';
import MoviesList from './components/MoviesList/MoviesList';
import MovieForm from './components/MovieForm/MovieForm';
import Header from './components/HeaderFooter/Header';
import Footer from './components/HeaderFooter/Footer';
import SearchBar from './components/SearchFilter/SearchBar';
import FilterControls from './components/SearchFilter/FilterControls';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import './main.css';

function App() {
  React.useEffect(() => {
    document.title = '🎬 Movie Buzz';
  }, []);

  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const fetchMovies = () => {
    setLoading(true);
    setError(null);
    axios.get('/api/movies')
      .then(response => {
        setMovies(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching movies:', err);
        setError('Could not load movies. Is the server running?');
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const onDelete = (movieId) => {
    axios.delete(`/api/movie/${movieId}`)
      .then(({ data }) => {
        setMovies(prev => prev.filter(movie => movie._id !== data._id));
      })
      .catch(err => {
        console.error('Error deleting movie:', err);
        setError('Failed to delete movie. Please try again.');
      });
  };

  const onAdd = (movie) => {
    return axios.post('/api/movie/new', movie)
      .then(response => {
        setMovies(prev => [...prev, response.data]);
      });
    // Note: errors propagate to MovieForm's try/catch — do not catch here
  };

  const editMovie = (movie) => {
    return axios.put(`/api/movie/${movie._id}`, movie)
      .then(response => {
        setMovies(prev => prev.map(m => m._id === movie._id ? response.data : m));
      });
    // Note: errors propagate to MovieForm's try/catch — do not catch here
  };

  const getFilteredAndSortedMovies = () => {
    let filtered = movies.filter(movie => {
      const matchesSearch = searchTerm === '' ||
        movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (movie.director || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(movie.stars) && movie.stars.some(s =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        ));

      const matchesGenre = selectedGenre === 'all' ||
        (Array.isArray(movie.genre) && movie.genre.some(g =>
          g.toLowerCase().includes(selectedGenre.toLowerCase())
        ));

      const matchesRating = selectedRating === 'all' || movie.rating === selectedRating;

      return matchesSearch && matchesGenre && matchesRating;
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':   return a.name.localeCompare(b.name);
        case 'year':   return b.year - a.year;
        case 'rating': return (a.rating || '').localeCompare(b.rating || '');
        case 'genre': {
          const ga = Array.isArray(a.genre) && a.genre.length ? a.genre[0] : '';
          const gb = Array.isArray(b.genre) && b.genre.length ? b.genre[0] : '';
          return ga.localeCompare(gb);
        }
        default: return 0;
      }
    });

    return filtered;
  };

  const filteredMovies = getFilteredAndSortedMovies();

  // Derive genre list dynamically from actual data
  const allGenres = [...new Set(movies.flatMap(m => Array.isArray(m.genre) ? m.genre : []))].sort();

  if (loading) {
    return (
      <Router>
        <div className="app-container">
          <Header />
          <main className="main-content">
            <div className="loading-state">
              <h2>Loading movies...</h2>
              <p>Please wait while we fetch your favorites.</p>
            </div>
          </main>
          <Footer />
        </div>
      </Router>
    );
  }

  const movieProps = { movies: filteredMovies, onDelete };
  const editProps  = { movies, editMovie };

  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          {error && (
            <div className="error-banner" style={{
              background: '#2d0a0a', border: '1px solid #ef4444', borderRadius: '8px',
              padding: '12px 18px', margin: '16px 0', color: '#fca5a5',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
              <span>⚠️ {error}</span>
              <button
                onClick={fetchMovies}
                style={{ background: '#ef4444', color: '#fff', border: 'none',
                  borderRadius: '4px', padding: '4px 12px', cursor: 'pointer' }}
              >
                Retry
              </button>
            </div>
          )}
          <Routes>
            <Route path="/" element={
              <>
                <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
                <FilterControls
                  selectedGenre={selectedGenre}
                  onGenreChange={setSelectedGenre}
                  selectedRating={selectedRating}
                  onRatingChange={setSelectedRating}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                  totalMovies={movies.length}
                  filteredCount={filteredMovies.length}
                  genres={allGenres}
                />
                <MoviesList {...movieProps} />
              </>
            } />
            <Route path="/add"       element={<MovieForm addMovie={onAdd} />} />
            <Route path="/edit/:movieId" element={<MovieForm {...editProps} />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

const rootContainer = document.getElementById('root');
const root = createRoot(rootContainer);
root.render(
  <ErrorBoundary>
    <App />
  </ErrorBoundary>
);