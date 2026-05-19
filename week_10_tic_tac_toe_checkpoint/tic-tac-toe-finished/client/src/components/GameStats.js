import React from 'react';

function GameStats({ stats }) {
  const getWinPercentage = (wins) => {
    if (stats.totalGames === 0) return 0;
    return Math.round((wins / stats.totalGames) * 100);
  };

  return (
    <div className="game-stats">
      <h3>Game Statistics</h3>
      
      <div className="stats-grid">
        <div className="stat-item">
          <div className="stat-value">{stats.xWins}</div>
          <div className="stat-label">X Wins</div>
          <div className="stat-percentage">{getWinPercentage(stats.xWins)}%</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">{stats.oWins}</div>
          <div className="stat-label">O Wins</div>
          <div className="stat-percentage">{getWinPercentage(stats.oWins)}%</div>
        </div>

        <div className="stat-item">
          <div className="stat-value">{stats.draws}</div>
          <div className="stat-label">Draws</div>
          <div className="stat-percentage">{getWinPercentage(stats.draws)}%</div>
        </div>

        <div className="stat-item total">
          <div className="stat-value">{stats.totalGames}</div>
          <div className="stat-label">Total Games</div>
        </div>
      </div>

      {stats.totalGames > 0 && (
        <div className="stats-summary">
          <p>Most wins: {stats.xWins >= stats.oWins ? 'X' : 'O'} player</p>
          <p>Games played: {stats.totalGames}</p>
        </div>
      )}
    </div>
  );
}

export default GameStats;