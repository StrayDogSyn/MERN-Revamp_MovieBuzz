/**
 * STARTER FILE — Week 15: DELETE Operations
 *
 * This file is intentionally incomplete. Your task:
 *   1. Implement deleteMovie: validate the ObjectId, use Movie.findByIdAndDelete,
 *      return the deleted document (or 404 if it didn't exist)
 *   2. All other CRUD methods are already implemented (from Weeks 12–14)
 *
 * Reference: movie-buzz-finished/server/controllers/movieController.js
 * Do not copy from the reference — implement it yourself first.
 */
const Movie = require('../models/movie');
const mongoose = require('mongoose');

// GET /api/movies - Get all movies
const getMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    // Returns bare array — matches reference app and keeps React destructuring simple
    res.json(movies);
    
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch movies',
      message: error.message
    });
  }
};

// GET /api/movies/:id - Get movie by ID
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

    // Returns bare object — matches reference app
    res.json(movie);
    
  } catch (error) {
    console.error('Error fetching movie by ID:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch movie',
      message: error.message
    });
  }
};

// POST /api/movies - Create new movie
const createMovie = async (req, res) => {
  try {
    const movieData = req.body;

    const movie = new Movie(movieData);
    const savedMovie = await movie.save();

    // Returns bare object — matches reference app
    res.status(201).json(savedMovie);
    
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

// PUT /api/movies/:id - Update movie
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid movie ID format'
      });
    }
    
    const movie = await Movie.findByIdAndUpdate(
      id, 
      updateData, 
      { 
        new: true,
        runValidators: true
      }
    );
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    // Returns bare object — matches reference app
    res.json(movie);
    
  } catch (error) {
    console.error('Error updating movie:', error);
    
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
      error: 'Failed to update movie',
      message: error.message
    });
  }
};

// DELETE /api/movies/:id - Delete movie (NEW - Week 15 Focus)
const deleteMovie = async (req, res) => {
  try {
    console.log('deleteMovie called - TODO: Students will implement during lesson');
    
    // TODO: Students will implement DELETE functionality
    
    // TODO: Step 1 - Get movie ID from request parameters
    // const { id } = req.params;
    
    // TODO: Step 2 - Validate that ID is a valid MongoDB ObjectId
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({
    //     success: false,
    //     error: 'Invalid movie ID format'
    //   });
    // }
    
    // TODO: Step 3 - Find the movie first to check if it exists
    // const movie = await Movie.findById(id);
    // if (!movie) {
    //   return res.status(404).json({
    //     success: false,
    //     error: 'Movie not found'
    //   });
    // }
    
    // TODO: Step 4 - Delete the movie using findByIdAndDelete
    // const deletedMovie = await Movie.findByIdAndDelete(id);
    
    // TODO: Step 5 - Return deleted movie directly (bare object, no wrapper)
    // res.json(deletedMovie);
    
    // Placeholder response for students
    res.status(501).json({
      success: false,
      message: 'DELETE functionality not implemented yet',
      movieId: req.params.id,
      hint: 'Students will implement movie deletion during lesson',
      steps: [
        '1. Extract movie ID from req.params.id',
        '2. Validate ObjectId format with mongoose.Types.ObjectId.isValid()',
        '3. Check if movie exists with Movie.findById()',
        '4. Delete movie with Movie.findByIdAndDelete()',
        '5. Return success response with deleted movie info'
      ],
      testingInstructions: [
        '- Use Postman to send DELETE request to /api/movies/:id',
        '- Test with valid movie ID (should return 200)',
        '- Test with invalid ID format (should return 400)',
        '- Test with non-existent ID (should return 404)',
        '- Verify movie is actually removed from database'
      ]
    });
    
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete movie',
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
  createMovie,
  updateMovie,
  deleteMovie,  // NEW - Week 15 focus
  testConnection,
  searchMovies
};