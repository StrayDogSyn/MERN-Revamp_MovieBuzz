const express = require('express');
const movieController = require('../controllers/movieController');
const router = express.Router();

// GET all movies
router.get('/api/movies', movieController.getMovies);

// GET single movie by ID (for edit form)
router.get('/api/movie/:id', movieController.getMovieToEdit);

// POST new movie
router.post('/api/movie/new', movieController.createMovie);

// DELETE movie
router.delete('/api/movie/:id', movieController.deleteMovie);

// PUT update movie
router.put('/api/movie/:id', movieController.updateMovie);

module.exports = router;