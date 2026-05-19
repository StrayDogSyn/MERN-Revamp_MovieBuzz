import React from 'react';

// TODO: Students will implement this component during the lesson
function GameSquare({ value, onClick, disabled, position }) {
  // TODO: Students will implement click handler
  const handleClick = () => {
    console.log('TODO: Implement square click for position:', position);
    // TODO: Add validation logic
    // TODO: Call onClick if valid
  };

  // TODO: Students will implement dynamic CSS classes
  const getSquareClass = () => {
    // TODO: Build className based on value and disabled state
    return 'game-square';
  };

  return (
    <button 
      className={getSquareClass()}
      onClick={handleClick}
      disabled={disabled}
      aria-label={`Square ${position + 1}${value ? `, occupied by ${value}` : ', empty'}`}
    >
      {/* TODO: Display the value (X, O, or empty) */}
      {value}
    </button>
  );
}

export default GameSquare;