require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

require('./config/db_connection');

const movieRouter = require('./routes/movieRoutes');

const app = express();

const PORT = process.env.PORT || 4000;

// Restrict CORS to known origins
const allowedOrigins = [
  process.env.CLIENT_URL || 'http://localhost:3000'
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (e.g. curl, Postman, same-origin)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS: origin ${origin} not allowed`));
    }
  },
  credentials: true
}));

// Request logging (dev only)
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'));
}

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/movies', movieRouter);

// Global 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` });
});

// Global error handler (must have 4 args for Express to treat it as error middleware)
app.use((err, req, res, next) => {
  console.error('Server error:', err.message);
  res.status(err.status || 500).json({
    error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

if (require.main === module) {
  const server = app.listen(PORT, () => {
    console.log(`Server up and running on http://localhost:${PORT}`);
  });

  process.on('SIGTERM', () => {
    console.log('SIGTERM received. Shutting down gracefully...');
    server.close(() => {
      const mongoose = require('mongoose');
      mongoose.connection.close(false, () => process.exit(0));
    });
  });
}

module.exports = app;