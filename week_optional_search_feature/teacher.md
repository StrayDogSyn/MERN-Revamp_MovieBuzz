# Teacher Guide: Advanced Search, Filter, and Sort Feature

## Overview

This supplemental module teaches advanced React state management and array manipulation through implementing search, filter, and sort functionality. This is an **optional enhancement** for students ready for more complex challenges.

---

## Teaching Approach

### When to Introduce

**Option 1: After Week 5 (With Static Data)**
- Pros: Focuses purely on React logic without API complexity
- Best for: Students who need more React practice

**Option 2: After Week 16 (With Live API)**
- Pros: Shows real-world integration
- Best for: Advanced students ready for full-stack features

### Recommended Timeline

- **Lecture/Demo**: 45-60 minutes
- **Guided Practice**: 60-90 minutes
- **Independent Work**: 2-3 hours

---

## Learning Objectives

Students will be able to:
1. Implement real-time search with controlled components
2. Filter data by multiple criteria simultaneously
3. Sort data by different fields and data types
4. Safely handle MongoDB array fields in JavaScript
5. Manage complex interrelated state
6. Apply defensive programming for production code

---

## Key Concepts to Emphasize

### 1. MongoDB Array Fields

**Critical Teaching Point**: MongoDB stores `genre` and `stars` as arrays, not strings.

```javascript
// Schema in MongoDB:
{
  genre: ["Action", "Sci-Fi"],    // ARRAY
  stars: ["Keanu Reeves", "..."]  // ARRAY
}

// NOT this:
{
  genre: "Action, Sci-Fi",  // String (wrong!)
  stars: "Keanu Reeves, ..." // String (wrong!)
}
```

**Always teach defensive checks:**
```javascript
// ❌ WRONG: Assumes stars exists and is array
movie.stars.some(star => star.includes(term))

// ✅ CORRECT: Defensive check
Array.isArray(movie.stars) && movie.stars.some(star =>
  star.toLowerCase().includes(term.toLowerCase())
)
```

### 2. Immutability with .sort()

**Common Student Mistake**: Mutating the original array

```javascript
// ❌ WRONG: Mutates movies state
movies.sort((a, b) => a.name.localeCompare(b.name));

// ✅ CORRECT: Work with copy
const filtered = [...movies];
filtered.sort((a, b) => a.name.localeCompare(b.name));
```

### 3. Case-Insensitive Search

**Emphasize consistency:**
```javascript
// ✅ CORRECT: Both sides lowercase
movie.name.toLowerCase().includes(searchTerm.toLowerCase())

// ❌ WRONG: Inconsistent
movie.name.includes(searchTerm.toLowerCase())
```

---

## Complete Solutions

### Solution: App.js Integration

```javascript
import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import SearchBar from './components/SearchBar';
import FilterControls from './components/FilterControls';
import './App.css';

function App() {
  // Core state
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search/Filter/Sort state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedRating, setSelectedRating] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Load movies (replace with API call after Week 16)
  useEffect(() => {
    // With static data:
    setMovies(staticMovieData);
    setLoading(false);

    // With API (Week 16+):
    // movieService.getAll()
    //   .then(data => setMovies(data.data || data))
    //   .catch(err => console.error(err))
    //   .finally(() => setLoading(false));
  }, []);

  // Filter and sort logic
  const getFilteredMovies = () => {
    let filtered = [...movies];

    // Apply search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(movie => {
        const nameMatches = movie.name.toLowerCase().includes(term);
        const directorMatches = movie.director.toLowerCase().includes(term);
        const starsMatch = Array.isArray(movie.stars) &&
          movie.stars.some(star => star.toLowerCase().includes(term));

        return nameMatches || directorMatches || starsMatch;
      });
    }

    // Apply genre filter
    if (selectedGenre !== 'all') {
      filtered = filtered.filter(movie =>
        Array.isArray(movie.genre) &&
        movie.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
      );
    }

    // Apply rating filter
    if (selectedRating !== 'all') {
      filtered = filtered.filter(movie => movie.rating === selectedRating);
    }

    // Apply sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'year':
          return b.year - a.year; // Newest first
        case 'rating':
          return a.rating.localeCompare(b.rating);
        case 'genre':
          const genreA = (a.genre && a.genre[0]) || '';
          const genreB = (b.genre && b.genre[0]) || '';
          return genreA.localeCompare(genreB);
        default:
          return 0;
      }
    });

    return filtered;
  };

  const filteredMovies = getFilteredMovies();

  if (loading) {
    return <div className="loading">Loading movies...</div>;
  }

  return (
    <div className="App">
      <header>
        <h1>🎬 Movie Buzz</h1>
      </header>

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

      {filteredMovies.length > 0 ? (
        <MoviesList movies={filteredMovies} />
      ) : (
        <div className="empty-state">
          <p>No movies found matching your criteria.</p>
          <button onClick={() => {
            setSearchTerm('');
            setSelectedGenre('all');
            setSelectedRating('all');
          }}>
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
```

