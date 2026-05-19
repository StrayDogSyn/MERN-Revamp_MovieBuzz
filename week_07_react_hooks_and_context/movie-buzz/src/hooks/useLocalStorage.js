import { useState, useEffect } from 'react';

// ============================================================
// Week 7: Custom Hooks - useLocalStorage
// ============================================================
// This is a common pattern for persisting data across page
// refreshes. The hook syncs React state with the browser's
// localStorage so data survives when the user reloads the page.
//
// How it works:
// 1. On first render, check localStorage for existing data
// 2. If data exists, use it as initial state; otherwise use initialValue
// 3. Whenever the state changes, save it to localStorage
//
// Usage example:
//   const [favorites, setFavorites] = useLocalStorage('favorites', []);
//   // favorites persists across page refreshes!
// ============================================================

function useLocalStorage(key, initialValue) {
  // TODO: Initialize state from localStorage or use initialValue
  // The function passed to useState is called a "lazy initializer" -
  // it only runs on the first render, not on every re-render.
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return initialValue;
    }
  });

  // TODO: Use useEffect to save to localStorage whenever the value changes
  // useEffect runs after every render where key or storedValue has changed.
  // This keeps localStorage in sync with our React state.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error('Error writing to localStorage:', error);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

export default useLocalStorage;
