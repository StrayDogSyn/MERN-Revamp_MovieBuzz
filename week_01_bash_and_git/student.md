# 🎬 Week 01: Bash & Git — Student Guide

> 🔑 **Access Code:** `bash73`   ·   ⏱️ **Estimated Time:** 2–3 hrs   ·   🎯 **Difficulty:** ⭐⭐

---

## 🗺️ What You're Building This Week

You are setting up the Movie Buzz project repository and creating its first commit history. By the end of this week you will have a Git-tracked project directory with a basic HTML/CSS movie page, a `.gitignore` file, and at least three meaningful commits pushed to GitHub. Every file you write for the rest of the course will live inside this repository.

> 💡 **This week in the arc:** Week 01 is the foundation under everything else. The Git habits you build now — meaningful commit messages, proper staging, keeping `node_modules` out of version control — will matter every single week through Week 16.

---

## 🎯 Learning Objectives

By the end of this week you will be able to:

- [ ] Navigate the file system using `cd`, `ls`, and `pwd` without looking up the syntax
- [ ] Create and move files and directories using `mkdir`, `touch`, and `mv`
- [ ] Initialize a Git repository, stage files, and create descriptive commits
- [ ] Push a local repository to GitHub and verify the push succeeded

---

## 🔑 Key Concepts

> **Shell**
> A program that reads commands you type and tells the operating system to execute them. Think of it as a universal remote for your computer — instead of clicking, you type.

> **Bash**
> The most common shell on macOS and Linux. "Bash" stands for Bourne Again Shell. It is the language your terminal speaks when you type commands.

> **Terminal**
> The window that displays your shell. The terminal is the container; Bash is the language running inside it.

> **Directory**
> The technical name for a folder. When you navigate the file system in the terminal, you are moving between directories.

> **Git**
> Version control software that takes snapshots of your project at specific points in time. If you break something, you can go back to a snapshot where it worked.

> **Repository (repo)**
> A directory that Git is tracking. It contains your files plus a hidden `.git/` folder that stores the entire history.

> **Staging Area**
> A holding zone between your working files and your commits. You add files to the staging area with `git add`; you commit everything in the staging area with `git commit`.

> **Commit**
> A permanent snapshot of everything in the staging area at a given moment. Every commit has a message that explains what changed and why.

> **.gitignore**
> A file that tells Git which files and directories to ignore. You never want to commit `node_modules/` — it's gigabytes of downloaded code that can be regenerated with `npm install`.

---

## ⚙️ Setup

<details>
<summary>📦 Step-by-step environment setup</summary>

### 1. Open your terminal

**macOS:** Press `Cmd + Space`, type "terminal", press Enter.
**Windows:** Use Git Bash (installed with Git for Windows). Search "Git Bash" in the Start menu.
**VS Code:** Press `Ctrl+\`` (backtick) to open the integrated terminal.

### 2. Confirm your tools are ready
```bash
node --version   # Must return v16 or higher
git --version    # Must return any version
git config --global user.name   # Must return your name
```

If any of these fail, resolve them before starting the tasks. See the Week 00 student guide for fix instructions.

### 3. Navigate to your Documents directory (or equivalent workspace)
```bash
cd ~/Documents
```

### 4. You'll create the Movie Buzz directory as part of Task 1 — do not create it here.

### 5. Verify you are not already inside a Git repository
```bash
git status
# Expected: fatal: not a git repository
# If you see anything else, use `cd ..` to move up until you are outside a repo
```

</details>

<details>
<summary>✅ Pre-flight checklist — confirm before starting</summary>

- [ ] Terminal opens and you can type commands
- [ ] `node --version` returns v16 or higher
- [ ] `git --version` returns a version number
- [ ] `git config --global user.name` returns your name (not blank)
- [ ] `git config --global user.email` returns your email (not blank)
- [ ] You have a GitHub account and are logged in at github.com

</details>

---

## 📚 Core Concepts

### Navigating the File System

The terminal gives you a text interface to your file system. You are always "inside" one directory at a time — this is called your **current working directory**. The three most important navigation commands are:

```bash
pwd          # Print Working Directory — tells you where you are right now
ls           # List contents of the current directory
cd dirname   # Change Directory — move into dirname
cd ..        # Move up one level to the parent directory
cd ~         # Jump directly to your home directory
```

Think of `pwd` as "where am I?", `ls` as "what's in here?", and `cd` as "take me there."

