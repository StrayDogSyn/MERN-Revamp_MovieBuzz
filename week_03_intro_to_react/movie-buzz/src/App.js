import React from 'react';
// TODO: Import the MoviesList component from './components/MoviesList'
import MoviesList from './components/MoviesList';
import './App.css';

// Static movie data - provided for students
// NOTE: genre and stars are arrays, matching our MongoDB schema
const movies = [
  {
    id: 1,
    name: "The Dark Knight",
    year: 2008,
    length: "2h 32m",
    rating: "PG-13",
    genre: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    description: "When the menace known as the Joker wreaks havoc on Gotham City, Batman must accept one of the greatest psychological tests of his ability to fight injustice.",
    stars: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  },
  {
    id: 2,
    name: "Inception",
    year: 2010,
    length: "2h 28m",
    rating: "PG-13",
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    stars: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"]
  },
  {
    id: 3,
    name: "Interstellar",
    year: 2014,
    length: "2h 49m",
    rating: "PG-13",
    genre: ["Adventure", "Drama", "Sci-Fi"],
    director: "Christopher Nolan",
    description: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    stars: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"]
  },
  {
    id: 4,
    name: "The Shawshank Redemption",
    year: 1994,
    length: "2h 22m",
    rating: "R",
    genre: ["Drama"],
    director: "Frank Darabont",
    description: "Over the course of several years, two convicts form a friendship, seeking consolation and eventual redemption through basic compassion.",
    stars: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"]
  },
  {
    id: 5,
    name: "The Matrix",
    year: 1999,
    length: "2h 16m",
    rating: "R",
    genre: ["Action", "Sci-Fi"],
    director: "Lana Wachowski",
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth about reality.",
    stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
  }
];

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Movie Buzz</h1>
        <p>Where all the best movies live...</p>
      </header>

      <main className="app-main">
        {/* TODO: Pass the movies array as a prop to MoviesList */}
        {/* Hint: <MoviesList movies={movies} /> */}
        <MoviesList movies={movies} />
      </main>
    </div>
  );
}

export default App;
