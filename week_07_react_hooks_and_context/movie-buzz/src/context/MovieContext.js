import React, { createContext, useContext, useReducer } from 'react';

// ============================================================
// Week 7: Context API & useReducer
// ============================================================
// The Context API lets you share state across your entire
// component tree without passing props through every level.
// useReducer is like useState but for more complex state logic.
// ============================================================

// Step 1: Create the MovieContext
// createContext() creates a Context object. Components that need
// access to movie state will consume this context.
const MovieContext = createContext();

// Step 2: Define the initial state for the reducer
// This is the starting shape of our global state
const initialState = {
  movies: [],
  favorites: [],
  loading: false,
  error: null
};

// Step 3: Create the movieReducer function
// A reducer takes the current state and an action, and returns
// the NEW state. It should be a pure function (no side effects).
// IMPORTANT: Never mutate state directly - always return a new object.
//
// It should handle these action types:
// - 'SET_MOVIES': Set the movies array
// - 'ADD_MOVIE': Add a new movie to the array
// - 'UPDATE_MOVIE': Update an existing movie by id
// - 'DELETE_MOVIE': Remove a movie by id
// - 'TOGGLE_FAVORITE': Toggle a movie id in favorites array
// - 'SET_LOADING': Set loading state
// - 'SET_ERROR': Set error state

function movieReducer(state, action) {
  switch (action.type) {
    case 'SET_MOVIES':
      // TODO: Return new state with movies set to action.payload
      // Hint: return { ...state, movies: action.payload };
      return state;

    case 'ADD_MOVIE':
      // TODO: Return new state with new movie added to the movies array
      // Hint: return { ...state, movies: [...state.movies, action.payload] };
      return state;

    case 'UPDATE_MOVIE':
      // TODO: Return new state with the updated movie replaced in the array
      // Hint: Use .map() to find the movie by id and replace it
      // return { ...state, movies: state.movies.map(movie =>
      //   movie.id === action.payload.id ? action.payload : movie
      // )};
      return state;

    case 'DELETE_MOVIE':
      // TODO: Return new state with the movie removed from the array
      // Hint: Use .filter() to remove the movie by id
      // return { ...state, movies: state.movies.filter(movie =>
      //   movie.id !== action.payload
      // )};
      return state;

    case 'TOGGLE_FAVORITE':
      // TODO: Toggle the movie id in the favorites array
      // If the id is already in favorites, remove it; otherwise, add it
      // Hint:
      // const isFavorite = state.favorites.includes(action.payload);
      // return {
      //   ...state,
      //   favorites: isFavorite
      //     ? state.favorites.filter(id => id !== action.payload)
      //     : [...state.favorites, action.payload]
      // };
      return state;

    case 'SET_LOADING':
      // TODO: Return new state with loading set to action.payload
      // Hint: return { ...state, loading: action.payload };
      return state;

    case 'SET_ERROR':
      // TODO: Return new state with error set to action.payload
      // Hint: return { ...state, error: action.payload };
      return state;

    default:
      return state;
  }
}

// Step 4: Create the MovieProvider component
// This wraps children with MovieContext.Provider and provides
// both state and dispatch to all consuming components.
// useReducer returns [state, dispatch] similar to useState,
// but dispatch sends actions to the reducer instead of setting state directly.
export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, initialState);

  // The value prop makes state and dispatch available to any
  // component that calls useMovieContext()
  return (
    <MovieContext.Provider value={{ state, dispatch }}>
      {children}
    </MovieContext.Provider>
  );
}

// Step 5: Create a custom hook for easy access to the context
// This is a convenience wrapper so components don't need to
// import both useContext and MovieContext separately.
// It also provides a helpful error message if used outside the Provider.
export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error('useMovieContext must be used within a MovieProvider');
  }
  return context;
}

export default MovieContext;
