/**
 * STARTER FILE — Week 13: CREATE Operations
 *
 * This file is intentionally incomplete. Your task:
 *   1. Uncomment router.post('/', createMovie) once you implement createMovie
 *   2. The placeholder POST route below gives you a 501 until then — it is
 *      intentional, not a bug
 *
 * Reference: movie-buzz-finished/server/routes/movieRoutes.js
 * Do not copy from the reference — implement it yourself first.
 */
const express = require('express');
const {
  getMovies,
  getMovieById,
  createMovie,
  testConnection,
  searchMovies
} = require('../controllers/movieController');

const router = express.Router();

// Test route to verify router is working
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Movie routes are working!',
    week: 13,
    focus: 'CREATE Operations',
    availableRoutes: [
      'GET /api/movies - Get all movies',
      'GET /api/movies/:id - Get movie by ID',
      'POST /api/movies - Create new movie (NEW THIS WEEK)',
      'GET /api/movies/search/:query - Search movies',
      'GET /api/movies/test-connection - Test database connection'
    ]
  });
});

// READ routes (implemented in Week 10)
router.get('/', getMovies);                      // GET /api/movies
router.get('/search/:query', searchMovies);      // GET /api/movies/search/:query  
router.get('/test-connection', testConnection);  // GET /api/movies/test-connection
router.get('/:id', getMovieById);               // GET /api/movies/:id

// TODO: Students will implement CREATE route during lesson
// Uncomment the line below after implementing createMovie controller
// router.post('/', createMovie);                  // POST /api/movies

// Placeholder CREATE route with instructions
router.post('/', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'CREATE route not fully implemented yet',
    movieData: req.body,
    instructions: [
      '1. Students have reviewed createMovie controller with TODOs',
      '2. Students should implement the controller step by step',
      '3. Students should test each step with Postman',
      '4. Once working, this placeholder route is automatically replaced'
    ],
    hint: 'The createMovie controller contains detailed TODO comments for implementation',
    controllerStatus: 'createMovie controller contains step-by-step TODOs for students',
    testingTips: [
      'Use Postman to send POST requests',
      'Include Content-Type: application/json header',
      'Test with valid movie data first',
      'Then test validation with invalid data'
    ]
  });
});

module.exports = router;