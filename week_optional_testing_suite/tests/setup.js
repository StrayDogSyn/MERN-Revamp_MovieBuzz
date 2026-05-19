/**
 * Test Setup Configuration
 * Sets up the testing environment for Movie Buzz application
 */

const { MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

// Global test configuration
global.testConfig = {
  apiBaseUrl: 'http://localhost:4000/api',
  frontendUrl: 'http://localhost:3000',
  timeout: 10000,
  retries: 3,
  testDatabase: 'movie-buzz-test'
};

// Sample test data for consistent testing
global.testMovies = [
  {
    name: "The Matrix",
    description: "A computer hacker learns about the true nature of reality and his role in the war against its controllers.",
    rating: "R",
    length: "136 minutes",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    director: "The Wachowskis",
    stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
  },
  {
    name: "Inception",
    description: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    rating: "PG-13", 
    length: "148 minutes",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    stars: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"]
  },
  {
    name: "The Godfather",
    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.",
    rating: "R",
    length: "175 minutes", 
    year: 1972,
    genre: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    stars: ["Marlon Brando", "Al Pacino", "James Caan"]
  },
  {
    name: "Pulp Fiction",
    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.",
    rating: "R",
    length: "154 minutes",
    year: 1994,
    genre: ["Crime", "Drama"],
    director: "Quentin Tarantino", 
    stars: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"]
  },
  {
    name: "The Dark Knight",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    rating: "PG-13",
    length: "152 minutes",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    stars: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"]
  }
];

// Test data for form validation
global.invalidMovieData = [
  { name: "", description: "Missing name", rating: "R" },
  { name: "Test Movie", description: "", rating: "R" },
  { name: "Test Movie", description: "Valid description", rating: "" },
  { name: "A", description: "Name too short", rating: "R" },
  { description: "Missing name entirely", rating: "R" }
];

// Setup function that runs before all tests
beforeAll(async () => {
  console.log('🧪 Setting up Movie Buzz Testing Suite...');
  
  // Add any global setup here
  jest.setTimeout(30000);
});

// Cleanup function that runs after all tests
afterAll(async () => {
  console.log('🧹 Cleaning up Movie Buzz Testing Suite...');
  
  // Close any open connections
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});

// Helper function to wait for element or condition
global.waitFor = (condition, timeout = 5000) => {
  return new Promise((resolve, reject) => {
    const interval = 100;
    let elapsed = 0;
    
    const check = () => {
      if (condition()) {
        resolve(true);
      } else if (elapsed >= timeout) {
        reject(new Error(`Timeout waiting for condition after ${timeout}ms`));
      } else {
        elapsed += interval;
        setTimeout(check, interval);
      }
    };
    
    check();
  });
};

// Helper function to generate random test data
global.generateRandomMovie = () => {
  const randomNames = ["Epic Adventure", "Mystery Thriller", "Comedy Gold", "Drama Deep", "Action Packed"];
  const randomGenres = [["Action"], ["Comedy"], ["Drama"], ["Thriller"], ["Action", "Adventure"]];
  const randomRatings = ["G", "PG", "PG-13", "R"];
  const randomDirectors = ["Director Smith", "Director Jones", "Director Brown"];
  
  return {
    name: randomNames[Math.floor(Math.random() * randomNames.length)] + " " + Math.floor(Math.random() * 1000),
    description: "A randomly generated test movie for validation purposes.",
    rating: randomRatings[Math.floor(Math.random() * randomRatings.length)],
    length: (90 + Math.floor(Math.random() * 60)) + " minutes",
    year: 1990 + Math.floor(Math.random() * 34),
    genre: randomGenres[Math.floor(Math.random() * randomGenres.length)],
    director: randomDirectors[Math.floor(Math.random() * randomDirectors.length)],
    stars: ["Actor One", "Actor Two"]
  };
};