# TLM Roadtrip #

Welcome to **TLM Roadtrip**, an excercise designed to provide practice using basic navigation commands in bash.

---

## Instructions ##

You will use bash commands to navigate through a series of states, visiting places and looking for clues as to the next state and location on the trip. You may want to reference https://wikipedia.tlm.cloud to research the hints you're given!

You should run all commands in your `Terminal` MacOS application. Do not use your code editor app (Visual Studio Code) for this, as you will be required to enter specific commands from the locations you will be visting. Simply follow the prompts and have fun!

---

## Navigational Commands ##

To move around on your journey, you'll need to use a couple of basic bash commands. The first command is:

```bash
  cd <directory>
```

This stands for `change directory` and will take you to the directory listed. If you use two periods (`..`) instead of a directory name, it will take you back (or up, depending on your perspective) a single directory. Using forward slashes can help you traverse multiple directories at once (i.e., `cd ../..` takes you back two directories).

---

Once you're in a directory, you can use the `list` command to see what's in it:

```bash
  ls
```

This will list all the contents of the current directory.

---

Finally, you can view the contents of a file with the `concatenate` command:

```bash
  cat <file_i_want_to_look_at>
```

---

## Where to Start ##

To begin the roadtrip, navigate a terminal to this activity's root directory and run the following command:

```bash
  cat roadtrip.txt
```
