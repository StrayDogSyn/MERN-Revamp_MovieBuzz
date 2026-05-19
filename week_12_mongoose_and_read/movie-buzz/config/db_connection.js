const mongoose = require('mongoose');

// Connection string
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/movie-buzz';

// Database connection function
const connectDB = async () => {
  try {
    console.log('🍃 Connecting to MongoDB with Mongoose...');
    
    // TODO: Students will implement Mongoose connection
    // TODO: Use mongoose.connect() with the MONGODB_URI
    // TODO: Pass in connection options:
    //   - useNewUrlParser: true
    //   - useUnifiedTopology: true
    // TODO: Log success message when connected
    
    // Temporary placeholder - students will replace this
    console.log('⚠️ Database connection not yet implemented');
    console.log('📝 Students will implement Mongoose connection here');
    
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

// TODO: Students will add connection event listeners
// mongoose.connection.on('connected', ...)
// mongoose.connection.on('error', ...)
// mongoose.connection.on('disconnected', ...)

// TODO: Students will handle graceful shutdown
// process.on('SIGINT', ...)

module.exports = connectDB;