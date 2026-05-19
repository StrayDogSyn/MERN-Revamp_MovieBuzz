# Week 14 - UPDATE Functionality #

- [Week 14 - UPDATE Functionality](#week-14---update-functionality)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
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

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students have completed CREATE functionality in Week 11 and understand data validation, sanitization, and error handling. This week focuses on UPDATE operations - modifying existing data. Students will learn the differences between complete and partial updates, handle concurrent editing scenarios, and implement both backend APIs and frontend edit interfaces. This completes the "CRU" portion of CRUD operations.

**Key Teaching Focus**: UPDATE operations are more complex than CREATE because they must handle existing data states, user conflicts, and partial modifications.

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

## Starting Point ##

Students should have completed Week 11 with:
- Working CREATE functionality
- Mongoose validation and error handling
- React frontend with forms
- Understanding of data sanitization

**Pre-class Verification**: Ensure all students can successfully CREATE movies before adding UPDATE functionality.

**Common Student Issues**:
- Confusion between PUT vs PATCH
- Understanding when validation runs during updates
- Frontend state management for editing

---

## Understanding UPDATE Operations ##

**Teaching Strategy**: Start with conceptual understanding before diving into code.

**Key Conceptual Framework**:

UPDATE operations modify existing data in your database. Unlike CREATE operations that add new data, UPDATE operations change data that already exists.

**Visual Comparison** (draw on board):
```
CREATE: [ ] → [New Data] → Database
UPDATE: [Old Data] → [Modified Data] → Database
```

**Key Characteristics** (write these principles):
1. **Target Identification**: Must identify which document(s) to update
2. **Data Validation**: Ensure updated data meets schema requirements
3. **Partial Updates**: Allow updating only specific fields
4. **Atomic Operations**: Changes happen all-at-once or not at all
5. **Conflict Handling**: Manage concurrent updates by multiple users
6. **Audit Trail**: Track what changed and when (optional)

**Types of Updates with Examples**:

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
>> Expect: Partial updates are more efficient (less network traffic, faster processing), safer (don't risk losing data), but complete updates ensure consistency and are simpler to reason about.

**Teaching Analogy**: Think of UPDATE operations like editing a document - you can either replace the whole page or just correct specific words.

---

## Mongoose UPDATE Methods ##

**Critical Knowledge**: Students must understand when to use each method.

### findByIdAndUpdate vs updateOne ###

**Teaching Strategy**: Show each method with live examples, emphasizing the differences.

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

**When to Use Each** (critical for students to understand):
- **findByIdAndUpdate**: When you need the updated document back (most common)
- **updateOne**: When you only need to know if update succeeded
- **findOneAndUpdate**: When searching by fields other than ID
- **updateMany**: When updating multiple documents at once

**Common Student Confusion**: The difference between methods that return the document vs. methods that return operation results.

### Update Operators ###

**Important Advanced Feature**: Show MongoDB's powerful update operators.

**Teaching Strategy**: Start with simple $set, then show other operators as students get comfortable.

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
```

**Key Teaching Points**:
- **$set**: Most common operator for replacing field values
- **$push vs $addToSet**: Push always adds, addToSet prevents duplicates
- **Nested field updates**: Use dot notation like "awards.oscars"
- **Array operations**: Powerful for managing array fields

### Validation During Updates ###

**Critical Concept**: Validation doesn't run by default during updates!

```javascript
// Validation DOES NOT run by default
const updatedMovie = await Movie.findByIdAndUpdate(
  movieId,
  { year: "invalid year" }, // This will NOT fail validation
  { new: true }             // Missing runValidators!
);

// Validation RUNS with proper options
const updatedMovie = await Movie.findByIdAndUpdate(
  movieId,
  { year: "invalid year" }, // This WILL fail validation
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
    console.log('Update validation failed:', error.errors);
  }
}
```

**Teaching Emphasis**: This is a common source of bugs! Always include `runValidators: true` for updates.

---

## Building UPDATE API Endpoints ##

**Major Implementation Section**: Build controllers step by step.

**Teaching Strategy**: Start with basic structure, then add complexity incrementally.

**Note**: Students have TODO comments in their starter code. Guide them through uncommenting and implementing each section.

**Basic UPDATE Controller Structure**:

```javascript
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Basic validation
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Update data is required'
      });
    }

    // Perform update
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true
      }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }

    res.json({
      success: true,
      data: updatedMovie
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

**Then Add Full Implementation** (build this section by section):

```javascript
const updateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid movie ID format'
      });
    }

    // Check if request body contains data
    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Update data is required'
      });
    }

    // Remove fields that shouldn't be updated
    const { _id, createdAt, __v, ...validUpdateData } = updateData;

    // Data sanitization for string fields
    if (validUpdateData.name) {
      validUpdateData.name = validUpdateData.name.toString().trim();
    }
    if (validUpdateData.director) {
      validUpdateData.director = validUpdateData.director.toString().trim();
    }
    if (validUpdateData.description) {
      validUpdateData.description = validUpdateData.description.toString().trim();
    }

    // Handle arrays properly
    if (validUpdateData.genre) {
      validUpdateData.genre = Array.isArray(validUpdateData.genre) ?
        validUpdateData.genre.map(g => g.toString().trim()) :
        [validUpdateData.genre.toString().trim()];
    }
    
    if (validUpdateData.stars) {
      validUpdateData.stars = Array.isArray(validUpdateData.stars) ?
        validUpdateData.stars.map(s => s.toString().trim()) :
        [validUpdateData.stars.toString().trim()];
    }

    // Parse year if provided
    if (validUpdateData.year) {
      validUpdateData.year = parseInt(validUpdateData.year);
    }

    // Add updatedAt timestamp
    validUpdateData.updatedAt = new Date();

    // Perform the update
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      validUpdateData,
      {
        new: true,              // Return updated document
        runValidators: true,    // Run schema validation
        context: 'query'        // Set validation context
      }
    );

    // Check if movie was found
    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }

    // Return success response
    res.json({
      success: true,
      message: 'Movie updated successfully',
      data: updatedMovie
    });

  } catch (error) {
    console.error('Error updating movie:', error);

    // Handle specific error types
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid data type provided',
        details: `${error.path} must be a valid ${error.kind}`
      });
    }

    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        error: `Movie with this ${field} already exists`
      });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      error: 'Failed to update movie',
      details: error.message
    });
  }
};
```

**Key Teaching Points for Each Section**:
1. **ID Validation**: Check format before attempting update
2. **Data Protection**: Remove fields that shouldn't be updated (_id, createdAt)
3. **Data Sanitization**: Clean strings, handle arrays, parse numbers
4. **Validation**: Always run validators during updates
5. **404 Handling**: Check if document exists
6. **Error Types**: Handle ValidationError, CastError, duplicate keys

**Add Partial Update Endpoint**:

**Teaching Strategy**: Show the difference between PUT (complete) and PATCH (partial).

```javascript
// Partial update endpoint (PATCH)
const partialUpdateMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate ID
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid movie ID format'
      });
    }

    // Check if any updates provided
    if (!updates || Object.keys(updates).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'At least one field must be provided for update'
      });
    }

    // Build update object using $set operator
    const updateOperations = {
      $set: {},
      $currentDate: { updatedAt: true }
    };

    // Process each field
    Object.keys(updates).forEach(key => {
      if (['_id', 'createdAt', '__v'].includes(key)) {
        return; // Skip protected fields
      }
      
      updateOperations.$set[key] = updates[key];
    });

    // Perform the update
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      updateOperations,
      {
        new: true,
        runValidators: true,
        context: 'query'
      }
    );

    if (!updatedMovie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }

    res.json({
      success: true,
      message: 'Movie updated successfully',
      data: updatedMovie,
      updatedFields: Object.keys(updateOperations.$set)
    });

  } catch (error) {
    // Handle errors similar to full update
  }
};
```

**Update Routes**:

```javascript
// UPDATE routes
router.put('/:id', updateMovie);           // PUT /api/movies/:id (full update)
router.patch('/:id', partialUpdateMovie); // PATCH /api/movies/:id (partial update)
```

**Teaching Point**: PUT vs PATCH is an important HTTP convention that students should understand.

---

## Frontend Integration ##

**Major Integration Section**: Connect React to UPDATE endpoints.

**Update React App.js**:

**Teaching Strategy**: Show how error handling improves with proper backend integration.

```javascript
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
```

**Enhanced MovieBlock with Inline Editing**:

**Teaching Focus**: Show how partial updates can create smooth user experiences.

```javascript
// In MovieBlock.js, add quick edit features
import React, { useState } from 'react';

function MovieBlock({ movie, onDelete, onEdit, onPartialUpdate }) {
  const [isEditingRating, setIsEditingRating] = useState(false);
  const [newRating, setNewRating] = useState(movie.rating);

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
            >
              <option value="G">G</option>
              <option value="PG">PG</option>
              <option value="PG-13">PG-13</option>
              <option value="R">R</option>
              <option value="NC-17">NC-17</option>
              <option value="NR">NR</option>
            </select>
            <button onClick={handleRatingSave}>✓</button>
            <button onClick={handleRatingCancel}>✗</button>
          </span>
        ) : (
          <span onClick={handleRatingEdit} className="editable-field">
            {movie.rating} ✎
          </span>
        )}
        • {movie.length}
      </p>
      
      {/* ... rest of movie info ... */}
      
      <div className="movie-actions">
        <button onClick={() => onEdit(movie)}>Edit Movie</button>
        <button onClick={() => onDelete(movie._id)}>Delete</button>
      </div>
    </div>
  );
}
```

**Teaching Points**:
- **Inline Editing**: Click to edit specific fields
- **State Management**: Local state for edit mode
- **User Experience**: Immediate feedback with save/cancel options

---

## Partial vs Complete Updates ##

**Important Conceptual Distinction**: Students must understand when to use each approach.

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

**When to Use Each** (critical decision-making knowledge):
- **PUT (Complete)**: When user edits entire movie in a form
- **PATCH (Partial)**: When user changes individual fields quickly
- **PATCH**: More efficient for small changes
- **PUT**: Safer for ensuring data consistency

**Teaching Analogy**: PUT is like rewriting a document completely, PATCH is like using correction fluid on specific words.

---

## Optimistic vs Pessimistic Updates ##

**Advanced UX Concept**: Show both patterns and their trade-offs.

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
      await fetchMovies();
      setSuccessMessage('Movie updated successfully!');
    } else {
      throw new Error('Update failed');
    }
  } catch (error) {
    setError('Failed to update movie');
  } finally {
    setLoading(false);
  }
};
```

**Trade-offs Discussion**:
- **Optimistic**: Feels faster, but requires rollback logic
- **Pessimistic**: Slower feeling, but more reliable

**Teaching Point**: Most production apps use optimistic updates for better user experience.

---

## Testing UPDATE Operations ##

**Hands-on Testing**: Students must test all scenarios.

### Using curl ###

**Demonstrate These Tests Live**:

```bash
# Test complete update (PUT) - replace MOVIE_ID_HERE with actual ID
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
```

**Teaching Strategy**: Run these tests with students, showing both success and error responses.

### Frontend Testing Checklist ###

**Have Students Test Each Scenario**:
1. **Edit Existing Movie**: Use edit button to modify a movie completely
2. **Partial Field Update**: Use inline editing to change rating
3. **Validation Errors**: Try submitting invalid data (empty name, bad year)
4. **Non-existent Movie**: Try editing a movie ID that doesn't exist
5. **Empty Update**: Try submitting form with no changes
6. **Concurrent Updates**: Open movie in two browser tabs, edit both (advanced)

---

## Advanced UPDATE Patterns ##

**Optional Advanced Topics**: Show enterprise-level patterns.

### Versioning for Concurrent Updates ###

**Advanced Feature for Discussion**:

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

**Teaching Point**: This prevents the "lost update" problem in concurrent scenarios.

### Batch Updates ###

**Advanced Pattern for Reference**:

```javascript
const batchUpdateMovies = async (req, res) => {
  try {
    const { updates } = req.body; // Array of {id, data} objects

    if (!Array.isArray(updates) || updates.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Updates array is required'
      });
    }

    if (updates.length > 20) {
      return res.status(400).json({
        success: false,
        error: 'Cannot update more than 20 movies at once'
      });
    }

    const results = [];
    const errors = [];

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
        errors.push({ id, status: 'error', error: error.message });
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
      error: 'Batch update failed'
    });
  }
};
```

**Teaching Point**: Batch operations are useful for admin interfaces but require careful error handling.

---

## Error Handling and Edge Cases ##

**Professional Development Focus**: Production-grade error handling.

**Comprehensive Error Handling**:

```javascript
const updateMovieWithErrorHandling = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Check if movie exists first (prevents unnecessary processing)
    const existingMovie = await Movie.findById(id);
    if (!existingMovie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found',
        code: 'MOVIE_NOT_FOUND'
      });
    }

    // Perform update
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    // Log the update for audit trail
    console.log(`Movie ${id} updated:`, {
      timestamp: new Date().toISOString(),
      changes: Object.keys(updateData)
    });

    res.json({
      success: true,
      data: updatedMovie
    });

  } catch (error) {
    // Log detailed error information
    console.error('Update error:', {
      movieId: req.params.id,
      error: error.message,
      updateData: req.body
    });

    // Handle various error types with specific codes
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

    // ... handle other error types

    // Generic server error
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
  }
};
```

**Key Teaching Points**:
1. **Audit Logging**: Track what changes for debugging and compliance
2. **Error Codes**: Help frontend handle different error types appropriately
3. **Detailed Logging**: Essential for debugging production issues
4. **Graceful Degradation**: Always provide meaningful error messages

---

## Final Thoughts ##

**Major Achievement Celebration**: Students have implemented professional UPDATE operations!

We've successfully implemented comprehensive UPDATE functionality for our Movie Buzz application! Our implementation includes:

- **Multiple Update Methods**: Complete updates (PUT) and partial updates (PATCH)
- **Robust Validation**: Schema validation with detailed error messages
- **Data Sanitization**: Clean and format data before updates
- **Frontend Integration**: Edit forms and inline editing capabilities
- **Error Handling**: Comprehensive error handling for various scenarios
- **Advanced Features**: Optimistic/pessimistic updates and versioning concepts

**Industry Relevance**: Students are now using production-grade patterns for data modification.

The UPDATE operations now support:
- Full movie updates through edit forms
- Quick inline editing for individual fields
- Proper validation and error feedback
- Professional error handling and status codes
- Multiple update strategies for different use cases

**Next Week Preview**: We'll implement DELETE functionality to complete our full CRUD operations, giving students a complete data management system.

> `Consider This`  
> How do UPDATE operations differ from CREATE operations in terms of validation and error handling? Why might updates be more complex than creation?
>> Expect: Updates must handle existing data states, user conflicts, partial modifications, and maintaining data integrity while allowing changes. More complex because they operate on existing data with potential conflicts.

**Preparation for Next Week**: Students should have UPDATE functionality working and be able to edit movies through their React frontend.

---

## Exit Ticket ##

Access code: core89

Instruct students to open the exit ticket for this week in the LMS. You may read through the questions with the students, but do not give the students the answers to the questions. Once all students have answered the questions, you may ask students for the correct answer.

1. What are the differences between PUT and PATCH HTTP methods for updates?
  > Answer: PUT replaces the entire resource, PATCH updates only specific fields
2. What option must you include to run validation during Mongoose updates?
  > Answer: runValidators: true
3. What is the difference between optimistic and pessimistic updates?
  > Answer: Optimistic updates the UI immediately then syncs with server; pessimistic waits for server confirmation before updating UI
4. Which Mongoose method returns the updated document?
  > Answer: findByIdAndUpdate (with new: true option)

---

## Review ##

- What are the differences between PUT and PATCH HTTP methods for updates?
- How do you enable validation during Mongoose update operations?
- What is the difference between optimistic and pessimistic updates?
- How do you handle partial updates vs complete document replacement?
- What are the key error types to handle in UPDATE operations?
- When would you use `findByIdAndUpdate` vs `updateOne`?