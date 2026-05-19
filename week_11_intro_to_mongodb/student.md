# Week 11 - Intro to MongoDB #

- [Week 11 - Intro to MongoDB](#week-11---intro-to-mongodb)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [What is MongoDB?](#what-is-mongodb)
  - [Installing MongoDB](#installing-mongodb)
  - [Understanding NoSQL vs SQL](#understanding-nosql-vs-sql)
  - [MongoDB Basics](#mongodb-basics)
    - [Collections and Documents](#collections-and-documents)
    - [MongoDB Shell Commands](#mongodb-shell-commands)
  - [Setting Up Movie Buzz Database](#setting-up-movie-buzz-database)
  - [Basic Database Operations](#basic-database-operations)
    - [Creating Documents](#creating-documents)
    - [Reading Documents](#reading-documents)
    - [Updating Documents](#updating-documents)
    - [Deleting Documents](#deleting-documents)
  - [Database Design for Movie Buzz](#database-design-for-movie-buzz)
  - [Connecting Node.js to MongoDB](#connecting-nodejs-to-mongodb)
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

- Explain what MongoDB is and how it differs from traditional SQL databases
- Install and set up MongoDB on their development environment
- Understand the difference between NoSQL and SQL database approaches
- Create, read, update, and delete documents in MongoDB
- Design a database schema for the Movie Buzz application
- Use MongoDB shell commands for basic database operations
- Connect a Node.js application to MongoDB
- Understand MongoDB collections, documents, and data types

---

## Glossary ##

- `MongoDB`: A document-oriented NoSQL database program
- `NoSQL`: "Not only SQL" - databases that don't use traditional relational database structures
- `Document`: A record in MongoDB, similar to a row in SQL databases, stored in BSON format
- `Collection`: A group of MongoDB documents, similar to a table in SQL databases
- `BSON`: Binary JSON - the format MongoDB uses to store documents
- `Schema`: The structure and organization of data in a database
- `Database`: A collection of collections that stores related data
- `MongoDB Shell`: Command-line interface for interacting with MongoDB

---

## Starting Point ##

Before we begin this lesson, make sure you have your Movie Buzz Express API from Week 9 working properly. We'll be replacing the file-based storage with a real MongoDB database.

Your current project should include:
- Express server with REST API endpoints (Week 9)
- Movie CRUD operations using file storage
- React frontend connected to the API

We'll be transitioning from file storage to database storage this week.

---

## Simple Database Examples - Building Understanding

Before working with Movie Buzz database, let's understand MongoDB with simple examples:

### Example 1: Understanding Documents vs Tables

**Traditional SQL Table (Users):**
```sql
CREATE TABLE users (
  id INT PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(100),
  age INT
);

INSERT INTO users VALUES (1, 'John', 'john@email.com', 25);
```

**MongoDB Document (Users Collection):**
```javascript
// MongoDB stores data as documents (like JSON objects)
{
  _id: ObjectId("64a1b2c3d4e5f6789abcdef0"),
  name: "John",
  email: "john@email.com",
  age: 25,
  // MongoDB allows flexible fields
  hobbies: ["reading", "gaming"],
  address: {
    street: "123 Main St",
    city: "Boston"
  }
}
```

### Example 2: Basic MongoDB Shell Commands

Open your MongoDB shell and try these commands:

```javascript
// Switch to a practice database
use practice_db

// Insert a simple document
db.students.insertOne({
  name: "Alice",
  grade: "A",
  subjects: ["Math", "Science", "History"]
})

// Insert multiple documents
db.students.insertMany([
  { name: "Bob", grade: "B", subjects: ["Math", "Art"] },
  { name: "Carol", grade: "A", subjects: ["Science", "Math", "English"] }
])

// Find all documents
db.students.find()

// Find documents with pretty formatting
db.students.find().pretty()

// Find specific documents
db.students.find({ grade: "A" })
db.students.find({ name: "Bob" })

// Find documents with array elements
db.students.find({ subjects: "Math" })

// Count documents
db.students.countDocuments()
db.students.countDocuments({ grade: "A" })
```

### Example 3: Working with Different Data Types

```javascript
// Switch to sample database
use sample_db

// Insert document with various data types
db.products.insertOne({
  name: "Laptop",                    // String
  price: 999.99,                     // Number
  inStock: true,                     // Boolean
  tags: ["electronics", "computer"], // Array
  specs: {                           // Embedded object
    cpu: "Intel i7",
    ram: "16GB",
    storage: "512GB SSD"
  },
  releaseDate: new Date(),           // Date
  reviews: []                        // Empty array
})

// Insert another product
db.products.insertOne({
  name: "Book",
  price: 19.99,
  inStock: false,
  tags: ["education", "paperback"],
  author: "Jane Doe",                // Different fields are allowed!
  isbn: "978-0123456789"
})

// Query examples
db.products.find({ inStock: true })
db.products.find({ price: { $lt: 50 } })  // Price less than 50
db.products.find({ tags: "electronics" })
db.products.find({ "specs.cpu": "Intel i7" })  // Query nested fields
```

### Example 4: Basic CRUD Operations

```javascript
// CREATE (Insert)
db.books.insertOne({
  title: "JavaScript Basics",
  author: "John Smith",
  pages: 300,
  published: 2023
})

// READ (Find)
db.books.find({ author: "John Smith" })
db.books.findOne({ title: "JavaScript Basics" })

// UPDATE
db.books.updateOne(
  { title: "JavaScript Basics" },        // Find this document
  { $set: { pages: 350 } }               // Update pages field
)

// Add a new field
db.books.updateOne(
  { title: "JavaScript Basics" },
  { $set: { rating: 4.5 } }
)

// DELETE
db.books.deleteOne({ title: "JavaScript Basics" })

// Verify deletion
db.books.find()
```

### Example 5: Arrays and Complex Queries

```javascript
// Insert movies with array data (similar to our Movie Buzz app)
db.movies.insertMany([
  {
    title: "The Matrix",
    year: 1999,
    genres: ["Action", "Sci-Fi"],
    directors: ["The Wachowskis"],
    rating: "R"
  },
  {
    title: "Toy Story",
    year: 1995,
    genres: ["Animation", "Family", "Comedy"],
    directors: ["John Lasseter"],
    rating: "G"
  },
  {
    title: "Inception",
    year: 2010,
    genres: ["Action", "Sci-Fi", "Thriller"],
    directors: ["Christopher Nolan"],
    rating: "PG-13"
  }
])

// Query arrays
db.movies.find({ genres: "Sci-Fi" })              // Has Sci-Fi genre
db.movies.find({ genres: { $in: ["Comedy"] } })   // Has Comedy genre
db.movies.find({ year: { $gte: 2000 } })          // Year >= 2000
db.movies.find({
  genres: "Action",
  year: { $gte: 2000 }
})  // Multiple conditions
```

> `Try It Out`
> Practice these MongoDB shell commands to understand:
> - Document structure vs table structure
> - Flexible schemas and varying fields
> - Basic CRUD operations
> - Array queries and nested data
> - Different data types in documents

## What is MongoDB? ##

Now that you've experienced MongoDB hands-on, let's understand what makes it special. MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents instead of traditional rows and columns. It's designed for:

- **Scalability**: Can handle large amounts of data and high traffic
- **Flexibility**: Schema-less design allows for easy data structure changes
- **Performance**: Optimized for read and write operations
- **Developer Experience**: Uses JSON-like syntax familiar to JavaScript developers

**Why MongoDB for MERN Stack?**
- Native JSON support works perfectly with JavaScript
- Flexible schema matches dynamic web application needs
- Horizontal scaling capabilities
- Rich query language
- Active community and extensive documentation

MongoDB is the "M" in MERN, completing our full-stack JavaScript solution.

> `Consider This`  
> How might a flexible document structure be advantageous for a movie database where different movies might have different types of information?

---

## Installing MongoDB ##

**Note**: Installation steps vary by operating system. Follow the instructions for your system.

### MongoDB Installation ###

1. **Download MongoDB Community Server** from the official website
2. **Follow installation instructions** for your operating system
3. **Start MongoDB service**:

```bash
# On macOS/Linux
sudo service mongod start

# Or using brew on macOS
brew services start mongodb-community

# On Windows
net start MongoDB
```

4. **Verify installation**:

```bash
mongo --version
```

### MongoDB Shell ###

The MongoDB shell (mongo) is a command-line interface for interacting with MongoDB:

```bash
# Start MongoDB shell
mongo

# Or for newer versions
mongosh
```

You should see a prompt like:
```
MongoDB shell version v5.0.0
connecting to: mongodb://127.0.0.1:27017
>
```

---

## Understanding NoSQL vs SQL ##

**Traditional SQL Databases (like MySQL, PostgreSQL):**
- Structured data in tables with rows and columns
- Fixed schema - must define structure before adding data
- Uses SQL query language
- ACID transactions
- Good for complex relationships between data

**Example SQL Table:**
```sql
Movies Table:
| id | name        | year | director          | rating |
|----|-------------|------|-------------------|---------|
| 1  | The Matrix  | 1999 | The Wachowskis   | R       |
| 2  | Inception   | 2010 | Christopher Nolan| PG-13   |
```

**NoSQL Databases (like MongoDB):**
- Flexible document structure (JSON-like)
- Schema-less - can add fields on the fly
- Various query methods depending on database type
- Eventually consistent
- Good for rapidly changing data structures

**Example MongoDB Document:**
```json
{
  "_id": ObjectId("507f1f77bcf86cd799439011"),
  "name": "The Matrix",
  "year": 1999,
  "director": "The Wachowskis",
  "rating": "R",
  "genre": ["Action", "Sci-Fi"],
  "stars": ["Keanu Reeves", "Laurence Fishburne"],
  "awards": {
    "oscars": 4,
    "nominations": 5
  }
}
```

> `Consider This`  
> What advantages might the MongoDB document structure have for storing movie information compared to a traditional SQL table?

---

## MongoDB Basics ##

### Collections and Documents ###

**Database Structure:**
- **Database**: Top-level container (like "movie-buzz")
- **Collection**: Group of documents (like "movies", "users")
- **Document**: Individual record (like a specific movie)

```
Database: movie-buzz
├── Collection: movies
│   ├── Document: { name: "The Matrix", year: 1999, ... }
│   ├── Document: { name: "Inception", year: 2010, ... }
│   └── Document: { name: "Pulp Fiction", year: 1994, ... }
├── Collection: users
│   ├── Document: { name: "John", email: "john@example.com" }
│   └── Document: { name: "Jane", email: "jane@example.com" }
```

### MongoDB Shell Commands ###

**Basic Navigation:**

```javascript
// Show all databases
show dbs

// Create/switch to a database
use movie-buzz

// Show current database
db

// Show collections in current database
show collections

// Get help
help
```

**Document Operations:**

```javascript
// Insert a document
db.movies.insertOne({
  name: "The Matrix",
  year: 1999,
  director: "The Wachowskis",
  rating: "R"
})

// Find all documents
db.movies.find()

// Find with pretty formatting
db.movies.find().pretty()

// Find specific document
db.movies.findOne({ name: "The Matrix" })

// Count documents
db.movies.countDocuments()
```

---

## Setting Up Movie Buzz Database ##

Let's create our Movie Buzz database and add some initial data.

**Step 1: Start MongoDB and create database**

```bash
# Start MongoDB shell
mongosh

# Create/switch to movie-buzz database
use movie-buzz

# The database won't appear until we add data
```

**Step 2: Create our first movie collection**

```javascript
// Insert our first movie
db.movies.insertOne({
  name: "The Matrix",
  year: 1999,
  rating: "R",
  length: "136 minutes",
  description: "A computer hacker learns about the true nature of reality.",
  genre: ["Action", "Sci-Fi"],
  director: "The Wachowskis",
  stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
  createdAt: new Date(),
  updatedAt: new Date()
})
```

**Step 3: Add multiple movies**

```javascript
// Insert multiple movies at once
db.movies.insertMany([
  {
    name: "Inception",
    year: 2010,
    rating: "PG-13",
    length: "148 minutes",
    description: "A thief who steals corporate secrets through dream-sharing technology.",
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    stars: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    createdAt: new Date(),
    updatedAt: new Date()
  },
  {
    name: "Pulp Fiction",
    year: 1994,
    rating: "R",
    length: "154 minutes",
    description: "The lives of two mob hitmen, a boxer, and other criminals intertwine in Los Angeles.",
    genre: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    stars: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    createdAt: new Date(),
    updatedAt: new Date()
  }
])
```

**Step 4: Verify data**

```javascript
// Check that our database and collection exist
show dbs
show collections

// View our movies
db.movies.find().pretty()

// Count our movies
db.movies.countDocuments()
```

---

## Basic Database Operations ##

### Creating Documents ###

```javascript
// Insert one document
db.movies.insertOne({
  name: "The Godfather",
  year: 1972,
  director: "Francis Ford Coppola",
  rating: "R"
})

// Insert multiple documents
db.movies.insertMany([
  { name: "Movie 1", year: 2020 },
  { name: "Movie 2", year: 2021 }
])
```

### Reading Documents ###

```javascript
// Find all documents
db.movies.find()

// Find with condition
db.movies.find({ year: 1999 })

// Find with multiple conditions
db.movies.find({ year: 1999, rating: "R" })

// Find one document
db.movies.findOne({ name: "The Matrix" })

// Find with advanced queries
db.movies.find({ year: { $gte: 2000 } }) // Movies from 2000 or later
db.movies.find({ genre: { $in: ["Action"] } }) // Movies with Action genre
db.movies.find({ name: { $regex: /Matrix/i } }) // Case-insensitive search
```

### Updating Documents ###

```javascript
// Update one document
db.movies.updateOne(
  { name: "The Matrix" },
  { $set: { rating: "R", boxOffice: "$463.5 million" } }
)

// Update multiple documents
db.movies.updateMany(
  { year: { $lt: 2000 } },
  { $set: { category: "Classic" } }
)

// Replace entire document
db.movies.replaceOne(
  { name: "The Matrix" },
  {
    name: "The Matrix",
    year: 1999,
    director: "The Wachowskis",
    rating: "R",
    updatedAt: new Date()
  }
)
```

### Deleting Documents ###

```javascript
// Delete one document
db.movies.deleteOne({ name: "The Matrix" })

// Delete multiple documents
db.movies.deleteMany({ year: { $lt: 1980 } })

// Delete all documents in collection
db.movies.deleteMany({})
```

---

## Database Design for Movie Buzz ##

For our Movie Buzz application, we'll design our database structure:

**Movies Collection Structure:**
```javascript
{
  _id: ObjectId("..."),           // Automatically generated unique ID
  name: String,                   // Required
  year: Number,                   // Required
  rating: String,                 // Required (PG, PG-13, R, etc.)
  length: String,                 // Required (e.g., "136 minutes")
  description: String,            // Required
  genre: [String],                // Array of genres
  director: String,               // Required
  stars: [String],                // Array of actor names
  poster: String,                 // Optional - URL to movie poster
  boxOffice: String,              // Optional - box office earnings
  awards: {                       // Optional nested object
    oscars: Number,
    nominations: Number
  },
  createdAt: Date,                // Timestamp
  updatedAt: Date                 // Timestamp
}
```

**Example Document:**
```javascript
{
  _id: ObjectId("507f1f77bcf86cd799439011"),
  name: "The Matrix",
  year: 1999,
  rating: "R",
  length: "136 minutes",
  description: "A computer hacker learns about the true nature of reality.",
  genre: ["Action", "Sci-Fi"],
  director: "The Wachowskis",
  stars: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
  boxOffice: "$463.5 million",
  awards: {
    oscars: 4,
    nominations: 5
  },
  createdAt: ISODate("2024-01-15T10:30:00Z"),
  updatedAt: ISODate("2024-01-15T10:30:00Z")
}
```

---

## Connecting Node.js to MongoDB ##

To connect our Express API to MongoDB, we'll need to install the MongoDB Node.js driver:

```bash
cd movie-buzz-backend
npm install mongodb
```

**Basic Connection Example** (we'll improve this next week):

Create a new file `config/database.js`:

```javascript
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'movie-buzz';

let db = null;

async function connectToDatabase() {
  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log('🍃 Connected to MongoDB');
    return db;
  } catch (error) {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  }
}

function getDatabase() {
  if (!db) {
    throw new Error('Database not initialized. Call connectToDatabase first.');
  }
  return db;
}

module.exports = {
  connectToDatabase,
  getDatabase
};
```

**Test the connection** in your `server.js`:

```javascript
const express = require('express');
const cors = require('cors');
const { connectToDatabase, getDatabase } = require('./config/database');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to database before starting server
connectToDatabase().then(() => {
  // Test route to verify database connection
  app.get('/api/test-db', async (req, res) => {
    try {
      const db = getDatabase();
      const movies = await db.collection('movies').find().toArray();
      res.json({
        success: true,
        message: 'Database connection successful',
        movieCount: movies.length,
        movies: movies
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Database connection failed',
        details: error.message
      });
    }
  });

  // Start server
  app.listen(PORT, () => {
    console.log(`🎬 Movie Buzz API running on http://localhost:${PORT}`);
  });
});
```

Test your database connection:
```bash
npm run dev
```

Visit `http://localhost:4000/api/test-db` to verify your connection works.

---

## Final Thoughts ##

We've successfully introduced MongoDB as our database solution! We've learned:

- The fundamental concepts of NoSQL vs SQL databases
- How to install and set up MongoDB
- Basic CRUD operations using MongoDB shell
- Database design principles for our Movie Buzz application
- How to connect Node.js applications to MongoDB

Next week, we'll introduce Mongoose, an Object Document Mapper (ODM) that makes working with MongoDB in Node.js much easier and more structured. We'll also implement our first database READ functionality.

> `Consider This`  
> How does using a real database like MongoDB change the scalability and reliability of our Movie Buzz application compared to file storage?

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Review ##

- What is MongoDB and how does it differ from SQL databases?
- What are the main components of MongoDB's data structure (databases, collections, documents)?
- How do you perform basic CRUD operations in MongoDB shell?
- What are the advantages of using a document-based database for web applications?
- How do you connect a Node.js application to MongoDB?
- What design considerations are important when structuring documents in MongoDB?