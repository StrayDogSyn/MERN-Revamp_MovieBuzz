import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import "./MovieForm.css";

function MovieForm({ onSubmit, movies, isEditing = false }) {
  const { movieId } = useParams();
  const navigate = useNavigate();
  
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

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // TODO: Students will implement edit functionality
  useEffect(() => {
    if (isEditing && movieId && movies) {
      const movieToEdit = movies.find(movie => movie._id === movieId);
      if (movieToEdit) {
        setFormData({
          name: movieToEdit.name || '',
          description: movieToEdit.description || '',
          rating: movieToEdit.rating || '',
          length: movieToEdit.length || '',
          year: movieToEdit.year?.toString() || '',
          genre: Array.isArray(movieToEdit.genre) ? movieToEdit.genre.join(', ') : movieToEdit.genre || '',
          director: movieToEdit.director || '',
          stars: Array.isArray(movieToEdit.stars) ? movieToEdit.stars.join(', ') : movieToEdit.stars || ''
        });
      }
    }
  }, [isEditing, movieId, movies]);

  // TODO: Students will implement change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // TODO: Students will implement form validation
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = 'Movie title is required';
    if (!formData.year) newErrors.year = 'Year is required';
    if (!formData.rating) newErrors.rating = 'Rating is required';
    if (!formData.genre.trim()) newErrors.genre = 'Genre is required';
    if (!formData.director.trim()) newErrors.director = 'Director is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    const currentYear = new Date().getFullYear();
    if (formData.year < 1900 || formData.year > currentYear + 5) {
      newErrors.year = `Year must be between 1900 and ${currentYear + 5}`;
    }
    
    return newErrors;
  };

  // TODO: Students will implement submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      // Process genre and stars as arrays
      const processedData = {
        ...formData,
        year: parseInt(formData.year),
        genre: formData.genre.split(',').map(g => g.trim()).filter(g => g),
        stars: formData.stars.split(',').map(s => s.trim()).filter(s => s)
      };

      if (isEditing) {
        await onSubmit(movieId, processedData);
      } else {
        await onSubmit(processedData);
      }
      
      navigate('/');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors({ submit: 'Failed to save movie. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="movie-form-container">
      <h2>{isEditing ? 'Edit Movie' : 'Add New Movie'}</h2>
      
      {errors.submit && (
        <div className="error-message">
          {errors.submit}
        </div>
      )}
      
      {/* TODO: Students will learn about form submission and controlled inputs */}
      <form onSubmit={handleSubmit} className="movie-form">
        <div className="form-columns">
          {/* Left Column */}
          <div className="form-column">
            <div className={`form-group${errors.name ? ' error' : ''}`}>
              <label htmlFor="name">Movie Title:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              {errors.name && <span className="field-error">{errors.name}</span>}
            </div>

            <div className={`form-group${errors.year ? ' error' : ''}`}>
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
              {errors.year && <span className="field-error">{errors.year}</span>}
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

            <div className={`form-group${errors.rating ? ' error' : ''}`}>
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
              {errors.rating && <span className="field-error">{errors.rating}</span>}
            </div>
          </div>

          {/* Right Column */}
          <div className="form-column">
            <div className={`form-group${errors.genre ? ' error' : ''}`}>
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
              {errors.genre && <span className="field-error">{errors.genre}</span>}
            </div>

            <div className={`form-group${errors.director ? ' error' : ''}`}>
              <label htmlFor="director">Director:</label>
              <input
                type="text"
                id="director"
                name="director"
                value={formData.director}
                onChange={handleChange}
                required
              />
              {errors.director && <span className="field-error">{errors.director}</span>}
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

            <div className={`form-group${errors.description ? ' error' : ''}`}>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                required
              />
              {errors.description && <span className="field-error">{errors.description}</span>}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={() => navigate('/')} 
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : (isEditing ? 'Update Movie' : 'Add Movie')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;