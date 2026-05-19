import React from 'react';

function GameControls({ onNewGame, onResetStats, loading }) {
  return (
    <div className="game-controls">
      <button 
        onClick={onNewGame}
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? 'Starting...' : 'New Game'}
      </button>
      
      <button 
        onClick={onResetStats}
        disabled={loading}
        className="btn btn-secondary"
      >
        Reset Stats
      </button>
    </div>
  );
}

export default GameControls;