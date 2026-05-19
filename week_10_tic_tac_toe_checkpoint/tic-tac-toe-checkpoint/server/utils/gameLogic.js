// Game Logic Utility Functions
// TODO: Students will implement these functions during the lesson

// TODO: Implement checkWinner function
const checkWinner = (board) => {
  // TODO: Define winning combinations
  const winningCombinations = [
    // TODO: Add rows, columns, and diagonals
    // [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    // [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns  
    // [0, 4, 8], [2, 4, 6]             // Diagonals
  ];

  // TODO: Check each winning combination
  // TODO: Return winner and winning combination if found
  
  // Placeholder return
  return { winner: null, winningCombination: null };
};

// TODO: Implement checkDraw function
const checkDraw = (board) => {
  // TODO: Check if all squares are filled
  // TODO: Return true if board is full
  
  // Placeholder return
  return false;
};

// TODO: Implement move validation
const isValidMove = (board, position) => {
  // TODO: Check if position is valid (0-8)
  // TODO: Check if square is empty
  
  // Placeholder return
  return false;
};

// TODO: Implement new game creation
const createNewGame = () => {
  // TODO: Return initial game state object
  return {
    board: Array(9).fill(null),
    currentPlayer: 'X',
    winner: null,
    isDraw: false,
    gameActive: true,
    winningCombination: null
  };
};

// TODO: Implement move processing
const makeMove = (currentBoard, position, player) => {
  // TODO: Validate the move
  // TODO: Create new board with the move
  // TODO: Check for winner
  // TODO: Check for draw
  // TODO: Determine next player
  // TODO: Return new game state
  
  // Placeholder - students will implement
  throw new Error('makeMove function not implemented yet');
};

// TODO: Implement statistics calculation
const calculateStats = (games) => {
  // TODO: Count wins, losses, draws
  // TODO: Return statistics object
  
  const stats = {
    xWins: 0,
    oWins: 0,
    draws: 0,
    totalGames: games.length
  };

  // TODO: Loop through games and count results
  
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