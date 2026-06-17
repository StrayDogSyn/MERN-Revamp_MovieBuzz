# Week 11 - Intro to MongoDB - Movie Buzz

This week we're transitioning from file-based storage to MongoDB database integration.

## Prerequisites Checklist

Before starting this lesson, verify the following:

1. **MongoDB is installed**:
   ```bash
   mongod --version
   # Should show a version number (e.g., v7.x or v8.x)
   ```
   If not installed, follow the installation guide for your OS:
   - **macOS**: `brew tap mongodb/brew && brew install mongodb-community`
   - **Windows**: Download from TLM Help Desk portal (MongoDB offline installer available)
   - **Linux**: Follow TLM Help Desk portal (MongoDB offline installer and Linux setup guide available)

2. **MongoDB is running**:
   ```bash
   # Test the connection
   mongosh --eval "db.version()"
   # Should output the MongoDB version without errors
   ```

3. **Node.js is installed** (from Week 8):
   ```bash
   node --version
   # Should show v18+ or v20+
   ```

### Troubleshooting MongoDB Connection

| Problem | Solution |
|---------|----------|
| `mongod: command not found` | MongoDB is not installed. Follow installation steps above. |
| `connection refused` | MongoDB service is not running. Start it with the commands below. |
| `address already in use` | Another process is using port 27017. Run `lsof -i :27017` to find it. |
| `permission denied` | On Linux, use `sudo` or fix directory permissions for `/data/db`. |

## Setup Instructions

1. **Start MongoDB service**:
   ```bash
   # On macOS with Homebrew
   brew services start mongodb-community
   
   # On Linux
   sudo service mongod start
   
   # On Windows
   net start MongoDB
   ```
3. **Install dependencies**:
   ```bash
   npm install
   ```
4. **Start the development server**:
   ```bash
   npm start
   ```

## What You'll Build

- Connect your Express API to MongoDB
- Create a movie-buzz database
- Replace file storage with database operations
- Test database connectivity

## Learning Focus

- Understanding NoSQL vs SQL databases
- MongoDB document structure
- Basic MongoDB shell commands
- Connecting Node.js to MongoDB
- Database design for web applications

## Next Steps

In Week 12, we'll introduce Mongoose ODM to make database operations easier and add proper validation.