// Database setup script for students to run after learning MongoDB basics
// This script will be used during the lesson to populate the database

const { MongoClient } = require('mongodb');
const fs = require('fs').promises;
const path = require('path');

const uri = 'mongodb://localhost:27017';
const dbName = 'movie-buzz';

async function setupDatabase() {
  let client;
  
  try {
    console.log('🍃 Setting up Movie Buzz database...');
    
    // Connect to MongoDB
    client = new MongoClient(uri);
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    // Get database reference
    const db = client.db(dbName);
    console.log(`📊 Using database: ${dbName}`);
    
    // Load sample movies data
    const moviesData = await fs.readFile(path.join(__dirname, 'data', 'movies.json'), 'utf8');
    const movies = JSON.parse(moviesData);
    
    // Add timestamps to movies
    const moviesWithTimestamps = movies.map(movie => ({
      ...movie,
      createdAt: new Date(),
      updatedAt: new Date()
    }));
    
    // Clear existing movies (if any)
    await db.collection('movies').deleteMany({});
    console.log('🧹 Cleared existing movies');
    
    // Insert sample movies
    const result = await db.collection('movies').insertMany(moviesWithTimestamps);
    console.log(`🎬 Inserted ${result.insertedCount} movies`);
    
    // Verify the data
    const movieCount = await db.collection('movies').countDocuments();
    console.log(`📊 Total movies in database: ${movieCount}`);
    
    // Show sample data
    console.log('\n📋 Sample movies:');
    const sampleMovies = await db.collection('movies').find({}, { 
      projection: { name: 1, year: 1, director: 1, _id: 0 } 
    }).toArray();
    
    sampleMovies.forEach(movie => {
      console.log(`   - ${movie.name} (${movie.year}) - Dir: ${movie.director}`);
    });
    
    console.log('\n🎉 Database setup complete!');
    console.log('💡 You can now test your API endpoints:');
    console.log('   - GET /api/test-db');
    console.log('   - GET /api/movies');
    
  } catch (error) {
    console.error('❌ Database setup failed:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('🔌 Database connection closed');
    }
  }
}

// Run setup if called directly
if (require.main === module) {
  setupDatabase();
}

module.exports = { setupDatabase };