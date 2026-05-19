const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const { connectToDatabase, getDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// File-based storage path (we'll transition away from this)
const moviesFilePath = path.join(__dirname, 'data', 'movies.json');

// Helper function to read movies from file (temporary - for comparison)
async function readMoviesFromFile() {
  try {
    const data = await fs.readFile(moviesFilePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading movies file:', error);
    return [];
  }
}

// Home route
app.get('/', (req, res) => {
  res.json({
    message: 'Movie Buzz API - Week 9: MongoDB Integration',
    version: '1.0.0',
    endpoints: [
      'GET /api/movies - Get all movies',
      'GET /api/test-db - Test database connection',
      'GET /api/movies-file - Get movies from file (comparison)'
    ]
  });
});

// TODO: Students will implement this during lesson
// Test database connection route
app.get('/api/test-db', async (req, res) => {
  try {
    // TODO: Get database reference
    // TODO: Test connection by fetching movies collection
    // TODO: Return success response with movie count
    
    // Placeholder response
    res.status(501).json({
      success: false,
      message: 'Database connection not implemented yet',
      hint: 'Students will implement this during the lesson'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Database connection failed',
      details: error.message
    });
  }
});

// Comparison route - get movies from file (old way)
app.get('/api/movies-file', async (req, res) => {
  try {
    const movies = await readMoviesFromFile();
    res.json({
      success: true,
      message: 'Movies loaded from file (old method)',
      data: movies,
      count: movies.length
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to load movies from file'
    });
  }
});

// TODO: Students will implement this during lesson
// Get all movies from database
app.get('/api/movies', async (req, res) => {
  try {
    // TODO: Get database reference
    // TODO: Access movies collection
    // TODO: Find all movies
    // TODO: Convert to array
    // TODO: Return movies
    
    // Placeholder response
    res.status(501).json({
      success: false,
      message: 'Database movie retrieval not implemented yet',
      hint: 'Students will implement this during the lesson'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch movies from database'
    });
  }
});

// TODO: Initialize database connection and start server
// Students will implement this during lesson
async function startServer() {
  try {
    console.log('🎬 Starting Movie Buzz API...');
    
    // TODO: Connect to database
    console.log('⚠️  Database connection not implemented yet');
    console.log('📚 Students will implement MongoDB connection during lesson');
    
    // Start server without database for now
    app.listen(PORT, () => {
      console.log(`🚀 Movie Buzz API running on http://localhost:${PORT}`);
      console.log('📖 Visit http://localhost:${PORT} for available endpoints');
      console.log('');
      console.log('🔧 TODO for lesson:');
      console.log('   - Implement database connection');
      console.log('   - Test /api/test-db endpoint');
      console.log('   - Implement /api/movies database retrieval');
      console.log('   - Compare file vs database performance');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

// Start the server
startServer();