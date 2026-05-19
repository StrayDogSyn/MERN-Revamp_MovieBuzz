# Week 4 - React State & Hooks #

- [Week 4 - React State & Hooks](#week-4---react-state--hooks)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [What is State?](#what-is-state)
  - [Understanding Hooks](#understanding-hooks)
  - [The useState Hook](#the-usestate-hook)
  - [Adding Interactivity to Movie Buzz](#adding-interactivity-to-movie-buzz)
    - [Creating a Movie Form Component](#creating-a-movie-form-component)
    - [Managing Form State](#managing-form-state)
    - [Adding Movies to the List](#adding-movies-to-the-list)
  - [The useEffect Hook](#the-useeffect-hook)
  - [Event Handling in React](#event-handling-in-react)
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

- Explain what state is in React and why it's important
- Use the useState hook to manage component state
- Use the useEffect hook for side effects and lifecycle events
- Handle user input and form submissions in React
- Update state to create interactive user interfaces
- Understand the difference between props and state

---

## Glossary ##

- `State`: Data that changes over time in a React component and triggers re-renders when updated
- `Hook`: A special function that lets you "hook into" React features like state and lifecycle methods
- `useState`: A React hook that allows functional components to manage state
- `useEffect`: A React hook that lets you perform side effects in functional components
- `Event Handler`: A function that runs in response to user interactions like clicks or form submissions
- `Controlled Component`: A form element whose value is controlled by React state

---

## Starting Point ##

Before we begin this lesson, navigate to the `week_04_react_state_and_hooks/movie-buzz` directory. This contains your Movie Buzz app from Week 3, with some starter components already set up.

```bash
cd week_04_react_state_and_hooks/movie-buzz
npm install
npm start
```

Your app should be displaying a list of movies using React components and props from last week. We'll be adding state management and interactivity to this existing app!

---

## What is State? ##

State is data that can change over time in your React component. Unlike props, which are passed down from parent components and don't change within the component, state is owned and managed by the component itself.

Think of state as the component's memory. When state changes, React automatically re-renders the component to reflect the new data.

Examples of state in a movie app:

- Whether a form is visible or hidden
- The current values in form inputs
- The list of movies (when we can add/remove them)
- Loading status when fetching data

> `Consider This`
> Why might we need data that changes over time in a user interface? What happens in traditional HTML when you want to update content?

---

## Understanding Hooks ##

Hooks are special functions that let you use React features in functional components. They always start with the word "use" (like `useState`, `useEffect`).

Rules of Hooks:

1. Only call hooks at the top level of your component
2. Don't call hooks inside loops, conditions, or nested functions
3. Only call hooks from React functions

We'll focus on two essential hooks today: `useState` and `useEffect`.

---

## The useState Hook ##

The `useState` hook lets you add state to functional components. Here's the basic syntax:

### Code Structure Explanation ###

Before we dive into the useState syntax, let's understand what we're building:

- **Purpose**: Create a functional component that can store and update data over time
- **Input**: Initial value for the state (can be string, number, boolean, object, array)
- **Output**: Returns an array with [currentStateValue, functionToUpdateState]
- **Key Variables**:
  - `stateName` - holds the current state value
  - `setStateName` - function to update the state
- **Benefits**: Enables dynamic, reactive user interfaces without DOM manipulation

```jsx
// 1. Import React and the useState hook from the React library
import React, { useState } from 'react';

// 2. Define a functional component (modern React pattern)
function MyComponent() {
  // 3. Destructure the useState return value into state variable and setter function
  const [stateName, setStateName] = useState(initialValue);
  // Breaking down line above:
  // - useState() returns an array with exactly 2 elements
  // - [stateName, setStateName] uses array destructuring
  // - stateName: current value of the state
  // - setStateName: function to update the state value
  // - initialValue: what the state starts as (string, number, object, etc.)

  // 4. Return JSX that can use and modify the state
  return (
    // JSX that uses stateName to display data
    // and setStateName to update data on user interaction
  );
}
```

### Line-by-Line Breakdown ###

**Line 1**: `import React, { useState } from 'react';`

- Imports the main React library and specifically extracts the useState hook
- This import is required in any component file that uses JSX or React features
- The curly braces use ES6 destructuring to extract specific functions from React

**Line 3**: `function MyComponent() {`

- Declares a functional component using standard JavaScript function syntax
- Component names must start with a capital letter (React requirement)
- This is the modern way to create React components (preferred over class components)

**Line 4**: `const [stateName, setStateName] = useState(initialValue);`

- **useState(initialValue)**: Calls the hook with starting value, returns [value, setter]
- **Array destructuring**: Extracts the two elements into named variables
- **stateName**: Variable holding current state value (read-only)
- **setStateName**: Function to update state (triggers re-render when called)
- **Naming convention**: setter function always starts with "set" + capitalized state name

**Return statement**: JSX that can display stateName and call setStateName on events

## Simple State Examples - Building Understanding ##

Before adding state to our Movie Buzz app, let's practice with simple examples:

### Example 1: Counter Component ###

#### Code Structure Explanation - Counter ####

Before implementing the counter, let's understand what we're building:

- **Purpose**: Create an interactive counter that responds to button clicks
- **State**: Single number value starting at 0
- **User Actions**: Increment (+1), Decrement (-1), Reset (back to 0)
- **Re-rendering**: Component updates display automatically when count changes
- **Benefits**: Demonstrates basic state management and event handling patterns

Create `src/components/Counter.js`:

```jsx
// 1. Import React and useState hook for state management
import React, { useState } from 'react';

// 2. Define Counter component as a function
function Counter() {
  // 3. Initialize state with useState hook
  const [count, setCount] = useState(0);
  // Breakdown:
  // - count: current counter value (starts at 0)
  // - setCount: function to update the counter
  // - useState(0): hook that returns [0, setterFunction] initially

  // 4. Return JSX with counter display and control buttons
  return (
    <div>
      {/* 5. Display current count value using JSX expression */}
      <p>Count: {count}</p>

      {/* 6. Increment button with onClick event handler */}
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>

      {/* 7. Decrement button with onClick event handler */}
      <button onClick={() => setCount(count - 1)}>
        Decrement
      </button>

      {/* 8. Reset button that sets count back to 0 */}
      <button onClick={() => setCount(0)}>
        Reset
      </button>
    </div>
  );
}

// 9. Export component for use in other files
export default Counter;
```

#### Line-by-Line Breakdown - Counter ####

**Line 5**: `const [count, setCount] = useState(0);`

- Creates state variable `count` initialized to 0
- Creates setter function `setCount` to update the count
- When setCount is called, React schedules a re-render with the new value

**Line 9**: `<p>Count: {count}</p>`

- Displays current count value inside JSX expression {}
- This automatically updates when count state changes
- JSX expressions can contain any valid JavaScript that returns a value

**Line 12**: `<button onClick={() => setCount(count + 1)}>`

- onClick prop accepts a function to run when button is clicked
- Arrow function `() =>` creates an inline event handler
- `setCount(count + 1)` updates state by adding 1 to current count
- React will re-render component with new count value

**Line 16**: `<button onClick={() => setCount(count - 1)}>`

- Similar to increment, but subtracts 1 from current count
- Shows how the same pattern works for different operations

**Line 20**: `<button onClick={() => setCount(0)}>`

- Resets count to 0 regardless of current value
- Demonstrates setting state to a fixed value instead of calculating from current state

#### Data Flow Example - Counter ####

1. Initial render: count = 0, displays "Count: 0"
2. User clicks Increment: setCount(0 + 1) called
3. React re-renders: count = 1, displays "Count: 1"
4. User clicks Reset: setCount(0) called
5. React re-renders: count = 0, displays "Count: 0"

### Example 2: Toggle Component ###

#### Code Structure Explanation - Toggle ####

Before building the toggle, let's understand the concept:

- **Purpose**: Show/hide content based on user interaction
- **State**: Boolean value (true = visible, false = hidden)
- **User Action**: Click button to toggle visibility
- **Conditional Rendering**: JSX appears/disappears based on state
- **Benefits**: Demonstrates boolean state and conditional rendering patterns

Create `src/components/Toggle.js`:

```jsx
// 1. Import React and useState for state management
import React, { useState } from 'react';

// 2. Define Toggle component
function Toggle() {
  // 3. Initialize boolean state for visibility control
  const [isVisible, setIsVisible] = useState(true);
  // Breakdown:
  // - isVisible: boolean tracking if content should show (starts true)
  // - setIsVisible: function to toggle the visibility
  // - useState(true): initializes state to true (content visible by default)

  // 4. Return JSX with toggle button and conditional content
  return (
    <div>
      {/* 5. Button that toggles visibility and shows dynamic text */}
      <button onClick={() => setIsVisible(!isVisible)}>
        {/* 6. Conditional text based on current state */}
        {isVisible ? 'Hide' : 'Show'} Content
      </button>

      {/* 7. Conditional rendering - content only shows when isVisible is true */}
      {isVisible && <p>This content can be toggled!</p>}
    </div>
  );
}

// 8. Export component for use elsewhere
export default Toggle;
```

#### Line-by-Line Breakdown - Toggle ####

**Line 6**: `const [isVisible, setIsVisible] = useState(true);`

- Creates boolean state variable starting as `true`
- `isVisible` holds current visibility state
- `setIsVisible` function updates the boolean value
- Starting with `true` means content is visible initially

**Line 11**: `<button onClick={() => setIsVisible(!isVisible)}>`

- onClick event handler toggles the boolean state
- `!isVisible` uses logical NOT operator to flip true↔false
- If isVisible is true, !isVisible becomes false (and vice versa)
- This creates the toggle behavior

**Line 13**: `{isVisible ? 'Hide' : 'Show'} Content`

- Ternary operator for conditional text display
- If isVisible is true, shows "Hide Content"
- If isVisible is false, shows "Show Content"
- Button text changes to reflect what action clicking will perform

**Line 16**: `{isVisible && <p>This content can be toggled!</p>}`

- Logical AND operator for conditional rendering
- When isVisible is true: true && `<p>`... renders the paragraph
- When isVisible is false: false && `<p>`... renders nothing
- This is a common React pattern for show/hide functionality

#### Boolean State Toggle Pattern ####

1. Initial state: isVisible = true, content shows, button says "Hide Content"
2. Click button: setIsVisible(!true) = setIsVisible(false)
3. Re-render: isVisible = false, content hidden, button says "Show Content"
4. Click again: setIsVisible(!false) = setIsVisible(true)
5. Re-render: back to step 1

#### Alternative Approaches ####

```jsx
// Using separate functions instead of inline handlers:
const handleToggle = () => {
  setIsVisible(!isVisible);
};

// Using if/else instead of ternary:
let buttonText;
if (isVisible) {
  buttonText = 'Hide';
} else {
  buttonText = 'Show';
}
```

### Example 3: Text Input Component ###

#### Code Structure Explanation - Text Input ####

Before implementing text input handling, let's understand the concepts:

- **Purpose**: Create a controlled input that responds to user typing
- **State**: String value that updates as user types
- **Controlled Component**: Input value is controlled by React state, not DOM
- **Event Handling**: onChange event updates state with each keystroke
- **Benefits**: Real-time feedback, input validation, character counting

Create `src/components/TextInput.js`:

```jsx
// 1. Import React and useState for managing input state
import React, { useState } from 'react';

// 2. Define TextInput component
function TextInput() {
  // 3. Initialize string state for the input value
  const [text, setText] = useState('');
  // Breakdown:
  // - text: current value in the input field (starts empty)
  // - setText: function to update the input value
  // - useState(''): initializes with empty string

  // 4. Return JSX with controlled input and live feedback
  return (
    <div>
      {/* 5. Controlled input element */}
      <input
        type="text"                           // Input accepts text
        value={text}                         // Value controlled by state
        onChange={(e) => setText(e.target.value)}  // Update state on change
        placeholder="Type something..."      // Hint text when empty
      />

      {/* 6. Real-time display of current input */}
      <p>You typed: {text}</p>

      {/* 7. Character count using string length property */}
      <p>Character count: {text.length}</p>
    </div>
  );
}

// 8. Export component for use in other files
export default TextInput;
```

#### Line-by-Line Breakdown - Text Input ####

**Line 6**: `const [text, setText] = useState('');`

- Creates state variable for input text, starting as empty string
- `text` holds whatever user has typed
- `setText` updates the state when user types
- Empty string '' ensures input starts blank

**Line 13**: `value={text}`

- Makes this a "controlled component" - React controls the input value
- Input always displays exactly what's in state
- Without this, input would be "uncontrolled" (DOM manages value)
- This ensures React state is the "single source of truth"

**Line 14**: `onChange={(e) => setText(e.target.value)}`

- Event handler runs every time user types a character
- `e` is the event object containing information about the change
- `e.target` refers to the input element that triggered the event
- `e.target.value` is the current text in the input field
- `setText(e.target.value)` updates state with the new text

**Line 18**: `<p>You typed: {text}</p>`

- Displays current state value in real-time
- Updates immediately as user types (because state changes trigger re-renders)
- JSX expression {text} inserts the current text value

**Line 21**: `<p>Character count: {text.length}</p>`

- Uses JavaScript string .length property to count characters
- Updates live as user types
- Demonstrates how you can derive information from state

#### Controlled vs Uncontrolled Components ####

##### Controlled (our example) #####

```jsx
// React state controls the value
<input value={text} onChange={(e) => setText(e.target.value)} />
```

##### Uncontrolled (not recommended for most cases) #####

```jsx
// DOM controls the value, React reads it when needed
<input ref={inputRef} />
// Would need: const inputRef = useRef();
```

#### Event Object Structure ####

When user types "Hello", the event object contains:

```javascript
{
  target: {
    value: "Hello",    // What user typed
    type: "text",     // Input type
    name: "...",      // Input name if set
    // ... other properties
  },
  // ... other event properties
}
```

#### Data Flow Example - Text Input ####

1. Initial render: text = "", input shows placeholder
2. User types "H": onChange fires with e.target.value = "H"
3. setText("H") called, component re-renders
4. Input shows "H", paragraph shows "You typed: H", count shows "1"
5. User types "e": onChange fires with e.target.value = "He"
6. setText("He") called, component re-renders with updated values

> `Try It Out`
> Create and test these components before moving on. Notice how:
>
> - State changes trigger re-renders
> - Each component manages its own state independently
> - The setter function (setCount, setIsVisible, setText) updates the state
>
> `Consider This`
> What happens when you click the button? How does React know to update the display?

---

## Converting Static Data to State ##

First, let's convert our static movie data to use React state. This will allow us to add, remove, and modify movies dynamically.

### State Management Overview ###

Before we implement state management, let's understand what we're building:

- **Purpose**: Manage a dynamic list of movies that can be modified
- **State Variable**: `movies` - holds the array of movie objects
- **State Setter**: `setMovies` - function to update the movies array
- **Initial Value**: Sample movie data to start with
- **Benefit**: Movies can now be added, removed, or edited dynamically

### Code Structure Explanation - Converting to State ###

Before converting to state, let's understand what we're accomplishing:

- **Purpose**: Transform static movie data into dynamic state that can be modified
- **Input**: Array of movie objects with properties like name, year, rating, etc.
- **State Management**: movies array becomes reactive - changes trigger re-renders
- **Data Structure**: Each movie object contains id, name, year, rating, length, description, genre[], director, stars[]
- **Benefits**: Enables adding, removing, and updating movies dynamically

Update your `src/App.js` to use the `useState` hook:

```jsx
// 1. Import React and the useState hook for state management
import React, { useState } from 'react';
// 2. Import our MoviesList component for displaying movies
import MoviesList from './components/MoviesList';
// 3. Import CSS for styling the application
import './App.css';

// 4. Initial sample movie data - defined outside component to prevent recreation on re-renders
const initialMovies = [
  {
    id: 1,                    // Unique identifier for React's key prop (required for lists)
    name: "The Matrix",       // Movie title string
    year: 1999,              // Release year as number for sorting/filtering
    rating: "R",             // MPAA rating as string
    length: "136 minutes",   // Duration as formatted string for display
    description: "A computer hacker learns about the true nature of reality.",
    genre: ["Action", "Sci-Fi"],  // Array of genre strings (allows multiple genres)
    director: "The Wachowskis",   // Director name(s) as string
    stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]  // Array of actor names
  },
  {
    id: 2,                    // Different unique ID
    name: "Inception",
    year: 2010,
    rating: "PG-13",
    length: "148 minutes",
    description: "A thief who steals corporate secrets through dream-sharing technology.",
    genre: ["Action", "Sci-Fi", "Thriller"],  // Can have multiple genres
    director: "Christopher Nolan",
    stars: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"]
  }
];

// 5. Main App component definition
function App() {
  // 6. Initialize state with useState hook - converts static data to dynamic state
  const [movies, setMovies] = useState(initialMovies);
  // Detailed breakdown of line above:
  // - movies: current state value (the array of movie objects)
  // - setMovies: function to update the state (triggers re-render when called)
  // - useState(initialMovies): hook that returns [currentValue, setterFunction]
  // - initialMovies: initial value for the state (our sample movie data)
  // - This makes the movie list dynamic - we can now add/remove/edit movies

  // 7. Return JSX structure for the entire application
  return (
    <div className="app">
      {/* 8. Header section with app title and description */}
      <header className="app-header">
        <h1>🎬 Movie Buzz</h1>
        <p>Your favorite movies, all in one place</p>
      </header>

      {/* 9. Main content area containing the movies list */}
      <main className="app-main">
        {/* 10. Pass movies state as props to MoviesList component */}
        <MoviesList movies={movies} />
      </main>
    </div>
  );
}

// 11. Export App component as default export for use in index.js
export default App;
```

#### Line-by-Line Breakdown - Static to State ####

**Lines 1-3**: Import statements

- `React, { useState }`: Imports React library and specifically extracts useState hook
- `MoviesList`: Imports the component that will display our movie list
- `'./App.css'`: Imports CSS file for styling (relative path)

**Lines 8-30**: `const initialMovies = [...]`

- Defined outside component to prevent recreation on every render
- Array of movie objects with consistent structure
- Each movie has same properties but different values
- `genre` and `stars` are arrays to allow multiple values
- `id` property essential for React's key prop when rendering lists

**Line 35**: `const [movies, setMovies] = useState(initialMovies);`

- **useState(initialMovies)**: Initializes state with our sample data
- **Array destructuring**: Extracts [currentValue, setterFunction] from useState return
- **movies**: Current state value - starts as initialMovies, changes when setMovies called
- **setMovies**: Function to update state - calling it triggers component re-render
- This conversion from static data to state enables dynamic functionality

**Line 45**: `<MoviesList movies={movies} />`

- Passes current movies state as props to MoviesList component
- When movies state changes, MoviesList automatically receives updated data
- This creates the data flow: App state → MoviesList props → individual movie displays

#### Data Structure Deep Dive ####

##### Movie Object Properties #####

```javascript
{
  id: Number,           // Unique identifier (1, 2, 3, etc.)
  name: String,         // "The Matrix"
  year: Number,         // 1999 (number for easy sorting)
  rating: String,       // "R", "PG-13", "PG", etc.
  length: String,       // "136 minutes" (formatted for display)
  description: String,  // Plot summary
  genre: Array,         // ["Action", "Sci-Fi"] - multiple allowed
  director: String,     // "Christopher Nolan"
  stars: Array          // ["Actor1", "Actor2"] - multiple actors
}
```

#### Static vs State Comparison ####

##### Static Movies Before State #####

```jsx
const movies = [...]; // Fixed data, never changes
<MoviesList movies={movies} /> // Always shows same movies
```

##### Dynamic Movies After State #####

```jsx
const [movies, setMovies] = useState([...]); // Dynamic data
<MoviesList movies={movies} /> // Can show different movies as state changes
// Later we can: setMovies([...movies, newMovie]); // Add movies
```

> `Consider This`
> What's the difference between the static `movies` constant we had before and the `movies` state variable we have now?

## Adding Interactivity to Movie Buzz ##

Now let's make our Movie Buzz app interactive by adding the ability to create new movies. We'll need to manage state for:

1. Whether the add form is visible
2. The form input values
3. The list of movies (which we just converted to state)

### Creating a Movie Form Component ###

#### Code Structure Explanation - Movie Form ####

Before building the movie form, let's understand the complex state management involved:

- **Purpose**: Create a form that collects all movie data and submits it to parent component
- **State**: Object containing all form fields (name, year, rating, etc.)
- **Props**: onAddMovie (callback to submit data), onCancel (callback to close form)
- **Data Transformation**: Convert comma-separated strings to arrays for genre/stars
- **Form Handling**: Controlled inputs, validation, submission, and reset functionality
- **Benefits**: Reusable form component that integrates with any movie management system

Create a new file `src/components/MovieForm.js`:

```jsx
// 1. Import React and useState for managing complex form state
import React, { useState } from 'react';

// 2. MovieForm component with props for communication with parent
function MovieForm({ onAddMovie, onCancel }) {
  // Props breakdown:
  // - onAddMovie: function passed from parent to handle new movie submission
  // - onCancel: function passed from parent to handle form cancellation

  // 3. Initialize form state as object containing all movie fields
  const [movieData, setMovieData] = useState({
    name: '',        // Movie title (string)
    year: '',        // Release year (string in form, converted to number later)
    rating: '',      // MPAA rating (string)
    length: '',      // Duration (string with "minutes")
    description: '', // Plot summary (string)
    genre: '',       // Genres as comma-separated string (converted to array later)
    director: '',    // Director name (string)
    stars: ''        // Actors as comma-separated string (converted to array later)
  });
  // State structure matches form inputs but uses strings for easier handling
  // We'll transform data types on submission

  // 4. Generic input change handler for all form fields
  const handleInputChange = (e) => {
    // 5. Destructure name and value from the input that triggered the event
    const { name, value } = e.target;
    // name: corresponds to the "name" attribute of the input (e.g., "title", "year")
    // value: current text value in the input field

    // 6. Update state using spread operator to preserve other fields
    setMovieData({
      ...movieData,    // Spread existing state to keep all current values
      [name]: value    // Update only the field that changed (computed property name)
    });
    // This pattern ensures we don't lose other form data when updating one field
  };

  // 7. Form submission handler
  const handleSubmit = (e) => {
    // 8. Prevent default form submission (which would reload the page)
    e.preventDefault();

    // 9. Transform form data into proper movie object format
    const newMovie = {
      ...movieData,    // Spread all form data
      // 10. Convert comma-separated genre string to array
      genre: movieData.genre.split(',').map(g => g.trim()),
      // split(',') creates array from "Action, Sci-Fi" -> ["Action", " Sci-Fi"]
      // map(g => g.trim()) removes extra spaces -> ["Action", "Sci-Fi"]

      // 11. Convert comma-separated stars string to array
      stars: movieData.stars.split(',').map(s => s.trim()),

      // 12. Convert year string to number for proper data type
      year: parseInt(movieData.year)
    };

    // 13. Call parent function to add the movie
    onAddMovie(newMovie);

    // 14. Reset form to initial empty state after successful submission
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

  // 15. Return JSX form with controlled inputs
  return (
    <div className="movie-form">
      <h2>Add New Movie</h2>
      {/* 16. Form with onSubmit handler */}
      <form onSubmit={handleSubmit}>

        {/* 17. Movie name input - text type for title */}
        <input
          type="text"                    // Text input for movie title
          name="name"                   // Corresponds to movieData.name
          placeholder="Movie Name"      // Hint text when empty
          value={movieData.name}        // Controlled by state
          onChange={handleInputChange} // Updates state on every keystroke
          required                      // HTML5 validation - field must be filled
        />

        {/* 18. Year input - number type for numeric validation */}
        <input
          type="number"                 // Number input with up/down arrows
          name="year"                   // Corresponds to movieData.year
          placeholder="Year"            // Hint text
          value={movieData.year}        // Controlled by state
          onChange={handleInputChange} // Updates state
          required                      // Required field
        />

        {/* 19. Rating input - text type for MPAA ratings */}
        <input
          type="text"
          name="rating"
          placeholder="Rating (e.g., PG-13)"
          value={movieData.rating}
          onChange={handleInputChange}
          required
        />

        {/* 20. Length input - text type for formatted duration */}
        <input
          type="text"
          name="length"
          placeholder="Length (e.g., 120 minutes)"
          value={movieData.length}
          onChange={handleInputChange}
          required
        />

        {/* 21. Description textarea - larger input for longer text */}
        <textarea
          name="description"            // Corresponds to movieData.description
          placeholder="Description"     // Hint text
          value={movieData.description} // Controlled by state
          onChange={handleInputChange} // Updates state
          required                      // Required field
        />

        {/* 22. Genre input - comma-separated text converted to array */}
        <input
          type="text"
          name="genre"
          placeholder="Genre (comma-separated)"  // Instructions for user
          value={movieData.genre}
          onChange={handleInputChange}
          required
        />

        {/* 23. Director input - text type for director name */}
        <input
          type="text"
          name="director"
          placeholder="Director"
          value={movieData.director}
          onChange={handleInputChange}
          required
        />

        {/* 24. Stars input - comma-separated text converted to array */}
        <input
          type="text"
          name="stars"
          placeholder="Stars (comma-separated)"  // Instructions for user
          value={movieData.stars}
          onChange={handleInputChange}
          required
        />

        {/* 25. Form action buttons */}
        <div className="form-buttons">
          {/* 26. Submit button - triggers handleSubmit */}
          <button type="submit">Add Movie</button>
          {/* 27. Cancel button - calls parent's cancel function */}
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

// 28. Export component for use in other files
export default MovieForm;
```

#### Line-by-Line Breakdown - Movie Form ####

**Line 4**: `function MovieForm({ onAddMovie, onCancel }) {`

- Defines component with props using destructuring
- `onAddMovie`: callback function to handle new movie data
- `onCancel`: callback function to close/hide the form
- These props create communication channel with parent component

**Lines 9-18**: `const [movieData, setMovieData] = useState({...});`

- Initializes state as object with all form fields
- All fields start as empty strings for consistent data type
- Object structure matches the inputs we'll create
- Single state object is easier to manage than multiple useState calls

**Lines 21-30**: `const handleInputChange = (e) => {...}`

- Generic handler works with any input by using the `name` attribute
- `const { name, value } = e.target` extracts input name and current value
- Spread operator `...movieData` preserves all existing form data
- `[name]: value` uses computed property names to update the specific field

**Lines 33-55**: `const handleSubmit = (e) => {...}`

- `e.preventDefault()` stops form from submitting traditionally (page reload)
- Data transformation converts strings to appropriate types:
  - Comma-separated strings → arrays using `split(',').map(s => s.trim())`
  - String year → number using `parseInt()`
- `onAddMovie(newMovie)` passes transformed data to parent
- Form reset clears all fields for next entry

**Lines 67-73**: Movie name input example

- `name="name"` links input to movieData.name
- `value={movieData.name}` makes it controlled (React manages value)
- `onChange={handleInputChange}` updates state on every keystroke
- `required` adds HTML5 validation

#### Data Transformation Examples ####

##### Input: "Action, Sci-Fi, Thriller" #####

```javascript
// Step 1: split on commas
"Action, Sci-Fi, Thriller".split(',')
// Result: ["Action", " Sci-Fi", " Thriller"]

// Step 2: trim whitespace
.map(g => g.trim())
// Result: ["Action", "Sci-Fi", "Thriller"]
```

##### Form State vs Final Movie Object #####

```javascript
// Form state (all strings):
{
  name: "Inception",
  year: "2010",        // String
  genre: "Action, Sci-Fi", // Comma-separated string
  stars: "Leonardo DiCaprio, Marion Cotillard"
}

// Transformed movie object:
{
  name: "Inception",
  year: 2010,          // Number
  genre: ["Action", "Sci-Fi"], // Array
  stars: ["Leonardo DiCaprio", "Marion Cotillard"] // Array
}
```

### Managing Form State ###

Notice how we use the spread operator (`...movieData`) to preserve existing form data when updating a single field. This is important because state updates in React should not mutate the original state.

### Adding Movies to the List ###

#### Code Structure Explanation - Interactive App ####

Before implementing the full interactive app, let's understand the complex state management:

- **Purpose**: Coordinate multiple components and manage both movie data and UI state
- **State Variables**:
  - `movies` - array of movie objects (data state)
  - `showForm` - boolean controlling form visibility (UI state)
- **Event Handlers**: Functions that respond to user actions and update state
- **Conditional Rendering**: Show either form or movie list based on showForm state
- **Benefits**: Complete interactive movie management with add functionality

Now let's update our main `App.js` to manage the movie list and form visibility:

```jsx
// 1. Import React and useState for managing multiple state variables
import React, { useState } from 'react';
// 2. Import components for displaying movies and adding new ones
import MoviesList from './components/MoviesList';
import MovieForm from './components/MovieForm';
// 3. Import CSS for application styling
import './App.css';

// 4. Initial sample movie data - same structure as before
const initialMovies = [
  {
    name: "The Matrix",
    year: 1999,
    rating: "R",
    length: "136 minutes",
    description: "A computer hacker learns about the true nature of reality.",
    genre: ["Action", "Sci-Fi"],    // Array format for genre
    director: "The Wachowskis",
    stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"] // Array format for stars
  },
  {
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

// 5. Main App component with multiple state management
function App() {
  // 6. State for managing the list of movies
  const [movies, setMovies] = useState(initialMovies);
  // movies: current array of movie objects
  // setMovies: function to update the movie array

  // 7. State for controlling form visibility (UI state)
  const [showForm, setShowForm] = useState(false);
  // showForm: boolean - true shows form, false shows movie list
  // setShowForm: function to toggle between form and list view

  // 8. Handler for adding a new movie to the list
  const handleAddMovie = (newMovie) => {
    // 9. Add new movie to existing array using spread operator
    setMovies([...movies, newMovie]);
    // Breakdown: [...movies, newMovie] creates new array with:
    // - All existing movies (spread from current state)
    // - Plus the new movie at the end
    // This preserves immutability (doesn't modify original array)

    // 10. Hide the form after successful movie addition
    setShowForm(false);
    // Returns user to movie list view automatically
  };

  // 11. Handler for showing the add movie form
  const handleShowForm = () => {
    setShowForm(true);
    // Changes UI to show form instead of movie list
  };

  // 12. Handler for canceling form (without adding movie)
  const handleCancelForm = () => {
    setShowForm(false);
    // Returns to movie list without saving any data
  };

  // 13. Return JSX with conditional rendering based on showForm state
  return (
    <div className="App">
      {/* 14. Header section with title and add button */}
      <header>
        <div id="title">
          <div id="title-text">
            <h1>🎬 Movie Buzz</h1>
            <h4>Where all the best movies live...</h4>
          </div>
        </div>
        <div id="add-new">
          {/* 15. Button to show the add movie form */}
          <button onClick={handleShowForm}>Add New Movie</button>
        </div>
      </header>

      {/* 16. Conditional rendering - show either form or movie list */}
      {showForm ? (
        // 17. When showForm is true, render the MovieForm component
        <MovieForm
          onAddMovie={handleAddMovie}    // Pass add handler as prop
          onCancel={handleCancelForm}    // Pass cancel handler as prop
        />
      ) : (
        // 18. When showForm is false, render the MoviesList component
        <MoviesList movies={movies} />   // Pass current movies as prop
      )}

      {/* 19. Footer always visible regardless of current view */}
      <footer>&copy; Copyright 2024 Buzzware, Inc.</footer>
    </div>
  );
}

// 20. Export App component for use in index.js
export default App;
```

#### Line-by-Line Breakdown - Interactive App ####

**Lines 36-37**: Dual state management

```jsx
const [movies, setMovies] = useState(initialMovies);  // Data state
const [showForm, setShowForm] = useState(false);      // UI state
```

- **Data state**: Manages the actual movie information
- **UI state**: Controls what the user sees (form vs list)
- Two separate concerns managed by separate state variables

**Lines 41-48**: `const handleAddMovie = (newMovie) => {...}`

- Receives new movie object from MovieForm component
- `[...movies, newMovie]` creates new array (immutable update pattern)
- Adding to end of array maintains chronological order
- `setShowForm(false)` provides smooth user experience (auto-return to list)

**Lines 51-53**: `const handleShowForm = () => {...}`

- Simple state update to switch views
- Called when user clicks "Add New Movie" button
- Changes from list view to form view

**Lines 56-58**: `const handleCancelForm = () => {...}`

- Provides escape route from form without saving
- Returns to list view without modifying movies array
- Important for good user experience

**Lines 75-85**: Conditional rendering with ternary operator

```jsx
{showForm ? (
  <MovieForm ... />    // Show this when showForm is true
) : (
  <MoviesList ... />   // Show this when showForm is false
)}
```

- **Ternary operator**: condition ? trueValue : falseValue
- Only one component renders at a time
- Both components receive appropriate props for their functionality

#### Data Flow Diagram ####

```text
User clicks "Add New Movie"
         ↓
   handleShowForm() called
         ↓
   setShowForm(true)
         ↓
Component re-renders, shows MovieForm
         ↓
User fills form and submits
         ↓
   handleAddMovie(newMovie) called
         ↓
   setMovies([...movies, newMovie])
   setShowForm(false)
         ↓
Component re-renders, shows updated MoviesList
```

#### State Management Pattern ####

##### App Before Dynamic State #####

```jsx
const movies = [...];  // Never changes
<MoviesList movies={movies} />  // Always same data
```

##### App After Dynamic State #####

```jsx
const [movies, setMovies] = useState([...]);  // Can change
const [showForm, setShowForm] = useState(false);  // UI control

// Movies can be added:
setMovies([...movies, newMovie]);

// UI can switch between views:
setShowForm(true/false);
```

#### Props vs State Summary ####

- **movies state**: Managed in App, passed as props to MoviesList
- **showForm state**: Managed in App, controls conditional rendering
- **onAddMovie prop**: Function passed to MovieForm to communicate back to App
- **onCancel prop**: Function passed to MovieForm for cancellation handling

---

## The useEffect Hook ##

The `useEffect` hook lets you perform side effects in your components, such as:

- Fetching data from an API
- Setting up subscriptions
- Manually changing the DOM
- Running cleanup code

Here's the basic syntax:

```jsx
import React, { useEffect } from 'react';

function MyComponent() {
  useEffect(() => {
    // Side effect code here
    console.log('Component mounted or updated');
  }); // Runs after every render
  
  useEffect(() => {
    console.log('Component mounted');
  }, []); // Runs only once after initial render
  
  useEffect(() => {
    console.log('Movies changed');
  }, [movies]); // Runs when movies array changes
}
```

### Code Structure Explanation - useEffect ###

Before adding useEffect, let's understand side effects and lifecycle:

- **Purpose**: Perform actions in response to component changes (side effects)
- **Side Effect**: Code that interacts with something outside the component (logging, API calls, subscriptions)
- **Dependency Array**: Controls when the effect runs - empty [] runs once, [movies] runs when movies change
- **Use Cases**: Data fetching, subscriptions, timers, logging, DOM manipulation
- **Benefits**: Clean separation of rendering logic and side effects

Let's add a `useEffect` to our App component to log when movies are added:

```jsx
// 1. Import useEffect along with React and useState
import React, { useState, useEffect } from 'react';

// 2. App component with effect for side effects
function App() {
  // 3. Existing state management
  const [movies, setMovies] = useState(initialMovies);
  const [showForm, setShowForm] = useState(false);

  // 4. useEffect hook for logging movie count changes
  useEffect(() => {
    // 5. Side effect code - runs after render
    console.log(`Total movies: ${movies.length}`);
    // This logs to browser console whenever movies array changes
    // Template literal ${movies.length} inserts current count
  }, [movies]);  // 6. Dependency array - effect runs when movies changes
  // Breakdown of dependency array:
  // - [movies]: runs when movies state changes
  // - []: would run only once after initial render
  // - no array: would run after every render (performance issue)

  // ... rest of component remains the same
}
```

#### Line-by-Line Breakdown - useEffect ####

**Line 1**: `import React, { useState, useEffect } from 'react';`

- Adds useEffect to the existing import statement
- useEffect is essential for handling side effects in functional components
- Replaces lifecycle methods from class components (componentDidMount, componentDidUpdate)

**Lines 11-15**: `useEffect(() => {...}, [movies]);`

- **First parameter**: Function containing side effect code
- **Second parameter**: Dependency array controlling when effect runs
- Effect function runs after component renders (not during rendering)
- Console.log is a side effect because it interacts with browser developer tools

**Line 13**: `console.log(\`Total movies: ${movies.length}\`);`

- Template literal syntax for string interpolation
- `${movies.length}` dynamically inserts current movie count
- Runs every time movies array changes (addition, removal, modification)

**Line 15**: `, [movies]);`

- **Dependency array**: Effect only runs when movies state changes
- React compares previous movies array to current movies array
- If different, effect runs; if same, effect is skipped
- This prevents unnecessary executions and performance issues

#### useEffect Variations ####

##### Run once on mount (empty dependency array) #####

```jsx
useEffect(() => {
  console.log('Component mounted');
}, []); // Empty array = run once
```

##### Run on every render (no dependency array) #####

```jsx
useEffect(() => {
  console.log('Component rendered');
}); // No array = run always (usually avoid this)
```

##### Run when multiple values change #####

```jsx
useEffect(() => {
  console.log('Movies or form visibility changed');
}, [movies, showForm]); // Runs when either changes
```

##### Effect with cleanup (for subscriptions, timers) #####

```jsx
useEffect(() => {
  const timer = setInterval(() => {
    console.log('Timer tick');
  }, 1000);

  // Cleanup function (prevents memory leaks)
  return () => {
    clearInterval(timer);
  };
}, []);
```

#### When This Effect Runs ####

1. **Initial render**: Logs "Total movies: 2" (our sample data)
2. **After adding movie**: Logs "Total movies: 3"
3. **After adding another**: Logs "Total movies: 4"
4. **Form visibility changes**: Effect does NOT run (not in dependency array)
5. **Component re-renders for other reasons**: Effect does NOT run (movies unchanged)

#### Side Effects Examples ####

##### Data fetching #####

```jsx
useEffect(() => {
  fetch('/api/movies')
    .then(response => response.json())
    .then(data => setMovies(data));
}, []); // Run once on mount
```

##### Document title updates #####

```jsx
useEffect(() => {
  document.title = `Movie Buzz - ${movies.length} movies`;
}, [movies]); // Update title when movie count changes
```

##### Local storage #####

```jsx
useEffect(() => {
  localStorage.setItem('movies', JSON.stringify(movies));
}, [movies]); // Save to local storage when movies change
```

---

## Event Handling in React ##

React uses SyntheticEvents, which are React's wrapper around native DOM events. Event handlers receive the event object as their first parameter.

### Code Structure Explanation - Event Handling ###

Before exploring event patterns, let's understand React's event system:

- **SyntheticEvents**: React's wrapper around native DOM events for cross-browser compatibility
- **Event Object**: Contains information about the event (target, type, value, etc.)
- **Event Handlers**: Functions that respond to user interactions
- **Parameter Passing**: Techniques for passing additional data to event handlers
- **Benefits**: Consistent behavior across browsers, React-specific optimizations

Common event handling patterns:

```jsx
// 1. Basic click handler without parameters
const handleClick = () => {
  // 2. Simple action in response to click
  console.log('Button clicked!');
  // No event parameter needed for basic actions
  // Function runs exactly as written when button is clicked
};

// 3. Handler with event parameter for accessing event data
const handleChange = (e) => {
  // 4. Extract value from the input that triggered the event
  console.log('Input value:', e.target.value);
  // e: SyntheticEvent object containing event information
  // e.target: DOM element that triggered the event
  // e.target.value: current value of input element
};

// 5. Inline handler using arrow function
<button onClick={() => setCount(count + 1)}>
  Increment
</button>
// Breakdown:
// - onClick prop receives a function
// - () => arrow function creates inline handler
// - setCount(count + 1) updates state when clicked
// - Closure captures current count value

// 6. Handler with additional parameters (requires wrapper function)
const handleDelete = (movieId) => {
  // 7. Function that receives specific movie ID
  console.log('Deleting movie:', movieId);
  // movieId: passed from the component that calls this handler
  // Allows same handler to work with different movies
};

// 8. JSX with parameter passing using arrow function wrapper
<button onClick={() => handleDelete(movie.id)}>
  Delete
</button>
// Breakdown:
// - onClick needs a function, not function call
// - () => creates wrapper that calls handleDelete with specific ID
// - movie.id passed as parameter to identify which movie to delete
```

#### Line-by-Line Breakdown - Event Handling ####

**Lines 2-5**: Basic click handler

```jsx
const handleClick = () => {
  console.log('Button clicked!');
};
```

- Simplest event handler pattern - no parameters needed
- Function name convention: "handle" + event type + optional description
- Can contain any JavaScript code (state updates, API calls, etc.)

**Lines 8-12**: Event object handler

```jsx
const handleChange = (e) => {
  console.log('Input value:', e.target.value);
};
```

- `e` parameter: SyntheticEvent object containing event details
- `e.target`: References the DOM element that triggered the event
- `e.target.value`: Gets current value from input, select, or textarea
- Common for form inputs where you need the user's input

**Lines 15-18**: Inline arrow function

```jsx
<button onClick={() => setCount(count + 1)}>
```

- Good for simple, one-line actions
- Arrow function `() =>` creates function on each render
- Closure captures current state values (count)
- Avoid for complex logic (prefer separate handler functions)

**Lines 21-30**: Parameter passing pattern

```jsx
const handleDelete = (movieId) => {
  console.log('Deleting movie:', movieId);
};

<button onClick={() => handleDelete(movie.id)}>
```

- Two-step process: define handler that accepts parameters, then wrap in arrow function
- `handleDelete(movieId)` is the actual handler function
- `() => handleDelete(movie.id)` is the wrapper that passes the specific ID
- This pattern allows reusing same handler for different items

#### Event Object Properties ####

```jsx
const handleInputChange = (e) => {
  console.log('Event type:', e.type);           // "change"
  console.log('Target element:', e.target);     // <input> element
  console.log('Input value:', e.target.value);  // "user typed text"
  console.log('Input name:', e.target.name);    // "movieName"
  console.log('Event timestamp:', e.timeStamp); // When event occurred
};
```

#### Advanced Event Patterns ####

##### Prevent default behavior #####

```jsx
const handleSubmit = (e) => {
  e.preventDefault(); // Stops form from submitting normally
  // Custom submission logic here
};
```

##### Multiple parameters #####

```jsx
const handleUpdateMovie = (movieId, field, value) => {
  console.log(`Updating movie ${movieId}: ${field} = ${value}`);
};

<input onChange={(e) => handleUpdateMovie(movie.id, 'name', e.target.value)} />
```

##### Event delegation pattern #####

```jsx
const handleButtonClick = (action, data) => {
  switch(action) {
    case 'delete':
      deleteMovie(data);
      break;
    case 'edit':
      editMovie(data);
      break;
  }
};

<button onClick={() => handleButtonClick('delete', movie.id)}>Delete</button>
<button onClick={() => handleButtonClick('edit', movie)}>Edit</button>
```

#### Performance Considerations ####

##### Avoid inline functions for complex logic #####

```jsx
// ❌ Bad: Creates new function on every render
<button onClick={() => {
  console.log('Clicked');
  setCount(count + 1);
  updateDatabase(count);
  sendAnalytics('button_click');
}}>

// ✅ Good: Separate handler function
const handleComplexClick = () => {
  console.log('Clicked');
  setCount(count + 1);
  updateDatabase(count);
  sendAnalytics('button_click');
};

<button onClick={handleComplexClick}>
```

---

## Final Thoughts ##

We've successfully added state management to our Movie Buzz app! Now our application can:

- Display and hide a form based on user interaction
- Capture user input through controlled components
- Add new movies to the list dynamically
- React to state changes and re-render accordingly

This represents the core of modern React development: managing state and responding to user interactions. Next week, we'll learn about more advanced React patterns and start connecting to backend APIs.

> `Consider This`
> How does this state-driven approach compare to manipulating the DOM directly with vanilla JavaScript? What are the advantages?

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Review ##

- What is state and how is it different from props?
- What is a React hook and what are the rules for using them?
- How do you use the `useState` hook to manage component state?
- What is the `useEffect` hook used for?
- How do you handle user input in React forms?
- What happens when state changes in a React component?
