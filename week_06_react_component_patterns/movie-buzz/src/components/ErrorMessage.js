import React from 'react';

// ============================================================
// WEEK 6 NEW: ErrorMessage - Reusable Error State Component
// ============================================================
//
// The ErrorMessage component demonstrates how to build reusable
// components that handle different UI states. When something goes
// wrong (failed API call, invalid data, etc.), you need a consistent
// way to display errors to the user.
//
// PATTERN: Conditional Rendering with Optional Callbacks
// -----------------------------------------------
// This component shows an error message and optionally provides a
// "Try Again" button. The onRetry prop is a callback function that
// the parent component provides. If onRetry is not passed, the
// retry button is not rendered.
//
// This demonstrates TWO important patterns:
// 1. Conditional rendering: {onRetry && <button>...</button>}
// 2. Callback props: Parent passes a function, child calls it on click
//
// Example usage:
//
//   // Without retry button:
//   <ErrorMessage message="Movie not found" />
//
//   // With retry button:
//   <ErrorMessage
//     message="Failed to load movies"
//     onRetry={() => {
//       setError(null);
//       fetchMovies();
//     }}
//   />
//
//   // In App.js with error state:
//   const [error, setError] = useState(null);
//
//   if (error) {
//     return <ErrorMessage message={error} onRetry={() => setError(null)} />;
//   }
//
// The CSS classes for .error-message and .btn-retry are already
// defined in App.css.
//
// Benefits:
// - Consistent error display throughout the app
// - Optional retry functionality via callback prop
// - Customizable error message

function ErrorMessage({ message, onRetry }) {
  // TODO: Build the error message component
  //
  // Step 1: Create a container div with className "error-message"
  //
  // Step 2: Display the error message (or a fallback default):
  //   <p>{message || 'Something went wrong'}</p>
  //
  // Step 3: Conditionally render a retry button
  //   Only show the button if the onRetry prop was provided:
  //   {onRetry && (
  //     <button onClick={onRetry} className="btn-retry">
  //       Try Again
  //     </button>
  //   )}
  //
  // Step 4: Test it by temporarily setting an error state in App.js:
  //   const [error, setError] = useState("Test error message");
  //   if (error) return <ErrorMessage message={error} onRetry={() => setError(null)} />;

  return (
    <div className="error-message">
      <p>{message || 'Something went wrong'}</p>
      {/* TODO: Add retry button if onRetry prop exists */}
      {onRetry && (
        <button onClick={onRetry} className="btn-retry">
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;
