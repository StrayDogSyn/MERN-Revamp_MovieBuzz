const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// TODO: Students will configure middleware during lesson
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  credentials: true
}));

// TODO: Students will implement home route
app.get('/', (req, res) => {
  // TODO: Return API information and available endpoints
  res.json({
    message: 'Tic Tac Toe API Server - Week 8 Checkpoint',
    version: '1.0.0',
    status: 'TODO: Students will implement game endpoints',
    endpoints: [
      'TODO: POST /api/game/new - Start new game',
      'TODO: POST /api/game/move - Make a move',
      'TODO: GET /api/game/stats - Get game statistics',
      'TODO: POST /api/game/reset-stats - Reset statistics'
    ]
  });
});

// TODO: Students will connect game routes during lesson
// app.use('/api/game', gameRoutes);

// Temporary placeholder route for testing
app.get('/api/test', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running! Students will implement game logic here.',
    timestamp: new Date().toISOString()
  });
});

// TODO: Students will implement 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    hint: 'Check the available endpoints in the root route /'
  });
});

// TODO: Students will implement error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: 'Students will implement proper error handling'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🎮 Tic Tac Toe API running on http://localhost:${PORT}`);
  console.log('📚 Students will implement:');
  console.log('   - Game logic in utils/gameLogic.js');
  console.log('   - Game controller in controllers/gameController.js');
  console.log('   - Game routes in routes/gameRoutes.js');
  console.log('   - Frontend-backend integration');
});