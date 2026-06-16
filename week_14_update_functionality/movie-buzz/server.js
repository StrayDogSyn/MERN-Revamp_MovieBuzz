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
    message: 'Movie Buzz API - Week 14: UPDATE Functionality',
    version: '4.0.0',
    database: 'MongoDB with Mongoose ODM',
    features: [
      'READ operations (GET endpoints) - from Week 12',
      'CREATE operations (POST endpoints) - from Week 13',
      'UPDATE operations (PUT endpoints) - NEW this week',
      'Mongoose validation and error handling'
    ],
    endpoints: [
      'GET /api/movies - Get all movies',
      'GET /api/movies/:id - Get movie by ID',
      'POST /api/movies - Create new movie',
      'PUT /api/movies/:id - Update movie (TODO - Week 14 focus)',
      'PATCH /api/movies/:id - Partial update (bonus)',
      'GET /api/movies/search/:query - Search movies (bonus)',
      'GET /api/movies/test-connection - Test database connection'
    ],
    instructions: [
      '1. Implement updateMovie controller in controllers/movieController.js',
      '2. Uncomment router.put("/:id", updateMovie) in routes/movieRoutes.js',
      '3. Test PUT /api/movies/:id with Postman',
      '4. Handle validation errors and 404 for missing movies'
    ]
  });
});

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

const startServer = async () => {
  try {
    console.log('🎬 Starting Movie Buzz API...');

    // connectDB() must be implemented in config/db_connection.js first
    await connectDB();
    console.log('✅ Database connected successfully');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`📖 Visit http://localhost:${PORT} for API documentation`);
      console.log('');
      console.log('✏️  Week 14 Focus: UPDATE Operations');
      console.log('   - Implement updateMovie controller');
      console.log('   - Uncomment router.put("/:id", updateMovie) in routes');
      console.log('   - Test PUT /api/movies/:id with Postman');
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