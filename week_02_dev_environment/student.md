# Week 2 - Development Environment & React Setup #

- [Week 2 - Development Environment & React Setup](#week-2---development-environment--react-setup)
  - [Notes About This Lesson Plan](#notes-about-this-lesson-plan)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Warm Up](#warm-up)
  - [Starting Point](#starting-point)
  - [Understanding Modern Web Development](#understanding-modern-web-development)
  - [What is npm?](#what-is-npm)
  - [Setting Up for React Development](#setting-up-for-react-development)
  - [Building Your React App Structure](#building-your-react-app-structure)
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

## Notes About This Lesson Plan ##

Please review this lesson plan in advance of our RI session. If this plan doesn't align with where you and your classmates are at in the LMS, please send a ticket to Help Desk as soon as possible.

This code is for instructional purposes only. It should be utilized as an example in developing your own work. No part of it should be directly copied into your own project. As per TLM's plagiarism policy, submitting or misrepresenting code or an idea as your own when it was created by someone else constitutes plagiarism.

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

1. What command did we use last week to initialize a git repository?
2. What is the difference between `git add` and `git commit`?
3. What does `cd ..` do in the terminal?
4. How do you create a new directory using the command line?

---

## Starting Point ##

Before we begin this lesson, make sure you have:

- Completed Week 1 with basic Bash and Git knowledge
- Your Movie Buzz HTML/CSS files from Week 1
- A text editor (VS Code recommended)
- Node.js installed on your system (verify with `node --version`)

Navigate to your Documents directory and create a workspace for our React journey:

```bash
cd ~/Documents
mkdir react-projects
cd react-projects
```

---

## Understanding Modern Web Development ##

Modern web applications like Netflix, Facebook, and Instagram are built using JavaScript frameworks like React. These applications require:

- **Package Management**: Managing thousands of code dependencies
- **Build Tools**: Converting modern JavaScript into browser-compatible code
- **Development Servers**: Running your app locally during development
- **Testing Frameworks**: Ensuring your code works correctly

Today, we'll set up all these tools so you can build professional React applications!

> `Consider This`  
> Why do you think companies like Netflix and Facebook created tools like React instead of using plain HTML/CSS/JavaScript?

---

## What is npm? ##

npm (Node Package Manager) is like an app store for JavaScript code. It allows developers to:

- **Share Code**: Publish packages for others to use
- **Use Others' Code**: Install packages that solve common problems
- **Manage Versions**: Keep track of which versions of packages you're using
- **Run Scripts**: Execute commands to start, test, and build your app

**Key npm Commands We'll Use:**

- `npm install` - Install packages
- `npm start` - Start the development server
- `npm run build` - Create production-ready code
- `npm test` - Run tests

---

## Setting Up for React Development ##

Let's verify npm is installed and ready:

```bash
# Check npm version
npm --version

# See npm configuration
npm config list
```

Now let's understand how npm works by creating a simple project:

```bash
# Create a test project
mkdir npm-practice
cd npm-practice

# Initialize npm (creates package.json)
npm init -y

# Look at the created file
cat package.json
```

Your `package.json` should look like:

```json
{
  "name": "npm-practice",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

> `Consider This`  
> The `package.json` file is like a recipe card for your project. What information does it contain?

---

## Building Your React App Structure ##

Since we don't have direct internet access, we'll build our Movie Buzz React application step by step using the provided starter files. Let's navigate to our pre-configured React project:

```bash
# Navigate to the provided Week 2 starter files
cd week_02_dev_environment/movie-buzz-react

# Look at the structure
ls -la

# Install dependencies (generates node_modules and package-lock.json)
npm install
```

**What's provided for you:**

- Pre-configured `package.json` with React dependencies
- Basic React project structure with best practices
- Development server configuration

This setup gives you the same environment as `create-react-app` but works in our offline environment!

---

## Understanding the React Project Structure ##

Your pre-configured React app has this structure:

```text
movie-buzz/
├── node_modules/        # All the packages (don't edit or commit!)
├── public/             # Static files
│   ├── index.html      # The single HTML page
│   └── manifest.json   # App metadata
├── src/                # Your React code goes here!
│   ├── App.js          # Main React component
│   ├── App.css         # Styles for App component
│   ├── index.js        # Entry point
│   ├── index.css       # Global styles
│   └── App.test.js     # Test file
├── package.json        # Project configuration
├── package-lock.json   # Locked versions of dependencies
└── README.md          # Project documentation
```

**Key Folders:**

- `src/` - Where you'll write all your React code
- `public/` - Static assets that don't need processing
- `node_modules/` - Downloaded packages (never edit!)

---

## npm Scripts for React ##

Open `package.json` and look at the scripts section:

```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "eject": "react-scripts eject"
}
```

Let's run our React app:

```bash
npm start
```

🎉 **Your React app should open in the browser at <http://localhost:3000>!**

**What these scripts do:**

- `npm start` - Runs development server with hot reloading
- `npm run build` - Creates optimized production build
- `npm test` - Runs test suite
- `npm run eject` - (Don't use!) Removes Create React App wrapper

> `Consider This`  
> Try editing `src/App.js` and save. What happens in the browser? This is called "hot reloading"!

---

## Customizing Your React App ##

Let's customize the app to prepare for our Movie Buzz project:

1. Open `src/App.js` in VS Code
2. Replace the content with:

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

1. Save the file and watch it update in the browser!

---

## Version Control for React Projects ##

Let's set up Git for our React project:

```bash
# Initialize git for our project
git init

# Notice node_modules is already in .gitignore!
cat .gitignore

# Check status - node_modules should not appear
git status

# Make our first commit
git add .
git commit -m "Initial React setup for Movie Buzz"
```

**Important:** Never commit `node_modules/`! It's huge and can be regenerated with `npm install`.

---

## Development Tools & Extensions ##

### VS Code Extensions for React ###

When you have internet access in the future, these extensions will enhance your React development experience:

1. **ES7+ React/Redux/React-Native snippets**
   - Provides shortcuts for React code
   - Type `rfce` + Tab to create a React component!

2. **Prettier - Code formatter**
   - Automatically formats your code
   - Keeps code consistent

3. **Bracket Pair Colorizer**
   - Makes matching brackets easier to see

### Chrome Extensions ###

When online, you can add these developer tools:

1. **React Developer Tools**
   - Inspect React components in Chrome
   - Debug state and props

---

## Final Thoughts ##

Congratulations! You now have a professional React development environment set up. You've learned:

- How npm manages packages for modern web development
- How to create and run a React application
- The structure of a React project
- How to use npm scripts to control your app

Next week, we'll start building React components for our Movie Buzz application, working toward our Netflix-style interface!

---

## Exit Ticket ##

Please complete the exit ticket in the LMS. You may use the lesson plan for this session, but do not use any additional resources. This exit ticket will not be part of your grade for the course, and rather is used to inform future instruction and curricular releases.

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
