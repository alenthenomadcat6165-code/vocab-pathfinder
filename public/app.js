const initialQuestions = [
  { skill: 'Vocabulary', prompt: 'What does “reluctant” mean in this sentence? “Mia was reluctant to speak first.”', choices: ['Excited to begin', 'Not sure or willing', 'Unable to hear', 'Ready to leave'], answer: 1 },
  { skill: 'Grammar', prompt: 'Which sentence is written correctly?', choices: ['The dogs runs fast.', 'The dogs running fast.', 'The dogs run fast.', 'The dog run fast.'], answer: 2 },
  { skill: 'Reading', prompt: 'A character packs an umbrella before leaving. What can you infer?', choices: ['It may rain.', 'They are going swimming.', 'They lost a hat.', 'It is their birthday.'], answer: 0 },
  { skill: 'Spelling', prompt: 'Which word is spelled correctly?', choices: ['becuase', 'because', 'beacuse', 'becaus'], answer: 1 },
  { skill: 'Vocabulary', prompt: 'Which word is closest in meaning to “brief”?', choices: ['Long', 'Short', 'Loud', 'Difficult'], answer: 1 },
  { skill: 'Grammar', prompt: 'Choose the best word: “She ___ her book every night.”', choices: ['read', 'reads', 'reading', 'reader'], answer: 1 },
  { skill: 'Reading', prompt: 'If a text says a plant grew toward the window, what helped it grow?', choices: ['The sunlight', 'The noise', 'The paint', 'The clock'], answer: 0 },
  { skill: 'Spelling', prompt: 'Which word completes this sentence? “The bright ___ crossed the sky.”', choices: ['lightning', 'litening', 'lightningg', 'lighning'], answer: 0 },
  { skill: 'Vocabulary', prompt: 'To “observe” something means to…', choices: ['Watch it carefully', 'Hide it away', 'Make it smaller', 'Forget it'], answer: 0 },
  { skill: 'Grammar', prompt: 'Which sentence has the correct punctuation?', choices: ['“Please sit down” said Ana.', '“Please sit down,” said Ana.', '“Please sit down” said, Ana.', 'Please sit down,” said Ana.'], answer: 1 }
];
const refinedQuestions = [
  { prompt: 'What does “contrast” mean?', choices: ['A strong difference', 'A quiet sound', 'A repeated action', 'A type of question'], answer: 0 },
  { prompt: 'Choose the best transition: “The trail was steep. ___, we kept walking.”', choices: ['However', 'Before', 'For example', 'Similarly'], answer: 0 },
  { prompt: 'What is the main idea of a paragraph?', choices: ['The smallest detail', 'What it is mostly about', 'The last word', 'A question mark'], answer: 1 },
  { prompt: 'Which sentence uses “their” correctly?', choices: ['Their going home.', 'The students packed their books.', 'I like their.', 'Put it over their.'], answer: 1 },
  { prompt: 'A “generous” person is likely to…', choices: ['Share with others', 'Avoid all people', 'Lose things often', 'Speak only loudly'], answer: 0 }
];
const vocabularyItems = [
  { word: 'adapt', meaning: 'to change so something works better', choices: ['to change so something works better', 'to hide from everyone', 'to move very slowly', 'to copy a sound'], answer: 0 },
  { word: 'precise', meaning: 'exact and careful', choices: ['exact and careful', 'very colorful', 'hard to carry', 'full of surprises'], answer: 0 },
  { word: 'fortunate', meaning: 'having good luck', choices: ['having good luck', 'feeling tired', 'being uncertain', 'moving quickly'], answer: 0 }
];
const readingItem = { passage: 'Jordan noticed that the library was quieter than usual. Instead of rushing through the assignment, Jordan made a short plan, looked up two unfamiliar words, and asked for help with the hardest paragraph. By the end, the chapter felt less confusing.', question: 'Why did the chapter feel less confusing?', choices: ['Jordan skipped it.', 'Jordan used a plan and asked for help.', 'The library became louder.', 'The words disappeared.'], answer: 1 };

let state = { mode: null, questions: [], index: 0, answers: [], level: 'Not measured yet', chatMessages: [] };
const $ = (selector) => document.querySelector(selector);

function renderProgress() {
  const progress = window.progressStore.loadProgress();
  $('#current-level').textContent = progress.latestLevel;
  $('#session-count').textContent = `${progress.sessions} learning session${progress.sessions === 1 ? '' : 's'}`;
  $('#vocab-score').textContent = progress.vocabularyScore == null ? 'Not started' : `${progress.vocabularyScore}%`;
  $('#reading-score').textContent = progress.readingScore == null ? 'Not started' : `${progress.readingScore}%`;
  $('#path-score').textContent = progress.latestLevel === 'Not measured yet' ? 'Waiting for assessment' : 'Ready to practice';
}

