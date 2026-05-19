# Week 4 - React State & Hooks #

- [Week 4 - React State & Hooks](#week-4---react-state--hooks)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [Understanding React State](#understanding-react-state)
  - [Introduction to useState Hook](#introduction-to-usestate-hook)
    - [Basic useState Syntax](#basic-usestate-syntax)
    - [State Updates and Re-rendering](#state-updates-and-re-rendering)
    - [Multiple State Variables](#multiple-state-variables)
  - [useEffect Hook Fundamentals](#useeffect-hook-fundamentals)
    - [Basic useEffect Usage](#basic-useeffect-usage)
    - [Dependency Arrays](#dependency-arrays)
    - [Cleanup Functions](#cleanup-functions)
  - [Building the Interactive Movie Buzz App](#building-the-interactive-movie-buzz-app)
    - [Adding State to Movie Components](#adding-state-to-movie-components)
    - [Creating Interactive Features](#creating-interactive-features)
  - [State Best Practices](#state-best-practices)
  - [Common useState Patterns](#common-usestate-patterns)
  - [Common useEffect Patterns](#common-useeffect-patterns)
  - [Debugging State and Effects](#debugging-state-and-effects)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students have completed Week 3 and understand React basics: components, JSX, and props. This week introduces the most important React concepts for building interactive applications: state management with useState and side effects with useEffect. Students will transform their static Movie Buzz app into an interactive application with favorites, expandable cards, and dynamic user interactions.

**Key Transition**: Students move from static components with props to dynamic, interactive components with internal state management.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Explain the difference between props and state in React
- Use the useState hook to manage component state
- Update state properly with state setter functions
- Use the useEffect hook to handle side effects
- Understand dependency arrays and when effects run
- Implement cleanup functions for effects
- Build interactive features using state and effects together
- Debug state and effect issues using React Developer Tools
- Apply state management best practices in React applications

---

## Glossary ##

- `State`: Data that belongs to a component and can change over time
- `Hook`: A special function that lets you "hook into" React features
- `useState`: Hook for adding state variables to functional components
- `useEffect`: Hook for performing side effects in functional components
- `State Setter`: Function returned by useState to update state values
- `Side Effect`: Operations that affect something outside the component
- `Dependency Array`: Array that controls when useEffect runs
- `Cleanup Function`: Function returned by useEffect to clean up resources
- `Re-render`: When React calls your component function again to get updated JSX

---

## Starting Point ##

Students should have completed Week 3 with:

- Working React application with manual setup
- Multiple functional components (MovieBlock, MoviesList, App)
- Understanding of JSX and props
- Static movie data displayed in components
- Basic component composition patterns

**Pre-class Verification**: Ensure all students have their Week 3 Movie Buzz app working with static components before introducing state.

**Common Student Issues**:

- Confusion between props (external data) and state (internal data)
- Not understanding when components re-render
- Forgetting that state updates are asynchronous

---

## Understanding React State ##

**Teaching Strategy**: Start with the fundamental concept before diving into the useState syntax.

**Present the Core Concept**:

State is data that belongs to a component and can change over time. Unlike props, which are passed down from parent components, state is managed internally by the component itself.

**Visual Comparison** (draw on board):

```text
PROPS (External Data)
Parent Component
       ↓ (passes data)
Child Component (receives props, cannot change them)

STATE (Internal Data)  
Component
   ↓ (manages its own data)
Internal State (can change over time)
```

**Real-World Analogy**: Think of props like ingredients someone gives you for cooking (you can't change them), while state is like the cooking process itself (you control and change it).

**Key Principles** (write on board):

1. **Component-Owned**: Each component manages its own state
2. **Mutable**: State can and should change over time
3. **Triggers Re-renders**: When state changes, React re-renders the component
4. **Asynchronous Updates**: State updates don't happen immediately
5. **Immutable Updates**: Never mutate state directly, always use setter functions

> `Consider This`  
> Why might React want to control when components re-render instead of letting us update the DOM directly?
>> Expect: Performance optimization, predictable updates, batching updates, maintaining virtual DOM sync, easier debugging.

**Teaching Analogy**: State is like a thermostat - it monitors current conditions (temperature/data) and triggers changes (heating/cooling system/re-rendering) when needed.

---

## Introduction to useState Hook ##

**Teaching Focus**: Build understanding incrementally from basic syntax to complex patterns.

### Basic useState Syntax ###

**Start with the Simplest Example**:

```javascript
import React, { useState } from 'react';

function Counter() {
  // useState returns an array with two elements
  const [count, setCount] = useState(0);
  //     ↑        ↑            ↑
  //   state   setter    initial value
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}
```

**Key Teaching Points**:

1. **Array Destructuring**: useState returns [value, setter]
2. **Naming Convention**: [thing, setThing]
3. **Initial Value**: Passed as argument to useState
4. **Setter Function**: Used to update state

**Live Demo**: Build this counter example with students, showing how clicking the button updates the display.

**Common Student Confusion**: Explain why we use array destructuring instead of object destructuring:

```javascript
// Array destructuring (what we use)
const [count, setCount] = useState(0);

// Object destructuring (what we don't use)
const { value, setValue } = useState(0); // This doesn't work
```

### State Updates and Re-rendering ###

**Critical Concept**: Students must understand the render cycle.

```javascript
function MovieCounter() {
  const [movieCount, setMovieCount] = useState(0);
  
  console.log('Component is rendering, movieCount:', movieCount);
  
  const handleAddMovie = () => {
    console.log('Before setState:', movieCount);
    setMovieCount(movieCount + 1);
    console.log('After setState (still old value):', movieCount);
  };
  
  return (
    <div>
      <p>Movies watched: {movieCount}</p>
      <button onClick={handleAddMovie}>Add Movie</button>
    </div>
  );
}
```

**Key Teaching Points**:

1. **Component Function Runs Again**: Every state update triggers re-render
2. **State Updates Are Asynchronous**: setCount doesn't immediately change count
3. **New Values on Next Render**: Updated state available in next render cycle
4. **Console Logging**: Use console.log to demonstrate render cycle

**Demo Exercise**: Have students add console.log statements to see render cycle in action.

### Multiple State Variables ###

**Show How to Manage Multiple Pieces of State**:

```javascript
function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [expandedMovieId, setExpandedMovieId] = useState(null);

  return (
    <div>
      <p>Favorites: {favoriteIds.length}</p>
      <button
        onClick={() => setExpandedMovieId(expandedMovieId ? null : movies[0]?.id)}
      >
        {expandedMovieId ? 'Collapse' : 'Expand'} Movie Details
      </button>
      {/* Movie list would go here */}
    </div>
  );
}
```

**Teaching Points**:

1. **Separate Concerns**: Each piece of data gets its own state variable
2. **Independent Updates**: Updating one state doesn't affect others
3. **Consistent Naming**: Always use descriptive names

**When to Use Multiple State Variables vs. Single Object**:

```javascript
// Multiple state variables (preferred for independent data)
const [name, setName] = useState('');
const [email, setEmail] = useState('');

// Single state object (for related data)
const [user, setUser] = useState({
  name: '',
  email: ''
});
```

---

## useEffect Hook Fundamentals ##

**Teaching Strategy**: Build from simple to complex, showing practical examples.

### Basic useEffect Usage ###

**Introduce the Concept First**:

useEffect lets you perform side effects in function components. Side effects are operations that affect something outside of the component, like API calls, timers, or DOM manipulation.

**Basic Syntax**:

```javascript
import React, { useState, useEffect } from 'react';

function MovieApp() {
  const [movies, setMovies] = useState([]);
  
  // Effect runs after every render
  useEffect(() => {
    console.log('Effect running!');
    console.log('Current movies:', movies);
  });
  
  return (
    <div>
      <p>Movies: {movies.length}</p>
      <button onClick={() => setMovies([...movies, 'New Movie'])}>
        Add Movie
      </button>
    </div>
  );
}
```

**Key Teaching Points**:

1. **After Render**: Effects run after the component renders
2. **Side Effects**: Used for operations outside the component
3. **Import Required**: Must import useEffect from React

**Demo**: Show how the effect runs after each render by watching console output.

### Dependency Arrays ###

**Most Important useEffect Concept**:

```javascript
function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Runs after every render (no dependency array)
  useEffect(() => {
    console.log('Runs on every render');
  });

  // Runs only once after initial render (empty dependency array)
  useEffect(() => {
    console.log('Runs only once');
    // Perfect for initial data loading
    loadInitialMovies();
  }, []); // Empty array = run once

  // Runs when favoriteIds changes (dependency array with values)
  useEffect(() => {
    console.log('Runs when favoriteIds changes');
    saveFavoritesToLocalStorage(favoriteIds);
  }, [favoriteIds]); // Run when favoriteIds changes

  // Multiple dependencies
  useEffect(() => {
    console.log('Runs when movies OR favoriteIds changes');
    updateFavoriteCount();
  }, [movies, favoriteIds]);
  
  return <div>{/* Component JSX */}</div>;
}
```

**Critical Teaching Points**:

1. **No Array**: Runs after every render
2. **Empty Array []**: Runs once after initial render
3. **With Dependencies**: Runs when dependencies change
4. **Multiple Dependencies**: Runs when ANY dependency changes

**Common Student Mistakes**:

- Forgetting dependency array (causing infinite loops)
- Missing dependencies (stale closure bugs)
- Using objects/arrays as dependencies incorrectly

### Cleanup Functions ###

**Important for Preventing Memory Leaks**:

```javascript
function Timer() {
  const [seconds, setSeconds] = useState(0);
  
  useEffect(() => {
    console.log('Starting timer');
    
    const interval = setInterval(() => {
      setSeconds(prev => prev + 1);
    }, 1000);
    
    // Cleanup function
    return () => {
      console.log('Cleaning up timer');
      clearInterval(interval);
    };
  }, []); // Empty array - setup once, cleanup on unmount
  
  return <div>Timer: {seconds} seconds</div>;
}
```

**Key Teaching Points**:

1. **Return Function**: Effect can return a cleanup function
2. **When Cleanup Runs**: Before next effect run or component unmount
3. **Preventing Memory Leaks**: Clear intervals, cancel requests, remove listeners
4. **Optional**: Not all effects need cleanup

---

## Building the Interactive Movie Buzz App ##

**Major Implementation Section**: Transform static app into interactive experience.

### Adding State to Movie Components ###

**Start by Adding State to App Component**:

```javascript
// Enhanced App.js
import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

function App() {
  // Movie data state
  const [movies, setMovies] = useState([
    {
      id: 1,
      name: "The Matrix",
      year: 1999,
      rating: "R",
      length: "136 minutes",
      description: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
      genre: ["Action", "Sci-Fi"],
      director: "The Wachowskis",
      stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
      poster: "https://example.com/matrix.jpg"
    },
    {
      id: 2,
      name: "The Godfather",
      year: 1972,
      rating: "R",
      length: "175 minutes",
      description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
      genre: ["Crime", "Drama"],
      director: "Francis Ford Coppola",
      stars: ["Marlon Brando", "Al Pacino", "James Caan"],
      poster: "https://example.com/godfather.jpg"
    },
    {
      id: 3,
      name: "Pulp Fiction",
      year: 1994,
      rating: "R", 
      length: "154 minutes",
      description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
      genre: ["Crime", "Drama"],
      director: "Quentin Tarantino",
      stars: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
      poster: "https://example.com/pulp-fiction.jpg"
    }
  ]);

  // Favorites state - track which movies are favorited
  const [favoriteIds, setFavoriteIds] = useState([]);

  // Handle toggling a movie as favorite
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

  // Handle deleting a movie
  const deleteMovie = (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      setMovies(prevMovies => prevMovies.filter(movie => movie.id !== movieId));
      // Also remove from favorites if it was favorited
      setFavoriteIds(prevFavorites => prevFavorites.filter(id => id !== movieId));
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Movie Buzz</h1>
        <p>Your favorite movies, all in one place</p>
        <p className="favorites-count">
          {favoriteIds.length} {favoriteIds.length === 1 ? 'Favorite' : 'Favorites'}
        </p>
      </header>

      {/* Movie List */}
      <main className="app-main">
        <MoviesList
          movies={movies}
          favoriteIds={favoriteIds}
          onToggleFavorite={toggleFavorite}
          onDeleteMovie={deleteMovie}
        />
      </main>
    </div>
  );
}

export default App;
```

**Key Teaching Points for This Implementation**:

1. **State Organization**: Separate state for movies and favorite IDs
2. **State Updates with Previous State**: Using prevState in setters for reliability
3. **Conditional State Logic**: Toggle behavior (add/remove from favorites)
4. **Parent-Child Communication**: Passing callbacks down to child components
5. **User Feedback**: Display favorite count in header

### Creating Interactive Features ###

**Add Interactive Movie Rating Feature**:

```javascript
// Enhanced MovieBlock component with interactive features
import React, { useState } from 'react';

function MovieBlock({ movie }) {
  const [userRating, setUserRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const handleRatingClick = (rating) => {
    setUserRating(rating);
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const toggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const truncatedDescription = movie.description.length > 100 
    ? movie.description.substring(0, 100) + '...'
    : movie.description;

  return (
    <div className={`movie-block ${isFavorite ? 'favorite' : ''}`}>
      <div className="movie-header">
        <h3>{movie.name}</h3>
        <button 
          className={`favorite-btn ${isFavorite ? 'active' : ''}`}
          onClick={toggleFavorite}
        >
          {isFavorite ? '❤️' : '🤍'}
        </button>
      </div>

      <div className="movie-info">
        <p><strong>Year:</strong> {movie.year}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Length:</strong> {movie.length}</p>
        <p><strong>Director:</strong> {movie.director}</p>
        <p><strong>Genre:</strong> {movie.genre.join(', ')}</p>
        <p><strong>Stars:</strong> {movie.stars.join(', ')}</p>
      </div>

      <div className="movie-description">
        <p>
          {showFullDescription ? movie.description : truncatedDescription}
          {movie.description.length > 100 && (
            <button 
              className="toggle-description"
              onClick={toggleDescription}
            >
              {showFullDescription ? ' Show less' : ' Show more'}
            </button>
          )}
        </p>
      </div>

      <div className="user-rating">
        <p>Your Rating:</p>
        <div className="stars">
          {[1, 2, 3, 4, 5].map(star => (
            <button
              key={star}
              className={`star ${star <= userRating ? 'filled' : ''}`}
              onClick={() => handleRatingClick(star)}
            >
              ⭐
            </button>
          ))}
        </div>
        {userRating > 0 && (
          <p className="rating-display">
            You rated this {userRating} star{userRating > 1 ? 's' : ''}
          </p>
        )}
      </div>
    </div>
  );
}

export default MovieBlock;
```

**Key Teaching Points**:

1. **Local Component State**: Each movie has independent interactive state
2. **Conditional Rendering**: Show/hide content based on state
3. **Event Handlers**: Multiple handlers for different interactions
4. **Dynamic Classes**: CSS classes change based on state
5. **Array Mapping**: Generate interactive elements from arrays

---

## State Best Practices ##

**Teaching Focus**: Professional patterns that prevent common bugs.

**State Update Patterns**:

```javascript
// ❌ Wrong - Direct mutation
const [movies, setMovies] = useState([]);
movies.push(newMovie); // Don't do this!

// ✅ Correct - Immutable update
setMovies([...movies, newMovie]);

// ❌ Wrong - Mutating object
const [user, setUser] = useState({ name: '', email: '' });
user.name = 'John'; // Don't do this!

// ✅ Correct - New object
setUser({ ...user, name: 'John' });

// ✅ Correct - Functional update for complex logic
setMovies(prevMovies => {
  return prevMovies.map(movie => 
    movie.id === updatedMovie.id ? { ...movie, ...updates } : movie
  );
});
```

**When to Use Functional Updates**:

```javascript
// When new state depends on previous state
const [count, setCount] = useState(0);

// ❌ Can be problematic with multiple rapid updates
setCount(count + 1);

// ✅ Always safe - uses current state
setCount(prevCount => prevCount + 1);

// ✅ Complex state updates
setMovies(prevMovies => {
  const filtered = prevMovies.filter(movie => movie.id !== movieId);
  return [...filtered, updatedMovie];
});
```

---

## Common useState Patterns ##

**Teaching Practical Patterns Students Will Use Frequently**:

**Toggle Pattern**:

```javascript
const [isVisible, setIsVisible] = useState(false);

// Toggle boolean value
const toggleVisibility = () => setIsVisible(!isVisible);
// Or using functional update
const toggleVisibility = () => setIsVisible(prev => !prev);
```

**Reset Pattern**:

```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

const resetForm = () => setFormData({
  name: '',
  email: '',
  message: ''
});
```

**Array Management Patterns**:

```javascript
const [items, setItems] = useState([]);

// Add item
const addItem = (newItem) => setItems([...items, newItem]);

// Remove item
const removeItem = (id) => setItems(items.filter(item => item.id !== id));

// Update item
const updateItem = (id, updates) => 
  setItems(items.map(item => 
    item.id === id ? { ...item, ...updates } : item
  ));
```

---

## Common useEffect Patterns ##

**Data Loading Pattern**:

```javascript
function MovieApp() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMovies = async () => {
      try {
        setLoading(true);
        // In future weeks, this will be an API call
        const movieData = getMoviesFromStorage();
        setMovies(movieData);
      } catch (err) {
        setError('Failed to load movies');
      } finally {
        setLoading(false);
      }
    };

    loadMovies();
  }, []); // Run once on mount

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  return <div>{/* Render movies */}</div>;
}
```

**Toggle Pattern for Interactive Features**:

```javascript
function FavoriteButton({ movieId, isFavorite, onToggle }) {
  const handleClick = () => {
    onToggle(movieId);
  };

  return (
    <button
      onClick={handleClick}
      className={`favorite-btn ${isFavorite ? 'active' : ''}`}
    >
      {isFavorite ? '❤️ Favorited' : '🤍 Add to Favorites'}
    </button>
  );
}
```

---

## Debugging State and Effects ##

**Teaching Strategy**: Show students how to debug effectively.

**Debugging Tools and Techniques**:

```javascript
function DebuggableComponent() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  // 1. Console logging for debugging
  console.log('Component rendering:', { count, name });

  useEffect(() => {
    console.log('Effect running:', { count, name });
  }, [count, name]);

  // 2. React Developer Tools
  // When online, React Developer Tools browser extension is available

  // 3. Debugging state updates
  const handleIncrement = () => {
    console.log('Before update:', count);
    setCount(count + 1);
    console.log('After update (still old):', count);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
    </div>
  );
}
```

**Common Debugging Scenarios**:

1. **State Not Updating**: Check if using setter function correctly
2. **Infinite Re-renders**: Check useEffect dependency arrays
3. **Stale State**: Use functional updates or check dependencies
4. **Effects Not Running**: Verify dependency arrays include all dependencies

---

## Final Thoughts ##

**Major Achievement Celebration**: Students have mastered React's core concepts!

We've successfully transformed our static Movie Buzz application into a dynamic, interactive experience! Our enhanced application now features:

**State Management Mastery**:

- **Multiple State Variables**: Managing movies, favorites, and UI state
- **Complex State Updates**: Toggle patterns for favorites and delete operations
- **Interactive Components**: Favorites, expandable descriptions, and delete functionality
- **State Coordination**: Managing related state across multiple components

**useEffect Hook Proficiency**:

- **Dependency Management**: Proper dependency arrays for effect optimization
- **Side Effect Handling**: Managing component lifecycle and cleanup
- **Performance Optimization**: Preventing unnecessary re-renders

**Professional React Patterns**:

- **Immutable State Updates**: Proper state management without mutations
- **Conditional Rendering**: Dynamic UI based on application state
- **Event Handling**: Complex user interactions with proper state updates
- **Component Communication**: Parent-child data flow with state and props

**Interactive Features Implemented**:

- Favorite movies functionality with toggle
- Expandable movie descriptions
- Delete movies with confirmation
- Interactive state management
- User interaction with visual feedback

**Industry Relevance**: Students are now using production-grade React patterns for state management and user interaction.

The Movie Buzz application demonstrates:

- Professional component architecture
- Efficient state management patterns
- Interactive user interfaces with favorites and expand/collapse
- Dynamic state updates based on user actions
- Responsive user experience design

**Next Week Preview**: We'll add advanced event handling and custom hooks to create even more sophisticated user interactions.

> `Consider This`  
> How does state management change the way users can interact with your application? What new possibilities does React state open up for web development?
>> Expect: Dynamic content updates, user personalization, real-time interactions, form handling, application memory, interactive features that weren't possible with static content.

**Preparation for Next Week**: Students should have a fully interactive Movie Buzz application with favorites, expandable descriptions, and delete functionality using useState and basic event handling.

---

## Exit Ticket ##

Access code: loop84

Instruct students to open the exit ticket for this week in the LMS. You may read through the questions with the students, but do not give the students the answers to the questions. Once all students have answered the questions, you may ask students for the correct answer.

1. What are the two elements returned by the useState hook?

  > Answer: The current state value and a setter function to update it

1. What happens when you call a state setter function in React?

  > Answer: React schedules a re-render of the component with the new state value

1. What does an empty dependency array [] mean in useEffect?

  > Answer: The effect runs only once after the initial render (component mount)

1. Why should you never mutate state directly in React?

  > Answer: React won't detect the change and won't re-render the component; always use setter functions

---

## Review ##

- What is the difference between props and state in React?
- How do you properly update state in React functional components?
- When and why would you use the useEffect hook?
- What are dependency arrays and how do they control when effects run?
- How do you implement interactive features like favorites and expand/collapse with React state?
- What are some common patterns for managing complex state updates?
- How do you debug state and effect issues in React applications?
