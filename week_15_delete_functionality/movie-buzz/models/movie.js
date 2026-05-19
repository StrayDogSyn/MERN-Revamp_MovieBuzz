const mongoose = require('mongoose');

// Movie schema with complete field definitions
const MovieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Movie name is required'],
    trim: true,
    maxLength: [100, 'Movie name cannot exceed 100 characters']
  },
  
  year: {
    type: Number,
    required: [true, 'Release year is required'],
    min: [1900, 'Year must be 1900 or later'],
    max: [new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future']
  },
  
  rating: {
    type: String,
    required: [true, 'Movie rating is required'],
    enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
    uppercase: true
  },
  
  length: {
    type: String,
    required: [true, 'Movie length is required']
  },
  
  description: {
    type: String,
    required: [true, 'Movie description is required'],
    trim: true,
    maxLength: [1000, 'Description cannot exceed 1000 characters']
  },
  
  genre: {
    type: [String],
    required: [true, 'At least one genre is required'],
    validate: {
      validator: function(array) {
        return array.length > 0;
      },
      message: 'At least one genre must be specified'
    }
  },
  
  director: {
    type: String,
    required: [true, 'Director is required'],
    trim: true
  },
  
  stars: {
    type: [String],
    required: [true, 'At least one star is required'],
    validate: {
      validator: function(array) {
        return array.length > 0;
      },
      message: 'At least one star must be specified'
    }
  },
  
  poster: {
    type: String,
    validate: {
      validator: function(url) {
        return !url || /^https?:\/\/.+/.test(url);
      },
      message: 'Poster must be a valid URL'
    }
  }
}, {
  timestamps: true  // Automatically adds createdAt and updatedAt
});

// Instance method to get display year
MovieSchema.methods.getDisplayYear = function() {
  return `Released in ${this.year}`;
};

// Pre-save middleware for logging
MovieSchema.pre('save', function(next) {
  console.log(`💾 Saving movie: ${this.name}`);
  next();
});

// Pre-remove middleware for logging (used with DELETE operations)
MovieSchema.pre('remove', function(next) {
  console.log(`🗑️ Removing movie: ${this.name}`);
  next();
});

// Static method to find movies by genre
MovieSchema.statics.findByGenre = function(genre) {
  return this.find({ genre: { $in: [genre] } });
};

// Create and export the model
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;