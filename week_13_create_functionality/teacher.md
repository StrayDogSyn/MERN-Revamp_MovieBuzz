# Week 13 - CREATE Functionality #

- [Week 13 - CREATE Functionality](#week-13---create-functionality)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Starting Point](#starting-point)
  - [Understanding CREATE Operations](#understanding-create-operations)
  - [Implementing CREATE with Mongoose](#implementing-create-with-mongoose)
    - [Basic Document Creation](#basic-document-creation)
    - [Handling Validation Errors](#handling-validation-errors)
    - [Advanced Creation Patterns](#advanced-creation-patterns)
  - [Building CREATE API Endpoints](#building-create-api-endpoints)
  - [Frontend Integration](#frontend-integration)
  - [Data Validation and Sanitization](#data-validation-and-sanitization)
  - [Testing CREATE Operations](#testing-create-operations)
  - [Error Handling Best Practices](#error-handling-best-practices)
  - [Security Considerations](#security-considerations)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students have completed Mongoose setup and READ operations in Week 10. They understand schemas, validation, and querying. This week focuses specifically on CREATE operations - the "C" in CRUD. Students will learn to add new data to their database with proper validation, error handling, and security measures. This builds on their schema knowledge to implement robust data creation patterns used in production applications.

**Key Focus**: Professional-grade CREATE operations with validation, sanitization, and comprehensive error handling.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Implement CREATE operations using Mongoose models and methods
- Build robust API endpoints for creating new movies
- Handle data validation and provide meaningful error messages
- Implement proper data sanitization and security measures
- Connect React frontend to CREATE endpoints with error handling
- Use Mongoose middleware for data processing during creation
- Test CREATE functionality thoroughly using various methods
- Apply best practices for handling user input and data creation

---

## Glossary ##

- `CREATE Operation`: The "C" in CRUD - adding new data to the database
- `Data Validation`: Checking that data meets specified criteria before saving
- `Data Sanitization`: Cleaning and formatting data to prevent security issues
- `Middleware`: Functions that run during the document lifecycle (pre/post save)
- `Duplicate Key Error`: Error when trying to create a document with a unique field that already exists
- `Request Body`: Data sent from client to server in POST requests
- `Status Code 201`: HTTP status indicating successful resource creation
- `Idempotent`: Operations that produce the same result when repeated

---

## Starting Point ##

Students should have completed Week 10 with:
- Functional Mongoose setup with Movie schema
- Working READ operations with validation
- React frontend that can display movies
- Understanding of error handling patterns

**Pre-class Verification**: Ensure all students can successfully GET movies from their API before adding CREATE functionality.

**Common Student Issues**: 
- Schema validation confusion
- HTTP status code misunderstanding
- Frontend-backend data format mismatches

---

## Understanding CREATE Operations ##

**Teaching Strategy**: Start with the big picture, then dive into implementation details.

**Present the Core Concepts**:

CREATE operations are responsible for adding new data to your database. In the context of our Movie Buzz application, this means allowing users to add new movies to our collection.

**Key Principles** (write on board):
1. **Data Validation**: Ensure incoming data meets schema requirements
2. **Data Sanitization**: Clean and format data before saving
3. **Error Handling**: Provide clear feedback when creation fails
4. **Security**: Prevent malicious data from entering the system
5. **Consistency**: Maintain data integrity across the application
6. **User Feedback**: Inform users of success or failure

**Teaching Analogy**: Think of CREATE operations like a quality control checkpoint in a factory - every piece of data must pass inspection before it's allowed into storage.

**CREATE vs Other Operations Table**:
- **READ**: Retrieves existing data (no data modification)
- **CREATE**: Adds new data (modifies database by adding)
- **UPDATE**: Modifies existing data (changes existing records)
- **DELETE**: Removes existing data (modifies database by removing)

> `Consider This`  
> Why is validation especially important for CREATE operations compared to read operations? What could go wrong if we don't validate data properly?
>> Expect: Bad data corrupts the database, security vulnerabilities, application crashes, inconsistent data structure, difficult debugging.

**Visual Flow Diagram** (draw on board):
```
User Input → Validation → Sanitization → CREATE → Success/Error Response
```

---

## Implementing CREATE with Mongoose ##

**Teaching Focus**: Show multiple patterns, explain when to use each.

### Basic Document Creation ###

**Start with Simple Examples**:

```javascript
// Method 1: Create instance and save
const movie = new Movie({
  name: "The Godfather",
  year: 1972,
  rating: "R",
  // ... other fields
});

const savedMovie = await movie.save();

// Method 2: Direct creation with Model.create()
const movie = await Movie.create({
  name: "The Godfather",
  year: 1972,
  rating: "R",
  // ... other fields
});

// Method 3: Insert multiple documents
const movies = await Movie.insertMany([
  { name: "Movie 1", year: 2021 },
  { name: "Movie 2", year: 2022 }
]);
```

**When to Use Each Method** (important for students to understand):
- **new + save()**: When you need to perform operations before saving
- **create()**: Most common for single document creation (recommended)
- **insertMany()**: For bulk creation (less common in web APIs)

**Demonstrate Live**: Create a simple movie using each method to show the differences.

### Handling Validation Errors ###

**Critical Concept**: Students must understand how Mongoose validation works.

```javascript
try {
  const movie = await Movie.create({
    name: "Incomplete Movie",
    year: "not a number", // This will fail validation
    // Missing required fields
  });
} catch (error) {
  if (error.name === 'ValidationError') {
    // Handle validation errors
    console.log('Validation failed:');
    Object.values(error.errors).forEach(err => {
      console.log(`${err.path}: ${err.message}`);
    });
  }
}
```

**Teaching Strategy**: Intentionally create invalid data to show how validation works. This helps students understand the error structure.

**Key Points to Emphasize**:
- Validation happens automatically based on schema
- ValidationError contains details about each failed field
- You can extract specific error messages for user feedback

### Advanced Creation Patterns ###

**Show Real-World Scenarios**:

```javascript
// Creating with pre-save transformations
const movieData = {
  name: "  the matrix  ", // Has extra spaces
  year: 1999,
  rating: "r", // Lowercase
  genre: ["action", "sci-fi"], // Lowercase genres
};

// The schema's pre-save middleware will clean this up
const movie = await Movie.create(movieData);
// Result: name trimmed, rating uppercase, genres capitalized
```

**Teaching Point**: Schema middleware (from Week 10) automatically processes data during creation.

---

## Building CREATE API Endpoints ##

**Major Implementation Section**: Build the controller step by step.

**Teaching Strategy**: Build incrementally - start basic, then add complexity.

**Start with Basic Structure**:

```javascript
const createMovie = async (req, res) => {
  try {
    const movieData = req.body;
    const newMovie = await Movie.create(movieData);
    
    res.status(201).json({
      success: true,
      data: newMovie
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};
```

**Then Add Validation and Error Handling**:

**Build this section by section with students**:

```javascript
const createMovie = async (req, res) => {
  try {
    // Extract data from request body
    const movieData = req.body;

    // Basic input validation
    if (!movieData || Object.keys(movieData).length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Movie data is required'
      });
    }

    // Check for required fields (additional validation beyond schema)
    const requiredFields = ['name', 'year', 'rating', 'length', 'description', 'director'];
    const missingFields = requiredFields.filter(field => !movieData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        error: 'Missing required fields',
        missingFields: missingFields
      });
    }

    // Data sanitization
    const sanitizedData = {
      ...movieData,
      name: movieData.name?.toString().trim(),
      director: movieData.director?.toString().trim(),
      description: movieData.description?.toString().trim(),
      year: parseInt(movieData.year),
      genre: Array.isArray(movieData.genre) ? 
        movieData.genre.map(g => g.toString().trim()) : 
        [movieData.genre?.toString().trim()].filter(Boolean),
      stars: Array.isArray(movieData.stars) ? 
        movieData.stars.map(s => s.toString().trim()) : 
        [movieData.stars?.toString().trim()].filter(Boolean)
    };

    // Create the movie
    const newMovie = await Movie.create(sanitizedData);

    // Return success response
    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: newMovie
    });

  } catch (error) {
    console.error('Error creating movie:', error);

    // Handle specific error types
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message,
        value: err.value
      }));

      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        details: validationErrors
      });
    }

    if (error.code === 11000) {
      // Duplicate key error (if you have unique fields)
      const field = Object.keys(error.keyPattern)[0];
      return res.status(409).json({
        success: false,
        error: `Movie with this ${field} already exists`
      });
    }

    if (error.name === 'CastError') {
      return res.status(400).json({
        success: false,
        error: 'Invalid data type provided',
        details: `${error.path} must be a valid ${error.kind}`
      });
    }

    // Generic server error
    res.status(500).json({
      success: false,
      error: 'Failed to create movie',
      details: error.message
    });
  }
};
```

**Key Teaching Points for Each Section**:
1. **Input Validation**: Check if data exists and has required fields
2. **Data Sanitization**: Clean strings, parse numbers, handle arrays
3. **Mongoose Creation**: Use the sanitized data to create the document
4. **Error Handling**: Different error types require different responses
5. **HTTP Status Codes**: 201 for creation, 400 for client errors, 500 for server errors

**Optional Advanced Feature** - Bulk Creation:

```javascript
const createMultipleMovies = async (req, res) => {
  try {
    const moviesData = req.body;

    if (!Array.isArray(moviesData) || moviesData.length === 0) {
      return res.status(400).json({
        success: false,
        error: 'Array of movies is required'
      });
    }

    if (moviesData.length > 50) {
      return res.status(400).json({
        success: false,
        error: 'Cannot create more than 50 movies at once'
      });
    }

    const newMovies = await Movie.insertMany(moviesData, { 
      ordered: false, // Continue even if some fail
      rawResult: true
    });

    res.status(201).json({
      success: true,
      message: `Successfully created ${newMovies.insertedCount} movies`,
      data: newMovies,
      created: newMovies.insertedCount,
      total: moviesData.length
    });

  } catch (error) {
    // Handle bulk write errors...
  }
};
```

**Teaching Point**: Bulk operations are useful but require additional error handling complexity.

**Update Routes**:

```javascript
// In routes/movieRoutes.js
router.post('/', createMovie);                    // POST /api/movies
router.post('/bulk', createMultipleMovies);       // POST /api/movies/bulk (optional)
```

**Important Routing Note**: Order doesn't matter for POST routes since they have different paths.

---

## Frontend Integration ##

**Critical Integration**: Connect React to the new CREATE endpoint.

**Update React App.js**:

**Teaching Strategy**: Show how proper error handling improves user experience.

```javascript
const handleAddMovie = async (movieData) => {
  try {
    setLoading(true);
    setError(null);

    const response = await fetch(`${API_BASE_URL}/movies`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(movieData),
    });

    const result = await response.json();

    if (result.success) {
      // Success: refresh the movie list and close form
      await fetchMovies(); // Refresh the list to show new movie
      setShowForm(false);
      
      // Optional: Show success message
      setSuccessMessage(`"${result.data.name}" has been added successfully!`);
      
      // Clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);
    } else {
      // Handle API errors
      if (result.details && Array.isArray(result.details)) {
        // Validation errors
        const errorMessages = result.details.map(err => 
          `${err.field}: ${err.message}`
        ).join(', ');
        setError(`Validation failed: ${errorMessages}`);
      } else {
        setError(result.error || 'Failed to add movie');
      }
    }
  } catch (error) {
    console.error('Error adding movie:', error);
    setError('Failed to connect to server. Please try again.');
  } finally {
    setLoading(false);
  }
};
```

**Enhanced MovieForm Component**:

**Teaching Focus**: Client-side validation improves user experience but server-side validation is still required for security.

**Key Enhancements**:
1. **Form Validation**: Check required fields before submission
2. **Error Display**: Show validation errors to users
3. **Loading States**: Provide feedback during submission
4. **Field-Level Validation**: Clear errors as user types

```javascript
// In MovieForm.js
const [errors, setErrors] = useState({});
const [isSubmitting, setIsSubmitting] = useState(false);

const validateForm = () => {
  const newErrors = {};

  if (!movieData.name.trim()) {
    newErrors.name = 'Movie name is required';
  }

  if (!movieData.year || movieData.year < 1800) {
    newErrors.year = 'Please enter a valid year';
  }

  // ... more validation

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!validateForm()) {
    return;
  }

  setIsSubmitting(true);
  // ... rest of submission logic
};
```

**Teaching Point**: Client-side validation provides immediate feedback, but server-side validation is the real security barrier.

---

## Data Validation and Sanitization ##

**Security Focus**: Professional applications require proper data handling.

**Optional Advanced Topic** - Validation Middleware:

```javascript
const validateMovieData = (req, res, next) => {
  const { name, year, rating, length, description, director } = req.body;

  // Check required fields
  if (!name || !year || !rating || !length || !description || !director) {
    return res.status(400).json({
      success: false,
      error: 'Missing required fields'
    });
  }

  // Validate data types
  if (typeof year !== 'number' || year < 1800 || year > new Date().getFullYear() + 5) {
    return res.status(400).json({
      success: false,
      error: 'Year must be a valid number between 1800 and future releases'
    });
  }

  // Sanitize strings
  req.body.name = name.toString().trim();
  req.body.director = director.toString().trim();
  req.body.description = description.toString().trim();

  next();
};

// Use in routes
router.post('/', validateMovieData, createMovie);
```

**Teaching Point**: Middleware provides reusable validation logic but adds complexity. For this course, validation in the controller is sufficient.

---

## Testing CREATE Operations ##

**Hands-on Testing**: Students must test their endpoints.

### Using curl ###

**Demonstrate These Tests**:

```bash
# Test successful creation
curl -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Movie",
    "year": 2024,
    "rating": "PG-13",
    "length": "120 minutes",
    "description": "A test movie for our API",
    "genre": ["Comedy", "Drama"],
    "director": "Test Director",
    "stars": ["Actor One", "Actor Two"]
  }'

# Test validation errors
curl -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{
    "name": "",
    "year": "not a number",
    "rating": "INVALID"
  }'

# Test missing data
curl -X POST http://localhost:4000/api/movies \
  -H "Content-Type: application/json" \
  -d '{}'
```

**Teaching Strategy**: Run these tests live with students. Show both success and failure cases.

### Frontend Testing ###

**Have Students Test**:
1. **Valid Form Submission**: Fill out form completely and submit
2. **Missing Required Fields**: Try submitting with empty fields
3. **Invalid Data**: Enter invalid year, rating, etc.
4. **Success Flow**: Verify new movie appears in list

---

## Error Handling Best Practices ##

**Professional Development Focus**: Proper error handling is crucial for production apps.

**Comprehensive Error Handling Pattern**:

```javascript
const createMovieWithErrorHandling = async (req, res) => {
  try {
    const movieData = req.body;

    // Input validation
    if (!movieData) {
      return res.status(400).json({
        success: false,
        error: 'Request body is required',
        code: 'MISSING_BODY'
      });
    }

    const newMovie = await Movie.create(movieData);

    res.status(201).json({
      success: true,
      message: 'Movie created successfully',
      data: newMovie
    });

  } catch (error) {
    // Log error for debugging
    console.error('CREATE Error:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
      code: error.code
    });

    // Handle specific error types
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        error: 'Validation failed',
        code: 'VALIDATION_ERROR',
        details: Object.values(error.errors).map(err => ({
          field: err.path,
          message: err.message,
          rejectedValue: err.value
        }))
      });
    }

    // ... other error types

    // Generic server error
    res.status(500).json({
      success: false,
      error: 'Internal server error',
      code: 'INTERNAL_ERROR',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
};
```

**Key Teaching Points**:
1. **Specific Error Codes**: Help frontend handle different error types
2. **Detailed Logging**: Essential for debugging production issues
3. **User-Friendly Messages**: Don't expose technical details to users
4. **Environment-Specific Responses**: Show details in development, hide in production

---

## Security Considerations ##

**Important Security Practices**: Introduce security concepts gradually.

```javascript
// 1. Rate limiting (requires express-rate-limit)
const rateLimit = require('express-rate-limit');

const createMovieRateLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs
  message: {
    success: false,
    error: 'Too many movies created, please try again later'
  }
});

router.post('/', createMovieRateLimit, createMovie);

// 2. Input size limiting
app.use(express.json({ limit: '1mb' })); // Limit request body size

// 3. Data sanitization
const sanitizeInput = (req, res, next) => {
  // Remove potentially dangerous characters
  for (let key in req.body) {
    if (typeof req.body[key] === 'string') {
      req.body[key] = req.body[key]
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove scripts
        .trim();
    }
  }
  next();
};

router.post('/', sanitizeInput, createMovie);
```

**Teaching Note**: These are advanced topics. Explain the concepts but don't require implementation for this week.

**Security Concepts to Mention**:
1. **Rate Limiting**: Prevent abuse and spam
2. **Input Sanitization**: Remove dangerous code
3. **Size Limits**: Prevent large payloads
4. **Authentication**: Verify user identity (future topic)

---

## Final Thoughts ##

**Celebration of Achievement**: Students have implemented professional-grade CREATE functionality!

We've successfully implemented CREATE functionality for our Movie Buzz application! Our implementation includes:

- **Robust Data Validation**: Schema-based validation with custom rules
- **Comprehensive Error Handling**: Specific error types with helpful messages
- **Data Sanitization**: Clean and format incoming data
- **Frontend Integration**: React forms with validation and error display
- **Security Measures**: Rate limiting and input sanitization
- **Professional API Design**: Proper HTTP status codes and response formats

**Industry Relevance**: Emphasize that they're using production-grade patterns for data creation.

The CREATE operations now support:
- Single movie creation with full validation
- Bulk movie creation (optional)
- Rich error responses for debugging
- Frontend form validation
- Security best practices

**Next Week Preview**: We'll implement UPDATE functionality, allowing users to modify existing movies while maintaining data integrity.

> `Consider This`  
> How does proper validation and error handling in CREATE operations improve the user experience? What would happen without these safeguards?
>> Expect: Better UX with clear error messages, prevents data corruption, easier debugging, professional feel, prevents security vulnerabilities.

**Preparation for Next Week**: Students should have CREATE functionality working and be able to add new movies through their React frontend.

---

## Exit Ticket ##

Access code: plug47

Instruct students to open the exit ticket for this week in the LMS. You may read through the questions with the students, but do not give the students the answers to the questions. Once all students have answered the questions, you may ask students for the correct answer.

1. What HTTP status code should be used for successful resource creation?
  > Answer: 201 Created
2. What is the difference between Model.create() and new Model() + save()?
  > Answer: Model.create() is a shortcut that combines instantiation and saving, while new Model() + save() allows for operations between creation and saving
3. What type of error does Mongoose throw when schema validation fails?
  > Answer: ValidationError
4. Why is data sanitization important in CREATE operations?
  > Answer: To prevent security vulnerabilities and ensure data consistency

---

## Review ##

- What are the key principles of implementing CREATE operations?
- How do you handle validation errors in Mongoose?
- What HTTP status code should be used for successful resource creation?
- How do you implement data sanitization for security?
- What are the differences between `new Model()` + `save()` vs `Model.create()`?
- How do you provide meaningful error messages to frontend applications?