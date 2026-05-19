# Supplemental Advanced Search Feature

## Overview

This supplemental module provides an **optional** advanced search, filter, and sort feature for the Movie Buzz application. This is designed for students who want to enhance their application with sophisticated data manipulation capabilities.

## What You'll Learn

- Implementing real-time search across multiple fields
- Building filter controls for categorical data
- Creating sort functionality for different data types
- Handling MongoDB array fields (genre, stars) in searches
- Managing complex state for UI controls
- Integrating search with both static data and live APIs

## Prerequisites

Before implementing this feature, you should have completed:
- **Week 4**: React state and hooks (core curriculum)
- **Week 5**: React events and form handling
- **Week 16**: Frontend-backend integration (if using with API)

## When to Use This Module

This is an **optional enhancement**. You can implement this:
- **After Week 5**: Using static array data for practice
- **After Week 16**: Integrating with your live Movie Buzz API

## Features Included

### 1. Search Functionality
- Search across movie titles, directors, and actors
- Real-time filtering as you type
- Case-insensitive search
- Safe handling of array fields (stars)

### 2. Filter Controls
- Filter by genre (handles array fields)
- Filter by rating
- Combine multiple filters

### 3. Sort Options
- Sort by name (alphabetical)
- Sort by year (newest first)
- Sort by rating
- Sort by genre (using first genre in array)

### 4. Results Display
- Show count of filtered vs total movies
- Empty state handling
- Mobile-responsive design

## Project Structure

```
supplemental_advanced_search_feature/
├── README.md                          # This file
├── student.md                         # Step-by-step implementation guide
├── teacher.md                         # Solutions and teaching notes
└── movie-buzz-search/                 # Complete working example
    ├── src/
    │   ├── components/
    │   │   ├── SearchBar.js          # Search input component
    │   │   ├── FilterControls.js     # Genre/rating filters
    │   │   └── SearchBar.css         # Styling
    │   └── App.js                     # Integration example
    └── data/
        └── movies.json                # Sample data for testing
```

## Implementation Approaches

### Approach 1: Static Data (Week 4+)
Perfect for learning the concepts without API complexity:
```javascript
const [movies] = useState(staticMoviesData);
const filteredMovies = applySearchFilterSort(movies);
```

### Approach 2: API Integration (Week 16+)
Integrate with your live backend:
```javascript
const [movies, setMovies] = useState([]);
useEffect(() => {
  fetchMoviesFromAPI().then(setMovies);
}, []);
const filteredMovies = applySearchFilterSort(movies);
```

## Key Concepts

### MongoDB Array Field Handling

This feature demonstrates proper handling of MongoDB array fields:

```javascript
// ✅ CORRECT: Safe search through stars array
const matchesSearch =
  movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
  (Array.isArray(movie.stars) &&
   movie.stars.some(star =>
     star.toLowerCase().includes(searchTerm.toLowerCase())
   ));

// ✅ CORRECT: Safe genre filtering
const matchesGenre = selectedGenre === 'all' ||
  (Array.isArray(movie.genre) &&
   movie.genre.some(g => g.toLowerCase() === selectedGenre.toLowerCase())
  );
```

### State Management

Manage search state efficiently:
```javascript
const [searchTerm, setSearchTerm] = useState('');
const [selectedGenre, setSelectedGenre] = useState('all');
const [selectedRating, setSelectedRating] = useState('all');
const [sortBy, setSortBy] = useState('name');
```

## Getting Started

1. **Read student.md** for step-by-step implementation instructions
2. **Review the working example** in `movie-buzz-search/`
3. **Implement in your project** following the TODO comments
4. **Test thoroughly** with various data scenarios

## Testing Your Implementation

Test these scenarios:
- ✅ Search for movie titles
- ✅ Search for director names
- ✅ Search for actor names (array field)
- ✅ Filter by genre (array field)
- ✅ Filter by rating
- ✅ Combine search + filters
- ✅ Sort by different fields
- ✅ Empty search/filter states
- ✅ No results scenarios

## Common Pitfalls

### ❌ Mistake: Not checking if field is an array
```javascript
// This will crash if stars is an array
movie.stars.toLowerCase().includes(searchTerm)
```

### ✅ Solution: Always use Array.isArray()
```javascript
Array.isArray(movie.stars) &&
  movie.stars.some(star => star.toLowerCase().includes(searchTerm))
```

### ❌ Mistake: Directly mutating state
```javascript
movies.sort((a, b) => a.name.localeCompare(b.name)); // Mutates original!
```

### ✅ Solution: Create a copy first
```javascript
const sorted = [...movies].sort((a, b) => a.name.localeCompare(b.name));
```

## Integration with Week 16

If you've completed Week 16 (Frontend-Backend Integration), you can integrate this search functionality with your live API:

```javascript
// In your App.js after Week 16
import { movieService } from './services/movieService';

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch from API
  useEffect(() => {
    movieService.getAll()
      .then(data => setMovies(data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  // Use search/filter/sort from this supplemental module
  const filteredMovies = getFilteredMovies(movies);

  return (
    <div>
      <SearchBar onSearchChange={setSearchTerm} />
      <FilterControls ... />
      <MoviesList movies={filteredMovies} />
    </div>
  );
}
```

## Support

- Review `student.md` for detailed implementation steps
- Check `teacher.md` for complete solutions
- Study the working example in `movie-buzz-search/`
- Refer to Week 4 and Week 16 lesson materials

## Remember

This is an **optional enhancement**. The core curriculum works perfectly without these advanced features. Implement this when you're ready to challenge yourself and add professional-level functionality to your Movie Buzz application!
