const mongoose = require('mongoose');

// TODO: Students will create the Movie schema
// Define a schema with the following fields:
// - name: String, required, trimmed, max 100 characters
// - year: Number, required, min 1900, max current year + 5
// - rating: String, required, enum ['G', 'PG', 'PG-13', 'R', 'NC-17']
// - length: String, required
// - description: String, required, trimmed, max 1000 characters
// - genre: Array of Strings, required, at least one genre
// - director: String, required, trimmed
// - stars: Array of Strings, required, at least one star
// - poster: String, optional, must be valid URL if provided

const MovieSchema = new mongoose.Schema({
  // TODO: Students will implement schema fields here
  // HINT: Start with basic fields and add validation later

  // Example structure for one field:
  // name: {
  //   type: String,
  //   required: [true, 'Movie name is required'],
  //   trim: true,
  //   maxLength: [100, 'Movie name cannot exceed 100 characters']
  // },

  // TODO: Add remaining fields following the pattern above

}, {
  // TODO: Add timestamps option to automatically track createdAt and updatedAt
  // timestamps: ???
});

// TODO: Students will add instance methods (optional)
// Example: MovieSchema.methods.getDisplayYear = function() { ... }

// TODO: Students will add static methods (optional)
// Example: MovieSchema.statics.findByGenre = function(genre) { ... }

// TODO: Students will create and export the model
// const Movie = mongoose.model('???', ???);
// module.exports = ???;

// Temporary export for testing - students will replace this
module.exports = mongoose.model('Movie', MovieSchema);