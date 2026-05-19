# Movie Buzz Full-Stack Application

## Week 16: Frontend-Backend Integration

This week brings together your React frontend and Express/MongoDB backend into a complete full-stack application.

## Project Structure

```
movie-buzz-fullstack/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API service layer
│   │   ├── App.js        # Main app component
│   │   └── index.js      # Entry point
│   └── package.json
│
├── server/                # Express backend (from Weeks 12-15)
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Getting Started

### Prerequisites
- MongoDB running locally
- Node.js installed
- Completed backend from Weeks 12-15
- React components from Weeks 3-5

> **Important**: This project only includes the `client/` directory. You need to copy your completed `server/` directory from Week 15 (DELETE functionality) into the `movie-buzz-fullstack/` folder. Your server should have all CRUD operations (READ, CREATE, UPDATE, DELETE) working before starting this week.

### Setup Instructions

1. **Start MongoDB:**
```bash
mongod
```

2. **Start Backend Server:**
```bash
cd server
npm install
npm start
# Server runs on http://localhost:4000
```

3. **Start React Frontend:**
```bash
cd client
npm install
npm start
# React runs on http://localhost:3000
```

## This Week's Tasks

You'll be implementing:
1. ✅ API service layer for frontend-backend communication
2. ✅ READ operations - Fetch and display movies
3. ✅ CREATE operations - Add new movies
4. ✅ UPDATE operations - Edit existing movies
5. ✅ DELETE operations - Remove movies
6. ✅ Error handling and loading states
7. ✅ Environment configuration
8. ✅ **NEW**: Search/Filter/Sort functionality with API data
9. ✅ **NEW**: Client-side filtering of backend data

## API Endpoints

Your backend provides these endpoints:
- `GET /api/movies` - Get all movies
- `GET /api/movies/:id` - Get single movie
- `POST /api/movies` - Create new movie
- `PUT /api/movies/:id` - Update movie
- `DELETE /api/movies/:id` - Delete movie

## Development Tips

- Always start the backend before the frontend
- Check the Network tab in browser DevTools
- Use console.log to debug async operations
- Handle errors gracefully
- Test each CRUD operation thoroughly

## Common Issues

- **CORS errors**: Make sure proxy is configured in client/package.json
- **Connection refused**: Check if backend is running
- **404 errors**: Verify API endpoint URLs
- **MongoDB errors**: Ensure MongoDB is running

## New Features: Search, Filter & Sort

This week integrates the search/filter/sort functionality from Week 4 with your backend API data:

### Search Functionality
- **Search by title, director, or stars** - Real-time filtering as you type
- **Case-insensitive matching** - Find movies regardless of capitalization
- **Clear button** - Quick reset of search terms

### Filter Controls  
- **Genre filtering** - Filter by Action, Comedy, Drama, Sci-Fi, etc.
- **Rating filtering** - Filter by G, PG, PG-13, R, or Not Rated
- **Active filter indicators** - Shows which filters are currently applied

### Sorting Options
- **Sort by Name** - Alphabetical A-Z ordering
- **Sort by Year** - Newest movies first
- **Sort by Rating** - Alphabetical rating order
- **Sort by Genre** - Alphabetical by first genre

### Smart UI Features
- **Results counter** - Shows "X of Y movies" with current filter status  
- **Empty state handling** - Different messages for no movies vs. no filtered results
- **Reset all filters** - Quick button to clear all search/filter/sort criteria
- **Responsive design** - Mobile-friendly on all screen sizes

## Success Criteria

Your application is complete when:
- All movies display on load
- You can add new movies
- You can edit existing movies
- You can delete movies
- Errors are handled gracefully
- Loading states are shown during operations
- **NEW**: Search works across title, director, and stars
- **NEW**: Genre and rating filters work correctly
- **NEW**: All sorting options function properly
- **NEW**: Filter counters show accurate results
- **NEW**: UI gracefully handles empty filter results