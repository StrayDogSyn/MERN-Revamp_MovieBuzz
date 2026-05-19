# Movie Buzz - Week 4: React State & Hooks

This builds on Week 3's static Movie Buzz application by adding interactive features using React hooks. Students learn `useState` to manage component state and create dynamic user interactions.

## What's New in Week 4

- **React Hooks**: Introduction to `useState` for managing component state
- **Favorite Movies**: Track and display favorite movies
- **Expandable Cards**: Show/hide detailed movie information
- **Delete Functionality**: Remove movies from the collection
- **State Management**: Parent-child component communication
- **Event Handling**: Click handlers and user interactions

## Learning Objectives

- Master `useState` hook for managing component state
- Understand state lifting and passing callbacks as props
- Learn to update state based on previous state
- Practice conditional rendering based on state
- Handle multiple state variables in a component
- Build interactive UI features

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## Project Structure

```
movie-buzz/
├── public/
│   ├── images/
│   │   └── movie-placeholder.png   # Placeholder for movie posters
│   └── index.html                   # HTML template
├── src/
│   ├── components/
│   │   ├── MoviesList.js           # Container managing movie list
│   │   ├── MoviesList.css          # List styling
│   │   ├── MovieBlock.js           # Individual movie card with state
│   │   └── MovieBlock.css          # Card styling
│   ├── App.js                      # Main app with state management
│   ├── App.css                     # App-level styles
│   ├── index.js                    # React entry point
│   └── index.css                   # Global styles
├── package.json
└── README.md
```

## Implementation Guide - TODO Placement Instructions

### Step 1: Add State Management to App Component
**File: `src/App.js` (Lines 70-74)**
```javascript
function App() {
  // TODO: Add state for movies list
  const [movies, setMovies] = useState(initialMovies);
  
  // TODO: Add state for favorite movies (array of movie IDs)
  const [favoriteIds, setFavoriteIds] = useState([]);
```

### Step 2: Create Toggle Favorite Handler
**File: `src/App.js` (Lines 76-87)**
```javascript
  // TODO: Create handler to toggle favorite status
  const toggleFavorite = (movieId) => {
    setFavoriteIds(prevFavorites => {
      if (prevFavorites.includes(movieId)) {
        // Remove from favorites
        return prevFavorites.filter(id => id !== movieId);
      } else {
        // Add to favorites
        return [...prevFavorites, movieId];
      }
    });
  };
```

### Step 3: Create Delete Movie Handler
**File: `src/App.js` (Lines 89-98)**
```javascript
  // TODO: Create handler to delete a movie
  const deleteMovie = (movieId) => {
    const confirmDelete = window.confirm('Are you sure?');
    if (confirmDelete) {
      setMovies(prevMovies => 
        prevMovies.filter(movie => movie.id !== movieId)
      );
      // Also remove from favorites if needed
      setFavoriteIds(prevFavorites => 
        prevFavorites.filter(id => id !== movieId)
      );
    }
  };
```

### Step 4: Update MoviesList Component
**File: `src/components/MoviesList.js` (Lines 5-30)**
```javascript
function MoviesList({ movies, favoriteIds, onToggleFavorite, onDeleteMovie }) {
  // TODO: Handle empty state
  if (!movies || movies.length === 0) {
    return <div>No movies available</div>;
  }

  return (
    <div className="movies-list">
      {movies.map(movie => (
        <MovieBlock
          key={movie.id}
          movie={movie}
          isFavorite={favoriteIds.includes(movie.id)}
          onToggleFavorite={() => onToggleFavorite(movie.id)}
          onDelete={() => onDeleteMovie(movie.id)}
        />
      ))}
    </div>
  );
}
```

### Step 5: Add Expand/Collapse State to MovieBlock
**File: `src/components/MovieBlock.js` (Lines 3-10)**
```javascript
function MovieBlock({ movie, isFavorite, onToggleFavorite, onDelete }) {
  // TODO: Add state for expanded description
  const [isExpanded, setIsExpanded] = useState(false);

  // TODO: Create click handler for expand/collapse
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };
```

### Step 6: Add Interactive UI Elements
**File: `src/components/MovieBlock.js` (Lines 20-27)**
```javascript
  {/* Favorite button */}
  <button 
    className={`favorite-btn ${isFavorite ? 'favorited' : ''}`}
    onClick={onToggleFavorite}
  >
    {isFavorite ? '❤️' : '🤍'}
  </button>

  {/* Expand/Collapse button */}
  <button onClick={toggleExpanded}>
    {isExpanded ? '▲' : '▼'}
  </button>
```

### Step 7: Conditional Rendering Based on State
**File: `src/components/MovieBlock.js` (Lines 56-73)**
```javascript
  {/* Show expanded content when isExpanded is true */}
  {isExpanded && (
    <div className="movie-expanded-content">
      <p>{movie.description}</p>
      <p>Director: {movie.director}</p>
      <p>Stars: {movie.stars.join(', ')}</p>
    </div>
  )}

  {/* Show preview when collapsed */}
  {!isExpanded && (
    <div className="movie-preview">
      <p>{movie.description.substring(0, 100)}...</p>
    </div>
  )}
```

## Key Concepts to Master

### State Management with useState
- Declaring state variables: `const [value, setValue] = useState(initial)`
- Updating state triggers component re-renders
- State updates are asynchronous

### Lifting State Up
- Parent component (App) manages shared state
- Child components receive state via props
- Child components call parent functions to update state

### Functional State Updates
- Use function form when new state depends on previous state
- Example: `setState(prev => prev + 1)`
- Ensures correct updates in async scenarios

### Event Handling
- onClick handlers for user interactions
- Passing parameters to event handlers
- Preventing default behaviors when needed

## Testing Your Implementation

1. **Favorite Toggle**: Click heart icons to mark/unmark favorites
2. **Favorites Counter**: See the count update in real-time
3. **Expand/Collapse**: Click arrows to show/hide movie details
4. **Delete Movies**: Remove movies with confirmation
5. **State Persistence**: Favorites remain marked until page refresh

## Common Issues and Solutions

- **State not updating**: Remember setState is asynchronous
- **Stale closures**: Use functional updates for dependent state
- **Props not updating**: Ensure parent state is changing
- **Event bubbling**: Use stopPropagation if needed

## Next Steps

Week 5 will introduce:
- Form handling for adding new movies
- Navigation with React Router
- Header and Footer components
- More complex state management
- Building on the foundation from Week 4

## Challenge Exercises

1. Add a "Show only favorites" filter button
2. Implement a rating system (1-5 stars)
3. Add a "watched" status toggle
4. Create an "Add to watchlist" feature
5. Sort movies by name or year