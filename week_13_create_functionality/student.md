# Week 13 - CREATE Functionality #

- [Week 13 - CREATE Functionality](#week-13---create-functionality)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Simple Examples - Building Understanding](#simple-examples---building-understanding)
  - [Starting Point](#starting-point)
  - [Understanding CREATE Operations](#understanding-create-operations)
  - [Implementing CREATE with Mongoose](#implementing-create-with-mongoose)
    - [Basic Document Creation](#basic-document-creation)
    - [Handling Validation Errors](#handling-validation-errors)
    - [Advanced Creation Patterns](#advanced-creation-patterns)
  - [Building CREATE API Endpoints](#building-create-api-endpoints)
  - [Frontend Integration](#frontend-integration)
  - [Data Validation and Sanitization](#data-validation-and-sanitization)
  - [Testing CREATE Operations](#testing-create-operations)
  - [Error Handling Best Practices](#error-handling-best-practices)
  - [Security Considerations](#security-considerations)
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

- Implement CREATE operations using Mongoose models and methods
- Build robust API endpoints for creating new movies
- Handle data validation and provide meaningful error messages
- Implement proper data sanitization and security measures
- Connect React frontend to CREATE endpoints with error handling
- Use Mongoose middleware for data processing during creation
- Test CREATE functionality thoroughly using various methods
- Apply best practices for handling user input and data creation

---

## Glossary ##

- `CREATE Operation`: The "C" in CRUD - adding new data to the database
- `Data Validation`: Checking that data meets specified criteria before saving
- `Data Sanitization`: Cleaning and formatting data to prevent security issues
- `Middleware`: Functions that run during the document lifecycle (pre/post save)
- `Duplicate Key Error`: Error when trying to create a document with a unique field that already exists
- `Request Body`: Data sent from client to server in POST requests
- `Status Code 201`: HTTP status indicating successful resource creation
- `Idempotent`: Operations that produce the same result when repeated

---

## Simple Examples - Building Understanding ##

Before diving into the full implementation, let's explore some simple, focused examples to build our understanding of CREATE operations step by step.

### Example 1: Basic POST Request Handling ###

Let's start with a minimal POST endpoint that accepts data:

```javascript
// Simple POST endpoint
app.post('/api/movies', (req, res) => {
  console.log('Received data:', req.body);

  // Return success response
  res.status(201).json({
    success: true,
    message: 'Data received successfully',
    receivedData: req.body
  });
});
```

**Try It Out:** Use Postman or curl to send POST data to this endpoint and see how it handles the request body.

### Example 2: Request Body Validation ###

Now let's add some basic validation to ensure we receive the required data:

```javascript
// POST endpoint with validation
app.post('/api/movies', (req, res) => {
  const { name, year, rating } = req.body;

  // Check if required fields are present
  if (!name || !year || !rating) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields: name, year, and rating are required'
    });
  }

  // Validation passed
  res.status(201).json({
    success: true,
    message: 'Movie data is valid',
    movie: { name, year, rating }
  });
});
```

**Try It Out:** Test this endpoint with both complete and incomplete data to see how validation works.

### Example 3: Simple Data Creation (No Database) ###

Let's simulate creating data by storing it in an array (before we connect to MongoDB):

```javascript
// In-memory storage for testing
let movies = [];
let nextId = 1;

// POST endpoint that "creates" a movie
app.post('/api/movies', (req, res) => {
  const { name, year, rating, description } = req.body;

  // Basic validation
  if (!name || !year || !rating) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  // Create new movie object
  const newMovie = {
    id: nextId++,
    name,
    year: parseInt(year),
    rating,
    description: description || 'No description provided',
    createdAt: new Date().toISOString()
  };

  // "Save" to our array
  movies.push(newMovie);

  // Return created movie
  res.status(201).json({
    success: true,
    message: 'Movie created successfully',
    data: newMovie
  });
});

// GET endpoint to see our created movies
app.get('/api/movies', (req, res) => {
  res.json({
    success: true,
    count: movies.length,
    data: movies
  });
});
```

**Try It Out:** Create several movies using POST, then use GET to see your created data persist in memory.

### Example 4: Error Handling for Invalid Data ###

Let's handle common error scenarios that occur during creation:

```javascript
app.post('/api/movies', (req, res) => {
  try {
    const { name, year, rating } = req.body;

    // Check for empty request body
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Request body is required',
        hint: 'Send JSON data with movie information'
      });
    }

    // Validate name
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Movie name is required and must be a non-empty string'
      });
    }

    // Validate year
    if (!year || isNaN(year) || year < 1800 || year > new Date().getFullYear() + 5) {
      return res.status(400).json({
        success: false,
        error: 'Year must be a valid number between 1800 and ' + (new Date().getFullYear() + 5)
      });
    }

    // Validate rating
    const validRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR'];
    if (!rating || !validRatings.includes(rating)) {
      return res.status(400).json({
        success: false,
        error: 'Rating must be one of: ' + validRatings.join(', ')
      });
    }

    // If we get here, data is valid
    const newMovie = {
      id: nextId++,
      name: name.trim(),
      year: parseInt(year),
      rating,
      createdAt: new Date().toISOString()
    };

    movies.push(newMovie);

    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: newMovie
    });

  } catch (error) {
    // Handle unexpected errors
    console.error('Unexpected error:', error);
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      message: 'Something went wrong while creating the movie'
    });
  }
});
```

**Try It Out:** Test this endpoint with various invalid inputs (empty body, invalid year, bad rating) to see how comprehensive error handling works.

These examples build the foundation for understanding how CREATE operations work before we dive into the full MongoDB implementation with Mongoose!

---

## Starting Point ##

Before we begin this lesson, make sure you have completed Week 12 and have:

- Mongoose installed and configured in your Movie Buzz backend
- A complete Movie schema with validation rules
- Working READ operations (GET endpoints)
- React frontend that can fetch and display movies
- All previous endpoints tested and functional

Your current API should support:
- `GET /api/movies` - Get all movies with filtering/pagination
- `GET /api/movies/:id` - Get single movie by ID
- `GET /api/movies/genre/:genre` - Get movies by genre
- `GET /api/movies/recent` - Get recent movies

---

## Understanding CREATE Operations ##

CREATE operations are responsible for adding new data to your database. In the context of our Movie Buzz application, this means allowing users to add new movies to our collection.

**Key Principles of CREATE Operations:**

1. **Data Validation**: Ensure incoming data meets schema requirements
2. **Data Sanitization**: Clean and format data before saving
3. **Error Handling**: Provide clear feedback when creation fails
4. **Security**: Prevent malicious data from entering the system
5. **Consistency**: Maintain data integrity across the application
6. **User Feedback**: Inform users of success or failure

**CREATE vs Other Operations:**
- **READ**: Retrieves existing data (no data modification)
- **CREATE**: Adds new data (modifies database by adding)
- **UPDATE**: Modifies existing data (changes existing records)
- **DELETE**: Removes existing data (modifies database by removing)

> `Consider This`  
> Why is validation especially important for CREATE operations compared to READ operations? What could go wrong if we don't validate data properly?

---

## Implementing CREATE with Mongoose ##

### Basic Document Creation ###

Mongoose provides several methods for creating documents:

```javascript
// Method 1: Create instance and save
const movie = new Movie({
  name: "The Godfather",
  year: 1972,
  rating: "R",
  length: "175 minutes",
  description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
  genre: ["Crime", "Drama"],
  director: "Francis Ford Coppola",
  stars: ["Marlon Brando", "Al Pacino", "James Caan"]
});

const savedMovie = await movie.save();

// Method 2: Direct creation with Model.create()
const movie = await Movie.create({
  name: "The Godfather",
  year: 1972,
  rating: "R",
  length: "175 minutes",
  description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
  genre: ["Crime", "Drama"],
  director: "Francis Ford Coppola",
  stars: ["Marlon Brando", "Al Pacino", "James Caan"]
});

// Method 3: Insert multiple documents
const movies = await Movie.insertMany([
  { name: "Movie 1", year: 2021, /* other fields */ },
  { name: "Movie 2", year: 2022, /* other fields */ }
]);
```

**When to Use Each Method:**
- **new + save()**: When you need to perform operations before saving
- **create()**: Most common for single document creation
- **insertMany()**: For bulk creation (less common in web APIs)

### Handling Validation Errors ###

Mongoose automatically validates data based on your schema before saving:

```javascript
try {
  const movie = await Movie.create({
    name: "Incomplete Movie",
    year: "not a number", // This will fail validation
    // Missing required fields like rating, length, etc.
  });
} catch (error) {
  if (error.name === 'ValidationError') {
    // Handle validation errors
    console.log('Validation failed:');
    Object.values(error.errors).forEach(err => {
      console.log(`${err.path}: ${err.message}`);
    });
  }
}
```

### Advanced Creation Patterns ###

```javascript
// Creating with pre-save transformations
const movieData = {
  name: "  the matrix  ", // Has extra spaces
  year: 1999,
  rating: "r", // Lowercase
  genre: ["action", "sci-fi"], // Lowercase genres
  // ... other fields
};

// The schema's pre-save middleware will clean this up
const movie = await Movie.create(movieData);
// Result: name trimmed, rating uppercase, genres capitalized

// Creating with custom validation
const movie = new Movie(movieData);

// Add custom logic before saving
if (movie.year > new Date().getFullYear()) {
  throw new Error('Movie cannot be from the future');
}

await movie.save();

// Creating with default values
const movie = await Movie.create({
  name: "New Movie",
  year: 2024,
  rating: "PG",
  length: "120 minutes",
  description: "A great movie",
  genre: ["Drama"],
  director: "Unknown Director",
  stars: ["Actor One"]
  // awards.oscars and awards.nominations will default to 0
});
```

---

## Building CREATE API Endpoints ##

Let's implement the CREATE endpoint in our Express controller. Update your `controllers/movieController.js`:

```javascript
const Movie = require('../models/Movie');

// Create new movie
const createMovie = async (req, res) => {
  try {
    // Extract data from request body
    const movieData = req.body;

    // Basic input validation
    if (!movieData || Object.keys(movieData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Movie data is required'
      });
    }

    // Check for required fields (additional validation beyond schema)
    const requiredFields = ['name', 'year', 'rating', 'length', 'description', 'director'];
    const missingFields = requiredFields.filter(field => !movieData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        missingFields: missingFields
      });
    }

    // Data sanitization
    const sanitizedData = {
      ...movieData,
      name: movieData.name?.toString().trim(),
      director: movieData.director?.toString().trim(),
      description: movieData.description?.toString().trim(),
      year: parseInt(movieData.year),
      genre: Array.isArray(movieData.genre) ? 
        movieData.genre.map(g => g.toString().trim()) : 
        [movieData.genre?.toString().trim()].filter(Boolean),
      stars: Array.isArray(movieData.stars) ? 
        movieData.stars.map(s => s.toString().trim()) : 
        [movieData.stars?.toString().trim()].filter(Boolean)
    };

    // Create the movie
    const newMovie = await Movie.create(sanitizedData);

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: newMovie
    });

  } catch (error) {
    console.error('Error creating movie:', error);

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

    if (error.code === 11000) {
      // Duplicate key error (if you have unique fields)
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        error: `Movie with this ${field} already exists`
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid data type provided',
        details: `${error.path} must be a valid ${error.kind}`
      });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      error: 'Failed to create movie',
      details: error.message
    });
  }
};

// Bulk create movies (optional advanced endpoint)
const createMultipleMovies = async (req, res) => {
  try {
    const moviesData = req.body;

    // Validate input
    if (!Array.isArray(moviesData) || moviesData.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Array of movies is required'
      });
    }

    // Limit bulk creation to prevent abuse
    if (moviesData.length > 50) {
      return res.status(400).json({
        success: false,
        error: 'Cannot create more than 50 movies at once'
      });
    }

    // Create all movies
    const newMovies = await Movie.insertMany(moviesData, { 
      ordered: false, // Continue even if some fail
      rawResult: true // Get detailed results
    });

    res.status(201).json({
      success: true,
      message: `Successfully created ${newMovies.insertedCount} movies`,
      data: newMovies,
      created: newMovies.insertedCount,
      total: moviesData.length
    });

  } catch (error) {
    console.error('Error creating multiple movies:', error);

    // Handle bulk write errors
    if (error.name === 'BulkWriteError') {
      const successCount = error.result.insertedCount;
      const failureCount = error.writeErrors?.length || 0;

      return res.status(207).json({ // 207 = Multi-Status
        success: false,
        message: `Partial success: ${successCount} created, ${failureCount} failed`,
        created: successCount,
        failed: failureCount,
        errors: error.writeErrors?.map(err => ({
          index: err.index,
          message: err.errmsg
        }))
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to create movies',
      details: error.message
    });
  }
};

module.exports = {
  // ... existing functions (getAllMovies, getMovieById, etc.)
  createMovie,
  createMultipleMovies
};
```

Update your routes in `routes/movieRoutes.js`:

```javascript
const express = require('express');
const {
  getAllMovies,
  getMovieById,
  getMoviesByGenre,
  getRecentMovies,
  createMovie,
  createMultipleMovies, // Optional
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

const router = express.Router();

// READ routes
router.get('/', getAllMovies);
router.get('/genre/:genre', getMoviesByGenre);
router.get('/recent', getRecentMovies);
router.get('/:id', getMovieById);

// CREATE routes
router.post('/', createMovie);                    // POST /api/movies
router.post('/bulk', createMultipleMovies);       // POST /api/movies/bulk (optional)

// UPDATE and DELETE routes (placeholders for now)
router.put('/:id', updateMovie);
router.delete('/:id', deleteMovie);

module.exports = router;
```

---

## Frontend Integration ##

Now let's update your React frontend to handle movie creation. First, make sure your MovieForm component can create new movies:

```javascript
// In your React App.js, update the handleAddMovie function
const handleAddMovie = async (movieData) => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });

    const result = await response.json();

    if (result.success) {
      // Success: refresh the movie list and close form
      await fetchMovies(); // Refresh the list to show new movie
      setShowForm(false);
      
      // Optional: Show success message
      setSuccessMessage(`"${result.data.name}" has been added successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      // Handle API errors
      if (result.details && Array.isArray(result.details)) {
        // Validation errors
        const errorMessages = result.details.map(err => 
          `${err.field}: ${err.message}`
        ).join(', ');
        setError(`Validation failed: ${errorMessages}`);
      } else {
        setError(result.error || 'Failed to add movie');
      }
    }
  } catch (error) {
    console.error('Error adding movie:', error);
    setError('Failed to connect to server. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

Update your MovieForm component to handle validation errors:

```javascript
// In MovieForm.js, add state for handling errors
import React, { useState, useEffect } from 'react';

function MovieForm({ onAddMovie, onUpdateMovie, onCancel, editingMovie }) {
  const [movieData, setMovieData] = useState({
    name: '',
    year: '',
    rating: '',
    length: '',
    description: '',
    genre: '',
    director: '',
    stars: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ... existing useEffect for editing ...

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value
    });

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!movieData.name.trim()) {
      newErrors.name = 'Movie name is required';
    }

    if (!movieData.year || movieData.year < 1800) {
      newErrors.year = 'Please enter a valid year';
    }

    if (!movieData.rating) {
      newErrors.rating = 'Rating is required';
    }

    if (!movieData.length.trim()) {
      newErrors.length = 'Movie length is required';
    }

    if (!movieData.description.trim() || movieData.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (!movieData.director.trim()) {
      newErrors.director = 'Director is required';
    }

    if (!movieData.genre.trim()) {
      newErrors.genre = 'At least one genre is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      const processedMovie = {
        ...movieData,
        genre: movieData.genre.split(',').map(g => g.trim()).filter(Boolean),
        stars: movieData.stars.split(',').map(s => s.trim()).filter(Boolean),
        year: parseInt(movieData.year)
      };

      if (editingMovie) {
        await onUpdateMovie({ ...processedMovie, _id: editingMovie._id });
      } else {
        await onAddMovie(processedMovie);
      }
    } catch (error) {
      // Error handling is done in parent component
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="movie-form">
      <h2>{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Movie Name *"
            value={movieData.name}
            onChange={handleInputChange}
            className={errors.name ? 'error' : ''}
            required
          />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>

        <div className="form-group">
          <input
            type="number"
            name="year"
            placeholder="Year *"
            value={movieData.year}
            onChange={handleInputChange}
            className={errors.year ? 'error' : ''}
            min="1800"
            max={new Date().getFullYear() + 5}
            required
          />
          {errors.year && <span className="error-message">{errors.year}</span>}
        </div>

        <div className="form-group">
          <select
            name="rating"
            value={movieData.rating}
            onChange={handleInputChange}
            className={errors.rating ? 'error' : ''}
            required
          >
            <option value="">Select Rating *</option>
            <option value="G">G</option>
            <option value="PG">PG</option>
            <option value="PG-13">PG-13</option>
            <option value="R">R</option>
            <option value="NC-17">NC-17</option>
            <option value="NR">Not Rated</option>
          </select>
          {errors.rating && <span className="error-message">{errors.rating}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="length"
            placeholder="Length (e.g., '120 minutes') *"
            value={movieData.length}
            onChange={handleInputChange}
            className={errors.length ? 'error' : ''}
            required
          />
          {errors.length && <span className="error-message">{errors.length}</span>}
        </div>

        <div className="form-group">
          <textarea
            name="description"
            placeholder="Description (minimum 10 characters) *"
            value={movieData.description}
            onChange={handleInputChange}
            className={errors.description ? 'error' : ''}
            rows="4"
            required
          />
          {errors.description && <span className="error-message">{errors.description}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="genre"
            placeholder="Genres (comma-separated) *"
            value={movieData.genre}
            onChange={handleInputChange}
            className={errors.genre ? 'error' : ''}
            required
          />
          {errors.genre && <span className="error-message">{errors.genre}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="director"
            placeholder="Director *"
            value={movieData.director}
            onChange={handleInputChange}
            className={errors.director ? 'error' : ''}
            required
          />
          {errors.director && <span className="error-message">{errors.director}</span>}
        </div>

        <div className="form-group">
          <input
            type="text"
            name="stars"
            placeholder="Stars (comma-separated)"
            value={movieData.stars}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-buttons">
          <button 
            type="submit" 
            disabled={isSubmitting}
            className={isSubmitting ? 'submitting' : ''}
          >
            {isSubmitting ? 'Saving...' : (editingMovie ? 'Update Movie' : 'Add Movie')}
          </button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
```

---

## Data Validation and Sanitization ##

Proper data validation and sanitization are crucial for CREATE operations:

```javascript
// Example validation middleware (optional)
const validateMovieData = (req, res, next) => {
  const { name, year, rating, length, description, director } = req.body;

  // Check required fields
  if (!name || !year || !rating || !length || !description || !director) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  // Validate data types
  if (typeof year !== 'number' || year < 1800 || year > new Date().getFullYear() + 5) {
    return res.status(400).json({
      success: false,
      error: 'Year must be a valid number between 1800 and future releases'
    });
  }

  // Validate rating
  const validRatings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR'];
  if (!validRatings.includes(rating)) {
    return res.status(400).json({
      success: false,
      error: 'Rating must be one of: ' + validRatings.join(', ')
    });
  }

  // Sanitize strings
  req.body.name = name.toString().trim();
  req.body.director = director.toString().trim();
  req.body.description = description.toString().trim();

  next();
};

// Use in routes
router.post('/', validateMovieData, createMovie);
```

---

## Testing CREATE Operations ##

### Using curl ###

```bash
# Test successful creation
curl -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Movie",
    "year": 2024,
    "rating": "PG-13",
    "length": "120 minutes",
    "description": "A test movie for our API",
    "genre": ["Comedy", "Drama"],
    "director": "Test Director",
    "stars": ["Actor One", "Actor Two"]
  }'

# Test validation errors
curl -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "year": "not a number",
    "rating": "INVALID"
  }'

# Test missing data
curl -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{}'
```

### Using JavaScript fetch() ###

```javascript
// Test in browser console or React app
const testCreateMovie = async () => {
  try {
    const response = await fetch('http://localhost:4000/api/movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: "JavaScript Test Movie",
        year: 2024,
        rating: "R",
        length: "95 minutes",
        description: "A movie created via JavaScript fetch",
        genre: ["Thriller"],
        director: "JS Developer",
        stars: ["Code Master", "Debug Hero"]
      }),
    });

    const result = await response.json();
    console.log('Result:', result);
  } catch (error) {
    console.error('Error:', error);
  }
};

testCreateMovie();
```

---

## Error Handling Best Practices ##

```javascript
// Comprehensive error handling example
const createMovieWithErrorHandling = async (req, res) => {
  try {
    const movieData = req.body;

    // Input validation
    if (!movieData) {
      return res.status(400).json({
        success: false,
        error: 'Request body is required',
        code: 'MISSING_BODY'
      });
    }

    // Create movie
    const newMovie = await Movie.create(movieData);

    // Success response
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: newMovie
    });

  } catch (error) {
    // Log error for debugging
    console.error('CREATE Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    // Validation errors
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

    // Duplicate key errors
    if (error.code === 11000) {
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        error: `Duplicate ${field}`,
        code: 'DUPLICATE_KEY',
        field: field
      });
    }

    // Cast errors (wrong data type)
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid data type',
        code: 'CAST_ERROR',
        details: {
          field: error.path,
          expectedType: error.kind,
          receivedValue: error.value
        }
      });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};
```

---

## Security Considerations ##

When implementing CREATE operations, consider these security measures:

```javascript
// 1. Rate limiting (requires express-rate-limit)
const rateLimit = require('express-rate-limit');

const createMovieRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: 'Too many movies created, please try again later'
  }
});

router.post('/', createMovieRateLimit, createMovie);

// 2. Input size limiting
app.use(express.json({ limit: '1mb' })); // Limit request body size

// 3. Data sanitization
const sanitizeInput = (req, res, next) => {
  // Remove potentially dangerous characters
  for (let key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = req.body[key]
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
        .trim();
    }
  }
  next();
};

router.post('/', sanitizeInput, createMovie);

// 4. Authentication (placeholder)
const authenticateUser = (req, res, next) => {
  // Add authentication logic here
  // For now, just continue
  next();
};

router.post('/', authenticateUser, createMovie);
```

---

## Final Thoughts ##

We've successfully implemented CREATE functionality for our Movie Buzz application! Our implementation includes:

- **Robust Data Validation**: Schema-based validation with custom rules
- **Comprehensive Error Handling**: Specific error types with helpful messages
- **Data Sanitization**: Clean and format incoming data
- **Frontend Integration**: React forms with validation and error display
- **Security Measures**: Rate limiting and input sanitization
- **Professional API Design**: Proper HTTP status codes and response formats

The CREATE operations now support:
- Single movie creation with full validation
- Bulk movie creation (optional)
- Rich error responses for debugging
- Frontend form validation
- Security best practices

Next week, we'll implement UPDATE functionality, allowing users to modify existing movies while maintaining data integrity.

> `Consider This`  
> How does proper validation and error handling in CREATE operations improve the user experience? What would happen without these safeguards?

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Review ##

- What are the key principles of implementing CREATE operations?
- How do you handle validation errors in Mongoose?
- What HTTP status code should be used for successful resource creation?
- How do you implement data sanitization for security?
- What are the differences between `new Model()` + `save()` vs `Model.create()`?
- How do you provide meaningful error messages to frontend applications?