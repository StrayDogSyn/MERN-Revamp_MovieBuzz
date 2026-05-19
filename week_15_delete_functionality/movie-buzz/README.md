# Movie Buzz - Week 15: DELETE Functionality

Completing the CRUD operations from Week 14's UPDATE functionality, this week adds DELETE functionality to allow safe removal of movies from the MongoDB database through DELETE endpoints.

## What's New in Week 15

- **DELETE Endpoints**: Remove movies via API
- **findByIdAndDelete**: Mongoose method for safe document removal  
- **Cascade Considerations**: Handle related data before deletion
- **Soft Delete Options**: Mark as deleted vs. permanent removal
- **Bulk Delete**: Remove multiple movies efficiently
- **Complete CRUD**: Full Create, Read, Update, Delete operations

## Learning Objectives

- Implement DELETE endpoints in Express
- Use Mongoose deletion methods safely
- Handle cascading deletes and data integrity
- Implement soft delete patterns
- Test DELETE operations comprehensively
- Understand RESTful deletion conventions

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

### Step 1: Add DELETE Route
**File: `routes/movieRoutes.js` (Lines 20-25)**
```javascript
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Existing routes from previous weeks...
router.get('/movies', movieController.getAllMovies);
router.get('/movie/:id', movieController.getMovieById);
router.post('/movie/new', movieController.createMovie);
router.put('/movie/:id', movieController.updateMovie);

// TODO: Add DELETE route for removing a movie
router.delete('/movie/:id', movieController.deleteMovie);

module.exports = router;
```

### Step 2: Implement Delete Controller Method
**File: `controllers/movieController.js` (Lines 190-230)**
```javascript
// TODO: Add deleteMovie controller method
const deleteMovie = async (req, res) => {
  try {
    // TODO: Extract movie ID from URL parameters
    const { id } = req.params;
    
    // TODO: Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid movie ID format'
      });
    }
    
    // TODO: Check if movie exists before attempting to delete
    const movieToDelete = await Movie.findById(id);
    if (!movieToDelete) {
      return res.status(404).json({
        error: 'Movie not found'
      });
    }
    
    // TODO: Log the deletion attempt for audit purposes
    console.log(`Attempting to delete movie: ${movieToDelete.name} (ID: ${id})`);
    
    // TODO: Delete movie using findByIdAndDelete
    const deletedMovie = await Movie.findByIdAndDelete(id);
    
    // TODO: Return success response with deleted movie data
    res.status(200).json({
      message: 'Movie deleted successfully',
      deletedMovie: {
        _id: deletedMovie._id,
        name: deletedMovie.name,
        year: deletedMovie.year,
        director: deletedMovie.director
      }
    });
    
  } catch (error) {
    // TODO: Handle cast errors (invalid ObjectId)
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid movie ID format'
      });
    }
    
    // TODO: Handle other errors
    console.error('Error deleting movie:', error);
    res.status(500).json({
      error: 'Failed to delete movie',
      details: error.message
    });
  }
};

// TODO: Export the new controller method
module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie  // Add this to exports
};
```

### Step 3: Add Soft Delete Functionality (Optional)
**File: `models/movie.js` (Lines 50-55)**
```javascript
// TODO: Add soft delete field to schema
const movieSchema = new mongoose.Schema({
  // ... existing fields ...
  
  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  },
  deletedBy: {
    type: String,
    default: null
  }
}, {
  timestamps: true
});

// TODO: Add query middleware to exclude soft-deleted movies
movieSchema.pre(/^find/, function(next) {
  // Only show non-deleted movies by default
  this.find({ isDeleted: { $ne: true } });
  next();
});
```

