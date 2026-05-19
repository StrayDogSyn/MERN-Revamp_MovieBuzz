# Week 12 - Mongoose & READ Functionality #

- [Week 12 - Mongoose & READ Functionality](#week-12---mongoose--read-functionality)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [What is Mongoose?](#what-is-mongoose)
  - [Installing and Setting Up Mongoose](#installing-and-setting-up-mongoose)
  - [Creating Mongoose Schemas](#creating-mongoose-schemas)
  - [Understanding Mongoose Models](#understanding-mongoose-models)
  - [Implementing READ Operations](#implementing-read-operations)
    - [Finding All Movies](#finding-all-movies)
    - [Finding Single Movies](#finding-single-movies)
    - [Advanced Query Methods](#advanced-query-methods)
  - [Updating Express Controllers](#updating-express-controllers)
  - [Testing READ Functionality](#testing-read-functionality)
  - [Error Handling with Mongoose](#error-handling-with-mongoose)
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

- Explain what Mongoose is and its advantages over the native MongoDB driver
- Install and configure Mongoose in a Node.js application
- Create and understand Mongoose schemas and models
- Implement READ operations using Mongoose methods
- Build API endpoints that retrieve data from MongoDB using Mongoose
- Handle errors properly in Mongoose operations
- Use advanced Mongoose query methods for filtering and searching
- Connect their React frontend to the new Mongoose-powered backend

---

## Glossary ##

- `Mongoose`: An Object Document Mapper (ODM) for MongoDB and Node.js
- `Schema`: A structure that defines the shape of documents within a collection
- `Model`: A constructor function created from a schema that creates and reads documents
- `ODM`: Object Document Mapper - translates between objects in code and documents in database
- `Validation`: Rules that ensure data meets certain criteria before being saved
- `Middleware`: Functions that run at specific stages of the Mongoose lifecycle
- `Population`: Method to reference documents in other collections
- `Query`: A Mongoose object that allows you to search for documents

---

## Starting Point ##

Before we begin this lesson, make sure you have completed Week 11 and have:

- MongoDB installed and running on your system
- A Movie Buzz database with sample movie documents
- Express API server with basic MongoDB connection
- React frontend that can consume API endpoints

Your project structure should look like:
```
movie-buzz-backend/
├── config/
│   └── database.js
├── controllers/
│   └── movieController.js
├── models/
│   └── Movie.js
├── routes/
│   └── movieRoutes.js
├── data/
│   └── movies.json
├── server.js
└── package.json
```

---

## Simple Mongoose Examples - Building Understanding

Before implementing Movie Buzz with Mongoose, let's understand schemas and models with simple examples:

### Example 1: Creating Your First Schema

Create `simple-schema.js`:

```javascript
const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/practice_db');

// Define a simple schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  age: {
    type: Number,
    min: 0,
    max: 120
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [String],  // Array of strings
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a model
const User = mongoose.model('User', userSchema);

// Export for use in other files
module.exports = User;
```

### Example 2: Basic CRUD with Mongoose

Create `mongoose-crud.js`:

```javascript
const mongoose = require('mongoose');

// Simple schema
const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pages: { type: Number, min: 1 },
  genre: [String],
  published: Date,
  rating: { type: Number, min: 1, max: 5 }
});

const Book = mongoose.model('Book', bookSchema);

async function demonstrateCRUD() {
  try {
    // Connect
    await mongoose.connect('mongodb://127.0.0.1:27017/book_db');
    console.log('Connected to MongoDB');

    // CREATE - Add a new book
    const newBook = new Book({
      title: 'JavaScript Guide',
      author: 'Jane Doe',
      pages: 400,
      genre: ['Programming', 'Education'],
      published: new Date('2023-01-01'),
      rating: 4.5
    });

    const savedBook = await newBook.save();
    console.log('Created book:', savedBook);

    // READ - Find books
    const allBooks = await Book.find();
    console.log('All books:', allBooks);

    const programmingBooks = await Book.find({ genre: 'Programming' });
    console.log('Programming books:', programmingBooks);

    const oneBook = await Book.findOne({ title: 'JavaScript Guide' });
    console.log('Found book:', oneBook);

    // More complex queries
    const highRatedBooks = await Book.find({ rating: { $gte: 4 } });
    console.log('High rated books:', highRatedBooks);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

// Run the demonstration
demonstrateCRUD();
```

### Example 3: Schema Validation and Error Handling

Create `validation-example.js`:

```javascript
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  price: {
    type: Number,
    required: [true, 'Price is required'],
    min: [0, 'Price cannot be negative']
  },
  category: {
    type: String,
    required: true,
    enum: {
      values: ['Electronics', 'Clothing', 'Books', 'Sports'],
      message: 'Category must be Electronics, Clothing, Books, or Sports'
    }
  },
  inStock: {
    type: Boolean,
    default: true
  }
});

const Product = mongoose.model('Product', productSchema);

async function testValidation() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/validation_db');

    // Valid product
    const validProduct = new Product({
      name: 'Gaming Laptop',
      price: 999.99,
      category: 'Electronics'
    });

    const saved = await validProduct.save();
    console.log('Valid product saved:', saved);

    // Invalid product (will cause validation errors)
    const invalidProduct = new Product({
      name: '',  // Required field missing
      price: -50,  // Negative price
      category: 'InvalidCategory'  // Not in enum
    });

    await invalidProduct.save();

  } catch (error) {
    console.log('Validation errors:');
    if (error.errors) {
      Object.keys(error.errors).forEach(key => {
        console.log(`${key}: ${error.errors[key].message}`);
      });
    }
  } finally {
    mongoose.connection.close();
  }
}

testValidation();
```

### Example 4: Advanced Queries and Methods

Create `advanced-queries.js`:

```javascript
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  grade: String,
  subjects: [String],
  gpa: Number,
  graduationYear: Number
});

// Add custom methods to schema
studentSchema.methods.getFullInfo = function() {
  return `${this.name} - Grade: ${this.grade}, GPA: ${this.gpa}`;
};

// Add static methods to schema
studentSchema.statics.findByGrade = function(grade) {
  return this.find({ grade: grade });
};

const Student = mongoose.model('Student', studentSchema);

async function demonstrateQueries() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/school_db');

    // Insert sample data
    await Student.deleteMany({}); // Clear existing data

    const students = [
      { name: 'Alice', grade: 'A', subjects: ['Math', 'Science'], gpa: 3.8, graduationYear: 2024 },
      { name: 'Bob', grade: 'B', subjects: ['History', 'English'], gpa: 3.2, graduationYear: 2024 },
      { name: 'Carol', grade: 'A', subjects: ['Math', 'Physics'], gpa: 3.9, graduationYear: 2025 }
    ];

    await Student.insertMany(students);

    // Various query methods
    console.log('--- All Students ---');
    const all = await Student.find();
    all.forEach(student => console.log(student.getFullInfo()));

    console.log('\n--- A Grade Students ---');
    const aGradeStudents = await Student.findByGrade('A');
    console.log(aGradeStudents);

    console.log('\n--- Math Students ---');
    const mathStudents = await Student.find({ subjects: 'Math' });
    console.log(mathStudents);

    console.log('\n--- High GPA Students ---');
    const highGPA = await Student.find({ gpa: { $gte: 3.5 } });
    console.log(highGPA);

    console.log('\n--- Sorted by GPA ---');
    const sorted = await Student.find().sort({ gpa: -1 }); // -1 for descending
    console.log(sorted);

    console.log('\n--- Limited Results ---');
    const limited = await Student.find().limit(2);
    console.log(limited);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

demonstrateQueries();
```

> `Try It Out`
> Create and run these Mongoose examples to understand:
> - Schema definition with validation rules
> - Model creation and basic CRUD operations
> - Error handling and validation messages
> - Advanced querying with conditions and sorting
> - Custom methods on schemas
> - Working with arrays and embedded data

## What is Mongoose? ##

Now that you've seen Mongoose in action, let's understand why it's so valuable. Mongoose is an Object Document Mapper (ODM) for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data.

**Key Benefits of Mongoose:**

1. **Schema Validation**: Define structure and validate data before saving
2. **Type Casting**: Automatically converts data to correct types
3. **Query Building**: Provides a rich API for building database queries
4. **Middleware Support**: Pre and post hooks for database operations
5. **Population**: Easy way to reference documents in other collections
6. **Built-in Validation**: Email validation, required fields, custom validators
7. **Better Error Handling**: More descriptive error messages

**Mongoose vs Native MongoDB Driver:**

| Feature | Native Driver | Mongoose |
|---------|---------------|----------|
| Schema | No schema enforcement | Schema-based with validation |
| Queries | Manual query building | Rich query API |
| Type Safety | Manual type checking | Automatic type casting |
| Validation | Manual validation | Built-in validators |
| Relationships | Manual references | Population support |

> `Consider This`  
> How might having a defined schema help prevent bugs in your application, even though MongoDB itself is schema-less?

---

## Installing and Setting Up Mongoose ##

First, let's install Mongoose in our project:

```bash
cd movie-buzz-backend
npm install mongoose
```

Now, let's update our database connection to use Mongoose. Replace your `config/database.js` file:

```javascript
const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/movie-buzz';

const connectToDatabase = async () => {
  try {
    const connection = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`🍃 MongoDB connected: ${connection.connection.host}`);
    return connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

// Handle connection events
mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
});

mongoose.connection.on('error', (error) => {
  console.error('Mongoose connection error:', error);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
});

// Handle process termination
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('Mongoose connection closed through app termination');
  process.exit(0);
});

module.exports = connectToDatabase;
```

Update your `server.js` to use the new connection:

```javascript
const express = require('express');
const cors = require('cors');
const connectToDatabase = require('./config/database');
const movieRoutes = require('./routes/movieRoutes');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Movie Buzz API',
    version: '2.0.0',
    database: 'MongoDB with Mongoose',
    endpoints: [
      'GET /api/movies - Get all movies',
      'GET /api/movies/:id - Get movie by ID',
      'POST /api/movies - Create new movie',
      'PUT /api/movies/:id - Update movie',
      'DELETE /api/movies/:id - Delete movie'
    ]
  });
});

// API routes
app.use('/api/movies', movieRoutes);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Connect to database and start server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🎬 Movie Buzz API running on http://localhost:${PORT}`);
  });
});
```

---

## Creating Mongoose Schemas ##

A Mongoose schema defines the structure of documents in a collection. Let's create a comprehensive schema for our movies.

Replace your `models/Movie.js` file with a Mongoose model:

```javascript
const mongoose = require('mongoose');

// Define the movie schema
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Movie name is required'],
    trim: true,
    maxlength: [200, 'Movie name cannot exceed 200 characters']
  },
  year: {
    type: Number,
    required: [true, 'Release year is required'],
    min: [1800, 'Year must be after 1800'],
    max: [new Date().getFullYear() + 5, 'Year cannot be more than 5 years in the future']
  },
  rating: {
    type: String,
    required: [true, 'Rating is required'],
    enum: {
      values: ['G', 'PG', 'PG-13', 'R', 'NC-17', 'NR'],
      message: 'Rating must be G, PG, PG-13, R, NC-17, or NR'
    }
  },
  length: {
    type: String,
    required: [true, 'Movie length is required'],
    validate: {
      validator: function(v) {
        return /^\d+\s+minutes?$/.test(v);
      },
      message: 'Length must be in format "120 minutes"'
    }
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters'],
    maxlength: [1000, 'Description cannot exceed 1000 characters']
  },
  genre: [{
    type: String,
    required: true,
    trim: true
  }],
  director: {
    type: String,
    required: [true, 'Director is required'],
    trim: true,
    maxlength: [100, 'Director name cannot exceed 100 characters']
  },
  stars: [{
    type: String,
    trim: true,
    maxlength: [100, 'Actor name cannot exceed 100 characters']
  }],
  poster: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/i.test(v);
      },
      message: 'Poster must be a valid image URL'
    }
  },
  boxOffice: {
    type: String,
    validate: {
      validator: function(v) {
        return !v || /^\$[\d,]+(\.\d{1,2})?\s*(million|billion)?$/i.test(v);
      },
      message: 'Box office must be in format "$123.45 million"'
    }
  },
  awards: {
    oscars: {
      type: Number,
      min: 0,
      default: 0
    },
    nominations: {
      type: Number,
      min: 0,
      default: 0
    }
  }
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual for movie age
movieSchema.virtual('age').get(function() {
  const currentYear = new Date().getFullYear();
  return currentYear - this.year;
});

// Virtual for full movie info
movieSchema.virtual('fullInfo').get(function() {
  return `${this.name} (${this.year}) - Directed by ${this.director}`;
});

// Instance method to check if movie is classic (over 25 years old)
movieSchema.methods.isClassic = function() {
  return this.age > 25;
};

// Static method to find movies by genre
movieSchema.statics.findByGenre = function(genre) {
  return this.find({ genre: { $in: [genre] } });
};

// Static method to find recent movies
movieSchema.statics.findRecent = function(years = 5) {
  const cutoffYear = new Date().getFullYear() - years;
  return this.find({ year: { $gte: cutoffYear } });
};

// Pre-save middleware to capitalize first letter of genre
movieSchema.pre('save', function(next) {
  if (this.genre && Array.isArray(this.genre)) {
    this.genre = this.genre.map(g => 
      g.charAt(0).toUpperCase() + g.slice(1).toLowerCase()
    );
  }
  next();
});

// Create and export the model
const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
```

---

## Understanding Mongoose Models ##

A Mongoose model is a constructor function created from a schema. It provides an interface to interact with a specific MongoDB collection.

**Key Features of Our Movie Model:**

1. **Validation**: Built-in validation for required fields, data types, and custom rules
2. **Virtuals**: Computed properties that don't get stored in MongoDB
3. **Instance Methods**: Methods available on individual documents
4. **Static Methods**: Methods available on the model itself
5. **Middleware**: Functions that run before or after certain operations
6. **Timestamps**: Automatic createdAt and updatedAt fields

**Example Usage:**

```javascript
// Create a new movie instance
const movie = new Movie({
  name: "The Matrix",
  year: 1999,
  rating: "R",
  // ... other fields
});

// Use instance method
console.log(movie.isClassic()); // true or false

// Use virtual property
console.log(movie.age); // Current year - 1999
console.log(movie.fullInfo); // "The Matrix (1999) - Directed by The Wachowskis"

// Use static method
const actionMovies = await Movie.findByGenre('Action');
const recentMovies = await Movie.findRecent(10);
```

---

## Implementing READ Operations ##

Now let's implement READ operations using Mongoose. This is the "R" in CRUD.

### Finding All Movies ###

```javascript
// Basic find all
const movies = await Movie.find();

// Find all with specific fields only
const movies = await Movie.find({}, 'name year director rating');

// Find all sorted by year (newest first)
const movies = await Movie.find().sort({ year: -1 });

// Find all with pagination
const movies = await Movie.find()
  .skip(10)        // Skip first 10 results
  .limit(5)        // Return only 5 results
  .sort({ name: 1 }); // Sort alphabetically

// Find all with population (we'll cover this more later)
const movies = await Movie.find().select('name year director');
```

### Finding Single Movies ###

```javascript
// Find by ID
const movie = await Movie.findById('507f1f77bcf86cd799439011');

// Find one by condition
const movie = await Movie.findOne({ name: 'The Matrix' });

// Find one with multiple conditions
const movie = await Movie.findOne({ 
  year: 1999, 
  director: 'The Wachowskis' 
});
```

### Advanced Query Methods ###

```javascript
// Find movies by genre
const actionMovies = await Movie.find({ 
  genre: { $in: ['Action'] } 
});

// Find movies within year range
const nineties = await Movie.find({ 
  year: { $gte: 1990, $lte: 1999 } 
});

// Find movies with text search
const matrixMovies = await Movie.find({
  name: { $regex: 'Matrix', $options: 'i' }
});

// Find movies with complex conditions
const epicMovies = await Movie.find({
  $and: [
    { year: { $gte: 2000 } },
    { 'awards.oscars': { $gte: 3 } },
    { genre: { $in: ['Action', 'Adventure'] } }
  ]
});

// Count documents
const totalMovies = await Movie.countDocuments();
const actionCount = await Movie.countDocuments({ genre: 'Action' });
```

---

## Updating Express Controllers ##

Now let's update our Express controllers to use Mongoose instead of file operations.

Update your `controllers/movieController.js`:

```javascript
const Movie = require('../models/Movie');

// Get all movies
const getAllMovies = async (req, res) => {
  try {
    // Extract query parameters for filtering and pagination
    const { 
      page = 1, 
      limit = 10, 
      sortBy = 'year', 
      sortOrder = 'desc',
      genre,
      year,
      rating,
      search
    } = req.query;

    // Build query object
    let query = {};
    
    if (genre) {
      query.genre = { $in: [genre] };
    }
    
    if (year) {
      query.year = parseInt(year);
    }
    
    if (rating) {
      query.rating = rating;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { director: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    // Execute query with pagination and sorting
    const movies = await Movie.find(query)
      .sort({ [sortBy]: sortOrder === 'desc' ? -1 : 1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    // Get total count for pagination info
    const totalCount = await Movie.countDocuments(query);
    const totalPages = Math.ceil(totalCount / limit);

    res.json({
      success: true,
      data: movies,
      pagination: {
        currentPage: parseInt(page),
        totalPages,
        totalCount,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      }
    });
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve movies',
      details: error.message
    });
  }
};

// Get single movie by ID
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid movie ID format'
      });
    }

    const movie = await Movie.findById(id);
    
    if (!movie) {
      return res.status(404).json({
        success: false,
        error: 'Movie not found'
      });
    }
    
    res.json({
      success: true,
      data: movie
    });
  } catch (error) {
    console.error('Error fetching movie:', error);
    
    // Handle specific Mongoose errors
    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid movie ID format'
      });
    }
    
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve movie',
      details: error.message
    });
  }
};

