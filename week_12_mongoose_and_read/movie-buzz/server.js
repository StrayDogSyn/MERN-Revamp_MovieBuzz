const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db_connection');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// TODO: Students will learn about middleware setup
app.use(express.json());
app.use(cors());

// Home route with API information
app.get('/', (req, res) => {
  res.json({
    message: 'Movie Buzz API - Week 12: Mongoose and READ Operations',
    version: '2.0.0',
    database: 'MongoDB with Mongoose ODM',
    features: [
      'Mongoose schema and model',
      'READ operations (GET endpoints)',
      'Data validation',
      'Error handling'
    ],
    endpoints: [
      'GET /api/movies - Get all movies (TODO)',
      'GET /api/movies/:id - Get movie by ID (TODO)',
      'GET /api/movies/search/:query - Search movies (TODO - bonus)',
      'GET /api/movies/test-connection - Test database connection (TODO)'
    ],
    instructions: [
      '1. Students will implement database connection in config/db_connection.js',
      '2. Students will create Movie schema in models/movie.js',
      '3. Students will implement READ controllers',
      '4. Students will connect routes in routes/movieRoutes.js',
      '5. Test all endpoints to verify functionality'
    ]
  });
});

// TODO: Students will connect movie routes during lesson
app.use('/api/movies', movieRoutes);

// Test endpoint without database
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
      'GET /api/movies/* - Movie routes (TODO)'
    ]
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// Start server with database connection
const startServer = async () => {
  try {
    console.log('🎬 Starting Movie Buzz API...');
    
    // TODO: Students will implement database connection
    // await connectDB();
    
    // For now, just start the server without database
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📖 Visit http://localhost:${PORT} for API documentation`);
      console.log('');
      console.log('⚠️ Database connection not yet implemented');
      console.log('📝 Students will complete the following:');
      console.log('   1. Implement Mongoose connection in config/db_connection.js');
      console.log('   2. Create Movie schema in models/movie.js');
      console.log('   3. Implement READ operations in controllers/movieController.js');
      console.log('   4. Connect routes in routes/movieRoutes.js');
      console.log('');
      console.log('🧪 Test endpoint available: GET /api/test-server');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();