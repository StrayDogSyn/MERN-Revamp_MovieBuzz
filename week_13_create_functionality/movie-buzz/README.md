# Movie Buzz - Week 11: CREATE Functionality

Building on Week 10's READ operations, this week adds CREATE functionality to allow adding new movies to the MongoDB database through POST endpoints.

## What's New in Week 11

- **POST Endpoints**: Create new movies via API
- **Request Body Parsing**: Handle JSON data from clients
- **Mongoose Create Methods**: Save new documents to MongoDB
- **Validation**: Server-side validation before saving
- **Error Handling**: Proper error responses for failed creates
- **Testing**: Postman collections for testing POST requests

## Learning Objectives

- Implement POST endpoints in Express
- Use Mongoose to create and save documents
- Validate incoming data before database operations
- Handle errors gracefully with appropriate status codes
- Test CREATE operations with Postman
- Understand RESTful conventions for creation

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

### Step 1: Set Up Express Body Parser
**File: `server.js` (Lines 15-20)**
```javascript
const express = require('express');
const cors = require('cors');
const app = express();

// TODO: Add middleware to parse JSON request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Add CORS for frontend communication
app.use(cors());
```

### Step 2: Create the POST Route
**File: `routes/movieRoutes.js` (Lines 10-15)**
```javascript
const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movieController');

// Existing GET routes from Week 10...
router.get('/movies', movieController.getAllMovies);
router.get('/movie/:id', movieController.getMovieById);

// TODO: Add POST route for creating a new movie
router.post('/movie/new', movieController.createMovie);

module.exports = router;
```

### Step 3: Implement Create Controller Method
**File: `controllers/movieController.js` (Lines 40-80)**
```javascript
// TODO: Add createMovie controller method
const createMovie = async (req, res) => {
  try {
    // TODO: Extract movie data from request body
    const movieData = req.body;
    
    // TODO: Validate required fields
    if (!movieData.name || !movieData.director || !movieData.year) {
      return res.status(400).json({
        error: 'Missing required fields: name, director, and year are required'
      });
    }
    
    // TODO: Validate data types and ranges
    if (movieData.year < 1900 || movieData.year > 2030) {
      return res.status(400).json({
        error: 'Year must be between 1900 and 2030'
      });
    }
    
    // TODO: Create new movie document using Mongoose model
    const newMovie = new Movie({
      name: movieData.name,
      description: movieData.description || '',
      rating: movieData.rating || 'NR',
      length: movieData.length || '',
      year: movieData.year,
      genre: movieData.genre || 'Drama',
      director: movieData.director,
      stars: movieData.stars || ''
    });
    
    // TODO: Save to database
    const savedMovie = await newMovie.save();
    
    // TODO: Return success response with created movie
    res.status(201).json({
      message: 'Movie created successfully',
      movie: savedMovie
    });
    
  } catch (error) {
    // TODO: Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation failed',
        details: error.message
      });
    }
    
    // TODO: Handle other errors
    console.error('Error creating movie:', error);
    res.status(500).json({
      error: 'Failed to create movie'
    });
  }
};

// TODO: Export the new controller method
module.exports = {
  getAllMovies,
  getMovieById,
  createMovie  // Add this to exports
};
```

### Step 4: Add Mongoose Schema Validation
**File: `models/movie.js` (Lines 10-40)**
```javascript
const mongoose = require('mongoose');

// TODO: Define schema with validation rules
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Movie name is required'],
    trim: true,
    minlength: [1, 'Movie name cannot be empty'],
    maxlength: [100, 'Movie name cannot exceed 100 characters']
  },
  description: {
    type: String,
    default: '',
    maxlength: [500, 'Description cannot exceed 500 characters']
  },
  rating: {
    type: String,
    enum: ['G', 'PG', 'PG-13', 'R', 'NR'],
    default: 'NR'
  },
  length: {
    type: String,
    default: ''
  },
  year: {
    type: Number,
    required: [true, 'Year is required'],
    min: [1900, 'Year must be 1900 or later'],
    max: [2030, 'Year cannot be after 2030']
  },
  genre: {
    type: String,
    default: 'Drama'
  },
  director: {
    type: String,
    required: [true, 'Director is required'],
    trim: true
  },
  stars: {
    type: String,
    default: ''
  }
}, {
  timestamps: true  // TODO: Add createdAt and updatedAt automatically
});

// TODO: Create and export the model
const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;
```

### Step 5: Handle Duplicate Movie Names (Optional)
**File: `controllers/movieController.js` (Lines 50-55)**
```javascript
    // TODO: Check if movie with same name already exists
    const existingMovie = await Movie.findOne({ 
      name: movieData.name,
      year: movieData.year 
    });
    
    if (existingMovie) {
      return res.status(409).json({
        error: 'A movie with this name and year already exists'
      });
    }
```

### Step 6: Add Input Sanitization
**File: `controllers/movieController.js` (Lines 45-50)**
```javascript
    // TODO: Sanitize input data
    const sanitizeString = (str) => {
      return str ? str.trim() : '';
    };
    
    // TODO: Apply sanitization to string fields
    movieData.name = sanitizeString(movieData.name);
    movieData.director = sanitizeString(movieData.director);
    movieData.description = sanitizeString(movieData.description);
```

### Step 7: Add Logging for Debugging
**File: `controllers/movieController.js` (Lines 42-44)**
```javascript
const createMovie = async (req, res) => {
  // TODO: Add logging for debugging
  console.log('CREATE /api/movies - Request body:', req.body);
  
  try {
    // ... rest of the create logic
```

## Testing Your Implementation

### Using Postman

1. **Create a New Movie**:
   - Method: POST
   - URL: `http://localhost:4000/api/movies`
   - Headers: `Content-Type: application/json`
   - Body (raw JSON):
   ```json
   {
     "name": "Inception",
     "year": 2010,
     "rating": "PG-13",
     "length": "148 min",
     "genre": "Sci-Fi",
     "director": "Christopher Nolan",
     "stars": "Leonardo DiCaprio, Marion Cotillard",
     "description": "A thief who steals corporate secrets through dream-sharing technology"
   }
   ```

2. **Test Validation**:
   - Try creating without required fields
   - Try invalid year (e.g., 1800 or 2050)
   - Try invalid rating (e.g., "X")
   - Try duplicate movie names

3. **Verify in Database**:
   ```bash
   # In MongoDB shell or Compass
   db.movies.find({ name: "Inception" })
   ```

### Using cURL

```bash
# Create a new movie
curl -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "The Matrix",
    "year": 1999,
    "rating": "R",
    "director": "The Wachowskis"
  }'
```

## Common Issues and Solutions

- **Cannot POST**: Check that body parser middleware is added
- **Validation errors not showing**: Ensure Mongoose validation is properly defined
- **Empty request body**: Verify Content-Type header is `application/json`
- **Duplicate key error**: Add unique index or check for existing documents
- **Connection refused**: Make sure MongoDB is running

## RESTful Conventions

- POST `/api/movies` - Create new resource
- Return 201 (Created) status on success
- Return 400 (Bad Request) for validation errors
- Return 409 (Conflict) for duplicates
- Return 500 (Internal Server Error) for server issues
- Include created resource in response body

## Next Steps

Week 12 will add UPDATE functionality with PUT endpoints, allowing modification of existing movies in the database.