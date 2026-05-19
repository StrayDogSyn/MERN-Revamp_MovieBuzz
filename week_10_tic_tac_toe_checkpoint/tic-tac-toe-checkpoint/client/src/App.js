import React, { useState, useEffect } from 'react';
import './App.css';

// TODO: Import components as you create them
// import GameBoard from './components/GameBoard';
// import GameStatus from './components/GameStatus';
// import GameStats from './components/GameStats';
// import GameControls from './components/GameControls';

const API_BASE_URL = 'http://localhost:4000/api';

function App() {
  // TODO: Students will implement game state during lesson
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    gameActive: true
  });

  // TODO: Students will implement statistics state
  const [stats, setStats] = useState({
    xWins: 0,
    oWins: 0,
    draws: 0,
    totalGames: 0
  });

  // TODO: Students will implement UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // TODO: Students will implement game initialization
  useEffect(() => {
    console.log('App mounted - TODO: Initialize game');
    // initializeGame();
  }, []);

  // TODO: Students will implement API functions during lesson
  const initializeGame = async () => {
    console.log('TODO: Implement initializeGame');
    // Students will implement this
  };

  const handleSquareClick = async (index) => {
    console.log('TODO: Implement handleSquareClick for square:', index);
    // Students will implement this
  };

  const handleNewGame = () => {
    console.log('TODO: Implement handleNewGame');
    // Students will implement this
  };

  const handleResetStats = () => {
    console.log('TODO: Implement handleResetStats');
    // Students will implement this
  };

  // For now, render a simple game board placeholder
  // Students will replace this with proper components
  return (
    <div className="app">
      <header className="app-header">
        <h1>Tic Tac Toe</h1>
        <p>Week 8 - Checkpoint Project</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="game-container">
          {/* TODO: Students will replace this with GameStatus component */}
          <div className="game-status">
            <h2>Current Player: {gameState.currentPlayer}</h2>
            {gameState.winner && <p>🎉 Player {gameState.winner} Wins!</p>}
            {gameState.isDraw && <p>🤝 It's a Draw!</p>}
          </div>

          {/* TODO: Students will replace this with GameBoard component */}
          <div className="game-board">
            {gameState.board.map((value, index) => (
              <button
                key={index}
                className={`game-square ${value ? 'occupied' : 'empty'}`}
                onClick={() => handleSquareClick(index)}
                disabled={loading || !gameState.gameActive || value}
              >
                {value}
              </button>
            ))}
          </div>

          {/* TODO: Students will replace this with GameControls component */}
          <div className="game-controls">
            <button 
              onClick={handleNewGame}
              disabled={loading}
              className="btn btn-primary"
            >
              {loading ? 'Starting...' : 'New Game'}
            </button>
            <button 
              onClick={handleResetStats}
              disabled={loading}
              className="btn btn-secondary"
            >
              Reset Stats
            </button>
          </div>

          {/* TODO: Students will replace this with GameStats component */}
          <div className="game-stats">
            <h3>Game Statistics</h3>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-value">{stats.xWins}</div>
                <div className="stat-label">X Wins</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.oWins}</div>
                <div className="stat-label">O Wins</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.draws}</div>
                <div className="stat-label">Draws</div>
              </div>
              <div className="stat-item">
                <div className="stat-value">{stats.totalGames}</div>
                <div className="stat-label">Total Games</div>
              </div>
            </div>
          </div>
        </div>

        <div className="instructions">
          <h3>📚 Development Instructions</h3>
          <ol>
            <li>Start by implementing the backend game logic</li>
            <li>Test API endpoints before connecting frontend</li>
            <li>Break the UI into reusable components</li>
            <li>Add proper error handling and loading states</li>
            <li>Test the complete application thoroughly</li>
          </ol>
        </div>
      </main>
    </div>
  );
}

export default App;