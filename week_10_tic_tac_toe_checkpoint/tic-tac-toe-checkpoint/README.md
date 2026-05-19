# Week 10 - Tic Tac Toe Checkpoint Project - STARTER CODE

This is a comprehensive full-stack checkpoint project that consolidates everything you've learned from Weeks 3-7.

**IMPORTANT**: This is STARTER CODE with TODO comments to guide your implementation. You will NOT receive complete code solutions - you must implement the functionality yourself using the TODO guidance.

## Project Overview

Build a complete Tic Tac Toe game with:
- **React Frontend**: Interactive game board with state management
- **Express Backend**: Game logic and API endpoints
- **Full Integration**: Frontend-backend communication

## Technologies Used

- **Frontend**: React (functional components + hooks)
- **Backend**: Node.js with Express
- **Communication**: RESTful API with CORS
- **State Management**: React useState and useEffect

## Setup Instructions

1. **Initialize the project**:
   ```bash
   # Install client dependencies
   cd client
   npm install
   
   # Install server dependencies  
   cd ../server
   npm install
   ```

2. **Start development servers**:
   ```bash
   # Terminal 1 - Start backend server
   cd server
   npm run dev
   
   # Terminal 2 - Start React frontend
   cd client
   npm start
   ```

3. **Access the application**:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:4000

## What You'll Build

### Phase 1: React Frontend
- Game board component with 3x3 grid
- Game state management with hooks
- Turn management (X and O players)
- Win detection and game status
- Statistics tracking
- Game controls (new game, reset stats)

### Phase 2: Express Backend
- RESTful API endpoints
- Game logic implementation
- Win condition validation
- Statistics calculation
- Error handling and input validation

### Phase 3: Integration
- API communication with fetch
- State synchronization
- Error handling across the stack
- Loading states and user feedback

## Learning Objectives

This project demonstrates:
- **Week 3**: React fundamentals and JSX
- **Week 4**: State management with hooks
- **Week 5**: Event handling and advanced hooks
- **Week 6**: Node.js backend development
- **Week 7**: Express servers and CORS

## Development Tips

- Start with the backend game logic
- Build React components incrementally
- Test API endpoints before connecting frontend
- Use browser dev tools for debugging
- Implement error handling early

## Extension Challenges

For advanced students:
- Add AI opponent with difficulty levels
- Implement animations and sound effects
- Add multiplayer support
- Create tournament mode
- Mobile responsive design improvements

Good luck building your first full-stack application!