const Movie = require('../models/movie');
const mongoose = require('mongoose');

// GET /api/movies - Get all movies (implemented in Week 10)
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      count: movies.length,
      data: movies
    });
    
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch movies',
      message: error.message
    });
  }
};

// GET /api/movies/:id - Get movie by ID (implemented in Week 10)
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid movie ID format'
      });
    }
    
    const movie = await Movie.findById(id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: movie
    });
    
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch movie',
      message: error.message
    });
  }
};

// POST /api/movies - Create new movie (NEW - Week 11 Focus)
const createMovie = async (req, res) => {
  try {
    console.log('createMovie called - TODO: Students will implement during lesson');
    
    // TODO: Students will implement CREATE functionality
    
    // TODO: Step 1 - Extract movie data from request body
    // const movieData = req.body;
    
    // TODO: Step 2 - Create new Movie instance with validation
    // const movie = new Movie(movieData);
    
    // TODO: Step 3 - Save movie to database
    // const savedMovie = await movie.save();
    
    // TODO: Step 4 - Return success response with created movie
    // res.status(201).json({
    //   success: true,
    //   message: 'Movie created successfully',
    //   data: savedMovie
    // });
    
    // Placeholder response for students
    res.status(501).json({
      success: false,
      message: 'CREATE functionality not implemented yet',
      movieData: req.body,
      hint: 'Students will implement movie creation during lesson',
      steps: [
        '1. Extract movie data from req.body',
        '2. Create new Movie instance with data',
        '3. Use movie.save() to persist to database',
        '4. Return 201 status with created movie data'
      ],
      testingInstructions: [
        '- Use Postman to send POST request to /api/movies',
        '- Include movie data in request body (JSON format)',
        '- Test with both valid and invalid data',
        '- Verify movie appears in GET /api/movies response'
      ]
    });
    
  } catch (error) {
    console.error('Error creating movie:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = {};
      Object.keys(error.errors).forEach(key => {
        errors[key] = error.errors[key].message;
      });
      
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: errors
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to create movie',
      message: error.message
    });
  }
};

// GET /api/test-connection - Test database connection
const testConnection = async (req, res) => {
  try {
    const movieCount = await Movie.countDocuments();
    
    res.status(200).json({
      success: true,
      message: 'Database connection successful',
      movieCount: movieCount,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Error testing connection:', error);
    res.status(500).json({
      success: false,
      error: 'Database connection test failed',
      message: error.message
    });
  }
};

// GET /api/movies/search/:query - Search movies (bonus feature)
const searchMovies = async (req, res) => {
  try {
    const { query } = req.params;
    
    const movies = await Movie.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } },
        { director: { $regex: query, $options: 'i' } },
        { genre: { $in: [new RegExp(query, 'i')] } },
        { stars: { $in: [new RegExp(query, 'i')] } }
      ]
    }).sort({ createdAt: -1 });
    
    res.status(200).json({
      success: true,
      message: `Found ${movies.length} movies matching "${query}"`,
      count: movies.length,
      searchQuery: query,
      data: movies
    });
    
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to search movies',
      message: error.message
    });
  }
};

module.exports = {
  getMovies,
  getMovieById,
  createMovie,  // NEW - Week 11 focus
  testConnection,
  searchMovies
};