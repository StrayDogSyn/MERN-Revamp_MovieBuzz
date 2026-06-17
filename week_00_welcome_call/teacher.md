# 👩‍🏫 Week 00: Welcome to Movie Buzz — Instructor Guide

> 📅 **Session Duration:** 1 hour   ·   👥 **Format:** Live welcome call   ·   🔑 **Exit Code:** None (no exit ticket Week 00)

---

## 🗺️ Week in the Arc

Week 00 is a live orientation call, not a coding session. Its pedagogical purpose is threefold: build cohort rapport before the technical pressure of Week 01 arrives, surface environment issues when there is still time to fix them without blocking a lesson, and give students a concrete picture of what they are building so every future concept has a destination to anchor to. Students arrive at this call with WDF (Web Development Fundamentals) behind them — they know HTML, CSS, and basic JavaScript — but may have little sense of how those skills connect to a professional full-stack application.

**Coming from:** WDF — students know HTML, CSS, and introductory JavaScript.
**Going to:** Week 01 — Bash and Git. Students must have Node.js, npm, and Git installed before that session can begin.

---

## 🎯 Learning Objectives

Students will demonstrate the ability to:

- [ ] Name and briefly describe each layer of the MERN stack
- [ ] Explain the 16-week progression at a high level
- [ ] Successfully run `node --version`, `npm --version`, and `git --version` in their terminal
- [ ] Configure Git with their name and email

**Mastery signal:** Every student has all five pre-flight checklist items passing before the call ends. Any student who cannot get these working during the call is immediately flagged for a one-on-one follow-up before Week 01.

---

## ⏱️ Session Timeline

| Segment | Time | Activity | Notes |
|---------|------|----------|-------|
| Introductions | 10 min | Instructor + guest intros, student check-in | Use the volunteer template in the existing README |
| Course overview | 10 min | 16-week arc, what Movie Buzz will become | Show the finished app if possible |
| Environment walk-through | 25 min | Verify Node, npm, Git, VS Code together | Live terminal share, students follow along |
| Q&A + cohort connection | 10 min | Open questions, stretch goals preview | Encourage questions — there are no bad ones |
| Wrap-up | 5 min | Deliverables recap, Week 01 preview | Confirm everyone knows what to fix before next week |
| **Total** | **60 min** | | |

---

## 📖 Lesson Plan

### 🔥 Warm-up (10 min)

**Opening question:**
> "Before we dive in — what's one thing you built during WDF that you're proud of, and what's one thing you wish you'd had more time to get right?"

**Expected range of answers:** Students will mention HTML pages, CSS layouts, or simple JavaScript interactions. Some will be proud of visual design. Others will admit they felt shaky on JavaScript logic.

**Bridge to today:** "Everything you've built so far is the foundation. Over the next 16 weeks we're going to add a server, a database, and a professional frontend framework — and wire all three together into something that looks like the apps you use every day. Today we make sure your machine is ready for that journey."

---

### 🎓 Concept Introduction (10 min)

**Core idea to land:** The MERN stack is four technologies that each handle one layer of a full-stack application. Students are not expected to understand any of them deeply today — they just need a mental map.

**Live demo sequence:**
1. Open the finished Movie Buzz app (or show the `movie-buzz-finished/` directory structure). "This is where we are going. Every line of code in here, you're going to write yourself."
2. Walk through the folder structure at a high level: `client/` is React (the browser), `server/` is Node.js + Express (the backend), and MongoDB is the invisible third layer (the database).
3. Show the 16-week arc table from student.md on screen. "Notice how weeks 03–07 are all React before we ever touch a server. That's intentional — we learn one layer at a time."

**Comprehension check before environment verification:**
> "In your own words — what's the difference between the client and the server in a web app?"

**Green-light signal:** Students describe the browser as the client that makes requests and the server as the backend that handles them. They don't need to mention ports, protocols, or any technical detail — just the directional relationship.

<details>
<summary>🔑 Reference Implementation — Instructor Only. Do not share screen during student work time.</summary>