// Get movies by genre
const getMoviesByGenre = async (req, res) => {
  try {
    const { genre } = req.params;
    
    const movies = await Movie.findByGenre(genre);
    
    res.json({
      success: true,
      data: movies,
      count: movies.length,
      genre: genre
    });
  } catch (error) {
    console.error('Error fetching movies by genre:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve movies by genre',
      details: error.message
    });
  }
};

// Get recent movies
const getRecentMovies = async (req, res) => {
  try {
    const { years = 5 } = req.query;
    
    const movies = await Movie.findRecent(parseInt(years));
    
    res.json({
      success: true,
      data: movies,
      count: movies.length,
      yearsBack: parseInt(years)
    });
  } catch (error) {
    console.error('Error fetching recent movies:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to retrieve recent movies',
      details: error.message
    });
  }
};

// Placeholder functions for other CRUD operations (we'll implement these in coming weeks)
const createMovie = (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Create functionality not yet implemented'
  });
};

const updateMovie = (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Update functionality not yet implemented'
  });
};

const deleteMovie = (req, res) => {
  res.status(501).json({
    success: false,
    error: 'Delete functionality not yet implemented'
  });
};

module.exports = {
  getAllMovies,
  getMovieById,
  getMoviesByGenre,
  getRecentMovies,
  createMovie,
  updateMovie,
  deleteMovie
};
```

Update your routes to include the new endpoints in `routes/movieRoutes.js`:

```javascript
const express = require('express');
const {
  getAllMovies,
  getMovieById,
  getMoviesByGenre,
  getRecentMovies,
  createMovie,
  updateMovie,
  deleteMovie
} = require('../controllers/movieController');

