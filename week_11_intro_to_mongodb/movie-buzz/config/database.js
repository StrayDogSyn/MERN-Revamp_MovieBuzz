const { MongoClient } = require('mongodb');

// Connection URI - students will learn about this
const uri = 'mongodb://localhost:27017';
const dbName = 'movie-buzz';

let db = null;

// TODO: Students will implement this function during the lesson
async function connectToDatabase() {
  try {
    console.log('🍃 Attempting to connect to MongoDB...');
    
    // TODO: Create MongoClient instance
    // TODO: Connect to MongoDB
    // TODO: Get database reference
    // TODO: Store database reference
    // TODO: Log success message
    // TODO: Return database reference
    
    // Placeholder for lesson - students will implement
    throw new Error('Database connection not implemented yet');
    
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

// TODO: Students will implement this function
function getDatabase() {
  // TODO: Check if database is initialized
  // TODO: Throw error if not initialized
  // TODO: Return database reference
  
  // Placeholder for lesson
  throw new Error('getDatabase function not implemented yet');
}

module.exports = {
  connectToDatabase,
  getDatabase
};