```bash
# Complete environment verification sequence — run each and show output

# 1. Node.js
node --version
# Expected: v18.x.x or higher (v16 minimum acceptable)

# 2. npm (comes with Node.js)
npm --version
# Expected: 9.x.x or higher

# 3. Git
git --version
# Expected: git version 2.x.x

# 4. Git identity
git config --global user.name
git config --global user.email
# Expected: student's name and email — blank means they need to configure

# Set Git identity if blank:
git config --global user.name "Student Name"
git config --global user.email "student@example.com"

# 5. VS Code
code --version
# Expected: 1.x.x — if fails, walk through shell command installation

# 6. nvm (optional)
nvm --version
# Expected: 0.39.x — "command not found" is okay, note it for later
```

**Teaching notes for this sequence:**
- Step through each command one at a time. Wait for every student to confirm their output before moving to the next command.
- On Windows, `node` and `git` may not be in PATH even after installation. The fix is usually to close and reopen the terminal.
- The most common blocker is a student who installed Node.js on Windows via the installer but used a non-default install path. Check `where node` on Windows if `node --version` fails.

</details>

---

### 🛠️ Guided Build (25 min)

**What you build in front of students:**
This is an environment verification walkthrough, not a code build. Share your terminal screen and run each verification command from the sequence above. Narrate your reasoning as you go: "I'm running `node --version` because React and our server both require Node.js to be present."

**Do NOT build:** Any code. This session has no coding tasks. Students who try to get ahead into Week 01 material should be gently redirected — environment issues are the priority.

**Checkpoint:** After the first three commands (node, npm, git), pause and ask:
> "Raise your hand — or type in chat — if any of those three commands returned an error instead of a version number."

Address every hand before moving on to Git configuration. A student blocked at Week 00 will be blocked at Week 01.

---

### 🧑‍💻 Student Work Time (incorporated into guided build)

**Release prompt:**
> "Now try each of these commands yourself in your own terminal. We'll go one at a time and I'll wait for everyone to confirm before we move on."

**Circulate and watch for:**
- A student whose terminal says `command not found` for `node` — they need Node.js installed or their PATH fixed. This is the most common critical blocker.
- A student whose `git config` returns nothing — they need to set their name and email before Week 01, or their first commit will have no author.
- A student running VS Code's integrated terminal instead of a standalone terminal — this is fine but note it for Week 01 when we discuss terminal basics.

**Early finisher guidance:**
Students who have everything working can explore the `movie-buzz-finished/` directory structure, or attempt Stretch Goal 2 from student.md (running the finished app).

---

### 💬 Debrief (10 min)

**Cold-call questions:**
1. "What are the four letters in MERN, and which one runs in the browser?"
2. "After today, what's the one thing you most want to understand better before Week 16?"

**Discussion prompts:**
- "When you think about an app like Netflix — what do you imagine is happening between when you click a title and when the video starts playing? What layers do you think are involved?"
- "Full-stack development means being responsible for both the user interface and the data. How does that change the way you think about building something, compared to only working on the visual side?"

**Common confusion to address proactively:**
Students often conflate "client" and "user." Clarify: the client is the software (browser), not the person. The user interacts with the client, which talks to the server. This distinction matters when we get to Week 09 and discuss CORS.

---

## ⚠️ Common Student Mistakes

<details>
<summary>🔴 Critical: Node.js not installed or wrong version</summary>

**What it looks like:** `node --version` returns `command not found`, or returns a version below v16 (e.g., v12 or v14 from an old installation).

**Root cause:** Students installed Node.js a long time ago for a previous project and never updated, or they are on Windows and the installer did not add it to PATH.

**Socratic intervention:**
> "When did you last use Node.js before today? Is it possible there's an older version installed from a previous project?"

**If they're still stuck after 3 minutes:** Walk them through the nvm installation for macOS/Linux, or the nodejs.org LTS installer for Windows. Note their name — follow up before Week 01.

