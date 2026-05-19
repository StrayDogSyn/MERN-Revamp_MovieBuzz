require('dotenv').config();
const mongoose = require('mongoose');

const connectionString = process.env.MONGO_URI;

mongoose.set('strictQuery', true);

if (process.env.NODE_ENV !== 'test') {
  if (!connectionString) {
    throw new Error('FATAL: MONGO_URI is not set. Check your .env file.');
  }

  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
}

mongoose.connection.on('connected', () => {
  console.log(`Mongoose connected to ${connectionString}`);
});

mongoose.connection.on('error', (err) => {
  console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected');
});