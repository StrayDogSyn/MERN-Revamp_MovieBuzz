// Complete Game Routes Implementation

const express = require('express');
const {
  newGame,
  move,
  getStats,
  resetStats,
  getHistory
} = require('../controllers/gameController');

const router = express.Router();

// Game routes
router.post('/new', newGame);           // POST /api/game/new
router.post('/move', move);             // POST /api/game/move
router.get('/stats', getStats);         // GET /api/game/stats
router.post('/reset-stats', resetStats); // POST /api/game/reset-stats
router.get('/history', getHistory);     // GET /api/game/history

module.exports = router;