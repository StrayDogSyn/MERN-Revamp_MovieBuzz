import React from 'react';

function GameStatus({ gameState, loading }) {
  const getStatusMessage = () => {
    if (loading) {
      return 'Processing...';
    }

    if (gameState.winner) {
      return `🎉 Player ${gameState.winner} Wins!`;
    }

    if (gameState.isDraw) {
      return '🤝 It\'s a Draw!';
    }

    if (gameState.gameActive) {
      return `Current Player: ${gameState.currentPlayer}`;
    }

    return 'Game Over';
  };

  const getStatusClass = () => {
    let className = 'game-status';
    
    if (loading) {
      className += ' loading';
    } else if (gameState.winner) {
      className += ' winner';
    } else if (gameState.isDraw) {
      className += ' draw';
    }

    return className;
  };

  return (
    <div className={getStatusClass()}>
      <h2>{getStatusMessage()}</h2>
      {gameState.winner && (
        <p className="winner-celebration">
          Congratulations! 🏆
        </p>
      )}
      {gameState.isDraw && (
        <p className="draw-message">
          Good game! Try again! 🎮
        </p>
      )}
    </div>
  );
}

export default GameStatus;