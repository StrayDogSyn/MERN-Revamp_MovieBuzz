// Database seeding script for Week 13
// This script loads sample movies into MongoDB using Mongoose

const mongoose = require('mongoose');
const Movie = require('./models/movie');
const fs = require('fs').promises;
const path = require('path');

// Connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie-buzz';

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seed...');
    
    // Connect to MongoDB
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');
    
    // Clear existing movies
    await Movie.deleteMany({});
    console.log('🧹 Cleared existing movies');
    
    // Read sample movies data
    const moviesData = await fs.readFile(
      path.join(__dirname, 'data', 'movies.json'), 
      'utf8'
    );
    const movies = JSON.parse(moviesData);
    console.log(`📚 Loaded ${movies.length} movies from JSON file`);
    
    // Insert movies using Mongoose
    const result = await Movie.insertMany(movies);
    console.log(`🎬 Successfully seeded ${result.length} movies`);
    
    // Display seeded movies
    console.log('\n📋 Seeded movies:');
    result.forEach((movie, index) => {
      console.log(`   ${index + 1}. ${movie.name} (${movie.year}) - ${movie.director}`);
    });
    
    // Test a query
    const movieCount = await Movie.countDocuments();
    console.log(`\n📊 Total movies in database: ${movieCount}`);
    
    // Test finding a specific movie
    const sampleMovie = await Movie.findOne({ name: 'The Matrix' });
    if (sampleMovie) {
      console.log(`🔍 Sample query successful: Found "${sampleMovie.name}"`);
    }
    
    console.log('\n🎉 Database seeding completed successfully!');
    console.log('💡 You can now start your server and test the DELETE functionality');
    console.log('🗑️ Try deleting movies with: DELETE /api/movies/:id');
    
  } catch (error) {
    console.error('❌ Database seeding failed:', error.message);
  } finally {
    // Close database connection
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
    process.exit(0);
  }
};

// Run seeding if called directly
if (require.main === module) {
  seedDatabase();
}

module.exports = { seedDatabase };