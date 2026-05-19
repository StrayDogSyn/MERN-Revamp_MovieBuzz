import React, { useState } from 'react';
import "./MovieForm.css";

function MovieForm({ addMovie }) {
  // TODO: Students will implement form state
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rating: '',
    length: '',
    year: '',
    genre: '',
    director: '',
    stars: ''
  });

  // TODO: Students will implement change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // TODO: Students will implement submit handler
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Generate a unique ID for the new movie
    const newMovie = {
      ...formData,
      id: Date.now(),
      year: parseInt(formData.year)
    };

    addMovie(newMovie);
    
    // Reset form
    setFormData({
      name: '',
      description: '',
      rating: '',
      length: '',
      year: '',
      genre: '',
      director: '',
      stars: ''
    });
  };

  return (
    <div className="movie-form-container">
      <h2>Add New Movie</h2>
      
      {/* TODO: Students will learn about form submission and controlled inputs */}
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-columns">
          {/* Left Column */}
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="name">Movie Title:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="year">Year:</label>
              <input
                type="number"
                id="year"
                name="year"
                value={formData.year}
                onChange={handleChange}
                required
                min="1900"
                max="2030"
              />
            </div>

            <div className="form-group">
              <label htmlFor="length">Length:</label>
              <input
                type="text"
                id="length"
                name="length"
                value={formData.length}
                onChange={handleChange}
                placeholder="e.g., 2h 30m"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="rating">Rating:</label>
              <select
                id="rating"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                required
              >
                <option value="">Select Rating</option>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
                <option value="NR">Not Rated</option>
              </select>
            </div>
          </div>

          {/* Right Column */}
          <div className="form-column">
            <div className="form-group">
              <label htmlFor="genre">Genre:</label>
              <input
                type="text"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="e.g., Action, Comedy, Drama"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="director">Director:</label>
              <input
                type="text"
                id="director"
                name="director"
                value={formData.director}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="stars">Stars:</label>
              <input
                type="text"
                id="stars"
                name="stars"
                value={formData.stars}
                onChange={handleChange}
                placeholder="e.g., Actor 1, Actor 2, Actor 3"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary">
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default MovieForm;