const router = express.Router();

// READ routes
router.get('/', getAllMovies);                    // GET /api/movies
router.get('/genre/:genre', getMoviesByGenre);    // GET /api/movies/genre/Action
router.get('/recent', getRecentMovies);           // GET /api/movies/recent
router.get('/:id', getMovieById);                 // GET /api/movies/:id

// Other CRUD routes (placeholders for now)
router.post('/', createMovie);                    // POST /api/movies
router.put('/:id', updateMovie);                  // PUT /api/movies/:id
router.delete('/:id', deleteMovie);               // DELETE /api/movies/:id

module.exports = router;
```

---

## Testing READ Functionality ##

Let's test our new Mongoose-powered READ operations:

### Using Browser ###

- `http://localhost:4000/api/movies` - Get all movies
- `http://localhost:4000/api/movies?page=1&limit=5` - Paginated results
- `http://localhost:4000/api/movies?genre=Action` - Filter by genre
- `http://localhost:4000/api/movies?search=Matrix` - Search movies
- `http://localhost:4000/api/movies/genre/Action` - Movies by genre
- `http://localhost:4000/api/movies/recent?years=10` - Recent movies

### Using curl ###

```bash
# Get all movies with pagination
curl "http://localhost:4000/api/movies?page=1&limit=3"

# Search movies
curl "http://localhost:4000/api/movies?search=Matrix"

# Get movies by genre
curl "http://localhost:4000/api/movies/genre/Action"

# Get recent movies
curl "http://localhost:4000/api/movies/recent?years=5"

# Get specific movie by ID (replace with actual ID)
curl "http://localhost:4000/api/movies/507f1f77bcf86cd799439011"
```