**Prevention:** Send the pre-flight checklist to students at least 48 hours before the welcome call and ask them to attempt it independently first.

</details>

<details>
<summary>🟠 High: Git not configured with name and email</summary>

**What it looks like:** `git config --global user.name` returns a blank line. Their first commit next week will have an anonymous author, which causes GitLab attribution issues.

**Root cause:** Git was installed but the post-install configuration step was skipped. Very common on machines where a sysadmin did the install.

**Socratic intervention:**
> "What do you think Git uses your name and email for? Why would every commit need to be associated with a specific person?"

**If they're still stuck after 3 minutes:** Provide the exact commands: `git config --global user.name "Full Name"` and `git config --global user.email "email@example.com"`.

**Prevention:** Include `git config` verification in the pre-call checklist email.

</details>

<details>
<summary>🟡 Medium: Student is on Windows and terminal behavior is unfamiliar</summary>

**What it looks like:** The student uses Command Prompt instead of Git Bash or PowerShell, and some commands behave differently (e.g., `ls` vs `dir`, path separators).

**Root cause:** Windows has multiple shell options and students don't know which to use. Git Bash (installed with Git for Windows) is the most compatible option for this course.

**Socratic intervention:**
> "Which terminal program are you using right now — do you know if it's Command Prompt, PowerShell, or Git Bash? Let's figure out which one will serve you best for this course."

**If they're still stuck after 3 minutes:** Recommend Git Bash as the default terminal for the course. Show them how to open it: right-click on the desktop and select "Git Bash Here," or search for "Git Bash" in the Start menu.

**Prevention:** Mention in pre-call materials that Windows users should install Git for Windows and use Git Bash.

</details>

---

## 💬 Discussion Prompts

1. **"Think about an app you use every day — Instagram, Spotify, whatever it is. What data do you think it's storing about you, and where do you think that data lives?"**
   *Why ask this:* Grounds the abstract concept of "database" in something concrete and personal. Students immediately understand why MongoDB matters when they connect it to real apps they use.
   *Strong answer includes:* Any mention of user profiles, preferences, listening history, or favorites — i.e., persistent data that survives a browser refresh.

2. **"When you hear 'the front end' and 'the back end' of an application — what images or metaphors come to mind? How does that shape how you think about your role as a developer?"**
   *Why ask this:* Surfaces existing mental models so we can build on or correct them. Also introduces the idea of full-stack ownership early.
   *Strong answer includes:* The front end as the "face" of the app (design, interaction), the back end as the "engine" (logic, data). Strong answers question whether this division is clean in practice.

3. **"Over 16 weeks, you're going to build something from an empty directory to a working full-stack app. What's one thing that's exciting about that, and one thing that feels uncertain?"**
   *Why ask this:* Normalizes anxiety, creates psychological safety, and gives the instructor a read on where students need the most encouragement.
   *Strong answer includes:* Specific fears (e.g., "I'm worried about JavaScript logic" or "I don't understand what a database actually does") — these are useful data points for the instructor.

---

## 📊 Assessment Rubric

| Criterion | ⭐⭐⭐ Exemplary | ⭐⭐ Proficient | ⭐ Developing |
|-----------|---------------|----------------|--------------|
| Environment readiness | All five tools verified and working; Git fully configured with name and email | Three or four tools working; Git installed but may need configuration | Fewer than three tools working; significant setup blockers present |
| MERN understanding | Can name all four technologies and describe each layer's role in their own words | Can name the acronym and identify which layer handles the browser | Can name "MERN" but cannot describe what individual letters stand for |
| Engagement | Asks at least one substantive question during Q&A; contributes to discussion | Present and attentive; responds when called on | Minimally engaged; does not respond to prompts |
| Code quality | N/A this week — no code written | N/A this week | N/A this week |

**Passing threshold:** Proficient in environment readiness + Proficient in engagement. Students who are Developing in environment readiness must be contacted before Week 01.

---

## 🚀 Stretch Goal Guidance

