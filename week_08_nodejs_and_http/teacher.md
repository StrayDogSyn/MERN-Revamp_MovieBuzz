# Week 8 - Node.js & HTTP Fundamentals #

- [Week 8 - Node.js & HTTP Fundamentals](#week-8---nodejs--http-fundamentals)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [What is Node.js?](#what-is-nodejs)
  - [Setting Up Node.js Development](#setting-up-nodejs-development)
  - [Node.js Modules and require()](#nodejs-modules-and-require)
  - [File System Operations](#file-system-operations)
  - [Creating Movie Buzz Backend](#creating-movie-buzz-backend)
    - [Project Structure](#project-structure)
    - [Creating Movie Data Module](#creating-movie-data-module)
    - [Building Server Utilities](#building-server-utilities)
  - [Introduction to HTTP Module](#introduction-to-http-module)
  - [Command Line Arguments](#command-line-arguments)
  - [Asynchronous Programming Basics](#asynchronous-programming-basics)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students now have solid React frontend skills and are ready to transition to backend development. This week introduces Node.js as the bridge between their JavaScript knowledge and server-side programming. Students will build the foundation for their Movie Buzz backend, learning modular programming and file operations. This sets up the architecture they'll use when adding Express and MongoDB in coming weeks.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Explain what Node.js is and how it differs from browser JavaScript
- Set up a Node.js development environment
- Use Node.js modules and the require/import system
- Perform file system operations with Node.js
- Create modular backend code for the Movie Buzz application
- Understand HTTP protocol and make HTTP requests with Node.js
- Create basic HTTP servers using the built-in http module
- Handle command line arguments in Node.js applications
- Understand basic asynchronous programming concepts

---

## Glossary ##

- `Node.js`: A JavaScript runtime built on Chrome's V8 engine that allows JavaScript to run on servers
- `Module`: A reusable piece of code that can be exported from one file and imported into another
- `require()`: Node.js function used to import modules (CommonJS syntax)
- `module.exports`: Node.js way to export functions, objects, or values from a module
- `File System (fs)`: Node.js built-in module for interacting with files and directories
- `Runtime`: The environment in which code is executed
- `Backend`: Server-side code that handles data, logic, and communication with databases
- `HTTP`: HyperText Transfer Protocol - the protocol used for communication between web clients and servers
- `API`: Application Programming Interface - a way for different software applications to communicate

---

## Starting Point ##

Students should have completed React weeks with a working Movie Buzz frontend. Now they're transitioning to backend development. Emphasize that they're building the server that will eventually power their React app.

Create a new directory for backend development:

```bash
mkdir movie-buzz-backend
cd movie-buzz-backend
```

---

## What is Node.js? ##

**Key Teaching Point**: Node.js lets us use JavaScript everywhere - frontend AND backend.

Node.js is a JavaScript runtime that allows you to run JavaScript outside of web browsers. This means you can use JavaScript to build:

- Web servers
- Command line tools
- Desktop applications
- APIs and backend services

**Critical Differences** (write these on the board):
- **No DOM**: Node.js doesn't have `window`, `document`, or DOM APIs
- **File system access**: Node.js can read and write files on your computer
- **Network capabilities**: Node.js can create servers and make network requests
- **Process control**: Node.js can spawn processes and handle system operations

> `Consider This`  
> Why might it be advantageous to use the same language (JavaScript) for both frontend and backend development?
>> Expect: Same syntax, shared logic, one language to learn, easier team collaboration, code reuse between frontend and backend.

**Teaching Analogy**: Think of Node.js as "JavaScript that grew up" - it can do everything browser JavaScript can do, plus interact with the computer's file system and network.

---

## Setting Up Node.js Development ##

**Important**: Verify all students have Node.js installed before proceeding.

First, let's initialize a new Node.js project:

```bash
npm init -y
```

**Explain each part of the generated package.json**:

```json
{
  "name": "movie-buzz-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",      // Entry point
  "scripts": {             // Commands we can run
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Let's customize it for our needs:

```json
{
  "name": "movie-buzz-backend",
  "version": "1.0.0",
  "description": "Backend for Movie Buzz application",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": ["movies", "backend", "node"],
  "author": "Your Name",
  "license": "ISC"
}
```

**Teaching Point**: The scripts section lets us run `npm start` instead of `node server.js`.

---

## Node.js Modules and require() ##

**Fundamental Concept**: Modules are how we organize and share code in Node.js.

Node.js uses modules to organize code. There are three types:

1. **Built-in modules** (like `fs`, `http`, `path`)
2. **Local modules** (files you create)
3. **Third-party modules** (installed with npm)

### Using Built-in Modules ###

**Demonstrate this live**:

```javascript
// Import the file system module
const fs = require('fs');

// Import the path module for working with file paths
const path = require('path');

// Use the modules
console.log('Current directory:', __dirname);
console.log('Current file:', __filename);
```

**Teaching Point**: `__dirname` and `__filename` are Node.js globals not available in browsers.

### Creating and Using Local Modules ###

**Build this step by step with students**:

Create a file called `utils.js`:

```javascript
// utils.js
function formatMovieTitle(title) {
  return title.toUpperCase();
}

function calculateMovieAge(year) {
  const currentYear = new Date().getFullYear();
  return currentYear - year;
}

// Export functions so they can be used in other files
module.exports = {
  formatMovieTitle,
  calculateMovieAge
};
```

Now use it in another file:

```javascript
// main.js
const { formatMovieTitle, calculateMovieAge } = require('./utils');

console.log(formatMovieTitle('the matrix')); // THE MATRIX
console.log(calculateMovieAge(1999)); // Current year - 1999
```

**Key Teaching Points**:
- `require('./utils')` - note the `./` for local files
- Destructuring assignment to extract specific functions
- `module.exports` makes functions available to other files

> `Consider This`  
> How does the module system help organize large applications? What problems does it solve?
>> Expect: Prevents global namespace pollution, organizes code logically, enables code reuse, makes testing easier.

---

## File System Operations ##

**Safety First**: Emphasize error handling with file operations.

Node.js can read and write files using the `fs` module:

```javascript
const fs = require('fs');

// Reading files synchronously (blocks execution)
try {
  const data = fs.readFileSync('data.txt', 'utf8');
  console.log('File contents:', data);
} catch (error) {
  console.error('Error reading file:', error.message);
}

// Reading files asynchronously (non-blocking)
fs.readFile('data.txt', 'utf8', (error, data) => {
  if (error) {
    console.error('Error reading file:', error.message);
    return;
  }
  console.log('File contents:', data);
});

// Writing files
const movieData = JSON.stringify({
  name: "The Matrix",
  year: 1999,
  director: "The Wachowskis"
}, null, 2);

fs.writeFile('movie.json', movieData, 'utf8', (error) => {
  if (error) {
    console.error('Error writing file:', error.message);
    return;
  }
  console.log('File saved successfully!');
});
```

**Critical Teaching Points**:
- Always use try/catch with synchronous operations
- Always check for errors in async callbacks
- `utf8` encoding for text files
- `JSON.stringify()` to convert objects to JSON strings

**Create a sample file for students to test with**:
```bash
echo "This is a test file" > data.txt
```

---

## Creating Movie Buzz Backend ##

**Teaching Strategy**: Build this incrementally. Don't rush through the file creation.

Let's start building the backend for our Movie Buzz application.

### Project Structure ###

**Important**: Create this structure with students step by step.

```bash
mkdir data models utils
touch server.js data/movies.json models/Movie.js utils/fileUtils.js
```

**Explain the structure**:
- `data/` - where we store our data files
- `models/` - business logic and data models
- `utils/` - utility functions used across the app
- `server.js` - main application entry point

Your project should look like:
```
movie-buzz-backend/
├── data/
│   └── movies.json
├── models/
│   └── Movie.js
├── utils/
│   └── fileUtils.js
├── package.json
└── server.js
```

### Creating Movie Data Module ###

**Copy this carefully with students**:

First, let's create sample movie data in `data/movies.json`:

```json
[
  {
    "id": 1,
    "name": "The Matrix",
    "year": 1999,
    "rating": "R",
    "length": "136 minutes",
    "description": "A computer hacker learns about the true nature of reality.",
    "genre": ["Action", "Sci-Fi"],
    "director": "The Wachowskis",
    "stars": ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"]
  },
  {
    "id": 2,
    "name": "Inception",
    "year": 2010,
    "rating": "PG-13",
    "length": "148 minutes",
    "description": "A thief who steals corporate secrets through dream-sharing technology.",
    "genre": ["Action", "Sci-Fi", "Thriller"],
    "director": "Christopher Nolan",
    "stars": ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"]
  },
  {
    "id": 3,
    "name": "Pulp Fiction",
    "year": 1994,
    "rating": "R",
    "length": "154 minutes",
    "description": "The lives of two mob hitmen, a boxer, and other criminals intertwine in Los Angeles.",
    "genre": ["Crime", "Drama"],
    "director": "Quentin Tarantino",
    "stars": ["John Travolta", "Samuel L. Jackson", "Uma Thurman"]
  }
]
```

**Teaching Point**: This JSON structure matches what our React frontend expects.

### Building Server Utilities ###

**Build this section by section with students**:

Create `utils/fileUtils.js`:

```javascript
const fs = require('fs');
const path = require('path');

// Function to read JSON files
function readJsonFile(filename) {
  try {
    const filePath = path.join(__dirname, '..', 'data', filename);
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading file ${filename}:`, error.message);
    return [];
  }
}

// Function to write JSON files
function writeJsonFile(filename, data) {
  try {
    const filePath = path.join(__dirname, '..', 'data', filename);
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, 'utf8');
    return true;
  } catch (error) {
    console.error(`Error writing file ${filename}:`, error.message);
    return false;
  }
}

module.exports = {
  readJsonFile,
  writeJsonFile
};
```

**Key Teaching Points**:
- `path.join()` creates proper file paths across operating systems
- `__dirname` gets the current directory
- `..` goes up one directory level
- Always return a default value (empty array) on error

**Test the utilities** before moving on:
```javascript
// test-utils.js
const { readJsonFile } = require('./utils/fileUtils');
console.log(readJsonFile('movies.json'));
```

Create a Movie model in `models/Movie.js`:

**This is complex - go slowly and explain each method**:

```javascript
const { readJsonFile, writeJsonFile } = require('../utils/fileUtils');

class Movie {
  constructor(movieData) {
    this.id = movieData.id;
    this.name = movieData.name;
    this.year = movieData.year;
    this.rating = movieData.rating;
    this.length = movieData.length;
    this.description = movieData.description;
    this.genre = movieData.genre;
    this.director = movieData.director;
    this.stars = movieData.stars;
  }

  // Static method to get all movies
  static getAll() {
    return readJsonFile('movies.json');
  }

  // Static method to find a movie by ID
  static findById(id) {
    const movies = readJsonFile('movies.json');
    return movies.find(movie => movie.id === parseInt(id));
  }

  // Static method to get the next available ID
  static getNextId() {
    const movies = readJsonFile('movies.json');
    if (movies.length === 0) return 1;
    const maxId = Math.max(...movies.map(movie => movie.id));
    return maxId + 1;
  }

  // Instance method to save a movie
  save() {
    const movies = readJsonFile('movies.json');
    
    if (!this.id) {
      // New movie - assign ID
      this.id = Movie.getNextId();
      movies.push(this);
    } else {
      // Update existing movie
      const index = movies.findIndex(movie => movie.id === this.id);
      if (index !== -1) {
        movies[index] = this;
      } else {
        movies.push(this);
      }
    }
    
    return writeJsonFile('movies.json', movies);
  }

  // Static method to delete a movie
  static delete(id) {
    const movies = readJsonFile('movies.json');
    const filteredMovies = movies.filter(movie => movie.id !== parseInt(id));
    return writeJsonFile('movies.json', filteredMovies);
  }
}

module.exports = Movie;
```

**Teaching Points**:
- `static` methods belong to the class, not instances
- `parseInt()` ensures ID comparison works correctly  
- Spread operator `...` with `Math.max()` to find highest ID
- `findIndex()` vs `find()` - returns position vs object

Now create your main server file `server.js`:

```javascript
const Movie = require('./models/Movie');

// Test our Movie model
console.log('=== Movie Buzz Backend ===');

// Get all movies
console.log('All movies:');
const allMovies = Movie.getAll();
allMovies.forEach(movie => {
  console.log(`- ${movie.name} (${movie.year})`);
});

// Find a specific movie
console.log('\nFinding movie with ID 2:');
const movie = Movie.findById(2);
if (movie) {
  console.log(`Found: ${movie.name} directed by ${movie.director}`);
} else {
  console.log('Movie not found');
}

// Create a new movie
console.log('\nCreating a new movie...');
const newMovie = new Movie({
  name: "The Godfather",
  year: 1972,
  rating: "R",
  length: "175 minutes",
  description: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
  genre: ["Crime", "Drama"],
  director: "Francis Ford Coppola",
  stars: ["Marlon Brando", "Al Pacino", "James Caan"]
});

if (newMovie.save()) {
  console.log(`Successfully saved: ${newMovie.name} with ID ${newMovie.id}`);
} else {
  console.log('Failed to save movie');
}

console.log('\nBackend operations complete!');
```

**Test with students**:

```bash
node server.js
```

Students should see output showing movies being loaded, found, and saved.

---

## Introduction to HTTP Module ##

**Critical Teaching Point**: Students need to understand HTTP BEFORE using Express next week. This creates proper context.

**Start with WHY**: "Next week we'll use Express to create web APIs. But first, let's understand the HTTP protocol that powers the web."

### Understanding HTTP Requests ###

**Whiteboard Exercise**: Draw client-server communication:

```
[React App] ----HTTP Request----> [Node.js Server]
           <---HTTP Response----
```

**Key HTTP Methods** (write on board):
- **GET**: Retrieve data (like getting movie list)
- **POST**: Create new data (like adding a new movie)  
- **PUT**: Update existing data (like editing a movie)
- **DELETE**: Remove data (like deleting a movie)

### Making HTTP Requests with Node.js ###

**Demonstrate Live**: Create `http-client.js` with students:

```javascript
const http = require('http');

// Function to make a GET request
function makeHttpRequest(hostname, path, callback) {
  const options = {
    hostname: hostname,
    port: 80,
    path: path,
    method: 'GET'
  };

  console.log(`Making request to http://${hostname}${path}`);

  const request = http.request(options, (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
      data += chunk;
    });
    
    response.on('end', () => {
      console.log('✅ Request complete!');
      console.log('Status Code:', response.statusCode);
      
      if (callback) {
        callback(null, data);
      }
    });
  });

  request.on('error', (error) => {
    console.error('❌ Request failed:', error.message);
    if (callback) {
      callback(error, null);
    }
  });

  request.end();
}

// Demo with public API
makeHttpRequest('jsonplaceholder.typicode.com', '/posts/1', (error, data) => {
  if (!error) {
    const post = JSON.parse(data);
    console.log('Post Title:', post.title);
  }
});
```

**Run with students**: `node http-client.js`

### Creating a Simple HTTP Server ###

**Live Demo**: Build basic server:

```javascript
// simple-server.js
const http = require('http');

const server = http.createServer((request, response) => {
  console.log(`📝 ${request.method} request to ${request.url}`);
  
  response.writeHead(200, { 
    'Content-Type': 'text/html',
    'Access-Control-Allow-Origin': '*' 
  });
  
  if (request.url === '/') {
    response.end('<h1>🎬 Movie Buzz HTTP Server!</h1><p>Next week we\'ll use Express!</p>');
  } else if (request.url === '/movies') {
    response.end('<h1>Movies endpoint</h1><p>This will be our API endpoint!</p>');
  } else {
    response.writeHead(404);
    response.end('<h1>404 - Not Found</h1>');
  }
});

server.listen(3000, () => {
  console.log('🚀 HTTP server running on http://localhost:3000');
  console.log('📖 Try visiting different URLs in your browser!');
});
```

**Student Activity**: Have them visit:
- `http://localhost:3000`
- `http://localhost:3000/movies`  
- `http://localhost:3000/anything`

### Bridge to Express ###

**Important Connection**: "This HTTP server works, but it's verbose and repetitive. Next week, Express will make this much easier!"

**Preview Express benefit**:
```javascript
// Raw HTTP (what we just did)
if (request.url === '/movies' && request.method === 'GET') {
  // Handle movies request
}

// Express (what we'll learn next week)
app.get('/movies', (req, res) => {
  // Much cleaner!
});
```

> `Consider This`  
> How might understanding HTTP requests help you when connecting a React frontend to a Node.js backend? What advantages does Express.js provide over the raw HTTP module?

**Expected responses**: Express provides routing, middleware, simpler syntax, built-in JSON handling, etc.

---

## Command Line Arguments ##

**Advanced Topic**: Keep this brief but demonstrate the concept.

Node.js can read command line arguments through `process.argv`:

```javascript
// command-line.js
console.log('Command line arguments:');
console.log(process.argv);

// Get arguments after the script name
const args = process.argv.slice(2);
console.log('User arguments:', args);

// Example usage: node command-line.js search "The Matrix"
if (args[0] === 'search' && args[1]) {
  const searchTerm = args[1];
  const Movie = require('./models/Movie');
  
  const movies = Movie.getAll();
  const results = movies.filter(movie => 
    movie.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  console.log(`Found ${results.length} movies matching "${searchTerm}":`);
  results.forEach(movie => console.log(`- ${movie.name}`));
}
```

**Demonstrate**: `node command-line.js search Matrix`

---

## Asynchronous Programming Basics ##

**Important Foundation**: This prepares students for Express and database operations.

JavaScript in Node.js is asynchronous and event-driven. Here's a basic introduction:

```javascript
// Synchronous (blocking) - not recommended for production
console.log('Start');
const data = require('./data/movies.json');
console.log('Data loaded');
console.log('End');

// Asynchronous (non-blocking) - recommended
console.log('Start');

setTimeout(() => {
  console.log('This runs after 2 seconds');
}, 2000);

console.log('End - this runs before the timeout');

// Using callbacks for file operations
const fs = require('fs');

fs.readFile('./data/movies.json', 'utf8', (error, data) => {
  if (error) {
    console.error('Error:', error);
    return;
  }
  
  const movies = JSON.parse(data);
  console.log(`Loaded ${movies.length} movies asynchronously`);
});

console.log('File read started - this runs before the file is loaded');
```

**Key Teaching Points**:
- Asynchronous = non-blocking
- Callbacks run after operations complete
- Order of console.log output demonstrates async behavior

---

## Final Thoughts ##

**Celebrate the Achievement**: Students have built a complete backend foundation!

We've successfully created the foundation for our Movie Buzz backend using Node.js! We now have:

- A modular project structure with separate concerns
- File-based data storage and retrieval
- A Movie model with CRUD operations
- Utility functions for file operations
- Understanding of HTTP protocol and requests
- Command line interface capabilities

This backend will serve as the foundation for our Express server in the next week, where we'll transform the HTTP concepts into a powerful web framework and connect it to our React frontend.

> `Consider This`  
> How does this backend structure prepare us for scaling to a real database? What advantages does the modular approach provide?
>> Expect: Modular structure makes it easy to swap file storage for database storage. Each piece has a single responsibility. Easy to test individual components.

---

## Exit Ticket ##

Access code: port37

Instruct students to open the exit ticket for this week in the LMS. You may read through the questions with the students, but do not give the students the answers to the questions. Once all students have answered the questions, you may ask students for the correct answer.

1. What is the main difference between Node.js and browser JavaScript?
  > Answer: Node.js can access the file system and doesn't have DOM APIs
2. How do you export a function from a Node.js module?
  > Answer: Using module.exports
3. What does the require() function do?
  > Answer: Imports modules into your current file
4. Why is asynchronous programming important in Node.js?
  > Answer: It prevents blocking operations from stopping the entire application

---

## Review ##

- What is Node.js and how does it differ from browser JavaScript?
- How do you create and use modules in Node.js?
- What is the difference between synchronous and asynchronous file operations?
- How do you export and import functions between files?
- What are HTTP methods and when would you use each one?
- How does the Node.js http module work for making requests and creating servers?
- What are the advantages of organizing code into modules?
- How can Node.js applications handle command line arguments?