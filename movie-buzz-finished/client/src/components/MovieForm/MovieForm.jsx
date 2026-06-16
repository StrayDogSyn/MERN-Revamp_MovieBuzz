import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { movieService } from '../../services/movieService';
import './MovieForm.css';

function MovieForm({ addMovie, editMovie, movies }) {
  const [inputs, setInputs] = useState({});
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [fetchingMovie, setFetchingMovie] = useState(false);

  const { movieId } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(movieId);

  // If we have the movies list already (from parent state), use it.
  // Otherwise (direct deep-link to /edit/:id), fetch by ID from the API.
  useEffect(() => {
    if (!isEditMode) return;

    // Try to find the movie in the already-loaded list first
    const fromList = movies
      ? movies.find(m => m._id === movieId)
      : null;

    if (fromList) {
      populateForm(fromList);
    } else {
      // Fallback: fetch directly (handles page refresh / direct links)
      setFetchingMovie(true);
      movieService.getMovie(movieId)
        .then(movie => {
          populateForm(movie);
          setFetchingMovie(false);
        })
        .catch(() => {
          setErrors({ fetch: 'Could not load movie data. It may have been deleted.' });
          setFetchingMovie(false);
        });
    }
  }, [movieId, movies]);

  const populateForm = (movie) => {
    const defaults = { ...movie };
    if (Array.isArray(defaults.genre)) defaults.genre = defaults.genre.join(', ');
    if (Array.isArray(defaults.stars)) defaults.stars = defaults.stars.join(', ');
    setInputs(defaults);
  };

  const validate = () => {
    const newErrors = {};
    if (!inputs.name || inputs.name.length < 2) newErrors.name = 'Title required (min 2 chars)';
    if (!inputs.rating)    newErrors.rating    = 'Rating required';
    if (!inputs.length)    newErrors.length    = 'Length required';
    if (!inputs.year)      newErrors.year      = 'Year required';
    if (!inputs.genre)     newErrors.genre     = 'Genre required';
    if (!inputs.stars)     newErrors.stars     = 'Stars required';
    if (!inputs.director)  newErrors.director  = 'Director required';
    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInputs(prev  => ({ ...prev,  [name]: value }));
    setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setLoading(true);
    setErrors({});

    const movieData = { ...inputs };
    if (typeof movieData.genre === 'string') {
      movieData.genre = movieData.genre.split(',').map(g => g.trim()).filter(Boolean);
    }
    if (typeof movieData.stars === 'string') {
      movieData.stars = movieData.stars.split(',').map(s => s.trim()).filter(Boolean);
    }

    try {
      if (isEditMode) {
        await editMovie(movieData);
      } else {
        await addMovie(movieData);
      }
      navigate('/');
    } catch (err) {
      const message = err?.response?.data?.error || err.message || 'Something went wrong. Please try again.';
      setErrors({ submit: message });
    } finally {
      setLoading(false);
    }
  };

  if (fetchingMovie) {
    return <div className="movie-form-container"><p>Loading movie data...</p></div>;
  }

  return (
    <div className="movie-form-container">
      <h2>{isEditMode ? 'Edit Movie' : 'Add Movie'}</h2>

      {errors.fetch && (
        <div className="error-message" style={{ marginBottom: '16px' }}>{errors.fetch}</div>
      )}
      {errors.submit && (
        <div className="error-message" style={{ marginBottom: '16px', color: '#ef4444' }}>
          ⚠️ {errors.submit}
        </div>
      )}

      <form id="create-movies" onSubmit={handleSubmit} className="movie-form" autoComplete="off">
        <div className="form-columns">
          <div className="form-column">
            <div className={`form-group${errors.name ? ' error' : ''}`}>
              <label htmlFor="name">Movie Title</label>
              <input type="text" name="name" id="name"
                value={inputs.name || ''} onChange={handleChange}
                placeholder="Enter movie title" disabled={loading} />
              {errors.name && <div className="error-message">{errors.name}</div>}
            </div>

            <div className={`form-group${errors.year ? ' error' : ''}`}>
              <label htmlFor="year">Year Released</label>
              <input type="number" name="year" id="year"
                value={inputs.year || ''} onChange={handleChange}
                placeholder="e.g. 2023" disabled={loading} />
              {errors.year && <div className="error-message">{errors.year}</div>}
            </div>

            <div className={`form-group${errors.length ? ' error' : ''}`}>
              <label htmlFor="length">Length</label>
              <input type="text" name="length" id="length"
                value={inputs.length || ''} onChange={handleChange}
                placeholder="e.g. 120 min" disabled={loading} />
              {errors.length && <div className="error-message">{errors.length}</div>}
            </div>

            <div className={`form-group${errors.rating ? ' error' : ''}`}>
              <label htmlFor="rating">Rating</label>
              <select name="rating" id="rating"
                value={inputs.rating || ''} onChange={handleChange} disabled={loading}>
                <option value="">Select Rating</option>
                <option value="G">G</option>
                <option value="PG">PG</option>
                <option value="PG-13">PG-13</option>
                <option value="R">R</option>
                <option value="NC-17">NC-17</option>
                <option value="NR">Not Rated</option>
              </select>
              {errors.rating && <div className="error-message">{errors.rating}</div>}
            </div>
          </div>

          <div className="form-column">
            <div className={`form-group${errors.genre ? ' error' : ''}`}>
              <label htmlFor="genre">Genres</label>
              <input type="text" name="genre" id="genre"
                value={inputs.genre || ''} onChange={handleChange}
                placeholder="e.g. Comedy, Drama" disabled={loading} />
              {errors.genre && <div className="error-message">{errors.genre}</div>}
            </div>

            <div className={`form-group${errors.director ? ' error' : ''}`}>
              <label htmlFor="director">Director</label>
              <input type="text" name="director" id="director"
                value={inputs.director || ''} onChange={handleChange}
                placeholder="e.g. Steven Spielberg" disabled={loading} />
              {errors.director && <div className="error-message">{errors.director}</div>}
            </div>

            <div className={`form-group${errors.stars ? ' error' : ''}`}>
              <label htmlFor="stars">Stars</label>
              <input type="text" name="stars" id="stars"
                value={inputs.stars || ''} onChange={handleChange}
                placeholder="e.g. Adam Sandler, Drew Barrymore" disabled={loading} />
              {errors.stars && <div className="error-message">{errors.stars}</div>}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea name="description" id="description" rows="4"
                value={inputs.description || ''} onChange={handleChange}
                placeholder="Enter a short description" disabled={loading} />
            </div>
          </div>
        </div>

        <div className="form-actions">
          <Link to="/">
            <button type="button" className="btn btn-secondary" disabled={loading}>Cancel</button>
          </Link>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving...' : (isEditMode ? 'Edit Movie' : 'Add Movie')}
          </button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;