### Step 4: Implement Soft Delete Controller
**File: `controllers/movieController.js` (Lines 235-270)**
```javascript
// TODO: Add softDeleteMovie controller method
const softDeleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid movie ID format'
      });
    }
    
    // TODO: Find and soft delete the movie
    const softDeletedMovie = await Movie.findByIdAndUpdate(
      id,
      { 
        isDeleted: true,
        deletedAt: new Date(),
        deletedBy: req.user?.id || 'system'  // If you have user authentication
      },
      { new: true }
    );
    
    if (!softDeletedMovie) {
      return res.status(404).json({
        error: 'Movie not found'
      });
    }
    
    // TODO: Return success response
    res.status(200).json({
      message: 'Movie soft deleted successfully',
      movie: {
        _id: softDeletedMovie._id,
        name: softDeletedMovie.name,
        isDeleted: softDeletedMovie.isDeleted,
        deletedAt: softDeletedMovie.deletedAt
      }
    });
    
  } catch (error) {
    console.error('Error soft deleting movie:', error);
    res.status(500).json({
      error: 'Failed to soft delete movie'
    });
  }
};
```

### Step 5: Add Bulk Delete Functionality
**File: `routes/movieRoutes.js` (Lines 25-30)**
```javascript
// TODO: Add routes for bulk delete operations
router.delete('/movies/bulk', movieController.bulkDeleteMovies);
router.delete('/movies/soft/:id', movieController.softDeleteMovie);
router.put('/movies/restore/:id', movieController.restoreMovie);
```

### Step 6: Implement Bulk Delete Controller
**File: `controllers/movieController.js` (Lines 275-310)**
```javascript
// TODO: Add bulkDeleteMovies controller method
const bulkDeleteMovies = async (req, res) => {
  try {
    const { movieIds } = req.body;
    
    // TODO: Validate movieIds array
    if (!Array.isArray(movieIds) || movieIds.length === 0) {
      return res.status(400).json({
        error: 'movieIds must be a non-empty array'
      });
    }
    
    // TODO: Validate all ObjectIds
    const invalidIds = movieIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        error: 'Invalid movie ID format',
        invalidIds: invalidIds
      });
    }
    
    // TODO: Delete multiple movies
    const result = await Movie.deleteMany({
      _id: { $in: movieIds }
    });
    
    // TODO: Return deletion results
    res.status(200).json({
      message: `Successfully deleted ${result.deletedCount} movies`,
      deletedCount: result.deletedCount,
      requestedCount: movieIds.length
    });
    
  } catch (error) {
    console.error('Error in bulk delete:', error);
    res.status(500).json({
      error: 'Failed to perform bulk delete'
    });
  }
};
```

### Step 7: Add Restore Functionality for Soft Deletes
**File: `controllers/movieController.js` (Lines 315-345)**
```javascript
// TODO: Add restoreMovie controller method
const restoreMovie = async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid movie ID format'
      });
    }
    
    // TODO: Find and restore soft-deleted movie (bypass the pre middleware)
    const restoredMovie = await Movie.findByIdAndUpdate(
      id,
      { 
        isDeleted: false,
        deletedAt: null,
        deletedBy: null
      },
      { new: true }
    ).where({ isDeleted: true });  // Only restore if it was soft-deleted
    
    if (!restoredMovie) {
      return res.status(404).json({
        error: 'Deleted movie not found or already restored'
      });
    }
    
    // TODO: Return success response
    res.status(200).json({
      message: 'Movie restored successfully',
      movie: restoredMovie
    });
    
  } catch (error) {
    console.error('Error restoring movie:', error);
    res.status(500).json({
      error: 'Failed to restore movie'
    });
  }
};

// TODO: Add all new methods to exports
module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  softDeleteMovie,
  bulkDeleteMovies,
  restoreMovie
};
```

### Step 8: Add Pre-Delete Validation Middleware
**File: `models/movie.js` (Lines 60-75)**
```javascript
// TODO: Add pre-delete middleware for validation
movieSchema.pre('findOneAndDelete', async function(next) {
  const movieToDelete = await this.model.findOne(this.getQuery());
  
  if (!movieToDelete) {
    return next(new Error('Movie not found'));
  }
  
  // TODO: Add any business logic checks before deletion
  // For example, check if movie has associated reviews, ratings, etc.
  
  console.log(`Pre-delete validation passed for: ${movieToDelete.name}`);
  next();
});

// TODO: Add post-delete middleware for cleanup
movieSchema.post('findOneAndDelete', function(doc, next) {
  if (doc) {
    console.log(`Successfully deleted movie: ${doc.name}`);
    // TODO: Clean up related data if needed
  }
  next();
});
```

