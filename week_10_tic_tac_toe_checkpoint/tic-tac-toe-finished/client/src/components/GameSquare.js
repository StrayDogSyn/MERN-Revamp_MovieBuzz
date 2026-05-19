import React from 'react';

function GameSquare({ value, onClick, disabled, position, isWinning }) {
  const handleClick = () => {
    if (!disabled && !value) {
      onClick();
    }
  };

  const getSquareClass = () => {
    let className = 'game-square';
    
    if (value) {
      className += ` occupied ${value.toLowerCase()}`;
    }
    
    if (disabled) {
      className += ' disabled';
    }
    
    if (!value && !disabled) {
      className += ' clickable';
    }

    if (isWinning) {
      className += ' winning';
    }

    return className;
  };

  return (
    <button 
      className={getSquareClass()}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Square ${position + 1}${value ? `, occupied by ${value}` : ', empty'}`}
    >
      {value}
    </button>
  );
}

export default GameSquare;