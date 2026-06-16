# Week 15 - DELETE Functionality #

- [Week 15 - DELETE Functionality](#week-15---delete-functionality)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [Understanding DELETE Operations](#understanding-delete-operations)
    - [Hard Delete vs Soft Delete](#hard-delete-vs-soft-delete)
    - [Cascade Delete Patterns](#cascade-delete-patterns)
    - [DELETE in RESTful APIs](#delete-in-restful-apis)
  - [Implementing DELETE with Mongoose](#implementing-delete-with-mongoose)
    - [Basic Document Deletion](#basic-document-deletion)
    - [Mongoose Deletion Methods](#mongoose-deletion-methods)
    - [Pre and Post Delete Middleware](#pre-and-post-delete-middleware)
  - [Building DELETE API Endpoints](#building-delete-api-endpoints)
  - [Confirmation Workflows](#confirmation-workflows)
  - [Soft Delete Implementation](#soft-delete-implementation)
  - [Bulk Delete Operations](#bulk-delete-operations)
  - [Testing DELETE Operations](#testing-delete-operations)
  - [Error Handling and Edge Cases](#error-handling-and-edge-cases)
  - [Security Considerations](#security-considerations)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students have completed READ (Week 12), CREATE (Week 13), and UPDATE (Week 14) operations. They understand Mongoose schemas, validation, and Express routing patterns. This week completes the CRUD cycle with DELETE operations — the "D" in CRUD. While DELETE is conceptually the simplest operation, it introduces critical concerns around data integrity, safety, and recoverability that make it one of the most important operations to implement correctly.

**Key Teaching Focus**: DELETE is not just about removing data. Professional applications must consider: "What if we need that data back?" "What happens to related data?" "How do we prevent accidental deletions?" This week teaches students to think about data lifecycle management, not just data removal.

**Why This Week Matters**: This is the capstone of the CRUD sequence. After this week, students have a complete, production-quality API. The patterns learned here (soft delete, cascade considerations, confirmation workflows) are used in every professional application.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Implement DELETE operations using Mongoose `findByIdAndDelete`
- Build robust API endpoints for removing movies with proper validation
- Understand and implement hard delete vs soft delete strategies
- Handle cascade delete considerations for related data
- Implement confirmation workflows to prevent accidental deletions
- Perform bulk delete operations safely
- Use Mongoose middleware (pre/post hooks) for delete operations
- Test DELETE functionality thoroughly with various scenarios
- Complete the full CRUD API for Movie Buzz

---

## Glossary ##

- `Hard Delete`: Permanently removing a document from the database (irreversible)
- `Soft Delete`: Marking a document as deleted without removing it from the database (reversible)
- `Cascade Delete`: Automatically deleting related documents when a parent document is deleted
- `findByIdAndDelete()`: Mongoose method that finds a document by ID and removes it in one atomic operation
- `deleteOne()`: Mongoose method that deletes a single document matching a filter
- `deleteMany()`: Mongoose method that deletes all documents matching a filter
- `Idempotent`: An operation that produces the same result whether called once or multiple times (DELETE should be idempotent)
- `204 No Content`: HTTP status code indicating successful deletion with no response body
- `Orphan Data`: Related documents that become disconnected when their parent is deleted
- `Audit Trail`: A record of who deleted what and when, used for accountability

---

## Starting Point ##

Students should have a complete Movie Buzz API from Weeks 12-14 with:

- **READ** operations: `GET /api/movies` and `GET /api/movies/:id`
- **CREATE** operations: `POST /api/movies`
- **UPDATE** operations: `PUT /api/movies/:id`
- Working MongoDB connection via Mongoose
- Proper error handling patterns
- Movie model with schema validation

Verify the starting point by running these tests:

```bash
cd movie-buzz
npm install
npm start

# In a separate terminal, test existing operations:
curl http://localhost:4000/api/movies
curl -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Movie", "year": 2024, "rating": "PG", "length": "90 minutes", "description": "Test", "genre": ["Action"], "director": "Test Director", "stars": ["Test Star"]}'
```

**Important**: Make sure students seed the database before starting. They'll need movies to delete!

```bash
npm run seed
```

---

## Understanding DELETE Operations ##

### Hard Delete vs Soft Delete ###

**CRITICAL TEACHING MOMENT**: This is the most important conceptual distinction of the week.

**Start with a question**: "If a user accidentally deletes their movie, how do you get it back?"

**Hard Delete** — Permanent removal:
```javascript
// The document is gone forever
await Movie.findByIdAndDelete(id);
```

**When to use Hard Delete:**
- Test/temporary data
- User-requested permanent removal (GDPR "right to erasure")
- Data that has no dependencies
- Storage optimization (truly unneeded data)

**Soft Delete** — Mark as deleted:
```javascript
// The document stays in the database with a flag
await Movie.findByIdAndUpdate(id, {
  isDeleted: true,
  deletedAt: new Date()
});
```

**When to use Soft Delete:**
- User-generated content (they might want it back)
- Data with audit/compliance requirements
- Data referenced by other collections
- Analytics data (you may need historical records)

**Draw this on the board:**

```
Hard Delete:  [Movie] --DELETE--> [Gone Forever]
Soft Delete:  [Movie] --UPDATE--> [Movie (isDeleted: true)] --RESTORE--> [Movie]
```

**Real-World Examples:**
- **Gmail**: Uses soft delete (Trash folder, 30-day recovery)
- **GitHub**: Repository deletion has confirmation + grace period
- **Slack**: Messages can be deleted but admins may still see them
- **Banking**: Transactions are NEVER hard deleted (regulatory requirement)

### Cascade Delete Patterns ###

**Explain the Problem**: "What happens to movie reviews when you delete a movie?"

```
Movie Collection          Review Collection
┌──────────────┐         ┌──────────────────┐
│ _id: "abc"   │ ◄────── │ movieId: "abc"   │
│ name: "..."  │         │ rating: 5        │
│ genre: [...]│         │ comment: "Great" │
└──────────────┘         └──────────────────┘
                         ┌──────────────────┐
                 ◄────── │ movieId: "abc"   │
                         │ rating: 4        │
                         │ comment: "Good"  │
                         └──────────────────┘
```

**If we delete Movie "abc", what happens to the reviews?**

Three approaches:
1. **Cascade Delete**: Delete the reviews too
2. **Restrict Delete**: Prevent deletion if reviews exist
3. **Nullify**: Set movieId to null in reviews (orphan them)

**For Movie Buzz**, cascade delete makes the most sense — if a movie is gone, its reviews are meaningless.

```javascript
// Cascade delete example using Mongoose middleware
movieSchema.pre('findOneAndDelete', async function(next) {
  const movieId = this.getQuery()._id;
  // Delete all reviews for this movie
  await Review.deleteMany({ movieId: movieId });
  console.log(`Cascade deleted reviews for movie: ${movieId}`);
  next();
});
```

**Note to Teacher**: Movie Buzz doesn't currently have a Review model, so this is conceptual. But students should understand the pattern for their future projects.

### DELETE in RESTful APIs ###

**RESTful Conventions:**

| Method | Endpoint | Purpose | Response |
|--------|----------|---------|----------|
| DELETE | `/api/movies/:id` | Delete single movie | 200 with deleted data or 204 |
| DELETE | `/api/movies/bulk` | Delete multiple movies | 200 with count |

**Key Principle — Idempotency**: Deleting the same resource twice should not cause an error. The first DELETE removes it (200), subsequent DELETEs return 404 (resource already gone). This is expected behavior.

```javascript
// First DELETE: returns 200 with deleted movie
DELETE /api/movies/abc → 200 { ... }

// Second DELETE: returns 404 (already gone - this is correct!)
DELETE /api/movies/abc → 404 { error: "Movie not found" }
```

---

## Implementing DELETE with Mongoose ##

### Basic Document Deletion ###

Walk students through the implementation step by step.

**Step 1: Add the DELETE route**

```javascript
// routes/movieRoutes.js
router.delete('/movie/:id', movieController.deleteMovie);
```

**Teaching tip**: Ask students where in the file this should go. It follows the same pattern as GET, POST, and PUT routes they've already written.

**Step 2: Implement the controller**

```javascript
// controllers/movieController.js
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    // Step 1: Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid movie ID format'
      });
    }

    // Step 2: Attempt to find and delete
    const deletedMovie = await Movie.findByIdAndDelete(id);

    // Step 3: Handle not found
    if (!deletedMovie) {
      return res.status(404).json({
        error: 'Movie not found'
      });
    }

    // Step 4: Return success with deleted data
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
    console.error('Error deleting movie:', error);
    res.status(500).json({
      error: 'Failed to delete movie',
      details: error.message
    });
  }
};
```

**Step 3: Add to exports**

```javascript
module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie  // Add this
};
```

### Mongoose Deletion Methods ###

**Compare the different methods** (draw on board):

| Method | Use Case | Returns |
|--------|----------|---------|
| `findByIdAndDelete(id)` | Delete by ID (most common) | The deleted document |
| `deleteOne({ filter })` | Delete first match | `{ deletedCount: 0 or 1 }` |
| `deleteMany({ filter })` | Delete all matches | `{ deletedCount: N }` |
| `findOneAndDelete({ filter })` | Delete first match with options | The deleted document |

**Key difference**: `findByIdAndDelete` returns the deleted document (useful for confirmation), while `deleteOne` only returns a count.

```javascript
// findByIdAndDelete — returns the actual document
const deleted = await Movie.findByIdAndDelete(id);
console.log(deleted.name); // "The Matrix"

// deleteOne — returns only the count
const result = await Movie.deleteOne({ _id: id });
console.log(result.deletedCount); // 1
```

**Recommendation**: Use `findByIdAndDelete` when you need to show the user what was deleted. Use `deleteOne`/`deleteMany` for background operations.

### Pre and Post Delete Middleware ###

Mongoose middleware lets you run code before and after deletion:

```javascript
// models/movie.js

// Pre-delete: Runs BEFORE the document is deleted
movieSchema.pre('findOneAndDelete', async function(next) {
  const movieToDelete = await this.model.findOne(this.getQuery());

  if (movieToDelete) {
    console.log(`About to delete: ${movieToDelete.name}`);
    // Could check for related data here
    // Could create a backup/audit log entry
  }

  next();
});

// Post-delete: Runs AFTER the document is deleted
movieSchema.post('findOneAndDelete', function(doc, next) {
  if (doc) {
    console.log(`Successfully deleted: ${doc.name} (ID: ${doc._id})`);
    // Could trigger cleanup tasks here
    // Could send notification
    // Could update analytics
  }
  next();
});
```

**Teaching tip**: This is the same middleware pattern students used with `pre('save')` in Week 13. Connect it to that prior knowledge.

---

## Building DELETE API Endpoints ##

### Route Definition ###

Add the DELETE route to the existing router file:

```javascript
// routes/movieRoutes.js
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Existing routes from Weeks 12-14
router.get('/movies', movieController.getAllMovies);
router.get('/movie/:id', movieController.getMovieById);
router.post('/movie/new', movieController.createMovie);
router.put('/movie/:id', movieController.updateMovie);

// NEW: DELETE route
router.delete('/movie/:id', movieController.deleteMovie);

module.exports = router;
```

### Controller with Full Error Handling ###

The complete controller implementation with all edge cases:

```javascript
const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        error: 'Invalid movie ID format'
      });
    }

    // Check if movie exists before deleting (optional but informative)
    const movieToDelete = await Movie.findById(id);
    if (!movieToDelete) {
      return res.status(404).json({
        error: 'Movie not found'
      });
    }

    // Log the deletion for audit purposes
    console.log(`Deleting movie: "${movieToDelete.name}" (ID: ${id})`);

    // Perform the deletion
    const deletedMovie = await Movie.findByIdAndDelete(id);

    // Return success with deleted movie info
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
    // Handle CastError specifically (malformed ObjectId that passed validation)
    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid movie ID format'
      });
    }

    console.error('Error deleting movie:', error);
    res.status(500).json({
      error: 'Failed to delete movie',
      details: error.message
    });
  }
};
```

---

## Confirmation Workflows ##

**Real-World Context**: "Have you ever deleted something and immediately regretted it? That's why confirmation matters."

### Backend Confirmation Endpoint ###

Create an endpoint that returns movie info for a confirmation dialog:

```javascript
// GET /api/movies/:id
const getDeleteConfirmation = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid movie ID format' });
    }

    const movie = await Movie.findById(id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

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
    res.status(500).json({ error: 'Failed to get movie info' });
  }
};
```

### Frontend Confirmation Pattern (Preview for Week 16) ###

Show students how the frontend will use `window.confirm()`:

```javascript
// React component (preview of Week 16)
const handleDelete = async (movieId, movieName) => {
  const confirmed = window.confirm(
    `Are you sure you want to delete "${movieName}"? This action cannot be undone.`
  );

  if (confirmed) {
    try {
      const response = await fetch(`/api/movies/${movieId}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        // Remove from state
        setMovies(prev => prev.filter(m => m._id !== movieId));
      }
    } catch (error) {
      alert('Failed to delete movie');
    }
  }
};
```

---

## Soft Delete Implementation ##

**This is an extension topic for advanced students**, but all students should understand the concept.

### Schema Modification ###

```javascript
// models/movie.js — add soft delete fields
const movieSchema = new mongoose.Schema({
  // ... existing fields ...

  isDeleted: {
    type: Boolean,
    default: false
  },
  deletedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Query middleware: automatically exclude soft-deleted movies
movieSchema.pre(/^find/, function(next) {
  // Only apply if not explicitly querying for deleted items
  if (!this.getQuery().isDeleted) {
    this.find({ isDeleted: { $ne: true } });
  }
  next();
});
```

### Soft Delete Controller ###

```javascript
const softDeleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid movie ID format' });
    }

    const movie = await Movie.findByIdAndUpdate(
      id,
      {
        isDeleted: true,
        deletedAt: new Date()
      },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json({
      message: 'Movie soft deleted successfully',
      movie: { _id: movie._id, name: movie.name, deletedAt: movie.deletedAt }
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to soft delete movie' });
  }
};
```

### Restore Controller ###

```javascript
const restoreMovie = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'Invalid movie ID format' });
    }

    // Bypass the pre-find middleware by explicitly querying for deleted items
    const movie = await Movie.findOneAndUpdate(
      { _id: id, isDeleted: true },
      {
        isDeleted: false,
        deletedAt: null
      },
      { new: true }
    );

    if (!movie) {
      return res.status(404).json({ error: 'Deleted movie not found' });
    }

    res.status(200).json({
      message: 'Movie restored successfully',
      movie: movie
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to restore movie' });
  }
};
```

**Discussion questions for students:**
- When would you choose soft delete over hard delete?
- How does soft delete affect database size over time?
- How would you permanently purge soft-deleted records after 30 days?

---

## Bulk Delete Operations ##

For advanced students — deleting multiple movies at once:

```javascript
// Route
router.delete('/movies/bulk', movieController.bulkDeleteMovies);

// Controller
const bulkDeleteMovies = async (req, res) => {
  try {
    const { movieIds } = req.body;

    // Validate input
    if (!Array.isArray(movieIds) || movieIds.length === 0) {
      return res.status(400).json({
        error: 'movieIds must be a non-empty array'
      });
    }

    // Validate all IDs
    const invalidIds = movieIds.filter(id => !mongoose.Types.ObjectId.isValid(id));
    if (invalidIds.length > 0) {
      return res.status(400).json({
        error: 'Some movie IDs are invalid',
        invalidIds
      });
    }

    // Perform bulk deletion
    const result = await Movie.deleteMany({
      _id: { $in: movieIds }
    });

    res.status(200).json({
      message: `Deleted ${result.deletedCount} of ${movieIds.length} movies`,
      deletedCount: result.deletedCount,
      requestedCount: movieIds.length
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to perform bulk delete' });
  }
};
```

---

## Testing DELETE Operations ##

### Using Postman ###

Walk students through these test scenarios:

**1. Successful Deletion:**
- Method: `DELETE`
- URL: `http://localhost:4000/api/movies/{valid_movie_id}`
- Expected: 200 with deleted movie data

**2. Delete Non-Existent Movie:**
- Method: `DELETE`
- URL: `http://localhost:4000/api/movies/507f1f77bcf86cd799439011`
- Expected: 404 "Movie not found"

**3. Invalid ID Format:**
- Method: `DELETE`
- URL: `http://localhost:4000/api/movies/not-a-valid-id`
- Expected: 400 "Invalid movie ID format"

**4. Double Delete (Idempotency Test):**
- Delete a movie (200)
- Delete the same ID again (404)
- Both are correct responses

### Using cURL ###

```bash
# First, get a valid movie ID
curl http://localhost:4000/api/movies | python3 -m json.tool

# Test successful deletion (replace with actual ID)
curl -X DELETE http://localhost:4000/api/movies/PASTE_ID_HERE

# Test not found
curl -X DELETE http://localhost:4000/api/movies/507f1f77bcf86cd799439011

# Test invalid ID
curl -X DELETE http://localhost:4000/api/movies/invalid-id

# Test bulk delete
curl -X DELETE http://localhost:4000/api/movies/bulk \
  -H "Content-Type: application/json" \
  -d '{"movieIds": ["id1", "id2"]}'
```

### Verification After Deletion ###

After deleting, students should verify the movie is gone:

```bash
# This should return the movie list WITHOUT the deleted movie
curl http://localhost:4000/api/movies

# This should return 404
curl http://localhost:4000/api/movies/DELETED_ID
```

---

## Error Handling and Edge Cases ##

### Common Student Issues ###

**Problem 1: Students forget to validate ObjectId format**

```javascript
// BAD: No validation — will crash with CastError
const deleted = await Movie.findByIdAndDelete(req.params.id);

// GOOD: Validate first
if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
  return res.status(400).json({ error: 'Invalid movie ID format' });
}
const deleted = await Movie.findByIdAndDelete(req.params.id);
```

**Problem 2: Confusion about 200 vs 204 status codes**

Explain the difference:
- `200 OK`: Successful deletion, response body contains deleted data
- `204 No Content`: Successful deletion, no response body

For Movie Buzz, use 200 so students can see what was deleted.

**Problem 3: Not adding deleteMovie to exports**

```javascript
// Students often implement the function but forget to export it
module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie  // ← Students forget this line!
};
```

**Problem 4: Using the wrong HTTP method in Postman/curl**

Students sometimes use GET instead of DELETE. Remind them that the method matters — the same URL responds differently to GET vs DELETE.

### Edge Cases to Discuss ###

1. **What if MongoDB is down during a delete?** → 500 error, try/catch handles it
2. **What if two users try to delete the same movie simultaneously?** → First succeeds, second gets 404
3. **What if the request body is sent with a DELETE?** → Body is ignored for single deletes (ID comes from URL)
4. **What about deleting all movies?** → Don't expose `deleteMany({})` without safeguards!

---

## Security Considerations ##

**Discuss with students:**

1. **Authorization**: "Should anyone be able to delete any movie?"
   - In production, you'd check user permissions
   - Only admins or the movie creator should delete
   - For now, our API is public (no auth)

2. **Rate Limiting**: Prevent abuse of DELETE endpoints
   - A malicious user could delete all movies rapidly
   - Rate limiting middleware can prevent this

3. **Audit Logging**: Always log deletions
   ```javascript
   console.log(`[DELETE] Movie "${movieToDelete.name}" deleted at ${new Date().toISOString()}`);
   ```

4. **No Exposed Delete-All Endpoint**: Never create `DELETE /api/movies` without strong authentication

---

## Final Thoughts ##

**Celebrate the Achievement**: Students now have a complete CRUD API! This is a major milestone.

**Recap the Full CRUD Journey:**

| Week | Operation | HTTP Method | Mongoose Method |
|------|-----------|-------------|-----------------|
| 12 | READ | GET | `find()`, `findById()` |
| 13 | CREATE | POST | `create()`, `save()` |
| 14 | UPDATE | PUT | `findByIdAndUpdate()` |
| 15 | DELETE | DELETE | `findByIdAndDelete()` |

**Connection to Week 16**: Next week, students will connect this complete API to their React frontend, creating a full-stack application. All four CRUD operations will be accessible through the UI.

**Encourage students**: "You've built a professional-quality REST API. The same patterns you used here — routes, controllers, validation, error handling — are used by companies like Netflix, Spotify, and every web application you use daily."

---

## Exit Ticket ##

Access code: vile52

1. What HTTP method is used for DELETE operations?
   > Answer: DELETE

2. What Mongoose method is commonly used to delete a document by ID?
   > Answer: findByIdAndDelete()

3. What's the difference between hard delete and soft delete?
   > Answer: Hard delete permanently removes data from the database (irreversible). Soft delete marks data as deleted with a flag (like isDeleted: true) but keeps it in the database, allowing recovery later.

4. What status code should be returned after a successful deletion?
   > Answer: 200 (OK) with the deleted data, or 204 (No Content) with no response body.

5. Why should you validate the ObjectId format before attempting a delete?
   > Answer: To prevent CastError exceptions and return a meaningful 400 error message instead of a 500 server error.

6. What is cascade deletion?
   > Answer: Automatically deleting related documents (e.g., reviews) when a parent document (e.g., movie) is deleted, to prevent orphaned data.

---

## Review ##

- What is the purpose of DELETE operations in CRUD?
- How does `findByIdAndDelete` differ from `deleteOne`?
- What are the advantages and disadvantages of soft delete?
- How do you handle the case where a movie doesn't exist?
- What is cascade deletion and when should you use it?
- Why is idempotency important for DELETE operations?
- How would you implement a confirmation workflow?
- What security measures should protect DELETE endpoints?
- How do you test DELETE operations thoroughly?
- What happens when you complete CRUD? What's the next step?

---

## Week 16 Preview ##

Next week marks a major transition — connecting the complete CRUD API to the React frontend:
- Build the movieService.js API layer with fetch() calls
- Implement CREATE, READ, UPDATE, DELETE in the React UI
- Handle loading states, errors, and success messages
- Add search/filter/sort functionality with live API data
- Deploy a complete full-stack Movie Buzz application

Students should feel confident about their backend implementation. Every endpoint they built (GET, POST, PUT, DELETE) will be called from the React frontend next week.
