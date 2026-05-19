# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a MERN (MongoDB, Express, React, Node.js) stack educational curriculum with progressive weekly modules. The main completed project is "Movie Buzz" - a full-stack movie database application located in `movie-buzz-finished/`.

## Architecture

### MERN Stack Structure
- **Frontend (React)**: Located in `movie-buzz-finished/client/`
- **Backend (Node.js/Express)**: Located in `movie-buzz-finished/server/`
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Mocha test suite with Supertest for API testing

### Key Components
- **Movie Model**: Mongoose schema with fields for name, description, rating, length, year, genre, director, stars
- **Controller**: Full CRUD operations (Create, Read, Update, Delete) for movies
- **React Components**: 
  - MoviesList for displaying movies
  - MovieForm for adding/editing movies
  - MovieBlock utility component
  - Header/Footer components
- **Routing**: React Router for client-side navigation, Express routes for API endpoints

## Common Development Commands

### Server Commands (from `movie-buzz-finished/server/`)
```bash
# Start development server with nodemon
npm start

# Run test suite
npm test

# Seed database with sample movies
npm run seed
```

### Client Commands (from `movie-buzz-finished/client/`)
```bash
# Start React development server
npm start

# Note: No test script configured in client
```

### Database Requirements
- MongoDB must be running locally on default port (27017)
- Database name: `movie-buzz`
- Connection string: `mongodb://127.0.0.1/movie-buzz`

## API Endpoints

All API routes are prefixed with `/api`:
- GET `/api/movies` - Retrieve all movies
- POST `/api/movie/new` - Create new movie
- GET `/api/movie/:id` - Get specific movie for editing
- PUT `/api/movie/:id` - Update existing movie
- DELETE `/api/movie/:id` - Delete movie

## Testing Strategy

Tests are located in `server/test/` and use:
- Mocha as the test framework
- Supertest for HTTP assertions
- Tests cover CRUD operations for movies API

## Development Workflow

1. Ensure MongoDB is running locally
2. Start server from `movie-buzz-finished/server/` with `npm start`
3. Start client from `movie-buzz-finished/client/` with `npm start`
4. Client runs on port 3000, server on port 4000
5. Use `npm run seed` to populate database with sample data
6. Run `npm test` from server directory to verify functionality

## Weekly Module Structure

The repository contains progressive weekly modules (`week_03_` through `week_13_`) that build the Movie Buzz application incrementally, teaching MERN stack development concepts step by step. Each week contains student/teacher materials and progressive versions of the application.

## CRITICAL DEVELOPMENT INSTRUCTIONS

### Lesson Plan Philosophy - STARTER CODE APPROACH
**NEVER provide complete code implementations in lesson plans**. Always use starter code approach:

- ✅ **YES**: Starter files with TODO comments for students to implement
- ❌ **NO**: Complete code that students just copy
- ✅ **YES**: Guide students to write their own code
- ❌ **NO**: Give finished implementations

Example of correct approach:
```javascript
// TODO: Students will implement DELETE functionality
const deleteMovie = async (req, res) => {
  try {
    // TODO: Extract movie ID from req.params.id
    // TODO: Validate ObjectId format
    // TODO: Use Movie.findByIdAndDelete()
    
    // Placeholder for students
    res.status(501).json({ message: "Not implemented yet" });
  } catch (error) {
    // Handle errors
  }
};
```

### UI Design Standards - NETFLIX STYLE
All UI components must follow Netflix-style design:

- **Dark theme** with rgb(194, 143, 41) accents
- **Horizontal scrolling** movie cards
- **Mobile-first responsive**: 85% width, 1em padding on mobile (<500px)
- **Auto margins** for center alignment
- **Movie cards** with poster on left, content on right
- **TrendingNow component** with static data (do not make dynamic)

