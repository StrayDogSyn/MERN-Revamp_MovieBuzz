# Week 9 - Express & CORS #

- [Week 9 - Express & CORS](#week-9---express--cors)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [What is Express?](#what-is-express)
  - [Setting Up Express](#setting-up-express)
  - [Creating API Routes](#creating-api-routes)
  - [Understanding CORS](#understanding-cors)
  - [Building Movie Buzz API](#building-movie-buzz-api)
    - [Creating Controllers](#creating-controllers)
    - [Setting Up Routes](#setting-up-routes)
    - [Adding Middleware](#adding-middleware)
  - [Testing API Endpoints](#testing-api-endpoints)
  - [Connecting React Frontend](#connecting-react-frontend)
  - [Error Handling](#error-handling)
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

Before we begin this lesson, make sure you've completed Week 8 and understand:
- Node.js modules and file operations
- HTTP protocol and request/response concepts
- Basic HTTP server creation with the `http` module

Navigate to the `week_09_express_and_cors/movie-buzz-api` directory. This builds on your Week 8 Node.js and HTTP knowledge by adding the Express framework.

```bash
cd week_09_express_and_cors/movie-buzz-api
npm install
node server.js
```

You should see the movie data loading from our JSON file. We'll be converting this basic Node.js application into a full Express API server with REST endpoints that your React frontend can consume!

---

## Simple Examples - Building Understanding

Before building the Movie Buzz API, let's understand Express with simple examples:

### Example 1: Your First Express Server

Create `basic-express.js`:

```javascript
// Import Express
const express = require('express');

// Create an Express application
const app = express();

// Define a simple route
app.get('/', (req, res) => {
  res.send('<h1>Hello from Express!</h1>');
});

// Define another route
app.get('/about', (req, res) => {
  res.send('<h1>About Page</h1><p>This is an Express server</p>');
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Express server running at http://localhost:${PORT}`);
});
```

Run it:
```bash
node basic-express.js
```

### Example 2: Handling Different HTTP Methods

Create `methods-example.js`:

```javascript
const express = require('express');
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample data
let users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Jane' }
];

// GET - Read all users
app.get('/users', (req, res) => {
  res.json(users);
});

// GET - Read single user
app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  res.json(user);
});

// POST - Create new user
app.post('/users', (req, res) => {
  const newUser = {
    id: users.length + 1,
    name: req.body.name
  };

  users.push(newUser);
  res.status(201).json(newUser);
});

// PUT - Update user
app.put('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);

  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }

  user.name = req.body.name;
  res.json(user);
});

// DELETE - Remove user
app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex(u => u.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'User not found' });
  }

  users.splice(index, 1);
  res.json({ message: 'User deleted' });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

### Example 3: Using Middleware

Create `middleware-example.js`:

```javascript
const express = require('express');
const app = express();

// Built-in middleware for JSON parsing
app.use(express.json());

// Custom middleware - Logger
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next(); // Call next() to continue to the next middleware/route
});

// Custom middleware - Authentication simulation
function authenticate(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Simulate token validation
  if (token === 'Bearer valid-token') {
    next(); // Token is valid, continue
  } else {
    res.status(401).json({ error: 'Invalid token' });
  }
}

// Public route (no authentication)
app.get('/public', (req, res) => {
  res.json({ message: 'This is a public endpoint' });
});

// Protected route (requires authentication)
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected endpoint', secret: 'Only authenticated users see this' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(3000, () => {
  console.log('Server with middleware running on port 3000');
});
```

Test with:
```bash
# Public endpoint
curl http://localhost:3000/public

# Protected endpoint (should fail)
curl http://localhost:3000/protected

# Protected endpoint (should succeed)
curl -H "Authorization: Bearer valid-token" http://localhost:3000/protected
```

> `Try It Out`
> Create and test these Express examples to understand:
> - How Express simplifies routing vs raw Node.js HTTP
> - Different HTTP methods (GET, POST, PUT, DELETE)
> - Route parameters (:id)
> - Middleware for request processing
> - JSON parsing and error handling

## What is Express? ##

Now that you've experienced Express firsthand, let's understand why it's so powerful. Remember the HTTP server you built in Week 8 with Node.js's built-in `http` module? While it worked, you probably noticed how verbose and repetitive the code became. Express.js is a web application framework that builds on Node.js HTTP concepts to make server development much more elegant and productive.

**Express simplifies HTTP server development by providing:**

- **Simplified Routing**: Instead of `if/else` statements for URLs, use clean route definitions
- **Middleware**: Reusable functions that process requests and responses
- **Built-in JSON handling**: No more manual `JSON.parse()` and `JSON.stringify()`
- **Static file serving**: Serve CSS, JavaScript, images with one line
- **Better error handling**: Centralized error management

**Compare what you built in Week 8 vs Express:**

```javascript
// Week 8's HTTP server
if (request.url === '/movies' && request.method === 'GET') {
  response.writeHead(200, { 'Content-Type': 'application/json' });
  response.end(JSON.stringify(movies));
} else if (request.url === '/movies' && request.method === 'POST') {
  // Handle POST...
}

// This week's Express server
app.get('/movies', (req, res) => {
  res.json(movies);
});

app.post('/movies', (req, res) => {
  // Handle POST...
});
```

Express is the "E" in MEAN and MERN stack, making it an essential part of full-stack JavaScript development.

> `Consider This`
> Based on your HTTP server experience from Week 8, what specific problems do you think Express solves?

---

## Setting Up Express ##

First, let's install Express and other necessary packages:

```bash
npm install express cors
npm install --save-dev nodemon
```

Update your `package.json` scripts to include development server with auto-restart:

```json
{
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
}
```

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

Test your server:

```bash
npm run dev
```

Visit `http://localhost:4000` in your browser to see the API documentation.

---

## Creating API Routes ##

Let's create proper REST API routes for our Movie operations. First, create a controllers directory:

```bash
mkdir controllers
touch controllers/movieController.js
```

Create the movie controller in `controllers/movieController.js`:

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

---

## Understanding CORS ##

CORS (Cross-Origin Resource Sharing) is a security feature implemented by web browsers that restricts web pages from making requests to a different domain, protocol, or port than the one serving the web page.

**The Problem**: Your React app runs on `http://localhost:3000` but your API runs on `http://localhost:4000`. Without CORS, browsers will block these requests.

**The Solution**: Configure your Express server to allow cross-origin requests:

```javascript
// Basic CORS (allows all origins)
app.use(cors());

// Configured CORS (more secure for production)
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true,
  optionsSuccessStatus: 200
}));
```

For development, we'll use the basic configuration, but in production, you should specify exact origins.

---

## Building Movie Buzz API ##

Your complete API structure should now support:

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

All endpoints return JSON with consistent structure:
```json
{
  "success": true,
  "data": { ... }
}
```

Or for errors:
```json
{
  "success": false,
  "error": "Error message"
}
```

---

## Testing API Endpoints ##

You can test your API endpoints using various methods:

### Using Browser (GET requests only) ###

- `http://localhost:4000/api/movies` - Get all movies
- `http://localhost:4000/api/movies/1` - Get movie with ID 1

### Using curl (command line) ###

```bash
# Get all movies
curl http://localhost:4000/api/movies

# Get movie by ID
curl http://localhost:4000/api/movies/1

# Create new movie
curl -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{"name":"New Movie","year":2024,"director":"Test Director","rating":"PG","length":"120 minutes","description":"A test movie","genre":["Drama"],"stars":["Actor One","Actor Two"]}'

# Update movie
curl -X PUT http://localhost:4000/api/movies/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated Movie Title"}'

# Delete movie
curl -X DELETE http://localhost:4000/api/movies/1
```

### Using JavaScript fetch() ###

```javascript
// Test in browser console
fetch('http://localhost:4000/api/movies')
  .then(response => response.json())
  .then(data => console.log(data));
```

---

## Connecting React Frontend ##

Now let's update your React frontend to use the new API. Update your React `App.js`:

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

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredMovies(filtered);
    }
  };

  const handleShowForm = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingMovie(null);
    setShowForm(false);
  };

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
      <header>
        <div id="title">
          <div id="title-text">
            <h1>🎬 Movie Buzz</h1>
            <h4>Where all the best movies live...</h4>
          </div>
        </div>
        <div id="add-new">
          <button onClick={handleShowForm}>Add New Movie</button>
        </div>
      </header>
      
      {showForm ? (
        <MovieForm 
          onAddMovie={handleAddMovie}
          onUpdateMovie={handleUpdateMovie}
          onCancel={handleCancelForm}
          editingMovie={editingMovie}
        />
      ) : (
        <>
          <SearchBar onSearch={handleSearch} />
          <MoviesList 
            movies={filteredMovies}
            onDelete={handleDeleteMovie}
            onEdit={handleEditMovie}
          />
        </>
      )}
      
      <footer>&copy; Copyright 2024 Buzzware, Inc.</footer>
    </div>
  );
}

export default App;
```

---

## Error Handling ##

Good APIs handle errors gracefully. We've implemented:

1. **Try-catch blocks** in all controller functions
2. **HTTP status codes** (200, 201, 400, 404, 500)
3. **Consistent error response format**
4. **Input validation** for required fields
5. **404 handler** for unknown routes

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

---

## Final Thoughts ##

We've successfully built a complete REST API for our Movie Buzz application using Express and connected it to our React frontend! Our application now features:

- Full CRUD operations via HTTP endpoints
- CORS configuration for React-API communication
- Proper error handling and status codes
- Modular, organized code structure
- Real-time data synchronization between frontend and backend

This represents a major milestone: you now have a full-stack MERN application (missing only the MongoDB, which we'll add soon)!

> `Consider This`  
> How does having a separate API backend change the architecture of your application? What new possibilities does this enable?

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Review ##

- What is Express.js and what problems does it solve?
- How do you create REST API endpoints with Express?
- What is CORS and why is it necessary for React-API communication?
- How do you handle errors in Express routes?
- What are the benefits of separating frontend and backend into different servers?
- How do you connect a React app to an Express API?