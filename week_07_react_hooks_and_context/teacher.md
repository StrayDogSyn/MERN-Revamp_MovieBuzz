# Week 7 - Advanced React Hooks & Context API #

- [Week 7 - Advanced React Hooks & Context API](#week-7---advanced-react-hooks--context-api)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Teaching Strategy](#teaching-strategy)
  - [Simple Examples - Teaching Notes](#simple-examples---teaching-notes)
  - [Advanced Hooks Deep Dive](#advanced-hooks-deep-dive)
  - [Context API Implementation](#context-api-implementation)
  - [Movie Buzz Global State](#movie-buzz-global-state)
  - [Common Student Challenges](#common-student-challenges)
  - [Performance Considerations](#performance-considerations)
  - [Code Review Checklist](#code-review-checklist)
  - [Exit Ticket](#exit-ticket)
  - [Assessment Rubric](#assessment-rubric)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students now have solid React fundamentals and understand component patterns. This week introduces advanced state management concepts that are crucial for building large-scale React applications. Students will learn useReducer for complex state logic, Context API for global state management, and how to create custom hooks for reusable logic. This prepares them for the transition to backend development while giving them professional-grade React skills.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Master useEffect for side effects and cleanup
- Create custom hooks for reusable logic
- Use Context API for global state management
- Implement useReducer for complex state
- Optimize performance with useMemo and useCallback
- Structure React applications with proper state management
- Apply advanced React patterns in the Movie Buzz application

---

## Glossary ##

- `useReducer`: Hook for managing complex state logic with actions and reducers
- `Context API`: React feature for sharing data between components without prop drilling
- `Custom Hook`: User-defined hook that encapsulates reusable stateful logic
- `Provider`: Component that supplies context values to child components
- `Consumer`: Component that subscribes to context changes
- `Reducer`: Pure function that takes state and action, returns new state
- `Action`: Object that describes what happened, typically with type and payload
- `useMemo`: Hook for memoizing expensive calculations
- `useCallback`: Hook for memoizing function references

---

## Teaching Strategy ##

### Phase 1: Simple Examples (20 minutes)
1. **useReducer Demo**: Start with simple counter to show reducer pattern
2. **Context Setup**: Build theme context with provider/consumer pattern
3. **Custom Hook**: Extract counter logic into reusable hook
4. **Live Coding**: Students follow along with each example

### Phase 2: Concept Deep Dive (25 minutes)
1. **useReducer vs useState**: When to use each, complexity comparison
2. **Context Patterns**: Provider setup, multiple contexts, context composition
3. **Custom Hook Patterns**: Data fetching, local storage, form handling
4. **Performance**: When to optimize, common pitfalls

### Phase 3: Movie Buzz Enhancement (30 minutes)
1. **Global State**: Implement theme context for dark/light mode
2. **Favorites Context**: Global favorites management across components
3. **Custom Hooks**: Create useMovies hook for data management
4. **Integration**: Connect all pieces together

### Phase 4: Review and Optimization (15 minutes)
1. **Performance Review**: Identify optimization opportunities
2. **Code Organization**: Proper file structure for hooks and context
3. **Best Practices**: Common patterns and anti-patterns
4. **Exit Ticket**: Assessment of understanding

---

## Simple Examples - Teaching Notes ##

### Example 1: useReducer Counter
**Teaching Focus**: Understanding reducer pattern and actions
- **Start Simple**: Basic increment/decrement actions
- **Explain Actions**: Object with type property, optional payload
- **Reducer Function**: Pure function, no side effects, immutable updates
- **State Shape**: Show how state can be object instead of primitive

**Key Points to Emphasize**:
```javascript
// Action creators help prevent typos
const increment = () => ({ type: 'increment' });
const decrement = () => ({ type: 'decrement' });
const reset = () => ({ type: 'reset' });

// Reducer handles all state transitions
function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { count: state.count + 1 };  // Always return new object
    // ...
  }
}
```

### Example 2: Theme Context
**Teaching Focus**: Provider/Consumer pattern and global state
- **Context Creation**: `createContext()` with default value
- **Provider Setup**: Wrap components that need context
- **Consumer Hook**: `useContext()` to access values
- **State in Context**: Provider can have its own state

**Common Mistakes to Address**:
- Forgetting to wrap components with Provider
- Using context for frequently changing data
- Not providing default values

### Example 3: Custom Hook
**Teaching Focus**: Extracting reusable stateful logic
- **Hook Rules**: Must start with "use", only call at top level
- **Return Values**: What custom hooks should return
- **Reusability**: Same hook, different components, independent state
- **Composition**: Custom hooks can use other hooks

**Demo Pattern**:
```javascript
// Before: Logic in component
function Component() {
  const [count, setCount] = useState(0);
  const increment = () => setCount(c => c + 1);
  // ... rest of logic
}

// After: Logic in custom hook
function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue);
  const increment = () => setCount(c => c + 1);
  return { count, increment };
}
```

---

## Advanced Hooks Deep Dive ##

### useReducer Teaching Strategy:
1. **Start with useState limitations**: Complex state updates, multiple related state variables
2. **Introduce reducer pattern**: Predictable state transitions, easier testing
3. **Action patterns**: Standard action object shape, action creators
4. **Use cases**: Form state, shopping cart, game state

### Context API Teaching Strategy:
1. **Problem identification**: Prop drilling pain points
2. **Context solution**: Global state without libraries
3. **Provider pattern**: Single source of truth
4. **Performance implications**: Context updates trigger re-renders

### Custom Hooks Teaching Strategy:
1. **Identify repetition**: Same stateful logic in multiple components
2. **Extraction process**: Move logic to custom hook
3. **Interface design**: What should the hook return?
4. **Testing**: Custom hooks are easier to test in isolation

---

## Context API Implementation ##

### Movie Buzz Context Structure:
```
src/
├── contexts/
│   ├── ThemeContext.js      // Dark/light mode
│   ├── FavoritesContext.js  // Global favorites
│   └── MovieContext.js      // Movie data and operations
├── hooks/
│   ├── useMovies.js         // Movie CRUD operations
│   ├── useLocalStorage.js   // Persistent storage
│   └── useTheme.js          // Theme management
```

### Implementation Order:
1. **Theme Context**: Start with simple boolean state
2. **Favorites Context**: Array of movie IDs with add/remove operations
3. **Movie Context**: Complex state with loading, error, data
4. **Custom Hooks**: Extract common patterns

---

## Movie Buzz Global State ##

### Theme Context Implementation:
```javascript
// ThemeContext.js
const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [isDark, setIsDark] = useState(false);

  const value = {
    isDark,
    toggleTheme: () => setIsDark(!isDark),
    theme: isDark ? 'dark' : 'light'
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
```

### Favorites Context Implementation:
```javascript
// FavoritesContext.js
const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useLocalStorage('favorites', []);

  const addFavorite = (movieId) => {
    setFavorites(prev => [...prev, movieId]);
  };

  const removeFavorite = (movieId) => {
    setFavorites(prev => prev.filter(id => id !== movieId));
  };

  const isFavorite = (movieId) => {
    return favorites.includes(movieId);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addFavorite,
      removeFavorite,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
}
```

---

## Common Student Challenges ##

### 1. Understanding useReducer
**Problem**: Students think useReducer is always better than useState
**Solution**: Show comparison chart of when to use each
**Rule of Thumb**:
- useState: Simple state, independent updates
- useReducer: Complex state, related updates, state machines

### 2. Context Performance
**Problem**: Putting everything in context causes unnecessary re-renders
**Solution**: Multiple contexts for different concerns, context splitting
**Demo**: Show component re-render with React DevTools

### 3. Custom Hook Dependencies
**Problem**: Infinite loops in custom hooks with useEffect
**Solution**: Proper dependency arrays, useCallback for functions
**Practice**: Fix broken custom hooks together

### 4. Provider Placement
**Problem**: Providers too low in component tree
**Solution**: Provider hierarchy planning, context consumers
**Visual**: Draw component tree with provider boundaries

---

## Performance Considerations ##

### When to Optimize:
1. **Context updates frequently**: Split contexts by update frequency
2. **Large component trees**: Memoize context values
3. **Expensive calculations**: Use useMemo for computed values
4. **Function recreation**: Use useCallback for event handlers

### Optimization Patterns:
```javascript
// Memoize context value
const value = useMemo(() => ({
  theme,
  toggleTheme
}), [theme]);

// Memoize expensive calculations
const expensiveValue = useMemo(() => {
  return expensiveCalculation(data);
}, [data]);

// Memoize callbacks
const handleClick = useCallback(() => {
  doSomething(id);
}, [id]);
```

---

## Code Review Checklist ##

### Hook Usage:
- [ ] useReducer used for complex state logic
- [ ] Custom hooks follow naming convention (useXxx)
- [ ] Proper dependency arrays in useEffect
- [ ] Context used appropriately (not for frequently changing data)

### State Management:
- [ ] State lifted to appropriate level
- [ ] No unnecessary prop drilling
- [ ] Context providers at correct component level
- [ ] Related state managed together

### Performance:
- [ ] Context values memoized when appropriate
- [ ] Expensive calculations memoized
- [ ] Function references stable with useCallback
- [ ] No unnecessary re-renders

### Code Organization:
- [ ] Contexts in separate files
- [ ] Custom hooks in hooks directory
- [ ] Clear separation of concerns
- [ ] Proper file naming conventions

---

## Exit Ticket ##

### Questions for Student Assessment:

1. **useReducer vs useState**: "When would you choose useReducer over useState? Provide a specific example from the Movie Buzz application."

2. **Context API**: "Explain how the Context API solves prop drilling. What are the potential downsides of using context?"

3. **Custom Hooks**: "Create a custom hook called `useToggle` that manages boolean state with toggle, setTrue, and setFalse functions."

4. **Performance**: "How would you prevent unnecessary re-renders when using Context API? Show an example."

### Expected Answers:
1. Complex state with multiple sub-values, state transitions that depend on previous state
2. Provides global state without prop drilling; downside is unnecessary re-renders
3. Should return object with boolean value and control functions
4. Memoize context values, split contexts, use React.memo for components

---

## Assessment Rubric ##

### Exceeds Expectations (4):
- Implements complex state management with useReducer
- Creates multiple contexts with proper provider hierarchy
- Builds sophisticated custom hooks with proper dependencies
- Demonstrates understanding of performance optimization
- Code is clean, well-organized, and follows React best practices

### Meets Expectations (3):
- Successfully implements useReducer for state management
- Uses Context API to eliminate prop drilling
- Creates functional custom hooks
- Movie Buzz application enhanced with global state
- Understands when to use each hook

### Approaching Expectations (2):
- Implements basic useReducer with guidance
- Context API usage works but may not be optimal
- Custom hooks function but may have dependency issues
- Partial completion of Movie Buzz enhancements
- Basic understanding but inconsistent application

### Below Expectations (1):
- Struggles with useReducer concepts
- Context API implementation has significant issues
- Custom hooks don't work properly or have infinite loops
- Movie Buzz application not successfully enhanced
- Requires significant guidance for basic implementations

### Additional Notes:
- Focus on understanding over just working code
- Encourage experimentation with different patterns
- Look for proper separation of concerns
- Assess ability to debug hook-related issues
- Provide feedback on state management architecture decisions