/**
 * STARTER FILE — Week 15: DELETE Operations
 *
 * This file is intentionally incomplete. Your task:
 *   1. Implement deleteMovie in controllers/movieController.js
 *   2. Uncomment router.delete('/:id', deleteMovie) and remove the placeholder route
 *
 * Reference: movie-buzz-finished/server/routes/movieRoutes.js
 * Do not copy from the reference — implement it yourself first.
 */
const express = require('express');
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  testConnection,
  searchMovies
} = require('../controllers/movieController');

const router = express.Router();

// Test route to verify router is working
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Movie routes are working!',
    week: 15,
    focus: 'DELETE Operations',
    availableRoutes: [
      'GET /api/movies - Get all movies',
      'GET /api/movies/:id - Get movie by ID',
      'POST /api/movies - Create new movie',
      'PUT /api/movies/:id - Update movie',
      'DELETE /api/movies/:id - Delete movie (NEW THIS WEEK)',
      'GET /api/movies/search/:query - Search movies',
      'GET /api/movies/test-connection - Test database connection'
    ]
  });
});

// CRUD Routes - Complete functionality
router.get('/', getMovies);                      // GET /api/movies
router.get('/search/:query', searchMovies);      // GET /api/movies/search/:query  
router.get('/test-connection', testConnection);  // GET /api/movies/test-connection
router.get('/:id', getMovieById);               // GET /api/movies/:id

router.post('/', createMovie);                  // POST /api/movies
router.put('/:id', updateMovie);               // PUT /api/movies/:id

// TODO: Students will implement DELETE route during lesson
// Uncomment the line below after implementing deleteMovie controller
// router.delete('/:id', deleteMovie);           // DELETE /api/movies/:id

// Placeholder DELETE route with instructions
router.delete('/:id', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'DELETE route not connected yet',
    movieId: req.params.id,
    instructions: [
      '1. Students have implemented deleteMovie controller',
      '2. Now uncomment the proper DELETE route above',
      '3. Comment out this placeholder route',
      '4. Test DELETE functionality with Postman'
    ],
    hint: 'Uncomment: router.delete("/:id", deleteMovie); in movieRoutes.js',
    controllerStatus: 'deleteMovie controller contains TODO comments for students'
  });
});

module.exports = router;