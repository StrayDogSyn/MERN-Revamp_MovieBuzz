const mongoose = require('mongoose');

// TODO: Students will learn about connection strings and configuration
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie-buzz';

// TODO: Students will implement database connection during lesson
const connectDB = async () => {
  try {
    console.log('🍃 Connecting to MongoDB with Mongoose...');
    
    // TODO: Students will implement mongoose.connect()
    // TODO: Add connection options for better reliability
    // TODO: Log successful connection
    // TODO: Handle connection events
    
    // Placeholder - students will implement
    throw new Error('Database connection not implemented yet - students will add this during lesson');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// TODO: Students will learn about connection events
const setupConnectionEvents = () => {
  // TODO: Listen for connection events
  // TODO: Handle 'connected' event
  // TODO: Handle 'error' event  
  // TODO: Handle 'disconnected' event
  
  console.log('📚 Students will implement connection event listeners during lesson');
};

module.exports = connectDB;