### Step 9: Add Delete Confirmation Endpoint
**File: `routes/movieRoutes.js` (Lines 30-32)**
```javascript
// TODO: Add route for delete confirmation (get movie info before deletion)
router.get('/movie/:id/delete-confirm', movieController.getDeleteConfirmation);
```

### Step 10: Implement Delete Confirmation Controller
**File: `controllers/movieController.js` (Lines 350-370)**
```javascript
// TODO: Add getDeleteConfirmation controller method
const getDeleteConfirmation = async (req, res) => {
  try {
    const { id } = req.params;
    
    // TODO: Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid movie ID format'
      });
    }
    
    // TODO: Get movie details for confirmation
    const movie = await Movie.findById(id);
    
    if (!movie) {
      return res.status(404).json({
        error: 'Movie not found'
      });
    }
    
    // TODO: Return movie info for confirmation dialog
    res.status(200).json({
      movie: {
        _id: movie._id,
        name: movie.name,
        year: movie.year,
        director: movie.director
      },
      warning: 'This action cannot be undone. Are you sure you want to delete this movie?'
    });
    
  } catch (error) {
    console.error('Error getting delete confirmation:', error);
    res.status(500).json({
      error: 'Failed to retrieve movie information'
    });
  }
};
```

## Testing Your Implementation

### Using Postman

1. **Delete a Movie**:
   - Method: DELETE
   - URL: `http://localhost:4000/api/movie/{movie_id}`
   - Expected Response: 200 with deleted movie info

2. **Delete Non-Existent Movie**:
   - Method: DELETE
   - URL: `http://localhost:4000/api/movie/507f1f77bcf86cd799439011`
   - Expected Response: 404 Movie not found

3. **Soft Delete a Movie**:
   - Method: DELETE
   - URL: `http://localhost:4000/api/movies/soft/{movie_id}`

4. **Bulk Delete Movies**:
   - Method: DELETE
   - URL: `http://localhost:4000/api/movies/bulk`
   - Body:
   ```json
   {
     "movieIds": ["movie_id_1", "movie_id_2", "movie_id_3"]
   }
   ```

5. **Restore Soft-Deleted Movie**:
   - Method: PUT
   - URL: `http://localhost:4000/api/movies/restore/{movie_id}`

### Using cURL

```bash
# Delete a movie
curl -X DELETE http://localhost:4000/api/movie/{movie_id}

# Get delete confirmation
curl -X GET http://localhost:4000/api/movie/{movie_id}/delete-confirm

# Bulk delete movies
curl -X DELETE http://localhost:4000/api/movies/bulk \
  -H "Content-Type: application/json" \
  -d '{
    "movieIds": ["movie_id_1", "movie_id_2"]
  }'
```

## Common Issues and Solutions

- **Movie not found**: Verify the movie ID exists in database before deletion
- **Cannot delete non-existent movie**: Check ID format and database connection
- **Soft delete not working**: Ensure isDeleted field is added to schema
- **Bulk delete failing**: Validate all IDs in the array before processing
- **Cascade deletion needed**: Implement cleanup for related data

## RESTful Conventions

- DELETE `/api/movie/:id` - Delete single resource
- DELETE `/api/movies/bulk` - Delete multiple resources
- Return 200 (OK) status on successful deletion
- Return 404 (Not Found) if resource doesn't exist
- Return 400 (Bad Request) for invalid IDs
- Include deleted resource info in response

## Best Practices

- **Always validate** ObjectId format before deletion
- **Check existence** before attempting to delete
- **Log deletions** for audit purposes
- **Consider soft delete** for recoverable operations
- **Handle related data** appropriately
- **Provide confirmation** endpoints for UI integration

## Data Safety

- **Backup strategy**: Regular database backups before bulk operations
- **Soft delete preferred**: For user-generated content
- **Cascade considerations**: Handle foreign key relationships
- **Transaction support**: For complex multi-document operations
- **Audit logging**: Track who deleted what and when

## Next Steps

Week 16 will integrate the complete CRUD API with the React frontend, creating a full-stack application with create, read, update, and delete functionality.