async function refreshStatus() {
  $('#ollama-status').textContent = 'Checking local AI…';
  $('#status-dot').className = 'status-dot';
  try {
    const response = await fetch('/api/health');
    const data = await response.json();
    if (!data.ok) throw new Error(data.error);
    $('#status-dot').className = 'status-dot good';
    $('#ollama-status').textContent = `Local AI ready · ${data.model}`;
  } catch (error) {
    $('#status-dot').className = 'status-dot bad';
    $('#ollama-status').textContent = error.message || 'Ollama is offline. Start it and check again.';
  }
}

function openWorkspace(kicker, title) { $('#workspace').classList.remove('hidden'); $('#workspace-kicker').textContent = kicker; $('#workspace-title').textContent = title; $('#workspace').scrollIntoView({ behavior: 'smooth', block: 'start' }); }

function startAssessment() { state = { mode: 'initial', questions: initialQuestions, index: 0, answers: [], level: 'Not measured yet', chatMessages: [] }; openWorkspace('Starting point · 1 of 2', 'Let’s find your starting point'); renderQuestion(); }

function renderQuestion() {
  const question = state.questions[state.index];
  $('#question-count').textContent = `${state.index + 1} / ${state.questions.length}`;
  $('#workspace-content').innerHTML = `<div class="question"><h3>${question.prompt}</h3><div class="choice-grid">${question.choices.map((choice, index) => `<button class="choice" data-choice="${index}">${choice}</button>`).join('')}</div><div class="action-row"><span class="small-note">There is no time limit. Take a breath.</span><button class="primary" id="next-question" disabled>${state.index === state.questions.length - 1 ? 'See my result' : 'Next'} <span>→</span></button></div></div>`;
  let selected = null;
  document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-choice]').forEach((item) => item.classList.remove('selected')); button.classList.add('selected'); selected = Number(button.dataset.choice); $('#next-question').disabled = false; }));
  $('#next-question').addEventListener('click', () => { state.answers.push(selected); state.index += 1; if (state.index < state.questions.length) renderQuestion(); else finishQuestionSet(); });
}

function levelFor(score) { if (score < 40) return 'Foundations'; if (score < 70) return 'Growing'; if (score < 90) return 'Building confidence'; return 'Strong explorer'; }

function finishQuestionSet() {
  const score = Math.round((state.answers.filter((answer, index) => answer === state.questions[index].answer).length / state.questions.length) * 100);
  if (state.mode === 'initial') {
    state.level = levelFor(score);
    state.mode = 'refined'; state.questions = refinedQuestions; state.index = 0; state.answers = [];
    openWorkspace('Starting point · 2 of 2', 'A closer look at your next step');
    $('#workspace-content').innerHTML = `<div class="result"><h3>Your first check is complete.</h3><p>Now we’ll look a little closer around your range. This is a helpful estimate, not a permanent label.</p></div>`;
    setTimeout(renderQuestion, 900);
    return;
  }
  const refinedScore = Math.round((state.answers.filter((answer, index) => answer === state.questions[index].answer).length / state.questions.length) * 100);
  const finalLevel = levelFor(Math.round((refinedScore + (state.level === 'Strong explorer' ? 90 : 60)) / 2));
  const progress = window.progressStore.saveProgress({ sessions: window.progressStore.loadProgress().sessions + 1, latestLevel: finalLevel, assessmentScore: score, refinedScore });
  renderProgress();
  showPath(finalLevel, refinedScore, progress);
}

function showPath(level, score) { openWorkspace('Your personal path', 'Here is your next best step'); $('#question-count').textContent = 'Ready'; $('#workspace-content').innerHTML = `<div class="result"><h3>You are at: ${level}</h3><p>Your closer check was ${score}%. We’ll use this as a starting point and adjust as you practice.</p><div class="action-row"><span class="small-note">Your guide will make six multiple-choice questions.</span><button class="primary" id="open-guide">Make my 6-question practice <span>→</span></button></div></div>`; $('#open-guide').addEventListener('click', () => startAiPractice('mixed')); }

function startPractice(type) { startAiPractice(type); }

async function startAiPractice(type = 'mixed') {
  const progress = window.progressStore.loadProgress();
  if (progress.latestLevel === 'Not measured yet') return startAssessment();
  state.mode = 'ai-practice';
  state.practiceType = type;
  openWorkspace('Personal learning guide · Ollama', 'Making six multiple-choice problems');
  $('#question-count').textContent = 'Thinking…';
  $('#workspace-content').innerHTML = '<div class="result"><h3>Thinking…</h3><p>Your local AI is making six questions for your level. You will choose an answer for each one—no typing needed.</p></div>';
  try {
    const response = await fetch('/api/practice', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ level: progress.latestLevel, type }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'The AI could not make practice right now.');
    state.questions = data.questions;
    state.passage = data.passage;
    state.index = 0;
    state.answers = [];
    state.explanations = [];
    openWorkspace(type === 'reading' ? 'Reading trail · AI practice' : type === 'vocabulary' ? 'Vocabulary lab · AI practice' : 'Personal path · AI practice', data.title || 'Six questions made for you');
    renderAiQuestion();
  } catch (error) {
    $('#question-count').textContent = 'Needs attention';
    $('#workspace-content').innerHTML = `<div class="result"><h3>I couldn’t make the questions.</h3><p>${error.message} Make sure Ollama is running, then use “My AI path” to try again.</p></div>`;
  }
}

