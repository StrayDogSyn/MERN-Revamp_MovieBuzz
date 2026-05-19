import React from 'react';

// ============================================================
// WEEK 6 NEW: LoadingSpinner - Conditional Rendering Pattern
// ============================================================
//
// The LoadingSpinner component demonstrates how to build reusable
// UI state components. In real applications, you often need to show
// loading indicators while data is being fetched from an API.
//
// PATTERN: Conditional Rendering
// -----------------------------------------------
// This pattern involves showing different UI based on state values.
// A loading spinner is shown when isLoading is true, and the actual
// content is shown when loading is complete.
//
// Example usage in App.js or any parent component:
//
//   function App() {
//     const [isLoading, setIsLoading] = useState(true);
//     const [movies, setMovies] = useState([]);
//
//     // Simulate loading data
//     useEffect(() => {
//       setTimeout(() => {
//         setMovies(initialMovies);
//         setIsLoading(false);
//       }, 2000);
//     }, []);
//
//     // Conditional rendering: show spinner OR content
//     if (isLoading) {
//       return <LoadingSpinner message="Loading your movies..." />;
//     }
//
//     return <MoviesList movies={movies} />;
//   }
//
// The CSS classes for .loading-spinner, .spinner, and the @keyframes
// spin animation are already defined in App.css.
//
// Benefits:
// - Reusable across any component that needs a loading state
// - Customizable message via props
// - Consistent loading UI throughout the app

function LoadingSpinner({ message = 'Loading...' }) {
  // TODO: Build the loading spinner component
  //
  // Step 1: Create a centered container div with className "loading-spinner"
  //
  // Step 2: Inside the container, add a spinning element:
  //   <div className="spinner"></div>
  //   (The CSS animation is already defined in App.css)
  //
  // Step 3: Display the loading message below the spinner:
  //   <p>{message}</p>
  //
  // Step 4: Test it by temporarily setting isLoading to true in App.js
  //   and rendering <LoadingSpinner message="Fetching movies..." />

  return (
    <div className="loading-spinner">
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}

export default LoadingSpinner;
