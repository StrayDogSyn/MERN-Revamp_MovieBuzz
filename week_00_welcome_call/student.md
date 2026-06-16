# 🎬 Week 00: Welcome to Movie Buzz — Student Guide

> 🔑 **Access Code:** No exit ticket this week — see you at Week 01!   ·   ⏱️ **Estimated Time:** 1 hr   ·   🎯 **Difficulty:** ⭐

---

## 🗺️ What You're Building This Week

This week is your orientation to the course and the application you'll build over the next 16 weeks: **Movie Buzz**, a full-stack Netflix-style movie database. You won't write code yet — instead, you'll tour the finished application, meet your cohort, confirm your dev environment is ready, and understand the road ahead.

> 💡 **This week in the arc:** Week 00 is the launchpad. Everything you do here clears the runway so Week 01 can focus entirely on Bash, Git, and your first real code.

---

## 🎯 Learning Objectives

By the end of this week you will be able to:

- [ ] Describe what "full-stack" means and name the four layers of the MERN stack
- [ ] Explain the 16-week learning arc and where Movie Buzz fits at each stage
- [ ] Verify that Node.js, npm, Git, and VS Code are correctly installed on your machine
- [ ] Introduce yourself to your cohort and instructor

---

## 🔑 Key Concepts

> **Full-Stack**
> A full-stack application has both a frontend (what users see in the browser) and a backend (the server and database). Building full-stack means you are responsible for every layer, from the button a user clicks to the record stored in a database.

> **MERN Stack**
> An acronym for MongoDB, Express, React, and Node.js — four technologies that work together to build a complete web application. Think of them as a team: React handles the user interface, Node.js runs the server, Express organizes the server's routes, and MongoDB stores the data.

> **Client / Server**
> The client is the browser — it sends requests. The server is the program running on a computer (or in the cloud) that receives those requests and sends back responses. Almost every website you use follows this model.

> **Learning Arc**
> The 16 weeks of this course are designed progressively. Each week adds exactly one capability to Movie Buzz. By Week 16, the app you started in Week 01 will be fully connected, searchable, and production-ready.

---

## ⚙️ Setup

<details>
<summary>📦 Step-by-step environment verification</summary>

This week there is no project directory to navigate into. Instead, open a terminal and run these verification commands one at a time.

### 1. Check Node.js
```bash
node --version
```
**Expected output:** A version number like `v18.17.0` or higher. If you see `command not found`, Node.js is not installed.

### 2. Check npm
```bash
npm --version
```
**Expected output:** A version number like `9.6.7` or higher.

### 3. Check Git
```bash
git --version
```
**Expected output:** Something like `git version 2.41.0`. If you see `command not found`, Git is not installed.

