import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesList from './components/MoviesList';
import MovieForm from './components/MovieForm';
import './App.css';

// ============================================================
// WEEK 6 TODO: Import your new component pattern files
// ============================================================
// TODO: Import the Layout component you will build
// import Layout from './components/Layout';
//
// TODO: Import the Card component you will build
// import Card from './components/Card';
//
// TODO: Import the LoadingSpinner component you will build
// import LoadingSpinner from './components/LoadingSpinner';
//
// TODO: Import the ErrorMessage component you will build
// import ErrorMessage from './components/ErrorMessage';

// Initial movie data carried forward from Week 5
const initialMovies = [
  {
    id: 1,
    name: "The Matrix",
    year: 1999,
    rating: "R",
    length: "136 minutes",
    description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    genre: ["Action", "Sci-Fi"],
    director: "The Wachowskis",
    stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    poster: "/images/movie-placeholder.png"
  },
  {
    id: 2,
    name: "Inception",
    year: 2010,
    rating: "PG-13",
    length: "148 minutes",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    stars: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    poster: "/images/movie-placeholder.png"
  },
  {
    id: 3,
    name: "The Dark Knight",
    year: 2008,
    rating: "PG-13",
    length: "152 minutes",
    description: "When the menace known as The Joker wreaks havoc and chaos on Gotham, Batman must face one of his greatest tests.",
    genre: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    stars: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    poster: "/images/movie-placeholder.png"
  }
];

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [editingMovie, setEditingMovie] = useState(null);

  // ============================================================
  // WEEK 6 TODO: Add loading and error state management
  // ============================================================
  // TODO: Add isLoading state to demonstrate conditional rendering
  // const [isLoading, setIsLoading] = useState(false);
  //
  // TODO: Add error state to demonstrate error boundary patterns
  // const [error, setError] = useState(null);

  // Toggle favorite handler (from Week 4/5)
  const toggleFavorite = (movieId) => {
    setFavoriteIds(prevFavorites => {
      if (prevFavorites.includes(movieId)) {
        return prevFavorites.filter(id => id !== movieId);
      } else {
        return [...prevFavorites, movieId];
      }
    });
  };

  // Add new movie handler (from Week 5)
  const handleAddMovie = (newMovie) => {
    const movieWithId = {
      ...newMovie,
      id: Date.now(),
      // Ensure arrays for genre and stars
      genre: typeof newMovie.genre === 'string'
        ? newMovie.genre.split(',').map(g => g.trim()).filter(g => g.length > 0)
        : newMovie.genre,
      stars: typeof newMovie.stars === 'string'
        ? newMovie.stars.split(',').map(s => s.trim()).filter(s => s.length > 0)
        : newMovie.stars
    };
    setMovies([...movies, movieWithId]);
  };

  // Delete movie handler (from Week 5)
  const handleDeleteMovie = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    const confirmDelete = window.confirm(`Are you sure you want to delete "${movie.name}"?`);
    if (confirmDelete) {
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
      setFavoriteIds(prevFavorites => prevFavorites.filter(id => id !== movieId));
    }
  };

  // Edit movie handler (from Week 5)
  const handleEditMovie = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    setEditingMovie(movie);
  };

  // Update movie handler (from Week 5)
  const handleUpdateMovie = (updatedMovie) => {
    setMovies(prevMovies =>
      prevMovies.map(movie =>
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
    setEditingMovie(null);
  };

  // ============================================================
  // WEEK 6 TODO: Refactor the JSX below using component patterns
  // ============================================================
  //
  // PATTERN 1 - Component Composition with children prop:
  //   Replace the <div className="app"> wrapper with your <Layout> component
  //   so that Header and Footer are handled by Layout, not here in App.
  //
  //   Before (current):
  //     <div className="app">
  //       <Header />
  //       <main>...</main>
  //       <Footer />
  //     </div>
  //
  //   After (refactored):
  //     <Layout>
  //       <Routes>...</Routes>
  //     </Layout>
  //
  // PATTERN 2 - Container Pattern:
  //   Create a MovieCardContainer that handles the data logic
  //   (favorites, delete, edit) and passes it down to a presentational
  //   MovieBlock component. This separates "smart" and "dumb" components.
  //
  // PATTERN 3 - Reusable Components:
  //   Use your Card component inside MovieBlock to demonstrate
  //   how compound components (Card.Header, Card.Body, Card.Footer) work.
  //
  // PATTERN 4 - Conditional Rendering with Loading/Error:
  //   Use LoadingSpinner and ErrorMessage to handle different UI states.
  //   Example:
  //     if (isLoading) return <Layout><LoadingSpinner /></Layout>;
  //     if (error) return <Layout><ErrorMessage message={error} onRetry={() => setError(null)} /></Layout>;

  return (
    <Router>
      <div className="app">
        <Header />

        <main className="app-main">
          <Routes>
            {/* Home Route - Movie List */}
            <Route path="/" element={
              <>
                <div className="favorites-counter">
                  You have {favoriteIds.length} favorite movie{favoriteIds.length !== 1 ? 's' : ''}
                </div>
                <MoviesList
                  movies={movies}
                  favoriteIds={favoriteIds}
                  onToggleFavorite={toggleFavorite}
                  onDeleteMovie={handleDeleteMovie}
                  onEditMovie={handleEditMovie}
                />
              </>
            } />

            {/* Add Movie Route */}
            <Route path="/add" element={
              <MovieForm
                onSubmit={handleAddMovie}
                movie={null}
                isEditing={false}
              />
            } />

            {/* Edit Movie Route */}
            <Route path="/edit/:id" element={
              <MovieForm
                onSubmit={handleUpdateMovie}
                movie={editingMovie}
                isEditing={true}
              />
            } />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
