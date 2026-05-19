# Week 1 - Bash and Git #

- [Week 1 - Bash and Git](#week-1---bash-and-git)
  - [Reminder](#reminder)
  - [Background](#background)
  - [Welcome Back](#welcome-back)
  - [TLM Roadtrip](#tlm-roadtrip)
  - [Learning Objectives](#learning-objectives)
  - [Glossary](#glossary)
  - [Warm Up](#warm-up)
  - [What is a Shell?](#what-is-a-shell)
  - [What is Bash?](#what-is-bash)
  - [What is Version Control?](#what-is-version-control)
  - [What is Git?](#what-is-git)
  - [Verbal CFU](#verbal-cfu)
  - [Project File](#project-file)
  - [Opening a Terminal](#opening-a-terminal)
  - [Our First Commands](#our-first-commands)
  - [Let's Get Moving](#lets-get-moving)
  - [Let's Git-R Done!](#lets-git-r-done)
  - [Changing it Up](#changing-it-up)
  - [Exit Ticket](#exit-ticket)
  - [Review](#review)

---

## Reminder ##

Please remember to start recording the RI session BEFORE the session begins. The check-in question should be present in the recording. Remind students that they are being recorded.

---

## Background ##

The students will have successfully completed WDF and have good foundational JavaScript knowledge by now. In addition, they should be able to easily build HTML pages and connect styling via CSS. If for some reason they are not demonstrating these proficiencies, perhaps due to a long break between cohorts, then this should be noted and addressed in a manner appropriate to the circumstances.

---

## Welcome Back ##

This is the first remote instruction call of MERN. Spend a little time checking in with the students to see how they're feeling about moving forward and answer and general questions they may have about the course.

---

## TLM Roadtrip ##

Note that included with this lesson plan is the `TLM_Roadtrip` directory. This is a supplemental activity the students can do to practice their bash navigation skills. Checkout the project's `README.md` file for instructions. If they have any questions about this exercise, they are ecouraged to ask the instructor or send a ticket to Help Desk.

---

## Learning Objectives ##

By the end of this session, learners will be able to:

- Define what Bash is
- Navigate the filesystem using the terminal
- Create new directories and files using the terminal
- Move, copy, and delete files and directories using the terminal
- Define what Git is
- Initialize a local repository
- Stage and commit changes with git

---

## Glossary ##

- `Shell`: An environment in which we can run our commands, programs, and shell scripts.
- `Bash`: A command line interpreter that typically runs in a text window where user can interpret commands to carry out various actions.
- `Version Control`: The practice of tracking and managing changes to software code.
- `Git`: The most widely used modern version control system in the world today.

---

## Warm Up ##

Before moving on, let's take a moment to review some concepts:

1. What are the three main front-end technologies you've learned so far? (HTML, CSS, JS)
2. Name at least one third-party library you used in WDF. (Bootstrap, jQuery)
3. What are some of the conditional statments used in JavaScript? (else, else...if, ternary)
4. Name at least one kind of loop used in JavaScript? (for, while)
5. In what ways can you declare a variable in JavaScript? (let, const, var)

---

## What is a Shell? ##

A Shell provides you with an interface to the Unix system. It gathers input from you and executes programs based on that input. When a program finishes executing, it displays that program's output.

A Shell is an environment in which we can run our commands, programs, and shell scripts. There are different flavors of a shell, just as there are different flavors of operating systems. Each flavor of shell has its own set of recognized commands and functions.

---

## What is Bash? ##

BASH is an acronym for Bourne Again Shell, a punning name, which is a tribute to Bourne Shell (i.e., invented by Steven Bourne).

Bash is a shell program written by Brian Fox as an upgraded version of Bourne Shell program 'sh'. It is an open source GNU project. It was released in 1989 as one of the most popular shell distribution of GNU/Linux operating systems. It provides functional improvements over Bourne Shell for both programming and interactive uses. It includes command line editing, key bindings, command history with unlimited size, etc.

In basic terms, Bash is a command line interpreter that typically runs in a text window where user can interpret commands to carry out various actions. The combination of these commands as a series within a file is known as a Shell Script. Bash can read and execute the commands from a Shell Script.

Bash is the default login shell for most Linux distributions and Apple's mac OS. It is also accessible for Windows 10 with a version and default user shell in Solaris 11.

---

## What is Version Control? ##

Version control, also known as source control, is the practice of tracking and managing changes to software code. Version control systems are software tools that help software teams manage changes to source code over time. As development environments have accelerated, version control systems help software teams work faster and smarter. They are especially useful for DevOps teams since they help them to reduce development time and increase successful deployments.

Version control software keeps track of every modification to the code in a special kind of database. If a mistake is made, developers can turn back the clock and compare earlier versions of the code to help fix the mistake while minimizing disruption to all team members.

---

## What is Git? ##

By far, the most widely used modern version control system in the world today is Git. Git is a mature, actively maintained open source project originally developed in 2005 by Linus Torvalds, the famous creator of the Linux operating system kernel. A staggering number of software projects rely on Git for version control, including commercial projects as well as open source. Developers who have worked with Git are well represented in the pool of available software development talent and it works well on a wide range of operating systems and IDEs (Integrated Development Environments).

---

## Verbal CFU ##

We just covered four definitions above. Check that the students understand the material by prompting them to explain the concepts back to you in their own words. Encourage them to ask questions if they don't understand the topics.

---

## Project File ##

You should have pulled down the `movie-buzz` directory with today's lesson plan. The first thing you need to do is to move or copy this directory to your `Documents` directory. We will be using this project throughout the rest of our journey together.

> `Consider This`  
> Check out the README.md in the `/week_01_bash_and_git/movie-buzz` folder you pulled down. What file type is `.md`?
>> Expect: Markdown, an extremely common formatted text file type.

---

## Opening a Terminal ##

To open a terminal, you can use `CMD + Spacebar` to open up your Spotlight Search. In the window that pops up, type "terminal" and hit Enter. You should now have a terminal open and ready to use!

> `Consider This`  
> What other ways can you open a terminal?
>> Expect: Visual Studio has an integrated terminal.

---

## Our First Commands ##

Okay, let's start practicing some bash skills! The first commands we need to look at are `cd` and `ls`. We'll use `cd` to "change directories" and `ls` to "list" the contents of a directory. Open a terminal and type:

```bash
  cd ~/Documents
```

This will take you to your `Documents` directory. Note that the `~` symbol designates your home directory. Next use the `ls` command to list the contents of this directory:

```bash
  ls
```

Within the output you should see the `movie-buzz` directory that we copied in earlier. Now move into this directory and list its contents:

``` bash
  cd movie-buzz
  ls
```

---

## Let's Get Moving ##

From the contents of this directory, it looks like we have a web application. However, when we load our `index.html` page into the browser, it looks like something is missing! If we inspect the HTML file, we can see that some of the files need to be inside specific directories that don't exist. Further, one file is referenced that doesn't exist. So, let's create those directories and move the correct files into them. For this, we need the `mkdir` command to "make a directory." Let's make our directories:

```bash
  mkdir assets js style
```

And let's confirm that they have been created:

```bash
ls
```

Now we need to move the files into thier respective directories. We rely on the `mv` command to "move" things around. The syntax for this is: `mv <file_to_move> <target_location>`. Let's move our files:

```bash
  mv main.css style
  mv movie-icon.png assets
```

And let's confirm that they have been moved:

```bash
ls
```

Lastly, we find that a `main.js` file is referenced in our HTML document, but it doesn't exist. We can create files with the `touch` command. However, we need to make sure we create the file in the correct directory. Let's do that with:

```bash
  touch js/main.js
```

This will create the `main.js` file inside the `/movie-buzz/js` directory. We can confirm that it is there with:

```bash
  ls js
```

Now when we reload the page, it will look a lot better!

> `Consider This`  
> Practice! Create some other directories and experiment with all the commands you're learning in this session. In addition, look up additional commands by using your classroom resources.

---

## Let's Git-R Done ##

Now that we have our web app in good shape, let's start tracking it with version control. To do this, we need to initalize the project with `git init`. First, make sure you are in the project's root directory by using `pwd` to "print the working directory":

```bash
  pwd
```

If you are not in the `/movie-buzz` root directory, move there (with `cd`) before proceeding. First, let's check to make sure we're not already inside a git repository because creating repos inside of other repos can lead to some serious problems. To do this, run:

```bash
  git status
```

You want to see a message that says something like this:

```fatal: not a git repository (or any of the parent directories): .git```

Now let's initialize our project with:

```bash
  git init
```

Let's take a look at what's going on with another status check:

```bash
  git status
```

We see that we have no commits and some untracked files. Let's add those files so git can start `tracking` them, and then check to make sure those files are being tracked:

```bash
  git add .
  git status
```

Now let's `commit` those changes and check the status:

```bash
  git commit -m "Initial commit"
  git status
```

That's it! Now our project is up-to-date and being tracked by git.

> `Consider This`  
> What do you think will happen if we forget the `-m <message>` portion of our git commit command? What can you do if this happens?

---

## Changing it Up ###

Now that git is tracking our project, let's make some changes, stage them, and finally commit them to git. Let's add some code to our `main.js` file. However, we're going to do it from the command line and without leaving the project's root directory. What sorcery is this, you ask? Let's find out!

From the project's root directory, type the following command:

```bash
  echo 'console.log("Loaded!")' > js/main.js
```

We can check to make sure the code was added to the file by using:

```bash
  cat js/main.js
```

> `Consider This`  
> What do you think the code we added to our main.js file does? How can we check to make sure?

Now let's check our version control again:

```bash
  git status
```

Now let's stage and commit these changes:

```bash
  git add .
  git commit -m "Added some JS to main.js"
  git status
```

That's it! Now our project is fully up-to-date again. Feel free to explore the project and think about what additions we will be making in the future...

---

> `The Extra Mile`  
> Research git concepts on your own using your resources. See if you can create new branches to work on and then merge those branches into the main branch when you're done.

---

## Exit Ticket ##

Access code: bash73

Instruct students to open the exit ticket for this week in the LMS. You may read through the questions with the students, but do not give the students the answers to the questions. Once all students have answered the questions, you may ask students for the correct answer.

1. What is Bash?

  > Answer: A command line interpreter that typically runs in a text window where a user can interpret commands to carry out various actions.

1. What is Git?

  > Answer: Version control software that keeps track of every modification to the code in a special database, helping teams manage changes to source code over time.

1. What does the mkdir command do?

  > Answer: Creates a new directory.
  
1. What does the git add command do?

  > Answer: Stages changes in the code so it can be tracked by git.

---

## Review ##

- What is a shell?
- What is Bash?
- What is version control?
- What is Git?
- What do the following Bash commands do:
  - `cd`
  - `ls`
  - `pwd`
  - `mv`
  - `mkdir`
  - `touch`
  - `echo`
  - `cat`
- What do the following Git commands do:
  - `git status`
  - `git add`
  - `git commit`
