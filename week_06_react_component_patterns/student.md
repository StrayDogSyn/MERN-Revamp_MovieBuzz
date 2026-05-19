# Week 6 - React Component Patterns & Composition

## Learning Objectives

By the end of this session, you will be able to:
- Build complex UIs using component composition
- Create reusable component libraries
- Implement loading and error states
- Use advanced prop patterns
- Structure React applications effectively

## Simple Pattern Examples - Building Understanding

Before applying patterns to Movie Buzz, let's explore simple examples of component patterns:

### Example 1: Basic Container Component

Create `src/components/Box.js`:

```javascript
// A simple container that wraps content
function Box({ color = 'lightblue', children }) {
  return (
    <div style={{
      backgroundColor: color,
      padding: '20px',
      margin: '10px',
      borderRadius: '8px'
    }}>
      {children}
    </div>
  );
}

// Usage
<Box color="lightgreen">
  <h3>Hello World</h3>
  <p>This is inside a box!</p>
</Box>
```

### Example 2: List and Item Pattern

Create `src/components/SimpleList.js`:

```javascript
// Parent component that manages the list
function SimpleList({ items }) {
  return (
    <ul>
      {items.map(item => (
        <SimpleListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

// Child component for individual items
function SimpleListItem({ item }) {
  return (
    <li>
      <strong>{item.title}:</strong> {item.description}
    </li>
  );
}

// Usage
const items = [
  { id: 1, title: 'First', description: 'First item' },
  { id: 2, title: 'Second', description: 'Second item' }
];
<SimpleList items={items} />
```

### Example 3: Conditional Rendering Pattern

Create `src/components/Alert.js`:

```javascript
function Alert({ type = 'info', message, onClose }) {
  const colors = {
    info: 'blue',
    success: 'green',
    warning: 'orange',
    error: 'red'
  };

  return (
    <div style={{
      color: colors[type],
      padding: '10px',
      border: `1px solid ${colors[type]}`
    }}>
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} style={{ marginLeft: '10px' }}>
          Dismiss
        </button>
      )}
    </div>
  );
}

// Usage examples
<Alert type="success" message="Operation successful!" />
<Alert type="error" message="Something went wrong" onClose={() => console.log('closed')} />
```

> `Try It Out`
> Create these simple pattern components and experiment with:
> - Passing different props
> - Nesting components
> - Conditional rendering
> - Component composition

## Component Composition

### What is Composition?

Now that you've seen simple examples, let's understand composition more deeply. Composition is about building components from other components. Instead of using inheritance, React uses composition to share code between components.

```javascript
// Instead of inheritance
class SpecialButton extends Button { }

// React uses composition
function SpecialButton(props) {
  return <Button color="red" {...props} />;
}
```

### Children Prop

The `children` prop allows you to pass components as data to other components:

```javascript
function Card({ children, title }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      <div className="card-content">
        {children}
      </div>
    </div>
  );
}

// Usage
<Card title="Movie Details">
  <p>Any content can go here!</p>
  <button>Click me</button>
</Card>
```

## Building Reusable Components

### Modal Component

```javascript
function Modal({ isOpen, onClose, title, children }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>×</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
}
```

### Loading Component

```javascript
function LoadingSpinner({ size = "medium", message = "Loading..." }) {
  return (
    <div className={`loading-spinner ${size}`}>
      <div className="spinner"></div>
      <p>{message}</p>
    </div>
  );
}
```

### Error Boundary

```javascript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

## Compound Components Pattern

Compound components work together to form a complete UI:

```javascript
function Tabs({ children, defaultTab }) {
  const [activeTab, setActiveTab] = useState(defaultTab);

  return (
    <div className="tabs">
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

function TabList({ children, activeTab, setActiveTab }) {
  return (
    <div className="tab-list">
      {React.Children.map(children, child =>
        React.cloneElement(child, { activeTab, setActiveTab })
      )}
    </div>
  );
}

function Tab({ id, children, activeTab, setActiveTab }) {
  return (
    <button
      className={`tab ${activeTab === id ? 'active' : ''}`}
      onClick={() => setActiveTab(id)}
    >
      {children}
    </button>
  );
}

function TabPanels({ children, activeTab }) {
  return (
    <div className="tab-panels">
      {React.Children.map(children, child =>
        child.props.id === activeTab ? child : null
      )}
    </div>
  );
}

function TabPanel({ children }) {
  return <div className="tab-panel">{children}</div>;
}

// Usage
<Tabs defaultTab="cast">
  <TabList>
    <Tab id="cast">Cast</Tab>
    <Tab id="crew">Crew</Tab>
    <Tab id="details">Details</Tab>
  </TabList>
  <TabPanels>
    <TabPanel id="cast">Cast information...</TabPanel>
    <TabPanel id="crew">Crew information...</TabPanel>
    <TabPanel id="details">Movie details...</TabPanel>
  </TabPanels>
</Tabs>
```

## Toast Notifications

```javascript
function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 3000);
  };

  return (
    <>
      {children({ addToast })}
      <div className="toast-container">
        {toasts.map(toast => (
          <Toast key={toast.id} {...toast} />
        ))}
      </div>
    </>
  );
}

function Toast({ message, type }) {
  return (
    <div className={`toast toast-${type}`}>
      {message}
    </div>
  );
}
```

## Project Tasks

### 1. Create a Component Library

Build these reusable components for Movie Buzz:
- Modal for movie details
- LoadingSpinner for async operations
- ErrorBoundary for error handling
- Toast for notifications
- Card component for consistent styling
- Button component with variants

### 2. Implement Loading States

Add proper loading states to your app:
```javascript
function MoviesList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMovies()
      .then(data => {
        setMovies(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;
  if (movies.length === 0) return <EmptyState />;

  return <MovieGrid movies={movies} />;
}
```

### 3. Add Modal for Movie Details

```javascript
function MovieDetailsModal({ movie, isOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={movie?.name}>
      {movie && (
        <>
          <img src={movie.poster} alt={movie.name} />
          <p>{movie.description}</p>
          <div>
            <strong>Director:</strong> {movie.director}
          </div>
          <div>
            <strong>Stars:</strong> {movie.stars.join(', ')}
          </div>
        </>
      )}
    </Modal>
  );
}
```

## Best Practices

1. **Keep components focused** - Each component should do one thing well
2. **Use composition over inheritance** - Build complex UIs from simple parts
3. **Make components reusable** - Think about how components might be used elsewhere
4. **Handle edge cases** - Loading, error, and empty states
5. **Use semantic HTML** - For accessibility
6. **Test your components** - Ensure they work in isolation

## Review Questions

1. What is component composition and why is it preferred over inheritance?
2. How does the children prop work?
3. What are compound components?
4. Why are loading and error states important?
5. How do you make components reusable?

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Next Week Preview

In Week 7, we'll dive into advanced React hooks and Context API for global state management!