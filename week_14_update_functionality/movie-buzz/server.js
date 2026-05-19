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
    message: 'Movie Buzz API - Week 10: Mongoose and READ Operations',
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

// TODO: Students will implement server startup with database connection
const startServer = async () => {
  try {
    console.log('🎬 Starting Movie Buzz API...');
    
    // TODO: Connect to database before starting server
    console.log('⚠️  Database connection not implemented yet');
    console.log('📚 Students will implement this during lesson:');
    console.log('   - Call connectDB() function');
    console.log('   - Wait for successful connection');
    console.log('   - Then start Express server');
    
    // Start server (without database for now)
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log('📖 Visit http://localhost:${PORT} for API documentation');
      console.log('');
      console.log('🔧 TODO for lesson:');
      console.log('   - Implement connectDB() in config/db_connection.js');
      console.log('   - Create Movie schema in models/movie.js');
      console.log('   - Implement controllers in controllers/movieController.js');
      console.log('   - Connect routes in routes/movieRoutes.js');
      console.log('   - Test all endpoints');
      console.log('');
      console.log('🌱 Optional: Run "npm run seed" to add sample data');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();