# Week 9 - Intro to MongoDB #

- [Week 9 - Intro to MongoDB](#week-9---intro-to-mongodb)
  - [Reminder](#reminder)
  - [Background](#background)
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

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students have built a complete full-stack application using React frontend and Express API with file-based storage. This week introduces them to MongoDB as their database solution, completing the MERN stack. Students will transition from file storage to real database operations. This is a foundational week that introduces database concepts that will be built upon in subsequent CRUD-focused weeks.

**Potential Challenge**: Students may struggle with the conceptual shift from file-based to database thinking. Emphasize the similarities while highlighting the advantages.

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

Students should have completed Week 7 with a working full-stack application:
- React frontend with full CRUD functionality
- Express API server with REST endpoints
- File-based data storage

**Pre-class Preparation**: Ensure MongoDB is installed on the teaching computer and test all examples.

**Common Student Issue**: File-based storage works, so students may question why they need a database. Emphasize scalability, data integrity, and professional development practices.

---

## What is MongoDB? ##

**Teaching Strategy**: Start with the big picture before diving into technical details.

MongoDB is a document-oriented NoSQL database that stores data in flexible, JSON-like documents instead of traditional rows and columns. It's designed for:

- **Scalability**: Can handle large amounts of data and high traffic
- **Flexibility**: Schema-less design allows for easy data structure changes
- **Performance**: Optimized for read and write operations
- **Developer Experience**: Uses JSON-like syntax familiar to JavaScript developers

**Industry Context**: MongoDB is the "M" in MERN, completing our full-stack JavaScript solution.

**Visual Comparison** (draw on board):
```
File Storage:     movies.json (single file, limited)
Database Storage: MongoDB Server → Database → Collections → Documents
```

> `Consider This`  
> How might a flexible document structure be advantageous for a movie database where different movies might have different types of information?
>> Expect: Some movies have sequels, awards, different rating systems, international release dates, etc. SQL requires predefined columns for all possibilities.

**Teaching Analogy**: Think of MongoDB like a filing cabinet where each drawer (collection) can hold different types of documents with varying information, rather than rigid forms that must be filled out exactly the same way.

---

## Installing MongoDB ##

**Critical Setup Step**: This section requires careful attention to different operating systems.

**Important**: Installation varies significantly by OS. Have backup installation methods ready.

### MongoDB Installation Steps ###

1. **Download MongoDB Community Server** from the official website
2. **Follow installation instructions** for your operating system
3. **Start MongoDB service**

**Common Installation Issues**:
- **Windows**: May need to manually start the MongoDB service
- **macOS**: Brew installation is usually easiest: `brew install mongodb-community`
- **Linux**: Package manager varies by distribution

**Test Installation**:
```bash
# Verify MongoDB is installed
mongod --version

# Start MongoDB (varies by system)
sudo service mongod start    # Linux
brew services start mongodb-community    # macOS
net start MongoDB    # Windows

# Connect to MongoDB
mongosh    # or 'mongo' for older versions
```

**Troubleshooting Common Issues**:
- **Port conflicts**: MongoDB defaults to port 27017
- **Permission errors**: May need administrator privileges
- **Path issues**: MongoDB binaries may not be in PATH

**Teaching Tip**: Have a backup plan (like MongoDB Atlas cloud database) if local installation fails for some students.

---

## Understanding NoSQL vs SQL ##

**Critical Conceptual Foundation**: Students need to understand this paradigm shift.

**Teaching Strategy**: Use side-by-side comparison with concrete examples.

### Traditional SQL Databases ###
- Structured data in tables with rows and columns
- Fixed schema - must define structure before adding data
- Uses SQL query language
- ACID transactions
- Good for complex relationships between data

**Example SQL Table** (draw on board):
```sql
Movies Table:
+----+-------------+------+------------------+---------+
| id | name        | year | director         | rating  |
+----+-------------+------+------------------+---------+
| 1  | The Matrix  | 1999 | The Wachowskis  | R       |
| 2  | Inception   | 2010 | Christopher Nolan| PG-13   |
+----+-------------+------+------------------+---------+
```

### NoSQL Databases (MongoDB) ###
- Flexible document structure (JSON-like)
- Schema-less - can add fields on the fly
- Various query methods
- Eventually consistent
- Good for rapidly changing data structures

**Example MongoDB Document**:
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

**Key Differences to Emphasize**:
1. **Flexibility**: MongoDB allows different documents to have different fields
2. **Nested Data**: Can store arrays and objects within documents
3. **No Joins**: Related data can be stored together in one document
4. **JSON-like**: Familiar syntax for JavaScript developers

> `Consider This`  
> What advantages might the MongoDB document structure have for storing movie information compared to a traditional SQL table?
>> Expect: Can store arrays (genres, actors), nested objects (awards), variable fields (some movies have sequels, some don't), no need for complex joins.

**Common Student Confusion**: Students may ask "which is better?" Emphasize that both have their place - it depends on the use case.

---

## MongoDB Basics ##

### Collections and Documents ###

**Teaching Analogy**: Think of MongoDB like a library:
- **Database**: The entire library
- **Collection**: A section of the library (fiction, non-fiction)
- **Document**: An individual book

**Hierarchy Structure** (draw on board):
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

**Teaching Strategy**: Start with basic navigation, then move to data operations.

**Important**: Use `mongosh` for newer versions, `mongo` for older versions.

**Basic Navigation**:
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

**Key Teaching Points**:
- Databases are created lazily (only when you add data)
- `use` command switches context
- `db` refers to current database

**Document Operations**:
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

**Demonstrate Each Command Live**: Students learn better by seeing commands executed.

---

## Setting Up Movie Buzz Database ##

**Hands-on Section**: Students should follow along in their MongoDB shell.

**Step 1: Start MongoDB and create database**

```bash
# Start MongoDB shell
mongosh

# Create/switch to movie-buzz database
use movie-buzz
```

**Teaching Point**: The database won't appear in `show dbs` until we add data.

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

**Key Teaching Points**:
- MongoDB automatically creates collections when you insert documents
- `_id` field is automatically generated if not provided
- `new Date()` creates timestamps
- Arrays and nested objects are supported natively

**Step 3: Add multiple movies**

**Teaching Strategy**: Show `insertMany()` for bulk operations.

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

**Teaching Point**: Now the database appears in `show dbs` because it contains data.

---

## Basic Database Operations ##

**CRUD Operations Overview**: Cover each operation systematically.

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

**Teaching Points**:
- `insertOne()` for single documents
- `insertMany()` for multiple documents
- MongoDB returns insertion results with generated IDs

### Reading Documents ###

**Most Important Section**: Students will use queries extensively.

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
db.movies.find({ year: { $gte: 2000 } })      // Movies from 2000 or later
db.movies.find({ genre: { $in: ["Action"] } }) // Movies with Action genre
db.movies.find({ name: { $regex: /Matrix/i } }) // Case-insensitive search
```

**Advanced Query Operators** (introduce gradually):
- `$gte`, `$lt`, `$lte`: Comparison operators
- `$in`, `$nin`: Array membership
- `$regex`: Regular expression matching
- `$exists`: Check if field exists

**Teaching Strategy**: Start simple, then show more complex queries as students get comfortable.

### Updating Documents ###

```javascript
// Update one document
db.movies.updateOne(
  { name: "The Matrix" },               // Filter
  { $set: { rating: "R", boxOffice: "$463.5 million" } }  // Update
)

// Update multiple documents
db.movies.updateMany(
  { year: { $lt: 2000 } },              // Filter: movies before 2000
  { $set: { category: "Classic" } }     // Update: add category field
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

**Key Teaching Points**:
- `updateOne()` vs `updateMany()`
- `$set` operator adds or modifies fields
- `replaceOne()` replaces entire document
- Always use update operators like `$set`

### Deleting Documents ###

**Emphasize Caution**: Deletion is permanent.

```javascript
// Delete one document
db.movies.deleteOne({ name: "The Matrix" })

// Delete multiple documents
db.movies.deleteMany({ year: { $lt: 1980 } })

// Delete all documents in collection (dangerous!)
db.movies.deleteMany({})
```

**Safety Warning**: Always test delete queries with `find()` first:
```javascript
// Test what will be deleted
db.movies.find({ year: { $lt: 1980 } })

// Then delete
db.movies.deleteMany({ year: { $lt: 1980 } })
```

---

## Database Design for Movie Buzz ##

**Design Principles**: Discuss schema design even though MongoDB is schema-less.

**Movies Collection Structure**:
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

**Design Considerations**:
1. **Required vs Optional Fields**: What's essential for every movie?
2. **Data Types**: String vs Number vs Array
3. **Nested Objects**: When to use embedded documents
4. **Timestamps**: Always include createdAt and updatedAt
5. **Future Scalability**: Design for features you might add later

**Teaching Point**: Even though MongoDB is flexible, having a consistent structure makes your application more maintainable.

---

## Connecting Node.js to MongoDB ##

**Bridge to Application Development**: This connects database to their existing Express API.

Install the MongoDB Node.js driver:

```bash
cd movie-buzz-backend
npm install mongodb
```

**Basic Connection Setup**:

Create `config/database.js`:

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

**Key Teaching Points**:
- Connection string format
- Async/await pattern for database operations
- Error handling for connection failures
- Singleton pattern for database connection

**Test Connection in server.js**:

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

**Testing**: Have students visit `http://localhost:4000/api/test-db` to verify connection.

**Common Issues**:
- MongoDB not running
- Port conflicts
- Connection string errors
- Async/await confusion

---

## Final Thoughts ##

**Major Achievement**: Students have successfully integrated MongoDB into their stack!

We've successfully introduced MongoDB as our database solution! We've learned:

- The fundamental concepts of NoSQL vs SQL databases
- How to install and set up MongoDB
- Basic CRUD operations using MongoDB shell
- Database design principles for our Movie Buzz application
- How to connect Node.js applications to MongoDB

**Next Week Preview**: We'll introduce Mongoose, an Object Document Mapper (ODM) that makes working with MongoDB much easier and more structured. We'll also implement our first database READ functionality.

**Industry Context**: Emphasize that they now have experience with a production-grade database system used by many major companies.

> `Consider This`  
> How does using a real database like MongoDB change the scalability and reliability of our Movie Buzz application compared to file storage?
>> Expect: Multiple users can access simultaneously, data integrity, backup/recovery options, indexing for performance, concurrent access handling.

**Preparation for Next Week**: Students should have MongoDB running and their test connection working.

---

## Exit Ticket ##

Access code: byte16

Instruct students to open the exit ticket for this week in the LMS. You may read through the questions with the students, but do not give the students the answers to the questions. Once all students have answered the questions, you may ask students for the correct answer.

1. What is the main difference between NoSQL and SQL databases?
  > Answer: NoSQL stores data in flexible documents/key-value pairs, SQL stores data in structured tables with rows and columns
2. What are the three main components of MongoDB's data structure?
  > Answer: Databases, Collections, and Documents
3. Which MongoDB command is used to insert a single document?
  > Answer: insertOne()
4. What does BSON stand for?
  > Answer: Binary JSON

---

## Review ##

- What is MongoDB and how does it differ from SQL databases?
- What are the main components of MongoDB's data structure (databases, collections, documents)?
- How do you perform basic CRUD operations in MongoDB shell?
- What are the advantages of using a document-based database for web applications?
- How do you connect a Node.js application to MongoDB?
- What design considerations are important when structuring documents in MongoDB?