### 4. Check Git identity
```bash
git config --global user.name
git config --global user.email
```
**Expected output:** Your full name and email address. If these are blank, run:
```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

### 5. Check VS Code
```bash
code --version
```
**Expected output:** A version number. If this fails, VS Code may not be in your PATH — open VS Code manually and check the Command Palette for "Shell Command: Install 'code' command in PATH."

### 6. Confirm nvm (optional but strongly recommended)
```bash
nvm --version
```
If you see `command not found`, that's okay for now — but nvm (Node Version Manager) will help you manage Node.js versions later in the course. Your instructor can help you install it if needed.

</details>

<details>
<summary>✅ Pre-flight checklist — confirm before your first day of real work</summary>

- [ ] `node --version` returns v16 or higher
- [ ] `npm --version` returns a version number
- [ ] `git --version` returns a version number
- [ ] `git config --global user.name` returns your name
- [ ] `git config --global user.email` returns your email
- [ ] VS Code opens and the integrated terminal works
- [ ] You have a GitHub account and can log in at github.com

</details>

---

## 📚 Core Concepts

### What Is the MERN Stack?

Most modern web applications are built in layers. The MERN stack names those layers using the tools this course will teach you:

| Layer | Technology | Role |
|-------|-----------|------|
| Database | **MongoDB** | Stores data as flexible JSON-like documents |
| Backend framework | **Express** | Organizes how the server handles different URLs |
| Frontend library | **React** | Builds the interactive UI in the browser |
| Runtime | **Node.js** | Lets JavaScript run on the server, outside the browser |

By the end of Week 16, you will have written code at every layer.

```javascript
// This is the kind of code you'll write in Week 12 — a simple Mongoose query
// (Just a preview — you don't need to understand this yet)
const movies = await Movie.find({});
res.status(200).json(movies);
```

<details>
<summary>🤔 Comprehension check — think before expanding</summary>

Before moving on, try to answer:
1. Which MERN technology runs in the browser?
2. Which MERN technology stores data permanently?

*(Discuss with your instructor if you're unsure — no pressure, this is just orientation)*

</details>

---

### The 16-Week Arc

Here is a simplified view of how Movie Buzz grows over the course:

| Weeks | Theme | What Movie Buzz can do |
|-------|-------|------------------------|
| 00–02 | Setup | Environment verified, repo initialized |
| 03–07 | React | Static UI with components, state, and events |
| 08–09 | Node + Express | A working API server |
| 10 | Checkpoint | Tic-Tac-Toe — consolidate everything so far |
| 11–12 | MongoDB | Data persists in a real database |
| 13–15 | CRUD | Create, update, and delete movies |
| 16 | Integration | Frontend talks to backend — full stack complete |

---

### What Does the Finished App Look Like?

The finished Movie Buzz application (`movie-buzz-finished/` in the repo) is a Netflix-dark-themed full-stack application where you can:

- Browse a list of movies displayed as cards
- Add new movies through a form
- Edit existing movie details
- Delete movies from the database
- Search, filter, and sort the movie list (optional advanced feature)

Your job over 16 weeks is to build this from scratch, one piece at a time.

---

## 🛠️ Your Tasks

> ⚠️ **Reminder:** There are no coding tasks this week. Your job is to verify your environment and ask questions. That is genuinely the entire assignment.

### Task 1: Verify Your Environment

**What you're doing:** Run each verification command from the Setup section above and confirm every tool responds correctly.

```bash
# Run these one at a time and note the output
node --version
npm --version
git --version
git config --global user.name
git config --global user.email
code --version
```

<details>
<summary>💡 Stuck? Expand for a hint — not an answer</summary>

- **If `node` is not found:** Visit nodejs.org and download the LTS version. Alternatively, ask your instructor about installing nvm first.
- **If `git` is not found:** Visit git-scm.com and follow the installer for your operating system.
- **If `git config` returns nothing:** You need to set your name and email — the commands are in the Setup section above.
- **On Windows:** If `code --version` fails, open VS Code, press `Ctrl+Shift+P`, and search for "Shell Command: Install 'code' command in PATH."

</details>

---

### Task 2: Set Up a GitHub Account

**What you're doing:** Confirm you can log in to GitHub. Starting next week, you'll push code there after every session.

```bash
# Verify Git knows who you are before you create your first repo
git config --global user.name
git config --global user.email
```

<details>
<summary>💡 Hint</summary>

- Make sure the email in your `git config` matches the email you used to create your GitHub account. This is how GitHub connects your commits to your profile.
- If you haven't created a GitHub account yet, do it now at github.com — it's free.

</details>

---

### Task 3: Explore the Finished App (Read-Only)

**What you're doing:** Navigate to `movie-buzz-finished/` in the course repo and spend a few minutes reading the file structure. You don't need to run it yet — just look.

```bash
# From the course repo root
ls movie-buzz-finished/
ls movie-buzz-finished/client/src/
ls movie-buzz-finished/server/
```

<details>
<summary>💡 Hint</summary>

- **Think about:** After exploring the structure, can you guess which folder is the React frontend and which is the Node.js backend?
- **Check:** How many files are in `client/src/components/`? Each one of those is a React component you'll eventually build.
- **The pattern:** `client/` = everything the browser uses, `server/` = everything Node.js uses.

</details>

---

## 🐛 Common Errors & Fixes

<details>
<summary>❌ Error: `node: command not found` or `node is not recognized`</summary>

**Why this happens:**
Node.js is either not installed, or it was installed but your terminal doesn't know where to find it (PATH issue).

**Check these things:**
1. Open a fresh terminal window and try `node --version` again — sometimes a terminal opened before installation won't pick up new programs.
2. On Windows, check if Node.js appears in "Add or Remove Programs."

**The fix:**
```bash
# Download and install Node.js LTS from:
# https://nodejs.org/en/download