<details>
<summary>🤔 Comprehension check — think before expanding</summary>

Before moving on, try to answer:
1. If you type `pwd` and see `/home/you/Documents/movie-buzz`, what command would take you to `/home/you/Documents`?
2. What does `ls -la` do differently from plain `ls`? (Try it and observe the output.)

*(Discuss in class if unsure — these patterns will be automatic by Week 03)*

</details>

---

### Creating and Moving Files

```bash
mkdir dirname          # Make a new directory called dirname
mkdir dir1 dir2 dir3   # Make multiple directories at once
touch filename.txt     # Create an empty file
mv file destination    # Move a file to a destination directory
mv oldname newname     # Rename a file (move to a new name)
cp source destination  # Copy a file
rm filename            # Delete a file (permanent — no Trash)
rm -r dirname          # Delete a directory and all its contents
```

> **Important:** `rm` is permanent. There is no undo. Be careful with `rm -r`.

---

### The Git Workflow

Every change you track with Git follows this three-step rhythm:

```
Working Directory → Staging Area → Repository (commit)
     (your files)    (git add)       (git commit)
```

```bash
git status                     # See what has changed since last commit
git add filename               # Stage a specific file
git add .                      # Stage all changed files in current directory
git commit -m "message here"   # Commit everything staged, with a message
git log                        # View commit history
git log --oneline              # View history in compact form
```

**What makes a good commit message?**
Write it in the imperative mood, as if completing the sentence "This commit will...":
- `Add MovieBlock component` (good)
- `stuff` (bad)
- `fix bug` (bad — which bug? what fix?)
- `Set up project directory structure` (good)

<details>
<summary>🤔 Comprehension check — think before expanding</summary>

Before moving on, try to answer:
1. What is the difference between `git add .` and `git commit`? Why are they two separate commands instead of one?
2. After you run `git commit`, where does the snapshot live — on your computer or on GitHub?

