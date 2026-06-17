const express = require('express');
const movieController = require('../controllers/movieController');
const router = express.Router();

// GET all movies
router.get('/api/movies', movieController.getMovies);

// GET single movie by ID
router.get('/api/movies/:id', movieController.getMovieById);

// POST new movie
router.post('/api/movies', movieController.createMovie);

// DELETE movie
router.delete('/api/movies/:id', movieController.deleteMovie);

// PUT update movie
router.put('/api/movies/:id', movieController.updateMovie);

module.exports = router;