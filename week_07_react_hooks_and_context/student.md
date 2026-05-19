# Week 7 - Advanced React Hooks & Context API

## Learning Objectives

By the end of this session, you will be able to:
- Master useEffect for side effects and cleanup
- Create custom hooks for reusable logic
- Use Context API for global state management
- Implement useReducer for complex state
- Optimize performance with useMemo and useCallback

## Simple Examples - Building Understanding

Before diving into advanced concepts, let's start with simple examples to understand each hook:

### Example 1: useReducer with Simple Counter

Create `src/components/CounterWithReducer.js`:

```javascript
import React, { useReducer } from 'react';

// Simple reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };
    case 'decrement':
      return { count: state.count - 1 };
    case 'reset':
      return { count: 0 };
    default:
      return state;
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      <p>Count: {state.count}</p>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}

export default CounterWithReducer;
```

### Example 2: useContext for Theme

Create `src/components/ThemeExample.js`:

```javascript
import React, { createContext, useContext, useState } from 'react';

// Create context
const ThemeContext = createContext();

// Provider component
function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Component that uses context
function ThemedButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      style={{
        backgroundColor: theme === 'light' ? 'white' : 'black',
        color: theme === 'light' ? 'black' : 'white'
      }}
    >
      Current theme: {theme}
    </button>
  );
}

// Usage
function ThemeExample() {
  return (
    <ThemeProvider>
      <div>
        <h3>Theme Example</h3>
        <ThemedButton />
      </div>
    </ThemeProvider>
  );
}

export default ThemeExample;
```

### Example 3: Simple Custom Hook

Create `src/hooks/useCounter.js`:

```javascript
import { useState } from 'react';

// Custom hook for counter logic
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(initialValue);

  return {
    count,
    increment,
    decrement,
    reset
  };
}

export default useCounter;
```

Use it in a component:

```javascript
import useCounter from '../hooks/useCounter';

function CustomHookExample() {
  const { count, increment, decrement, reset } = useCounter(10);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>+</button>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset to 10</button>
    </div>
  );
}
```

> `Try It Out`
> Create these components and experiment with:
> - useReducer for complex state logic
> - useContext for sharing data between components
> - Custom hooks for reusable logic
> - Notice how each pattern solves different problems

## Advanced useEffect Patterns

### Basic useEffect Review

```javascript
function MoviesList() {
  const [movies, setMovies] = useState([]);

  // Effect runs after every render
  useEffect(() => {
    console.log('Component rendered');
  });

  // Effect runs only on mount
  useEffect(() => {
    fetchMovies().then(setMovies);
  }, []); // Empty dependency array

  // Effect runs when movies change
  useEffect(() => {
    document.title = `${movies.length} movies`;
  }, [movies]); // movies dependency
}
```

### Cleanup Effects

```javascript
function MovieTimer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);

    // Cleanup function
    return () => {
      clearInterval(interval);
    };
  }, []);

  return <div>Timer: {seconds}s</div>;
}
```

### Async Effects (The Right Way)

```javascript
// ❌ Don't do this - useEffect can't be async
useEffect(async () => {
  const movies = await fetchMovies();
  setMovies(movies);
}, []);

// ✅ Do this instead
useEffect(() => {
  async function loadMovies() {
    try {
      setLoading(true);
      const movies = await fetchMovies();
      setMovies(movies);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  loadMovies();
}, []);
```

## Custom Hooks

Custom hooks let you extract component logic into reusable functions:

### useLocalStorage Hook

```javascript
function useLocalStorage(key, initialValue) {
  // Get from local storage then parse stored json or return initialValue
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// Usage
function Settings() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Current theme: {theme}
    </button>
  );
}
```

### useApi Hook

```javascript
function useApi(url) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isCancelled = false;

    async function fetchData() {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const result = await response.json();
        
        if (!isCancelled) {
          setData(result);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err.message);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    fetchData();

    // Cleanup function to cancel request
    return () => {
      isCancelled = true;
    };
  }, [url]);

  return { data, loading, error };
}

// Usage
function MoviesList() {
  const { data: movies, loading, error } = useApi('/api/movies');

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (!movies) return <EmptyState />;

  return <MovieGrid movies={movies} />;
}
```

## Context API for Global State

### Creating a Context

```javascript
import React, { createContext, useContext, useReducer } from 'react';

// Create context
const ThemeContext = createContext();

// Theme reducer
function themeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return {
        ...state,
        mode: state.mode === 'light' ? 'dark' : 'light'
      };
    case 'SET_PRIMARY_COLOR':
      return {
        ...state,
        primaryColor: action.payload
      };
    default:
      return state;
  }
}

// Theme provider
function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    mode: 'light',
    primaryColor: '#007bff'
  });

  const toggleTheme = () => {
    dispatch({ type: 'TOGGLE_THEME' });
  };

  const setPrimaryColor = (color) => {
    dispatch({ type: 'SET_PRIMARY_COLOR', payload: color });
  };

  const value = {
    ...state,
    toggleTheme,
    setPrimaryColor
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use theme
function useTheme() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
```

### Using the Context

