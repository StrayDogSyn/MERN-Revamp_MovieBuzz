# 🎬 Week 04: React State & Hooks — Student Guide

> 🔑 **Access Code:** `loop84`   ·   ⏱️ **Estimated Time:** 3–4 hrs   ·   🎯 **Difficulty:** ⭐⭐

---

## 🗺️ What You're Building This Week

This week you will add interactivity to individual Movie Buzz cards. Each card will gain a favorites toggle — a heart icon that flips between favorited and unfavorited when clicked — and a show/hide description toggle that expands or collapses the movie's description. Both features live entirely in the component; no database is involved yet.

> 💡 **This week in the arc:** You've already built static components that display data; now you're making those components respond to user actions, which is the foundation for every interactive feature in the rest of the course.

---

## 🎯 Learning Objectives

By the end of this week you will be able to:

- [ ] Explain what React state is and how it differs from props
- [ ] Use the `useState` hook to add and update local component state
- [ ] Write an event handler that calls a state setter correctly
- [ ] Use `useEffect` to run code in response to a state change or component mount
- [ ] Describe what triggers a React re-render and why immutable updates matter

---

## 🔑 Key Concepts

> **State**
> A piece of data that a component owns and can change over time. When state changes, React automatically re-renders the component so the UI stays in sync. Think of it as a sticky note on the fridge that React is watching — the moment you change what the note says, React redraws anything that reads from it.

> **useState**
> The React hook that creates a state variable and a setter function. You call it at the top of your component: `const [value, setValue] = useState(initialValue)`. You always update state by calling the setter — never by modifying `value` directly.

> **useEffect**
> The React hook that lets you run a side effect (anything outside the render itself — fetching data, updating the document title, reading from localStorage) after the component renders. The dependency array controls when the effect re-runs.

> **Re-render**
> React re-draws a component whenever its state or props change. Re-renders are cheap and intentional — don't be afraid of them. What you must avoid is accidentally preventing them (by mutating state instead of replacing it) or causing infinite loops (by updating state inside an effect with no dependency array).

> **Controlled Component**
> A form element whose `value` is bound to React state, so React is the single source of truth. Every keystroke calls a setter; the displayed value always reflects state.

---

## ⚙️ Setup

<details>
<summary>📦 Step-by-step environment setup</summary>

### 1. Navigate to this week's directory
```bash
cd week_04_react_state_and_hooks/movie-buzz
```

### 2. Install client dependencies
```bash
cd client && npm install
```

### 3. Start the React development server
```bash
npm start
```

### 4. Verify it's working
```bash
# Expected: browser opens to http://localhost:3000
# You should see a list of movies rendered from static data
```

</details>

<details>
<summary>✅ Pre-flight checklist — confirm before starting</summary>

- [ ] You completed Week 03 (or reviewed the reference implementation in `week_03_intro_to_react/movie-buzz-finished/`)
- [ ] Node.js v18+ is installed (`node -v`)
- [ ] `npm install` completed with no errors
- [ ] The app loads at `http://localhost:3000` without a blank screen

</details>

---

## 📚 Core Concepts

### What is State — and Why Does It Matter?

Props flow down from parent to child and are read-only inside the component that receives them. State is different: it belongs to the component that declares it, and only that component can change it. When you call a setter function, React schedules a re-render and then calls your component function again with the new value, producing updated JSX.

```javascript
// A simple example — NOT a task solution
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```

Every time the button is clicked, `setCount` is called, `count` increases by 1, React re-renders `Counter`, and the paragraph shows the updated number. The critical rule: **never do `count = count + 1`** — mutating the variable directly does not tell React anything changed.

<details>
<summary>🤔 Comprehension check — think before expanding</summary>

Before moving on, try to answer:
1. If you have `const [name, setName] = useState("Alice")` and you want the display to show "Bob", what exactly do you write?
2. If state is updated in a click handler but the screen never changes, what is the most likely mistake?

