# Week 3 - Intro to React #

- [Week 3 - Intro to React](#week-3---intro-to-react)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [What is React?](#what-is-react)
  - [Understanding the Starter Code](#understanding-the-starter-code)
  - [Creating Your First Component - Simple Examples](#creating-your-first-component---simple-examples)
  - [Creating Your First Movie Component](#creating-your-first-movie-component)
  - [Understanding JSX](#understanding-jsx)
  - [Creating the Movies List Component](#creating-the-movies-list-component)
  - [Adding Sample Movie Data](#adding-sample-movie-data)
  - [Adding Netflix-Style Movie Card Styling](#adding-netflix-style-movie-card-styling)
  - [Props: Passing Data Between Components](#props-passing-data-between-components)
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

- Explain what React is and why it's used in modern web development
- Create and export React functional components
- Understand and use JSX syntax
- Pass props between React components
- Transform static HTML into reusable React components
- Set up a basic React application structure

---

## Glossary ##

- `React`: A JavaScript library for building user interfaces, particularly single-page applications where data changes over time
- `Component`: A reusable piece of UI that can accept inputs (props) and return React elements describing what should appear on screen
- `JSX`: JavaScript XML - a syntax extension that allows you to write HTML-like code in JavaScript
- `Props`: Short for "properties" - a way of passing data from parent components to child components
- `Functional Component`: A JavaScript function that returns JSX to describe what should be rendered

---

## Starting Point ##

Before we begin this lesson, we'll be working with the provided starter code for our Movie Buzz React app. Navigate to the `week_03_intro_to_react/movie-buzz` directory.

Install the dependencies and start the development server:

```bash
cd week_03_intro_to_react/movie-buzz
npm install
npm start
```

You should see a basic app with a Netflix-style dark theme and a placeholder message. We'll be building the movie components during this lesson!

---

## What is React? ##

React is a JavaScript library developed by Facebook (now Meta) for building user interfaces. It allows developers to create reusable UI components and efficiently update the user interface when data changes.

Key benefits of React:

- **Component-based**: Build encapsulated components that manage their own state
- **Reusable**: Write once, use anywhere approach
- **Virtual DOM**: Efficient updates to the actual DOM
- **Industry Standard**: Used by major companies worldwide

React represents a shift from traditional server-side rendering to client-side component-based architecture, which is the current industry standard for modern web applications.

> `Consider This`  
> Why might building with reusable components be more efficient than writing individual HTML pages?

---

## Understanding the Starter Code ##

Let's examine what we have in our starter code:

1. **App.js**: Contains our main App component with a Netflix-style header
2. **App.css**: Basic Netflix-inspired dark theme styling  
3. **index.js**: React entry point that renders our App
4. **public/index.html**: Basic HTML template

Notice the dark Netflix-style theme we're starting with! The app currently shows a placeholder message because we haven't built our movie components yet.

> `Consider This`  
> How is this different from the Node/Express servers we've been running? What's handling the "server" functionality now?

---

## Creating Your First Component - Simple Examples ##

Before we build our movie components, let's start with simple examples to understand how React components work.

### Example 1: A Simple Greeting Component ###

Create a new file `src/components/Greeting.js`:

```jsx
// A simple component that displays a greeting
function Greeting() {
  return (
    <div>
      <h1>Hello, React!</h1>
      <p>Welcome to component-based development</p>
    </div>
  );
}

export default Greeting;
```

### Example 2: Component with Props ###

Now let's make it dynamic. Create `src/components/Welcome.js`:

```jsx
// A component that accepts props to customize the greeting
function Welcome({ name, age }) {
  return (
    <div>
      <h2>Welcome, {name}!</h2>
      <p>You are {age} years old.</p>
    </div>
  );
}

export default Welcome;
```

To use these components in your App.js:

```jsx
import Greeting from './components/Greeting';
import Welcome from './components/Welcome';

function App() {
  return (
    <div>
      <Greeting />
      <Welcome name="Sarah" age={25} />
      <Welcome name="John" age={30} />
    </div>
  );
}

export default App;
```

> `Try It Out`
> Create these simple components and test them in your app before moving on to the movie components. Notice how props allow us to reuse the same component with different data!

## Creating Your First Movie Component ##

Now that you understand the basics, let's build out our movie component. Open `src/components/MovieBlock.js` from the starter code:

### Code Structure Explanation ###

Before we write the code, let's understand what this component will do:

- **Purpose**: Display information about a single movie
- **Input**: Receives a movie object as a prop
- **Output**: Returns JSX that renders the movie information
- **Reusability**: Can be used for any movie object with the same structure

```jsx
import React from "react";

function MovieBlock({ movie, index }) {
  return (
    <div className="trending-card">
      <img src="/images/movie-placeholder.png" className="card-image" alt={movie.name} />

      <span className="card-rank">{index + 1}</span>

      <div className="card-content">
        <span className="card-title">{movie.name}</span>

        <div className="card-info">
          {movie.year} | {movie.length} | Rated: {movie.rating}
        </div>

        <div className="card-meta">
          <span className="card-genre">
            {Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}
          </span>
          <span className="card-director">Director: {movie.director}</span>
        </div>
      </div>
    </div>
  );
}

export default MovieBlock;
```

### Line-by-Line Breakdown ###

1. **Function Declaration**: `function MovieBlock({ movie, index })`
   - Creates a functional component named MovieBlock
   - Uses destructuring to extract `movie` and `index` from the props object
   - Equivalent to: `function MovieBlock(props)` and then `const { movie, index } = props`

2. **Props**: `movie` and `index`
   - `movie` is the full movie object (name, year, genre, etc.)
   - `index` is the position in the list (0, 1, 2...) — used to display a rank number

3. **JSX Expressions**: `{movie.name}`, `{movie.year}`, etc.
   - Curly braces `{}` let you embed JavaScript expressions in JSX
   - React automatically converts the value to text

4. **Array Display**: `Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre`
   - `movie.genre` is an array like `["Action", "Sci-Fi"]`
   - `.join(', ')` converts it to a string: `"Action, Sci-Fi"`
   - The `Array.isArray()` check prevents errors if the value isn't an array

5. **Export Statement**: `export default MovieBlock`
   - Makes this component available for import in other files
   - `default` means this is the main export from this file

### Expected Movie Data Structure ###

```javascript
const movie = {
  name: "The Matrix",
  year: 1999,
  rating: "R",
  length: "136 min",
  description: "A computer hacker learns...",
  genre: ["Action", "Sci-Fi"],
  director: "The Wachowskis",
  stars: ["Keanu Reeves", "Laurence Fishburne"]
};
```

Notice how this component accepts a `movie` prop and displays its properties!

> `Consider This`  
> What is the `{ movie }` syntax in the function parameters? How does this differ from regular JavaScript function parameters?

---

## Understanding JSX ##

JSX looks like HTML, but it's actually JavaScript. Key differences to remember:

- Use `className` instead of `class`
- Self-closing tags must end with `/>`
- JavaScript expressions go inside `{}`
- Component names must start with a capital letter

```jsx
function Example() {
  const movieTitle = "The Matrix";
  
  return (
    <div className="movie">
      <h3>{movieTitle}</h3>
      <img src="/movie-icon.png" alt="Movie icon" />
    </div>
  );
}
```

---

## Creating the Movies List Component ##

Now let's create a component to display a list of movies. Create `src/components/MoviesList.js`:

```jsx
import React from "react";
import "./MoviesList.css";
import MovieBlock from './MovieBlock';

function MoviesList({ movies }) {
  return (
    <div className="trending-section">
      <h2 className="trending-title">Your Movie Collection ({movies.length} movies)</h2>
      <p className="trending-subtitle">Discover and manage your favorite films</p>

      <div className="trending-cards">
        {movies.map((movie, index) => (
          <MovieBlock key={movie.id} movie={movie} index={index} />
        ))}
      </div>
    </div>
  );
}

export default MoviesList;
```

> `Consider This`  
> What is the `.map()` method doing here? Why do we need the `key` prop?

## Adding Sample Movie Data ##

Now let's add some sample movie data to our App component. Update `src/App.js`:

```jsx
import React from 'react';
import MoviesList from './components/MoviesList';
import './App.css';

// Sample movie data for Week 3
const movies = [
  {
    id: 1,
    name: "The Matrix",
    year: 1999,
    rating: "R",
    length: "136 minutes",
    description: "A computer programmer is led to fight an underground war against powerful computers who have constructed his entire reality with a system called the Matrix.",
    genre: ["Action", "Sci-Fi"],
    director: "The Wachowskis",
    stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
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
    stars: ["Marlon Brando", "Al Pacino", "James Caan"]
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
    stars: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
  },
  {
    id: 4,
    name: "The Dark Knight",
    year: 2008,
    rating: "PG-13",
    length: "152 minutes",
    description: "When the menace known as The Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    genre: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    stars: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  },
  {
    id: 5,
    name: "Forrest Gump",
    year: 1994,
    rating: "PG-13",
    length: "142 minutes",
    description: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
    genre: ["Drama", "Romance"],
    director: "Robert Zemeckis",
    stars: ["Tom Hanks", "Robin Wright", "Gary Sinise"]
  }
];

function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>🎬 Movie Buzz</h1>
        <p>Where all the best movies live...</p>
      </header>

      <main className="app-main">
        <MoviesList movies={movies} />
      </main>
    </div>
  );
}

export default App;
```

## Adding Netflix-Style Movie Card Styling ##

Now let's add some beautiful Netflix-inspired styling to make our movie cards look professional. This CSS is already provided for you in `src/components/MoviesList.css` — open it to see how the classes connect to the JSX you just wrote:

```css
/* Netflix-style movie section */
.trending-section {
  background: #000;
  padding: 40px 20px;
  border-radius: 24px;
  margin: 20px;
}

.trending-title {
  color: rgb(194, 143, 41);
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.trending-subtitle {
  color: #ccc;
  font-size: 1.1rem;
  margin-bottom: 24px;
  font-style: italic;
}

/* Horizontal scrolling card row */
.trending-cards {
  display: flex;
  gap: 32px;
  padding: 20px 0;
  overflow-x: auto;
}

/* Individual movie card */
.trending-card {
  position: relative;
  width: 280px;
  min-width: 280px;
  border-radius: 18px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  background: #222;
  transition: transform 0.2s;
  cursor: pointer;
}

.trending-card:hover {
  transform: scale(1.05);
}

.card-image {
  width: 100%;
  height: 320px;
  object-fit: cover;
  display: block;
}

.card-rank {
  position: absolute;
  left: 12px;
  top: 12px;
  font-size: 4.5rem;
  font-weight: 900;
  color: #fff;
  text-shadow: 2px 2px 8px #000;
}

/* Card content overlays the image */
.card-content {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  padding: 16px;
  background: linear-gradient(0deg, rgba(0,0,0,0.95) 80%, transparent 100%);
  color: #fff;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 8px;
  display: block;
  letter-spacing: 1px;
}

.card-info {
  margin-bottom: 8px;
  font-size: 0.9rem;
  color: rgb(194, 143, 41);
  font-weight: 500;
}

.card-meta {
  margin-bottom: 12px;
  font-size: 0.85rem;
}

.card-genre {
  color: #ccc;
  display: block;
  margin-bottom: 4px;
}

.card-director {
  color: #ccc;
  display: block;
}
```

---

## Props: Passing Data Between Components ##

Props allow us to pass data from parent components to child components. In our example:

- `App` component passes the `movies` array to `MoviesList`
- `MoviesList` passes individual `movie` objects to `MovieBlock`
- Each `MovieBlock` receives a `movie` prop and displays its data

This creates a clear data flow: App → MoviesList → MovieBlock

> `Consider This`  
> How is passing props similar to calling a function with parameters? How is it different?

---

## Final Thoughts ##

We've successfully built our Movie Buzz app using React components with a Netflix-inspired design! This approach gives us:

- Reusable components (MovieBlock, MoviesList)
- Clear data flow through props
- Professional Netflix-style UI
- Responsive design that works on all devices
- Industry-standard development practices

Your app should now display beautiful movie cards in a grid layout that looks similar to Netflix!

Next week, we'll learn about managing changing data with React state and connecting to real APIs.

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Review ##

- What is React and why is it used in modern web development?
- What is a `component` in React?
- What is `JSX` and how is it different from HTML?
- How do `props` allow components to communicate?
- What are the advantages of component-based architecture over static HTML?
