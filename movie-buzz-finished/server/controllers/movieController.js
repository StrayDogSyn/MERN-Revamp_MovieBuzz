const mongoose = require('mongoose');
const Movie = require('../models/movie');

const permitFields = (body) => {
  const { name, description, rating, length, year, genre, director, stars } = body;
  return { name, description, rating, length, year, genre, director, stars };
};

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

module.exports = {
  async getMovies(req, res) {
    try {
      const movies = await Movie.find();
      res.json(movies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getMovieById(req, res) {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid movie ID' });
    try {
      const movie = await Movie.findById(id);
      if (!movie) return res.status(404).json({ error: 'Movie not found' });
      res.json(movie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async createMovie(req, res) {
    try {
      const data = permitFields(req.body);
      const movie = await Movie.create(data);
      res.status(201).json(movie);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: err.message });
    }
  },

  async deleteMovie(req, res) {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid movie ID' });
    try {
      const movie = await Movie.findByIdAndDelete(id);
      if (!movie) return res.status(404).json({ error: 'Movie not found' });
      res.json(movie);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async updateMovie(req, res) {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ error: 'Invalid movie ID' });
    try {
      const data = permitFields(req.body);
      const movie = await Movie.findByIdAndUpdate(id, data, { new: true, runValidators: true });
      if (!movie) return res.status(404).json({ error: 'Movie not found' });
      res.json(movie);
    } catch (err) {
      if (err.name === 'ValidationError') {
        return res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: err.message });
    }
  }
};