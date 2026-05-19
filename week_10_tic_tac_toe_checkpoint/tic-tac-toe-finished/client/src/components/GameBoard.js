import React from 'react';
import GameSquare from './GameSquare';

function GameBoard({ board, onSquareClick, disabled, winningCombination }) {
  return (
    <div className="game-board">
      {board.map((value, index) => (
        <GameSquare
          key={index}
          value={value}
          onClick={() => onSquareClick(index)}
          disabled={disabled}
          position={index}
          isWinning={winningCombination && winningCombination.includes(index)}
        />
      ))}
    </div>
  );
}

export default GameBoard;