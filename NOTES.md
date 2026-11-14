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
- The local AI creates six multiple-choice questions for each practice set; students choose answers instead of typing to a chatbot.
- Practice starts from a setup screen, reviews missed questions with the correct answers, and remembers missed skills for targeted future sets.
- An optional AI chat is also available for explanations and learning questions.
- The guide can follow the current practice question and keep the last few chat turns connected for review.
- Vocabulary, Reading, Practice, Questions, and Progress are separate sections with fixed top navigation.
- Existing browser progress was cleared once on November 9, 2026.
- Vocabulary has a clickable word path, Reading has sample books with read-aloud recognition, AI feedback, and questions, and Practice generates a six-question skill test.
- Questions can answer website-use questions and other harmless questions as a general assistant.
- Vocabulary lessons are sequential: each lesson has six questions, and completing one unlocks the next dot.
- Reading books appear in two columns on larger screens and one column on phones.
- Vocabulary now has 110 spaced vertical path dots, and Reading now has 20 sample passages.
- Each reading passage now has three paragraphs with at least five sentences per paragraph.
- Reading questions stay locked until a read-aloud recording finishes with a transcript.
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