### File Structure Requirements
Each week must contain:
- `README.md` - Student learning guide with setup instructions
- `student.md` - Detailed student materials (if needed)
- `teacher.md` - Instructor notes and solutions (if needed)
- `movie-buzz/` - Starter code directory with TODO implementations
- Complete directory structure (config/, controllers/, routes/, models/, etc.)

### Mobile Design Standards
- Movie cards: **85% width** with **1em padding** on mobile views (< 500px)
- Use **auto margins** for center alignment
- Implement **responsive breakpoints** for different screen sizes
- Ensure **touch-friendly** interactions on mobile

### Progressive Learning Sequence
- **Week 3**: React fundamentals and components
- **Week 4**: React state and hooks
- **Week 5**: React events and form handling
- **Week 6**: React component patterns
- **Week 7**: React hooks and context
- **Week 8**: Node.js and HTTP fundamentals
- **Week 9**: Express and CORS
- **Week 10**: Interactive tic-tac-toe game checkpoint
- **Week 11**: Intro to MongoDB
- **Week 12**: Mongoose and READ operations
- **Week 13**: CREATE operations (POST endpoints) ⭐
- **Week 14**: UPDATE operations (PUT endpoints) ⭐
- **Week 15**: DELETE operations (complete CRUD) ⭐
- **Week 16**: Full-stack frontend-backend integration ⭐
- **Supplemental**: Advanced search/filter/sort feature (optional) ⭐
- **Optional**: Professional testing suite for end-to-end validation ⭐

### Code Quality Standards
- **Always** provide proper error handling
- **Always** validate ObjectIds in controllers
- **Always** use try/catch blocks
- **Always** return appropriate HTTP status codes
- **Never** leave placeholder TODO comments in finished reference code
- **Always** use async/await, not Promises or callbacks
- **Always** validate data before database operations
- **Always** handle MongoDB array fields properly (genre: [String], stars: [String])
- **Always** use Array.isArray() checks for safe array operations
- **Always** format arrays for display with .join(', ') for user interfaces

### Advanced Features Implementation (CRITICAL)
- **Supplemental Feature**: Complete search/filter/sort functionality (optional advanced feature)
- **Week 16**: Can optionally integrate search/filter/sort with live API data
- **Search Logic**: Must search across movie.name, movie.director, AND movie.stars array
- **Filter Logic**: Must filter by genre array and rating string
- **Sort Logic**: Must sort by name, year, rating, and genre (using first genre in array)
- **Array Handling**: Use Array.some() for searching/filtering, Array.join(', ') for display
- **Optional Enhancement**: Students who implement supplemental feature have advanced functionality

### Testing Requirements
- Include API testing examples with Postman
- Provide sample data in `data/movies.json`
- Include `db-seed.js` for database seeding
- Show expected request/response examples in README
- **Optional Testing Suite**: Provide comprehensive end-to-end testing module
- **Test Coverage**: API endpoints, search/filter/sort, user journeys, mobile responsiveness

### Reference Implementation Rules
- `movie-buzz-finished/` contains complete working code with search/filter/sort
- `week_10_tic_tac_toe_checkpoint/tic-tac-toe-finished/` contains complete game implementation
- `week_optional_testing_suite/` contains professional end-to-end testing module
- `week_optional_search_feature/` contains optional search/filter/sort implementation
- Reference apps should have NO TODO comments
- Student starter code should have TODO comments guiding implementation

