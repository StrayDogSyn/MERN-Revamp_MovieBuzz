# Week 16 - Frontend-Backend Integration #

- [Week 16 - Frontend-Backend Integration](#week-16---frontend-backend-integration)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [Understanding Full-Stack Integration](#understanding-full-stack-integration)
  - [Setting Up the Connection](#setting-up-the-connection)
  - [Implementing READ in React](#implementing-read-in-react)
  - [Implementing CREATE in React](#implementing-create-in-react)
  - [Implementing UPDATE in React](#implementing-update-in-react)
  - [Implementing DELETE in React](#implementing-delete-in-react)
  - [Error Handling and Loading States](#error-handling-and-loading-states)
  - [Common Student Challenges](#common-student-challenges)
  - [Debugging Strategies](#debugging-strategies)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)
  - [Independent Practice](#independent-practice)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

This is the culmination week where students bring together everything they've learned. They have a complete backend API (Weeks 9-13) and React frontend components (Weeks 3-5). This week connects these two halves into a complete full-stack application. This is often the most exciting week for students as they see their complete application come to life.

**Critical Context:**
- Students may have forgotten some React concepts from earlier weeks
- The async nature of API calls can be confusing
- CORS issues are common and frustrating
- This is where everything "clicks" for many students

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
- Understand deployment considerations for full-stack applications

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
- `Fetch API`: Browser API for making HTTP requests
- `Promise`: JavaScript object representing eventual completion of async operation

---

## Starting Point ##

**Pre-class Verification Checklist:**

Backend Status:
- [ ] MongoDB running
- [ ] Express server starts without errors
- [ ] All CRUD endpoints tested with Postman
- [ ] CORS configured correctly

Frontend Status:
- [ ] React app runs without errors
- [ ] Components from Weeks 3-5 working
- [ ] Forms can capture input
- [ ] State management understood

**Common Setup Issues:**
- Port conflicts (3000 or 4000 already in use)
- MongoDB not running
- Missing npm packages
- Incorrect folder structure

---

## Understanding Full-Stack Integration ##

**Teaching Strategy**: Use visual diagrams to show data flow.

**Whiteboard Diagram:**
```
[React Frontend :3000]
        ↓↑ (HTTP/JSON)
[Express Backend :4000]
        ↓↑ (Mongoose)
[MongoDB Database :27017]
```

**Key Concepts to Emphasize:**

1. **Client-Server Architecture:**
   - Frontend is the "client"
   - Backend is the "server"
   - They communicate via HTTP

2. **Data Flow:**
   - User interacts with React
   - React sends request to Express
   - Express queries MongoDB
   - Response flows back up

3. **Separation of Concerns:**
   - Frontend: Presentation
   - Backend: Business logic
   - Database: Data persistence

**Live Demo**: Show network tab while performing CRUD operations.

---

## Setting Up the Connection ##

**Step-by-Step Setup:**

1. **Start Backend First:**
```bash
cd movie-buzz-backend
npm install
npm start
# Verify: "Server running on port 4000"
# Verify: "Connected to MongoDB"
```

2. **Start Frontend Second:**
```bash
cd movie-buzz-frontend
npm install
npm start
# Verify: "Compiled successfully!"
```

3. **Configure Proxy:**

Explain proxy concept with diagram:
```
Without Proxy:
React :3000 → ❌ → Express :4000 (CORS error)

With Proxy:
React :3000 → Proxy → Express :4000 ✅
```

In `package.json`:
```json
"proxy": "http://localhost:4000"
```

**Important:** Restart React after adding proxy!

4. **Create Service Layer:**

Explain service pattern:
- Centralizes API logic
- Makes components cleaner
- Easier to maintain

---

## Implementing READ in React ##

**Complete Implementation with Teaching Points:**

```javascript
// movieService.js
const API_BASE_URL = process.env.REACT_APP_API_URL || '/api';

const handleResponse = async (response) => {
  // Teaching point: Always check response.ok
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  return response.json();
};

export const movieService = {
  getAll: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies`);
      const data = await handleResponse(response);
      // Teaching point: Backend returns { success, data }
      return data.data || data;
    } catch (error) {
      console.error('Error fetching movies:', error);
      throw error;
    }
  },
  
  getById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/movies/${id}`);
      const data = await handleResponse(response);
      return data.data || data;
    } catch (error) {
      console.error('Error fetching movie:', error);
      throw error;
    }
  }
};
```

**In App.js:**
```javascript
useEffect(() => {
  fetchMovies();
}, []); // Teaching point: Empty array = run once on mount

const fetchMovies = async () => {
  try {
    setLoading(true);
    setError(null);
    const moviesData = await movieService.getAll();
    setMovies(moviesData);
  } catch (err) {
    setError(err.message);
    // Teaching point: Always handle errors!
  } finally {
    setLoading(false); // Always runs
  }
};
```

---

## Implementing CREATE in React ##

**Service Method:**
```javascript
create: async (movieData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Teaching point: Tell server we're sending JSON
      },
      body: JSON.stringify(movieData)
      // Teaching point: Convert JS object to JSON string
    });
    
    const data = await handleResponse(response);
    return data.data || data;
  } catch (error) {
    console.error('Error creating movie:', error);
    throw error;
  }
}
```

**Form Handling Pattern:**
```javascript
const handleAddMovie = async (movieData) => {
  try {
    setSubmitting(true);
    const newMovie = await movieService.create(movieData);
    
    // Option 1: Refetch all (simple but less efficient)
    await fetchMovies();
    
    // Option 2: Add to state (efficient but careful with sorting)
    // setMovies([...movies, newMovie]);
    
    setShowForm(false);
    setSuccessMessage('Movie added successfully!');
  } catch (err) {
    setError(err.message);
  } finally {
    setSubmitting(false);
  }
};
```

---

## Implementing UPDATE in React ##

**Service Method:**
```javascript
update: async (id, movieData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData)
    });
    
    const data = await handleResponse(response);
    return data.data || data;
  } catch (error) {
    console.error('Error updating movie:', error);
    throw error;
  }
}
```

**Edit Mode Pattern:**
```javascript
const [editingMovie, setEditingMovie] = useState(null);

const handleUpdateMovie = async (id, movieData) => {
  try {
    const updatedMovie = await movieService.update(id, movieData);
    
    // Update in state
    setMovies(movies.map(movie => 
      movie._id === id ? updatedMovie : movie
    ));
    
    setEditingMovie(null);
    setSuccessMessage('Movie updated successfully!');
  } catch (err) {
    setError(err.message);
  }
};
```

---

## Implementing DELETE in React ##

**Service Method:**
```javascript
delete: async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/movies/${id}`, {
      method: 'DELETE'
    });
    
    return await handleResponse(response);
  } catch (error) {
    console.error('Error deleting movie:', error);
    throw error;
  }
}
```

**Delete with Confirmation:**
```javascript
const [movieToDelete, setMovieToDelete] = useState(null);

const handleDeleteClick = (movie) => {
  setMovieToDelete(movie);
};

const handleDeleteConfirm = async () => {
  try {
    await movieService.delete(movieToDelete._id);
    
    // Remove from state
    setMovies(movies.filter(m => m._id !== movieToDelete._id));
    
    setMovieToDelete(null);
    setSuccessMessage('Movie deleted successfully!');
  } catch (err) {
    setError(err.message);
  }
};
```

---

## Integrating Advanced Search and Filter Features ##

**MAJOR ENHANCEMENT**: Students will now integrate the search/filter/sort functionality from Week 4 with live API data.

**Teaching Strategy**: Connect Week 4 learning to real-world API integration.

### Bringing Week 4 Features to Life ###

**Key Teaching Point**: The search/filter/sort features students built in Week 4 now work with real database data!

```javascript
// Enhanced App.js with Search, Filter, and Sort
import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import MovieForm from './components/MovieForm';
import SearchBar from './components/SearchBar';
import FilterControls from './components/FilterControls';
import movieService from './services/movieService';
import './App.css';

function App() {
  // Core state
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
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
      setError('Failed to load movies');
    } finally {
      setLoading(false);
    }
  };
  
  // Filter and sort movies (client-side with API data)
  const getFilteredMovies = () => {
    let filtered = [...movies];
    
    // Search across multiple fields
    if (searchTerm) {
      filtered = filtered.filter(movie => {
        const term = searchTerm.toLowerCase();
        const matchesTitle = movie.name.toLowerCase().includes(term);
        const matchesDirector = movie.director.toLowerCase().includes(term);
        const matchesStars = Array.isArray(movie.stars) && 
          movie.stars.some(star => star.toLowerCase().includes(term));
        
        return matchesTitle || matchesDirector || matchesStars;
      });
    }
    
    // Filter by genre (handle array field)
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie =>
        Array.isArray(movie.genre) && 
        movie.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }
    
    // Filter by rating
    if (selectedRating !== 'all') {
      filtered = filtered.filter(movie =>
        movie.rating === selectedRating
      );
    }
    
    // Sort movies
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'year':
          return b.year - a.year;
        case 'rating':
          return a.rating.localeCompare(b.rating);
        case 'genre':
          const genreA = a.genre && a.genre.length > 0 ? a.genre[0] : '';
          const genreB = b.genre && b.genre.length > 0 ? b.genre[0] : '';
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
      <header className="app-header">
        <h1>🎬 Movie Buzz</h1>
      </header>
      
      {/* Search Bar Component */}
      <SearchBar 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />
      
      {/* Filter Controls Component */}
      <FilterControls
        selectedGenre={selectedGenre}
        selectedRating={selectedRating}
        sortBy={sortBy}
        onGenreChange={setSelectedGenre}
        onRatingChange={setSelectedRating}
        onSortChange={setSortBy}
      />
      
      {/* Results Counter */}
      <div className="results-info">
        <p>
          Showing {filteredMovies.length} of {movies.length} movies
          {searchTerm && ` matching "${searchTerm}"`}
          {selectedGenre !== 'all' && ` in ${selectedGenre}`}
        </p>
      </div>
      
      {/* Movies Display */}
      {loading ? (
        <div className="loading">Loading movies...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : filteredMovies.length > 0 ? (
        <MoviesList 
          movies={filteredMovies}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ) : (
        <div className="no-results">
          <p>No movies found matching your criteria.</p>
          <button onClick={resetFilters}>Reset Filters</button>
        </div>
      )}
    </div>
  );
}
```

### SearchBar Component ###

```javascript
// components/SearchBar.js
import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies, directors, or actors..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
      />
      {searchTerm && (
        <button 
          className="clear-button"
          onClick={() => onSearchChange('')}
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
```

### FilterControls Component ###

```javascript
// components/FilterControls.js
import React from 'react';
import './FilterControls.css';

function FilterControls({
  selectedGenre,
  selectedRating,
  sortBy,
  onGenreChange,
  onRatingChange,
  onSortChange
}) {
  return (
    <div className="filter-controls">
      <select 
        value={selectedGenre}
        onChange={(e) => onGenreChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Genres</option>
        <option value="action">Action</option>
        <option value="comedy">Comedy</option>
        <option value="drama">Drama</option>
        <option value="sci-fi">Sci-Fi</option>
        <option value="crime">Crime</option>
      </select>
      
      <select
        value={selectedRating}
        onChange={(e) => onRatingChange(e.target.value)}
        className="filter-select"
      >
        <option value="all">All Ratings</option>
        <option value="G">G</option>
        <option value="PG">PG</option>
        <option value="PG-13">PG-13</option>
        <option value="R">R</option>
        <option value="Not Rated">Not Rated</option>
      </select>
      
      <select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="sort-select"
      >
        <option value="name">Sort by Name</option>
        <option value="year">Sort by Year</option>
        <option value="rating">Sort by Rating</option>
        <option value="genre">Sort by Genre</option>
      </select>
    </div>
  );
}

export default FilterControls;
```

### Key Teaching Points for Integration ###

**1. Array Field Handling:**
```javascript
// MongoDB stores genre and stars as arrays
// Always check if field is array before using array methods
const matchesGenre = Array.isArray(movie.genre) && 
  movie.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase());
```

**2. Client-Side vs Server-Side Filtering:**
- **Current Implementation**: Filter on client after fetching all movies
- **Future Enhancement**: Could add server-side filtering for large datasets
- **Trade-offs**: Client-side is simpler, server-side is more efficient

**3. Maintaining Week 4 Features:**
- All search/filter/sort functionality from Week 4 works with API data
- No features lost in transition to full-stack
- Enhanced with real-time API updates

**Common Integration Challenges:**
1. **Array fields from MongoDB**: Use Array.isArray() checks
2. **Case sensitivity**: Normalize with toLowerCase()
3. **Empty results**: Provide clear messaging and reset options
4. **Performance**: Consider debouncing search input

---

## Error Handling and Loading States ##

**Professional Error Handling Pattern:**

```javascript
// Custom hook for API calls
function useApi() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = async (apiCall) => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      return result;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading, error };
}

// Usage
const { execute, loading, error } = useApi();

const fetchMovies = () => {
  execute(movieService.getAll)
    .then(setMovies)
    .catch(console.error);
};
```

---

## Common Student Challenges ##

### Challenge 1: CORS Errors
**Symptom:** "Access to fetch at ... has been blocked by CORS policy"

**Solutions:**
1. Check backend CORS configuration
2. Verify proxy in package.json
3. Restart React dev server
4. Check API URL format

### Challenge 2: Network Errors
**Symptom:** "Failed to fetch" or "Network error"

**Checklist:**
- Is backend running?
- Is MongoDB running?
- Correct ports?
- Check console for errors

### Challenge 3: State Not Updating
**Symptom:** UI doesn't reflect changes

**Common Causes:**
- Not using spread operator
- Mutating state directly
- Async timing issues

### Challenge 4: Infinite Loops
**Symptom:** Continuous API calls

**Fix:** Check useEffect dependencies
```javascript
// Bad - infinite loop
useEffect(() => {
  fetchMovies();
}); // No dependency array

// Good
useEffect(() => {
  fetchMovies();
}, []); // Empty array
```

---

## Debugging Strategies ##

**1. Network Tab:**
- Show how to use Chrome DevTools Network tab
- Check request/response details
- Look for status codes

**2. Console Logging:**
```javascript
// Strategic logging points
console.log('1. Before fetch');
const response = await fetch(url);
console.log('2. Response:', response);
const data = await response.json();
console.log('3. Data:', data);
```

**3. React Developer Tools:**
- Inspect component state
- Track prop changes
- Find performance issues

**4. Backend Verification:**
- Test with Postman first
- Check server console
- Verify database directly

---

## Final Thoughts ##

**Major Achievement Celebration**: Students have built a complete full-stack application with advanced features!

**What They've Accomplished:**
- Complete MERN stack application with CRUD operations
- **Advanced search/filter/sort functionality from Week 4 integrated with API data**
- Professional error handling and loading states
- Modern async patterns with async/await
- Real-world architecture with separation of concerns
- **Client-side filtering of database results**
- **MongoDB array field handling (genre, stars)**

**Features Successfully Integrated:**
- **Search**: Real-time search across movie titles, directors, and actors
- **Filtering**: Genre and rating filters working with database data
- **Sorting**: Multiple sort options (name, year, rating, genre)
- **Results Counter**: Dynamic display of filtered results
- **Empty States**: Clear messaging when no results match filters

**Reinforce Key Concepts:**
- Separation of concerns (frontend/backend)
- Error handling importance
- User experience considerations with loading states
- Code organization and component reusability
- **Continuity**: Week 4 features enhanced, not replaced

**Career Relevance:**
"This is exactly how real companies build web applications! You've successfully integrated advanced UI features with a real database backend. Your Movie Buzz application now has professional-grade search and filtering capabilities that users expect in modern applications."

---

## Exit Ticket ##

Access code: peak71

1. What is the purpose of the proxy configuration in React's package.json?
   > Answer: It tells the development server to forward API requests to the backend server, avoiding CORS issues during development.

2. What HTTP method and endpoint would you use to update a movie with ID "123"?
   > Answer: PUT request to /api/movies/123

3. Why is it important to have loading states in your UI?
   > Answer: Loading states provide feedback to users that an operation is in progress, improving user experience and preventing confusion or multiple submissions.

4. What does async/await do in JavaScript?
   > Answer: It allows you to write asynchronous code that looks synchronous, making it easier to read and handle promises without callback chains.

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

1. **Enhance Existing Features:**
   - Add debouncing to search input for better performance
   - Implement pagination for large movie lists
   - Add more advanced filters (year range, length, multiple genres)
   - Create saved filter presets

2. **Improve Error Handling:**
   - Create custom error types for different scenarios
   - Add retry logic for failed API calls
   - Implement offline detection and caching
   - Add optimistic UI updates

3. **Add New Features:**
   - User movie ratings with persistence
   - Favorite movies list
   - Watch list functionality
   - Movie recommendations based on filters
   - Export filtered results to CSV/JSON

4. **Performance Optimization:**
   - Implement React.memo for movie components
   - Add lazy loading for movie posters
   - Cache API responses with service workers
   - Optimize re-renders with useCallback and useMemo

5. **Deployment Preparation:**
   - Set up production environment variables
   - Build optimized production bundle
   - Configure CI/CD pipeline
   - Test with production API
   - Add analytics tracking for search/filter usage