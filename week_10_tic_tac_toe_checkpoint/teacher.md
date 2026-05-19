# Week 8 - Tic Tac Toe Checkpoint Project #

> **⚠️ IMPORTANT TEACHER NOTE:**  
> The `tic-tac-toe-finished` folder contains the complete reference implementation.  
> **REMOVE THIS FOLDER** before distributing to students! It's provided for teacher reference only.  
> Students should work with the `tic-tac-toe-checkpoint` starter code that contains TODO comments.

- [Week 8 - Tic Tac Toe Checkpoint Project](#week-8---tic-tac-toe-checkpoint-project)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Project Overview](#project-overview)
  - [Teaching Strategy](#teaching-strategy)
  - [Phase 1: Project Planning and Setup](#phase-1-project-planning-and-setup)
    - [Architectural Discussion](#architectural-discussion)
    - [Component Design](#component-design)
    - [API Design](#api-design)
  - [Phase 2: React Frontend Development](#phase-2-react-frontend-development)
    - [Component Architecture Teaching](#component-architecture-teaching)
    - [State Management Patterns](#state-management-patterns)
    - [Event Handling Best Practices](#event-handling-best-practices)
  - [Phase 3: Backend API Development](#phase-3-backend-api-development)
    - [Express Server Setup](#express-server-setup)
    - [Game Logic Implementation](#game-logic-implementation)
    - [CORS Configuration](#cors-configuration)
  - [Phase 4: Integration and Testing](#phase-4-integration-and-testing)
    - [Frontend-Backend Communication](#frontend-backend-communication)
    - [Error Handling Patterns](#error-handling-patterns)
    - [Testing Strategies](#testing-strategies)
  - [Phase 5: Advanced Features and Extensions](#phase-5-advanced-features-and-extensions)
    - [Feature Prioritization](#feature-prioritization)
    - [Code Review Process](#code-review-process)
    - [Performance Considerations](#performance-considerations)
  - [Assessment and Evaluation](#assessment-and-evaluation)
  - [Common Student Challenges](#common-student-challenges)
  - [Troubleshooting Guide](#troubleshooting-guide)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

**Special Note**: This is a checkpoint project session. Students will need extended time for development. Consider breaking this into multiple sessions or providing additional lab time. **This project follows the STARTER CODE APPROACH - never provide complete implementations, only TODO-guided starter code.**

---

## Background ##

This checkpoint project consolidates everything students have learned in Weeks 3-7 of the restructured MERN curriculum. Students have completed React fundamentals, state management, event handling, Node.js basics, and Express with CORS. This project serves as both an assessment tool and a confidence-building exercise before diving into database operations in Week 9.

**Key Consolidation Areas**:
- **React Concepts**: Functional components, hooks, state management, event handling
- **Backend Development**: Node.js, Express servers, API design, CORS
- **Integration Skills**: Frontend-backend communication, error handling, async operations
- **Professional Practices**: Code organization, testing, debugging, deployment

**Teaching Philosophy**: Guide students through building a complete application while reinforcing best practices and problem-solving skills. **CRITICAL: Always use the STARTER CODE approach - provide incomplete functions with TODO comments for students to implement. Never give complete solutions.**

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Build a complete full-stack application using React and Express
- Implement complex state management with React hooks
- Create multiple React components with proper data flow
- Handle user events and form interactions in React
- Build RESTful API endpoints with Express
- Implement proper CORS configuration for frontend-backend communication
- Manage asynchronous operations and API calls
- Apply error handling patterns across the full stack
- Test and debug a complete application
- Deploy a full-stack application (bonus)

---

## Glossary ##

- `Checkpoint Project`: A comprehensive project that consolidates multiple weeks of learning
- `Game State`: The current condition of the game (board, current player, winner, etc.)
- `Component Tree`: The hierarchical structure of React components
- `State Lifting`: Moving state up to a common ancestor component
- `API Endpoint`: A specific URL where the backend provides data or services
- `Game Logic`: The rules and mechanics that determine valid moves and win conditions
- `Turn Management`: System for tracking and switching between players
- `Win Detection`: Algorithm to determine if a player has won the game

---

## Project Overview ##

**Teaching Strategy**: Present this as a real-world development scenario where students are building a game for a client.

**Project Scope**:
The Tic Tac Toe Checkpoint Project is a full-stack web application that demonstrates professional development practices. Students will build both frontend and backend components, integrate them properly, and implement industry-standard patterns.

**Key Features**:
1. **Interactive Game Board**: 3x3 grid with proper state management
2. **Turn Management**: Alternating between X and O players with validation
3. **Win Detection**: Complete algorithm for all winning conditions
4. **Statistics Tracking**: Persistent game statistics across sessions
5. **Error Handling**: Comprehensive error handling on both client and server
6. **Responsive Design**: Professional UI that works across devices
7. **API Integration**: RESTful backend with proper CORS configuration

**Technologies Demonstration**:
- **Frontend**: React functional components, hooks, event handling, fetch API
- **Backend**: Express.js, middleware, RESTful routing, input validation
- **Integration**: CORS, async/await, error propagation, state synchronization

---

## Teaching Strategy ##

**Session Structure Recommendation**:
- **Planning Phase (30 minutes)**: Architecture discussion and setup
- **Development Phase 1 (90 minutes)**: React frontend components
- **Development Phase 2 (90 minutes)**: Express backend API
- **Integration Phase (60 minutes)**: Connect frontend to backend
- **Testing Phase (30 minutes)**: Debug and test complete application
- **Extension Phase (variable)**: Advanced features for early finishers

**Teaching Approach**:
1. **Guided Development**: Walk through each major component together
2. **Independent Practice**: Students implement with instructor support
3. **Peer Learning**: Encourage students to help each other
4. **Code Reviews**: Regular check-ins to ensure quality
5. **Problem-Solving Focus**: Emphasize debugging and troubleshooting skills

---

## Phase 1: Project Planning and Setup ##

**Teaching Focus**: Architecture and planning are crucial for successful full-stack development.

### Architectural Discussion ###

**Whiteboard Exercise**: Draw the application architecture with students.

```
┌─────────────────┐    HTTP/CORS     ┌─────────────────┐
│   React App     │◄─────────────────┤  Express API    │
│   (Frontend)    │                  │   (Backend)     │
├─────────────────┤                  ├─────────────────┤
│ • Components    │                  │ • Routes        │
│ • State/Hooks   │                  │ • Controllers   │
│ • Event Handlers│                  │ • Game Logic    │
│ • API Calls     │                  │ • Validation    │
└─────────────────┘                  └─────────────────┘
```

**Key Teaching Points**:
1. **Separation of Concerns**: Frontend handles UI, backend handles logic
2. **API Design**: RESTful endpoints for game operations
3. **State Management**: Frontend state vs. backend validation
4. **Error Handling**: Comprehensive error handling at all layers

**Discussion Questions**:
- Why separate frontend and backend logic?
- What game operations need API endpoints?
- How should we handle invalid moves?
- What data needs to persist between games?

### Component Design ###

**Component Hierarchy Planning**:

```
App
├── GameStatus
├── GameBoard
│   └── GameSquare (×9)
├── GameControls
├── GameStats
└── ErrorBoundary
```

**Teaching Strategy**: Build this hierarchy on the board with students, discussing each component's responsibility.

**Component Responsibilities**:
- **App**: Main state management and API coordination
- **GameStatus**: Display current game state and winner
- **GameBoard**: Render 3×3 grid and handle layout
- **GameSquare**: Individual square with click handling
- **GameControls**: New game and reset buttons
- **GameStats**: Display win/loss/draw statistics
- **ErrorBoundary**: Catch and display React errors

### API Design ###

**RESTful API Planning**:

```
POST /api/game/new        - Start new game
POST /api/game/move       - Make a move
GET  /api/game/stats      - Get statistics
POST /api/game/reset-stats - Reset statistics
GET  /api/game/history    - Get game history (bonus)
```

**Teaching Points**:
- **HTTP Methods**: POST for actions, GET for data retrieval
- **Request/Response Format**: Consistent JSON structure
- **Error Responses**: Proper HTTP status codes
- **Validation**: Backend validates all moves

---

## Phase 2: React Frontend Development ##

### Component Architecture Teaching ###

**Teaching Strategy**: Build components incrementally, starting with the simplest. **Use STARTER CODE approach with TODO comments.**

**Start with GameSquare (Simplest Component) - STARTER CODE**:

```javascript
// Start here - most basic component with TODOs for students
function GameSquare({ value, onClick, disabled, position }) {
  // TODO: Students implement props destructuring, event handling, conditional classes
  
  const handleClick = () => {
    // TODO: Students implement click validation
    // - Check if square is disabled
    // - Check if square already has a value
    // - Call onClick if valid
  };

  const getSquareClass = () => {
    // TODO: Students implement dynamic class generation
    // Start with: let className = 'game-square';
    // Add conditions for: occupied, disabled, clickable
    // Return the complete className string
  };

  return (
    // TODO: Students implement the button element
    // Include: className, onClick, disabled, aria-label
    // Display the value inside the button
  );
}
```

**Key Teaching Points**:
1. **Props Destructuring**: Clean parameter extraction
2. **Conditional Rendering**: Dynamic class names and content
3. **Event Handling**: Proper click handling with validation
4. **Accessibility**: ARIA labels for screen readers
5. **Pure Component**: No internal state, just props transformation

**Build GameBoard Next - STARTER CODE**:

```javascript
// Teach: mapping over data, passing props down - STARTER CODE
function GameBoard({ board, onSquareClick, disabled }) {
  return (
    <div className="game-board">
      {/* TODO: Students implement board.map() to render GameSquare components */}
      {/* Each GameSquare needs: key, value, onClick, disabled, position props */}
      {/* Use arrow function for onClick: () => onSquareClick(index) */}
    </div>
  );
}
```

**Teaching Points**:
1. **Array Mapping**: Transform data into components
2. **Key Props**: Proper React key usage
3. **Prop Drilling**: Passing functions down the component tree
4. **Anonymous Functions**: Creating handlers with parameters

### State Management Patterns ###

**Complex State in App Component**:

**Teaching Strategy**: Build state incrementally, explaining each piece. **Provide STARTER CODE with TODOs.**

```javascript
// Start with basic state - STARTER CODE
const [gameState, setGameState] = useState({
  // TODO: Students define initial game state structure
  // Include: board (Array(9).fill(null)), currentPlayer, winner, isDraw, gameActive
});

// TODO: Students add UI state
// Add loading state (boolean)
// Add error state (string or null)

// TODO: Students add statistics state
// Include: xWins, oWins, draws, totalGames (all start at 0)
```

**Key Teaching Points**:
1. **State Organization**: Group related state together
2. **Complex State Objects**: When to use objects vs. separate state
3. **State Immutability**: Never mutate state directly
4. **Loading and Error States**: Essential for good UX

**State Update Patterns - STARTER CODE**:

```javascript
// Teach proper state updates - STARTER CODE
const handleSquareClick = async (index) => {
  // TODO: Students implement validation before state change
  // Check: gameState.gameActive, gameState.board[index], loading
  // Return early if any validation fails

  try {
    // TODO: Students implement loading state management
    // Set loading to true, clear any existing errors

    // TODO: Students implement API call
    // Use fetch with POST method, proper headers, JSON body
    // Include: board, position (index), current player

    // TODO: Students handle API response
    // Parse JSON response
    // Check if result.success is true
    // Update gameState with result.data
    // Load stats if game ended (winner or draw)
    // Handle errors appropriately
    
  } catch (error) {
    // TODO: Students implement error handling
    // Log error to console
    // Set user-friendly error message
  } finally {
    // TODO: Students reset loading state
  }
};
```

**Teaching Points**:
1. **Async State Updates**: Handling API calls with loading states
2. **Error Handling**: Setting error state appropriately
3. **Conditional Updates**: Only update stats when game ends
4. **Finally Blocks**: Always reset loading state

### Event Handling Best Practices ###

**Teaching Focus**: Proper event handling prevents bugs and improves UX.

**Event Handler Patterns**:

```javascript
// Teach different event handler patterns

// 1. Simple click handler
const handleNewGame = () => {
  initializeGame();
};

// 2. Handler with parameters
const handleSquareClick = (index) => {
  makeMove(index);
};

// 3. Async handler with error handling
const handleResetStats = async () => {
  try {
    setLoading(true);
    const response = await fetch(`${API_BASE_URL}/game/reset-stats`, {
      method: 'POST'
    });
    const result = await response.json();
    
    if (result.success) {
      setStats({ xWins: 0, oWins: 0, draws: 0, totalGames: 0 });
    } else {
      setError('Failed to reset statistics');
    }
  } catch (error) {
    setError('Failed to reset statistics');
  } finally {
    setLoading(false);
  }
};
```

**Key Teaching Points**:
1. **Handler Naming**: Use descriptive names starting with "handle"
2. **Parameter Passing**: Use arrow functions for parameters
3. **Async Handling**: Proper async/await with error handling
4. **Loading States**: Always provide user feedback

---

## Phase 3: Backend API Development ##

### Express Server Setup ###

**Teaching Strategy**: Build the server incrementally, explaining each middleware.

**Basic Server Structure - STARTER CODE**:

```javascript
const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// TODO: Students implement middleware setup
// Add express.json() for parsing JSON bodies
// Add CORS configuration for origin 'http://localhost:3000'

// TODO: Students implement root route
// GET '/' should return JSON with API info and available endpoints

// TODO: Students connect game routes
// Use '/api/game' prefix for gameRoutes

// TODO: Students implement 404 handler
// Use app.use('*', ...) to catch all unmatched routes
// Return 404 status with error message

// TODO: Students implement global error handler
// Use app.use((error, req, res, next) => ...)
// Log error and return 500 status

// TODO: Students start the server
// Use app.listen() with PORT and success message
```

**Key Teaching Points**:
1. **Middleware Order**: JSON parsing before routes, CORS before everything
2. **Route Organization**: Separate route files for organization
3. **Error Handling**: 404 handler and general error handler
4. **Consistent Response Format**: Always use success/error pattern

### Game Logic Implementation ###

**Teaching Focus**: Separate game logic from API controllers for better testing and organization.

**Game Logic Utility**:

**Start with Win Detection Algorithm - STARTER CODE**:

```javascript
// Teach: algorithm design, array manipulation - STARTER CODE
const checkWinner = (board) => {
  // TODO: Students define winning combinations
  // Rows: [0,1,2], [3,4,5], [6,7,8]
  // Columns: [0,3,6], [1,4,7], [2,5,8]  
  // Diagonals: [0,4,8], [2,4,6]
  
  // TODO: Students implement winner checking loop
  // Use for...of loop to check each combination
  // Use array destructuring: const [a, b, c] = combination
  // Check if board[a] exists and equals board[b] and board[c]
  // Return winner and winning combination if found
  
  // TODO: Return null result if no winner found
};
```

**Teaching Points**:
1. **Algorithm Design**: How to represent winning conditions
2. **Array Destructuring**: Clean variable extraction
3. **Logical Operators**: Chaining conditions efficiently
4. **Return Objects**: Structured return values

**Move Validation**:

```javascript
// Teach: input validation, error handling
const isValidMove = (board, position) => {
  // Check position is valid index
  if (position < 0 || position > 8) {
    return false;
  }

  // Check if square is empty
  return board[position] === null;
};

const makeMove = (currentBoard, position, player) => {
  // Validate move
  if (!isValidMove(currentBoard, position)) {
    throw new Error('Invalid move: square is already occupied or position is invalid');
  }

  // Create new board with move
  const newBoard = [...currentBoard];
  newBoard[position] = player;

  // Check for winner
  const { winner, winningCombination } = checkWinner(newBoard);
  
  // Check for draw
  const isDraw = !winner && checkDraw(newBoard);

  // Determine next player
  const nextPlayer = player === 'X' ? 'O' : 'X';

  return {
    board: newBoard,
    currentPlayer: winner || isDraw ? player : nextPlayer,
    winner,
    isDraw,
    gameActive: !winner && !isDraw,
    winningCombination
  };
};
```

**Teaching Points**:
1. **Immutability**: Create new arrays, don't mutate originals
2. **Error Throwing**: When and how to throw descriptive errors
3. **State Transitions**: How game state changes with each move
4. **Edge Cases**: Handle draws and game-ending conditions

**Controller Implementation**:

```javascript
// Teach: controller pattern, input validation, error handling
const move = (req, res) => {
  try {
    const { board, position, player } = req.body;

    // Input validation - teach comprehensive validation
    if (!board || position === undefined || !player) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields: board, position, player'
      });
    }

    if (!Array.isArray(board) || board.length !== 9) {
      return res.status(400).json({
        success: false,
        error: 'Board must be an array of 9 elements'
      });
    }

    if (typeof position !== 'number' || position < 0 || position > 8) {
      return res.status(400).json({
        success: false,
        error: 'Position must be a number between 0 and 8'
      });
    }

    if (player !== 'X' && player !== 'O') {
      return res.status(400).json({
        success: false,
        error: 'Player must be either "X" or "O"'
      });
    }

    // Make the move
    const newGameState = makeMove(board, position, player);

    // If game ended, save to history
    if (newGameState.winner || newGameState.isDraw) {
      gameHistory.push({
        ...newGameState,
        completedAt: new Date()
      });
    }

    res.json({
      success: true,
      message: 'Move made successfully',
      data: newGameState
    });

  } catch (error) {
    console.error('Error making move:', error);
    
    // Handle specific game logic errors
    if (error.message.includes('Invalid move')) {
      return res.status(400).json({
        success: false,
        error: error.message
      });
    }

    res.status(500).json({
      success: false,
      error: 'Failed to make move'
    });
  }
};
```

**Key Teaching Points**:
1. **Input Validation**: Validate every input thoroughly
2. **HTTP Status Codes**: 400 for client errors, 500 for server errors
3. **Error Categorization**: Handle different error types appropriately
4. **Consistent Response Format**: Always return success/error structure

### CORS Configuration ###

**Teaching Focus**: CORS is essential for frontend-backend communication.

**CORS Explanation**:

```javascript
// Basic CORS setup
app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  credentials: true,               // Allow cookies/auth
  methods: ['GET', 'POST'],        // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

**Teaching Points**:
1. **Same-Origin Policy**: Why CORS is needed
2. **Development vs Production**: Different origins for different environments
3. **Security Considerations**: Don't allow all origins in production
4. **Preflight Requests**: Why OPTIONS requests happen

**Debug CORS Issues**:

```javascript
// Add CORS debugging middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} from origin: ${req.headers.origin}`);
  next();
});
```

---

## Phase 4: Integration and Testing ##

### Frontend-Backend Communication ###

**Teaching Strategy**: Show the complete request-response cycle.

**API Service Pattern**:

```javascript
// Teach: service layer pattern, error handling, consistency
const API_BASE_URL = 'http://localhost:4000/api';

const apiCall = async (endpoint, options = {}) => {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      },
      ...options
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'API request failed');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Game API methods
export const gameAPI = {
  newGame: () => apiCall('/game/new', { method: 'POST' }),
  makeMove: (board, position, player) => 
    apiCall('/game/move', {
      method: 'POST',
      body: JSON.stringify({ board, position, player })
    }),
  getStats: () => apiCall('/game/stats'),
  resetStats: () => apiCall('/game/reset-stats', { method: 'POST' })
};
```

**Teaching Points**:
1. **Service Layer**: Centralize API calls for consistency
2. **Error Handling**: Consistent error handling across all API calls
3. **Request Configuration**: Proper headers and body formatting
4. **Response Processing**: Always check response status

### Error Handling Patterns ###

**Comprehensive Error Handling**:

**Frontend Error Handling**:

```javascript
// Teach: user-friendly error messages, error recovery
const handleError = (error, setError) => {
  console.error('Application error:', error);
  
  // Categorize errors for user-friendly messages
  if (error.message.includes('Failed to fetch')) {
    setError('Unable to connect to server. Please check your internet connection.');
  } else if (error.message.includes('Invalid move')) {
    setError('That square is already taken. Please choose another.');
  } else if (error.message.includes('validation')) {
    setError('Invalid input. Please check your data and try again.');
  } else {
    setError('Something went wrong. Please try again.');
  }
};
```

**Error Boundary Component**:

```javascript
// Teach: React error boundaries for component errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong!</h2>
          <p>We're sorry - something's gone wrong.</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
```

**Teaching Points**:
1. **User-Friendly Messages**: Don't show technical errors to users
2. **Error Recovery**: Provide ways for users to recover
3. **Error Logging**: Always log errors for debugging
4. **Fallback UI**: Error boundaries prevent white screen of death

### Testing Strategies ###

**Manual Testing Checklist**:

**Frontend Testing**:
1. All buttons respond correctly
2. Game state updates visually
3. Error messages display properly
4. Loading states show during API calls
5. Statistics update after games

**Backend Testing**:

```bash
# Test API endpoints with curl
curl -X POST http://localhost:4000/api/game/new
curl -X POST http://localhost:4000/api/game/move \
  -H "Content-Type: application/json" \
  -d '{"board":[null,null,null,null,null,null,null,null,null],"position":0,"player":"X"}'
curl http://localhost:4000/api/game/stats
```

**Integration Testing**:
1. Frontend successfully calls backend
2. CORS headers are present
3. Error messages propagate correctly
4. Loading states work during API calls

---

## Phase 5: Advanced Features and Extensions ##

### Feature Prioritization ###

**For Students Who Finish Early**:

1. **High Priority**: Game history, better statistics display
2. **Medium Priority**: Animations, sound effects, themes
3. **Low Priority**: AI opponent, multiplayer, PWA features

**Game History Implementation**:

```javascript
// Teach: data persistence, UI for displaying lists
const GameHistory = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      const result = await gameAPI.getHistory(20);
      setHistory(result.data);
    } catch (error) {
      console.error('Error loading history:', error);
    }
  };

  return (
    <div className="game-history">
      <h3>Recent Games</h3>
      {history.map((game, index) => (
        <div key={index} className="history-item">
          <span>{game.winner ? `${game.winner} Won` : 'Draw'}</span>
          <span>{new Date(game.completedAt).toLocaleString()}</span>
        </div>
      ))}
    </div>
  );
};
```

### Code Review Process ###

**Code Review Checklist**:

**React Code Quality**:
- [ ] Components are properly named and structured
- [ ] Props are properly typed and documented
- [ ] State updates are immutable
- [ ] Event handlers are properly bound
- [ ] Loading and error states are handled

**Express Code Quality**:
- [ ] Routes are RESTful and well-organized
- [ ] Input validation is comprehensive
- [ ] Error handling is consistent
- [ ] Response format is standardized
- [ ] CORS is properly configured

**Integration Quality**:
- [ ] API calls handle errors gracefully
- [ ] Loading states provide good UX
- [ ] Error messages are user-friendly
- [ ] State synchronizes between client/server

### Performance Considerations ###

**Optimization Opportunities**:

```javascript
// Teach: React.memo for performance
const GameSquare = React.memo(({ value, onClick, disabled, position }) => {
  // Component implementation
});

// Teach: useMemo for expensive calculations
const gameStats = useMemo(() => {
  return calculateDetailedStats(gameHistory);
}, [gameHistory]);

// Teach: useCallback for stable function references
const handleSquareClick = useCallback((index) => {
  if (!gameState.gameActive || gameState.board[index] || loading) {
    return;
  }
  makeMove(index);
}, [gameState.gameActive, gameState.board, loading, makeMove]);
```

---

## Assessment and Evaluation ##

### Functionality Assessment ###

**Core Requirements (Must Have)**:
- [ ] Game board renders correctly
- [ ] Players can make moves by clicking squares
- [ ] Turn alternation works properly
- [ ] Win detection works for all conditions
- [ ] Draw detection works correctly
- [ ] New game resets state properly
- [ ] Backend validates all moves
- [ ] Statistics track correctly

**Technical Requirements (Must Have)**:
- [ ] Uses functional components only
- [ ] Implements React hooks properly
- [ ] Express server with CORS configured
- [ ] RESTful API design
- [ ] Proper error handling on both sides
- [ ] Loading states during API calls

**Advanced Features (Nice to Have)**:
- [ ] Game history tracking
- [ ] Enhanced statistics display
- [ ] Responsive design
- [ ] Error boundary implementation
- [ ] Accessibility features
- [ ] Performance optimizations

### Code Quality Assessment ###

**React Best Practices**:
- Component organization and naming
- Proper use of hooks
- State management patterns
- Event handling implementation
- Error handling and loading states

**Express Best Practices**:
- Route organization
- Input validation
- Error handling
- Response consistency
- CORS configuration

**Integration Best Practices**:
- API communication patterns
- Error propagation
- State synchronization
- User experience considerations

---

## Common Student Challenges ##

### Technical Challenges ###

**"My components aren't updating"**:
- Check state mutation vs. immutable updates
- Verify useEffect dependencies
- Debug with React Developer Tools (when available online)

**"CORS errors in browser"**:
- Verify CORS middleware is configured
- Check origin URL matches exactly
- Ensure server is running on correct port

**"API calls aren't working"**:
- Check fetch URL construction
- Verify request headers and body
- Check server logs for errors
- Test endpoints with curl

**"State isn't syncing between components"**:
- Review component hierarchy
- Check prop passing
- Consider lifting state up
- Debug with console.log

### Conceptual Challenges ###

**"I don't understand when to use hooks"**:
- useState for component data that changes
- useEffect for side effects and lifecycle
- useMemo/useCallback for performance

**"Why separate frontend and backend?"**:
- Separation of concerns
- Scalability and maintainability
- Security considerations
- Team development workflows

---

## Troubleshooting Guide ##

### Common Errors and Solutions ###

**Frontend Issues**:

```javascript
// Error: Cannot read property of undefined
// Solution: Add optional chaining
const winner = gameState?.winner;

// Error: Invalid hook call
// Solution: Ensure hooks are at top level
function MyComponent() {
  const [state, setState] = useState(); // ✓ Correct
  
  if (condition) {
    const [badState, setBadState] = useState(); // ✗ Wrong
  }
}

// Error: Maximum update depth exceeded
// Solution: Use useCallback or move function outside component
const handleClick = useCallback(() => {
  // handler code
}, [dependencies]);
```

**Backend Issues**:

```javascript
// Error: Cannot set headers after they are sent
// Solution: Ensure only one response per request
if (error) {
  return res.status(400).json({ error }); // Use return!
}
res.json({ success: true }); // This won't execute

// Error: Validation error
// Solution: Check input types and required fields
const { board, position, player } = req.body;
if (typeof position !== 'number') {
  return res.status(400).json({ error: 'Position must be number' });
}
```

**Integration Issues**:

```javascript
// Error: Network request failed
// Solution: Check CORS, server running, URL correct
const response = await fetch('http://localhost:4000/api/game/move', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
});

// Check response status
if (!response.ok) {
  throw new Error(`HTTP ${response.status}: ${response.statusText}`);
}
```

### Debugging Strategies ###

1. **Console Logging**: Add strategic console.log statements
2. **React Developer Tools** (when available online): Inspect component state and props
3. **Network Tab**: Monitor API requests and responses
4. **Server Logs**: Check server console for errors
5. **Postman/curl**: Test API endpoints independently

---

## Final Thoughts ##

**Major Achievement Celebration**: Students have built their first complete full-stack application!

This Tic Tac Toe checkpoint project represents a significant milestone in the students' learning journey. They have successfully:

**React Skills Demonstrated**:
- Built complex component hierarchies with proper data flow
- Managed application state with hooks effectively
- Handled user interactions and events professionally
- Implemented error boundaries and comprehensive error handling
- Created responsive and accessible user interfaces

**Backend Skills Demonstrated**:
- Built RESTful APIs with Express.js
- Implemented proper input validation and error handling
- Configured CORS for frontend-backend communication
- Organized code with separation of concerns
- Applied professional development practices

**Integration Skills Demonstrated**:
- Connected frontend and backend with proper API communication
- Managed asynchronous operations and loading states
- Synchronized state between client and server
- Implemented comprehensive error propagation
- Created seamless user experiences

**Professional Skills Developed**:
- Project planning and architectural thinking
- Debugging and troubleshooting complex issues
- Code organization and maintainability
- Testing strategies and quality assurance
- Performance considerations and optimization

This project serves as a solid foundation as students continue to the database integration phase of the curriculum. They've proven they can build complete, working applications using professional-grade patterns and practices.

**Looking Forward**: Students are now ready for database integration in Week 9, where they'll add MongoDB to create persistent full-stack applications with complete CRUD operations.

> `Consider This`  
> How does completing this checkpoint project demonstrate mastery of the foundational MERN stack concepts? What skills will students need to build on as they progress to database-driven applications?
>> Expect: Students should recognize they've built a complete application architecture, understand client-server separation, master async programming, and are ready to add data persistence with databases.

**Preparation for Next Week**: Students should have a working Tic Tac Toe application that demonstrates all required functionality before proceeding to MongoDB integration.

---

## Exit Ticket ##

Access code: sync95

Instruct students to open the exit ticket for this week in the LMS. You may read through the questions with the students, but do not give the students the answers to the questions. Once all students have answered the questions, you may ask students for the correct answer.

1. What is the main benefit of separating game logic into a utility file versus keeping it in the controller?
  > Answer: Easier testing, code reusability, and separation of concerns

2. Why is input validation important on the backend even if the frontend validates?
  > Answer: Security - never trust client-side validation, backend is the source of truth

3. What React hook would you use to fetch data when a component mounts?
  > Answer: useEffect with an empty dependency array

4. What does CORS stand for and why is it needed for this project?
  > Answer: Cross-Origin Resource Sharing - needed because frontend (port 3000) and backend (port 4000) are different origins

---

## Review ##

- How does this project consolidate learning from Weeks 3-7?
- What are the key architectural decisions in separating frontend and backend?
- How do React hooks manage complex application state?
- What role does input validation play in API security?
- How does proper error handling improve user experience?
- What testing strategies ensure the application works correctly?
- How do loading states and error boundaries enhance the user interface?
- What professional development practices does this project demonstrate?