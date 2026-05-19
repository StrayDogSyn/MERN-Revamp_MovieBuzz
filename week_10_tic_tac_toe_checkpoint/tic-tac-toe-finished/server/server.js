// Complete Express Server Implementation

const express = require('express');
const cors = require('cors');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:3000', // React dev server
  credentials: true
}));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Tic Tac Toe API Server - Complete Implementation',
    version: '1.0.0',
    status: 'Running',
    endpoints: [
      'POST /api/game/new - Start new game',
      'POST /api/game/move - Make a move',
      'GET /api/game/stats - Get game statistics',
      'POST /api/game/reset-stats - Reset statistics',
      'GET /api/game/history - Get game history'
    ],
    gameRules: [
      '1. Players alternate placing X and O on a 3x3 grid',
      '2. First to get 3 in a row (horizontal, vertical, diagonal) wins',
      '3. If all squares filled with no winner, it\'s a draw',
      '4. Statistics track wins, losses, and draws'
    ]
  });
});

// API routes
app.use('/api/game', gameRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    availableEndpoints: [
      'GET / - API information',
      'GET /api/health - Health check',
      'POST /api/game/new - Start new game',
      'POST /api/game/move - Make a move',
      'GET /api/game/stats - Get statistics',
      'POST /api/game/reset-stats - Reset statistics',
      'GET /api/game/history - Get game history'
    ]
  });
});

// Error handler
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

app.listen(PORT, () => {
  console.log(`🎮 Tic Tac Toe API running on http://localhost:${PORT}`);
  console.log('🎯 Complete implementation with all features:');
  console.log('   ✅ Game logic with win detection');
  console.log('   ✅ Statistics tracking');
  console.log('   ✅ Game history');
  console.log('   ✅ Error handling');
  console.log('   ✅ Input validation');
  console.log('   ✅ CORS configuration');
  console.log(`📖 Visit http://localhost:${PORT} for API documentation`);
});