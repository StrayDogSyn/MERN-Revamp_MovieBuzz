/**
 * STARTER FILE — Week 14: UPDATE Operations
 *
 * This file is intentionally incomplete. Your task:
 *   1. Implement updateMovie in controllers/movieController.js
 *   2. Uncomment router.put('/:id', updateMovie) and remove the placeholder route
 *   3. Bonus: implement partialUpdateMovie and uncomment the PATCH route
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
  partialUpdateMovie,
  searchMovies,
  testConnection
} = require('../controllers/movieController');

const router = express.Router();

// Test route to verify router is working
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Movie routes are working!',
    availableRoutes: [
      'GET /api/movies - Get all movies',
      'GET /api/movies/:id - Get movie by ID',
      'POST /api/movies - Create new movie',
      'PUT /api/movies/:id - Update movie (NEW - Week 14)',
      'PATCH /api/movies/:id - Partial update (bonus)',
      'GET /api/movies/search/:query - Search movies',
      'GET /api/test-connection - Test database connection'
    ]
  });
});

// READ routes (implemented in Week 12)
router.get('/', getMovies);                        // GET /api/movies
router.get('/test-connection', testConnection);    // GET /api/test-connection
router.get('/search/:query', searchMovies);        // GET /api/movies/search/:query
router.get('/:id', getMovieById);                  // GET /api/movies/:id

// CREATE route (implemented in Week 13)
router.post('/', createMovie);                     // POST /api/movies

// UPDATE routes (NEW - Week 14 Focus)
// TODO: Students will uncomment and test these routes during lesson

// TODO: Implement PUT route for complete update
// router.put('/:id', updateMovie);                // PUT /api/movies/:id

// TODO: Implement PATCH route for partial update (bonus)
// router.patch('/:id', partialUpdateMovie);       // PATCH /api/movies/:id

// Placeholder PUT route — at the correct path so students see this message, not a 404
router.put('/:id', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'UPDATE route not connected yet',
    movieId: req.params.id,
    updateData: req.body,
    instructions: [
      '1. Implement updateMovie in controllers/movieController.js',
      '2. Uncomment router.put("/:id", updateMovie) above',
      '3. Comment out this placeholder route',
      '4. Test PUT /api/movies/:id with Postman'
    ],
    hint: 'Look for the TODO comment in movieRoutes.js'
  });
});

// Placeholder PATCH route (bonus feature)
router.patch('/:id', (req, res) => {
  res.status(501).json({
    success: false,
    message: 'PATCH (partial update) route not connected yet (bonus feature)',
    movieId: req.params.id,
    partialData: req.body,
    instructions: 'Advanced students can uncomment router.patch("/:id", partialUpdateMovie)'
  });
});

module.exports = router;