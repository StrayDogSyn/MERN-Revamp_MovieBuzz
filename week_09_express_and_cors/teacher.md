# Week 9 - Express & CORS #

- [Week 9 - Express & CORS](#week-9---express--cors)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [What is Express?](#what-is-express)
  - [Setting Up Express](#setting-up-express)
  - [Creating API Routes](#creating-api-routes)
  - [Understanding CORS](#understanding-cors)
  - [Building Movie Buzz API](#building-movie-buzz-api)
  - [Testing API Endpoints](#testing-api-endpoints)
  - [Connecting React Frontend](#connecting-react-frontend)
  - [Error Handling](#error-handling)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students now have solid React frontend skills and Node.js backend fundamentals including HTTP protocol understanding. This week bridges their knowledge by introducing Express as the web server framework that builds on the HTTP concepts they learned. Students will transform their file-based Node.js backend into a full REST API and connect their React app to consume this API using fetch(). This represents the crucial step toward full-stack development.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Explain how Express.js builds on Node.js HTTP concepts to simplify web server development
- Set up an Express application with proper project structure and middleware
- Create REST API endpoints for CRUD operations using Express routing
- Understand and configure CORS for cross-origin requests between React and Express
- Build a complete API server for the Movie Buzz application
- Test API endpoints using curl commands and browser requests
- Connect React frontend to Express backend using fetch()
- Implement proper error handling and HTTP status codes in Express routes

---

## Glossary ##

- `Express.js`: A minimal and flexible Node.js web application framework
- `Middleware`: Functions that execute during the request-response cycle
- `REST API`: Representational State Transfer - a set of conventions for building web APIs
- `CORS`: Cross-Origin Resource Sharing - mechanism that allows restricted resources to be requested from another domain
- `Route`: A combination of a URL path and HTTP method that defines an API endpoint
- `Controller`: Functions that handle the business logic for API routes
- `HTTP Methods`: GET, POST, PUT, DELETE - different ways to interact with API endpoints

---

## Starting Point ##

Students should have completed Week 8 with a working Node.js backend featuring:
- Movie model with CRUD operations
- File utilities for data persistence
- Modular project structure
- Understanding of HTTP protocol and basic server creation

**Important Connection**: Start by reviewing Week 8's HTTP server concepts.

Verify starting point:
```bash
cd movie-buzz-backend
node server.js
```

Students should see their console-based movie operations working.

---

## What is Express? ##

**CRITICAL OPENING**: Connect to Week 8's HTTP server experience!

**Start with Review**: "Last week you built an HTTP server using Node.js's built-in `http` module. How did that feel? What was challenging about it?"

**Expected Student Responses**: 
- Lots of if/else statements for different URLs
- Manual JSON parsing and stringifying  
- Repetitive code
- Hard to organize routes

**Then Introduce Express**: "Express.js solves exactly those problems! It's a framework that builds on the HTTP concepts you learned to make web server development much more elegant."

**Compare Side-by-Side** (write on board):

```javascript
// Week 8's HTTP Server (what they built)
if (request.url === '/movies' && request.method === 'GET') {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(movies));
} else if (request.url === '/movies' && request.method === 'POST') {
  // Manual body parsing...
}

// This Week's Express Server  
app.get('/movies', (req, res) => {
  res.json(movies); // Express handles JSON automatically!
});

app.post('/movies', (req, res) => {
  // req.body is automatically parsed!
});
```

**Key Teaching Point**: Express doesn't replace HTTP knowledge - it builds on it and makes it more developer-friendly.

**Express provides:**
- **Simplified Routing**: Clean syntax instead of if/else chains
- **Automatic JSON handling**: No more manual parsing/stringifying
- **Middleware**: Reusable functions for common tasks
- **Better error handling**: Centralized error management
- **Static file serving**: Built-in file serving capabilities

> `Consider This`  
> Based on your HTTP server experience from last week, what specific problems do you think Express solves?
>> Expected: Cleaner routing, automatic JSON handling, less boilerplate code, better organization, easier error handling.

---

## Setting Up Express ##

**Important Installation Step**: Walk through package installation carefully.

First, let's install Express and other necessary packages:

```bash
npm install express cors
npm install --save-dev nodemon
```

**Explain Each Package**:
- `express`: The web framework
- `cors`: Handles cross-origin requests
- `nodemon`: Development tool that restarts server on changes

Update your `package.json` scripts:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

**Teaching Point**: `npm run dev` now provides auto-restart during development.

Create a basic Express server by updating your `server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const Movie = require('./models/Movie');

// Create Express application
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json()); // Parse JSON request bodies
app.use(cors()); // Enable CORS for all routes

// Basic route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Movie Buzz API',
    version: '1.0.0',
    endpoints: [
      'GET /api/movies - Get all movies',
      'GET /api/movies/:id - Get movie by ID',
      'POST /api/movies - Create new movie',
      'PUT /api/movies/:id - Update movie',
      'DELETE /api/movies/:id - Delete movie'
    ]
  });
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎬 Movie Buzz API running on http://localhost:${PORT}`);
});
```

**Key Teaching Points**:
- `express()` creates the application
- `app.use()` adds middleware
- `app.get()` defines routes
- `app.listen()` starts the server
- `res.json()` sends JSON responses

**Test immediately**:
```bash
npm run dev
```

Have students visit `http://localhost:4000` to see the API documentation.

---

## Creating API Routes ##

**Teaching Strategy**: Build the MVC pattern incrementally - Model (done), View (API responses), Controller (business logic).

Let's create proper REST API routes for our Movie operations. First, create a controllers directory:

```bash
mkdir controllers
touch controllers/movieController.js
```

**Explain MVC Architecture**: 
- Models: Data layer (we have this)
- Views: Response format (JSON)
- Controllers: Business logic between routes and models

Create the movie controller in `controllers/movieController.js`:

**Build This Function by Function With Students**:

```javascript
const Movie = require('../models/Movie');

// Get all movies
const getAllMovies = (req, res) => {
  try {
    const movies = Movie.getAll();
    res.json({
      success: true,
      count: movies.length,
      data: movies
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve movies'
    });
  }
};

// Get single movie by ID
const getMovieById = (req, res) => {
  try {
    const { id } = req.params;
    const movie = Movie.findById(id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve movie'
    });
  }
};

// Create new movie
const createMovie = (req, res) => {
  try {
    const movieData = req.body;
    
    // Basic validation
    if (!movieData.name || !movieData.year || !movieData.director) {
      return res.status(400).json({
        success: false,
        error: 'Name, year, and director are required fields'
      });
    }
    
    const newMovie = new Movie(movieData);
    const saved = newMovie.save();
    
    if (saved) {
      res.status(201).json({
        success: true,
        data: newMovie
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to create movie'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create movie'
    });
  }
};

// Update existing movie
const updateMovie = (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    
    // Check if movie exists
    const existingMovie = Movie.findById(id);
    if (!existingMovie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    // Create updated movie object
    const updatedMovie = new Movie({ ...existingMovie, ...updateData, id: parseInt(id) });
    const saved = updatedMovie.save();
    
    if (saved) {
      res.json({
        success: true,
        data: updatedMovie
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to update movie'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update movie'
    });
  }
};

// Delete movie
const deleteMovie = (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if movie exists
    const existingMovie = Movie.findById(id);
    if (!existingMovie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    const deleted = Movie.delete(id);
    
    if (deleted) {
      res.json({
        success: true,
        message: 'Movie deleted successfully'
      });
    } else {
      res.status(500).json({
        success: false,
        error: 'Failed to delete movie'
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete movie'
    });
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
};
```

**Key Teaching Points for Each Function**:
- **Try-catch for error handling**
- **HTTP status codes** (200, 201, 400, 404, 500)
- **Consistent response format**
- **Parameter extraction** (`req.params`, `req.body`)
- **Input validation**

Now create routes in a new file `routes/movieRoutes.js`:

```bash
mkdir routes
touch routes/movieRoutes.js
```

```javascript
const express = require('express');
const {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

const router = express.Router();

// Movie routes
router.get('/', getAllMovies);           // GET /api/movies
router.get('/:id', getMovieById);        // GET /api/movies/:id
router.post('/', createMovie);           // POST /api/movies
router.put('/:id', updateMovie);         // PUT /api/movies/:id
router.delete('/:id', deleteMovie);      // DELETE /api/movies/:id

module.exports = router;
```

**Explain Express Router**: Modular routing that can be mounted on the main app.

Update your main `server.js` to use the routes:

```javascript
const express = require('express');
const cors = require('cors');
const movieRoutes = require('./routes/movieRoutes');

// Create Express application
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Movie Buzz API',
    version: '1.0.0',
    endpoints: [
      'GET /api/movies - Get all movies',
      'GET /api/movies/:id - Get movie by ID',
      'POST /api/movies - Create new movie',
      'PUT /api/movies/:id - Update movie',
      'DELETE /api/movies/:id - Delete movie'
    ]
  });
});

// API routes
app.use('/api/movies', movieRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎬 Movie Buzz API running on http://localhost:${PORT}`);
  console.log(`📖 API documentation available at http://localhost:${PORT}`);
});
```

**Key Points**:
- `app.use('/api/movies', movieRoutes)` mounts the router
- `app.use('*', ...)` catches all unmatched routes (404 handler)

---

## Understanding CORS ##

**Critical Concept**: Students WILL encounter CORS errors without this explanation.

CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers that restricts web pages from making requests to a different domain, protocol, or port than the one serving the web page.

**The Problem**: 
- React app runs on `http://localhost:3000` 
- API runs on `http://localhost:4000`
- Browser blocks requests between different ports for security

**Visual Diagram** (draw on board):
```
React App (port 3000) --X--> API Server (port 4000)
                        BLOCKED by browser
```

**The Solution**: Configure your Express server to allow cross-origin requests:

```javascript
// Basic CORS (allows all origins) - good for development
app.use(cors());

// Configured CORS (more secure for production)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

**Teaching Point**: For development, we'll use the basic configuration, but in production, you should specify exact origins for security.

**Common Student Error**: Forgetting CORS middleware results in cryptic browser errors. Always include it!

---

## Building Movie Buzz API ##

**Review the Complete API Structure**:

Your complete API now supports all CRUD operations:

### GET /api/movies ###
Returns all movies with success status and count.

### GET /api/movies/:id ###
Returns a specific movie by ID or 404 if not found.

### POST /api/movies ###
Creates a new movie. Requires name, year, and director.

### PUT /api/movies/:id ###
Updates an existing movie. Returns 404 if movie doesn't exist.

### DELETE /api/movies/:id ###
Deletes a movie. Returns 404 if movie doesn't exist.

**Consistent Response Format**:
```json
// Success
{
  "success": true,
  "data": { ... }
}

// Error
{
  "success": false,
  "error": "Error message"
}
```

**Teaching Emphasis**: Consistent APIs are easier to work with on the frontend.

---

## Testing API Endpoints ##

**Important**: Students must test endpoints before connecting React.

You can test your API endpoints using various methods:

### Using Browser (GET requests only) ###

Have students test these URLs:
- `http://localhost:4000/api/movies` - Get all movies
- `http://localhost:4000/api/movies/1` - Get movie with ID 1

### Using curl (command line) ###

**Demonstrate a few key examples**:

```bash
# Get all movies
curl http://localhost:4000/api/movies

# Create new movie
curl -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{"name":"New Movie","year":2024,"director":"Test Director","rating":"PG","length":"120 minutes","description":"A test movie","genre":["Drama"],"stars":["Actor One","Actor Two"]}'
```

### Using JavaScript fetch() ###

**Demo in browser console**:

```javascript
// Test in browser console
fetch('http://localhost:4000/api/movies')
  .then(response => response.json())
  .then(data => console.log(data));
```

**Teaching Tip**: Have students test at least one endpoint before moving to React integration.

---

## Connecting React Frontend ##

**Major Integration Step**: This connects everything students have learned.

Now let's update your React frontend to use the new API. This is a significant update to `App.js`:

**Key Changes to Highlight**:
1. **API_BASE_URL constant**
2. **async/await for API calls**
3. **Loading and error states**
4. **fetchMovies() function**
5. **Updated CRUD handlers**

```javascript
import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import MovieForm from './components/MovieForm';
import SearchBar from './components/SearchBar';
import './App.css';

const API_BASE_URL = 'http://localhost:4000/api';

function App() {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load movies from API on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch(`${API_BASE_URL}/movies`);
      const result = await response.json();
      
      if (result.success) {
        setMovies(result.data);
        setFilteredMovies(result.data);
      } else {
        setError('Failed to load movies');
      }
    } catch (error) {
      setError('Failed to connect to server');
      console.error('Error fetching movies:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddMovie = async (movieData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      const result = await response.json();
      
      if (result.success) {
        fetchMovies(); // Refresh the list
        setShowForm(false);
      } else {
        setError(result.error || 'Failed to add movie');
      }
    } catch (error) {
      setError('Failed to add movie');
      console.error('Error adding movie:', error);
    }
  };

  const handleUpdateMovie = async (movieData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${movieData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movieData),
      });

      const result = await response.json();
      
      if (result.success) {
        fetchMovies(); // Refresh the list
        setEditingMovie(null);
        setShowForm(false);
      } else {
        setError(result.error || 'Failed to update movie');
      }
    } catch (error) {
      setError('Failed to update movie');
      console.error('Error updating movie:', error);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (!window.confirm('Are you sure you want to delete this movie?')) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
      });

      const result = await response.json();
      
      if (result.success) {
        fetchMovies(); // Refresh the list
      } else {
        setError(result.error || 'Failed to delete movie');
      }
    } catch (error) {
      setError('Failed to delete movie');
      console.error('Error deleting movie:', error);
    }
  };

  // ... rest of component remains the same ...

  if (loading) {
    return <div className="App"><p>Loading movies...</p></div>;
  }

  if (error) {
    return (
      <div className="App">
        <p>Error: {error}</p>
        <button onClick={fetchMovies}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="App">
      {/* Rest of JSX remains the same */}
    </div>
  );
}

export default App;
```

**Critical Teaching Points**:
- **async/await syntax** for API calls
- **Error handling** with try-catch
- **Loading states** for better UX
- **fetchMovies()** to refresh data after changes
- **HTTP methods** in fetch options

**Test the Integration**: Have students run both servers and test the full application:
```bash
# Terminal 1: API Server
cd movie-buzz-backend
npm run dev

# Terminal 2: React App
cd movie-buzz-react
npm start
```

---

## Error Handling ##

**Professional Development Practice**: Good APIs handle errors gracefully.

We've implemented multiple layers of error handling:

1. **Try-catch blocks** in all controller functions
2. **HTTP status codes** (200, 201, 400, 404, 500)
3. **Consistent error response format**
4. **Input validation** for required fields
5. **404 handler** for unknown routes

**HTTP Status Code Guide**:
- **200**: Success
- **201**: Created successfully
- **400**: Bad request (client error)
- **404**: Not found
- **500**: Server error

Example error responses:

```json
// 400 Bad Request
{
  "success": false,
  "error": "Name, year, and director are required fields"
}

// 404 Not Found
{
  "success": false,
  "error": "Movie not found"
}

// 500 Server Error
{
  "success": false,
  "error": "Failed to retrieve movies"
}
```

**Teaching Point**: Consistent error formats make frontend error handling much easier.

---

## Final Thoughts ##

**Major Achievement**: Students have built a complete full-stack application!

We've successfully built a complete REST API for our Movie Buzz application using Express and connected it to our React frontend! Our application now features:

- Full CRUD operations via HTTP endpoints
- CORS configuration for React-API communication
- Proper error handling and status codes
- Modular, organized code structure
- Real-time data synchronization between frontend and backend

**Industry Relevance**: This represents a major milestone: you now have a full-stack MERN application (missing only the MongoDB, which we'll add soon)!

> `Consider This`  
> How does having a separate API backend change the architecture of your application? What new possibilities does this enable?
>> Expect: Multiple frontends can use the same API, mobile apps, better separation of concerns, scalability, different teams can work on frontend/backend independently.

**Next Week Preview**: We'll replace file storage with MongoDB for true database functionality.

---

## Exit Ticket ##

Access code: jade68

Instruct students to open the exit ticket for this week in the LMS. You may read through the questions with the students, but do not give the students the answers to the questions. Once all students have answered the questions, you may ask students for the correct answer.

1. What is Express.js primarily used for?
  > Answer: Building web servers and APIs with Node.js
2. What does CORS stand for and why is it needed?
  > Answer: Cross-Origin Resource Sharing - needed to allow React (port 3000) to communicate with API (port 4000)
3. What HTTP method is used to create new resources in a REST API?
  > Answer: POST
4. What HTTP status code indicates "Not Found"?
  > Answer: 404

---

## Review ##

- What is Express.js and what problems does it solve?
- How do you create REST API endpoints with Express?
- What is CORS and why is it necessary for React-API communication?
- How do you handle errors in Express routes?
- What are the benefits of separating frontend and backend into different servers?
- How do you connect a React app to an Express API?