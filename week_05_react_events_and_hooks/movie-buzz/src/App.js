import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import MoviesList from './components/MoviesList';
import MovieForm from './components/MovieForm';
import './App.css';

// Initial movie data from Week 4 (students build on previous work)
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
  const [favoriteIds, setFavoriteIds] = useState([]); // From Week 4
  
  // TODO: Students will add editingMovie state for edit functionality
  const [editingMovie, setEditingMovie] = useState(null);

  // From Week 4 - Toggle favorite handler
  const toggleFavorite = (movieId) => {
    setFavoriteIds(prevFavorites => {
      if (prevFavorites.includes(movieId)) {
        return prevFavorites.filter(id => id !== movieId);
      } else {
        return [...prevFavorites, movieId];
      }
    });
  };

  // Add new movie handler
  const handleAddMovie = (newMovie) => {
    const movieWithId = { 
      ...newMovie, 
      id: Date.now(),
      // Ensure arrays for genre and stars
      genre: typeof newMovie.genre === 'string' 
        ? newMovie.genre.split(',').map(g => g.trim()) 
        : newMovie.genre,
      stars: typeof newMovie.stars === 'string' 
        ? newMovie.stars.split(',').map(s => s.trim()) 
        : newMovie.stars
    };
    setMovies([...movies, movieWithId]);
  };

  // Delete movie handler (enhanced from Week 4)
  const handleDeleteMovie = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    const confirmDelete = window.confirm(`Are you sure you want to delete "${movie.name}"?`);
    if (confirmDelete) {
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
      setFavoriteIds(prevFavorites => prevFavorites.filter(id => id !== movieId));
    }
  };

  // TODO: Students will implement edit movie handler
  const handleEditMovie = (movieId) => {
    const movie = movies.find(m => m.id === movieId);
    setEditingMovie(movie);
    // Navigate to edit form
  };

  // TODO: Students will implement update movie handler
  const handleUpdateMovie = (updatedMovie) => {
    setMovies(prevMovies => 
      prevMovies.map(movie => 
        movie.id === updatedMovie.id ? updatedMovie : movie
      )
    );
    setEditingMovie(null);
  };

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
                  ❤️ You have {favoriteIds.length} favorite movie{favoriteIds.length !== 1 ? 's' : ''}
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