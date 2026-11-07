# Vocab Pathfinder notes

## How to run it

1. Install Ollama for Mac and make sure it is running.
2. In Terminal, run `ollama pull gemma3:1b` once.
3. In this folder, run:

   `npm start`

4. Open http://127.0.0.1:3000 in your browser.

## What is done

- Version 1 has a two-step English check, with vocabulary, grammar, spelling, and reading questions.
- It gives an estimated level and opens a kind, local AI learning guide.
- Vocabulary quizzes, reading practice, and progress tracking work in the browser.
- The backend sends requests to local Ollama at `http://127.0.0.1:11434` using `gemma3:1b`.
- The AI receives the project safety and teaching instructions from `BRIEF.md` with every message.
- Ollama requests stay on the backend; no OpenAI key is needed.
- Saves on this computer only for now.

## Maybe Later

- Add more checked practice questions and reading passages.
- Switch the small browser storage file to a real database.
- Add an in-app mistake report flow and teacher-friendly progress export.
- Add optional read-aloud support after testing accessibility needs.