*(Discuss with your instructor if you're unsure — do not look at finished code until you have a guess)*

</details>

---

### The useState Hook — Destructuring the Pair

`useState` returns a two-element array. The convention is to destructure it immediately. The first element is the current value; the second is the function you call to update it.

```javascript
// ✅ Correct — destructure at declaration
const [isFavorited, setIsFavorited] = useState(false);

// ✅ Calling the setter toggles the boolean
const handleFavoriteClick = () => {
  setIsFavorited(!isFavorited);
};

// ❌ Wrong — mutating the variable does nothing
isFavorited = true; // React never sees this change
```

You can call `useState` multiple times in one component to manage multiple independent pieces of state.

---

### The useEffect Hook — Running Code After Render

`useEffect` takes two arguments: a callback function and a dependency array. React runs the callback after every render by default. The dependency array limits when it runs:

```javascript
// Runs once on mount only (empty dependency array)
useEffect(() => {
  console.log('Component mounted');
}, []);

// Runs every time `isFavorited` changes
useEffect(() => {
  console.log('Favorite status changed to:', isFavorited);
}, [isFavorited]);

// Runs after EVERY render (no dependency array — usually a mistake)
useEffect(() => {
  console.log('This runs constantly');
});
```

This week you will use `useEffect` to synchronize a side effect (writing to `localStorage`) with your favorites state.

<details>
<summary>🤔 Comprehension check — think before expanding</summary>

Before moving on, try to answer:
1. What happens if you call `setIsFavorited` inside a `useEffect` that lists `isFavorited` as a dependency?
2. When would you use `[]` vs `[someValue]` as the dependency array?

*(If you're unsure, talk it through with your instructor before writing any code)*

</details>

---

### Event Handlers — Where State Changes Happen

Event handlers are plain JavaScript functions that you pass to JSX event props like `onClick` and `onChange`. The key rules:

```javascript
// ✅ Pass the function reference — React calls it on click
<button onClick={handleClick}>Click me</button>

// ✅ Arrow function in JSX is fine for simple cases
<button onClick={() => setCount(count + 1)}>+</button>

// ❌ Wrong — calling the function immediately on render
<button onClick={handleClick()}>This runs immediately, not on click</button>
```

---

## 🛠️ Your Tasks

> ⚠️ **Reminder:** Implement each TODO yourself. Looking at `movie-buzz-finished/` before you've tried is the fast path to forgetting everything by next week.

### Task 1: Add a Favorites Toggle to MovieBlock

**File to edit:** `client/src/components/MovieBlock.js`

**What you're doing:** Add an `isFavorited` state variable that flips between `true` and `false` each time the user clicks the heart icon.

```javascript
// STARTER CODE — implement the TODO blocks
import { useState } from 'react';

function MovieBlock({ movie }) {
  // TODO: Declare an isFavorited state variable, initialized to false

  // TODO: Write a handleFavoriteClick function that toggles isFavorited

  return (
    <div className="movie-block">
      <div className="movie-info">
        <h3>{movie.name}</h3>
        <p>{movie.year} · {movie.director}</p>
        {/* TODO: Render a heart button that:
              - Calls handleFavoriteClick when clicked
              - Displays "❤️" when isFavorited is true
              - Displays "🤍" when isFavorited is false
        */}
      </div>
    </div>
  );
}

export default MovieBlock;
```

<details>
<summary>💡 Stuck? Expand for a hint — not an answer</summary>

- **Think about:** The toggle pattern — the new value of `isFavorited` is always the opposite of the current value.
- **Check:** Are you passing the function reference to `onClick`, or calling it immediately?
- **The pattern looks like:** `set___(!___)` inside your handler function.

</details>

---

### Task 2: Add an Expand/Collapse Description Toggle

**File to edit:** `client/src/components/MovieBlock.js`

**What you're doing:** Add a second piece of state, `isExpanded`, that controls whether the full movie description is visible. A "Show more" / "Show less" button toggles it.

```javascript
// STARTER CODE — add to your existing MovieBlock component
// (This is a continuation of Task 1 — both states live in MovieBlock)

function MovieBlock({ movie }) {
  // (your isFavorited state from Task 1 is here)

  // TODO: Declare an isExpanded state variable, initialized to false

  // TODO: Write a handleExpandClick function that toggles isExpanded

  return (
    <div className="movie-block">
      <div className="movie-info">
        <h3>{movie.name}</h3>
        <p>{movie.year} · {movie.director}</p>

        {/* TODO: Conditionally render movie.description only when isExpanded is true */}

        {/* TODO: Render a button that:
              - Calls handleExpandClick when clicked
              - Displays "Show more" when isExpanded is false
              - Displays "Show less" when isExpanded is true
        */}

        {/* Your heart button from Task 1 goes here */}
      </div>
    </div>
  );
}
```

<details>
<summary>💡 Stuck? Expand for a hint — not an answer</summary>

- **Think about:** Conditional rendering in JSX uses the `&&` operator or a ternary.
- **Check:** Do you have two separate state variables (`isFavorited` and `isExpanded`) or are you trying to combine them?
- **The pattern looks like:** `{isExpanded && <p>{movie.description}</p>}` for the conditional, and `{isExpanded ? 'Show less' : 'Show more'}` for the button label.

</details>

---

### Task 3: Verify Both States Survive Multiple Clicks

**File to verify:** `client/src/components/MovieBlock.js`

**What you're doing:** This is a testing task, not a coding task. Manually click the heart and expand buttons on multiple movie cards in sequence and answer these questions before moving on:

1. If you favorite card A and then expand card B, is card A still favorited?
2. If you click "Show more" on card C and then "Show less", does it return to the collapsed state?
3. What happens if you click the heart button 5 times in a row — do you end up back at the starting state?

These questions reveal whether your state is truly local to each component instance. If a click on one card affects another, your state is probably in the wrong place.

<details>
<summary>💡 Stuck? Expand for a hint — not an answer</summary>

- **Think about:** Each `<MovieBlock>` rendered by `MoviesList` is a separate component instance with its own independent state.
- **Check:** Is your state declared inside `MovieBlock`, or is it declared in a parent component and passed down as a prop?
- **The pattern looks like:** `const [isFavorited, setIsFavorited] = useState(false)` should be the first line inside the `MovieBlock` function body.

</details>

---

### Task 4: Use useEffect to Log State Changes

**File to edit:** `client/src/components/MovieBlock.js`

**What you're doing:** Add a `useEffect` that logs to the console whenever `isFavorited` changes. This is a diagnostic step — it confirms you understand the dependency array and prepares you for the localStorage stretch goal.

```javascript
// STARTER CODE — add this inside MovieBlock, after your state declarations

// TODO: Add a useEffect that:
//   - Runs only when isFavorited changes (not on every render)
//   - Logs: "Favorite status changed: true" or "Favorite status changed: false"
//   - Uses the correct dependency array
```

<details>
<summary>💡 Stuck? Expand for a hint — not an answer</summary>

- **Think about:** Which argument to `useEffect` controls when it runs?
- **Check:** Open your browser DevTools Console tab. You should see the log message fire exactly once per click on the heart — not once on load, not continuously.
- **The pattern looks like:** `useEffect(() => { /* side effect here */ }, [dependency])` where the dependency is the state variable you want to watch.

</details>

---

## 🐛 Common Errors & Fixes

<details>
<summary>❌ Error: Clicking the button changes nothing — the UI does not update</summary>

**Why this happens:**
You are modifying the variable directly instead of calling the setter function. React only triggers a re-render when you use the setter.

**Check these things:**
1. Are you calling `setIsFavorited(...)` or are you writing `isFavorited = ...`?
2. Is your handler function actually connected to the button's `onClick` prop?

**The fix:**
```javascript
// Wrong — mutating state directly:
const handleClick = () => {
  isFavorited = !isFavorited; // React never sees this
};

// Correct — calling the setter:
const handleClick = () => {
  setIsFavorited(!isFavorited); // React sees this and re-renders
};
```

</details>

<details>
<summary>❌ Error: The handler fires immediately when the page loads, not on click</summary>

**Why this happens:**
You are calling the function in the JSX (`onClick={handleClick()}`) instead of passing the function reference (`onClick={handleClick}`). Adding `()` calls it immediately during render.

**Check these things:**
1. Look at your JSX — does the `onClick` value have parentheses after the function name?
2. Are you seeing console logs or state changes on initial render before any clicking?

**The fix:**
```javascript
// Wrong — calling the function immediately:
<button onClick={handleFavoriteClick()}>Heart</button>

// Correct — passing the reference:
<button onClick={handleFavoriteClick}>Heart</button>

// Also correct — arrow function wrapper:
<button onClick={() => handleFavoriteClick()}>Heart</button>
```

</details>

<details>
<summary>❌ Error: useEffect runs in an infinite loop</summary>

**Why this happens:**
You are calling a state setter inside a `useEffect` that lists that state variable as a dependency. Updating the state triggers a re-render, which runs the effect again, which updates state again — forever.

**Check these things:**
1. Is there a setter call inside your `useEffect`?
2. Does the same state variable appear in both the effect body and the dependency array?

**The fix:**
```javascript
// Wrong — infinite loop:
useEffect(() => {
  setIsFavorited(!isFavorited); // changes isFavorited...
}, [isFavorited]); // ...which re-runs this effect

// Correct — just logging, no state mutation:
useEffect(() => {
  console.log('Favorite status changed:', isFavorited);
}, [isFavorited]);
```

</details>

<details>
<summary>❌ Error: All movie cards show the same favorite/expand state</summary>

**Why this happens:**
The state is declared in a parent component (like `MoviesList` or `App`) and passed down as a prop, instead of being declared inside `MovieBlock`. All cards then share the same piece of state.

**Check these things:**
1. Where is `useState` being called — inside `MovieBlock`, or somewhere above it?
2. Is `isFavorited` arriving as a prop, or is it declared locally?

**The fix:**
Move the `useState` calls inside the `MovieBlock` function body. Each card will then have its own independent copy of each state variable.

</details>

---

## ✅ Deliverables Checklist

Before marking this week complete, verify each item by running your code:

- [ ] **Favorites toggle:** Click the heart button on a movie card. The icon switches between ❤️ and 🤍. Click it again — it switches back. Run this 5 times; it should always return to the starting state.
- [ ] **Expand/collapse:** Click "Show more" on a movie card — the description appears. Click "Show less" — it disappears. The button label matches the current state every time.
- [ ] **State isolation:** Favorite card 1 and expand card 2. Card 1 remains favorited and card 2 remains expanded — interactions on one card do not affect others.
- [ ] **useEffect log:** Open the browser DevTools Console. Click the heart button on any card. A log message appears in the console showing the new favorite status. No log fires on initial page load.

---

## 🚀 Stretch Goals

> These are optional. Attempt them after completing all deliverables. No starter code is provided — that's the point.

<details>
<summary>⭐ Stretch 1: Persist Favorites to localStorage</summary>

**The challenge:**
When you refresh the page, all favorites are lost because component state resets on unmount. Make favorites survive a browser refresh by reading from and writing to `localStorage`.

**Why this matters:**
localStorage is the simplest form of client-side persistence. Real applications use it for user preferences, cached data, and auth tokens. Understanding it now makes later backend integration feel natural.

**You'll need to research:**
- `localStorage.setItem(key, value)` and `localStorage.getItem(key)`
- Why you must `JSON.stringify` and `JSON.parse` when storing non-strings
- How to initialize `useState` from localStorage: `useState(() => JSON.parse(localStorage.getItem(...)) ?? false)`
- How `useEffect` can write to localStorage when state changes

</details>

<details>
<summary>⭐⭐ Stretch 2: "Show Favorites Only" Filter Toggle (harder)</summary>

**The challenge:**
Add a button to your `MoviesList` component (or `App`) that, when toggled on, hides all non-favorited movies. When toggled off, all movies show again.

**Why this matters:**
This requires lifting state up — the "show favorites only" toggle lives in the parent (`MoviesList` or `App`), but the individual `isFavorited` state lives in each `MovieBlock` child. You need to decide how to share that information. This is the central design challenge of React state management.

**You'll need to research:**
- Lifting state up: moving state to a common ancestor
- Passing callbacks as props so children can update parent state
- The `Array.filter` method for filtering the rendered list
- Why this gets complex and what patterns (Context, Redux) exist to solve it

</details>

---

## 🎫 Exit Ticket

> When you're done, submit your exit ticket using access code: **`loop84`**
>
> The questions cover: state vs props, useState syntax, toggle patterns, useEffect dependency arrays, and what triggers a re-render.

---

## 📖 Reference & Resources

| Resource | Why It's Useful |
|----------|----------------|
| [React Docs: useState](https://react.dev/reference/react/useState) | Official reference with interactive examples |
| [React Docs: useEffect](https://react.dev/reference/react/useEffect) | Explains the dependency array in depth |
| [React Docs: Responding to Events](https://react.dev/learn/responding-to-events) | Covers the onClick/onChange patterns used this week |
| [React Docs: State: A Component's Memory](https://react.dev/learn/state-a-components-memory) | Best conceptual explanation of what state actually is |
| [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) | Reference for the Stretch Goal 1 persistence feature |

> 📌 **Reminder:** `movie-buzz-finished/` is the reference implementation. Use it to **verify your output**, not to copy code.
