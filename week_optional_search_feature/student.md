# Student Guide: Advanced Search, Filter, and Sort Feature

## Introduction

This guide will walk you through implementing an advanced search, filter, and sort feature for your Movie Buzz application. This is an **optional enhancement** that adds professional-level functionality to your project.

---

## Learning Objectives

By completing this module, you will:

- Build a real-time search feature that works across multiple fields
- Implement filter controls for categorical data (genre, rating)
- Create sort functionality for different data types
- Properly handle MongoDB array fields in JavaScript
- Manage complex UI state with React hooks
- Apply defensive programming for array operations

---

## Prerequisites

✅ Completed Week 4 (React State and Hooks)

✅ Completed Week 5 (React Events and Form Handling)

✅ Understanding of array methods (.filter, .some, .map, .sort)

✅ Familiarity with controlled components in React

---

## Overview of Features

### 1. Search Bar

Users can type to search across:

- Movie name
- Director name
- Actor names (in the stars array)

### 2. Filter Controls

Users can filter by:

- Genre (Action, Comedy, Drama, etc.)
- Rating (G, PG, PG-13, R, etc.)

### 3. Sort Options

Users can sort by:

- Name (A-Z)
- Year (Newest first)
- Rating
- Genre (alphabetically by first genre)

---

## Implementation Steps

### Step 1: Set Up State Variables

First, add state to manage search, filter, and sort options in your `App.js`:

```javascript
import React, { useState } from 'react';

function App() {
  // Your existing movie state
  const [movies, setMovies] = useState([]);

  // TODO: Add state for search term
  const [searchTerm, setSearchTerm] = useState('');

  // TODO: Add state for selected genre filter
  const [selectedGenre, setSelectedGenre] = useState('all');

  // TODO: Add state for selected rating filter
  const [selectedRating, setSelectedRating] = useState('all');

  // TODO: Add state for sort option
  const [sortBy, setSortBy] = useState('name');

  // ... rest of your component
}
```

---

### Step 2: Create the SearchBar Component

Create a new file `src/components/SearchBar.js`:

```javascript
import React from 'react';
import './SearchBar.css';

function SearchBar({ searchTerm, onSearchChange }) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies, directors, or actors..."
        value={searchTerm}
        onChange={(e) => {
          // TODO: Call onSearchChange with the new value
        }}
        className="search-input"
      />
      {searchTerm && (
        <button
          onClick={() => {
            // TODO: Clear the search by calling onSearchChange with empty string
          }}
          className="clear-button"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
```

**Your Tasks:**

1. Complete the onChange handler
2. Complete the clear button onClick handler
3. Test that typing updates the search term

---

### Step 3: Create the FilterControls Component

Create a new file `src/components/FilterControls.js`:

```javascript
import React from 'react';

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
      <div className="filter-group">
        <label htmlFor="genre-filter">Genre:</label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => {
            // TODO: Call onGenreChange with new value
          }}
        >
          <option value="all">All Genres</option>
          <option value="action">Action</option>
          <option value="comedy">Comedy</option>
          <option value="drama">Drama</option>
          <option value="sci-fi">Sci-Fi</option>
          <option value="thriller">Thriller</option>
          <option value="horror">Horror</option>
          <option value="romance">Romance</option>
          <option value="animation">Animation</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="rating-filter">Rating:</label>
        <select
          id="rating-filter"
          value={selectedRating}
          onChange={(e) => {
            // TODO: Call onRatingChange with new value
          }}
        >
          <option value="all">All Ratings</option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
          <option value="NC-17">NC-17</option>
          <option value="NR">Not Rated</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="sort-by">Sort By:</label>
        <select
          id="sort-by"
          value={sortBy}
          onChange={(e) => {
            // TODO: Call onSortChange with new value
          }}
        >
          <option value="name">Name (A-Z)</option>
          <option value="year">Year (Newest)</option>
          <option value="rating">Rating</option>
          <option value="genre">Genre</option>
        </select>
      </div>
    </div>
  );
}

export default FilterControls;
```

**Your Tasks:**

1. Complete all three onChange handlers
2. Import this component in your App.js

---

### Step 4: Implement the Filter Logic

In your `App.js`, create a function that applies search, filter, and sort:

```javascript
function App() {
  // ... your state variables ...

  const getFilteredMovies = () => {
    // Start with a copy of all movies
    let filtered = [...movies];

    // STEP 1: Apply Search Filter
    if (searchTerm) {
      filtered = filtered.filter(movie => {
        const term = searchTerm.toLowerCase();

        // TODO: Check if name matches
        const nameMatches = /* your code here */;

        // TODO: Check if director matches
        const directorMatches = /* your code here */;

        // TODO: Check if any star name matches (ARRAY FIELD!)
        // HINT: Use Array.isArray() and .some()
        const starsMatch = /* your code here */;

        // Return true if ANY field matches
        return nameMatches || directorMatches || starsMatch;
      });
    }

    // STEP 2: Apply Genre Filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie => {
        // TODO: Check if movie's genre array includes the selected genre
        // HINT: Use Array.isArray() and .some()
        // HINT: Remember genre is an array like ["Action", "Sci-Fi"]
      });
    }

    // STEP 3: Apply Rating Filter
    if (selectedRating !== 'all') {
      filtered = filtered.filter(movie => {
        // TODO: Check if movie's rating matches selectedRating
      });
    }

    // STEP 4: Apply Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          // TODO: Sort alphabetically by name
          // HINT: Use localeCompare()
          return /* your code */;

        case 'year':
          // TODO: Sort by year (newest first)
          // HINT: b.year - a.year gives newest first
          return /* your code */;

        case 'rating':
          // TODO: Sort alphabetically by rating
          return /* your code */;

        case 'genre':
          // TODO: Sort by first genre in array
          // HINT: Use movie.genre?.[0] || '' to safely get first genre
          const genreA = /* your code */;
          const genreB = /* your code */;
          return genreA.localeCompare(genreB);

        default:
          return 0;
      }
    });

    return filtered;
  };

  // Use this instead of displaying raw movies
  const filteredMovies = getFilteredMovies();

  return (
    <div className="App">
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

      <MoviesList movies={filteredMovies} />
    </div>
  );
}
```

