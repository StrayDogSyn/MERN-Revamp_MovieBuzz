const Movie = require('../models/movie');

// Helper: extract only permitted fields from a request body
const permitFields = (body) => {
  const { name, description, rating, length, year, genre, director, stars } = body;
  return { name, description, rating, length, year, genre, director, stars };
};

module.exports = {
  // READ — all movies
  getMovies(req, res) {
    Movie.find()
      .then(movies => res.json(movies))
      .catch(err => res.status(500).json({ error: err.message }));
  },

  // READ — single movie by ID (for edit form deep-linking)
  getMovieToEdit(req, res) {
    const { id } = req.params;
    Movie.findById(id)
      .then(movie => {
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.json(movie);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  },

  // CREATE
  createMovie(req, res) {
    const data = permitFields(req.body);
    Movie.create(data)
      .then(movie => res.status(201).json(movie))
      .catch(err => {
        if (err.name === 'ValidationError') {
          return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
      });
  },

  // DELETE
  deleteMovie(req, res) {
    const { id } = req.params;
    Movie.findByIdAndDelete(id)
      .then(movie => {
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.json(movie);
      })
      .catch(err => res.status(500).json({ error: err.message }));
  },

  // UPDATE
  updateMovie(req, res) {
    const data = permitFields(req.body);
    const { id } = req.params;
    Movie.findByIdAndUpdate(id, data, { new: true, runValidators: true })
      .then(movie => {
        if (!movie) return res.status(404).json({ error: 'Movie not found' });
        res.json(movie);
      })
      .catch(err => {
        if (err.name === 'ValidationError') {
          return res.status(400).json({ error: err.message });
        }
        res.status(500).json({ error: err.message });
      });
  }
};