# Week 10 - Tic Tac Toe Checkpoint Project #

- [Week 10 - Tic Tac Toe Checkpoint Project](#week-10---tic-tac-toe-checkpoint-project)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Project Overview](#project-overview)
  - [Technical Requirements](#technical-requirements)
  - [Project Setup](#project-setup)
  - [Phase 1: React Frontend Development](#phase-1-react-frontend-development)
    - [Component Architecture](#component-architecture)
    - [Game State Management](#game-state-management)
    - [Event Handling](#event-handling)
  - [Phase 2: Backend API Development](#phase-2-backend-api-development)
    - [Express Server Setup](#express-server-setup)
    - [Game Logic API](#game-logic-api)
    - [CORS Configuration](#cors-configuration)
  - [Phase 3: Frontend-Backend Integration](#phase-3-frontend-backend-integration)
    - [API Integration](#api-integration)
    - [Error Handling](#error-handling)
    - [State Synchronization](#state-synchronization)
  - [Phase 4: Advanced Features](#phase-4-advanced-features)
    - [Game History](#game-history)
    - [Statistics Tracking](#statistics-tracking)
    - [Multiplayer Support](#multiplayer-support)
  - [Testing and Debugging](#testing-and-debugging)
  - [Deployment Considerations](#deployment-considerations)
  - [Code Review Checklist](#code-review-checklist)
  - [Extension Challenges](#extension-challenges)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Notes About This Lesson Plan ##

Please review this lesson plan in advance of our RI session. If this plan doesn't align with where you and your classmates are at in the LMS, please send a ticket to Help Desk as soon as possible.

This code is for instructional purposes only. It should be utilized as an example in developing your own work. No part of it should be directly copied into your own project. As per TLM's plagiarism policy, submitting or misrepresenting code or an idea as your own when it was created by someone else constitutes plagiarism.

**This is a checkpoint project that consolidates everything you've learned from Weeks 3-9. You will be provided with starter code containing TODO comments to guide your implementation - never expect complete code solutions.**

## Simple Game Examples - Building Understanding

Before building the full Tic Tac Toe game, let's explore simple game concepts with smaller examples:

### Example 1: Simple Click Counter Game

Create `src/components/ClickGame.js`:

```javascript
import React, { useState } from 'react';

function ClickGame() {
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(10);
  const [gameActive, setGameActive] = useState(false);

  const startGame = () => {
    setScore(0);
    setTimeLeft(10);
    setGameActive(true);

    // Timer countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setGameActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleClick = () => {
    if (gameActive) {
      setScore(score + 1);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h2>Click Game</h2>
      <p>Score: {score}</p>
      <p>Time Left: {timeLeft}s</p>

      {!gameActive && timeLeft === 10 && (
        <button onClick={startGame}>Start Game</button>
      )}

      {gameActive && (
        <button onClick={handleClick} style={{
          padding: '20px',
          fontSize: '18px',
          backgroundColor: 'lightblue'
        }}>
          Click Me!
        </button>
      )}

      {!gameActive && timeLeft === 0 && (
        <div>
          <p>Game Over! Final Score: {score}</p>
          <button onClick={startGame}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default ClickGame;
```

### Example 2: Simple Grid Game

Create `src/components/GridGame.js`:

```javascript
import React, { useState } from 'react';

function GridGame() {
  const [grid, setGrid] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('X');
  const [gameStatus, setGameStatus] = useState('playing');

  const handleCellClick = (index) => {
    if (grid[index] !== '' || gameStatus !== 'playing') {
      return; // Cell already filled or game over
    }

    const newGrid = [...grid];
    newGrid[index] = currentPlayer;
    setGrid(newGrid);

    // Check for simple win (just first row for demo)
    if (newGrid[0] === newGrid[1] && newGrid[1] === newGrid[2] && newGrid[0] !== '') {
      setGameStatus(`${newGrid[0]} wins!`);
    } else if (newGrid.every(cell => cell !== '')) {
      setGameStatus('Draw!');
    } else {
      setCurrentPlayer(currentPlayer === 'X' ? 'O' : 'X');
    }
  };

  const resetGame = () => {
    setGrid(Array(9).fill(''));
    setCurrentPlayer('X');
    setGameStatus('playing');
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h3>Simple Grid Game</h3>
      <p>Current Player: {currentPlayer}</p>
      <p>Status: {gameStatus}</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 80px)',
        gap: '2px',
        justifyContent: 'center',
        margin: '20px 0'
      }}>
        {grid.map((cell, index) => (
          <button
            key={index}
            onClick={() => handleCellClick(index)}
            style={{
              width: '80px',
              height: '80px',
              fontSize: '24px',
              fontWeight: 'bold',
              backgroundColor: cell ? 'lightgreen' : 'lightgray'
            }}
          >
            {cell}
          </button>
        ))}
      </div>

      <button onClick={resetGame}>Reset Game</button>
    </div>
  );
}

export default GridGame;
```

### Example 3: Game State with API Simulation

Create `src/components/ApiGame.js`:

```javascript
import React, { useState } from 'react';

function ApiGame() {
  const [gameData, setGameData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Simulate API calls
  const simulateApiCall = (data) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.8) {
          reject(new Error('Random API error'));
        } else {
          resolve({ success: true, data });
        }
      }, 1000);
    });
  };

  const startNewGame = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await simulateApiCall({
        id: Date.now(),
        board: Array(9).fill(''),
        currentPlayer: 'X',
        status: 'active'
      });

      setGameData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const makeMove = async (position) => {
    if (!gameData || loading) return;

    setLoading(true);

    try {
      const newBoard = [...gameData.board];
      newBoard[position] = gameData.currentPlayer;

      const response = await simulateApiCall({
        ...gameData,
        board: newBoard,
        currentPlayer: gameData.currentPlayer === 'X' ? 'O' : 'X'
      });

      setGameData(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: 'center', padding: '20px' }}>
      <h3>Game with API Simulation</h3>

      {!gameData && (
        <button onClick={startNewGame} disabled={loading}>
          {loading ? 'Starting...' : 'Start New Game'}
        </button>
      )}

      {error && (
        <div style={{ color: 'red', margin: '10px 0' }}>
          Error: {error}
          <button onClick={() => setError('')} style={{ marginLeft: '10px' }}>
            Dismiss
          </button>
        </div>
      )}

      {gameData && (
        <div>
          <p>Game ID: {gameData.id}</p>
          <p>Current Player: {gameData.currentPlayer}</p>
          <p>Status: {gameData.status}</p>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 60px)',
            gap: '2px',
            justifyContent: 'center',
            margin: '20px 0'
          }}>
            {gameData.board.map((cell, index) => (
              <button
                key={index}
                onClick={() => makeMove(index)}
                disabled={loading || cell !== ''}
                style={{
                  width: '60px',
                  height: '60px',
                  fontSize: '20px'
                }}
              >
                {cell}
              </button>
            ))}
          </div>

          <button onClick={startNewGame} disabled={loading}>
            New Game
          </button>
        </div>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
}

export default ApiGame;
```

> `Try It Out`
> Create these simple game components to understand:
> - Game state management with useState
> - Turn-based gameplay logic
> - Grid-based user interfaces
> - Async operations and error handling
> - Timer-based game mechanics
> - API simulation patterns

These concepts will all be used in building the full Tic Tac Toe game!

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

**Tic Tac Toe Checkpoint Project** is a comprehensive full-stack application that demonstrates everything you've learned so far:

**Technologies Used:**
- **Frontend**: React with functional components and hooks
- **Backend**: Node.js with Express framework
- **Communication**: RESTful API with CORS
- **State Management**: React useState and useEffect hooks
- **Event Handling**: Click events, form submissions, and user interactions

**Key Features:**
1. **Interactive Game Board**: 3x3 grid with clickable squares
2. **Turn Management**: Alternating between X and O players
3. **Win Detection**: Automatic detection of wins, losses, and draws
4. **Game Reset**: Ability to start a new game
5. **Statistics**: Track wins, losses, and draws
6. **API Integration**: Backend handles game logic and state validation
7. **Error Handling**: Graceful handling of invalid moves and errors
8. **Responsive Design**: Works on desktop and mobile devices

**This project consolidates:**
- **Week 3**: React fundamentals and JSX
- **Week 4**: State management with hooks
- **Week 5**: Event handling and advanced hooks
- **Week 6**: Node.js backend development
- **Week 7**: Express servers and CORS configuration

---

## Technical Requirements ##

**Frontend Requirements:**
- Manual React setup (no create-react-app)
- Functional components only (no class components)
- React hooks for state management (useState, useEffect)
- Component-based architecture with proper data flow
- Event handling for user interactions
- Responsive CSS design
- Error boundary implementation

**Backend Requirements:**
- Express.js server with proper middleware
- RESTful API endpoints for game operations
- CORS configuration for frontend communication
- JSON request/response handling
- Input validation and error handling
- Game logic implementation on server

**Integration Requirements:**
- Frontend-backend communication via fetch API
- Proper error handling and user feedback
- State synchronization between client and server
- Loading states and user experience enhancements

---

## Project Setup ##

### Directory Structure ###

Create the following project structure:

```
tic-tac-toe-checkpoint/
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── GameBoard.js
│   │   │   ├── GameSquare.js
│   │   │   ├── GameStatus.js
│   │   │   ├── GameStats.js
│   │   │   └── GameControls.js
│   │   ├── App.js
│   │   ├── App.css
│   │   └── index.js
│   └── package.json
├── server/
│   ├── controllers/
│   │   └── gameController.js
│   ├── routes/
│   │   └── gameRoutes.js
│   ├── utils/
│   │   └── gameLogic.js
│   ├── server.js
│   └── package.json
└── README.md
```

### Initialize the Project ###

```bash
# Create main project directory
mkdir tic-tac-toe-checkpoint
cd tic-tac-toe-checkpoint

# Initialize client
mkdir client
cd client
npm init -y
npm install react react-dom

# Initialize server
cd ..
mkdir server
cd server
npm init -y
npm install express cors

# Return to project root
cd ..
```

---

## Phase 1: React Frontend Development ##

### Component Architecture ###

**App Component (src/App.js) - STARTER CODE**:
```javascript
import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';
import GameStats from './components/GameStats';
import GameControls from './components/GameControls';
import './App.css';

const API_BASE_URL = 'http://localhost:4000/api';

function App() {
  // TODO: Set up game state with useState
  // Include: board (Array(9).fill(null)), currentPlayer ('X'), winner, isDraw, gameActive
  
  // TODO: Set up statistics state
  // Include: xWins, oWins, draws, totalGames (all start at 0)

  // TODO: Set up UI state  
  // Include: loading (false), error (null)

  // TODO: Set up useEffect to initialize game on component mount
  // Call initializeGame() and loadStats()

  const initializeGame = async () => {
    try {
      // TODO: Set loading to true
      // TODO: Make POST request to ${API_BASE_URL}/game/new
      // TODO: Parse JSON response
      // TODO: If successful, update gameState and clear errors
      // TODO: Handle errors appropriately
    } catch (error) {
      // TODO: Handle fetch errors
    } finally {
      // TODO: Reset loading state
    }
  };

  const loadStats = async () => {
    try {
      // TODO: Make GET request to ${API_BASE_URL}/game/stats
      // TODO: Update stats state if successful
      // TODO: Don't show errors for stats (not critical)
    } catch (error) {
      // TODO: Log error but don't show to user
    }
  };

  const handleSquareClick = async (index) => {
    // TODO: Validate move (check gameActive, board[index], loading)
    // Return early if invalid

    try {
      // TODO: Set loading and clear errors
      // TODO: Make POST request to /game/move with board, position, player
      // TODO: Handle successful response - update gameState
      // TODO: Load stats if game ended (winner or draw)
      // TODO: Handle API errors
    } catch (error) {
      // TODO: Handle network errors
    } finally {
      // TODO: Reset loading
    }
  };

  const handleNewGame = () => {
    // TODO: Call initializeGame
  };

  const handleResetStats = async () => {
    try {
      // TODO: Make POST request to /game/reset-stats
      // TODO: Reset local stats state if successful
    } catch (error) {
      // TODO: Handle errors
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tic Tac Toe</h1>
        <p>React + Express Checkpoint Project</p>
      </header>

      <main className="app-main">
        {/* TODO: Add error message display with dismiss button */}

        <div className="game-container">
          <div className="game-section">
            {/* TODO: Add GameStatus component with gameState and loading props */}
            {/* TODO: Add GameBoard component with board, onSquareClick, disabled props */}
            {/* TODO: Add GameControls component with event handlers and loading */}
          </div>

          <div className="stats-section">
            {/* TODO: Add GameStats component with stats prop */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
```

**GameBoard Component (src/components/GameBoard.js) - STARTER CODE**:
```javascript
import React from 'react';
import GameSquare from './GameSquare';

function GameBoard({ board, onSquareClick, disabled }) {
  return (
    <div className="game-board">
      {/* TODO: Map over board array to create GameSquare components */}
      {/* Each GameSquare needs: key, value, onClick, disabled, position props */}
      {/* Use arrow function for onClick: () => onSquareClick(index) */}
    </div>
  );
}

export default GameBoard;
```

**GameSquare Component (src/components/GameSquare.js) - STARTER CODE**:
```javascript
import React from 'react';

function GameSquare({ value, onClick, disabled, position }) {
  const handleClick = () => {
    // TODO: Implement click validation
    // Only call onClick if square is not disabled and has no value
  };

  const getSquareClass = () => {
    // TODO: Build dynamic className string
    // Start with 'game-square'
    // Add 'occupied' and value.toLowerCase() if value exists
    // Add 'disabled' if disabled
    // Add 'clickable' if no value and not disabled
    // Return the complete className
  };

  return (
    // TODO: Implement button element
    // Include: className (from getSquareClass), onClick (handleClick), disabled prop
    // Add aria-label for accessibility: `Square ${position + 1}${value ? `, occupied by ${value}` : ', empty'}`
    // Display the value as button content
  );
}

export default GameSquare;
```

### Game State Management ###

**GameStatus Component (src/components/GameStatus.js)**:
```javascript
import React from 'react';

function GameStatus({ gameState, loading }) {
  const getStatusMessage = () => {
    if (loading) {
      return 'Processing...';
    }

    if (gameState.winner) {
      return `🎉 Player ${gameState.winner} Wins!`;
    }

    if (gameState.isDraw) {
      return '🤝 It\'s a Draw!';
    }

    if (gameState.gameActive) {
      return `Current Player: ${gameState.currentPlayer}`;
    }

    return 'Game Over';
  };

  const getStatusClass = () => {
    let className = 'game-status';
    
    if (loading) {
      className += ' loading';
    } else if (gameState.winner) {
      className += ' winner';
    } else if (gameState.isDraw) {
      className += ' draw';
    }

    return className;
  };

  return (
    <div className={getStatusClass()}>
      <h2>{getStatusMessage()}</h2>
      {gameState.winner && (
        <p className="winner-celebration">
          Congratulations! 🏆
        </p>
      )}
    </div>
  );
}

export default GameStatus;
```

### Event Handling ###

**GameControls Component (src/components/GameControls.js)**:
```javascript
import React from 'react';

function GameControls({ onNewGame, onResetStats, loading }) {
  return (
    <div className="game-controls">
      <button 
        onClick={onNewGame}
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? 'Starting...' : 'New Game'}
      </button>
      
      <button 
        onClick={onResetStats}
        disabled={loading}
        className="btn btn-secondary"
      >
        Reset Stats
      </button>
    </div>
  );
}

export default GameControls;
```

**GameStats Component (src/components/GameStats.js)**:
```javascript
import React from 'react';

function GameStats({ stats }) {
  const getWinPercentage = (wins) => {
    if (stats.totalGames === 0) return 0;
    return Math.round((wins / stats.totalGames) * 100);
  };

  return (
    <div className="game-stats">
      <h3>Game Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.xWins}</div>
          <div className="stat-label">X Wins</div>
          <div className="stat-percentage">{getWinPercentage(stats.xWins)}%</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">{stats.oWins}</div>
          <div className="stat-label">O Wins</div>
          <div className="stat-percentage">{getWinPercentage(stats.oWins)}%</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">{stats.draws}</div>
          <div className="stat-label">Draws</div>
          <div className="stat-percentage">{getWinPercentage(stats.draws)}%</div>
        </div>

        <div className="stat-item total">
          <div className="stat-value">{stats.totalGames}</div>
          <div className="stat-label">Total Games</div>
        </div>
      </div>
    </div>
  );
}

export default GameStats;
```

---

## Phase 2: Backend API Development ##

### Express Server Setup ###

**Server Entry Point (server/server.js) - STARTER CODE**:
```javascript
const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// TODO: Add middleware setup
// Add express.json() for parsing JSON request bodies
// Add CORS configuration for 'http://localhost:3000' origin

// TODO: Add root route (GET '/')
// Return JSON with message, version, and available endpoints list

// TODO: Connect game routes with '/api/game' prefix

// TODO: Add 404 handler for unmatched routes
// Use app.use('*', ...) and return 404 status with error message

// TODO: Add global error handler
// Use app.use((error, req, res, next) => ...)
// Log error and return 500 status

// TODO: Start the server
// Use app.listen() with PORT and console.log success message
```

### Game Logic API ###

**Game Logic Utility (server/utils/gameLogic.js)**:
```javascript
// Check for winner
const checkWinner = (board) => {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return {
        winner: board[a],
        winningCombination: combination
      };
    }
  }

  return { winner: null, winningCombination: null };
};

// Check if board is full (draw)
const checkDraw = (board) => {
  return board.every(square => square !== null);
};

// Validate move
const isValidMove = (board, position) => {
  // Check position is valid index
  if (position < 0 || position > 8) {
    return false;
  }

  // Check if square is empty
  return board[position] === null;
};

// Create new game state
const createNewGame = () => {
  return {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    gameActive: true,
    winningCombination: null
  };
};

// Make a move and return new game state
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

  // Create new game state
  return {
    board: newBoard,
    currentPlayer: winner || isDraw ? player : nextPlayer,
    winner,
    isDraw,
    gameActive: !winner && !isDraw,
    winningCombination
  };
};

// Get game statistics
const calculateStats = (games) => {
  const stats = {
    xWins: 0,
    oWins: 0,
    draws: 0,
    totalGames: games.length
  };

  games.forEach(game => {
    if (game.winner === 'X') {
      stats.xWins++;
    } else if (game.winner === 'O') {
      stats.oWins++;
    } else if (game.isDraw) {
      stats.draws++;
    }
  });

  return stats;
};

module.exports = {
  checkWinner,
  checkDraw,
  isValidMove,
  createNewGame,
  makeMove,
  calculateStats
};
```

**Game Controller (server/controllers/gameController.js)**:
```javascript
const { 
  createNewGame, 
  makeMove, 
  calculateStats 
} = require('../utils/gameLogic');

// In-memory storage for game history (in production, use a database)
let gameHistory = [];

// Start new game
const newGame = (req, res) => {
  try {
    const gameState = createNewGame();
    
    res.json({
      success: true,
      message: 'New game started',
      data: gameState
    });
  } catch (error) {
    console.error('Error starting new game:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start new game'
    });
  }
};

// Make a move
const move = (req, res) => {
  try {
    const { board, position, player } = req.body;

    // Validate input
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

// Get game statistics
const getStats = (req, res) => {
  try {
    const stats = calculateStats(gameHistory);
    
    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get statistics'
    });
  }
};

// Reset statistics
const resetStats = (req, res) => {
  try {
    gameHistory = [];
    
    res.json({
      success: true,
      message: 'Statistics reset successfully',
      data: {
        xWins: 0,
        oWins: 0,
        draws: 0,
        totalGames: 0
      }
    });
  } catch (error) {
    console.error('Error resetting stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset statistics'
    });
  }
};

// Get game history (bonus feature)
const getHistory = (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const recentGames = gameHistory
      .slice(-limit)
      .reverse(); // Most recent first

    res.json({
      success: true,
      data: recentGames,
      total: gameHistory.length
    });
  } catch (error) {
    console.error('Error getting history:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get game history'
    });
  }
};

module.exports = {
  newGame,
  move,
  getStats,
  resetStats,
  getHistory
};
```

### CORS Configuration ###

**Game Routes (server/routes/gameRoutes.js)**:
```javascript
const express = require('express');
const {
  newGame,
  move,
  getStats,
  resetStats,
  getHistory
} = require('../controllers/gameController');

const router = express.Router();

// Game routes
router.post('/new', newGame);           // POST /api/game/new
router.post('/move', move);             // POST /api/game/move
router.get('/stats', getStats);         // GET /api/game/stats
router.post('/reset-stats', resetStats); // POST /api/game/reset-stats
router.get('/history', getHistory);     // GET /api/game/history

module.exports = router;
```

---

## Phase 3: Frontend-Backend Integration ##

### API Integration ###

**API Service (client/src/services/gameAPI.js)**:
```javascript
const API_BASE_URL = 'http://localhost:4000/api';

// Helper function for API calls
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
  // Start new game
  newGame: () => apiCall('/game/new', { method: 'POST' }),

  // Make a move
  makeMove: (board, position, player) => 
    apiCall('/game/move', {
      method: 'POST',
      body: JSON.stringify({ board, position, player })
    }),

  // Get statistics
  getStats: () => apiCall('/game/stats'),

  // Reset statistics
  resetStats: () => apiCall('/game/reset-stats', { method: 'POST' }),

  // Get game history
  getHistory: (limit = 10) => apiCall(`/game/history?limit=${limit}`)
};
```

### Error Handling ###

**Error Boundary Component (client/src/components/ErrorBoundary.js)**:
```javascript
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to console in development
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
          {process.env.NODE_ENV === 'development' && (
            <details style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
              <summary>Error Details (Development)</summary>
              {this.state.error && this.state.error.toString()}
              <br />
              {this.state.errorInfo.componentStack}
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
```

### State Synchronization ###

**Custom Hook for Game State (client/src/hooks/useGameState.js)**:
```javascript
import { useState, useEffect } from 'react';
import { gameAPI } from '../services/gameAPI';

export const useGameState = () => {
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    gameActive: true
  });

  const [stats, setStats] = useState({
    xWins: 0,
    oWins: 0,
    draws: 0,
    totalGames: 0
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize game on mount
  useEffect(() => {
    initializeGame();
    loadStats();
  }, []);

  const initializeGame = async () => {
    try {
      setLoading(true);
      const result = await gameAPI.newGame();
      setGameState(result.data);
      setError(null);
    } catch (error) {
      setError('Failed to initialize game: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const result = await gameAPI.getStats();
      setStats(result.data);
    } catch (error) {
      console.error('Error loading stats:', error);
      // Don't show error for stats - not critical
    }
  };

  const makeMove = async (position) => {
    if (!gameState.gameActive || gameState.board[position] || loading) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const result = await gameAPI.makeMove(
        gameState.board, 
        position, 
        gameState.currentPlayer
      );

      setGameState(result.data);

      // If game ended, reload stats
      if (result.data.winner || result.data.isDraw) {
        await loadStats();
      }
    } catch (error) {
      setError('Failed to make move: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const resetStats = async () => {
    try {
      await gameAPI.resetStats();
      setStats({
        xWins: 0,
        oWins: 0,
        draws: 0,
        totalGames: 0
      });
    } catch (error) {
      setError('Failed to reset stats: ' + error.message);
    }
  };

  return {
    gameState,
    stats,
    loading,
    error,
    initializeGame,
    makeMove,
    resetStats,
    clearError: () => setError(null)
  };
};
```

---

## Phase 4: Advanced Features ##

### Game History ###

**Game History Component (client/src/components/GameHistory.js)**:
```javascript
import React, { useState, useEffect } from 'react';
import { gameAPI } from '../services/gameAPI';

function GameHistory() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = async () => {
    try {
      setLoading(true);
      const result = await gameAPI.getHistory(20);
      setHistory(result.data);
    } catch (error) {
      console.error('Error loading history:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  const getGameResult = (game) => {
    if (game.winner) {
      return `${game.winner} Won`;
    }
    if (game.isDraw) {
      return 'Draw';
    }
    return 'In Progress';
  };

  return (
    <div className="game-history">
      <h3>Recent Games</h3>
      
      {loading && <p>Loading history...</p>}
      
      {history.length === 0 && !loading && (
        <p>No games played yet.</p>
      )}

      <div className="history-list">
        {history.map((game, index) => (
          <div key={index} className="history-item">
            <div className="history-result">
              {getGameResult(game)}
            </div>
            <div className="history-date">
              {formatDate(game.completedAt)}
            </div>
          </div>
        ))}
      </div>

      <button onClick={loadHistory} disabled={loading}>
        Refresh
      </button>
    </div>
  );
}

export default GameHistory;
```

### Statistics Tracking ###

**Enhanced Stats Component with Charts (client/src/components/StatsChart.js)**:
```javascript
import React from 'react';

function StatsChart({ stats }) {
  const total = stats.totalGames;
  
  if (total === 0) {
    return (
      <div className="stats-chart">
        <p>Play some games to see statistics!</p>
      </div>
    );
  }

  const xPercentage = (stats.xWins / total) * 100;
  const oPercentage = (stats.oWins / total) * 100;
  const drawPercentage = (stats.draws / total) * 100;

  return (
    <div className="stats-chart">
      <div className="chart-bar">
        <div className="chart-section x-wins" style={{ width: `${xPercentage}%` }}>
          {xPercentage > 10 && `${Math.round(xPercentage)}%`}
        </div>
        <div className="chart-section o-wins" style={{ width: `${oPercentage}%` }}>
          {oPercentage > 10 && `${Math.round(oPercentage)}%`}
        </div>
        <div className="chart-section draws" style={{ width: `${drawPercentage}%` }}>
          {drawPercentage > 10 && `${Math.round(drawPercentage)}%`}
        </div>
      </div>
      
      <div className="chart-legend">
        <div className="legend-item">
          <div className="legend-color x-wins"></div>
          <span>X Wins ({stats.xWins})</span>
        </div>
        <div className="legend-item">
          <div className="legend-color o-wins"></div>
          <span>O Wins ({stats.oWins})</span>
        </div>
        <div className="legend-item">
          <div className="legend-color draws"></div>
          <span>Draws ({stats.draws})</span>
        </div>
      </div>
    </div>
  );
}

export default StatsChart;
```

### Multiplayer Support ###

**Multiplayer Game Component (bonus feature)**:
```javascript
// This is an advanced feature for students who finish early
import React, { useState, useEffect } from 'react';

function MultiplayerGame() {
  const [gameId, setGameId] = useState(null);
  const [playerSymbol, setPlayerSymbol] = useState(null);
  const [isWaiting, setIsWaiting] = useState(false);

  const createGame = async () => {
    // Implementation would involve WebSocket or polling
    // This is a placeholder for advanced students
    console.log('Creating multiplayer game...');
  };

  const joinGame = async (id) => {
    // Implementation would involve WebSocket or polling
    console.log('Joining game:', id);
  };

  return (
    <div className="multiplayer-game">
      <h3>Multiplayer Mode</h3>
      <p>Coming soon! This is an advanced feature.</p>
      
      <div className="multiplayer-controls">
        <button onClick={createGame}>Create Game</button>
        <input 
          type="text" 
          placeholder="Game ID to join"
          onKeyPress={(e) => {
            if (e.key === 'Enter' && e.target.value) {
              joinGame(e.target.value);
            }
          }}
        />
      </div>
      
      {isWaiting && (
        <p>Waiting for opponent to join...</p>
      )}
    </div>
  );
}

export default MultiplayerGame;
```

---

## Testing and Debugging ##

### Testing Checklist ###

**Frontend Testing:**
1. **Component Rendering**: Each component renders without errors
2. **User Interactions**: All buttons and squares respond correctly
3. **State Management**: Game state updates properly after moves
4. **Error Handling**: Error messages display appropriately
5. **Responsive Design**: Layout works on different screen sizes

**Backend Testing:**
1. **API Endpoints**: All endpoints return expected responses
2. **Game Logic**: Win detection works for all combinations
3. **Input Validation**: Invalid inputs are rejected properly
4. **Error Handling**: Server errors are caught and handled
5. **CORS Configuration**: Frontend can communicate with backend

**Integration Testing:**
1. **API Communication**: Frontend successfully calls backend
2. **Data Flow**: Game state syncs between client and server
3. **Error Propagation**: Backend errors display in frontend
4. **Loading States**: UI shows loading during API calls

### Debugging Tools ###

**Console Logging:**
```javascript
// Add debugging to components
useEffect(() => {
  console.log('Game state updated:', gameState);
}, [gameState]);

// Add debugging to API calls
const makeMove = async (position) => {
  console.log('Making move:', { position, player: gameState.currentPlayer });
  // ... rest of function
};
```

**Network Debugging:**
- Use browser Developer Tools Network tab
- Check API request/response data
- Verify CORS headers are present
- Monitor for 404 or 500 errors

---

## Deployment Considerations ##

### Production Setup ###

**Environment Variables:**
```javascript
// client/src/config.js
const config = {
  API_BASE_URL: process.env.REACT_APP_API_URL || 'http://localhost:4000/api'
};

export default config;
```

**Build Scripts (package.json)**:
```json
{
  "scripts": {
    "dev": "concurrently \"npm run server\" \"npm run client\"",
    "server": "cd server && npm start",
    "client": "cd client && npm start",
    "build": "cd client && npm run build",
    "build:client": "cd client && npm run build",
    "build:server": "cd server && npm run build"
  }
}
```

---

## Code Review Checklist ##

### Code Quality ###
- [ ] Components are properly structured and named
- [ ] State management follows React best practices
- [ ] API endpoints are RESTful and properly documented
- [ ] Error handling is comprehensive
- [ ] Code is commented where necessary
- [ ] No hardcoded values (use constants)
- [ ] Proper separation of concerns

### Functionality ###
- [ ] All win conditions work correctly
- [ ] Draw detection works properly
- [ ] Invalid moves are prevented
- [ ] Statistics track correctly
- [ ] New game resets state properly
- [ ] Error messages are user-friendly
- [ ] Loading states provide good UX

### Technical Requirements ###
- [ ] Uses functional components only
- [ ] Implements proper React hooks
- [ ] Express server with CORS configured
- [ ] RESTful API design
- [ ] Proper HTTP status codes
- [ ] Input validation on backend
- [ ] Responsive CSS design

---

## Extension Challenges ##

### For Advanced Students ###

1. **AI Opponent**: Implement computer player with different difficulty levels
2. **Animations**: Add smooth animations for moves and wins
3. **Sound Effects**: Add audio feedback for moves and wins
4. **Themes**: Implement dark mode and custom themes
5. **Tournament Mode**: Track multiple players and tournaments
6. **Online Multiplayer**: Real-time multiplayer with WebSockets
7. **Mobile App**: Convert to React Native mobile app
8. **Database Integration**: Replace in-memory storage with MongoDB

### Performance Optimizations ###

1. **Memoization**: Use React.memo and useMemo for optimization
2. **Lazy Loading**: Implement code splitting for components
3. **Caching**: Add API response caching
4. **Bundle Optimization**: Minimize bundle size
5. **PWA**: Make it a Progressive Web App

---

## Final Thoughts ##

Congratulations! You've built a complete full-stack Tic Tac Toe application that demonstrates everything you've learned in the first half of the MERN curriculum:

**React Skills Demonstrated:**
- Functional components with hooks
- State management with useState and useEffect
- Event handling and user interactions
- Component composition and data flow
- Error boundaries and error handling

**Backend Skills Demonstrated:**
- Express.js server setup and middleware
- RESTful API design and implementation
- CORS configuration for frontend communication
- Input validation and error handling
- Game logic implementation

**Integration Skills Demonstrated:**
- API communication with fetch
- Asynchronous operations and loading states
- Error propagation from backend to frontend
- State synchronization across client/server

This checkpoint project serves as a solid foundation as you move into database integration with MongoDB in the coming weeks. You've proven you can build complete, working applications using the MERN stack!

> `Consider This`  
> How does this project demonstrate the separation of concerns between frontend and backend? What are the advantages of this architecture over a single-page application that handles all logic client-side?

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Review ##

- How does this project consolidate learning from Weeks 3-7?
- What are the key components of the React frontend architecture?
- How does the Express backend handle game logic and validation?
- What role does CORS play in frontend-backend communication?
- How do React hooks manage state across the application?
- What testing strategies ensure the application works correctly?
- What extension features could enhance the user experience?