```javascript
function App() {
  return (
    <ThemeProvider>
      <div className="app">
        <Header />
        <MoviesList />
        <ThemeToggle />
      </div>
    </ThemeProvider>
  );
}

function ThemeToggle() {
  const { mode, toggleTheme } = useTheme();
  
  return (
    <button onClick={toggleTheme}>
      Switch to {mode === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}

function Header() {
  const { mode, primaryColor } = useTheme();
  
  return (
    <header 
      className={`header ${mode}`}
      style={{ backgroundColor: primaryColor }}
    >
      <h1>🎬 Movie Buzz</h1>
    </header>
  );
}
```

## useReducer for Complex State

useReducer is great for managing complex state logic:

```javascript
const initialState = {
  movies: [],
  selectedMovie: null,
  filter: 'all',
  sortBy: 'name',
  loading: false,
  error: null
};

function moviesReducer(state, action) {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true, error: null };
      
    case 'FETCH_SUCCESS':
      return { 
        ...state, 
        loading: false, 
        movies: action.payload,
        error: null 
      };
      
    case 'FETCH_ERROR':
      return { 
        ...state, 
        loading: false, 
        error: action.payload 
      };
      
    case 'SELECT_MOVIE':
      return { 
        ...state, 
        selectedMovie: action.payload 
      };
      
    case 'SET_FILTER':
      return { 
        ...state, 
        filter: action.payload,
        selectedMovie: null 
      };
      
    case 'SET_SORT':
      return { 
        ...state, 
        sortBy: action.payload 
      };
      
    default:
      return state;
  }
}

function MovieApp() {
  const [state, dispatch] = useReducer(moviesReducer, initialState);

  const selectMovie = (movie) => {
    dispatch({ type: 'SELECT_MOVIE', payload: movie });
  };

  const setFilter = (filter) => {
    dispatch({ type: 'SET_FILTER', payload: filter });
  };

  return (
    <div>
      <MovieFilter onFilter={setFilter} />
      <MoviesList 
        movies={state.movies} 
        onSelect={selectMovie} 
      />
      {state.selectedMovie && (
        <MovieDetails movie={state.selectedMovie} />
      )}
    </div>
  );
}
```

## Performance Optimization

### useMemo for Expensive Calculations

```javascript
function MoviesList({ movies, searchTerm }) {
  // Only recalculate when movies or searchTerm changes
  const filteredMovies = useMemo(() => {
    console.log('Filtering movies...'); // This runs only when needed
    
    if (!searchTerm) return movies;
    
    return movies.filter(movie => 
      movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      movie.director.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [movies, searchTerm]);

  return (
    <div>
      {filteredMovies.map(movie => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
```

### useCallback for Function Memoization

```javascript
function MoviesList({ movies }) {
  const [favorites, setFavorites] = useState([]);

  // Without useCallback, this function is recreated on every render
  // causing child components to re-render unnecessarily
  const handleToggleFavorite = useCallback((movieId) => {
    setFavorites(prev => 
      prev.includes(movieId)
        ? prev.filter(id => id !== movieId)
        : [...prev, movieId]
    );
  }, []); // No dependencies, function never changes

  return (
    <div>
      {movies.map(movie => (
        <MovieCard 
          key={movie.id} 
          movie={movie}
          isFavorite={favorites.includes(movie.id)}
          onToggleFavorite={handleToggleFavorite}
        />
      ))}
    </div>
  );
}

// Child component wrapped in React.memo won't re-render
// unless props actually change
const MovieCard = React.memo(function MovieCard({ 
  movie, 
  isFavorite, 
  onToggleFavorite 
}) {
  return (
    <div className="movie-card">
      <h3>{movie.name}</h3>
      <button onClick={() => onToggleFavorite(movie.id)}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
});
```

## Project Tasks

### 1. Create a Theme Context

Implement a theme system with:
- Light/dark mode toggle
- Primary color customization
- Font size preferences
- Store preferences in localStorage

### 2. Build Custom Hooks

Create these custom hooks:
- `useLocalStorage` for persistent state
- `useApi` for data fetching
- `useDebounce` for search input
- `useToggle` for boolean state

### 3. Movie Favorites with Context

Create a favorites system using Context:
```javascript
const FavoritesContext = createContext();

function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);
  
  const addFavorite = (movie) => {
    setFavorites(prev => [...prev, movie]);
  };
  
  const removeFavorite = (movieId) => {
    setFavorites(prev => prev.filter(m => m.id !== movieId));
  };
  
  const isFavorite = (movieId) => {
    return favorites.some(m => m.id === movieId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}
```

## Best Practices

1. **Use useEffect dependencies correctly** - Include all variables used inside the effect
2. **Cleanup effects** - Always cleanup subscriptions, timers, etc.
3. **Custom hooks for reusable logic** - Extract common patterns
4. **Context for global state only** - Don't overuse Context
5. **Optimize performance** - Use useMemo and useCallback wisely
6. **Handle loading and error states** - Always consider edge cases

## Review Questions

1. What's the difference between useEffect with and without dependencies?
2. How do you cleanup effects?
3. When should you create a custom hook?
4. What is Context API best used for?
5. When should you use useReducer over useState?
6. How do useMemo and useCallback optimize performance?

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Next Week Preview

In Week 8, we'll move to the backend with Node.js and HTTP fundamentals!