<details>
<summary>Supporting students attempting Stretch Goal 2 (run the finished app)</summary>

**What they're building:** Getting the complete `movie-buzz-finished/` stack running locally — MongoDB, Express server on port 4000, React client on port 3000.

**Where they typically get stuck:** MongoDB not running. Students forget that MongoDB is a separate process that must be started before the server can connect to it.

**Guided question sequence:**
1. "When you run `npm start` from the server directory and it crashes, what error message do you see? Is it a port error or a connection error?"
2. "If it says something about not being able to connect — what do you think might need to be running before the server can connect to a database?"
3. "Try running `mongod` in a separate terminal window, then start the server again. What happens?"

**Complete reference:**
```bash
# Terminal 1: Start MongoDB (must stay running)
mongod

# Terminal 2: Start the server
cd movie-buzz-finished/server
npm install
npm start
# Expected: "Server is running on port 4000" and "MongoDB connected"

# Terminal 3: Start the client
cd movie-buzz-finished/client
npm install
npm start
# Expected: Browser opens at http://localhost:3000
```

</details>

---

## 🎫 Exit Ticket Administration

**Access Code:** None — no exit ticket for Week 00.

**Note to instructor:** The deliverables checklist in student.md functions as the informal assessment this week. Before ending the call, do a verbal round: ask every student to confirm which items on the checklist they have passing. Log any student who is missing Node.js, npm, or Git — these must be resolved before Week 01.

| Check | What to Confirm | Follow-up if Missing |
|----|-------|----------------|
| Node.js | `node --version` ≥ v16 | Email installer link + nvm guide |
| npm | `npm --version` returns a number | Comes with Node.js — fix Node first |
| Git | `git --version` returns a number | Send git-scm.com link |
| Git config | Name and email both set | Provide exact commands via chat/email |
| VS Code | Opens and integrated terminal works | Schedule brief office hours before Week 01 |

**Grading note:** Week 00 is not graded. This is orientation, not assessment. The only "grade" is whether students are ready for Week 01.

---

## 🔮 Bridge to Next Week

**What to say at the end of class:**
> "Next week we're going to spend time in the terminal — the same tool you just used to check your versions. You'll learn to navigate your file system, create directories and files from the command line, and initialize your very first Git repository. By the end of Week 01, Movie Buzz will have a real repo with a real commit history. Make sure everything on your pre-flight checklist is green before then — it's the foundation for everything that follows."

**Student prep (if any):** Students should confirm all pre-flight checklist items are passing. Students who encountered errors during the welcome call should attempt to resolve them using the student.md Common Errors section or by reaching out to Help Desk.

---

## 📎 Instructor Notes & Gotchas

> **Recording reminder:** Start recording before the session begins. The check-in question must be captured in the recording. Remind students at the start that they are being recorded.
>
> **Guest volunteers:** Use the template in the existing `README.md` to invite cleared remote volunteers. Give guests 3–5 minutes at the start to introduce themselves, and make clear they may leave after introductions.
>
> **Node version issues:** The most common critical blocker. Node v14 will cause silent failures in React's build tools. Node v16 is the minimum; v18 LTS is preferred. If a student has v12 or v14, nvm is the cleanest upgrade path.
>
> **Windows PATH issues:** Students who installed Node.js or Git on Windows may need to restart their terminal (or even their machine) before the tools appear in PATH. Always recommend closing and reopening the terminal as a first debugging step.
>
> **nvm on Windows:** The standard nvm tool only works on macOS/Linux. Windows students should use `nvm-windows` — a separate project with different installation steps (search "nvm-windows" in the TLM Help Desk portal for the offline installer). Do not instruct Windows students to follow the standard nvm instructions.
>
> **Timing:** The 25-minute environment walk-through can run long if multiple students have issues. Prioritize getting everyone past `node --version` — the remaining steps are easier to debug asynchronously. Do not sacrifice the Q&A segment; rapport built this week pays dividends when students are stuck in Week 11.
