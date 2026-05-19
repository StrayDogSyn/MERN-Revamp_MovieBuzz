# Week 5 - React Events & Hooks #

- [Week 5 - React Events & Hooks](#week-5---react-events--hooks)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [Advanced Event Handling](#advanced-event-handling)
  - [More React Hooks](#more-react-hooks)
    - [useEffect with Cleanup](#useeffect-with-cleanup)
    - [Custom Hooks](#custom-hooks)
  - [Enhancing Movie Buzz](#enhancing-movie-buzz)
    - [Adding Search Functionality](#adding-search-functionality)
    - [Adding Delete Functionality](#adding-delete-functionality)
    - [Adding Edit Functionality](#adding-edit-functionality)
  - [Event Handling Best Practices](#event-handling-best-practices)
  - [State Management Patterns](#state-management-patterns)
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

- Handle complex user interactions and events in React
- Use useEffect for cleanup and advanced lifecycle management
- Create and use custom hooks for reusable logic
- Implement search, edit, and delete functionality in React
- Apply best practices for event handling and state management
- Create functional React components that manage multiple types of state

---

## Glossary ##

- `Event Delegation`: A technique where you handle events at a parent level instead of individual child elements
- `Custom Hook`: A JavaScript function that uses React hooks and can be shared between components
- `Cleanup Function`: A function returned by useEffect to clean up resources when a component unmounts
- `Debouncing`: A technique to delay function execution until after a specified time has passed
- `Controlled vs Uncontrolled`: Components where React controls the form data vs. the DOM controlling it
- `State Lifting`: Moving state up to a common parent component to share between siblings

---

## Starting Point ##

Before we begin this lesson, navigate to the `week_05_react_events_and_hooks/movie-buzz` directory. This contains your Movie Buzz app from Week 4, with basic state management and form functionality already working.

```bash
cd week_05_react_events_and_hooks/movie-buzz
npm install
npm start
```

Your app should have:
- A list of movies displayed with React components  
- Basic useState for managing movies and form visibility
- A working MovieForm component for adding movies
- Netflix-style dark theme UI

We'll be adding advanced interactivity: search, edit, and delete functionality!

---

## Simple Event Examples - Building Understanding ##

Before we add advanced features to Movie Buzz, let's practice with simple event handling examples:

### Example 1: Button Click Handler

Create `src/components/ClickCounter.js`:

### Code Structure Explanation

Before we write the code, let's understand what this component will do:
- **Purpose**: Track button clicks and show when the last click occurred
- **State Management**: Two pieces of state - click count and timestamp
- **Event Handling**: A click handler that updates both pieces of state
- **Real-time Updates**: Display live feedback to the user about their interactions

```jsx
// 1. Import React and useState hook for state management
import React, { useState } from 'react';

// 2. Function component definition
function ClickCounter() {
  // 3. State for tracking total number of clicks
  const [clicks, setClicks] = useState(0);
  // 4. State for tracking when the last click occurred
  const [lastClickTime, setLastClickTime] = useState('Never');

  // 5. Event handler function for button clicks
  const handleClick = () => {
    // 6. Increment click counter using current value + 1
    setClicks(clicks + 1);
    // 7. Update timestamp with current time formatted as readable string
    setLastClickTime(new Date().toLocaleTimeString());
  };

  // 8. Return JSX that describes the UI structure
  return (
    // 9. Container div for all counter elements
    <div>
      {/* 10. Button element with onClick event listener */}
      <button onClick={handleClick}>
        Click Me!
      </button>
      {/* 11. Display current click count using JSX expression */}
      <p>Total Clicks: {clicks}</p>
      {/* 12. Display last click time using JSX expression */}
      <p>Last Click: {lastClickTime}</p>
    </div>
  );
}

// 13. Export component for use in other files
export default ClickCounter;
```

### Line-by-Line Breakdown:

1. **Import Statement**: `import React, { useState } from 'react';`
   - Imports React library and specifically extracts the useState hook
   - useState is needed for managing component state
   - This is ES6 destructuring syntax to pull useState out of React

2. **Function Declaration**: `function ClickCounter()`
   - Creates a functional component named ClickCounter
   - Component names must start with a capital letter in React
   - This will be callable as `<ClickCounter />` in JSX

3. **Click State**: `const [clicks, setClicks] = useState(0);`
   - Creates state variable `clicks` initialized to 0
   - `setClicks` is the updater function for this state
   - Array destructuring gets both the value and setter from useState
   - Starting at 0 makes sense for counting clicks

4. **Time State**: `const [lastClickTime, setLastClickTime] = useState('Never');`
   - Creates state for tracking when the last click happened
   - Initialized to 'Never' as a user-friendly default message
   - String value will be replaced with actual timestamp on first click

5. **Event Handler**: `const handleClick = () => { ... }`
   - Arrow function that will be called when button is clicked
   - Defined inside component so it has access to state setters
   - Function name follows React convention: `handle` + `EventType`

6. **Increment Count**: `setClicks(clicks + 1);`
   - Updates click count by adding 1 to current value
   - React will re-render component when state changes
   - Uses current value of `clicks` to calculate new value

7. **Update Timestamp**: `setLastClickTime(new Date().toLocaleTimeString());`
   - Creates new Date object representing current moment
   - `.toLocaleTimeString()` formats time in user's local format (e.g., "2:30:45 PM")
   - Stores this formatted string in state for display

8. **Return JSX**: `return ( ... )`
   - Every React component must return JSX or null
   - Parentheses allow multi-line JSX for readability
   - JSX describes what the UI should look like

9. **Container Div**: `<div>`
   - Wraps all content in a single parent element (React requirement)
   - Could use React.Fragment if you don't want extra HTML

10. **Button Element**: `<button onClick={handleClick}>`
    - Creates clickable button element
    - `onClick` prop connects to our event handler function
    - Note: We pass the function itself, not call it with `handleClick()`

11. **Click Display**: `<p>Total Clicks: {clicks}</p>`
    - Paragraph element showing current click count
    - `{clicks}` embeds JavaScript expression in JSX
    - React automatically converts number to string for display

12. **Time Display**: `<p>Last Click: {lastClickTime}</p>`
    - Shows when the last click occurred
    - Initially displays "Never", then shows actual timestamps
    - String is displayed directly (no conversion needed)

13. **Export Statement**: `export default ClickCounter;`
    - Makes component available for import in other files
    - `default` means this is the main export from this file

### Why This Pattern Works:
- **Immediate Feedback**: Users see instant response to their actions
- **Multiple State**: Demonstrates managing two related but separate pieces of state
- **Event Handling**: Shows proper way to attach and define event handlers
- **State Updates**: Both states update in single event, showing React's batching
- **User Experience**: Provides meaningful information (count + timestamp)

### Example 2: Form with Multiple Inputs

Create `src/components/SimpleForm.js`:

### Code Structure Explanation

Before we write the code, let's understand what this component will do:
- **Purpose**: Create a form with multiple input fields that work together
- **State Strategy**: Use a single object to hold all form field values
- **Event Handling**: One handler for all inputs using the `name` attribute
- **Form Submission**: Prevent default browser behavior and show user feedback
- **Controlled Components**: React controls all input values (not the DOM)

```jsx
// 1. Import React and useState for managing form state
import React, { useState } from 'react';

// 2. Function component definition
function SimpleForm() {
  // 3. Single state object containing all form fields
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    age: ''
  });

  // 4. Generic change handler for all form inputs
  const handleChange = (e) => {
    // 5. Extract name and value from the input that triggered the event
    const { name, value } = e.target;
    // 6. Update state by spreading previous state and updating changed field
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // 7. Form submission handler
  const handleSubmit = (e) => {
    // 8. Prevent default form submission (page refresh)
    e.preventDefault();
    // 9. Log form data to console for debugging
    console.log('Form submitted:', formData);
    // 10. Show user feedback with alert
    alert(`Welcome ${formData.username}!`);
  };

  // 11. Return JSX form structure
  return (
    // 12. Form element with submit handler
    <form onSubmit={handleSubmit}>
      {/* 13. Username input with controlled value */}
      <input
        type="text"
        name="username"
        value={formData.username}
        onChange={handleChange}
        placeholder="Username"
      />
      {/* 14. Email input with controlled value */}
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
      />
      {/* 15. Age input with controlled value */}
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        placeholder="Age"
      />
      {/* 16. Submit button */}
      <button type="submit">Submit</button>
    </form>
  );
}

// 17. Export component for use in other files
export default SimpleForm;
```

### Line-by-Line Breakdown:

1. **Import Statement**: `import React, { useState } from 'react';`
   - Same as previous example - brings in React and useState hook
   - useState is essential for managing form data

2. **Component Declaration**: `function SimpleForm()`
   - Creates functional component for our form
   - Name indicates this is a simplified form example

3. **Form State Object**: `const [formData, setFormData] = useState({ ... })`
   - Single state object holds ALL form field values
   - Much more efficient than separate useState for each field
   - Object keys match the `name` attributes of inputs
   - All fields initialized to empty strings

4. **Generic Handler**: `const handleChange = (e) => { ... }`
   - One function handles changes for ALL inputs
   - More maintainable than separate handlers for each field
   - Uses event object to determine which field changed

5. **Destructuring**: `const { name, value } = e.target;`
   - Extracts `name` and `value` properties from the input element
   - `name` tells us which field changed (username, email, or age)
   - `value` is the new content the user typed
   - ES6 destructuring makes this code cleaner

6. **State Update**: `setFormData(prev => ({ ...prev, [name]: value }))`
   - Uses functional update pattern with previous state
   - Spread operator `...prev` copies all existing form fields
   - `[name]: value` updates only the field that changed
   - Square brackets make `name` a computed property (dynamic key)
   - This preserves other field values while updating one

7. **Submit Handler**: `const handleSubmit = (e) => { ... }`
   - Function to handle form submission
   - Takes event object as parameter
   - Will be called when form is submitted (button click or Enter key)

8. **Prevent Default**: `e.preventDefault();`
   - Stops browser's default form submission behavior
   - Without this, page would refresh and lose our data
   - Essential for Single Page Applications (SPAs)

9. **Console Logging**: `console.log('Form submitted:', formData);`
   - Debugging tool to see what data was submitted
   - Useful during development to verify form is working
   - In production, you'd send this data to a server

10. **User Feedback**: `alert(\`Welcome ${formData.username}!\`);`
    - Shows user that submission was successful
    - Uses template literal with ${} to embed username
    - In real apps, you'd show better feedback than alert()

11. **Return JSX**: `return ( ... )`
    - Component must return JSX describing the UI
    - Form elements describe the structure

12. **Form Element**: `<form onSubmit={handleSubmit}>`
    - HTML form with React event handler
    - `onSubmit` fires when form is submitted (button click or Enter)
    - React's SyntheticEvent handles cross-browser compatibility

13-15. **Input Elements**: Each input follows the same pattern:
   - `type`: Specifies input type (text, email, number)
   - `name`: Matches the key in our formData object
   - `value`: Controlled by React state (formData.fieldname)
   - `onChange`: Uses our generic handleChange function
   - `placeholder`: User hint text

16. **Submit Button**: `<button type="submit">Submit</button>`
    - Button with type="submit" triggers form submission
    - Could also be `<input type="submit" value="Submit" />`

17. **Export Statement**: `export default SimpleForm;`
    - Makes component available for import elsewhere

### Key React Concepts Demonstrated:
- **Controlled Components**: React controls input values, not the DOM
- **Event Delegation**: One handler manages multiple inputs
- **State Management**: Object state for related data
- **Functional Updates**: Using previous state to calculate new state
- **Event Prevention**: Stopping default browser behavior
- **Dynamic Property Names**: Using `[name]` syntax for computed keys

### Why This Pattern is Powerful:
- **Scalable**: Easy to add more form fields
- **Maintainable**: One handler instead of many
- **Predictable**: React always controls the data
- **Debuggable**: All form data in one place
- **Flexible**: Same pattern works for any form size

### Example 3: Dynamic List with Delete

Create `src/components/TodoList.js`:

### Code Structure Explanation

Before we write the code, let's understand what this component will do:
- **Purpose**: Manage a dynamic list where users can add and remove items
- **State Management**: Two pieces of state - the list of todos and current input
- **List Operations**: Add new items and delete existing items
- **User Experience**: Support both button clicks and Enter key for adding
- **Data Structure**: Each todo is an object with unique ID and text

```jsx
// 1. Import React and useState for state management
import React, { useState } from 'react';

// 2. Function component definition
function TodoList() {
  // 3. State for the list of todos with initial sample data
  const [todos, setTodos] = useState([
    { id: 1, text: 'Learn React' },
    { id: 2, text: 'Build an app' }
  ]);
  // 4. State for the current input field value
  const [inputValue, setInputValue] = useState('');

  // 5. Function to add a new todo to the list
  const addTodo = () => {
    // 6. Check if input has actual content (not just whitespace)
    if (inputValue.trim()) {
      // 7. Add new todo to existing list using spread operator
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue
      }]);
      // 8. Clear the input field after adding
      setInputValue('');
    }
  };

  // 9. Function to delete a todo by its ID
  const deleteTodo = (id) => {
    // 10. Filter out the todo with matching ID
    setTodos(todos.filter(todo => todo.id !== id));
  };

  // 11. Return JSX describing the UI
  return (
    // 12. Container div for entire todo interface
    <div>
      {/* 13. Input field with multiple event handlers */}
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && addTodo()}
        placeholder="Add a todo..."
      />
      {/* 14. Button to add new todo */}
      <button onClick={addTodo}>Add</button>
      {/* 15. Unordered list to display todos */}
      <ul>
        {/* 16. Map over todos array to create list items */}
        {todos.map(todo => (
          <li key={todo.id}>
            {/* 17. Display todo text */}
            {todo.text}
            {/* 18. Delete button for each todo */}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// 19. Export component for use in other files
export default TodoList;
```

### Line-by-Line Breakdown:

1. **Import Statement**: `import React, { useState } from 'react';`
   - Brings in React library and useState hook
   - useState needed for managing todo list and input state

2. **Component Declaration**: `function TodoList()`
   - Creates functional component for todo list functionality
   - Name clearly indicates this manages a list of todos

3. **Todos State**: `const [todos, setTodos] = useState([...])`
   - Array state containing todo objects
   - Each todo has `id` (for React keys and deletion) and `text` (content)
   - Initial state includes sample todos to show structure
   - Array allows for dynamic addition/removal of items

4. **Input State**: `const [inputValue, setInputValue] = useState('');`
   - Separate state for the current input field value
   - Initialized to empty string
   - Controlled component pattern (React manages input value)

5. **Add Function**: `const addTodo = () => { ... }`
   - Function to add new todos to the list
   - No parameters needed (uses current inputValue)
   - Called when user clicks Add button or presses Enter

6. **Input Validation**: `if (inputValue.trim())`
   - `.trim()` removes whitespace from beginning and end
   - Prevents adding empty or whitespace-only todos
   - Good user experience - prevents meaningless entries

7. **Array Update**: `setTodos([...todos, { id: Date.now(), text: inputValue }])`
   - Spread operator `...todos` copies existing todos
   - Adds new todo object to the end of array
   - `Date.now()` provides unique ID (timestamp in milliseconds)
   - `text: inputValue` stores what user typed
   - Creates new array (immutable update pattern)

8. **Clear Input**: `setInputValue('');`
   - Resets input field to empty after successful add
   - Good UX - ready for next todo entry
   - Only clears if todo was actually added (inside the if block)

9. **Delete Function**: `const deleteTodo = (id) => { ... }`
   - Function to remove a specific todo
   - Takes `id` parameter to identify which todo to delete
   - Called when user clicks a delete button

10. **Filter Operation**: `setTodos(todos.filter(todo => todo.id !== id))`
    - `.filter()` creates new array excluding items that match condition
    - `todo.id !== id` keeps todos that DON'T match the delete ID
    - Results in new array without the deleted todo
    - Immutable update - doesn't modify original array

11. **Return JSX**: `return ( ... )`
    - Component returns JSX describing the interface
    - Contains input, button, and dynamic list

12. **Container Div**: `<div>`
    - Wraps all todo interface elements
    - Single parent required by React

13. **Input Element**: Complex input with multiple props:
    - `value={inputValue}`: Controlled component (React controls value)
    - `onChange={(e) => setInputValue(e.target.value)}`: Updates state on every keystroke
    - `onKeyPress={(e) => e.key === 'Enter' && addTodo()}`: Calls addTodo when Enter pressed
    - `placeholder="Add a todo..."`: User hint text

14. **Add Button**: `<button onClick={addTodo}>Add</button>`
    - Triggers addTodo function when clicked
    - Alternative to pressing Enter in input field

15. **List Container**: `<ul>`
    - Semantic HTML for unordered list
    - Will contain dynamically generated list items

16. **Dynamic List**: `{todos.map(todo => ( ... ))}`
    - `.map()` transforms each todo into a JSX element
    - Creates one `<li>` for each todo in the array
    - `key={todo.id}` required by React for efficient updates
    - Parentheses allow multi-line JSX return

17. **Todo Text**: `{todo.text}`
    - Displays the content of each todo
    - JSX expression embeds JavaScript in markup

18. **Delete Button**: `<button onClick={() => deleteTodo(todo.id)}>Delete</button>`
    - Arrow function passes the specific todo's ID to deleteTodo
    - Each button knows which todo it should delete
    - Inline arrow function creates closure over todo.id

19. **Export Statement**: `export default TodoList;`
    - Makes component available for import in other files

### Key Concepts Demonstrated:
- **Dynamic Lists**: Adding and removing items from arrays
- **Unique Keys**: Using IDs for React list reconciliation
- **Multiple Event Handlers**: onChange, onKeyPress, onClick
- **Array Methods**: map() for rendering, filter() for deletion
- **Immutable Updates**: Creating new arrays instead of modifying existing
- **Controlled Components**: React manages all input values
- **Event Delegation**: Different buttons call same function with different parameters

### Why This Pattern is Important:
- **Foundation for CRUD Apps**: Create, Read, Update, Delete operations
- **Scalable**: Works with any number of todos
- **Performant**: React only updates changed items (thanks to keys)
- **User Friendly**: Multiple ways to interact (button, Enter key)
- **Data Integrity**: Validation prevents empty todos

> `Try It Out`
> Create and test these components before moving to Movie Buzz. Notice how:
> - Events pass data to handlers
> - preventDefault() stops default form behavior
> - State updates trigger re-renders
> - Event handlers can be inline or separate functions

## Advanced Event Handling ##

Now that you understand the basics, let's explore more sophisticated event handling patterns.

### Event Object Properties ###

React's SyntheticEvent provides consistent behavior across browsers:

### Code Structure Explanation

Before we examine the code, let's understand what this demonstrates:
- **Purpose**: Show how to access information from React events
- **SyntheticEvent**: React's wrapper around native browser events
- **Event Properties**: Different data available in the event object
- **Cross-browser Compatibility**: Same interface regardless of browser

```jsx
// 1. Event handler function that receives event object
function handleInputChange(e) {
  // 2. Log the type of event that occurred
  console.log('Event type:', e.type);
  // 3. Log the actual DOM element that triggered the event
  console.log('Target element:', e.target);
  // 4. Log the current value of the input field
  console.log('Current value:', e.target.value);
  // 5. Log the name attribute of the element
  console.log('Element name:', e.target.name);
}
```

### Line-by-Line Breakdown:

1. **Function Declaration**: `function handleInputChange(e)`
   - Event handler function that accepts event parameter
   - `e` is React's SyntheticEvent object
   - Contains all information about the event that occurred

2. **Event Type**: `console.log('Event type:', e.type);`
   - `e.type` tells you what kind of event happened
   - Examples: 'change', 'click', 'keypress', 'submit'
   - Useful for handlers that manage multiple event types

3. **Target Element**: `console.log('Target element:', e.target);`
   - `e.target` is the actual DOM element that triggered the event
   - Shows the HTML element object in console
   - You can access any property of that element

4. **Current Value**: `console.log('Current value:', e.target.value);`
   - `e.target.value` gets the current value of form elements
   - Works for inputs, textareas, selects
   - This is how you get user input in React forms

5. **Element Name**: `console.log('Element name:', e.target.name);`
   - `e.target.name` gets the name attribute of the element
   - Crucial for generic form handlers
   - Tells you which field changed in multi-input forms

### Preventing Default Behavior ###

For forms and links, you often need to prevent default browser behavior:

### Code Structure Explanation

Before we examine the code, let's understand what this demonstrates:
- **Purpose**: Stop browser's built-in behaviors to implement custom logic
- **preventDefault()**: Method to stop default actions
- **Form Submission**: Prevent page refresh on form submit
- **Link Navigation**: Prevent browser navigation on link clicks
- **SPA Behavior**: Essential for Single Page Applications

```jsx
// 1. Form submission handler
function handleSubmit(e) {
  // 2. Prevent the form from refreshing the page
  e.preventDefault(); // Prevents form from refreshing the page
  // 3. Your custom logic here instead of browser default
  // Your custom logic here
}

// 4. Link click handler
function handleLinkClick(e) {
  // 5. Prevent the browser from navigating to href
  e.preventDefault(); // Prevents navigation
  // 6. Implement custom navigation (like React Router)
  // Custom navigation logic
}
```

### Line-by-Line Breakdown:

1. **Submit Handler**: `function handleSubmit(e)`
   - Event handler specifically for form submissions
   - Receives event object when form is submitted
   - Could be triggered by submit button or Enter key

2. **Prevent Form Default**: `e.preventDefault();`
   - Stops browser from submitting form traditionally
   - Without this, page would refresh and lose React state
   - Essential for client-side form handling

3. **Custom Logic Placeholder**: `// Your custom logic here`
   - After preventing default, you handle submission yourself
   - Might validate data, send to API, update state
   - You control what happens instead of browser

4. **Link Handler**: `function handleLinkClick(e)`
   - Event handler for anchor tag clicks
   - Receives click event when link is clicked
   - Used in SPAs where you control navigation

5. **Prevent Navigation**: `e.preventDefault();`
   - Stops browser from following the href attribute
   - Prevents page reload or navigation to new page
   - Keeps user in your React application

6. **Custom Navigation**: `// Custom navigation logic`
   - After preventing default, implement your own routing
   - Might use React Router to change components
   - Could update state to show different content

### When to Use preventDefault():
- **Forms**: Always prevent default to handle in JavaScript
- **Links**: In SPAs, prevent navigation to control routing
- **Buttons**: Sometimes buttons have default behaviors to override
- **Key Events**: Prevent default key actions (like form submission on Enter)

### Event Propagation ###

Sometimes you need to stop events from bubbling up to parent elements:

### Code Structure Explanation

Before we examine the code, let's understand what this demonstrates:
- **Purpose**: Control how events travel through the DOM tree
- **Event Bubbling**: Events normally bubble from child to parent
- **stopPropagation()**: Method to stop events from bubbling up
- **Use Case**: When child and parent both have event handlers
- **Event Isolation**: Ensure only specific handlers run

```jsx
// 1. Event handler that stops propagation
function handleButtonClick(e) {
  // 2. Stop event from bubbling up to parent elements
  e.stopPropagation(); // Stops event from reaching parent
  // 3. Only this handler will execute
  console.log('Only this handler runs');
}
```

### Line-by-Line Breakdown:

1. **Button Handler**: `function handleButtonClick(e)`
   - Event handler for a button click
   - Receives the click event object
   - Designed to prevent event propagation

2. **Stop Propagation**: `e.stopPropagation();`
   - Prevents event from bubbling up to parent elements
   - Event stops at this element, doesn't continue upward
   - Parent click handlers won't be triggered

3. **Isolated Logic**: `console.log('Only this handler runs');`
   - Code that runs only for this specific element
   - Parent handlers won't interfere with this logic
   - Demonstrates that propagation was stopped

### Event Propagation Example:
```jsx
// Without stopPropagation:
<div onClick={() => console.log('Parent clicked')}>
  <button onClick={() => console.log('Button clicked')}>
    Click me
  </button>
</div>
// Result: Both "Button clicked" and "Parent clicked" logged

// With stopPropagation:
<div onClick={() => console.log('Parent clicked')}>
  <button onClick={(e) => {
    e.stopPropagation();
    console.log('Button clicked');
  }}>
    Click me
  </button>
</div>
// Result: Only "Button clicked" logged
```

### When to Use stopPropagation():
- **Nested Interactive Elements**: Button inside clickable card
- **Modal Overlays**: Prevent clicks from closing modal
- **Menu Items**: Stop menu from closing when item clicked
- **Complex UI**: When parent and child both need click handlers

---

## More React Hooks ##

### useEffect with Cleanup ###

Some effects need cleanup to prevent memory leaks:

### Code Structure Explanation

Before we examine the code, let's understand what this demonstrates:
- **Purpose**: Create a timer that counts seconds and cleans up properly
- **useEffect Hook**: Manage side effects in functional components
- **Cleanup Function**: Prevent memory leaks when component unmounts
- **setInterval**: Browser API for running code repeatedly
- **Dependency Array**: Control when effect runs

```jsx
// 1. Import React hooks for state and effects
import React, { useState, useEffect } from 'react';

// 2. Function component definition
function Timer() {
  // 3. State to track elapsed seconds
  const [seconds, setSeconds] = useState(0);

  // 4. useEffect to set up timer and cleanup
  useEffect(() => {
    // 5. Create interval that runs every 1000ms (1 second)
    const interval = setInterval(() => {
      // 6. Update seconds using functional state update
      setSeconds(seconds => seconds + 1);
    }, 1000);

    // 7. Cleanup function returned by useEffect
    return () => clearInterval(interval);
  }, []); // 8. Empty dependency array means this runs once on mount

  // 9. Render current seconds count
  return <div>Seconds: {seconds}</div>;
}
```

### Line-by-Line Breakdown:

1. **Import Statement**: `import React, { useState, useEffect } from 'react';`
   - Imports React and two essential hooks
   - `useState` for managing the seconds counter
   - `useEffect` for running side effects (the timer)

2. **Component Declaration**: `function Timer()`
   - Creates functional component that displays a timer
   - Will count seconds and display current count

3. **State Declaration**: `const [seconds, setSeconds] = useState(0);`
   - Creates state to track elapsed seconds
   - Initialized to 0 (timer starts at zero)
   - `setSeconds` will be used to increment the count

4. **useEffect Setup**: `useEffect(() => { ... }, []);`
   - Hook for performing side effects in functional components
   - First argument is the effect function
   - Second argument is dependency array (empty = run once)

5. **setInterval Creation**: `const interval = setInterval(() => { ... }, 1000);`
   - Browser API that runs a function repeatedly
   - Function runs every 1000 milliseconds (1 second)
   - Returns interval ID that can be used to stop the timer
   - Stored in `interval` variable for cleanup

6. **State Update**: `setSeconds(seconds => seconds + 1);`
   - Functional update pattern using previous state
   - `seconds => seconds + 1` increments by 1
   - Safer than `setSeconds(seconds + 1)` in this context
   - Avoids stale closure issues with intervals

7. **Cleanup Function**: `return () => clearInterval(interval);`
   - Function returned by useEffect runs when component unmounts
   - `clearInterval(interval)` stops the timer
   - Prevents memory leaks and continued execution
   - Essential for proper component lifecycle management

8. **Dependency Array**: `}, []);`
   - Empty array means effect runs only once (on mount)
   - If array had values, effect would re-run when they change
   - Empty array perfect for "setup once" scenarios like timers

9. **Render**: `return <div>Seconds: {seconds}</div>;`
   - Displays current seconds count
   - Updates automatically as state changes
   - Simple UI to show timer functionality

### Why Cleanup is Critical:
- **Memory Leaks**: Without cleanup, intervals continue forever
- **Performance**: Multiple timers slow down the application
- **Errors**: Trying to update state of unmounted components
- **Resource Management**: Proper cleanup is professional coding

### useEffect Lifecycle:
1. **Mount**: Component appears, useEffect runs, timer starts
2. **Update**: Timer updates state every second, component re-renders
3. **Unmount**: Component disappears, cleanup function runs, timer stops

### Common Cleanup Scenarios:
- **Timers**: `clearInterval()`, `clearTimeout()`
- **Event Listeners**: `removeEventListener()`
- **Subscriptions**: Unsubscribe from data sources
- **Network Requests**: Cancel pending API calls

### Custom Hooks ###

Custom hooks let you extract and reuse stateful logic:

### Code Structure Explanation

Before we examine the code, let's understand what this demonstrates:
- **Purpose**: Create reusable logic for form input management
- **Custom Hook**: JavaScript function that uses React hooks
- **Logic Extraction**: Move common patterns into reusable functions
- **Multiple Instances**: Use same hook for different form fields
- **Encapsulation**: Hide implementation details, expose clean interface

```jsx
// 1. Custom hook definition (must start with 'use')
function useInput(initialValue) {
  // 2. State for the input's current value
  const [value, setValue] = useState(initialValue);

  // 3. Change handler function
  const handleChange = (e) => {
    // 4. Update value from event target
    setValue(e.target.value);
  };

  // 5. Reset function to return to initial value
  const reset = () => {
    // 6. Set value back to initial value
    setValue(initialValue);
  };

  // 7. Return object with value and functions
  return {
    value,
    onChange: handleChange,
    reset
  };
}

// 8. Component using the custom hook
function MyForm() {
  // 9. Create name input with custom hook
  const name = useInput('');
  // 10. Create email input with custom hook
  const email = useInput('');

  // 11. Return form JSX
  return (
    <form>
      {/* 12. Name input using hook's returned properties */}
      <input
        type="text"
        placeholder="Name"
        value={name.value}
        onChange={name.onChange}
      />
      {/* 13. Email input using hook's returned properties */}
      <input
        type="email"
        placeholder="Email"
        value={email.value}
        onChange={email.onChange}
      />
      {/* 14. Reset button that calls both reset functions */}
      <button type="button" onClick={() => {
        name.reset();
        email.reset();
      }}>
        Reset Form
      </button>
    </form>
  );
}
```

### Line-by-Line Breakdown:

1. **Custom Hook Declaration**: `function useInput(initialValue)`
   - Function name must start with 'use' (React convention)
   - Takes initial value as parameter
   - Will return an object with input-related functionality

2. **Internal State**: `const [value, setValue] = useState(initialValue);`
   - Each instance of useInput has its own state
   - State tracks current value of the input
   - Initialized with the provided initial value

3. **Change Handler**: `const handleChange = (e) => { ... }`
   - Function to handle input change events
   - Will be returned to component for use in onChange prop
   - Encapsulates the change logic inside the hook

4. **Update Value**: `setValue(e.target.value);`
   - Extracts new value from event and updates state
   - Standard pattern for controlled input components
   - Hidden from component using the hook

5. **Reset Function**: `const reset = () => { ... }`
   - Function to reset input back to initial value
   - Useful for form reset functionality
   - Encapsulates reset logic

6. **Reset Implementation**: `setValue(initialValue);`
   - Sets state back to the original initial value
   - Uses closure to remember initialValue
   - Simple but powerful feature

7. **Return Object**: `return { value, onChange: handleChange, reset }`
   - Returns object with three properties
   - `value`: current input value
   - `onChange`: event handler function
   - `reset`: function to reset to initial value
   - Clean API for components to use

8. **Component Declaration**: `function MyForm()`
   - Component that will use the custom hook
   - Demonstrates how to use custom hooks

9. **Name Input Hook**: `const name = useInput('');`
   - Creates instance of useInput for name field
   - Initialized with empty string
   - `name` object contains value, onChange, and reset

10. **Email Input Hook**: `const email = useInput('');`
    - Creates separate instance for email field
    - Each hook instance has independent state
    - Same interface as name input

11. **Form Return**: `return ( <form> ... </form> );`
    - Component returns JSX form structure
    - Uses the hook instances for input management

12. **Name Input Element**: `<input value={name.value} onChange={name.onChange} />`
    - Uses value and onChange from name hook instance
    - Controlled component pattern
    - Hook handles all the complexity

13. **Email Input Element**: `<input value={email.value} onChange={email.onChange} />`
    - Same pattern as name input
    - Separate hook instance with independent state
    - Consistent interface

14. **Reset Button**: `onClick={() => { name.reset(); email.reset(); }}`
    - Calls reset function on both hook instances
    - Clears both inputs simultaneously
    - Demonstrates how to use multiple hook instances

### Benefits of Custom Hooks:
- **Reusability**: Same logic for multiple inputs
- **Encapsulation**: Hide implementation details
- **Consistency**: Same interface across components
- **Maintainability**: Change logic in one place
- **Testability**: Test hooks independently

### Custom Hook Rules:
- **Naming**: Must start with 'use'
- **Hooks Inside**: Can use other React hooks
- **Top Level**: Call at top level of components
- **Pure Functions**: Same input should give same output
- **Independent State**: Each usage has separate state

---

## Enhancing Movie Buzz ##

Let's add more interactive features to our Movie Buzz application.

### Adding Search Functionality ###

Create a new component `src/components/SearchBar.js`:

### Code Structure Explanation

Before we write the code, let's understand what this component will do:
- **Purpose**: Provide search functionality for filtering movies
- **State Management**: Track current search term in local state
- **Real-time Search**: Call parent function on every keystroke
- **Clear Functionality**: Button to reset search when needed
- **Controlled Component**: React manages the input value

```jsx
// 1. Import React and useState for search term state
import React, { useState } from 'react';

// 2. SearchBar component with onSearch prop from parent
function SearchBar({ onSearch }) {
  // 3. Local state to track current search term
  const [searchTerm, setSearchTerm] = useState('');

  // 4. Handler for search input changes
  const handleSearchChange = (e) => {
    // 5. Get new value from input
    const value = e.target.value;
    // 6. Update local state
    setSearchTerm(value);
    // 7. Notify parent component of search change
    onSearch(value);
  };

  // 8. Handler to clear search
  const handleClearSearch = () => {
    // 9. Reset search term to empty
    setSearchTerm('');
    // 10. Notify parent that search is cleared
    onSearch('');
  };

  // 11. Return search interface JSX
  return (
    // 12. Container div with CSS class
    <div className="search-bar">
      {/* 13. Search input with controlled value */}
      <input
        type="text"
        placeholder="Search movies..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="search-input"
      />
      {/* 14. Conditional clear button */}
      {searchTerm && (
        <button onClick={handleClearSearch} className="clear-search">
          Clear
        </button>
      )}
    </div>
  );
}

// 15. Export for use in other components
export default SearchBar;
```

### Line-by-Line Breakdown:

1. **Import Statement**: `import React, { useState } from 'react';`
   - Imports React and useState hook
   - useState needed for tracking search term

2. **Component Declaration**: `function SearchBar({ onSearch })`
   - Component receives `onSearch` prop from parent
   - `onSearch` is a function that parent provides
   - Parent will use this to filter movies based on search

3. **Search State**: `const [searchTerm, setSearchTerm] = useState('');`
   - Local state for current search term
   - Initialized to empty string (no search initially)
   - Separate from parent's movie list state

4. **Change Handler**: `const handleSearchChange = (e) => { ... }`
   - Function called every time user types in search box
   - Receives event object from input change

5. **Extract Value**: `const value = e.target.value;`
   - Gets current value from the input element
   - Stores in variable for clarity and reuse

6. **Update Local State**: `setSearchTerm(value);`
   - Updates component's local state with new search term
   - Keeps input display in sync with what user typed
   - Triggers re-render to show new value

7. **Notify Parent**: `onSearch(value);`
   - Calls parent's search function with new search term
   - Parent can filter movie list based on this value
   - Real-time search - happens on every keystroke

8. **Clear Handler**: `const handleClearSearch = () => { ... }`
   - Function to reset search to empty state
   - Called when user clicks clear button

9. **Reset Search Term**: `setSearchTerm('');`
   - Sets local state back to empty string
   - Clears the input field visually

10. **Notify Clear**: `onSearch('');`
    - Tells parent that search is cleared
    - Parent should show all movies again (no filtering)

11. **Return JSX**: `return ( ... )`
    - Component returns JSX describing search interface
    - Contains input and conditional clear button

12. **Container Div**: `<div className="search-bar">`
    - Wrapper element for styling purposes
    - CSS class allows custom styling of search bar

13. **Search Input**: Complex input element with multiple props:
    - `type="text"`: Standard text input
    - `placeholder="Search movies..."`: Hint text for users
    - `value={searchTerm}`: Controlled component (React manages value)
    - `onChange={handleSearchChange}`: Calls handler on every change
    - `className="search-input"`: CSS class for styling

14. **Conditional Clear Button**: `{searchTerm && ( ... )}`
    - Only shows clear button when there's a search term
    - `searchTerm &&` is short-circuit evaluation
    - If searchTerm is empty (''), button doesn't render
    - If searchTerm has content, button appears

15. **Export Statement**: `export default SearchBar;`
    - Makes component available for import in other files

### Key React Patterns Demonstrated:
- **Props Communication**: Child communicates with parent via props
- **Controlled Components**: React controls input value, not DOM
- **Real-time Updates**: Search happens as user types
- **Conditional Rendering**: Clear button only shows when needed
- **Event Handling**: Proper event handler patterns
- **State Management**: Local state for UI, props for data flow

### Adding Delete Functionality ###

Update your `MovieBlock.js` component to include a delete button:

### Code Structure Explanation

Before we write the code, let's understand what this component will do:
- **Purpose**: Display movie information with ability to delete
- **User Confirmation**: Ask user to confirm before deleting
- **Safe Deletion**: Use ID if available, fallback to name
- **Parent Communication**: Call parent's delete function
- **User Experience**: Clear confirmation dialog

```jsx
// 1. MovieBlock component with movie data and delete handler props
function MovieBlock({ movie, onDelete }) {
  // 2. Delete handler with user confirmation
  const handleDelete = () => {
    // 3. Show confirmation dialog with movie name
    if (window.confirm(`Are you sure you want to delete "${movie.name}"?`)) {
      // 4. Call parent's delete function with movie identifier
      onDelete(movie.id || movie.name); // Use id if available, otherwise name
    }
  };

  // 5. Return JSX for movie display with delete button
  return (
    // 6. Main container for movie information
    <div className="movie-block">
      {/* 7. Movie title */}
      <h3>{movie.name}</h3>
      {/* 8. Basic movie info in one line */}
      <p>{movie.year} • {movie.rating} • {movie.length}</p>
      {/* 9. Movie description in italics */}
      <p><em>{movie.description}</em></p>
      {/* 10. Genre array joined with commas */}
      <p><b>Genre:</b> {movie.genre.join(', ')}</p>
      {/* 11. Stars array joined with commas */}
      <p><b>Stars:</b> {movie.stars.join(', ')}</p>
      {/* 12. Director information */}
      <p><b>Director:</b> {movie.director}</p>
      {/* 13. Action buttons container */}
      <div className="movie-actions">
        {/* 14. Delete button with click handler */}
        <button onClick={handleDelete} className="delete-btn">
          Delete Movie
        </button>
      </div>
    </div>
  );
}
```

### Line-by-Line Breakdown:

1. **Component Props**: `function MovieBlock({ movie, onDelete })`
   - Receives `movie` object with all movie data
   - Receives `onDelete` function from parent component
   - Parent provides the delete functionality

2. **Delete Handler**: `const handleDelete = () => { ... }`
   - Function that handles delete button clicks
   - Contains confirmation logic and calls parent

3. **Confirmation Dialog**: `if (window.confirm(\`Are you sure...\`))`
   - `window.confirm()` shows browser confirmation dialog
   - Template literal includes movie name in message
   - Returns true if user clicks OK, false if Cancel
   - Good UX practice to confirm destructive actions

4. **Call Parent Delete**: `onDelete(movie.id || movie.name);`
   - Only executes if user confirmed deletion
   - Uses `movie.id` if available, falls back to `movie.name`
   - Flexible approach for different data structures
   - Parent handles actual deletion logic

5. **Return JSX**: `return ( ... )`
   - Component returns JSX describing movie display
   - Same structure as before, plus delete button

6. **Movie Container**: `<div className="movie-block">`
   - Main wrapper for movie information
   - CSS class for styling the movie card

7. **Movie Title**: `<h3>{movie.name}</h3>`
   - Displays movie name as heading
   - Most prominent text in the card

8. **Basic Info**: `<p>{movie.year} • {movie.rating} • {movie.length}</p>`
   - Key movie info in compact format
   - Bullet points separate different pieces of info
   - Template literal with embedded expressions

9. **Description**: `<p><em>{movie.description}</em></p>`
   - Movie synopsis in italic text
   - `<em>` provides semantic emphasis

10. **Genre Display**: `<p><b>Genre:</b> {movie.genre.join(', ')}</p>`
    - Shows "Genre:" label in bold
    - `movie.genre.join(', ')` converts array to string
    - Example: `["Action", "Sci-Fi"]` becomes `"Action, Sci-Fi"`

11. **Stars Display**: `<p><b>Stars:</b> {movie.stars.join(', ')}</p>`
    - Same pattern as genre for actor names
    - Joins array elements with comma and space

12. **Director Display**: `<p><b>Director:</b> {movie.director}</p>`
    - Shows director name with bold label
    - Usually single value, not an array

13. **Actions Container**: `<div className="movie-actions">`
    - Wrapper for action buttons (delete, edit, etc.)
    - Allows styling buttons as a group
    - Could contain multiple buttons in future

14. **Delete Button**: `<button onClick={handleDelete} className="delete-btn">`
    - Button triggers handleDelete when clicked
    - CSS class allows styling (red color, etc.)
    - Clear label tells user what action will happen

### Error Handling Considerations:
- **Missing ID**: Fallback to movie.name if ID not available
- **Array Methods**: .join() safe to use on arrays
- **User Confirmation**: Prevents accidental deletions
- **Parent Communication**: Relies on parent to handle actual deletion

### Why This Pattern Works:
- **Separation of Concerns**: Component displays, parent manages data
- **User Safety**: Confirmation prevents accidents
- **Flexibility**: Works with different identifier types
- **Maintainability**: Delete logic centralized in parent
- **Reusability**: Component can be used with different delete handlers

### Adding Edit Functionality ###

Create an edit mode for the MovieForm component. Update `MovieForm.jsx`:

### Code Structure Explanation

Before we write the code, let's understand what this component will do:
- **Purpose**: Handle both adding new movies and editing existing ones
- **Dual Mode**: Form works differently based on whether editingMovie is provided
- **Data Conversion**: Transform arrays to strings for form display, back to arrays for storage
- **useEffect**: Populate form when editing movie changes
- **Form Reset**: Clear form after successful submission

```jsx
// 1. Import React hooks for state and effects
import React, { useState, useEffect } from 'react';

// 2. MovieForm component with multiple handler props
function MovieForm({ onAddMovie, onUpdateMovie, onCancel, editingMovie }) {
  // 3. Form state object for all movie fields
  const [movieData, setMovieData] = useState({
    name: '',
    year: '',
    rating: '',
    length: '',
    description: '',
    genre: '',
    director: '',
    stars: ''
  });

  // 4. Effect to populate form when editing movie changes
  useEffect(() => {
    // 5. Check if we're editing a movie
    if (editingMovie) {
      // 6. Convert movie data for form display
      setMovieData({
        ...editingMovie,
        genre: editingMovie.genre.join(', '),
        stars: editingMovie.stars.join(', '),
        year: editingMovie.year.toString()
      });
    }
  }, [editingMovie]); // 7. Re-run when editingMovie changes

  // 8. Handler for input field changes
  const handleInputChange = (e) => {
    // 9. Extract field name and value from event
    const { name, value } = e.target;
    // 10. Update form state with new value
    setMovieData({
      ...movieData,
      [name]: value
    });
  };

  // 11. Handler for form submission
  const handleSubmit = (e) => {
    // 12. Prevent default form submission
    e.preventDefault();

    // 13. Convert form data back to proper types
    const processedMovie = {
      ...movieData,
      genre: movieData.genre.split(',').map(g => g.trim()),
      stars: movieData.stars.split(',').map(s => s.trim()),
      year: parseInt(movieData.year)
    };

    // 14. Choose add or update based on editing mode
    if (editingMovie) {
      // 15. Update existing movie with ID preserved
      onUpdateMovie({ ...processedMovie, id: editingMovie.id });
    } else {
      // 16. Add new movie
      onAddMovie(processedMovie);
    }

    // 17. Reset form to empty state
    setMovieData({
      name: '',
      year: '',
      rating: '',
      length: '',
      description: '',
      genre: '',
      director: '',
      stars: ''
    });
  };

  // 18. Return form JSX
  return (
    // 19. Form container with CSS class
    <div className="movie-form">
      {/* 20. Dynamic heading based on mode */}
      <h2>{editingMovie ? 'Edit Movie' : 'Add New Movie'}</h2>
      {/* 21. Form with submit handler */}
      <form onSubmit={handleSubmit}>
        {/* 22. Sample input field (others follow same pattern) */}
        <input
          type="text"
          name="name"
          placeholder="Movie Name"
          value={movieData.name}
          onChange={handleInputChange}
          required
        />

        {/* ... other form fields follow same pattern ... */}

        {/* 23. Button container */}
        <div className="form-buttons">
          {/* 24. Dynamic submit button text */}
          <button type="submit">
            {editingMovie ? 'Update Movie' : 'Add Movie'}
          </button>
          {/* 25. Cancel button */}
          <button type="button" onClick={onCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

// 26. Export for use in other components
export default MovieForm;
```

### Line-by-Line Breakdown:

1. **Import Statement**: `import React, { useState, useEffect } from 'react';`
   - Imports React with useState and useEffect hooks
   - useState for form data, useEffect for populating form when editing

2. **Component Props**: `function MovieForm({ onAddMovie, onUpdateMovie, onCancel, editingMovie })`
   - `onAddMovie`: Function to handle adding new movies
   - `onUpdateMovie`: Function to handle updating existing movies
   - `onCancel`: Function to close/cancel form
   - `editingMovie`: Movie object when editing, null when adding

3. **Form State**: `const [movieData, setMovieData] = useState({ ... })`
   - Object containing all form field values
   - All fields initialized to empty strings
   - Same structure as Week 4, but now handles editing too

4. **useEffect Declaration**: `useEffect(() => { ... }, [editingMovie]);`
   - Runs when component mounts or when editingMovie changes
   - Used to populate form with existing movie data when editing

5. **Edit Check**: `if (editingMovie)`
   - Only populate form if we're editing an existing movie
   - When adding new movie, editingMovie is null/undefined

6. **Data Conversion**: Complex object transformation:
   - `...editingMovie`: Spread all existing movie properties
   - `genre: editingMovie.genre.join(', ')`: Convert array to comma-separated string
   - `stars: editingMovie.stars.join(', ')`: Convert array to comma-separated string
   - `year: editingMovie.year.toString()`: Convert number to string for input
   - Forms work with strings, but data stored as arrays/numbers

7. **Dependency Array**: `}, [editingMovie]);`
   - Effect re-runs when editingMovie prop changes
   - Ensures form populates when switching between different movies to edit

8. **Input Handler**: `const handleInputChange = (e) => { ... }`
   - Same pattern as Week 4 - handles all input changes
   - Updates form state as user types

9. **Extract Event Data**: `const { name, value } = e.target;`
   - Gets field name and new value from changed input
   - Same destructuring pattern as previous examples

10. **Update State**: `setMovieData({ ...movieData, [name]: value })`
    - Spreads existing form data and updates changed field
    - Dynamic property name using [name] syntax

11. **Submit Handler**: `const handleSubmit = (e) => { ... }`
    - Handles both add and update operations
    - Processes form data before sending to parent

12. **Prevent Default**: `e.preventDefault();`
    - Stops browser from submitting form traditionally
    - Allows custom JavaScript handling

13. **Data Processing**: Complex data transformation:
    - `...movieData`: Spread all form fields
    - `genre: movieData.genre.split(',').map(g => g.trim())`: String → trimmed array
    - `stars: movieData.stars.split(',').map(s => s.trim())`: String → trimmed array
    - `year: parseInt(movieData.year)`: String → number
    - Converts form strings back to proper data types

14. **Mode Check**: `if (editingMovie)`
    - Determines whether to add new movie or update existing
    - Different parent functions for different operations

15. **Update Movie**: `onUpdateMovie({ ...processedMovie, id: editingMovie.id });`
    - Calls parent's update function
    - Preserves original movie ID
    - Sends processed movie data

16. **Add Movie**: `onAddMovie(processedMovie);`
    - Calls parent's add function
    - Parent will assign new ID
    - Sends processed movie data

17. **Form Reset**: Large object reset to empty values
    - Clears all form fields after successful submission
    - Returns form to initial state
    - Good UX - ready for next operation

18. **Return JSX**: `return ( ... )`
    - Component returns form interface
    - Dynamic content based on editing mode

19. **Form Container**: `<div className="movie-form">`
    - Wrapper for styling purposes

20. **Dynamic Heading**: `{editingMovie ? 'Edit Movie' : 'Add New Movie'}`
    - Shows different title based on mode
    - Helps user understand what form does

21. **Form Element**: `<form onSubmit={handleSubmit}>`
    - Form with submit handler attached
    - Handles both Enter key and button clicks

22. **Sample Input**: Shows controlled input pattern:
    - `value={movieData.name}`: Controlled by React state
    - `onChange={handleInputChange}`: Updates state on change
    - `required`: HTML5 validation
    - All other inputs follow same pattern

23. **Button Container**: `<div className="form-buttons">`
    - Groups action buttons for styling

24. **Dynamic Submit Button**: `{editingMovie ? 'Update Movie' : 'Add Movie'}`
    - Button text changes based on mode
    - Clear indication of what action will happen

25. **Cancel Button**: `<button type="button" onClick={onCancel}>`
    - `type="button"` prevents form submission
    - Calls parent's cancel function
    - Allows user to exit without saving

26. **Export Statement**: `export default MovieForm;`
    - Makes component available for import

### Key Advanced Concepts:
- **Dual-Mode Component**: Single component handles multiple use cases
- **Data Transformation**: Converting between display and storage formats
- **Effect Dependencies**: useEffect responds to prop changes
- **Conditional Logic**: Different behavior based on props
- **Form Reset**: Clearing state after operations
- **Type Conversion**: String ↔ Array ↔ Number conversions

Now update your main `App.js` to handle all these new features:

```jsx
import React, { useState, useEffect } from 'react';
import MoviesList from './components/MoviesList';
import MovieForm from './components/MovieForm';
import SearchBar from './components/SearchBar';
import './App.css';

const initialMovies = [
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
  const [movies, setMovies] = useState(initialMovies);
  const [filteredMovies, setFilteredMovies] = useState(initialMovies);
  const [showForm, setShowForm] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [nextId, setNextId] = useState(3);

  useEffect(() => {
    console.log(`Total movies: ${movies.length}`);
  }, [movies]);

  const handleAddMovie = (newMovie) => {
    const movieWithId = { ...newMovie, id: nextId };
    const updatedMovies = [...movies, movieWithId];
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
    setNextId(nextId + 1);
    setShowForm(false);
  };

  const handleUpdateMovie = (updatedMovie) => {
    const updatedMovies = movies.map(movie =>
      movie.id === updatedMovie.id ? updatedMovie : movie
    );
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
    setEditingMovie(null);
    setShowForm(false);
  };

  const handleDeleteMovie = (movieId) => {
    const updatedMovies = movies.filter(movie => movie.id !== movieId);
    setMovies(updatedMovies);
    setFilteredMovies(updatedMovies);
  };

  const handleEditMovie = (movie) => {
    setEditingMovie(movie);
    setShowForm(true);
  };

  const handleSearch = (searchTerm) => {
    if (searchTerm.trim() === '') {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie =>
        movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
        movie.genre.some(g => g.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      setFilteredMovies(filtered);
    }
  };

  const handleShowForm = () => {
    setEditingMovie(null);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setEditingMovie(null);
    setShowForm(false);
  };

  return (
    <div className="App">
      <header>
        <div id="title">
          <div id="title-text">
            <h1>🎬 Movie Buzz</h1>
            <h4>Where all the best movies live...</h4>
          </div>
        </div>
        <div id="add-new">
          <button onClick={handleShowForm}>Add New Movie</button>
        </div>
      </header>
      
      {showForm ? (
        <MovieForm 
          onAddMovie={handleAddMovie}
          onUpdateMovie={handleUpdateMovie}
          onCancel={handleCancelForm}
          editingMovie={editingMovie}
        />
      ) : (
        <>
          <SearchBar onSearch={handleSearch} />
          <MoviesList 
            movies={filteredMovies}
            onDelete={handleDeleteMovie}
            onEdit={handleEditMovie}
          />
        </>
      )}
      
      <footer>&copy; Copyright 2024 Buzzware, Inc.</footer>
    </div>
  );
}

export default App;
```

---

## Event Handling Best Practices ##

1. **Use descriptive function names**: `handleSubmit`, `handleInputChange`, not just `onClick`

2. **Prevent memory leaks**: Always clean up event listeners in useEffect

3. **Avoid inline functions for complex logic**: Extract to separate functions

4. **Use callback functions properly**: Pass functions, not function calls
   ```jsx
   // Good
   <button onClick={handleClick}>Click me</button>
   
   // Bad (calls function immediately)
   <button onClick={handleClick()}>Click me</button>
   ```

5. **Handle edge cases**: Check for null values, empty arrays, etc.

---

## State Management Patterns ##

As your app grows, consider these patterns:

1. **Lift state up**: Move state to the lowest common ancestor
2. **Single source of truth**: Don't duplicate state across components  
3. **Immutable updates**: Always create new objects/arrays when updating state
4. **Separate concerns**: Keep different types of state in different useState calls

---

## Final Thoughts ##

We've significantly enhanced our Movie Buzz app with advanced React features:

- Complex event handling and user interactions
- Search functionality with real-time filtering
- Full CRUD operations (Create, Read, Update, Delete)
- Custom hooks for reusable logic
- Advanced useEffect patterns with cleanup

Our app now demonstrates professional-level React development patterns that you'll use in real-world applications.

> `Consider This`  
> How has managing multiple pieces of state changed the complexity of our application? What patterns help keep it manageable?

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Review ##

- How do you handle complex user interactions in React?
- What is a custom hook and when would you create one?
- When do you need cleanup functions in useEffect?
- How do you implement search functionality in a React app?
- What are the best practices for event handling in React?
- How do you manage multiple related pieces of state?