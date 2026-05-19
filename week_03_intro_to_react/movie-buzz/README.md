# Movie Buzz - Week 3: Intro to React

This is the starting point for the Movie Buzz application in Week 3. Students learn React fundamentals with functional components, JSX, and props using react-scripts for simple setup.

## What's Included

- **React Scripts Setup**: Simple React configuration with no build tool complexity
- **Functional Components**: App, MoviesList, and MovieBlock components
- **Static Data**: 5 hardcoded movies for learning component structure
- **Props**: Data flows from App → MoviesList → MovieBlock
- **Responsive Styling**: Clean, modern design that works on all devices

## Learning Objectives

- Understand React components and JSX syntax
- Learn about props and component composition
- Practice component-based architecture
- Build reusable UI components
- Understand React project structure

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
│   └── index.html          # HTML template
├── src/
│   ├── components/
│   │   ├── MoviesList.js   # Container for movie list
│   │   └── MovieBlock.js   # Individual movie display
│   ├── App.js              # Main app component
│   ├── App.css            # App-specific styles
│   ├── index.js           # React entry point
│   └── index.css          # Global styles
├── package.json
└── README.md
```

## Key Concepts Demonstrated

- **Components**: Reusable UI building blocks
- **JSX**: JavaScript syntax extension for writing HTML-like code
- **Props**: Passing data from parent to child components
- **Mapping**: Rendering lists of data
- **Component Composition**: Building complex UIs from simple components

## Implementation Guide - TODO Placement Instructions

### Step 1: Create the MovieBlock Component
**File: `src/components/MovieBlock.js`**
```javascript
// TODO: Create a functional component that displays a single movie
// TODO: Accept 'movie' as a prop
// TODO: Display movie name, year, rating, genre, and director
// TODO: Export the component
```

### Step 2: Create the MoviesList Component  
**File: `src/components/MoviesList.js`**
```javascript
// TODO: Import MovieBlock component from './MovieBlock'
// TODO: Create a functional component that accepts 'movies' prop
// TODO: Map over the movies array and render MovieBlock for each
// TODO: Pass each movie as a prop to MovieBlock
// TODO: Export the component
```

### Step 3: Update the App Component
**File: `src/App.js` (Line 33-35)**
```javascript
// TODO: Import MoviesList component
// TODO: Add the static movies array (provided in starter code)
// TODO: Pass movies array as prop to MoviesList component
```

### Step 4: Add Styling
**File: `src/App.css`**
- Styling is provided, students should review and understand the CSS classes

## Next Week

Week 4 will add state management with React hooks, making the application interactive with search, filtering, and user interactions.