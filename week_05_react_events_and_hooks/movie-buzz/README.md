# Movie Buzz - Week 5: React Events & Advanced Hooks

Building on Week 4's state management, this week focuses on advanced event handling patterns and the `useEffect` hook for side effects, API preparation, and performance optimization.

## What's New in Week 5

- **useEffect Hook**: Handle side effects and component lifecycle
- **Advanced Event Patterns**: Event delegation, preventDefault, stopPropagation
- **Form Handling**: Complete movie form with validation
- **Local Storage**: Persist favorites and preferences
- **Performance**: Debouncing, cleanup functions
- **API Preparation**: Simulate async operations

## Learning Objectives

- Master `useEffect` hook and dependency arrays
- Understand cleanup functions and memory management
- Implement complex event handling patterns
- Build forms with validation
- Work with browser APIs (localStorage)
- Prepare for backend integration

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
│   └── index.html              
├── src/
│   ├── components/
│   │   ├── MoviesList.js       
│   │   ├── MovieBlock.js       
│   │   ├── SearchBar.js        
│   │   ├── FilterControls.js   
│   │   └── MovieForm.js        # Add/Edit movie form (NEW)
│   ├── utils/
│   │   └── localStorage.js     # LocalStorage utilities (NEW)
│   ├── App.js                  
│   ├── App.css                 
│   ├── index.js                
│   └── index.css               
├── package.json
└── README.md
```

## Implementation Guide - TODO Placement Instructions

### Step 1: Add useEffect for Local Storage
**File: `src/App.js` (Lines 45-55)**
```javascript
import { useState, useEffect } from 'react';

function App() {
  // Existing state from Week 4...
  
  // TODO: Load favorites from localStorage on component mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('movieFavorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []); // Empty dependency array = run once on mount
  
  // TODO: Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('movieFavorites', JSON.stringify(favorites));
  }, [favorites]); // Run when favorites change
```

### Step 2: Create MovieForm Component
**File: `src/components/MovieForm.js` (Create new file)**
```javascript
import React, { useState, useEffect } from 'react';

function MovieForm({ movie, onSave, onCancel }) {
  // TODO: Create form state for all movie fields
  const [formData, setFormData] = useState({
    name: '',
    year: '',
    rating: 'PG',
    length: '',
    genre: [],
    director: '',
    stars: [],
    description: ''
  });
  
  // TODO: Add validation state
  const [errors, setErrors] = useState({});
  
  // TODO: Use useEffect to populate form when editing
  useEffect(() => {
    if (movie) {
      setFormData(movie);
    }
  }, [movie]);
  
  // TODO: Create handleChange for form inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // TODO: Clear error for this field
    setErrors(prev => ({ ...prev, [name]: '' }));
  };
  
  // TODO: Create handleSubmit with validation
  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Validate required fields
    // TODO: Call onSave if valid
  };
```

### Step 3: Add Event Handling Patterns
**File: `src/components/MovieBlock.js` (Lines 20-40)**
```javascript
function MovieBlock({ movie, onFavorite, isFavorite }) {
  // TODO: Add event handlers with proper patterns
  
  const handleCardClick = (e) => {
    // TODO: Use stopPropagation to prevent event bubbling
    if (e.target.classList.contains('favorite-btn')) {
      e.stopPropagation();
      return;
    }
    // TODO: Toggle expanded state
    setIsExpanded(!isExpanded);
  };
  
  const handleFavoriteClick = (e) => {
    // TODO: Prevent default and stop propagation
    e.preventDefault();
    e.stopPropagation();
    // TODO: Call parent's onFavorite handler
    onFavorite(movie.id);
  };
  
  const handleKeyPress = (e) => {
    // TODO: Add keyboard accessibility
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(e);
    }
  };
```

### Step 4: Implement Debounced Search
**File: `src/components/SearchBar.js` (Lines 10-25)**
```javascript
import React, { useState, useEffect } from 'react';

function SearchBar({ onSearchChange }) {
  const [localSearchTerm, setLocalSearchTerm] = useState('');
  
  // TODO: Implement debounced search with useEffect
  useEffect(() => {
    // TODO: Create delay timer
    const delayTimer = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300); // 300ms delay
    
    // TODO: Cleanup function to clear timer
    return () => clearTimeout(delayTimer);
  }, [localSearchTerm, onSearchChange]);
  
  // TODO: Handle input change
  const handleInputChange = (e) => {
    setLocalSearchTerm(e.target.value);
  };
  
  // TODO: Handle clear button
  const handleClear = () => {
    setLocalSearchTerm('');
    onSearchChange('');
  };