### Project Structure Requirements
```
mern-revamp (2025)/
├── week_03_intro_to_react/
├── week_04_react_state_and_hooks/
├── week_05_react_events_and_hooks/
├── week_06_react_component_patterns/
├── week_07_react_hooks_and_context/
├── week_08_nodejs_and_http/
├── week_09_express_and_cors/
├── week_10_tic_tac_toe_checkpoint/
├── week_11_intro_to_mongodb/
├── week_12_mongoose_and_read/
├── week_13_create_functionality/
├── week_14_update_functionality/
├── week_15_delete_functionality/
├── week_16_frontend_backend_integration/
├── week_optional_search_feature/          # OPTIONAL: Advanced search/filter/sort
│   ├── README.md                          # Implementation guide
│   ├── student.md                         # Student instructions
│   ├── teacher.md                         # Teacher notes and solutions
│   └── movie-buzz-search/                 # Complete working example
│       ├── src/
│       │   ├── App.js                     # Full integration example
│       │   ├── App.css
│       │   ├── components/
│       │   │   ├── SearchBar.js
│       │   │   ├── FilterControls.js
│       │   │   └── MoviesList.js
│       │   └── data/
│       │       └── movies.json            # Sample test data
├── week_optional_testing_suite/           # OPTIONAL: Professional testing module
│   ├── tests/api/                         # API endpoint testing
│   ├── tests/e2e/                         # User journey testing
│   ├── tests/integration/                 # Search/filter/sort testing
│   └── README.md, teacher.md, student.md
├── movie-buzz-finished/                   # Complete reference with all features
│   ├── client/src/components/             # All React components
│   └── server/                            # Complete backend with array handling
└── LESSON_PLANS_SUMMARY.md                # Comprehensive curriculum documentation
```

### When Making Changes
1. **Read the task carefully** - understand what is being asked
2. **Follow the starter code approach** - never give complete implementations
3. **Maintain Netflix-style UI** - do not deviate from design standards
4. **Keep mobile-first responsive** - 85% width, 1em padding on mobile
5. **Preserve the progressive learning** - each week builds on previous
6. **Maintain optional search/filter/sort** - Supplemental feature for advanced students
7. **Handle MongoDB arrays properly** - use Array.isArray(), .some(), .join()
8. **Update documentation** - clear instructions for students
9. **Test the structure** - ensure all files and directories are present
10. **Verify array field compatibility** - prevent "toLowerCase is not a function" errors
11. **Maintain testing suite compatibility** - ensure optional tests can validate functionality

### MongoDB Array Field Handling Patterns (CRITICAL)

**Schema Definition:**
```javascript
const movieSchema = new Schema({
  genre: [String],    // Array of genre strings
  stars: [String]     // Array of star names
});
```

**Correct Search Implementation:**
```javascript
// ✅ CORRECT: Search through stars array
const matchesSearch = searchTerm === '' || 
  movie.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  movie.director.toLowerCase().includes(searchTerm.toLowerCase()) ||
  (Array.isArray(movie.stars) && movie.stars.some(star => 
    star.toLowerCase().includes(searchTerm.toLowerCase())
  ));
```

**Correct Filter Implementation:**
```javascript
// ✅ CORRECT: Filter by genre array
const matchesGenre = selectedGenre === 'all' || 
  (Array.isArray(movie.genre) && movie.genre.some(genre => 
    genre.toLowerCase().includes(selectedGenre.toLowerCase())
  ));
```

**Correct Display Implementation:**
```javascript
// ✅ CORRECT: Display arrays as comma-separated strings
<span className="genre">{Array.isArray(movie.genre) ? movie.genre.join(', ') : movie.genre}</span>
<span className="stars">{Array.isArray(movie.stars) ? movie.stars.join(', ') : movie.stars}</span>
```

**Form Handling for Arrays:**
```javascript
// ✅ CORRECT: Convert strings to arrays for database
const movieData = { ...inputs };
if (movieData.genre && typeof movieData.genre === 'string') {
  movieData.genre = movieData.genre.split(',').map(g => g.trim()).filter(g => g.length > 0);
}
if (movieData.stars && typeof movieData.stars === 'string') {
  movieData.stars = movieData.stars.split(',').map(s => s.trim()).filter(s => s.length > 0);
}
```

# important-instruction-reminders
Do what has been asked; nothing more, nothing less.
NEVER create files unless they're absolutely necessary for achieving your goal.
ALWAYS prefer editing an existing file to creating a new one.
NEVER proactively create documentation files (*.md) or README files. Only create documentation files if explicitly requested by the User.