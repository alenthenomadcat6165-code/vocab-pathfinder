# Vocab Pathfinder notes

## How to run it

1. Make sure the server-only key-generator settings are in `.env`.
2. In this folder, run:

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
- Each vocabulary lesson now practices three words through six questions. The path shows lesson numbers and checkpoints without listing the lesson words before the lesson opens.
- Reading books appear in two columns on larger screens and one column on phones.
- Vocabulary now has 250 lessons with a 15-question checkpoint after every ten lessons, and Reading now has 20 sample passages.
- Each reading passage now has three paragraphs with at least five sentences per paragraph.
- Reading questions stay locked until a read-aloud recording finishes with a transcript.
- Vocabulary quizzes, reading practice, and progress tracking work in the browser.
- The backend gets an OpenAI key from the server-only `getKey()` helper. It POSTs to `KEYGEN_URL/api/lookup-key` with `KEYGEN_TOKEN`, caches the returned key until `expiresAt`, and refreshes it once if OpenAI rejects it.
- The AI receives the project safety and teaching instructions from `BRIEF.md` with every message.
- Key-generator requests and OpenAI requests stay on the backend; neither token is sent to browser code.
- Saves on this computer only for now.
- Vercel setup: the `api/index.js` Vercel Function serves `/api/health`, `/api/ai`, and `/api/practice`; the existing `public/` files are served as the website.
- The AI model is controlled by server-only `OPENAI_MODEL` and defaults to `gpt-4o-mini`.
- To deploy, import this GitHub repository into Vercel, keep the framework preset as Other, and add `KEYGEN_URL`, `KEYGEN_TOKEN`, and optionally `OPENAI_MODEL` under Project Settings → Environment Variables for the environments you use. Do not add the token or generated key to Git, public files, or browser code.
- The MVP reading-level check is available from the home page. It requests six AI reading questions and a passage through the backend, scores the answers into an estimated level, saves that level in browser progress, and opens the next practice step.
- GitHub Pages publishes the `public/` website through `.github/workflows/pages.yml`. GitHub Pages can serve the interface, but it cannot run the Node backend; use the Vercel deployment for AI features.
- Vocabulary questions use varied context-clue, situation, cloze, definition, clue-selection, and sentence-use formats. The question design follows the approach described by [iRead's vocabulary-in-context guide](https://iread.education/resources/reading-quizzes/vocabulary-in-context-questions), without copying protected textbook questions.
- Score feedback uses four cat images supplied for the project; the score message is shown beside the matching photo.
- The MindDo key can access the OpenAI model `gpt-5.6-luna`.

## Maybe Later

- Add more checked practice questions and reading passages.
- Switch the small browser storage file to a real database.
- Add an in-app mistake report flow and teacher-friendly progress export.
- Add optional read-aloud support after testing accessibility needs.
