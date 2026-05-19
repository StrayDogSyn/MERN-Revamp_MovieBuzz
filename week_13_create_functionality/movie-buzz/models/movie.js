const mongoose = require('mongoose');

// TODO: Students will create the Movie schema during lesson
const MovieSchema = new mongoose.Schema({
  // TODO: Define name field with validation
  // name: {
  //   type: String,
  //   required: [true, 'Movie name is required'],
  //   trim: true,
  //   maxLength: [100, 'Movie name cannot exceed 100 characters']
  // },
  
  // TODO: Define year field with validation
  // year: {
  //   type: Number,
  //   required: [true, 'Release year is required'],
  //   min: [1900, 'Year must be 1900 or later'],
  //   max: [new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future']
  // },
  
  // TODO: Define rating field
  // rating: {
  //   type: String,
  //   required: [true, 'Movie rating is required'],
  //   enum: ['G', 'PG', 'PG-13', 'R', 'NC-17'],
  //   uppercase: true
  // },
  
  // TODO: Define length field
  // length: {
  //   type: String,
  //   required: [true, 'Movie length is required']
  // },
  
  // TODO: Define description field
  // description: {
  //   type: String,
  //   required: [true, 'Movie description is required'],
  //   trim: true,
  //   maxLength: [1000, 'Description cannot exceed 1000 characters']
  // },
  
  // TODO: Define genre array
  // genre: {
  //   type: [String],
  //   required: [true, 'At least one genre is required'],
  //   validate: {
  //     validator: function(array) {
  //       return array.length > 0;
  //     },
  //     message: 'At least one genre must be specified'
  //   }
  // },
  
  // TODO: Define director field
  // director: {
  //   type: String,
  //   required: [true, 'Director is required'],
  //   trim: true
  // },
  
  // TODO: Define stars array
  // stars: {
  //   type: [String],
  //   required: [true, 'At least one star is required'],
  //   validate: {
  //     validator: function(array) {
  //       return array.length > 0;
  //     },
  //     message: 'At least one star must be specified'
  //   }
  // },
  
  // TODO: Define optional poster URL
  // poster: {
  //   type: String,
  //   validate: {
  //     validator: function(url) {
  //       return !url || /^https?:\/\/.+/.test(url);
  //     },
  //     message: 'Poster must be a valid URL'
  //   }
  // }
  
  // Placeholder field - students will replace this with proper schema
  placeholder: {
    type: String,
    default: 'Students will implement movie schema during lesson'
  }
}, {
  // TODO: Students will learn about schema options
  timestamps: true  // Automatically adds createdAt and updatedAt
});

// TODO: Students will learn about schema methods and statics
MovieSchema.methods.getDisplayYear = function() {
  // TODO: Add instance method to format display year
  return `Released in ${this.year}`;
};

// TODO: Students will learn about pre-save middleware
MovieSchema.pre('save', function(next) {
  // TODO: Add pre-save validation or formatting
  console.log('📚 Students will implement pre-save middleware');
  next();
});

// TODO: Students will create and export the model
const Movie = mongoose.model('Movie', MovieSchema);

module.exports = Movie;