import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieForm.css';

// TODO (Week 7): Import useMovieContext from '../context/MovieContext'
//   Then dispatch ADD_MOVIE or UPDATE_MOVIE actions instead of calling onSubmit prop

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

  // Pre-fill the form when editing an existing movie
  useEffect(() => {
    if (isEditing && movie) {
      setMovieData({
        ...movie,
        // Convert arrays back to comma-separated strings for editing
        genre: Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre || '',
        stars: Array.isArray(movie.stars) ? movie.stars.join(', ') : movie.stars || ''
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

    // Convert genre and stars from comma-separated strings to arrays
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

    // TODO (Week 7): Replace onSubmit with context dispatch
    //   if (isEditing) {
    //     dispatch({ type: 'UPDATE_MOVIE', payload: processedMovie });
    //   } else {
    //     dispatch({ type: 'ADD_MOVIE', payload: { ...processedMovie, id: Date.now() } });
    //   }
    if (onSubmit) {
      onSubmit(processedMovie);
    }

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
          placeholder="Stars (comma-separated, e.g., Keanu Reeves, Laurence Fishburne)"
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