```

### Step 5: Create localStorage Utility
**File: `src/utils/localStorage.js` (Create new file)**
```javascript
// TODO: Create utility functions for localStorage

export const saveToStorage = (key, data) => {
  try {
    // TODO: Convert data to JSON and save
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    // TODO: Handle quota exceeded or other errors
    console.error('Failed to save to localStorage:', error);
    return false;
  }
};

export const loadFromStorage = (key, defaultValue = null) => {
  try {
    // TODO: Load and parse data from localStorage
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    // TODO: Handle parsing errors
    console.error('Failed to load from localStorage:', error);
    return defaultValue;
  }
};

export const removeFromStorage = (key) => {
  // TODO: Remove item from localStorage
  localStorage.removeItem(key);
};
```

### Step 6: Add Form Validation with useEffect
**File: `src/components/MovieForm.js` (Lines 50-70)**
```javascript
  // TODO: Validate form on field changes
  useEffect(() => {
    const newErrors = {};
    
    // TODO: Check required fields
    if (!formData.name.trim()) {
      newErrors.name = 'Movie name is required';
    }
    
    if (!formData.year || formData.year < 1900 || formData.year > 2030) {
      newErrors.year = 'Valid year is required (1900-2030)';
    }
    
    if (!formData.director.trim()) {
      newErrors.director = 'Director is required';
    }
    
    // TODO: Set validation errors
    setErrors(newErrors);
  }, [formData]);
  
  // TODO: Check if form is valid
  const isFormValid = Object.keys(errors).length === 0;
```

### Step 7: Implement Async Movie Operations
**File: `src/App.js` (Lines 80-100)**
```javascript
  // TODO: Simulate async movie operations (prep for API)
  const addMovie = async (movieData) => {
    // TODO: Show loading state
    setIsLoading(true);
    
    try {
      // TODO: Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // TODO: Add movie with generated ID
      const newMovie = {
        ...movieData,
        id: Date.now().toString()
      };
      
      // TODO: Update movies state
      setMovies(prev => [...prev, newMovie]);
      
      // TODO: Show success message
      setMessage({ type: 'success', text: 'Movie added successfully!' });
    } catch (error) {
      // TODO: Handle error
      setMessage({ type: 'error', text: 'Failed to add movie' });
    } finally {
      // TODO: Hide loading state
      setIsLoading(false);
    }
  };
```

### Step 8: Add Cleanup in useEffect
**File: `src/components/MoviesList.js` (Lines 15-30)**
```javascript
function MoviesList({ movies }) {
  const [isLoading, setIsLoading] = useState(true);
  
  // TODO: Simulate data loading with cleanup
  useEffect(() => {
    let isMounted = true; // TODO: Track if component is mounted
    
    const loadMovies = async () => {
      // TODO: Simulate async data loading
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // TODO: Only update state if component is still mounted
      if (isMounted) {
        setIsLoading(false);
      }
    };
    
    loadMovies();
    
    // TODO: Cleanup function
    return () => {
      isMounted = false; // Prevent state updates after unmount
    };
  }, []);
```

## Key Concepts to Master

### useEffect Hook
- Side effects and when to use them
- Dependency arrays and their importance
- Cleanup functions to prevent memory leaks
- Common patterns and anti-patterns

### Event Handling Patterns
- Event object methods (preventDefault, stopPropagation)
- Event delegation for performance
- Keyboard accessibility
- Synthetic events in React

### Form Management
- Controlled vs uncontrolled components
- Form validation strategies
- Multi-field forms with complex state
- File uploads and special inputs

### Performance Optimization
- Debouncing user input
- Throttling expensive operations
- Memoization basics
- When to optimize vs premature optimization

### Browser APIs
- localStorage for persistence
- sessionStorage for temporary data
- Working with JSON data
- Error handling for storage quotas

## Testing Your Implementation

1. **useEffect**: Check console for proper mount/unmount logs
2. **LocalStorage**: Refresh page and see favorites persist
3. **Debounced Search**: Type quickly and see delayed filtering
4. **Form Validation**: Try submitting with empty fields
5. **Event Handling**: Click buttons and check propagation
6. **Cleanup**: Navigate away and back, check for errors

## Common Issues and Solutions

- **Infinite loops**: Check useEffect dependencies
- **Stale closures**: Use functional setState when needed
- **Memory leaks**: Always cleanup timeouts/intervals
- **Lost focus**: Be careful with key props in lists
- **Validation timing**: Consider when to show errors

## Next Steps

Week 6 will transition to backend development with Node.js and HTTP servers, preparing for full-stack integration. The React skills from weeks 3-5 will be essential when connecting frontend to backend in later weeks.