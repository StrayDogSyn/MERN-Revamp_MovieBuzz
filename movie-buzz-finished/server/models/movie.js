const mongoose = require('mongoose');
const { Schema } = mongoose;

const VALID_RATINGS = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR'];
const CURRENT_YEAR = new Date().getFullYear();

const movieSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Movie name is required'],
      trim: true,
      minlength: [2, 'Movie name must be at least 2 characters']
    },
    description: {
      type: String,
      trim: true,
      default: ''
    },
    rating: {
      type: String,
      enum: {
        values: VALID_RATINGS,
        message: `Rating must be one of: ${VALID_RATINGS.join(', ')}` 
      }
    },
    length: {
      type: String,
      trim: true
    },
    year: {
      type: Number,
      min: [1888, 'Year cannot be before 1888 (first film ever made)'],
      max: [CURRENT_YEAR + 2, `Year cannot be more than 2 years in the future`]
    },
    genre: {
      type: [String],
      default: []
    },
    director: {
      type: String,
      trim: true,
      default: ''
    },
    stars: {
      type: [String],
      default: []
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('movie', movieSchema);