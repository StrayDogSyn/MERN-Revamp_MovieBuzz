import React from 'react';

// TODO: Students will implement this component during the lesson
// This is a placeholder component structure

function GameBoard({ board, onSquareClick, disabled }) {
  // TODO: Students will implement the game board rendering logic
  
  return (
    <div className="game-board">
      {/* TODO: Map through board array and render GameSquare components */}
      {board.map((value, index) => (
        <div key={index} className="game-square-placeholder">
          {/* TODO: Replace with GameSquare component */}
          <button
            className={`game-square ${value ? 'occupied' : 'empty'}`}
            onClick={() => onSquareClick(index)}
            disabled={disabled || value}
          >
            {value}
          </button>
        </div>
      ))}
    </div>
  );
}

export default GameBoard;