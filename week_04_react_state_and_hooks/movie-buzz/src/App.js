import React, { useState } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

// Movie data for state practice
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
    name: "The Godfather",
    year: 1972,
    rating: "R",
    length: "175 minutes",
    description: "The aging patriarch of an organized crime dynasty transfers control of his empire to his reluctant son.",
    genre: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    stars: ["Marlon Brando", "Al Pacino", "James Caan"],
    poster: "/images/movie-placeholder.png"
  },
  {
    id: 4,
    name: "Pulp Fiction",
    year: 1994,
    rating: "R",
    length: "154 minutes",
    description: "The lives of two mob hitmen, a boxer, and others intertwine in four tales of violence and redemption.",
    genre: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    stars: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    poster: "/images/movie-placeholder.png"
  },
  {
    id: 5,
    name: "Finding Nemo",
    year: 2003,
    rating: "G",
    length: "100 minutes",
    description: "After his son is captured in the Great Barrier Reef, a clownfish sets out on a journey to bring him home.",
    genre: ["Animation", "Family"],
    director: "Andrew Stanton",
    stars: ["Albert Brooks", "Ellen DeGeneres", "Alexander Gould"],
    poster: "/images/movie-placeholder.png"
  }
];

function App() {
  // TODO: Students will add state for movies list
  const [movies, setMovies] = useState(initialMovies);
  
  // TODO: Students will add state for favorite movies (array of movie IDs)
  const [favoriteIds, setFavoriteIds] = useState([]);

  // TODO: Students will create handler to toggle favorite status
  const toggleFavorite = (movieId) => {
    setFavoriteIds(prevFavorites => {
      if (prevFavorites.includes(movieId)) {
        // Remove from favorites
        return prevFavorites.filter(id => id !== movieId);
      } else {
        // Add to favorites
        return [...prevFavorites, movieId];
      }
    });
  };

  // TODO: Students will create handler to delete a movie (preview of Week 5)
  const deleteMovie = (movieId) => {
    // This will be properly implemented in Week 5 with confirmation
    const confirmDelete = window.confirm('Are you sure you want to delete this movie?');
    if (confirmDelete) {
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
      // Also remove from favorites if it was favorited
      setFavoriteIds(prevFavorites => prevFavorites.filter(id => id !== movieId));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Movie Buzz</h1>
        <p>Where all the best movies live...</p>
      </header>

      <main className="app-main">
        {/* Display favorite count */}
        <div className="favorites-counter">
          ❤️ You have {favoriteIds.length} favorite movie{favoriteIds.length !== 1 ? 's' : ''}
        </div>
        
        {/* Pass movies and handlers to MoviesList */}
        <MoviesList 
          movies={movies} 
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onDeleteMovie={deleteMovie}
        />
      </main>
    </div>
  );
}

export default App;