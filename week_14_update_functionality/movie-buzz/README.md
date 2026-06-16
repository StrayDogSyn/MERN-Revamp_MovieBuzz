# Movie Buzz - Week 14: UPDATE Functionality

Building on Week 13's CREATE operations, this week adds UPDATE functionality to allow editing existing movies in the MongoDB database through PUT endpoints.

## What's New in Week 14

- **PUT Endpoints**: Update existing movies via API
- **findByIdAndUpdate**: Mongoose method for updating documents
- **Partial Updates**: Allow updating specific fields without affecting others
- **Pre-update Validation**: Validate changes before applying to database
- **Version Control**: Handle concurrent updates safely
- **Testing**: Comprehensive testing of update scenarios

## Learning Objectives

- Implement PUT endpoints in Express
- Use Mongoose update methods effectively
- Handle partial updates and field validation
- Manage concurrent update scenarios
- Test UPDATE operations thoroughly
- Understand RESTful update conventions

## Getting Started

```bash
# Install dependencies
npm install

# Make sure MongoDB is running
# On Mac: brew services start mongodb-community
# On Windows: net start MongoDB

# Seed the database (optional)
npm run seed

# Start the server
npm start
```

Server runs on `http://localhost:4000`

## Project Structure

```
movie-buzz/
├── config/
│   └── db_connection.js    # MongoDB connection setup
├── controllers/
│   └── movieController.js  # Controller with CRUD operations
├── models/
│   └── movie.js            # Mongoose schema and model
├── routes/
│   └── movieRoutes.js      # Express routes definition
├── data/
│   └── movies.json         # Sample data for seeding
├── server.js               # Express server setup
├── db-seed.js             # Database seeding script
├── package.json
└── README.md
```

## Implementation Guide - TODO Placement Instructions

### Step 1: Add PUT Route
**File: `routes/movieRoutes.js` (Lines 15-20)**
```javascript
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Existing routes from previous weeks...
router.get('/movies', movieController.getAllMovies);
router.get('/movie/:id', movieController.getMovieById);
router.post('/movie/new', movieController.createMovie);

// TODO: Add PUT route for updating a movie
router.put('/movie/:id', movieController.updateMovie);

module.exports = router;
```

### Step 2: Implement Update Controller Method
**File: `controllers/movieController.js` (Lines 85-130)**
```javascript
// TODO: Add updateMovie controller method
const updateMovie = async (req, res) => {
  try {
    // TODO: Extract movie ID from URL parameters
    const { id } = req.params;
    const updateData = req.body;
    
    // TODO: Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid movie ID format'
      });
    }
    
    // TODO: Remove undefined/empty fields from update data
    const cleanUpdateData = {};
    Object.keys(updateData).forEach(key => {
      if (updateData[key] !== undefined && updateData[key] !== '') {
        cleanUpdateData[key] = updateData[key];
      }
    });
    
    // TODO: Validate update data if present
    if (cleanUpdateData.year && (cleanUpdateData.year < 1900 || cleanUpdateData.year > 2030)) {
      return res.status(400).json({
        error: 'Year must be between 1900 and 2030'
      });
    }
    
    if (cleanUpdateData.rating && !['G', 'PG', 'PG-13', 'R', 'NR'].includes(cleanUpdateData.rating)) {
      return res.status(400).json({
        error: 'Rating must be G, PG, PG-13, R, or NR'
      });
    }
    
    // TODO: Update movie using findByIdAndUpdate
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { $set: cleanUpdateData },  // Use $set operator for partial updates
      { 
        new: true,              // Return updated document
        runValidators: true     // Run schema validation on update
      }
    );
    
    // TODO: Check if movie was found and updated
    if (!updatedMovie) {
      return res.status(404).json({
        error: 'Movie not found'
      });
    }
    
    // TODO: Return success response with updated movie
    res.status(200).json({
      message: 'Movie updated successfully',
      movie: updatedMovie
    });
    
  } catch (error) {
    // TODO: Handle validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.message
      });
    }
    
    // TODO: Handle cast errors (invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid movie ID'
      });
    }
    
    // TODO: Handle other errors
    console.error('Error updating movie:', error);
    res.status(500).json({
      error: 'Failed to update movie'
    });
  }
};

// TODO: Export the new controller method
module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie  // Add this to exports
};
```

### Step 3: Add Pre-Update Middleware (Optional)
**File: `models/movie.js` (Lines 45-60)**
```javascript
// TODO: Add pre-update middleware for additional validation
movieSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  
  // TODO: Custom validation logic
  if (update.$set && update.$set.name) {
    // Ensure name is properly formatted
    update.$set.name = update.$set.name.trim();
    
    // Check name length
    if (update.$set.name.length === 0) {
      return next(new Error('Movie name cannot be empty'));
    }
  }
  
  next();
});
```

### Step 4: Handle Duplicate Names on Update
**File: `controllers/movieController.js` (Lines 95-105)**
```javascript
    // TODO: Check for duplicate names (excluding current movie)
    if (cleanUpdateData.name || cleanUpdateData.year) {
      const duplicateQuery = {
        _id: { $ne: id }  // Exclude current movie from duplicate check
      };
      
      if (cleanUpdateData.name) duplicateQuery.name = cleanUpdateData.name;
      if (cleanUpdateData.year) duplicateQuery.year = cleanUpdateData.year;
      
      const existingMovie = await Movie.findOne(duplicateQuery);
      if (existingMovie) {
        return res.status(409).json({
          error: 'Another movie with this name and year already exists'
        });
      }
    }
```

