# Week 3 - Intro to React #

- [Week 3 - Intro to React](#week-3---intro-to-react)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [What is React?](#what-is-react)
  - [Setting Up React](#setting-up-react)
  - [Creating Your First Component](#creating-your-first-component)
  - [Understanding JSX](#understanding-jsx)
  - [Converting Movie Buzz to React](#converting-movie-buzz-to-react)
    - [Creating the Movie Component](#creating-the-movie-component)
    - [Creating the Movies List Component](#creating-the-movies-list-component)
    - [Building the App Component](#building-the-app-component)
  - [Props: Passing Data Between Components](#props-passing-data-between-components)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students are transitioning from traditional server-side development to modern client-side React development. This is a significant shift that introduces component-based architecture earlier in the curriculum. Students should have basic JavaScript knowledge and familiarity with HTML/CSS. This is their first exposure to React, so emphasis should be on understanding the fundamental concepts rather than complex implementations.

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

Students should have completed Week 2 with NPM & HTTP knowledge. They're now ready to learn modern frontend development with React. Emphasize that we're moving to industry-standard practices used by major companies.

Create a new directory for this week's work:

```bash
mkdir movie-buzz-react
cd movie-buzz-react
```

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
>> Expect: Components can be reused across multiple pages, reducing code duplication. Updates to a component automatically apply everywhere it's used. Easier to maintain and debug.

---

## Setting Up React ##

**Important**: Since students don't have internet access, we'll create the React app manually. Walk through each step carefully.

Let's create a React application manually by setting up all the necessary files and dependencies ourselves.

First, create the basic project structure:

```bash
mkdir public src
touch package.json public/index.html src/index.js src/App.js src/App.css
```

**Teaching Tip**: Explain each folder's purpose as you create them.

Now, let's create our `package.json` file manually. Have students type this exactly:

```json
{
  "name": "movie-buzz-react",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "^5.0.1"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

Install the dependencies:

```bash
npm install
```

**Watch for**: Students may get installation errors if they don't have the packages available locally. Make sure React packages are pre-installed on their systems.

Create the HTML template in `public/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Movie Buzz React</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>
```

**Explain**: The `div` with `id="root"` is where React will render our entire application.

Create the React entry point in `src/index.js`:

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './App.css';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(<App />);
```

**Important**: Explain that this is the bridge between React and the HTML page.

Create a basic App component in `src/App.js`:

```jsx
import React from 'react';

function App() {
  return (
    <div className="App">
      <h1>🎬 Movie Buzz</h1>
      <p>React app is working!</p>
    </div>
  );
}

export default App;
```

Add some basic styles in `src/App.css`:

```css
.App {
  text-align: center;
  padding: 20px;
}
```

Start the development server:

```bash
npm start
```

Students should see their React app at `http://localhost:3000`

> `Consider This`  
> How is this different from the Node/Express servers we've been running? What's handling the "server" functionality now?
>> Expect: This is a development server that serves our React application. In production, React apps are typically served as static files. The "server" is now just serving the frontend application.

---

## Creating Your First Component ##

**Teaching Tip**: Start simple and build up complexity. Emphasize the function syntax (no class components).

Create a new file `src/MovieBlock.js`:

```jsx
function MovieBlock() {
  return (
    <div className="movie-block">
      <h3>Sample Movie</h3>
      <p>This is a sample movie component</p>
    </div>
  );
}

export default MovieBlock;
```

Update `src/App.js`:

```jsx
import MovieBlock from './MovieBlock';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>🎬 Movie Buzz</h1>
      <h4>Where all the best movies live...</h4>
      <MovieBlock />
      <MovieBlock />
      <MovieBlock />
    </div>
  );
}

export default App;
```

> `Consider This`  
> Notice how we can reuse the same component multiple times. What advantages does this give us over writing HTML directly?
>> Expect: No code duplication, consistent styling, easier to update (change once, applies everywhere), maintainable code.

---

## Understanding JSX ##

**Teaching Focus**: JSX is JavaScript, not HTML. Emphasize the differences.

JSX looks like HTML, but it's actually JavaScript. Key differences:

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

**Common Student Errors to Watch For**:

- Using `class` instead of `className`
- Forgetting to close self-closing tags
- Not capitalizing component names

---

## Converting Movie Buzz to React ##

**Teaching Strategy**: Build incrementally. Create each component step by step, testing as you go.

Let's rebuild our Movie Buzz app using React components. We'll need:

1. A component for individual movies
2. A component for the list of movies
3. The main app component

### Creating the Movie Component ###

Open `src/components/MovieBlock.js` from the starter code:

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

**Explain**: The `{ movie }` syntax is destructuring the props object.

### Creating the Movies List Component ###

Create `src/components/MoviesList.jsx`:

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

**Important**: Explain the `key` prop and why React needs it for list items.

### Building the App Component ###

Update `src/App.js`:

```jsx
import MoviesList from './components/MoviesList';
import './App.css';

// Sample movie data (we'll connect to a real API later)
const movies = [
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

---

## Props: Passing Data Between Components ##

**Teaching Focus**: Props are like function parameters. Data flows down from parent to child.

Props allow us to pass data from parent components to child components. In our example:

- `App` component passes the `movies` array to `MoviesList`
- `MoviesList` passes individual `movie` objects to `MovieBlock`
- Each `MovieBlock` receives a `movie` prop and displays its data

This creates a clear data flow: App → MoviesList → MovieBlock

> `Consider This`  
> How is passing props similar to calling a function with parameters? How is it different?
>> Expect: Similar: You're passing data into a function/component. Different: Props are an object, and the component returns JSX instead of a regular value.

---

## Final Thoughts ##

**Emphasize the Industry Relevance**: This component-based approach is used by companies like Netflix, Airbnb, Facebook, and thousands of others.

We've successfully converted our Movie Buzz app from static HTML to a React component-based architecture! This approach gives us:

- Reusable components
- Clear data flow through props
- Easier maintenance and updates
- Industry-standard development practices

Next week, we'll learn about managing changing data with React state and hooks.

---

## Exit Ticket ##

Access code: atom51

Instruct students to open the exit ticket for this week in the LMS. You may read through the questions with the students, but do not give the students the answers to the questions. Once all students have answered the questions, you may ask students for the correct answer.

1. What is React primarily used for?

    > Answer: Building user interfaces for web applications

2. What does JSX stand for?

    > Answer: JavaScript XML

3. How do you pass data from a parent component to a child component?

    > Answer: Using props

4. What must component names start with in React?

    > Answer: A capital letter

---

## Review ##

- What is React and why is it used in modern web development?
- What is a `component` in React?
- What is `JSX` and how is it different from HTML?
- How do `props` allow components to communicate?
- What are the advantages of component-based architecture over static HTML?
