# Week 5 - React Events & Hooks #

- [Week 5 - React Events & Hooks](#week-5---react-events--hooks)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [Advanced Event Handling](#advanced-event-handling)
  - [More React Hooks](#more-react-hooks)
    - [useEffect with Cleanup](#useeffect-with-cleanup)
    - [Custom Hooks](#custom-hooks)
  - [Enhancing Movie Buzz](#enhancing-movie-buzz)
    - [Adding Search Functionality](#adding-search-functionality)
    - [Adding Delete Functionality](#adding-delete-functionality)
    - [Adding Edit Functionality](#adding-edit-functionality)
  - [Event Handling Best Practices](#event-handling-best-practices)
  - [State Management Patterns](#state-management-patterns)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students now have solid React fundamentals with components, props, basic state management, and simple event handling. This week deepens their React knowledge by introducing advanced event handling patterns, more complex useEffect usage, and custom hooks. Students will transform their Movie Buzz app into a fully-featured CRUD application (without database persistence yet). This prepares them for backend integration in coming weeks.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Handle complex user interactions and events in React
- Use useEffect for cleanup and advanced lifecycle management
- Create and use custom hooks for reusable logic
- Implement search, edit, and delete functionality in React
- Apply best practices for event handling and state management
- Create functional React components that manage multiple types of state

---

## Glossary ##

- `Event Delegation`: A technique where you handle events at a parent level instead of individual child elements
- `Custom Hook`: A JavaScript function that uses React hooks and can be shared between components
- `Cleanup Function`: A function returned by useEffect to clean up resources when a component unmounts
- `Debouncing`: A technique to delay function execution until after a specified time has passed
- `Controlled vs Uncontrolled`: Components where React controls the form data vs. the DOM controlling it
- `State Lifting`: Moving state up to a common parent component to share between siblings

---

## Starting Point ##

Students should have a working Movie Buzz app from Week 4 with:
- Add movie functionality
- Basic useState and useEffect
- Form handling

Verify starting point before proceeding:
```bash
npm start
```

**Important**: Make sure all students can add movies successfully before moving forward.

---

## Advanced Event Handling ##

**Teaching Focus**: Build on Week 4's basic event handling with more sophisticated patterns.

Let's explore more sophisticated event handling patterns that you'll commonly use in React applications.

### Event Object Properties ###

**Demonstrate Live**: Show these properties in the browser console.

React's SyntheticEvent provides consistent behavior across browsers:

```jsx
function handleInputChange(e) {
  console.log('Event type:', e.type);
  console.log('Target element:', e.target);
  console.log('Current value:', e.target.value);
  console.log('Element name:', e.target.name);
}
```

### Preventing Default Behavior ###

**Critical Concept**: Students must understand when and why to prevent default behavior.

For forms and links, you often need to prevent default browser behavior:

```jsx
function handleSubmit(e) {
  e.preventDefault(); // Prevents form from refreshing the page
  // Your custom logic here
}

function handleLinkClick(e) {
  e.preventDefault(); // Prevents navigation
  // Custom navigation logic
}
```

### Event Propagation ###

**Advanced Topic**: Explain bubbling with a practical example.

Sometimes you need to stop events from bubbling up to parent elements:

```jsx
function handleButtonClick(e) {
  e.stopPropagation(); // Stops event from reaching parent
  console.log('Only this handler runs');
}
```

**Teaching Tip**: Create a nested div example to demonstrate event bubbling visually.

---

## More React Hooks ##

### useEffect with Cleanup ###

**Important Safety Topic**: Emphasize memory leak prevention.

Some effects need cleanup to prevent memory leaks:

```jsx
import React, { useState, useEffect } from 'react';

function Timer() {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(seconds => seconds + 1);
    }, 1000);

    // Cleanup function
    return () => clearInterval(interval);
  }, []); // Empty dependency array means this runs once on mount

  return <div>Seconds: {seconds}</div>;
}
```

**Teaching Strategy**: Build the Timer component together as a demonstration before applying to Movie Buzz.

### Custom Hooks ###

**Advanced Concept**: Start simple, show the value through reusability.

Custom hooks let you extract and reuse stateful logic:

```jsx
// Custom hook for managing form input
function useInput(initialValue) {
  const [value, setValue] = useState(initialValue);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const reset = () => {
    setValue(initialValue);
  };

  return {
    value,
    onChange: handleChange,
    reset
  };
}

// Using the custom hook
function MyForm() {
  const name = useInput('');
  const email = useInput('');

  return (
    <form>
      <input 
        type="text" 
        placeholder="Name"
        value={name.value}
        onChange={name.onChange}
      />
      <input 
        type="email" 
        placeholder="Email"
        value={email.value}
        onChange={email.onChange}
      />
      <button type="button" onClick={() => {
        name.reset();
        email.reset();
      }}>
        Reset Form
      </button>
    </form>
  );
}
```

**Teaching Note**: Custom hooks are advanced. Focus on the concept rather than expecting mastery.

---

## Enhancing Movie Buzz ##

**Teaching Strategy**: Build features incrementally. Test each one before moving to the next.

Let's add more interactive features to our Movie Buzz application.

### Adding Search Functionality ###

**Start Here**: Search is the most straightforward addition.

Create a new component `src/components/SearchBar.js`:

```jsx
import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    onSearch('');
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {searchTerm && (
        <button onClick={handleClearSearch} className="clear-search">
          Clear
        </button>
      )}
    </div>
  );
}

export default SearchBar;
```

**Key Teaching Points**:
- Real-time search (onChange)
- Conditional rendering for clear button
- Lifting search state to parent

### Adding Delete Functionality ###

**Important**: Emphasize user confirmation for destructive actions.

Update your `MovieBlock.js` component to include a delete button:

```jsx
function MovieBlock({ movie, onDelete }) {
  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${movie.name}"?`)) {
      onDelete(movie.id || movie.name); // Use id if available, otherwise name
    }
  };

  return (
    <div className="movie-block">
      <h3>{movie.name}</h3>
      <p>{movie.year} • {movie.rating} • {movie.length}</p>
      <p><em>{movie.description}</em></p>
      <p><b>Genre:</b> {movie.genre.join(', ')}</p>
      <p><b>Stars:</b> {movie.stars.join(', ')}</p>
      <p><b>Director:</b> {movie.director}</p>
      <div className="movie-actions">
        <button onClick={handleDelete} className="delete-btn">
          Delete Movie
        </button>
      </div>
    </div>
  );
}
```

**Teaching Focus**: Always confirm destructive actions with users.

### Adding Edit Functionality ###

**Most Complex Feature**: Take time to explain the edit/add mode pattern.

Create an edit mode for the MovieForm component. Update `MovieForm.jsx`:

```jsx
import React, { useState, useEffect } from 'react';

function MovieForm({ onAddMovie, onUpdateMovie, onCancel, editingMovie }) {
  const [movieData, setMovieData] = useState({
    name: '',
    year: '',
    rating: '',
    length: '',
    description: '',
    genre: '',
    director: '',
    stars: ''
  });

  // Populate form when editing
  useEffect(() => {
    if (editingMovie) {
      setMovieData({
        ...editingMovie,
        genre: editingMovie.genre.join(', '),
        stars: editingMovie.stars.join(', '),
        year: editingMovie.year.toString()
      });
    }
  }, [editingMovie]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMovieData({
      ...movieData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const processedMovie = {
      ...movieData,
      genre: movieData.genre.split(',').map(g => g.trim()),
      stars: movieData.stars.split(',').map(s => s.trim()),
      year: parseInt(movieData.year)
    };
    
    if (editingMovie) {
      onUpdateMovie({ ...processedMovie, id: editingMovie.id });
    } else {
      onAddMovie(processedMovie);
    }
    
    // Reset form
    setMovieData({
      name: '',
      year: '',
      rating: '',
      length: '',
      description: '',
      genre: '',
      director: '',
      stars: ''
    });
  };

  return (
    <div className="movie-form">
      <h2>{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          value={movieData.name}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="number"
          name="year"
          placeholder="Year"
          value={movieData.year}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="text"
          name="rating"
          placeholder="Rating (e.g., PG-13)"
          value={movieData.rating}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="text"
          name="length"
          placeholder="Length (e.g., 120 minutes)"
          value={movieData.length}
          onChange={handleInputChange}
          required
        />
        
        <textarea
          name="description"
          placeholder="Description"
          value={movieData.description}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="text"
          name="genre"
          placeholder="Genre (comma-separated)"
          value={movieData.genre}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movieData.director}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="text"
          name="stars"
          placeholder="Stars (comma-separated)"
          value={movieData.stars}
          onChange={handleInputChange}
          required
        />
        
        <div className="form-buttons">
          <button type="submit">
            {editingMovie ? 'Update Movie' : 'Add Movie'}
          </button>
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default MovieForm;
```

**Critical Teaching Points**:
- useEffect to populate form for editing
- Conditional rendering based on edit mode
- Data transformation between arrays and strings

**Students Will Struggle With**: Converting between array format (for display) and string format (for form inputs). Take time to explain this.

Now update your main `App.js` to handle all these new features:

```jsx
import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import MovieForm from './components/MovieForm';
import SearchBar from './components/SearchBar';
import './App.css';

const initialMovies = [
  {
    id: 1,
    name: "The Matrix",
    year: 1999,
    rating: "R",
    length: "136 minutes",
    description: "A computer hacker learns about the true nature of reality.",
    genre: ["Action", "Sci-Fi"],
    director: "The Wachowskis",
    stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
  },
  {
    id: 2,
    name: "Inception",
    year: 2010,
    rating: "PG-13",
    length: "148 minutes",
    description: "A thief who steals corporate secrets through dream-sharing technology.",
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    stars: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"]
  }
];

function App() {
  const [movies, setMovies] = useState(initialMovies);
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [nextId, setNextId] = useState(3);

  useEffect(() => {
    console.log(`Total movies: ${movies.length}`);
  }, [movies]);

  const handleAddMovie = (newMovie) => {
    const movieWithId = { ...newMovie, id: nextId };
    const updatedMovies = [...movies, movieWithId];
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
    setNextId(nextId + 1);
    setShowForm(false);
  };

  const handleUpdateMovie = (updatedMovie) => {
    const updatedMovies = movies.map(movie =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    );
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
    setEditingMovie(null);
    setShowForm(false);
  };

  const handleDeleteMovie = (movieId) => {
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
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

**Teaching Strategy**: This App.js update is complex. Go through it section by section:
1. New state variables
2. Handler functions
3. Updated JSX structure

**Don't Forget**: Update MoviesList.jsx to pass the new props to MovieBlock components.

---

## Event Handling Best Practices ##

**Essential Professional Skills**: Emphasize these patterns for clean code.

1. **Use descriptive function names**: `handleSubmit`, `handleInputChange`, not just `onClick`

2. **Prevent memory leaks**: Always clean up event listeners in useEffect

3. **Avoid inline functions for complex logic**: Extract to separate functions

4. **Use callback functions properly**: Pass functions, not function calls
   ```jsx
   // Good
   <button onClick={handleClick}>Click me</button>
   
   // Bad (calls function immediately)
   <button onClick={handleClick()}>Click me</button>
   ```

5. **Handle edge cases**: Check for null values, empty arrays, etc.

**Common Student Mistake**: Calling functions instead of passing them. Watch for this!

---

## State Management Patterns ##

**Industry Best Practices**: These patterns prevent bugs and make code maintainable.

As your app grows, consider these patterns:

1. **Lift state up**: Move state to the lowest common ancestor
2. **Single source of truth**: Don't duplicate state across components  
3. **Immutable updates**: Always create new objects/arrays when updating state
4. **Separate concerns**: Keep different types of state in different useState calls

**Teaching Emphasis**: Point out how we're following these patterns in our Movie Buzz app.

---

## Final Thoughts ##

**Celebrate the Achievement**: Students have built a sophisticated React application!

We've significantly enhanced our Movie Buzz app with advanced React features:

- Complex event handling and user interactions
- Search functionality with real-time filtering
- Full CRUD operations (Create, Read, Update, Delete)
- Custom hooks for reusable logic
- Advanced useEffect patterns with cleanup

Our app now demonstrates professional-level React development patterns that you'll use in real-world applications.

> `Consider This`  
> How has managing multiple pieces of state changed the complexity of our application? What patterns help keep it manageable?
>> Expect: More state means more complexity, but patterns like lifting state up and single source of truth help manage it. Breaking into smaller components also helps.

---

## Exit Ticket ##

Access code: grid42

Instruct students to open the exit ticket for this week in the LMS. You may read through the questions with the students, but do not give the students the answers to the questions. Once all students have answered the questions, you may ask students for the correct answer.

1. What does a cleanup function in useEffect prevent?
  > Answer: Memory leaks and performance issues
2. What is a custom hook?
  > Answer: A JavaScript function that uses React hooks and can be shared between components
3. When should you use e.preventDefault()?
  > Answer: When you want to stop the default browser behavior (like form submission or link navigation)
4. What pattern helps you avoid duplicating state across components?
  > Answer: Single source of truth / Lifting state up

---

## Review ##

- How do you handle complex user interactions in React?
- What is a custom hook and when would you create one?
- When do you need cleanup functions in useEffect?
- How do you implement search functionality in a React app?
- What are the best practices for event handling in React?
- How do you manage multiple related pieces of state?