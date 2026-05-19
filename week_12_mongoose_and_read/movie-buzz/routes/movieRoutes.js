const express = require('express');
const {
  getMovies,
  getMovieById,
  searchMovies,
  testConnection
} = require('../controllers/movieController');

const router = express.Router();

// TODO: Students will implement routes during lesson

// Test route to verify router is working
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Movie routes are working!',
    availableRoutes: [
      'GET /api/movies - Get all movies (TODO)',
      'GET /api/movies/:id - Get movie by ID (TODO)',
      'GET /api/movies/search/:query - Search movies (TODO - bonus)',
      'GET /api/test-connection - Test database connection (TODO)'
    ]
  });
});

// TODO: Students will connect READ routes
// router.get('/', ???);                      // GET /api/movies
// router.get('/search/:query', ???);         // GET /api/movies/search/:query (bonus)
// router.get('/test-connection', ???);       // GET /api/movies/test-connection
// router.get('/:id', ???);                   // GET /api/movies/:id

// NOTE: Order matters! Put specific routes before :id parameter

module.exports = router;