### Solution: SearchBar.js

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
        onChange={(e) => onSearchChange(e.target.value)}
        className="search-input"
        aria-label="Search movies"
      />
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="clear-button"
          aria-label="Clear search"
        >
          ✕
        </button>
      )}
    </div>
  );
}

export default SearchBar;
```

### Solution: FilterControls.js

```javascript
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
      <div className="filter-group">
        <label htmlFor="genre-filter">Genre:</label>
        <select
          id="genre-filter"
          value={selectedGenre}
          onChange={(e) => onGenreChange(e.target.value)}
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
          <option value="family">Family</option>
          <option value="crime">Crime</option>
        </select>
      </div>

      <div className="filter-group">
        <label htmlFor="rating-filter">Rating:</label>
        <select
          id="rating-filter"
          value={selectedRating}
          onChange={(e) => onRatingChange(e.target.value)}
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
          onChange={(e) => onSortChange(e.target.value)}
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

---

## Common Student Errors and Solutions

### Error 1: TypeError with Array Methods

**Student Code:**
```javascript
movie.stars.some(star => star.includes(term))
```

**Error**: `TypeError: Cannot read property 'some' of undefined`

**Solution**: Always check if it's an array first
```javascript
Array.isArray(movie.stars) && movie.stars.some(star =>
  star.toLowerCase().includes(term.toLowerCase())
)
```

**Teaching Tip**: Show them the actual MongoDB data structure and explain why this check is necessary.

---

### Error 2: State Not Updating

**Student Code:**
```javascript
movies.sort((a, b) => a.name.localeCompare(b.name));
return movies;
```

**Problem**: .sort() mutates the original array, React doesn't detect the change

**Solution**:
```javascript
const sorted = [...movies];
sorted.sort((a, b) => a.name.localeCompare(b.name));
return sorted;
```

**Teaching Tip**: Demonstrate how React's reference equality works with a live example.

---

### Error 3: Case-Sensitive Search

**Student Code:**
```javascript
movie.name.includes(searchTerm)
```

**Problem**: Search for "matrix" won't find "The Matrix"

**Solution**:
```javascript
movie.name.toLowerCase().includes(searchTerm.toLowerCase())
```

**Teaching Tip**: Have students test their implementation with different cases.

---

## Assessment Ideas

### Formative Assessment

1. **Code Review**: Have students explain their filter logic step-by-step
2. **Debug Challenge**: Give them code with intentional errors to fix
3. **Pair Programming**: Have students implement one feature together

### Summative Assessment

1. **Add a Feature**: Implement year range filter (1990-2000, 2000-2010, etc.)
2. **Refactor Challenge**: Move filter logic to custom hook
3. **Performance**: Add debouncing to search input

---

## Extension Activities

### For Advanced Students

1. **Multi-Select Filters**: Allow selecting multiple genres at once
2. **URL State**: Save filters in URL query parameters
3. **Persist Filters**: Save user preferences to localStorage
4. **Advanced Sort**: Secondary sort (e.g., by name when sorting by year)
5. **Search Highlighting**: Highlight matching text in results

### Code Examples for Extensions

**Multi-Select Genres:**
```javascript
const [selectedGenres, setSelectedGenres] = useState([]);

// In filter logic:
if (selectedGenres.length > 0) {
  filtered = filtered.filter(movie =>
    Array.isArray(movie.genre) &&
    selectedGenres.some(selected =>
      movie.genre.some(g => g.toLowerCase() === selected.toLowerCase())
    )
  );
}
```

**URL Query Parameters:**
```javascript
import { useSearchParams } from 'react-router-dom';

const [searchParams, setSearchParams] = useSearchParams();

// Read from URL
const searchTerm = searchParams.get('search') || '';

// Write to URL
const handleSearchChange = (term) => {
  setSearchTerm(term);
  setSearchParams({ search: term });
};
```

---

## Integration with Week 16

When students reach Week 16, they can integrate this feature with their live API:

**Key Points to Teach:**
1. The filter logic stays exactly the same
2. Only the data source changes (static → API)
3. Add loading states for better UX
4. Consider moving filtering to backend for large datasets

**Discussion Question**: "When should filtering happen on the client vs. server?"

**Answer Guide**:
- **Client-side**: Small datasets (<1000 items), instant feedback, offline capability
- **Server-side**: Large datasets, complex queries, pagination required

---

## Troubleshooting Tips

### Students Can't See Results

1. Check console for errors (usually array method issues)
2. Verify data structure matches expectations
3. Use console.log to debug filter steps
4. Check case sensitivity in comparisons

### Performance Issues

If filtering feels slow:
1. Add `React.memo` to components
2. Use `useMemo` for filtered results
3. Implement debouncing on search input
4. Consider virtualizing long lists

---

## Resources for Students

- MDN: Array.prototype.filter()
- MDN: Array.prototype.some()
- MDN: String.prototype.localeCompare()
- React Docs: Controlled Components
- Optional: lodash/debounce for search debouncing

---

## Summary

This module demonstrates:
✅ Complex state management
✅ Array manipulation techniques
✅ Defensive programming
✅ Real-world feature implementation
✅ Professional code quality

Students completing this module are ready for intermediate-level React development!
