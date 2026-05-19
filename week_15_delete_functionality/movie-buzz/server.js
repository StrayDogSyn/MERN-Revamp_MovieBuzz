const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db_connection');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware setup
app.use(express.json());
app.use(cors());

// Home route with API information
app.get('/', (req, res) => {
  res.json({
    message: 'Movie Buzz API - Week 13: DELETE Operations',
    version: '4.0.0',
    database: 'MongoDB with Mongoose ODM',
    features: [
      'Complete CRUD operations',
      'DELETE functionality',
      'Safe deletion with validation',
      'Error handling for missing resources'
    ],
    endpoints: [
      'GET /api/movies - Get all movies',
      'GET /api/movies/:id - Get movie by ID',
      'POST /api/movies - Create new movie',
      'PUT /api/movies/:id - Update movie',
      'DELETE /api/movies/:id - Delete movie (NEW THIS WEEK)',
      'GET /api/movies/test-connection - Test database connection'
    ],
    instructions: [
      '1. Students will implement DELETE controller in controllers/movieController.js',
      '2. Students will add DELETE route in routes/movieRoutes.js',
      '3. Students will add proper validation and error handling',
      '4. Students will test DELETE functionality with Postman',
      '5. Students will verify cascading effects and data integrity'
    ]
  });
});

// Connect movie routes
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
      'GET /api/movies/* - Movie routes'
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
    
    // Connect to database
    await connectDB();
    console.log('✅ Database connected successfully');
    
    // Start server
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log('📖 Visit http://localhost:${PORT} for API documentation');
      console.log('');
      console.log('🗑️  Week 13 Focus: DELETE Operations');
      console.log('   - Implement deleteMovie controller');
      console.log('   - Add DELETE route');
      console.log('   - Test deletion with Postman');
      console.log('   - Handle 404 errors for non-existent movies');
      console.log('');
      console.log('🌱 Optional: Run "npm run seed" to add sample data for testing');
    });
    
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

// Start the server
startServer();