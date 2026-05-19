import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// ============================================================
// MovieForm - Working component carried forward from Week 5
// ============================================================
// Handles both Add and Edit movie operations.
// When isEditing is true and a movie prop is provided, it pre-fills the form.
// genre and stars are entered as comma-separated strings and converted to arrays on submit.
//
// WEEK 6 TODO: Refactor using component patterns
// -------------------------------------------------
// TODO: Extract individual form fields into a reusable FormField component
//   This demonstrates the "reusable component" pattern:
//
//   function FormField({ label, type, name, value, onChange, placeholder, required }) {
//     return (
//       <div className="form-field">
//         <label htmlFor={name}>{label}</label>
//         <input type={type} id={name} name={name} value={value}
//                onChange={onChange} placeholder={placeholder} required={required} />
//       </div>
//     );
//   }
//
// TODO: Use the Card compound component to wrap the form:
//   <Card>
//     <Card.Header>{isEditing ? 'Edit Movie' : 'Add New Movie'}</Card.Header>
//     <Card.Body><form>...</form></Card.Body>
//   </Card>

function MovieForm({ onSubmit, movie, isEditing }) {
  const navigate = useNavigate();

  const [movieData, setMovieData] = useState({
    name: '',
    year: '',
    rating: '',
    length: '',
    description: '',
    genre: '',
    director: '',
    stars: ''
  });

  // Pre-fill form when editing an existing movie
  useEffect(() => {
    if (isEditing && movie) {
      setMovieData({
        ...movie,
        // Convert arrays to comma-separated strings for the form inputs
        genre: Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre,
        stars: Array.isArray(movie.stars) ? movie.stars.join(', ') : movie.stars
      });
    }
  }, [isEditing, movie]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Convert genre and stars from strings to arrays for storage
    const processedMovie = {
      ...movieData,
      genre: typeof movieData.genre === 'string'
        ? movieData.genre.split(',').map(g => g.trim()).filter(g => g.length > 0)
        : movieData.genre,
      stars: typeof movieData.stars === 'string'
        ? movieData.stars.split(',').map(s => s.trim()).filter(s => s.length > 0)
        : movieData.stars,
      year: parseInt(movieData.year)
    };

    onSubmit(processedMovie);

    // Navigate back to home after submission
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="movie-form">
      <h2>{isEditing ? 'Edit Movie' : 'Add New Movie'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          value={movieData.name}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          name="year"
          placeholder="Year"
          value={movieData.year}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="rating"
          placeholder="Rating (e.g., PG-13)"
          value={movieData.rating}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="length"
          placeholder="Length (e.g., 120 minutes)"
          value={movieData.length}
          onChange={handleInputChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          value={movieData.description}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="genre"
          placeholder="Genre (comma-separated, e.g., Action, Sci-Fi)"
          value={movieData.genre}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movieData.director}
          onChange={handleInputChange}
          required
        />

        <input
          type="text"
          name="stars"
          placeholder="Stars (comma-separated, e.g., Actor 1, Actor 2)"
          value={movieData.stars}
          onChange={handleInputChange}
          required
        />

        <div className="form-buttons">
          <button type="submit">
            {isEditing ? 'Update Movie' : 'Add Movie'}
          </button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
