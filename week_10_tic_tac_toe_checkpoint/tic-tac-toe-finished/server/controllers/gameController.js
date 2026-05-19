// Complete Game Controller Implementation

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