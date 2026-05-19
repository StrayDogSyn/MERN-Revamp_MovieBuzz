# Week 12 - Mongoose & READ Functionality #

- [Week 12 - Mongoose & READ Functionality](#week-12---mongoose--read-functionality)
  - [Reminder](#reminder)
  - [Background](#background)
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

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students have been introduced to MongoDB in Week 9 and understand basic database concepts, collections, and documents. This week introduces Mongoose as an ODM (Object Document Mapper) that provides structure and validation to their MongoDB operations. Students will transition from raw MongoDB operations to using Mongoose schemas and models. This week focuses specifically on READ operations, the first step in building professional-grade database applications.

**Key Transition**: Students move from loose, unstructured database operations to schema-based, validated operations with better error handling.

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

Students should have completed Week 9 with:
- MongoDB installed and running
- Movie Buzz database with sample documents
- Basic Express API with raw MongoDB connections
- Understanding of collections and documents

**Pre-class Setup**: Verify all students have MongoDB running and can connect to their database with sample data.

**Common Student Issues**: 
- MongoDB not running
- Connection string problems
- Missing sample data from Week 9

---

## What is Mongoose? ##

**Teaching Strategy**: Start with the problems Mongoose solves, then introduce the solution.

**Present the Problems First**:
- Raw MongoDB operations are verbose and error-prone
- No built-in validation or type checking
- Manual error handling for every operation
- Difficult to maintain consistent data structure
- No built-in relationships between collections

**Then Introduce Mongoose as the Solution**:

Mongoose is an Object Document Mapper (ODM) for MongoDB and Node.js. It provides a straightforward, schema-based solution to model your application data.

**Key Benefits** (write these on the board):
1. **Schema Validation**: Define structure and validate data before saving
2. **Type Casting**: Automatically converts data to correct types
3. **Query Building**: Rich API for building database queries
4. **Middleware Support**: Pre and post hooks for database operations
5. **Population**: Easy way to reference documents in other collections
6. **Built-in Validation**: Email validation, required fields, custom validators
7. **Better Error Handling**: More descriptive error messages

**Visual Comparison Table**:

| Feature | Native Driver | Mongoose |
|---------|---------------|----------|
| Schema | No schema enforcement | Schema-based with validation |
| Queries | Manual query building | Rich query API |
| Type Safety | Manual type checking | Automatic type casting |
| Validation | Manual validation | Built-in validators |
| Relationships | Manual references | Population support |

> `Consider This`  
> How might having a defined schema help prevent bugs in your application, even though MongoDB itself is schema-less?
>> Expect: Prevents data inconsistency, catches errors early, ensures required fields, validates data types, makes debugging easier.

**Teaching Analogy**: Think of Mongoose like TypeScript for databases - it adds structure and safety to what would otherwise be loosely typed operations.

---

## Installing and Setting Up Mongoose ##

**Important Setup Section**: Take time to ensure all students get this right.

Install Mongoose:

```bash
cd movie-buzz-backend
npm install mongoose
```

**Teaching Strategy**: Replace the existing database connection step by step, explaining each change.

Update `config/database.js`:

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

**Key Teaching Points**:
- **Connection Options**: `useNewUrlParser` and `useUnifiedTopology` prevent deprecation warnings
- **Event Handlers**: Monitor connection status
- **Graceful Shutdown**: Properly close database connection on app termination
- **Environment Variables**: Use `process.env.MONGODB_URI` for production flexibility

**Update server.js**:

**Teaching Note**: Show the differences from the previous week's setup.

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

**Test Connection**: Have students start their server and verify the connection messages appear.

---

## Creating Mongoose Schemas ##

**Critical Conceptual Section**: Students need to understand schemas as the foundation of Mongoose.

**Teaching Strategy**: Build the schema incrementally, explaining each part as you go.

**Start with Basic Schema Structure**:

```javascript
const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  // We'll add fields here
});
```

**Add Basic Fields**:

```javascript
const movieSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true
  }
});
```

**Then Build the Complete Schema** (in `models/Movie.js`):

**Teaching Strategy**: Explain each validation rule as you add it. This is the complete schema, but build it section by section.

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

**Key Teaching Points for Each Section**:

1. **Basic Validation**: `required`, `type`
2. **String Validation**: `trim`, `minlength`, `maxlength`, `enum`
3. **Number Validation**: `min`, `max`
4. **Custom Validation**: `validate` with custom functions
5. **Arrays**: `[String]` for arrays of strings
6. **Nested Objects**: `awards` object with sub-fields
7. **Schema Options**: `timestamps`, `toJSON`, `toObject`
8. **Virtuals**: Computed properties that don't get stored
9. **Methods**: Instance and static methods
10. **Middleware**: Pre-save hooks

**Common Student Confusion**:
- **Required vs Optional**: Explain when to make fields required
- **Validation Messages**: Show how custom error messages help users
- **Arrays**: Demonstrate how `[String]` creates an array of strings
- **Virtuals**: Explain why these don't get stored in the database

---

## Understanding Mongoose Models ##

**Teaching Focus**: Models are the interface between your code and the database.

A Mongoose model is a constructor function created from a schema. It provides an interface to interact with a specific MongoDB collection.

**Demonstrate Model Usage**:

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

**Key Concepts to Emphasize**:
1. **Instance Methods**: Available on individual documents
2. **Static Methods**: Available on the model itself
3. **Virtuals**: Computed properties
4. **Validation**: Happens automatically when saving

---

## Implementing READ Operations ##

**Core Focus**: This is the "R" in CRUD. Build query complexity gradually.

### Finding All Movies ###

**Start Simple, Build Complexity**:

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
```

**Teaching Points**:
- **Method Chaining**: Mongoose queries can be chained
- **Projection**: Second parameter selects specific fields
- **Sorting**: 1 for ascending, -1 for descending
- **Pagination**: `skip()` and `limit()` for large datasets

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

**Teaching Points**:
- **findById()**: Specific method for MongoDB ObjectIds
- **findOne()**: Returns first match or null
- **Multiple Conditions**: Object with multiple key-value pairs

### Advanced Query Methods ###

**Gradually Introduce Query Operators**:

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

// Count documents
const totalMovies = await Movie.countDocuments();
const actionCount = await Movie.countDocuments({ genre: 'Action' });
```

**Key Query Operators to Teach**:
- `$in`: Value in array
- `$gte`, `$lte`: Greater/less than or equal
- `$regex`: Regular expression matching
- `$and`, `$or`: Logical operators

---

## Updating Express Controllers ##

**Major Refactoring Section**: Replace file operations with Mongoose operations.

**Teaching Strategy**: Go through the controller methods one by one, showing the before and after.

Update `controllers/movieController.js`:

**Focus on getAllMovies first** (most complex):

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
```

**Key Teaching Points**:
1. **Query Building**: Dynamically build query based on parameters
2. **Pagination Math**: Calculate skip, limit, and total pages
3. **Search Logic**: Use `$or` to search multiple fields
4. **Error Handling**: Proper try-catch with detailed error messages

**Then getMovieById** (simpler but important for error handling):

```javascript
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
```

**Key Teaching Points**:
1. **ID Validation**: Check ObjectId format before querying
2. **404 Handling**: Check if document exists
3. **Specific Error Types**: Handle `CastError` for invalid IDs

**Add New Endpoint Methods**:

```javascript
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
```

**Update Routes** in `routes/movieRoutes.js`:

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

**Important Routing Note**: Order matters! More specific routes (like `/recent`) must come before parameter routes (like `/:id`).

---

## Testing READ Functionality ##

**Hands-on Testing Section**: Students should test each endpoint.

### Using Browser ###

**Have Students Test These URLs**:
- `http://localhost:4000/api/movies` - Get all movies
- `http://localhost:4000/api/movies?page=1&limit=5` - Paginated results
- `http://localhost:4000/api/movies?genre=Action` - Filter by genre
- `http://localhost:4000/api/movies?search=Matrix` - Search movies
- `http://localhost:4000/api/movies/genre/Action` - Movies by genre
- `http://localhost:4000/api/movies/recent?years=10` - Recent movies

### Using curl ###

**Demonstrate These Commands**:

```bash
# Get all movies with pagination
curl "http://localhost:4000/api/movies?page=1&limit=3"

# Search movies
curl "http://localhost:4000/api/movies?search=Matrix"

# Get movies by genre
curl "http://localhost:4000/api/movies/genre/Action"

# Get recent movies
curl "http://localhost:4000/api/movies/recent?years=5"
```

### Testing with React Frontend ###

**Show Enhanced API Usage**:

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

**Teaching Point**: The React frontend can now take advantage of advanced query features.

---

## Error Handling with Mongoose ##

**Professional Development Practice**: Proper error handling is crucial.

**Common Mongoose Error Types**:

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

**Key Error Types to Teach**:
1. **CastError**: Invalid ObjectId format
2. **ValidationError**: Schema validation failed
3. **DocumentNotFound**: No document matches query
4. **MongoError**: Database-level errors

---

## Final Thoughts ##

**Major Achievement Celebration**: Students have implemented professional-grade database operations!

We've successfully implemented READ functionality using Mongoose! Our Movie Buzz API now features:

- **Structured Data**: Mongoose schemas provide validation and consistency
- **Advanced Queries**: Filtering, sorting, pagination, and search capabilities
- **Better Error Handling**: Descriptive error messages and proper status codes
- **Rich API**: Multiple endpoints for different use cases
- **Type Safety**: Automatic type casting and validation

**Industry Relevance**: Emphasize that they're now using production-grade patterns used by major companies.

The READ operations are now production-ready with features like:
- Pagination for large datasets
- Search across multiple fields
- Genre-based filtering
- Recent movies endpoint
- Comprehensive error handling

**Next Week Preview**: We'll implement CREATE functionality, allowing users to add new movies with full validation.

> `Consider This`  
> How do the validation rules in our Mongoose schema help ensure data quality? What happens when invalid data is submitted?
>> Expect: Validation prevents bad data from entering the database, provides clear error messages to users, maintains data consistency, reduces debugging time.

**Preparation for Next Week**: Students should have all READ endpoints working and tested.

---

## Exit Ticket ##

Access code: mesh23

Instruct students to open the exit ticket for this week in the LMS. You may read through the questions with the students, but do not give the students the answers to the questions. Once all students have answered the questions, you may ask students for the correct answer.

1. What is the main advantage of using Mongoose over the native MongoDB driver?
  > Answer: Mongoose provides schema validation, type casting, and better error handling
2. What does ODM stand for?
  > Answer: Object Document Mapper
3. What Mongoose method would you use to find all documents in a collection?
  > Answer: find()
4. What are virtuals in Mongoose?
  > Answer: Computed properties that don't get stored in the database

---

## Review ##

- What is Mongoose and what advantages does it provide over the native MongoDB driver?
- How do schemas help structure and validate data in MongoDB?
- What are the different ways to query documents using Mongoose?
- How do you implement pagination and sorting in Mongoose queries?
- What are virtuals and when would you use them?
- How do you handle different types of errors in Mongoose operations?