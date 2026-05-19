# Week 10 - Mongoose and Read Functionality

This week we're introducing Mongoose ODM (Object Document Mapper) to make working with MongoDB easier and more structured. We'll implement READ functionality for our Movie Buzz application.

## What's New This Week

- **Mongoose ODM**: Replaces native MongoDB driver with a more powerful tool
- **Schema Definition**: Define data structure and validation rules
- **Model Creation**: Create JavaScript classes for database operations
- **READ Operations**: Implement GET endpoints to retrieve movies from database

## Setup Instructions

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Start MongoDB service**:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Linux
   sudo service mongod start
   
   # On Windows
   net start MongoDB
   ```

3. **Seed the database** (optional):
   ```bash
   node db-seed.js
   ```

4. **Start the development server**:
   ```bash
   npm run dev
   ```

## Learning Focus

- Understanding Mongoose vs native MongoDB driver
- Creating schemas and models
- Database connection with Mongoose
- Implementing READ operations (GET routes)
- Error handling with database operations
- Testing API endpoints

## API Endpoints

Once implemented, you'll have:
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get a specific movie
- `GET /api/test-connection` - Test database connection

## Development Workflow

1. Set up Mongoose connection
2. Create Movie schema and model
3. Implement READ controllers
4. Test endpoints with Postman or browser
5. Add error handling

## Next Week

Week 11 will add CREATE functionality (POST routes) to allow adding new movies to the database.