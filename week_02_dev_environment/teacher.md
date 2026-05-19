# Week 2 - Development Environment & React Setup #

- [Week 2 - Development Environment & React Setup](#week-2---development-environment--react-setup)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Warm Up](#warm-up)
  - [Starting Point](#starting-point)
  - [Understanding Modern Web Development](#understanding-modern-web-development)
  - [What is npm?](#what-is-npm)
  - [Setting Up for React Development](#setting-up-for-react-development)
  - [Using Your Pre-Configured React App](#using-your-pre-configured-react-app)
  - [Understanding the React Project Structure](#understanding-the-react-project-structure)
  - [npm Scripts for React](#npm-scripts-for-react)
  - [Customizing Your React App](#customizing-your-react-app)
  - [Version Control for React Projects](#version-control-for-react-projects)
  - [Development Tools & Extensions](#development-tools--extensions)
  - [Final Thoughts](#final-thoughts)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)
  - [Independent Practice](#independent-practice)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

Students have completed Week 1 with basic Bash and Git knowledge, and have created a simple Movie Buzz HTML/CSS page. This week bridges the gap between traditional web development and modern React development. We introduce npm and Create React App to set up the development environment students will use for the rest of the course. This is a critical foundation week that ensures all students can successfully run React applications.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Understand the modern web development workflow
- Install and use npm (Node Package Manager) for React projects
- Create a new React application using Create React App
- Navigate and understand the React project structure
- Use npm scripts to run, build, and test React applications
- Configure VS Code for optimal React development
- Prepare their development environment for building the Movie Buzz application

---

## Glossary ##

- `npm`: Node Package Manager - the tool used to install and manage JavaScript packages
- `package.json`: A file that contains metadata about your project and lists its dependencies
- `Dependencies`: External code packages that your project needs to run
- `Create React App`: A tool that sets up a modern React application with no configuration
- `Development Server`: A local server that runs your React app during development
- `Build Process`: The process of converting your development code into optimized production code
- `Hot Reloading`: Automatic refresh of your app when you save changes

---

## Warm Up ##

**Check-in Question**: "What's one website or app you use daily that you think might be built with React?"

Expected answers: Facebook, Instagram, Netflix, Airbnb, Uber, etc.

Review questions:

1. What command did we use last week to initialize a git repository?
   > Answer: `git init`
2. What is the difference between `git add` and `git commit`?
   > Answer: `git add` stages changes, `git commit` saves them to history
3. What does `cd ..` do in the terminal?
   > Answer: Moves up one directory level
4. How do you create a new directory using the command line?
   > Answer: `mkdir directory-name`

---

## Starting Point ##

**Pre-flight Check** (do this before students arrive):

- Verify Node.js is installed: `node --version` (should be 14.x or higher)
- Verify npm is installed: `npm --version`
- Clear npm cache if needed: `npm cache clean --force`

**Student Setup:**

```bash
cd ~/Documents
mkdir react-projects
cd react-projects
```

**Important**: Make sure students are NOT in their Week 1 project directory. We're starting fresh!

---

## Understanding Modern Web Development ##

**Teaching Approach**: Start with the "why" before the "how"

**Discussion**: "Last week we built a website the traditional way. But modern sites like Netflix need more power."

**Whiteboard** these differences:

| Traditional Web | Modern Web (React) |
| --------------- | ------------------ |
| Multiple HTML files | Single Page Application |
| Page refreshes | Instant updates |
| Manual DOM updates | Virtual DOM |
| Simple deployment | Build process |

**Key Point**: "We need tools to manage this complexity. That's where npm comes in."

> `Consider This`  
> Why do you think companies like Netflix and Facebook created tools like React instead of using plain HTML/CSS/JavaScript?
>> Expected: Better user experience, faster updates, easier to maintain, component reusability, better performance

---

## What is npm? ##

**Analogy**: "npm is like the App Store for JavaScript code"

**Live Demo** - Show npmjs.com:

- Search for "lodash" to show popular package
- Point out download numbers (millions per week!)
- Show how developers share code globally

**Key Commands** (write on board):

```bash
npm install     # Install packages
npm start       # Start dev server
npm run build   # Create production code
npm test        # Run tests
```

**Important Context**: "npm comes with Node.js, but we're using it for React, not backend development (that's Week 6)"

---

## Setting Up for React Development ##

**Do Together**:

```bash
# Check npm is working
npm --version

# Create practice project
mkdir npm-practice
cd npm-practice
npm init -y

# Show the created file
cat package.json
```

**Explain each field** in package.json:

- `name`: Project name (no spaces!)
- `version`: Semantic versioning
- `scripts`: Commands we can run
- `dependencies`: Packages we need

**Clean up**:

```bash
cd ..
rm -rf npm-practice
```

> `Consider This`  
> The `package.json` file is like a recipe card for your project. What information does it contain?
>> Expected: Project info, dependencies list, scripts to run, version number

---

## Using Your Pre-Configured React App ##

**CRITICAL MOMENT**: Students discover their ready-to-use React environment!

**Important Context**: "Since we don't have internet access, I've prepared a complete React setup for you."

**Step by Step**:

```bash
# Navigate to the provided starter files
cd week_02_dev_environment/movie-buzz-react

# Explore the structure
ls -la

# Install dependencies (generates node_modules and package-lock.json)
npm install
```

**Explain what's provided**:

- Complete `package.json` with all React dependencies
- Optimized project structure following React best practices
- Ready-to-run development server (after running npm install)

**Celebrate**: "This is the same professional setup as Netflix!" 🎉

---

## Understanding the React Project Structure ##

**Visual Tour** (open in VS Code):

```text
movie-buzz/
├── node_modules/    ← "App Store downloads" (don't touch!)
├── public/          ← Static files
│   └── index.html   ← The ONE HTML file
├── src/             ← Your React code lives here!
│   ├── App.js       ← Main component
│   └── index.js     ← Entry point
└── package.json     ← Project configuration
```

**Key Teaching Points**:

- `node_modules/` = 200MB+ of code! Never edit or commit
- `src/` = Where we'll spend 99% of our time
- Single `index.html` = Single Page Application

---

## npm Scripts for React ##

**The Magic Moment** - Start the app:

```bash
npm start
```

**Should automatically open <http://localhost:3000>**

If not, have students manually navigate to it.

**Live Demo**:

1. Show the running app
2. Open `src/App.js`
3. Change "Learn React" to "Movie Buzz"
4. Save and show instant update!

**Explain Hot Reloading**: "No more manual refresh! React updates instantly when you save."

> `Consider This`  
> Try editing `src/App.js` and save. What happens in the browser? This is called "hot reloading"!

---

## Customizing Your React App ##

**Code Along** - Everyone types together:

1. Open `src/App.js`
2. Delete everything
3. Type this together:

```javascript
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>🎬 Movie Buzz</h1>
        <p>Coming Soon: Your Netflix-Style Movie Database!</p>
        <p>Week 2: Environment Setup ✅</p>
      </header>
    </div>
  );
}

export default App;
```

**Check**: Everyone should see the updated app in their browser!

---

## Version Control for React Projects ##

**Important Lesson**: How to use Git with React

```bash
# React already initialized git
git status

# Look at .gitignore
cat .gitignore  # Show node_modules is ignored!

# Commit our changes
git add .
git commit -m "Initial React setup for Movie Buzz"
```

**Key Point**: "The .gitignore file saves us from committing 200MB of node_modules!"

---

## Development Tools & Extensions ##

**VS Code Setup** (for future reference):

When students have internet access, they can enhance their development environment with:

1. "ES7+ React snippets" extension
2. Demo: Type `rfce` + Tab to create component
3. "Prettier" for code formatting

**Chrome Setup** (for future reference):
When online, students can add:

1. React Developer Tools
2. Show how to inspect React components

---

## Final Thoughts ##

**Celebration**: Students now have the same development environment as professional React developers!

**What we accomplished**:

- ✅ Installed npm and learned package management
- ✅ Created a React application
- ✅ Ran a development server with hot reloading
- ✅ Prepared for Week 3 React components

**Preview Week 3**: "Next week we'll build our first Movie Buzz components!"

---

## Exit Ticket ##

Access code: flux29

1. What command creates a new React application?
   > Answer: `npx create-react-app app-name`
2. What does `npm start` do in a React project?
   > Answer: Starts the development server
3. Where do you write React component code?
   > Answer: In the `src/` folder
4. Why should you never commit node_modules?
   > Answer: It's huge and can be regenerated with `npm install`

---

## Review ##

- What is npm and why is it important for React development?
- What command creates a new React application?
- What does `npm start` do in a React project?
- Where do you write your React component code?
- Why should you never commit the `node_modules` folder?
- What is hot reloading and why is it useful?
- How does Create React App help developers?

---

## Independent Practice ##

1. **Explore the React App:**
   - Change the background color in `src/App.css`
   - Add your name to the App.js component
   - Try adding an image to the public folder and displaying it

2. **Practice npm Commands:**
   - Stop the server (Ctrl+C) and restart it with `npm start`
   - Run `npm test` to see the test suite
   - Look at what `npm run build` creates (check the `build/` folder)

3. **Customize for Movie Buzz:**
   - Update the title in `public/index.html` to "Movie Buzz"
   - Add some movie-related text to your App component
