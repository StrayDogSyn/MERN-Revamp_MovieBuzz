const Movie = require('../models/movie');
const mongoose = require('mongoose');

// GET /api/movies - Get all movies
const getMovies = async (req, res) => {
  try {
    // TODO: Students will implement getting all movies
    // HINT: Use Movie.find() to get all movies
    // HINT: Consider using .sort() to order results
    // HINT: Return movies in a success response
    
    res.status(501).json({
      success: false,
      message: 'READ operation not yet implemented',
      instructions: 'Students will implement Movie.find() here'
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

// GET /api/movies/:id - Get movie by ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Students will implement getting movie by ID
    // TODO: Validate the ID format using mongoose.Types.ObjectId.isValid()
    // TODO: Use Movie.findById() to get the specific movie
    // TODO: Handle case when movie is not found (404)
    // TODO: Return the movie in a success response
    
    res.status(501).json({
      success: false,
      message: 'READ by ID operation not yet implemented',
      id: id,
      instructions: 'Students will implement Movie.findById() here'
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

// GET /api/movies/search/:query - Search movies (bonus feature)
const searchMovies = async (req, res) => {
  try {
    const { query } = req.params;
    
    // TODO: Students will implement search functionality (BONUS)
    // HINT: Use $or with $regex for flexible searching
    // HINT: Search across multiple fields (name, description, director, etc.)
    // HINT: Make search case-insensitive with $options: 'i'
    
    res.status(501).json({
      success: false,
      message: 'Search operation not yet implemented (bonus feature)',
      searchQuery: query,
      instructions: 'Students will implement advanced search here'
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

// GET /api/test-connection - Test database connection
const testConnection = async (req, res) => {
  try {
    // TODO: Students will implement connection test
    // HINT: Use Movie.countDocuments() to test database access
    // HINT: Return the count and a success message
    
    res.status(501).json({
      success: false,
      message: 'Connection test not yet implemented',
      instructions: 'Students will test database connection here'
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

module.exports = {
  getMovies,
  getMovieById,
  searchMovies,
  testConnection
};