function renderAiQuestion() {
  const question = state.questions[state.index];
  $('#question-count').textContent = `${state.index + 1} / 6`;
  const passage = state.passage && state.index === 0 ? `<div class="result"><p><strong>Read this first:</strong> ${state.passage}</p></div>` : '';
  $('#workspace-content').innerHTML = `${passage}<div class="question"><h3>${question.prompt}</h3><div class="choice-grid">${question.choices.map((choice, index) => `<button class="choice" data-choice="${index}">${choice}</button>`).join('')}</div><div class="action-row"><span class="small-note">Choose one answer. You do not need to type.</span><button class="primary" id="next-question" disabled>${state.index === 5 ? 'Finish practice' : 'Next'} <span>→</span></button></div></div>`;
  let selected = null;
  document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-choice]').forEach((item) => item.classList.remove('selected')); button.classList.add('selected'); selected = Number(button.dataset.choice); $('#next-question').disabled = false; }));
  $('#next-question').addEventListener('click', () => { state.answers.push(selected); state.explanations.push(question.explanation); state.index += 1; if (state.index < 6) renderAiQuestion(); else finishAiPractice(); });
}

function finishAiPractice() {
  const score = Math.round((state.answers.filter((answer, index) => answer === state.questions[index].answer).length / 6) * 100);
  const progress = window.progressStore.loadProgress();
  const changes = state.practiceType === 'vocabulary' ? { vocabularyScore: score } : state.practiceType === 'reading' ? { readingScore: score } : {};
  window.progressStore.saveProgress(changes);
  renderProgress();
  openWorkspace('Practice complete', 'You finished your six-question path');
  $('#question-count').textContent = 'Complete';
  $('#workspace-content').innerHTML = `<div class="result"><h3>${score}% correct</h3><p>${score === 100 ? 'Excellent work—your choices show strong understanding.' : 'Nice effort. The next practice can focus on the skills that need more time.'}</p><div class="action-row"><span class="small-note">Your progress is saved on this computer.</span><button class="secondary" id="again-button">Make six more questions →</button></div></div>`;
  $('#again-button').addEventListener('click', () => startAiPractice(state.practiceType));
}
function renderPracticeQuestion(type) { const question = state.questions[state.index]; $('#question-count').textContent = `${state.index + 1} / ${state.questions.length}`; $('#workspace-content').innerHTML = `${type === 'reading' ? `<div class="result"><p>${readingItem.passage}</p></div>` : ''}<div class="question"><h3>${question.prompt}</h3><div class="choice-grid">${question.choices.map((choice, index) => `<button class="choice" data-choice="${index}">${choice}</button>`).join('')}</div><div class="action-row"><span class="small-note">Practice is for learning, not ranking.</span><button class="primary" id="next-question" disabled>${state.index === state.questions.length - 1 ? 'Finish' : 'Next'} <span>→</span></button></div></div>`; let selected = null; document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-choice]').forEach((item) => item.classList.remove('selected')); button.classList.add('selected'); selected = Number(button.dataset.choice); $('#next-question').disabled = false; })); $('#next-question').addEventListener('click', () => { state.answers.push(selected); state.index += 1; if (state.index < state.questions.length) renderPracticeQuestion(type); else { const score = Math.round((state.answers.filter((answer, index) => answer === state.questions[index].answer).length / state.questions.length) * 100); window.progressStore.saveProgress(type === 'vocabulary' ? { vocabularyScore: score } : { readingScore: score }); renderProgress(); openWorkspace(type === 'vocabulary' ? 'Vocabulary lab' : 'Reading trail', 'Nice work—notice what you learned'); $('#question-count').textContent = 'Complete'; $('#workspace-content').innerHTML = `<div class="result"><h3>${score}% correct</h3><p>${score === 100 ? 'You have a strong handle on this practice set.' : 'Every attempt gives you a clue about what to practice next.'}</p></div>`; } }); }

$('#start-button').addEventListener('click', startAssessment); $('#path-link').addEventListener('click', () => startAiPractice('mixed')); $('#refresh-status').addEventListener('click', refreshStatus); document.querySelectorAll('[data-practice]').forEach((button) => button.addEventListener('click', () => startPractice(button.dataset.practice))); renderProgress(); refreshStatus();
