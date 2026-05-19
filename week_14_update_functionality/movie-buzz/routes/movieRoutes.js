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
      'PUT /api/movies/:id - Update movie (NEW - Week 12)',
      'PATCH /api/movies/:id - Partial update (bonus)',
      'GET /api/movies/search/:query - Search movies',
      'GET /api/test-connection - Test database connection'
    ]
  });
});

// READ routes (implemented in Week 10)
router.get('/', getMovies);                        // GET /api/movies
router.get('/test-connection', testConnection);    // GET /api/test-connection
router.get('/search/:query', searchMovies);        // GET /api/movies/search/:query
router.get('/:id', getMovieById);                  // GET /api/movies/:id

// CREATE route (implemented in Week 11)
router.post('/', createMovie);                     // POST /api/movies

// UPDATE routes (NEW - Week 12 Focus)
// TODO: Students will uncomment and test these routes during lesson

// TODO: Implement PUT route for complete update
// router.put('/:id', updateMovie);                // PUT /api/movies/:id

// TODO: Implement PATCH route for partial update (bonus)
// router.patch('/:id', partialUpdateMovie);       // PATCH /api/movies/:id

// Placeholder routes with instructions for UPDATE operations
router.put('/placeholder-update/:id', (req, res) => {
  res.json({
    success: false,
    message: 'This is a placeholder route for UPDATE',
    instructions: 'Students will uncomment router.put("/:id", updateMovie)',
    hint: 'Look for the TODO comment in movieRoutes.js',
    movieId: req.params.id,
    updateData: req.body
  });
});

router.patch('/placeholder-patch/:id', (req, res) => {
  res.json({
    success: false,
    message: 'This is a placeholder route for PATCH (partial update)',
    instructions: 'Advanced students can uncomment router.patch("/:id", partialUpdateMovie)',
    hint: 'This is a bonus feature for partial updates',
    movieId: req.params.id,
    partialData: req.body
  });
});

module.exports = router;