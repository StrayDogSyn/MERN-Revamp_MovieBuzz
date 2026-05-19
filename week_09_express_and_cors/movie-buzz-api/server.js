// Movie Buzz API - Week 7 Starter
// Students will build Express server and API routes during the lesson

const fs = require('fs');
const path = require('path');

console.log('🎬 Movie Buzz API Starting...');

// TODO: Students will require Express and CORS
// TODO: Students will create Express app instance
// TODO: Students will set up middleware (CORS, JSON parsing)
// TODO: Students will create API routes for movies CRUD operations
// TODO: Students will start the server on port 4000

// Basic file operations from Week 6
function readMoviesFile() {
  try {
    const filePath = path.join(__dirname, 'data', 'movies.json');
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading movies file:', error.message);
    return [];
  }
}

// Test function to verify our data loading works
const movies = readMoviesFile();
console.log(`Loaded ${movies.length} movies from JSON file`);
console.log('Movie titles:', movies.map(m => m.name));

console.log('Ready to build Express API! 🚀');