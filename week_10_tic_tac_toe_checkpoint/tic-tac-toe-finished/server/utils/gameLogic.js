// Complete Game Logic Implementation

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