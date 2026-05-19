# Week 8 - Node.js & HTTP Fundamentals #

- [Week 8 - Node.js & HTTP Fundamentals](#week-8---nodejs--http-fundamentals)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
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
  - [Command Line Arguments](#command-line-arguments)
  - [Asynchronous Programming Basics](#asynchronous-programming-basics)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Notes About This Lesson Plan ##

Please review this lesson plan in advance of our RI session. If this plan doesn't align with where you and your classmates are at in the LMS, please send a ticket to Help Desk as soon as possible.

This code is for instructional purposes only. It should be utilized as an example in developing your own work. No part of it should be directly copied into your own project. As per TLM's plagiarism policy, submitting or misrepresenting code or an idea as your own when it was created by someone else constitutes plagiarism.

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

This lesson introduces server-side JavaScript with Node.js. We'll be moving from frontend React development to backend Node.js development.

Navigate to the `week_08_nodejs_and_http/movie-buzz-backend` directory:

```bash
cd week_08_nodejs_and_http/movie-buzz-backend
npm install
node server.js
```

You should see a welcome message from our Node.js backend! We'll be building file system operations, modules, and movie data management during this lesson.

---

## Simple Examples - Building Understanding

Before building the Movie Buzz backend, let's start with simple Node.js examples to understand server-side JavaScript:

### Example 1: Your First Node.js Script

Create `hello.js`:

```javascript
// Simple Node.js script
console.log('Hello from Node.js!');
console.log('Current directory:', __dirname);
console.log('Current file:', __filename);

// Node.js has different global objects than browser
console.log('Process ID:', process.pid);
console.log('Node version:', process.version);
```

Run it:
```bash
node hello.js
```

### Example 2: Working with Files

Create `file-example.js`:

```javascript
// Import the file system module
const fs = require('fs');

// Read a file synchronously (blocking)
try {
  const data = fs.readFileSync('package.json', 'utf8');
  console.log('File contents:', data);
} catch (error) {
  console.error('Error reading file:', error.message);
}

// Write a file
const message = 'Hello from Node.js file system!';
fs.writeFileSync('output.txt', message);
console.log('File written successfully!');

// Read file asynchronously (non-blocking)
fs.readFile('output.txt', 'utf8', (error, data) => {
  if (error) {
    console.error('Async read error:', error);
  } else {
    console.log('Async read result:', data);
  }
});
```

### Example 3: Creating a Simple HTTP Server

Create `simple-server.js`:

```javascript
// Import the http module
const http = require('http');

// Create a simple server
const server = http.createServer((req, res) => {
  // Set response headers
  res.writeHead(200, { 'Content-Type': 'text/html' });

  // Send different responses based on URL
  if (req.url === '/') {
    res.end('<h1>Welcome to my Node.js server!</h1>');
  } else if (req.url === '/about') {
    res.end('<h1>About Page</h1><p>This is a simple Node.js server</p>');
  } else {
    res.writeHead(404);
    res.end('<h1>Page Not Found</h1>');
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
```

Run it and visit `http://localhost:3000`:
```bash
node simple-server.js
```

### Example 4: Working with Modules

Create `math-utils.js`:

```javascript
// Simple module with utility functions
function add(a, b) {
  return a + b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b === 0) {
    throw new Error('Cannot divide by zero');
  }
  return a / b;
}

// Export functions for use in other files
module.exports = {
  add,
  multiply,
  divide
};
```

Create `use-math.js`:

```javascript
// Import our custom module
const math = require('./math-utils');

console.log('2 + 3 =', math.add(2, 3));
console.log('4 * 5 =', math.multiply(4, 5));
console.log('10 / 2 =', math.divide(10, 2));

try {
  console.log('10 / 0 =', math.divide(10, 0));
} catch (error) {
  console.error('Math error:', error.message);
}
```

> `Try It Out`
> Create and run these examples to understand:
> - How Node.js differs from browser JavaScript
> - File system operations (reading/writing files)
> - Creating basic HTTP servers
> - Module system (require/module.exports)
> - Notice how Node.js enables server-side development

## What is Node.js? ##

Now that you've seen Node.js in action, let's understand what it is. Node.js is a JavaScript runtime that allows you to run JavaScript outside of web browsers. This means you can use JavaScript to build:

- Web servers
- Command line tools
- Desktop applications
- APIs and backend services

Key differences between Node.js and browser JavaScript:
- **No DOM**: Node.js doesn't have `window`, `document`, or DOM APIs
- **File system access**: Node.js can read and write files on your computer
- **Network capabilities**: Node.js can create servers and make network requests
- **Process control**: Node.js can spawn processes and handle system operations

> `Consider This`  
> Why might it be advantageous to use the same language (JavaScript) for both frontend and backend development?

---

## Setting Up Node.js Development ##

First, let's initialize a new Node.js project:

```bash
npm init -y
```

This creates a `package.json` file with default settings. Let's examine what was created:

```json
{
  "name": "movie-buzz-backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Let's add a start script to our package.json:

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

---

## Node.js Modules and require() ##

Node.js uses modules to organize code. There are three types of modules:

1. **Built-in modules** (like `fs`, `http`, `path`)
2. **Local modules** (files you create)
3. **Third-party modules** (installed with npm)

### Using Built-in Modules ###

```javascript
// Import the file system module
const fs = require('fs');

// Import the path module for working with file paths
const path = require('path');

// Use the modules
console.log('Current directory:', __dirname);
console.log('Current file:', __filename);
```

### Creating and Using Local Modules ###

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

> `Consider This`  
> How does the module system help organize large applications? What problems does it solve?

---

## File System Operations ##

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

---

## Creating Movie Buzz Backend ##

Let's start building the backend for our Movie Buzz application.

### Project Structure ###

Create the following directory structure:

```bash
mkdir data models utils
touch server.js data/movies.json models/Movie.js utils/fileUtils.js
```

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

### Building Server Utilities ###

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

Create a Movie model in `models/Movie.js`:

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

Test your backend:

```bash
node server.js
```

---

## Introduction to HTTP Module ##

While our Movie Buzz backend currently works with local files, in web development we often need to make HTTP requests to external APIs or communicate between servers. Node.js provides a built-in `http` module for this purpose.

### Understanding HTTP Requests ###

HTTP (HyperText Transfer Protocol) is how web browsers and servers communicate. When you visit a website, your browser makes an HTTP request to a server, which responds with HTML, CSS, JavaScript, or data.

**Common HTTP Methods:**
- **GET**: Retrieve data (like getting a list of movies)
- **POST**: Create new data (like adding a new movie)  
- **PUT**: Update existing data (like editing a movie)
- **DELETE**: Remove data (like deleting a movie)

### Making HTTP Requests with Node.js ###

Let's explore how Node.js can make HTTP requests to external APIs:

```javascript
// http-client.js
const http = require('http');

// Function to make a GET request
function makeHttpRequest(hostname, path, callback) {
  const options = {
    hostname: hostname,
    port: 80,
    path: path,
    method: 'GET'
  };

  const request = http.request(options, (response) => {
    let data = '';
    
    // Collect data chunks
    response.on('data', (chunk) => {
      data += chunk;
    });
    
    // Handle complete response
    response.on('end', () => {
      console.log('Response received:');
      console.log('Status Code:', response.statusCode);
      console.log('Data:', data);
      
      if (callback) {
        callback(null, data);
      }
    });
  });

  // Handle request errors
  request.on('error', (error) => {
    console.error('Request error:', error.message);
    if (callback) {
      callback(error, null);
    }
  });

  // Send the request
  request.end();
}

// Example: Get data from a public API
console.log('Making HTTP request to a public API...');
makeHttpRequest('jsonplaceholder.typicode.com', '/posts/1', (error, data) => {
  if (error) {
    console.error('Failed to get data:', error.message);
  } else {
    console.log('Successfully retrieved data!');
    try {
      const post = JSON.parse(data);
      console.log('Post title:', post.title);
    } catch (parseError) {
      console.error('Failed to parse JSON:', parseError.message);
    }
  }
});
```

### Creating a Simple HTTP Server ###

The `http` module can also create servers. Here's a basic example:

```javascript
// simple-server.js
const http = require('http');

const server = http.createServer((request, response) => {
  console.log(`${request.method} request to ${request.url}`);
  
  // Set response headers
  response.writeHead(200, { 'Content-Type': 'text/html' });
  
  // Send response
  response.end('<h1>Hello from Node.js HTTP Server!</h1>');
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Simple HTTP server running on http://localhost:${PORT}`);
});
```

### Why Learn HTTP Now? ###

Understanding HTTP is crucial because:

1. **Next week** we'll use Express.js framework, which builds on HTTP concepts
2. **Frontend-backend communication** relies on HTTP requests
3. **REST APIs** use HTTP methods to perform CRUD operations  
4. **Modern web development** requires understanding client-server communication

> `Consider This`  
> How might understanding HTTP requests help you when connecting a React frontend to a Node.js backend? What advantages does Express.js provide over the raw HTTP module?

---

## Command Line Arguments ##

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

---

## Asynchronous Programming Basics ##

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

---

## Final Thoughts ##

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

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

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