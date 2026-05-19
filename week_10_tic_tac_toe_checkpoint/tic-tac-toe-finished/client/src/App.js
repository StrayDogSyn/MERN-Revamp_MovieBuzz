import React, { useState, useEffect } from 'react';
import GameBoard from './components/GameBoard';
import GameStatus from './components/GameStatus';
import GameStats from './components/GameStats';
import GameControls from './components/GameControls';
import './App.css';

const API_BASE_URL = 'http://localhost:5000/api';

function App() {
  // Game state
  const [gameState, setGameState] = useState({
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    gameActive: true,
    winningCombination: null
  });

  // Statistics state
  const [stats, setStats] = useState({
    xWins: 0,
    oWins: 0,
    draws: 0,
    totalGames: 0
  });

  // UI state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Initialize game
  useEffect(() => {
    initializeGame();
    loadStats();
  }, []);

  const initializeGame = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/game/new`, {
        method: 'POST'
      });
      const result = await response.json();
      
      if (result.success) {
        setGameState(result.data);
        setError(null);
      } else {
        setError('Failed to initialize game');
      }
    } catch (error) {
      console.error('Error initializing game:', error);
      setError('Failed to connect to server');
    } finally {
      setLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/game/stats`);
      const result = await response.json();
      
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Error loading stats:', error);
      // Don't show error for stats - not critical
    }
  };

  const handleSquareClick = async (index) => {
    // Don't allow moves if game is not active or square is occupied
    if (!gameState.gameActive || gameState.board[index] || loading) {
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/game/move`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          board: gameState.board,
          position: index,
          player: gameState.currentPlayer
        })
      });

      const result = await response.json();

      if (result.success) {
        setGameState(result.data);
        
        // If game ended, update stats
        if (result.data.winner || result.data.isDraw) {
          await loadStats();
        }
      } else {
        setError(result.error || 'Invalid move');
      }
    } catch (error) {
      console.error('Error making move:', error);
      setError('Failed to make move');
    } finally {
      setLoading(false);
    }
  };

  const handleNewGame = () => {
    initializeGame();
  };

  const handleResetStats = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/game/reset-stats`, {
        method: 'POST'
      });
      const result = await response.json();
      
      if (result.success) {
        setStats({
          xWins: 0,
          oWins: 0,
          draws: 0,
          totalGames: 0
        });
      }
    } catch (error) {
      console.error('Error resetting stats:', error);
      setError('Failed to reset statistics');
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <h1>Tic Tac Toe</h1>
        <p>React + Express Complete Implementation</p>
      </header>

      <main className="app-main">
        {error && (
          <div className="error-message">
            {error}
            <button onClick={() => setError(null)}>×</button>
          </div>
        )}

        <div className="game-container">
          <div className="game-section">
            <GameStatus 
              gameState={gameState} 
              loading={loading}
            />
            <GameBoard 
              board={gameState.board}
              onSquareClick={handleSquareClick}
              disabled={loading || !gameState.gameActive}
              winningCombination={gameState.winningCombination}
            />
            <GameControls 
              onNewGame={handleNewGame}
              onResetStats={handleResetStats}
              loading={loading}
            />
          </div>

          <div className="stats-section">
            <GameStats stats={stats} />
          </div>
        </div>

        <div className="game-info">
          <h3>How to Play</h3>
          <ul>
            <li>Players take turns placing X and O on the grid</li>
            <li>First to get 3 in a row wins (horizontal, vertical, or diagonal)</li>
            <li>If all squares are filled with no winner, it's a draw</li>
            <li>Statistics track your wins, losses, and draws</li>
          </ul>
        </div>
      </main>
    </div>
  );
}

export default App;