### Testing with Your React Frontend ###

Your React frontend should continue to work with the new API, but now with enhanced features:

```javascript
// In your React App.js, you can now use additional query parameters
const fetchMovies = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const url = queryString ? 
      `${API_BASE_URL}/movies?${queryString}` : 
      `${API_BASE_URL}/movies`;
    
    const response = await fetch(url);
    const result = await response.json();
    
    if (result.success) {
      setMovies(result.data);
      setPagination(result.pagination); // If you want to implement pagination
    }
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};

// Example usage
fetchMovies({ search: 'Matrix', limit: 10 });
fetchMovies({ genre: 'Action', sortBy: 'year' });
```

---

## Error Handling with Mongoose ##

Mongoose provides detailed error information. Here are common error types and how to handle them:

```javascript
// In your controller functions
try {
  const movie = await Movie.findById(id);
} catch (error) {
  console.error('Error details:', error);
  
  // Handle specific Mongoose error types
  if (error.name === 'CastError') {
    // Invalid ObjectId format
    return res.status(400).json({
      success: false,
      error: 'Invalid ID format'
    });
  }
  
  if (error.name === 'ValidationError') {
    // Schema validation failed
    const errors = Object.values(error.errors).map(e => e.message);
    return res.status(400).json({
      success: false,
      error: 'Validation failed',
      details: errors
    });
  }
  
  // Generic server error
  res.status(500).json({
    success: false,
    error: 'Internal server error',
    details: error.message
  });
}
```

---

## Final Thoughts ##

We've successfully implemented READ functionality using Mongoose! Our Movie Buzz API now features:

- **Structured Data**: Mongoose schemas provide validation and consistency
- **Advanced Queries**: Filtering, sorting, pagination, and search capabilities
- **Better Error Handling**: Descriptive error messages and proper status codes
- **Rich API**: Multiple endpoints for different use cases
- **Type Safety**: Automatic type casting and validation

The READ operations are now production-ready with features like:
- Pagination for large datasets
- Search across multiple fields
- Genre-based filtering
- Recent movies endpoint
- Comprehensive error handling

Next week, we'll implement CREATE functionality, allowing users to add new movies through our API.

> `Consider This`  
> How do the validation rules in our Mongoose schema help ensure data quality? What happens when invalid data is submitted?

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

---

## Review ##

- What is Mongoose and what advantages does it provide over the native MongoDB driver?
- How do schemas help structure and validate data in MongoDB?
- What are the different ways to query documents using Mongoose?
- How do you implement pagination and sorting in Mongoose queries?
- What are virtuals and when would you use them?
- How do you handle different types of errors in Mongoose operations?