*(The answer to #2 is important — understand it before Task 3)*

</details>

---

### Connecting to GitHub

`git push` uploads your local commits to a remote repository (on GitHub). Before you can push, you need to connect your local repo to a remote:

```bash
git remote add origin https://github.com/yourusername/movie-buzz.git
git branch -M main
git push -u origin main
```

After the first push with `-u`, future pushes are just `git push`.

---

## 🛠️ Your Tasks

> ⚠️ **Reminder:** Implement each TODO yourself. The goal is to build muscle memory — type the commands, don't copy-paste them.

### Task 1: Build the Directory Structure

**What you're doing:** Navigate to your working directory and create the Movie Buzz project structure using only terminal commands — no Finder or File Explorer.

```bash
# TODO: Navigate to your Documents directory (or wherever you keep projects)
# TODO: Create a directory called movie-buzz
# TODO: Navigate into movie-buzz
# TODO: Create the following subdirectories: assets, js, style
# TODO: Create these files in their correct locations:
#   - index.html (in the root of movie-buzz)
#   - style/main.css
#   - js/main.js
#   - assets/.gitkeep (an empty file so the assets folder gets committed)
# TODO: Verify everything was created using pwd and ls
```

<details>
<summary>💡 Stuck? Expand for a hint — not an answer</summary>

- **Think about:** You can create a file inside a directory without navigating into it. The pattern looks like: `touch dirname/filename.ext`
- **Check:** Use `ls style` to verify that `main.css` is in the `style` directory without navigating there.
- **The pattern looks like:** `mkdir dirname` then `touch dirname/filename`

</details>

---

### Task 2: Add Basic HTML Content

**File to edit:** `movie-buzz/index.html`

**What you're doing:** Open `index.html` in VS Code and write a simple HTML page that links to your CSS and JS files. This is a placeholder — we'll replace it with React in Week 03.

```html
<!-- STARTER CODE — fill in the TODO sections -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Movie Buzz</title>
    <!-- TODO: Add a link tag connecting to style/main.css -->
  </head>
  <body>
    <!-- TODO: Add an h1 with the text "Movie Buzz" -->
    <!-- TODO: Add a p tag with a one-sentence description of the app -->
    <!-- TODO: Add a script tag connecting to js/main.js -->
  </body>
</html>
```

<details>
<summary>💡 Hint</summary>

- **Think about:** A `<link>` tag for CSS uses `rel="stylesheet"` and an `href` attribute pointing to the file path.
- **The pattern looks like:** `<link rel="stylesheet" href="style/main.css" />`
- **For JS:** A `<script>` tag uses a `src` attribute. Place it at the bottom of `<body>` so it loads after the HTML.

</details>

---

### Task 3: Initialize Git and Make Your First Commits

**What you're doing:** Turn `movie-buzz/` into a Git repository and record your work with three separate, meaningful commits.

```bash
# TODO: Confirm you are inside the movie-buzz directory (use pwd)
# TODO: Verify you are NOT already in a Git repo (use git status — expect an error)
# TODO: Initialize a new Git repository
# TODO: Check git status to see your untracked files
# TODO: Create a .gitignore file and add node_modules/ to it
# TODO: Stage all files and make your first commit
#       Commit message: "Initialize Movie Buzz project structure"
# TODO: Add some CSS to style/main.css (even just a body background color)
# TODO: Stage just main.css and commit it
#       Commit message: "Add base styles to main.css"
# TODO: Add a console.log to js/main.js
# TODO: Stage main.js and commit it
#       Commit message: "Add initial JS entry point"
# TODO: Run git log to confirm you have three commits
```

<details>
<summary>💡 Hint</summary>

- **Think about:** `git add .` stages everything. `git add style/main.css` stages only that one file. Separate commits for separate concerns is a professional habit.
- **Check:** After each commit, run `git status` — it should say "nothing to commit, working tree clean."
- **The pattern looks like:** `git add filename` → `git status` → `git commit -m "message"` → `git status`

</details>

---

### Task 4: Push to GitHub

**What you're doing:** Create a new repository on GitHub and push your local commits there.

```bash
# TODO: Go to github.com and create a new repository named "movie-buzz"
#       - Set it to Public
#       - Do NOT initialize it with a README (you already have local commits)
# TODO: Copy the repository URL (HTTPS format)
# TODO: Back in your terminal, connect your local repo to GitHub:
git remote add origin https://github.com/YOUR_USERNAME/movie-buzz.git
git branch -M main
git push -u origin main

# TODO: Refresh github.com/YOUR_USERNAME/movie-buzz and verify your files appear
# TODO: Click on "Commits" and confirm all three commits appear with your messages
```

<details>
<summary>💡 Hint</summary>

- **Think about:** After `git push`, GitHub is a backup of your local repo. Any commit that exists locally but hasn't been pushed yet is not on GitHub.
- **Check:** If `git push` fails with "remote origin already exists," you already ran `git remote add origin` once. Skip that command and run `git push -u origin main` directly.
- **The pattern looks like:** Create repo on GitHub → copy the URL → run the three commands in your terminal → refresh GitHub to verify.

</details>

---

### Task 5: Create a .gitignore

**File to edit:** `movie-buzz/.gitignore`

**What you're doing:** Ensure that `node_modules/` (and other generated files) will never be committed accidentally.

```bash
# STARTER — your .gitignore should contain at minimum:
# TODO: Add node_modules/ on its own line
# TODO: Add .DS_Store (macOS system file) on its own line
# TODO: Add .env on its own line (for secret keys you'll add later)
# TODO: Commit the .gitignore file with message: "Add .gitignore"
# TODO: Push the update to GitHub
```

<details>
<summary>💡 Hint</summary>

- **Think about:** Each line in `.gitignore` is a pattern. Anything matching that pattern is ignored. `node_modules/` with a trailing slash means "a directory named node_modules."
- **Check:** Create a test directory called `node_modules`, run `git status`, and confirm it does NOT appear as an untracked file. Then delete the test directory.
- **The pattern looks like:** One item per line, no quotes needed.

</details>

---

## 🐛 Common Errors & Fixes

<details>
<summary>❌ Error: `fatal: not a git repository` when running `git add` or `git commit`</summary>

**Why this happens:**
You ran `git add` or `git commit` without running `git init` first. Or you navigated out of the `movie-buzz` directory without realizing it.

**Check these things:**
1. Run `pwd` to confirm you are inside `movie-buzz/`.
2. Run `ls -la` and look for a `.git/` directory. If it's not there, you haven't initialized yet.

**The fix:**
```bash
# Wrong (running git commands outside the repo):
cd ~/Documents
git status   # This fails — you're not in a repo

# Correct (navigate into the project first):
cd ~/Documents/movie-buzz
git init
git status   # Now it works
```

</details>

<details>
<summary>❌ Error: Committed `node_modules/` accidentally</summary>

**Why this happens:**
You ran `git add .` before creating the `.gitignore` file, so Git staged everything including `node_modules/`.

**Check these things:**
1. Run `git log` to see if `node_modules` was included in a commit.
2. Run `git status` — if `node_modules` is green (staged), it hasn't been committed yet.

**The fix:**
```bash
# If not yet committed — unstage it:
git rm -r --cached node_modules/
# Then add node_modules/ to .gitignore and commit the .gitignore

# Prevention: Always create .gitignore BEFORE running git add for the first time
```

</details>

<details>
<summary>❌ Error: `git push` fails with `src refspec main does not match any`</summary>

**Why this happens:**
Your local branch is named `master` (the old Git default) but you're trying to push to `main`. GitHub now uses `main` as the default.

**Check these things:**
1. Run `git branch` to see what your current branch is named.
2. If it says `master`, you need to rename it.

**The fix:**
```bash
# Wrong: trying to push main when branch is named master
git push -u origin main   # Fails

# Correct: rename the branch first
git branch -M main        # Rename master → main
git push -u origin main   # Now works
```

</details>

---

## ✅ Deliverables Checklist

Before marking this week complete, verify each item by running your code:

- [ ] **Directory structure built:** `ls movie-buzz` shows `index.html`, `assets/`, `js/`, `style/`, `.gitignore`
- [ ] **Three commits in history:** `git log --oneline` in `movie-buzz/` shows three commits with descriptive messages
- [ ] **Pushed to GitHub:** Refresh `github.com/YOUR_USERNAME/movie-buzz` — files and commits appear
- [ ] **`.gitignore` working:** Create a test `node_modules/` directory, run `git status`, confirm it does not appear as untracked
- [ ] **TLM Roadtrip (optional but encouraged):** Complete the bash navigation challenge in `TLM_Roadtrip/` — see its README for instructions

---

## 🚀 Stretch Goals

> These are optional. Attempt them after completing all deliverables. No starter code is provided — that's the point.

<details>
<summary>⭐ Stretch 1: Feature Branch Workflow</summary>

**The challenge:**
Create a feature branch called `feature/add-movie-styles`, add more CSS to `main.css` on that branch, commit the changes, and then merge the branch back into `main`. Delete the feature branch after merging.

**Why this matters:**
Every professional development team uses branches. Pull requests (the next step after branches) are how code gets reviewed before it's merged. Starting this habit now in a low-stakes environment will make Week 13–16 much smoother.

**You'll need to research:**
- `git checkout -b branchname` to create and switch to a branch
- `git merge branchname` to merge a branch into your current branch
- `git branch -d branchname` to delete a branch after merging

</details>

<details>
<summary>⭐⭐ Stretch 2: Automate Directory Setup with a Shell Script (harder)</summary>

**The challenge:**
Write a Bash script called `setup.sh` that, when run, automatically creates the full Movie Buzz directory structure from scratch — all the directories, all the starter files, and even a starter `.gitignore`. Running `bash setup.sh` in any empty directory should produce the same file tree you built manually in Task 1.

**Why this matters:**
Shell scripts are how professional developers automate repetitive setup tasks. Every project scaffold tool you'll ever use (Create React App, Vite, Next.js starter) is doing something similar under the hood.

**You'll need to research:**
- Bash variables: `PROJECT_NAME="movie-buzz"`
- Bash script structure: `#!/bin/bash` shebang line
- How to make a script executable: `chmod +x setup.sh`

</details>

---

## 🎫 Exit Ticket

> When you're done, submit your exit ticket using access code: **`bash73`**
>
> The questions cover: Bash navigation commands, Git staging concepts, the purpose of `.gitignore`, and Git commit messages.

---

## 📖 Reference & Resources

| Resource | Why It's Useful |
|----------|----------------|
| [Git Official Docs](https://git-scm.com/doc) | Authoritative reference for every Git command |
| [GitHub Docs: Creating a repo](https://docs.github.com/en/get-started/quickstart/create-a-repo) | Step-by-step for setting up your first GitHub repo |
| [Atlassian Git Tutorial](https://www.atlassian.com/git/tutorials) | Visual explanations of staging, commits, and branching |
| [gitignore.io](https://www.toptal.com/developers/gitignore) | Generate `.gitignore` files for any project type |
| [TLM Roadtrip](./TLM_Roadtrip/) | Supplemental bash navigation challenge included with this week |

> 📌 **Reminder:** `movie-buzz-finished/` is the reference implementation for the full application. Use it to **verify your output**, not to copy code.
