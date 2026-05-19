// Game Routes
// TODO: Students will implement these routes during the lesson

const express = require('express');
const {
  newGame,
  move,
  getStats,
  resetStats,
  getHistory
} = require('../controllers/gameController');

const router = express.Router();

// TODO: Students will implement game routes
// TODO: Connect each route to its controller function

// Placeholder routes with TODO instructions
router.get('/test', (req, res) => {
  res.json({
    success: true,
    message: 'Game routes are working!',
    todo: [
      'POST /new - Start new game',
      'POST /move - Make a move', 
      'GET /stats - Get statistics',
      'POST /reset-stats - Reset statistics',
      'GET /history - Get game history (bonus)'
    ]
  });
});

// TODO: POST /new route
// router.post('/new', newGame);

// TODO: POST /move route  
// router.post('/move', move);

// TODO: GET /stats route
// router.get('/stats', getStats);

// TODO: POST /reset-stats route
// router.post('/reset-stats', resetStats);

// TODO: GET /history route (bonus)
// router.get('/history', getHistory);

module.exports = router;