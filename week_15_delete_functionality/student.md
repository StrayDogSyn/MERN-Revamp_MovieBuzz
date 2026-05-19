# Week 15 - DELETE Functionality #

- [Week 15 - DELETE Functionality](#week-15---delete-functionality)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Simple Examples - Building Understanding](#simple-examples---building-understanding)
  - [Starting Point](#starting-point)
  - [What is DELETE in CRUD?](#what-is-delete-in-crud)
  - [DELETE Operations](#delete-operations)
    - [Hard Delete vs Soft Delete](#hard-delete-vs-soft-delete)
    - [Implementing DELETE Routes](#implementing-delete-routes)
    - [DELETE Controller](#delete-controller)
  - [Error Handling for DELETE](#error-handling-for-delete)
  - [Testing DELETE Operations](#testing-delete-operations)
  - [Complete CRUD Summary](#complete-crud-summary)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Notes About This Lesson Plan ##

Please review this lesson plan in advance of our RI session. If this plan doesn't align with where you and your classmates are at in the LMS, please send a ticket to Help Desk as soon as possible.

This code is for instructional purposes only. It should be utilized as an example in developing your own work. No part of it should be directly copied into your own project. As per TLM's plagiarism policy, submitting or misrepresenting code or an idea as your own when it was created by someone else constitutes plagiarism.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Implement DELETE routes and controllers in Express
- Use Mongoose findByIdAndDelete for removing documents
- Handle "not found" scenarios gracefully
- Understand the difference between hard delete and soft delete
- Test DELETE operations thoroughly
- Complete full CRUD functionality for the Movie Buzz API

---

## Glossary ##

- `DELETE`: HTTP method for removing resources from the server
- `Hard Delete`: Permanently removing data from the database
- `Soft Delete`: Marking data as deleted without actually removing it
- `findByIdAndDelete`: Mongoose method to find and remove a document by ID
- `404 Not Found`: HTTP status for when a resource doesn't exist
- `CASCADE DELETE`: Removing related data when parent data is deleted

---

## Simple Examples - Building Understanding ##

Before diving into the full implementation, let's explore some simple, focused examples to build our understanding of DELETE operations step by step.

### Example 1: DELETE Request Handling ###

Let's start with a basic DELETE endpoint that processes removal requests:

```javascript
// Simple DELETE endpoint
app.delete('/api/movies/:id', (req, res) => {
  const { id } = req.params;

  console.log(`DELETE request for movie ID: ${id}`);

  // For now, just confirm we received the request
  res.json({
    success: true,
    message: `Received DELETE request for movie ${id}`,
    operation: 'DELETE',
    movieId: id
  });
});
```

**Try It Out:** Use Postman or curl to send DELETE requests and see how the server processes the request.

### Example 2: Confirming Deletion ###

Let's add logic to find and "delete" items from an in-memory array:

```javascript
// Sample data
let movies = [
  { id: 1, name: 'The Matrix', year: 1999, rating: 'R' },
  { id: 2, name: 'Inception', year: 2010, rating: 'PG-13' },
  { id: 3, name: 'Toy Story', year: 1995, rating: 'G' }
];

app.delete('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);

  // Step 1: Find the movie
  const movieIndex = movies.findIndex(movie => movie.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Movie not found',
      searchedId: movieId,
      availableIds: movies.map(m => m.id)
    });
  }

  // Step 2: Get the movie before deletion
  const movieToDelete = movies[movieIndex];

  // Step 3: Remove from array
  movies.splice(movieIndex, 1);

  // Step 4: Confirm deletion
  res.json({
    success: true,
    message: 'Movie deleted successfully',
    deletedMovie: movieToDelete,
    remainingCount: movies.length
  });
});

// Helper endpoint to see current movies
app.get('/api/movies', (req, res) => {
  res.json({
    success: true,
    count: movies.length,
    data: movies
  });
});
```

**Try It Out:** Delete movies one by one and use the GET endpoint to see the array shrinking.

### Example 3: Cascade Delete Concepts ###

Let's explore what happens when deletion affects related data:

```javascript
// Sample data with relationships
let movies = [
  { id: 1, name: 'The Matrix', year: 1999, directorId: 101 },
  { id: 2, name: 'Inception', year: 2010, directorId: 102 }
];

let directors = [
  { id: 101, name: 'The Wachowskis', movieCount: 1 },
  { id: 102, name: 'Christopher Nolan', movieCount: 1 }
];

let reviews = [
  { id: 1, movieId: 1, rating: 5, comment: 'Amazing!' },
  { id: 2, movieId: 1, rating: 4, comment: 'Good movie' },
  { id: 3, movieId: 2, rating: 5, comment: 'Mind-bending!' }
];

app.delete('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);

  // Find the movie
  const movieIndex = movies.findIndex(movie => movie.id === movieId);
  if (movieIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Movie not found'
    });
  }

  const movieToDelete = movies[movieIndex];

  // Check for related data that would be affected
  const relatedReviews = reviews.filter(review => review.movieId === movieId);

  // Option 1: Prevent deletion if related data exists
  if (relatedReviews.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Cannot delete movie with existing reviews',
      relatedReviews: relatedReviews.length,
      hint: 'Delete reviews first, or use force delete'
    });
  }

  // Option 2: Cascade delete (delete related data too)
  // Remove movie
  movies.splice(movieIndex, 1);

  // Update director's movie count
  const director = directors.find(d => d.id === movieToDelete.directorId);
  if (director) {
    director.movieCount -= 1;
  }

  res.json({
    success: true,
    message: 'Movie and related data deleted',
    deletedMovie: movieToDelete,
    updatedDirector: director
  });
});
```

**Try It Out:** See how deletion can affect related data and try both prevention and cascade approaches.

### Example 4: Soft Delete vs Hard Delete ###

Let's implement both approaches to see the difference:

```javascript
// Add deleted field to movies
let movies = [
  { id: 1, name: 'The Matrix', year: 1999, deleted: false },
  { id: 2, name: 'Inception', year: 2010, deleted: false },
  { id: 3, name: 'Toy Story', year: 1995, deleted: true } // Already soft-deleted
];

// Soft delete endpoint
app.delete('/api/movies/:id/soft', (req, res) => {
  const movieId = parseInt(req.params.id);

  const movie = movies.find(m => m.id === movieId && !m.deleted);
  if (!movie) {
    return res.status(404).json({
      success: false,
      error: 'Movie not found or already deleted'
    });
  }

  // Mark as deleted (soft delete)
  movie.deleted = true;
  movie.deletedAt = new Date().toISOString();

  res.json({
    success: true,
    message: 'Movie soft-deleted (can be restored)',
    operation: 'SOFT_DELETE',
    movie: movie
  });
});

// Hard delete endpoint
app.delete('/api/movies/:id/hard', (req, res) => {
  const movieId = parseInt(req.params.id);

  const movieIndex = movies.findIndex(m => m.id === movieId);
  if (movieIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Movie not found'
    });
  }

  // Permanently remove (hard delete)
  const deletedMovie = movies.splice(movieIndex, 1)[0];

  res.json({
    success: true,
    message: 'Movie permanently deleted (cannot be restored)',
    operation: 'HARD_DELETE',
    deletedMovie: deletedMovie
  });
});

// Restore soft-deleted movie
app.put('/api/movies/:id/restore', (req, res) => {
  const movieId = parseInt(req.params.id);

  const movie = movies.find(m => m.id === movieId && m.deleted);
  if (!movie) {
    return res.status(404).json({
      success: false,
      error: 'No soft-deleted movie found with this ID'
    });
  }

  // Restore the movie
  movie.deleted = false;
  delete movie.deletedAt;

  res.json({
    success: true,
    message: 'Movie restored successfully',
    movie: movie
  });
});

// Get active movies (filters out soft-deleted)
app.get('/api/movies/active', (req, res) => {
  const activeMovies = movies.filter(movie => !movie.deleted);
  res.json({
    success: true,
    count: activeMovies.length,
    data: activeMovies
  });
});
```

**Try It Out:** Compare soft delete (reversible) vs hard delete (permanent), and try restoring a soft-deleted movie.

These examples demonstrate the key concepts of DELETE operations and help you understand the different approaches before implementing with MongoDB!

---

## Starting Point ##

Before we begin this lesson, ensure your Movie Buzz API from previous weeks includes:
- Week 10: READ operations (GET endpoints)
- Week 11: CREATE operations (POST endpoints)
- Week 12: UPDATE operations (PUT/PATCH endpoints)

We'll be adding DELETE operations to complete the full CRUD functionality.

---

## What is DELETE in CRUD? ##

DELETE is the "D" in CRUD operations, representing the ability to remove data from your application:

- **C**reate - POST requests (Week 11)
- **R**ead - GET requests (Week 10)
- **U**pdate - PUT/PATCH requests (Week 12)
- **D**elete - DELETE requests (Week 13)

DELETE operations allow users to permanently remove movies from the database.

**Common DELETE Patterns:**
- Remove a single item by ID
- Bulk delete multiple items
- Soft delete (mark as inactive)
- Cascade delete (remove related data)

---

## DELETE Operations ##

### Hard Delete vs Soft Delete ###

**Hard Delete:**
- Permanently removes data from database
- Cannot be undone
- Frees up storage space
- Simple implementation

```javascript
// Hard delete - permanently removes the document
const deletedMovie = await Movie.findByIdAndDelete(movieId);
```

**Soft Delete:**
- Marks data as "deleted" but keeps it in database
- Can be undone/restored
- Uses more storage
- Requires filtering in queries

```javascript
// Soft delete - marks as deleted
const deletedMovie = await Movie.findByIdAndUpdate(movieId, {
  deleted: true,
  deletedAt: new Date()
});
```

For this lesson, we'll implement **hard delete** for simplicity.

### Implementing DELETE Routes ###

**Add DELETE route to movieRoutes.js:**

```javascript
const express = require('express');
const {
  getMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie  // New import
} = require('../controllers/movieController');

const router = express.Router();

// Existing routes
router.get('/', getMovies);
router.get('/:id', getMovieById);
router.post('/', createMovie);
router.put('/:id', updateMovie);

// New DELETE route
router.delete('/:id', deleteMovie);

module.exports = router;
```

### DELETE Controller ###

**Implement deleteMovie controller:**

```javascript
// DELETE /api/movies/:id - Delete a movie
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid movie ID format'
      });
    }
    
    // Find and delete the movie
    const deletedMovie = await Movie.findByIdAndDelete(id);
    
    // Check if movie was found
    if (!deletedMovie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Movie deleted successfully',
      data: deletedMovie
    });
    
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete movie',
      message: error.message
    });
  }
};
```

---

## Error Handling for DELETE ##

Common DELETE error scenarios:

**1. Movie Not Found:**
```javascript
if (!deletedMovie) {
  return res.status(404).json({
    success: false,
    error: 'Movie not found'
  });
}
```

**2. Invalid ID Format:**
```javascript
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({
    success: false,
    error: 'Invalid movie ID format'
  });
}
```

**3. Database Errors:**
```javascript
catch (error) {
  console.error('Error deleting movie:', error);
  res.status(500).json({
    success: false,
    error: 'Failed to delete movie'
  });
}
```

---

## Testing DELETE Operations ##

**Test with different scenarios:**

**1. Successful Delete:**
```bash
# DELETE /api/movies/[valid-movie-id]
curl -X DELETE http://localhost:4000/api/movies/507f1f77bcf86cd799439011
```

Expected response:
```json
{
  "success": true,
  "message": "Movie deleted successfully",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "The Matrix",
    "year": 1999
  }
}
```

**2. Movie Not Found:**
```bash
# DELETE with non-existent ID
curl -X DELETE http://localhost:4000/api/movies/507f1f77bcf86cd799439099
```

Expected response:
```json
{
  "success": false,
  "error": "Movie not found"
}
```

**3. Invalid ID Format:**
```bash
# DELETE with invalid ID
curl -X DELETE http://localhost:4000/api/movies/invalid-id
```

Expected response:
```json
{
  "success": false,
  "error": "Invalid movie ID format"
}
```

---

## Complete CRUD Summary ##

After implementing DELETE, your Movie Buzz API supports full CRUD operations:

**API Endpoints:**
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get movie by ID
- `POST /api/movies` - Create new movie
- `PUT /api/movies/:id` - Replace entire movie
- `PATCH /api/movies/:id` - Update specific fields
- `DELETE /api/movies/:id` - Delete movie

**HTTP Status Codes:**
- `200 OK` - Successful GET, PUT, PATCH, DELETE
- `201 Created` - Successful POST
- `400 Bad Request` - Invalid data or ID format
- `404 Not Found` - Resource doesn't exist
- `500 Internal Server Error` - Server errors

**Controller Functions:**
- `getMovies()` - List all movies
- `getMovieById()` - Get specific movie
- `createMovie()` - Add new movie
- `updateMovie()` - Modify existing movie
- `deleteMovie()` - Remove movie

---

## Final Thoughts ##

Congratulations! You've successfully implemented complete CRUD functionality for the Movie Buzz API. Your backend now supports:

- **Full Data Management**: Create, read, update, and delete movies
- **Proper Error Handling**: Graceful responses for all scenarios
- **RESTful Design**: Standard HTTP methods and status codes
- **Data Validation**: Mongoose schema validation
- **Database Operations**: Efficient MongoDB queries

**Next Steps:**
- Week 14 will introduce React frontend to consume this API
- You'll build a complete full-stack application
- React will provide the user interface for all CRUD operations

This completes the backend-focused portion of the MERN curriculum. You now have a solid foundation for building full-stack applications!

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Review ##

- What HTTP method is used for DELETE operations?
- How do you handle "not found" scenarios in DELETE controllers?
- What's the difference between hard delete and soft delete?
- How do you validate MongoDB ObjectId format?
- What are the main components of a complete CRUD API?
- How do you test DELETE operations safely?