const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db_connection');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Movie Buzz API - Week 11: CREATE Functionality',
    version: '3.0.0',
    database: 'MongoDB with Mongoose ODM',
    features: [
      'READ operations (GET endpoints)',
      'CREATE operations (POST endpoints) - NEW!',
      'Data validation with Mongoose',
      'Error handling and user feedback'
    ],
    endpoints: [
      'GET /api/movies - Get all movies',
      'GET /api/movies/:id - Get movie by ID',
      'POST /api/movies - Create new movie (TODO)',
      'POST /api/movies/validate - Validate movie data (TODO)'
    ],
    instructions: [
      '1. Students implemented READ operations in Week 10',
      '2. Students will implement CREATE controllers this week',
      '3. Students will add validation middleware',
      '4. Students will test POST endpoints',
      '5. Students will handle validation errors'
    ]
  });
});

// TODO: Students will connect movie routes
app.use('/api/movies', movieRoutes);

// Test endpoint
app.get('/api/test-server', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running!',
    timestamp: new Date().toISOString(),
    port: PORT
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    availableRoutes: [
      'GET / - API information',
      'GET /api/test-server - Server test',
      'GET /api/movies - Get movies',
      'POST /api/movies - Create movie (TODO)'
    ]
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  
  // Handle Mongoose validation errors
  if (error.name === 'ValidationError') {
    const errors = Object.values(error.errors).map(err => err.message);
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }

  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// TODO: Students implemented database connection in Week 10
const startServer = async () => {
  try {
    console.log('🎬 Starting Movie Buzz API...');
    
    // TODO: Students will implement connectDB() call
    console.log('⚠️  Database connection should be implemented from Week 10');
    console.log('📚 If not working, students should copy from Week 10');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log('📖 Visit http://localhost:${PORT} for API documentation');
      console.log('');
      console.log('🔧 TODO for this week:');
      console.log('   - Implement POST /api/movies controller');
      console.log('   - Add data validation');
      console.log('   - Test CREATE operations');
      console.log('   - Handle validation errors');
      console.log('');
      console.log('🌱 Run "npm run seed" to add sample data');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();