---

### Step 5: Handle Array Fields Safely

⚠️ **CRITICAL**: MongoDB stores `genre` and `stars` as arrays. Always check before using array methods!

```javascript
// ❌ WRONG: Will crash if stars is undefined or not an array
movie.stars.some(star => star.includes(searchTerm))

// ✅ CORRECT: Safe with defensive check
Array.isArray(movie.stars) && movie.stars.some(star =>
  star.toLowerCase().includes(searchTerm.toLowerCase())
)
```

**Complete Search Implementation Example:**

```javascript
const starsMatch =
  Array.isArray(movie.stars) &&
  movie.stars.some(star =>
    star.toLowerCase().includes(term)
  );
```

**Complete Genre Filter Example:**

```javascript
const matchesGenre =
  Array.isArray(movie.genre) &&
  movie.genre.some(g =>
    g.toLowerCase() === selectedGenre.toLowerCase()
  );
```

---

### Step 6: Add Styling

Create `src/components/SearchBar.css`:

```css
/* TODO: Add your CSS styles here */
.search-bar {
  position: relative;
  margin: 20px auto;
  max-width: 600px;
}

.search-input {
  width: 100%;
  padding: 12px 40px 12px 15px;
  font-size: 16px;
  border: 2px solid #ddd;
  border-radius: 8px;
}

.search-input:focus {
  outline: none;
  border-color: rgb(194, 143, 41);
}

.clear-button {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #999;
}

.clear-button:hover {
  color: #333;
}

.filter-controls {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin: 20px 0;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  align-items: center;
  gap: 8px;
}

.filter-group label {
  font-weight: bold;
  color: #333;
}

.filter-group select {
  padding: 8px 12px;
  border: 2px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
}

.results-info {
  text-align: center;
  margin: 15px 0;
  color: #666;
  font-size: 14px;
}

/* Mobile responsive */
@media (max-width: 500px) {
  .filter-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .filter-group {
    flex-direction: column;
    align-items: flex-start;
  }

  .filter-group select {
    width: 100%;
  }
}
```

---

## Testing Your Implementation

### Test Checklist

- [ ] **Search by movie name**: Type "Matrix" and see results
- [ ] **Search by director**: Type "Nolan" and see Christopher Nolan movies
- [ ] **Search by actor**: Type "Keanu" and see movies with Keanu Reeves
- [ ] **Filter by genre**: Select "Action" and see only action movies
- [ ] **Filter by rating**: Select "PG-13" and see only PG-13 movies
- [ ] **Combine search + filter**: Search "action" and filter by "PG-13"
- [ ] **Sort by name**: Should be alphabetical A-Z
- [ ] **Sort by year**: Should show newest first
- [ ] **Clear search**: Click X button to clear search
- [ ] **Empty results**: Search for nonsense, show "No movies found"
- [ ] **Mobile responsive**: Test on narrow screen

### Test Data Scenarios

Test with movies that have:

- Multiple genres: `["Action", "Sci-Fi", "Thriller"]`
- Multiple stars: `["Actor One", "Actor Two", "Actor Three"]`
- Edge cases: Empty arrays, single-item arrays

---

## Common Issues and Solutions

### Issue 1: "Cannot read property 'toLowerCase' of undefined"

**Cause**: Trying to call methods on undefined values
**Solution**: Add defensive checks

```javascript
movie.name?.toLowerCase() // Safe with optional chaining
// OR
movie.name && movie.name.toLowerCase()
```

### Issue 2: "TypeError: movie.stars.some is not a function"

**Cause**: stars is not an array (might be undefined or string)
**Solution**: Always use Array.isArray()

```javascript
Array.isArray(movie.stars) && movie.stars.some(...)
```

### Issue 3: Movies not filtering correctly

**Cause**: Case sensitivity issues
**Solution**: Always use .toLowerCase() on both sides

```javascript
genre.toLowerCase() === selectedGenre.toLowerCase()
```

### Issue 4: Sort mutating original array

**Cause**: .sort() modifies the original array
**Solution**: Create a copy first

```javascript
let filtered = [...movies]; // Copy first!
filtered.sort(...);
```

---

## Integration with Live API (After Week 16)

If you've completed Week 16, integrate with your API:

```javascript
import { movieService } from './services/movieService';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    movieService.getAll()
      .then(data => {
        setMovies(data.data || data); // Handle different response formats
      })
      .catch(error => console.error('Failed to load movies:', error))
      .finally(() => setLoading(false));
  }, []);

  // Your search/filter/sort logic works the same!
  const filteredMovies = getFilteredMovies();

  if (loading) return <div>Loading...</div>;

  return (
    // Your JSX with SearchBar, FilterControls, etc.
  );
}
```

---

## Next Steps

After completing this module:

1. Add more filter options (year range, multiple genres)
2. Implement debounced search (wait for user to stop typing)
3. Add URL query parameters to save search state
4. Create advanced sort (multiple sort fields)
5. Add "Clear All Filters" button

---

## Summary

You've learned to:
✅ Implement real-time search across multiple fields
✅ Build filter controls for categorical data
✅ Create sorting functionality
✅ Handle MongoDB array fields safely
✅ Manage complex UI state
✅ Apply defensive programming practices

This advanced feature demonstrates professional-level React development and prepares you for real-world applications!