### Step 5: Add Optimistic Locking (Advanced)
**File: `models/movie.js` (Lines 40-45)**
```javascript
// TODO: Add version field for optimistic locking
movieSchema.add({
  version: {
    type: Number,
    default: 0
  }
});

// TODO: Increment version on update
movieSchema.pre('findOneAndUpdate', function() {
  this.update({}, { $inc: { version: 1 } });
});
```

### Step 6: Create GET Route for Edit Form Data
**File: `routes/movieRoutes.js` (Lines 18-20)**
```javascript
// TODO: Add specific route for getting movie data for editing
router.get('/movie/:id/edit', movieController.getMovieForEdit);
```

### Step 7: Implement Edit Data Controller
**File: `controllers/movieController.js` (Lines 135-155)**
```javascript
// TODO: Add controller method to get movie for editing
const getMovieForEdit = async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid movie ID format'
      });
    }
    
    // TODO: Find movie by ID
    const movie = await Movie.findById(id);
    
    if (!movie) {
      return res.status(404).json({
        error: 'Movie not found'
      });
    }
    
    // TODO: Return movie data formatted for editing
    res.status(200).json({
      movie: movie,
      editableFields: ['name', 'description', 'rating', 'length', 'year', 'genre', 'director', 'stars']
    });
    
  } catch (error) {
    console.error('Error getting movie for edit:', error);
    res.status(500).json({
      error: 'Failed to retrieve movie'
    });
  }
};

// TODO: Add to exports
module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  getMovieForEdit  // Add this to exports
};
```

### Step 8: Add Bulk Update Endpoint (Optional)
**File: `routes/movieRoutes.js` (Lines 22-25)**
```javascript
// TODO: Add route for bulk updates (update multiple movies)
router.put('/movies/bulk', movieController.bulkUpdateMovies);
```

### Step 9: Implement Bulk Update Controller
**File: `controllers/movieController.js` (Lines 160-185)**
```javascript
// TODO: Add bulk update controller method
const bulkUpdateMovies = async (req, res) => {
  try {
    const { updates } = req.body;  // Array of {id, data} objects
    
    // TODO: Validate updates array
    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({
        error: 'Updates must be a non-empty array'
      });
    }
    
    const results = [];
    const errors = [];
    
    // TODO: Process each update
    for (const update of updates) {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          update.id,
          { $set: update.data },
          { new: true, runValidators: true }
        );
        
        if (updatedMovie) {
          results.push(updatedMovie);
        } else {
          errors.push({ id: update.id, error: 'Movie not found' });
        }
      } catch (error) {
        errors.push({ id: update.id, error: error.message });
      }
    }
    
    // TODO: Return results and errors
    res.status(200).json({
      message: `Updated ${results.length} movies`,
      updated: results,
      errors: errors
    });
    
  } catch (error) {
    console.error('Error in bulk update:', error);
    res.status(500).json({
      error: 'Failed to perform bulk update'
    });
  }
};
```

## Testing Your Implementation

### Using Postman

1. **Update a Movie**:
   - Method: PUT
   - URL: `http://localhost:4000/api/movies/{movie_id}`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Inception - Director's Cut",
     "rating": "R",
     "description": "Extended version with additional scenes"
   }
   ```

2. **Partial Update**:
   ```json
   {
     "year": 2011
   }
   ```

3. **Test Validation**:
   - Try updating with invalid year
   - Try updating with invalid rating
   - Try updating non-existent movie ID

4. **Get Movie for Editing**:
   - Method: GET
   - URL: `http://localhost:4000/api/movies/{movie_id}`

### Using cURL

```bash
# Update a movie
curl -X PUT http://localhost:4000/api/movies/{movie_id} \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Movie Title",
    "rating": "PG-13"
  }'

# Get movie for editing
curl -X GET http://localhost:4000/api/movies/{movie_id}
```

## Common Issues and Solutions

- **Movie not found**: Verify the movie ID exists in database
- **Validation errors**: Check that updated fields meet schema requirements
- **Partial updates not working**: Ensure you're using `$set` operator
- **Concurrent updates**: Consider implementing optimistic locking
- **Invalid ObjectId**: Validate ID format before database operations

## RESTful Conventions

- PUT `/api/movies/:id` - Update entire resource (full update)
- PATCH `/api/movies/:id` - Update partial resource (partial update)
- Return 200 (OK) status on successful update
- Return 404 (Not Found) if resource doesn't exist
- Return 400 (Bad Request) for validation errors
- Include updated resource in response body

## Advanced Features

- **Optimistic Locking**: Prevent conflicting updates
- **Field History**: Track changes to specific fields
- **Bulk Updates**: Update multiple movies in one request
- **Conditional Updates**: Update only if certain conditions are met

## Next Steps

Week 15 will add DELETE functionality, completing full CRUD operations for the Movie Buzz API.