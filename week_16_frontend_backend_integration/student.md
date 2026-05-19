# Week 16 - Frontend-Backend Integration #

- [Week 16 - Frontend-Backend Integration](#week-16---frontend-backend-integration)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Simple Examples - Building Understanding](#simple-examples---building-understanding)
  - [Starting Point](#starting-point)
  - [Understanding Full-Stack Integration](#understanding-full-stack-integration)
  - [Setting Up the Connection](#setting-up-the-connection)
  - [Implementing READ in React](#implementing-read-in-react)
  - [Implementing CREATE in React](#implementing-create-in-react)
  - [Implementing UPDATE in React](#implementing-update-in-react)
  - [Implementing DELETE in React](#implementing-delete-in-react)
  - [Error Handling and Loading States](#error-handling-and-loading-states)
  - [Environment Variables](#environment-variables)
  - [Testing the Full Stack](#testing-the-full-stack)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)
  - [Independent Practice](#independent-practice)

---

## Notes About This Lesson Plan ##

Please review this lesson plan in advance of our RI session. If this plan doesn't align with where you and your classmates are at in the LMS, please send a ticket to Help Desk as soon as possible.

This code is for instructional purposes only. It should be utilized as an example in developing your own work. No part of it should be directly copied into your own project. As per TLM's plagiarism policy, submitting or misrepresenting code or an idea as your own when it was created by someone else constitutes plagiarism.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Connect a React frontend to an Express/MongoDB backend
- Implement all CRUD operations in a React application
- Handle asynchronous operations with proper loading states
- Manage errors gracefully in the UI
- Use environment variables for API configuration
- Build a complete full-stack movie management application
- Test integration between frontend and backend
- Deploy considerations for full-stack applications

---

## Glossary ##

- `Full-Stack`: Application with both frontend (client) and backend (server) components
- `API Integration`: Connecting frontend to backend through API endpoints
- `Async/Await`: Modern JavaScript syntax for handling asynchronous operations
- `Loading State`: UI indication that data is being fetched or processed
- `Error Boundary`: React component that catches JavaScript errors in child components
- `Environment Variables`: Configuration values that change between environments
- `CORS`: Cross-Origin Resource Sharing - allows frontend to communicate with backend
- `Proxy`: Development server configuration to avoid CORS issues

---

## Simple Examples - Building Understanding ##

Before diving into the full integration, let's explore some simple, focused examples to build our understanding of how frontend and backend communicate.

### Example 1: Fetch API Basics ###

Let's start with the most fundamental concept - making HTTP requests from React to a server:

```javascript
// Simple fetch example
const fetchExample = async () => {
  try {
    // Make a GET request
    const response = await fetch('http://localhost:4000/api/movies');

    // Check if request was successful
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Convert response to JSON
    const data = await response.json();

    console.log('Received data:', data);
    return data;
  } catch (error) {
    console.error('Fetch failed:', error);
    throw error;
  }
};

// Use in a React component
function SimpleExample() {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetchExample()
      .then(result => setData(result))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Fetch Example</h2>
      {data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
```

**Try It Out:** Create this simple component and watch the network tab in your browser to see the API call.

### Example 2: Async/Await with APIs ###

Let's build understanding of handling asynchronous operations properly:

```javascript
// Different ways to handle async operations
function AsyncExamples() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Method 1: Basic async/await
  const loadMoviesBasic = async () => {
    const response = await fetch('/api/movies');
    const data = await response.json();
    setMovies(data);
  };

  // Method 2: With error handling
  const loadMoviesWithErrors = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/movies');

      if (!response.ok) {
        throw new Error('Failed to load movies');
      }

      const data = await response.json();
      setMovies(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Method 3: With loading states
  const loadMoviesComplete = async () => {
    try {
      setLoading(true);
      setError(null);

      // Simulate thinking time
      await new Promise(resolve => setTimeout(resolve, 1000));

      const response = await fetch('/api/movies');

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const result = await response.json();

      // Check if we got data in expected format
      if (result.success && result.data) {
        setMovies(result.data);
      } else {
        throw new Error('Unexpected response format');
      }

    } catch (err) {
      console.error('Load movies failed:', err);
      setError(err.message);
      setMovies([]); // Clear any existing data
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Async Examples</h2>

      <button onClick={loadMoviesBasic}>
        Load Basic (no error handling)
      </button>

      <button onClick={loadMoviesWithErrors}>
        Load with Error Handling
      </button>

      <button onClick={loadMoviesComplete}>
        Load with Loading States
      </button>

      {loading && <p>Loading movies...</p>}
      {error && <p style={{color: 'red'}}>Error: {error}</p>}
      {movies.length > 0 && (
        <div>
          <h3>Movies ({movies.length}):</h3>
          <ul>
            {movies.map(movie => (
              <li key={movie._id || movie.id}>
                {movie.name} ({movie.year})
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
```

**Try It Out:** Test each button with your backend running and stopped to see different behaviors.

### Example 3: Error Handling in Frontend ###

Let's understand different types of errors and how to handle them:

```javascript
function ErrorHandlingExample() {
  const [status, setStatus] = useState('ready');
  const [message, setMessage] = useState('');

  const testApiCall = async (scenario) => {
    setStatus('loading');
    setMessage('');

    try {
      let response;

      switch (scenario) {
        case 'success':
          response = await fetch('/api/movies');
          break;
        case 'not-found':
          response = await fetch('/api/movies/invalid-id');
          break;
        case 'server-error':
          response = await fetch('/api/movies/cause-error');
          break;
        case 'network-error':
          response = await fetch('http://nonexistent-server.com/api/movies');
          break;
        case 'timeout':
          // Simulate timeout
          const controller = new AbortController();
          setTimeout(() => controller.abort(), 1000);
          response = await fetch('/api/movies', {
            signal: controller.signal
          });
          break;
        default:
          throw new Error('Unknown scenario');
      }

      // Handle HTTP errors
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(
          errorData.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const data = await response.json();
      setStatus('success');
      setMessage(`Success! Loaded ${data.length || 0} items`);

    } catch (error) {
      setStatus('error');

      // Different error types
      if (error.name === 'AbortError') {
        setMessage('Request timed out');
      } else if (error.message.includes('fetch')) {
        setMessage('Network error - is the server running?');
      } else {
        setMessage(`Error: ${error.message}`);
      }
    }
  };

  return (
    <div>
      <h2>Error Handling Examples</h2>

      <div>
        <button onClick={() => testApiCall('success')}>
          Test Success
        </button>
        <button onClick={() => testApiCall('not-found')}>
          Test 404 Error
        </button>
        <button onClick={() => testApiCall('server-error')}>
          Test Server Error
        </button>
        <button onClick={() => testApiCall('network-error')}>
          Test Network Error
        </button>
        <button onClick={() => testApiCall('timeout')}>
          Test Timeout
        </button>
      </div>

      <div style={{ marginTop: '20px' }}>
        <strong>Status:</strong> {status} <br />
        <strong>Message:</strong> {message}
      </div>
    </div>
  );
}
```

**Try It Out:** Test each scenario to see how different types of errors are handled.

### Example 4: Loading States ###

Let's create proper loading indicators for better user experience:

```javascript
// Loading component variations
function LoadingIndicator({ type = 'spinner' }) {
  switch (type) {
    case 'spinner':
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{
            border: '4px solid #f3f3f3',
            borderTop: '4px solid #3498db',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            animation: 'spin 2s linear infinite',
            margin: '0 auto'
          }}></div>
          <p>Loading...</p>
        </div>
      );
    case 'dots':
      return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <p>Loading<span style={{ animation: 'dots 1.5s infinite' }}>...</span></p>
        </div>
      );
    case 'skeleton':
      return (
        <div style={{ padding: '20px' }}>
          {[1, 2, 3].map(i => (
            <div key={i} style={{
              height: '20px',
              backgroundColor: '#f0f0f0',
              margin: '10px 0',
              borderRadius: '4px',
              animation: 'pulse 1.5s infinite'
            }}></div>
          ))}
        </div>
      );
    default:
      return <p>Loading...</p>;
  }
}

function LoadingStatesExample() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingType, setLoadingType] = useState('spinner');

  const loadWithDelay = async (delay = 2000) => {
    setLoading(true);
    setMovies([]);

    try {
      // Simulate slow network
      await new Promise(resolve => setTimeout(resolve, delay));

      const response = await fetch('/api/movies');
      const data = await response.json();
      setMovies(data.data || data);
    } catch (error) {
      console.error('Load failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Loading States Examples</h2>

      <div>
        <label>Loading Type: </label>
        <select
          value={loadingType}
          onChange={(e) => setLoadingType(e.target.value)}
        >
          <option value="spinner">Spinner</option>
          <option value="dots">Dots</option>
          <option value="skeleton">Skeleton</option>
        </select>
      </div>

      <button onClick={() => loadWithDelay(1000)}>
        Load Movies (1s delay)
      </button>
      <button onClick={() => loadWithDelay(3000)}>
        Load Movies (3s delay)
      </button>

      <div style={{ border: '1px solid #ccc', minHeight: '200px', marginTop: '20px' }}>
        {loading ? (
          <LoadingIndicator type={loadingType} />
        ) : (
          <div>
            {movies.length > 0 ? (
              <ul>
                {movies.map(movie => (
                  <li key={movie._id || movie.id}>
                    {movie.name} ({movie.year})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No movies loaded</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
```

**Try It Out:** Test different loading indicators and delays to see the user experience impact.

These examples build the foundation for understanding how React frontends communicate with APIs before we implement the full integration!

---

## Starting Point ##

Before we begin this lesson, ensure you have:

**Backend (from Weeks 9-13):**
- Complete Express API with all CRUD endpoints
- MongoDB database with Mongoose models
- CORS configured for frontend access
- All endpoints tested and working

**Frontend (from Weeks 3-5):**
- React application with components
- State management with hooks
- Forms for movie input
- Basic styling in place

**Your API should support:**
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie
- `POST /api/movies` - Create movie
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

---

## Understanding Full-Stack Integration ##

Full-stack integration connects your React frontend to your Express backend, creating a complete application where:

1. **Frontend (React)** handles:
   - User interface
   - User interactions
   - Display logic
   - Form validation

2. **Backend (Express/MongoDB)** handles:
   - Data persistence
   - Business logic
   - Authentication (future)
   - API responses

3. **Communication happens through:**
   - HTTP requests (GET, POST, PUT, DELETE)
   - JSON data format
   - Async JavaScript operations

**Key Principles:**
- Separation of concerns
- Single source of truth (database)
- Stateless communication
- Error handling at both layers

> `Consider This`  
> Why is it important to separate frontend and backend code into different applications?

---

## Setting Up the Connection ##

First, let's configure our React app to communicate with the backend.

**Step 1: Start Both Servers**

In one terminal (backend):
```bash
cd movie-buzz-backend
npm install
npm start
# Server running on http://localhost:4000
```

In another terminal (frontend):
```bash
cd movie-buzz-frontend
npm install
npm start
# React running on http://localhost:3000
```

**Step 2: Configure Proxy (Development)**

In your React `package.json`, add:
```json
"proxy": "http://localhost:4000"
```

This tells the development server to proxy API requests to your backend.

**Step 3: Create API Service**

Create `src/services/movieService.js`:
```javascript
// Base URL for API - will use environment variable in production
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

// Helper function for handling responses
const handleResponse = async (response) => {
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const movieService = {
  // TODO: Implement getAll function to fetch all movies
  // TODO: Implement getById function to fetch single movie
  // TODO: Implement create function to add new movie
  // TODO: Implement update function to update existing movie
  // TODO: Implement delete function to remove movie
};
```

---

## Implementing READ in React ##

Let's start by fetching and displaying movies from our API.

**Step 1: Implement getAll in movieService.js**

Find the TODO for getAll and implement:
```javascript
getAll: async () => {
  // TODO: Implement fetch request to GET /api/movies
  // TODO: Use handleResponse helper
  // TODO: Return the data
},
```

**Step 2: Update App.js to Fetch Movies**

In your `App.js`, add:
```javascript
import { movieService } from './services/movieService';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies on component mount
  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      // TODO: Call movieService.getAll()
      // TODO: Set movies with response data
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Render loading, error, or movies
  if (loading) return <div className="loading">Loading movies...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="App">
      <h1>🎬 Movie Buzz</h1>
      <MoviesList movies={movies} />
    </div>
  );
}
```

---

## Implementing CREATE in React ##

Now let's add the ability to create new movies.

**Step 1: Implement create in movieService.js**

```javascript
create: async (movieData) => {
  // TODO: Implement POST request to /api/movies
  // TODO: Set Content-Type header to application/json
  // TODO: Send movieData in body as JSON
  // TODO: Use handleResponse helper
},
```

**Step 2: Update MovieForm Component**

```javascript
const handleSubmit = async (e) => {
  e.preventDefault();
  
  try {
    setSubmitting(true);
    // TODO: Call movieService.create with form data
    // TODO: On success, call onSuccess callback
    // TODO: Reset form
  } catch (err) {
    setError(err.message);
  } finally {
    setSubmitting(false);
  }
};
```

**Step 3: Connect Form to App**

```javascript
const handleAddMovie = async (movieData) => {
  try {
    // TODO: Call movieService.create
    // TODO: Refresh movie list
    // TODO: Show success message
    // TODO: Close form
  } catch (err) {
    setError(err.message);
  }
};
```

---

## Implementing UPDATE in React ##

Let's add edit functionality to our movies.

**Step 1: Implement update in movieService.js**

```javascript
update: async (id, movieData) => {
  // TODO: Implement PUT request to /api/movies/:id
  // TODO: Send updated data in body
  // TODO: Use handleResponse helper
},
```

**Step 2: Add Edit Mode to MovieBlock**

```javascript
function MovieBlock({ movie, onEdit, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    // TODO: Set editing mode
    // TODO: Call onEdit with movie data
  };

  return (
    <div className="movie-block">
      {/* Movie display */}
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}
```

**Step 3: Handle Update in App**

```javascript
const handleUpdateMovie = async (id, movieData) => {
  try {
    // TODO: Call movieService.update
    // TODO: Update movie in state
    // TODO: Show success message
  } catch (err) {
    setError(err.message);
  }
};
```

---

## Implementing DELETE in React ##

Finally, let's add delete functionality.

**Step 1: Implement delete in movieService.js**

```javascript
delete: async (id) => {
  // TODO: Implement DELETE request to /api/movies/:id
  // TODO: Use handleResponse helper
},
```

**Step 2: Add Delete Confirmation**

```javascript
function DeleteConfirmation({ movie, onConfirm, onCancel }) {
  return (
    <div className="modal">
      <div className="modal-content">
        <h3>Delete Movie?</h3>
        <p>Are you sure you want to delete "{movie.name}"?</p>
        <button onClick={() => onConfirm(movie._id)}>Yes, Delete</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}
```

**Step 3: Handle Delete in App**

```javascript
const handleDeleteMovie = async (id) => {
  try {
    // TODO: Call movieService.delete
    // TODO: Remove movie from state
    // TODO: Show success message
  } catch (err) {
    setError(err.message);
  }
};
```

---

## Optional: Integrating Search and Filter Features ##

**Note**: This section describes an **optional advanced feature**. If you haven't implemented the optional advanced search feature, you can skip this section. Your Movie Buzz application is complete without it!

If you've completed the **week_optional_search_feature** module, now is the perfect time to integrate it with your live API data!

### Enhanced App with Search/Filter/Sort (Optional) ###

```javascript
// App.js - Complete integration with Supplemental Search Feature
import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import SearchBar from './components/SearchBar';  // From supplemental module
import FilterControls from './components/FilterControls';  // From supplemental module
import movieService from './services/movieService';

function App() {
  // Core state
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search and filter state (from Week 4)
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  
  // Load movies from API
  useEffect(() => {
    fetchMovies();
  }, []);
  
  const fetchMovies = async () => {
    try {
      setLoading(true);
      const data = await movieService.getAll();
      setMovies(data);
    } catch (err) {
      console.error('Failed to load movies:', err);
    } finally {
      setLoading(false);
    }
  };
  
  // Filter and sort movies
  const getFilteredMovies = () => {
    let filtered = [...movies];
    
    // Search (handle array fields like stars)
    if (searchTerm) {
      filtered = filtered.filter(movie => {
        const term = searchTerm.toLowerCase();
        return (
          movie.name.toLowerCase().includes(term) ||
          movie.director.toLowerCase().includes(term) ||
          (Array.isArray(movie.stars) && 
           movie.stars.some(star => star.toLowerCase().includes(term)))
        );
      });
    }
    
    // Filter by genre (MongoDB returns arrays)
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie =>
        Array.isArray(movie.genre) && 
        movie.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }
    
    // Filter by rating
    if (selectedRating !== 'all') {
      filtered = filtered.filter(movie => movie.rating === selectedRating);
    }
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'year':
          return b.year - a.year;
        case 'rating':
          return a.rating.localeCompare(b.rating);
        case 'genre':
          const genreA = a.genre?.[0] || '';
          const genreB = b.genre?.[0] || '';
          return genreA.localeCompare(genreB);
        default:
          return 0;
      }
    });
    
    return filtered;
  };
  
  const filteredMovies = getFilteredMovies();
  
  return (
    <div className="app">
      <h1>🎬 Movie Buzz</h1>
      
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      <FilterControls
        selectedGenre={selectedGenre}
        selectedRating={selectedRating}
        sortBy={sortBy}
        onGenreChange={setSelectedGenre}
        onRatingChange={setSelectedRating}
        onSortChange={setSortBy}
      />
      
      <div className="results-info">
        Showing {filteredMovies.length} of {movies.length} movies
      </div>
      
      {loading ? (
        <div>Loading...</div>
      ) : (
        <MoviesList movies={filteredMovies} />
      )}
    </div>
  );
}
```

### Key Points for Array Fields (Optional Feature) ###

**Note**: This applies if you're using the supplemental search feature.

MongoDB stores `genre` and `stars` as arrays. Always check before using array methods:

```javascript
// Safe array handling
const matchesGenre = Array.isArray(movie.genre) &&
  movie.genre.some(g => g === selectedGenre);

// Display arrays properly
<p>Genres: {movie.genre?.join(', ') || 'None'}</p>
<p>Stars: {movie.stars?.join(', ') || 'None'}</p>
```

For complete implementation details, see the **week_optional_search_feature** module.

---

## Error Handling and Loading States ##

Professional applications need proper error handling and loading indicators.

**Loading Component:**
```javascript
function LoadingSpinner() {
  return (
    <div className="spinner-container">
      <div className="spinner"></div>
      <p>Loading...</p>
    </div>
  );
}
```

**Error Display Component:**
```javascript
function ErrorMessage({ error, onRetry }) {
  return (
    <div className="error-container">
      <h3>⚠️ Something went wrong</h3>
      <p>{error}</p>
      <button onClick={onRetry}>Try Again</button>
    </div>
  );
}
```

**Success Notification:**
```javascript
function SuccessMessage({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="success-message">
      ✅ {message}
    </div>
  );
}
```

---

## Environment Variables ##

Use environment variables to manage different configurations.

**Create `.env` file in React root:**
```
REACT_APP_API_URL=http://localhost:4000/api
```

**Access in code:**
```javascript
const API_URL = process.env.REACT_APP_API_URL || '/api';
```

**Important:** 
- Never commit `.env` files
- Add `.env` to `.gitignore`
- Document required variables in README

---

## Testing the Full Stack ##

Test your complete application:

**1. Test READ Operations:**
- Load the app, movies should display
- Check network tab for API calls
- Verify error handling with stopped backend

**2. Test CREATE:**
- Add a new movie
- Verify it appears in the list
- Check database directly

**3. Test UPDATE:**
- Edit an existing movie
- Verify changes persist on refresh
- Test validation errors

**4. Test DELETE:**
- Delete a movie
- Confirm it's removed from UI
- Verify deletion in database

**5. Test Error Scenarios:**
- Stop backend, try operations
- Send invalid data
- Test network failures

---

## Final Thoughts ##

Congratulations! You've built a complete full-stack MERN application!

**What you've accomplished:**
- ✅ Connected React frontend to Express backend
- ✅ Implemented all CRUD operations (Create, Read, Update, Delete)
- ✅ Added proper error handling and loading states
- ✅ Created loading states for better UX
- ✅ Built a professional movie management system
- ✅ **Optional**: Integrated advanced search/filter/sort with real API data

**Core Features Implemented:**
- Full CRUD functionality for movies
- Real-time data synchronization with backend
- Professional error handling and user feedback
- Loading indicators for async operations
- Mobile-responsive design

**Optional Features (if completed supplemental module):**
- Real-time search across titles, directors, and actors
- Genre and rating filtering
- Multiple sorting options
- Results counter showing filtered results
- Professional empty state handling

**Key Takeaways:**
- Separation of concerns keeps code maintainable
- Proper error handling is crucial
- Loading states improve user experience
- Environment variables enable deployment flexibility

**Next Steps:**
- Add authentication (user login/signup)
- Implement the **week_optional_search_feature** module (if not done yet)
- Add pagination for large datasets
- Deploy to production
- Explore the **week_optional_testing_suite** module

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Review ##

- How do you connect a React frontend to an Express backend?
- What is the purpose of CORS in full-stack applications?
- How do you handle asynchronous operations in React?
- What are loading states and why are they important?
- How do you handle errors from API calls?
- What are environment variables used for?
- How do you test full-stack applications?
- What is the difference between development and production configurations?

---

## Independent Practice ##

1. **Enhance the UI:**
   - Complete the **week_optional_search_feature** module
   - Implement sorting options
   - Add pagination

2. **Improve Error Handling:**
   - Create custom error types
   - Add retry logic
   - Implement offline detection

3. **Add Features:**
   - Movie ratings
   - Favorite movies
   - Watch list functionality

4. **Performance Optimization:**
   - Implement caching
   - Add debouncing to forms
   - Optimize re-renders

5. **Deployment Preparation:**
   - Set up production environment variables
   - Build optimized production bundle
   - Test with production API