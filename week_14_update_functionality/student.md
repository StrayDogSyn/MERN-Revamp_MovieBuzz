# Week 14 - UPDATE Functionality #

- [Week 14 - UPDATE Functionality](#week-14---update-functionality)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Simple Examples - Building Understanding](#simple-examples---building-understanding)
  - [Starting Point](#starting-point)
  - [Understanding UPDATE Operations](#understanding-update-operations)
  - [Mongoose UPDATE Methods](#mongoose-update-methods)
    - [findByIdAndUpdate vs updateOne](#findbyidandupdate-vs-updateone)
    - [Update Operators](#update-operators)
    - [Validation During Updates](#validation-during-updates)
  - [Building UPDATE API Endpoints](#building-update-api-endpoints)
  - [Frontend Integration](#frontend-integration)
  - [Partial vs Complete Updates](#partial-vs-complete-updates)
  - [Optimistic vs Pessimistic Updates](#optimistic-vs-pessimistic-updates)
  - [Testing UPDATE Operations](#testing-update-operations)
  - [Advanced UPDATE Patterns](#advanced-update-patterns)
  - [Error Handling and Edge Cases](#error-handling-and-edge-cases)
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

- Implement UPDATE operations using various Mongoose methods
- Build robust API endpoints for updating existing movies
- Handle partial updates and complete document replacement
- Implement proper validation for update operations
- Connect React frontend to UPDATE endpoints with edit forms
- Handle optimistic and pessimistic update strategies
- Test UPDATE functionality thoroughly
- Apply best practices for handling concurrent updates and data integrity

---

## Glossary ##

- `UPDATE Operation`: The "U" in CRUD - modifying existing data in the database
- `Partial Update`: Updating only specific fields of a document
- `Complete Update`: Replacing an entire document with new data
- `Optimistic Update`: Updating UI immediately, then syncing with server
- `Pessimistic Update`: Waiting for server confirmation before updating UI
- `Concurrent Update`: Multiple users trying to update the same document simultaneously
- `Version Control`: Tracking document versions to handle conflicts
- `Atomic Operation`: Database operation that completes entirely or not at all

---

## Simple Examples - Building Understanding ##

Before diving into the full implementation, let's explore some simple, focused examples to build our understanding of UPDATE operations step by step.

### Example 1: PUT vs PATCH Concepts ###

Let's understand the difference between complete replacement (PUT) and partial updates (PATCH):

```javascript
// PUT - Complete replacement (replace entire resource)
app.put('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const movieData = req.body;

  console.log(`PUT request for movie ${id}`);
  console.log('Complete new data:', movieData);

  // PUT expects ALL fields to be provided
  const requiredFields = ['name', 'year', 'rating', 'description', 'genre', 'director'];
  const missingFields = requiredFields.filter(field => !movieData[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'PUT requires all fields',
      missingFields: missingFields
    });
  }

  res.json({
    success: true,
    message: 'Movie would be completely replaced',
    operation: 'PUT - Complete replacement',
    data: movieData
  });
});

// PATCH - Partial update (modify specific fields only)
app.patch('/api/movies/:id', (req, res) => {
  const { id } = req.params;
  const updateFields = req.body;

  console.log(`PATCH request for movie ${id}`);
  console.log('Fields to update:', Object.keys(updateFields));

  // PATCH accepts any subset of fields
  res.json({
    success: true,
    message: 'Movie would be partially updated',
    operation: 'PATCH - Partial update',
    fieldsToUpdate: Object.keys(updateFields),
    data: updateFields
  });
});
```

**Try It Out:** Send both PUT and PATCH requests with different amounts of data to see how they behave differently.

### Example 2: Finding and Updating Documents ###

Let's simulate finding and updating data using an in-memory array:

```javascript
// Sample data
let movies = [
  { id: 1, name: 'The Matrix', year: 1999, rating: 'R' },
  { id: 2, name: 'Inception', year: 2010, rating: 'PG-13' },
  { id: 3, name: 'Toy Story', year: 1995, rating: 'G' }
];

// Find and update endpoint
app.put('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const updateData = req.body;

  // Step 1: Find the movie
  const movieIndex = movies.findIndex(movie => movie.id === movieId);

  if (movieIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Movie not found',
      searchedId: movieId
    });
  }

  // Step 2: Get the current movie
  const currentMovie = movies[movieIndex];
  console.log('Found movie:', currentMovie);

  // Step 3: Update the movie
  const updatedMovie = {
    ...currentMovie,  // Keep existing data
    ...updateData,    // Override with new data
    updatedAt: new Date().toISOString()
  };

  // Step 4: Replace in array
  movies[movieIndex] = updatedMovie;

  res.json({
    success: true,
    message: 'Movie updated successfully',
    before: currentMovie,
    after: updatedMovie
  });
});
```

**Try It Out:** Update different movies and see how the before/after comparison shows what changed.

### Example 3: Partial Updates with Validation ###

Let's add validation during updates, checking only the fields that are being updated:

```javascript
app.patch('/api/movies/:id', (req, res) => {
  const movieId = parseInt(req.params.id);
  const updateFields = req.body;

  // Find movie
  const movieIndex = movies.findIndex(movie => movie.id === movieId);
  if (movieIndex === -1) {
    return res.status(404).json({
      success: false,
      error: 'Movie not found'
    });
  }

  const currentMovie = movies[movieIndex];
  const validationErrors = [];

  // Validate only the fields being updated
  if (updateFields.hasOwnProperty('year')) {
    if (isNaN(updateFields.year) || updateFields.year < 1800) {
      validationErrors.push('Year must be a valid number after 1800');
    }
  }

  if (updateFields.hasOwnProperty('rating')) {
    const validRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17'];
    if (!validRatings.includes(updateFields.rating)) {
      validationErrors.push('Rating must be one of: ' + validRatings.join(', '));
    }
  }

  if (updateFields.hasOwnProperty('name')) {
    if (!updateFields.name || updateFields.name.trim().length === 0) {
      validationErrors.push('Name cannot be empty');
    }
  }

  // If validation failed, return errors
  if (validationErrors.length > 0) {
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: validationErrors
    });
  }

  // Update only the provided fields
  const updatedMovie = {
    ...currentMovie,
    ...updateFields,
    updatedAt: new Date().toISOString()
  };

  movies[movieIndex] = updatedMovie;

  res.json({
    success: true,
    message: 'Movie partially updated',
    fieldsUpdated: Object.keys(updateFields),
    data: updatedMovie
  });
});
```

**Try It Out:** Try updating just the rating, just the year, or multiple fields at once to see selective validation in action.

### Example 4: Validation During Updates ###

Let's see how to handle edge cases and provide detailed feedback:

```javascript
app.put('/api/movies/:id', (req, res) => {
  try {
    const movieId = parseInt(req.params.id);
    const updateData = req.body;

    // Validate ID format
    if (isNaN(movieId) || movieId < 1) {
      return res.status(400).json({
        success: false,
        error: 'Invalid movie ID format',
        hint: 'ID must be a positive number'
      });
    }

    // Check if request body is empty
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Update data is required',
        hint: 'Send JSON data with fields to update'
      });
    }

    // Find movie
    const movieIndex = movies.findIndex(movie => movie.id === movieId);
    if (movieIndex === -1) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found',
        availableIds: movies.map(m => m.id)
      });
    }

    const currentMovie = movies[movieIndex];

    // Check if any data is actually changing
    const changedFields = Object.keys(updateData).filter(key =>
      currentMovie[key] !== updateData[key]
    );

    if (changedFields.length === 0) {
      return res.status(200).json({
        success: true,
        message: 'No changes detected',
        data: currentMovie
      });
    }

    // Apply update
    const updatedMovie = {
      ...currentMovie,
      ...updateData,
      updatedAt: new Date().toISOString()
    };

    movies[movieIndex] = updatedMovie;

    res.json({
      success: true,
      message: `Successfully updated ${changedFields.length} field(s)`,
      changedFields: changedFields,
      data: updatedMovie
    });

  } catch (error) {
    console.error('Update error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Something went wrong during update'
    });
  }
});
```

**Try It Out:** Test with invalid IDs, empty bodies, unchanged data, and valid updates to see how robust error handling works.

These examples demonstrate the core concepts of UPDATE operations before we implement them with MongoDB and Mongoose!

---

## Starting Point ##

Before we begin this lesson, make sure you have completed Week 11 and have:

- Working CREATE functionality for movies
- Mongoose Movie schema with validation
- React frontend with movie creation forms
- All CRUD endpoints properly organized in your routes

Your current API should support:
- `GET /api/movies` - Get all movies (READ)
- `POST /api/movies` - Create new movie (CREATE)
- All READ operations from Week 10

We'll be adding the UPDATE endpoints to complete the "CRU" portion of CRUD.

---

## Understanding UPDATE Operations ##

UPDATE operations modify existing data in your database. Unlike CREATE operations that add new data, UPDATE operations change data that already exists.

**Key Characteristics of UPDATE Operations:**

1. **Target Identification**: Must identify which document(s) to update
2. **Data Validation**: Ensure updated data meets schema requirements
3. **Partial Updates**: Allow updating only specific fields
4. **Atomic Operations**: Changes happen all-at-once or not at all
5. **Conflict Handling**: Manage concurrent updates by multiple users
6. **Audit Trail**: Track what changed and when (optional)

**Types of Updates:**

1. **Partial Update**: Update specific fields only
   ```javascript
   // Update only the rating and description
   { rating: "PG-13", description: "Updated description" }
   ```

2. **Complete Update**: Replace entire document
   ```javascript
   // Replace entire movie object
   { name: "New Name", year: 2024, rating: "R", /* all fields */ }
   ```

3. **Conditional Update**: Update only if certain conditions are met
   ```javascript
   // Update only if year is less than 2000
   Movie.updateOne({ _id: movieId, year: { $lt: 2000 } }, updateData)
   ```

> `Consider This`  
> Why might partial updates be more efficient and safer than complete document replacement? What are the trade-offs?

---

## Mongoose UPDATE Methods ##

Mongoose provides several methods for updating documents:

### findByIdAndUpdate vs updateOne ###

```javascript
// Method 1: findByIdAndUpdate (most common for single documents)
const updatedMovie = await Movie.findByIdAndUpdate(
  movieId,                    // Document ID
  { rating: "PG-13" },       // Update data
  { 
    new: true,               // Return updated document
    runValidators: true      // Run schema validation
  }
);

// Method 2: updateOne (updates first matching document)
const result = await Movie.updateOne(
  { _id: movieId },          // Filter condition
  { rating: "PG-13" },       // Update data
  { runValidators: true }    // Options
);
// Returns: { acknowledged: true, modifiedCount: 1, ... }

// Method 3: findOneAndUpdate (with custom conditions)
const updatedMovie = await Movie.findOneAndUpdate(
  { name: "The Matrix" },    // Find condition
  { rating: "R" },           // Update data
  { 
    new: true,
    runValidators: true
  }
);

// Method 4: updateMany (updates multiple documents)
const result = await Movie.updateMany(
  { year: { $lt: 1980 } },   // All movies before 1980
  { category: "Classic" },   // Add category field
  { runValidators: true }
);
```

**When to Use Each:**
- **findByIdAndUpdate**: When you need the updated document back
- **updateOne**: When you only need to know if update succeeded
- **findOneAndUpdate**: When searching by fields other than ID
- **updateMany**: When updating multiple documents at once

### Update Operators ###

MongoDB provides special operators for complex updates:

```javascript
// $set - Set field values
await Movie.findByIdAndUpdate(movieId, {
  $set: { 
    rating: "PG-13",
    "awards.oscars": 3 
  }
});

// $unset - Remove fields
await Movie.findByIdAndUpdate(movieId, {
  $unset: { poster: "" }  // Remove poster field
});

// $push - Add to arrays
await Movie.findByIdAndUpdate(movieId, {
  $push: { 
    genre: "Thriller",      // Add single genre
    stars: { 
      $each: ["Actor A", "Actor B"]  // Add multiple stars
    }
  }
});

// $pull - Remove from arrays
await Movie.findByIdAndUpdate(movieId, {
  $pull: { 
    genre: "Horror"         // Remove specific genre
  }
});

// $addToSet - Add to array if not already present
await Movie.findByIdAndUpdate(movieId, {
  $addToSet: { 
    genre: "Drama"          // Only add if not already in array
  }
});

// $inc - Increment numeric values
await Movie.findByIdAndUpdate(movieId, {
  $inc: { 
    "awards.nominations": 1  // Increment nominations by 1
  }
});

// $currentDate - Set current date
await Movie.findByIdAndUpdate(movieId, {
  $currentDate: {
    updatedAt: true         // Set to current date
  }
});
```

### Validation During Updates ###

```javascript
// Enable validation during updates
const updatedMovie = await Movie.findByIdAndUpdate(
  movieId,
  { year: "invalid year" }, // This will fail validation
  { 
    new: true,
    runValidators: true,    // Important: Run schema validation
    context: 'query'        // Set validation context
  }
);

// Handle validation errors
try {
  const updatedMovie = await Movie.findByIdAndUpdate(
    movieId,
    updateData,
    { new: true, runValidators: true }
  );
} catch (error) {
  if (error.name === 'ValidationError') {
    // Handle validation errors
    console.log('Update validation failed:', error.errors);
  }
}
```

---

## Building UPDATE API Endpoints ##

Open your `controllers/movieController.js` file. You'll see that READ and CREATE operations are already implemented from previous weeks. Now we'll implement the UPDATE functionality.

Look for the `updateMovie` function with TODO comments. Let's implement it step by step:

**Step 1: Extract the movie ID and update data**
```javascript
// Inside the updateMovie function, uncomment:
const { id } = req.params;
```

**Step 2: Validate the ObjectId format**
```javascript
// Uncomment and implement:
if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({
    success: false,
    error: 'Invalid movie ID format'
  });
}
```

**Step 3: Extract update data from request body**
```javascript
// Uncomment:
const updateData = req.body;
```

**Step 4: Use findByIdAndUpdate with proper options**
```javascript
// Uncomment and complete:
const updatedMovie = await Movie.findByIdAndUpdate(
  id,
  updateData,
  {
    new: true,        // Return the updated document
    runValidators: true  // Run model validators
  }
);
```

**Step 5: Handle movie not found**
```javascript
// Uncomment:
if (!updatedMovie) {
  return res.status(404).json({
    success: false,
    error: 'Movie not found'
  });
}
```

**Step 6: Return success response**
```javascript
// Uncomment:
res.status(200).json({
  success: true,
  message: 'Movie updated successfully',
  data: updatedMovie
});
```

**Bonus: Partial Update Function**

The `partialUpdateMovie` function is also provided with TODOs for advanced students who want to implement PATCH functionality.

---

Open `routes/movieRoutes.js` and find the UPDATE routes section with TODO comments:

```javascript
// UPDATE routes (NEW - Week 12 Focus)
// TODO: Students will uncomment and test these routes during lesson

// TODO: Implement PUT route for complete update
// router.put('/:id', updateMovie);                // PUT /api/movies/:id

// TODO: Implement PATCH route for partial update (bonus)
// router.patch('/:id', partialUpdateMovie);       // PATCH /api/movies/:id
```

**Uncomment the router.put line to enable your UPDATE endpoint!**

---

## Frontend Integration ##

Now let's update your React frontend to handle movie updates. First, let's enhance the App.js to support editing:

```javascript
// In App.js, update the handleUpdateMovie function
const handleUpdateMovie = async (movieData) => {
  try {
    setLoading(true);
    setError(null);

    const { _id, ...updateData } = movieData;
    
    const response = await fetch(`${API_BASE_URL}/movies/${_id}`, {
      method: 'PUT',  // Use PUT for complete updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });

    const result = await response.json();

    if (result.success) {
      // Success: refresh the movie list and close form
      await fetchMovies();
      setEditingMovie(null);
      setShowForm(false);
      
      // Show success message
      setSuccessMessage(`"${result.data.name}" has been updated successfully!`);
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      // Handle API errors
      if (result.details && Array.isArray(result.details)) {
        const errorMessages = result.details.map(err => 
          `${err.field}: ${err.message}`
        ).join(', ');
        setError(`Validation failed: ${errorMessages}`);
      } else {
        setError(result.error || 'Failed to update movie');
      }
    }
  } catch (error) {
    console.error('Error updating movie:', error);
    setError('Failed to connect to server. Please try again.');
  } finally {
    setLoading(false);
  }
};

// Add a function for partial updates (optional)
const handlePartialUpdate = async (movieId, fieldUpdates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${movieId}`, {
      method: 'PATCH',  // Use PATCH for partial updates
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(fieldUpdates),
    });

    const result = await response.json();

    if (result.success) {
      // Refresh movie list
      await fetchMovies();
      setSuccessMessage('Movie updated successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      setError(result.error || 'Failed to update movie');
    }
  } catch (error) {
    console.error('Error in partial update:', error);
    setError('Failed to update movie');
  }
};
```

Enhance your MovieBlock component to include edit functionality:

```javascript
// In MovieBlock.js, add quick edit features
import React, { useState } from 'react';

function MovieBlock({ movie, onDelete, onEdit, onPartialUpdate }) {
  const [isEditingRating, setIsEditingRating] = useState(false);
  const [newRating, setNewRating] = useState(movie.rating);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${movie.name}"?`)) {
      onDelete(movie._id);
    }
  };

  const handleEdit = () => {
    onEdit(movie);
  };

  const handleRatingEdit = () => {
    setIsEditingRating(true);
  };

  const handleRatingSave = async () => {
    if (newRating !== movie.rating) {
      await onPartialUpdate(movie._id, { rating: newRating });
    }
    setIsEditingRating(false);
  };

  const handleRatingCancel = () => {
    setNewRating(movie.rating);
    setIsEditingRating(false);
  };

  return (
    <div className="movie-block">
      <h3>{movie.name}</h3>
      
      <p>
        {movie.year} • 
        {isEditingRating ? (
          <span className="inline-edit">
            <select 
              value={newRating} 
              onChange={(e) => setNewRating(e.target.value)}
              onBlur={handleRatingSave}
            >
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NC-17">NC-17</option>
              <option value="NR">NR</option>
            </select>
            <button onClick={handleRatingSave} className="save-btn">✓</button>
            <button onClick={handleRatingCancel} className="cancel-btn">✗</button>
          </span>
        ) : (
          <span onClick={handleRatingEdit} className="editable-field">
            {movie.rating}
          </span>
        )}
        • {movie.length}
      </p>
      
      <p><em>{movie.description}</em></p>
      <p><b>Genre:</b> {movie.genre.join(', ')}</p>
      <p><b>Stars:</b> {movie.stars.join(', ')}</p>
      <p><b>Director:</b> {movie.director}</p>
      
      <div className="movie-actions">
        <button onClick={handleEdit} className="edit-btn">
          Edit Movie
        </button>
        <button onClick={handleDelete} className="delete-btn">
          Delete Movie
        </button>
      </div>
    </div>
  );
}

export default MovieBlock;
```

Update MoviesList to pass the new props:

```javascript
// In MoviesList.js
function MoviesList({ movies, onDelete, onEdit, onPartialUpdate }) {
  return (
    <div id="movies">
      {movies.map((movie) => (
        <MovieBlock 
          key={movie._id} 
          movie={movie} 
          onDelete={onDelete}
          onEdit={onEdit}
          onPartialUpdate={onPartialUpdate}  // New prop
        />
      ))}
    </div>
  );
}

export default MoviesList;
```

---

## Partial vs Complete Updates ##

Understanding when to use partial vs complete updates is important:

**Complete Updates (PUT)**:
```javascript
// Replace entire document
const updateData = {
  name: "Updated Movie Name",
  year: 2024,
  rating: "PG-13",
  length: "130 minutes",
  description: "Updated description",
  genre: ["Drama", "Thriller"],
  director: "New Director",
  stars: ["Actor 1", "Actor 2"]
  // Must provide ALL fields
};

await Movie.findByIdAndUpdate(movieId, updateData, { new: true });
```

**Partial Updates (PATCH)**:
```javascript
// Update only specific fields
const updateData = {
  rating: "R",
  description: "New description"
  // Only fields being changed
};

await Movie.findByIdAndUpdate(movieId, { $set: updateData }, { new: true });
```

**When to Use Each:**
- **PUT (Complete)**: When user edits entire movie in a form
- **PATCH (Partial)**: When user changes individual fields quickly
- **PATCH**: More efficient for small changes
- **PUT**: Safer for ensuring data consistency

---

## Optimistic vs Pessimistic Updates ##

**Optimistic Updates** (update UI immediately):
```javascript
const handleOptimisticUpdate = async (movieId, updates) => {
  // 1. Update UI immediately
  setMovies(movies.map(movie => 
    movie._id === movieId ? { ...movie, ...updates } : movie
  ));

  try {
    // 2. Send update to server
    const response = await fetch(`${API_BASE_URL}/movies/${movieId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    if (!response.ok) {
      throw new Error('Update failed');
    }
  } catch (error) {
    // 3. Revert UI changes if server update failed
    console.error('Update failed, reverting changes:', error);
    await fetchMovies(); // Reload from server
    setError('Update failed. Changes have been reverted.');
  }
};
```

**Pessimistic Updates** (wait for server confirmation):
```javascript
const handlePessimisticUpdate = async (movieId, updates) => {
  try {
    setLoading(true);
    
    // 1. Send update to server first
    const response = await fetch(`${API_BASE_URL}/movies/${movieId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });

    if (response.ok) {
      // 2. Update UI only after server confirms
      await fetchMovies(); // Reload from server
      setSuccessMessage('Movie updated successfully!');
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    console.error('Update failed:', error);
    setError('Failed to update movie');
  } finally {
    setLoading(false);
  }
};
```

**Trade-offs:**
- **Optimistic**: Feels faster, but requires rollback logic
- **Pessimistic**: Slower feeling, but more reliable

---

## Testing UPDATE Operations ##

### Using curl ###

```bash
# Test complete update (PUT)
curl -X PUT http://localhost:4000/api/movies/MOVIE_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Movie Name",
    "year": 2024,
    "rating": "R",
    "length": "140 minutes", 
    "description": "This movie has been updated",
    "genre": ["Action", "Drama"],
    "director": "Updated Director",
    "stars": ["New Actor 1", "New Actor 2"]
  }'

# Test partial update (PATCH)
curl -X PATCH http://localhost:4000/api/movies/MOVIE_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "rating": "PG-13",
    "description": "Just updating the description and rating"
  }'

# Test validation errors
curl -X PUT http://localhost:4000/api/movies/MOVIE_ID_HERE \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "year": "not a number"
  }'

# Test invalid ID
curl -X PUT http://localhost:4000/api/movies/invalid-id \
  -H "Content-Type: application/json" \
  -d '{"name": "Test"}'

# Test non-existent movie
curl -X PUT http://localhost:4000/api/movies/507f1f77bcf86cd799439011 \
  -H "Content-Type: application/json" \
  -d '{"name": "Test Movie"}'
```

### Frontend Testing Checklist ###

1. **Edit Existing Movie**: Use edit button to modify a movie
2. **Partial Field Update**: Use inline editing to change rating
3. **Validation Errors**: Try submitting invalid data
4. **Non-existent Movie**: Try editing a movie ID that doesn't exist
5. **Concurrent Updates**: Open movie in two browser tabs, edit both
6. **Empty Update**: Try submitting form with no changes

---

## Advanced UPDATE Patterns ##

### Versioning for Concurrent Updates ###

```javascript
// Add version field to schema (optional advanced feature)
const movieSchema = new mongoose.Schema({
  // ... existing fields
  version: { type: Number, default: 0 }
}, { timestamps: true });

// Increment version on save
movieSchema.pre('save', function(next) {
  this.increment();  // Automatically increments version
  next();
});

// Update with version checking
const updateMovieWithVersionCheck = async (req, res) => {
  try {
    const { id } = req.params;
    const { version, ...updateData } = req.body;

    const updatedMovie = await Movie.findOneAndUpdate(
      { _id: id, version: version }, // Only update if version matches
      { ...updateData, $inc: { version: 1 } }, // Increment version
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(409).json({
        success: false,
        error: 'Movie has been updated by another user. Please refresh and try again.',
        code: 'VERSION_CONFLICT'
      });
    }

    res.json({
      success: true,
      data: updatedMovie
    });
  } catch (error) {
    // Handle errors...
  }
};
```

### Batch Updates ###

```javascript
// Update multiple movies at once
const batchUpdateMovies = async (req, res) => {
  try {
    const { updates } = req.body; // Array of {id, data} objects

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Updates array is required'
      });
    }

    // Limit batch size
    if (updates.length > 20) {
      return res.status(400).json({
        success: false,
        error: 'Cannot update more than 20 movies at once'
      });
    }

    const results = [];
    const errors = [];

    // Process each update
    for (let i = 0; i < updates.length; i++) {
      const { id, data } = updates[i];
      
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          id,
          data,
          { new: true, runValidators: true }
        );

        if (updatedMovie) {
          results.push({ id, status: 'success', data: updatedMovie });
        } else {
          errors.push({ id, status: 'not_found', error: 'Movie not found' });
        }
      } catch (error) {
        errors.push({ 
          id, 
          status: 'error', 
          error: error.message 
        });
      }
    }

    res.json({
      success: errors.length === 0,
      message: `Updated ${results.length} movies, ${errors.length} errors`,
      results: results,
      errors: errors,
      total: updates.length
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Batch update failed',
      details: error.message
    });
  }
};
```

---

## Error Handling and Edge Cases ##

```javascript
// Comprehensive error handling for updates
const updateMovieWithErrorHandling = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if movie exists first (optional - prevents unnecessary processing)
    const existingMovie = await Movie.findById(id);
    if (!existingMovie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found',
        code: 'MOVIE_NOT_FOUND'
      });
    }

    // Check if user is authorized to update this movie (placeholder)
    // if (!canUserUpdateMovie(req.user, existingMovie)) {
    //   return res.status(403).json({
    //     success: false,
    //     error: 'Not authorized to update this movie',
    //     code: 'UNAUTHORIZED'
    //   });
    // }

    // Perform update
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      updateData,
      { 
        new: true, 
        runValidators: true,
        context: 'query'
      }
    );

    // Log the update for audit trail
    console.log(`Movie ${id} updated:`, {
      timestamp: new Date().toISOString(),
      changes: Object.keys(updateData),
      // userId: req.user?.id
    });

    res.json({
      success: true,
      message: 'Movie updated successfully',
      data: updatedMovie
    });

  } catch (error) {
    // Log detailed error information
    console.error('Update error:', {
      movieId: req.params.id,
      error: error.message,
      stack: error.stack,
      updateData: req.body
    });

    // Handle various error types
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message,
          rejectedValue: err.value
        }))
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid data format',
        code: 'CAST_ERROR',
        details: {
          field: error.path,
          expectedType: error.kind,
          receivedValue: error.value
        }
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        error: 'Duplicate value',
        code: 'DUPLICATE_KEY',
        field: Object.keys(error.keyPattern)[0]
      });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Update failed'
    });
  }
};
```

---

## Final Thoughts ##

We've successfully implemented comprehensive UPDATE functionality for our Movie Buzz application! Our implementation includes:

- **Multiple Update Methods**: Complete updates (PUT) and partial updates (PATCH)
- **Robust Validation**: Schema validation with detailed error messages
- **Data Sanitization**: Clean and format data before updates
- **Frontend Integration**: Edit forms and inline editing capabilities
- **Error Handling**: Comprehensive error handling for various scenarios
- **Advanced Features**: Optimistic/pessimistic updates and versioning concepts

The UPDATE operations now support:
- Full movie updates through edit forms
- Quick inline editing for individual fields
- Proper validation and error feedback
- Professional error handling and status codes
- Multiple update strategies for different use cases

Next week, we'll implement DELETE functionality to complete our full CRUD operations, giving students a complete data management system.

> `Consider This`  
> How do UPDATE operations differ from CREATE operations in terms of validation and error handling? Why might updates be more complex than creation?

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Review ##

- What are the differences between PUT and PATCH HTTP methods for updates?
- How do you enable validation during Mongoose update operations?
- What is the difference between optimistic and pessimistic updates?
- How do you handle partial updates vs complete document replacement?
- What are the key error types to handle in UPDATE operations?
- When would you use `findByIdAndUpdate` vs `updateOne`?