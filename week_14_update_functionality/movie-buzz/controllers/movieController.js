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

// POST /api/movies - Create new movie (implemented in Week 11)
const createMovie = async (req, res) => {
  try {
    const movieData = req.body;
    
    // Create new Movie instance with validation
    const movie = new Movie(movieData);
    
    // Save movie to database
    const savedMovie = await movie.save();
    
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: savedMovie
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

// PUT /api/movies/:id - Update movie (NEW - Week 12 Focus)
const updateMovie = async (req, res) => {
  try {
    console.log('updateMovie called - TODO: Students will implement during lesson');
    
    // TODO: Students will implement UPDATE functionality
    
    // TODO: Step 1 - Extract movie ID from request parameters
    // const { id } = req.params;
    
    // TODO: Step 2 - Validate ObjectId format
    // if (!mongoose.Types.ObjectId.isValid(id)) {
    //   return res.status(400).json({
    //     success: false,
    //     error: 'Invalid movie ID format'
    //   });
    // }
    
    // TODO: Step 3 - Extract update data from request body
    // const updateData = req.body;
    
    // TODO: Step 4 - Use findByIdAndUpdate with options
    // const updatedMovie = await Movie.findByIdAndUpdate(
    //   id,
    //   updateData,
    //   {
    //     new: true,        // Return updated document
    //     runValidators: true  // Run model validators
    //   }
    // );
    
    // TODO: Step 5 - Handle movie not found
    // if (!updatedMovie) {
    //   return res.status(404).json({
    //     success: false,
    //     error: 'Movie not found'
    //   });
    // }
    
    // TODO: Step 6 - Return success response with updated movie
    // res.status(200).json({
    //   success: true,
    //   message: 'Movie updated successfully',
    //   data: updatedMovie
    // });
    
    // Placeholder response for students
    res.status(501).json({
      success: false,
      message: 'UPDATE functionality not implemented yet',
      movieId: req.params.id,
      updateData: req.body,
      hint: 'Students will implement movie update during lesson',
      steps: [
        '1. Extract movie ID from req.params.id',
        '2. Validate ObjectId format',
        '3. Extract update data from req.body',
        '4. Use Movie.findByIdAndUpdate() with options',
        '5. Handle movie not found case',
        '6. Return updated movie in response'
      ],
      testingInstructions: [
        '- Use Postman to send PUT request to /api/movies/:id',
        '- Include updated movie data in request body (JSON)',
        '- Test with both valid and invalid IDs',
        '- Test partial updates (only some fields)',
        '- Verify changes persist with GET request'
      ]
    });
    
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

// PATCH /api/movies/:id - Partial update movie (bonus feature)
const partialUpdateMovie = async (req, res) => {
  try {
    console.log('partialUpdateMovie called - TODO: bonus implementation');
    
    // TODO: Implement partial update (only update provided fields)
    // Similar to updateMovie but with field-specific logic
    
    res.status(501).json({
      success: false,
      message: 'PATCH functionality not implemented yet (bonus feature)',
      hint: 'Advanced students can implement partial update functionality',
      movieId: req.params.id,
      partialData: req.body
    });
    
  } catch (error) {
    console.error('Error partially updating movie:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to partially update movie',
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
  updateMovie,         // NEW - Week 12 focus
  partialUpdateMovie,  // NEW - Week 12 bonus
  testConnection,
  searchMovies
};