# OR install nvm first (preferred) and use it to install Node.js:
# macOS / Linux:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# Then close and reopen your terminal, then:
nvm install --lts
nvm use --lts
```

</details>

<details>
<summary>❌ Error: `git config` returns blank — no name or email set</summary>

**Why this happens:**
Git was installed but never configured with your identity. Git requires a name and email attached to every commit.

**Check these things:**
1. Run `git config --list` to see all current config values.
2. Confirm you are setting global config (use `--global`), not local config.

**The fix:**
```bash
# Wrong (missing --global sets it only for a single repo):
git config user.name "Your Name"

# Correct (applies everywhere on your machine):
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

</details>

<details>
<summary>❌ Error: VS Code opens but `code` command doesn't work in the terminal</summary>

**Why this happens:**
VS Code installs the `code` command into your PATH as a separate step. If you skipped that step or installed VS Code differently, the command won't be available.

**Check these things:**
1. Try opening VS Code manually and checking if it opens at all.
2. On macOS, confirm you moved VS Code to your Applications folder (not running it from the Downloads folder).

**The fix:**
```bash
# In VS Code:
# 1. Press Cmd+Shift+P (macOS) or Ctrl+Shift+P (Windows/Linux)
# 2. Type: Shell Command: Install 'code' command in PATH
# 3. Press Enter
# 4. Close and reopen your terminal
code --version  # Should now work
```

</details>

---

## ✅ Deliverables Checklist

Before marking this week complete, verify each item:

- [ ] **Node.js installed:** `node --version` returns v16 or higher in your terminal
- [ ] **npm installed:** `npm --version` returns a number without errors
- [ ] **Git installed and configured:** `git config --global user.name` returns your name
- [ ] **VS Code working:** You can open a file and use the integrated terminal
- [ ] **GitHub account exists:** You can log in at github.com

---

## 🚀 Stretch Goals

> These are optional. Attempt them after completing all deliverables. No starter code is provided — that's the point.

<details>
<summary>⭐ Stretch 1: Customize Your GitHub Profile</summary>

**The challenge:**
Create a profile README on GitHub. GitHub displays it automatically on your profile page when you create a repo named exactly after your username.

**Why this matters:**
Employers look at GitHub profiles. A well-written profile README demonstrates initiative and communication skills — both valued in the industry.

**You'll need to research:**
- How to create a GitHub profile README (search "github profile readme")
- Markdown syntax for formatting headers, lists, and links

</details>

<details>
<summary>⭐⭐ Stretch 2: Run the Finished App (harder)</summary>

**The challenge:**
Get `movie-buzz-finished/` running locally. This means starting MongoDB, running the server, and running the client — and having the browser display actual movies.

**Why this matters:**
Seeing the finished product before you build it gives you a concrete mental model to work toward. Every concept in weeks 01–16 will click faster when you already know what the destination looks like.

**You'll need to research:**
- How to install and start MongoDB on your operating system
- How to run two npm processes at once (server and client)
- What port each service should run on (check the CLAUDE.md in the repo root)

</details>

---

## 🎫 Exit Ticket

> No exit ticket this week — see you at Week 01!
>
> Come prepared next week having verified all items in the Deliverables Checklist above. If anything is broken, flag it before Week 01 so your instructor can help you fix it.

---

## 📖 Reference & Resources

| Resource | Why It's Useful |
|----------|----------------|
| [Node.js LTS Downloads](https://nodejs.org/en/download) | Official installer for Node.js on all platforms |
| [Git Download](https://git-scm.com/downloads) | Official Git installer |
| [VS Code Download](https://code.visualstudio.com/) | Official VS Code installer |
| [GitHub](https://github.com) | Where you'll push all your course work |
| [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) | Recommended way to manage Node.js versions on macOS/Linux |

> 📌 **Reminder:** `movie-buzz-finished/` is the reference implementation for the entire course. Use it to **verify your output**, not to copy code.
