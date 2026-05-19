// Game Controller
// TODO: Students will implement these controller functions during the lesson

const { 
  createNewGame, 
  makeMove, 
  calculateStats 
} = require('../utils/gameLogic');

// In-memory storage for game history (in production, use a database)
let gameHistory = [];

// TODO: Implement new game controller
const newGame = (req, res) => {
  try {
    // TODO: Create new game state using gameLogic
    // TODO: Return success response with game state
    
    console.log('newGame endpoint called - TODO: implement');
    res.status(501).json({
      success: false,
      message: 'newGame endpoint not implemented yet',
      hint: 'Students will implement this during the lesson'
    });
  } catch (error) {
    console.error('Error starting new game:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to start new game'
    });
  }
};

// TODO: Implement move controller
const move = (req, res) => {
  try {
    // TODO: Extract board, position, player from request body
    // TODO: Validate input parameters
    // TODO: Make the move using gameLogic
    // TODO: Save completed games to history
    // TODO: Return success response with new game state
    
    console.log('move endpoint called - TODO: implement');
    res.status(501).json({
      success: false,
      message: 'move endpoint not implemented yet',
      hint: 'Students will implement this during the lesson'
    });
    
  } catch (error) {
    console.error('Error making move:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to make move'
    });
  }
};

// TODO: Implement stats controller
const getStats = (req, res) => {
  try {
    // TODO: Calculate statistics from game history
    // TODO: Return success response with stats
    
    console.log('getStats endpoint called - TODO: implement');
    res.status(501).json({
      success: false,
      message: 'getStats endpoint not implemented yet',
      hint: 'Students will implement this during the lesson'
    });
  } catch (error) {
    console.error('Error getting stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to get statistics'
    });
  }
};

// TODO: Implement reset stats controller
const resetStats = (req, res) => {
  try {
    // TODO: Clear game history
    // TODO: Return success response with reset stats
    
    console.log('resetStats endpoint called - TODO: implement');
    res.status(501).json({
      success: false,
      message: 'resetStats endpoint not implemented yet',
      hint: 'Students will implement this during the lesson'
    });
  } catch (error) {
    console.error('Error resetting stats:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to reset statistics'
    });
  }
};

// TODO: Bonus - implement game history controller
const getHistory = (req, res) => {
  try {
    // TODO: Get recent games from history
    // TODO: Apply limit from query parameter
    // TODO: Return games in reverse chronological order
    
    console.log('getHistory endpoint called - TODO: implement');
    res.status(501).json({
      success: false,
      message: 'getHistory endpoint not implemented yet',
      hint: 'This is a bonus feature for advanced students'
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