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
const vocabularySeeds = [
  ['observe', 'to watch or notice carefully'], ['adapt', 'to change so something works in a new situation'], ['contrast', 'a clear difference between two things'], ['reluctant', 'not ready or willing to do something'], ['precise', 'exact and careful'], ['fortunate', 'having good luck'], ['ancient', 'very old'], ['approach', 'to move closer or deal with something'], ['arrange', 'to put things in a particular order'], ['brilliant', 'very bright or very clever'],
  ['capacity', 'the amount something can hold or do'], ['cease', 'to stop'], ['clarify', 'to make something easier to understand'], ['compel', 'to make someone feel they must act'], ['complex', 'made of many connected parts'], ['conclude', 'to decide or finish'], ['consequence', 'a result of an action'], ['consider', 'to think carefully about something'], ['constant', 'happening again and again without stopping'], ['consume', 'to use, eat, or drink'],
  ['contribute', 'to give or add something'], ['convince', 'to persuade someone that something is true'], ['create', 'to make something new'], ['decline', 'to become smaller, weaker, or lower'], ['demonstrate', 'to show clearly'], ['diminish', 'to become or make less'], ['distinct', 'clearly different'], ['distribute', 'to give out or spread around'], ['evident', 'easy to see or understand'], ['expand', 'to become larger'],
  ['external', 'coming from outside'], ['frequent', 'happening often'], ['generate', 'to produce or create'], ['gradual', 'happening slowly over time'], ['identify', 'to recognize or name'], ['illustrate', 'to explain or show with an example'], ['impact', 'a strong effect or influence'], ['include', 'to contain as a part'], ['indicate', 'to point out or show'], ['interpret', 'to explain the meaning of something'],
  ['investigate', 'to examine carefully to find facts'], ['maintain', 'to keep something in good condition'], ['method', 'a way of doing something'], ['modify', 'to change slightly'], ['obtain', 'to get or receive'], ['occur', 'to happen'], ['participate', 'to take part'], ['perceive', 'to notice or understand'], ['persist', 'to continue despite difficulty'], ['potential', 'possible or able to develop'],
  ['principle', 'a basic rule or belief'], ['proceed', 'to continue or move forward'], ['require', 'to need something'], ['resolve', 'to solve a problem'], ['restrict', 'to limit or control'], ['significant', 'important or meaningful'], ['similar', 'almost the same'], ['specific', 'clearly identified or exact'], ['substitute', 'a person or thing used in place of another'], ['sufficient', 'enough for a purpose'],
  ['tradition', 'a custom passed through time'], ['transform', 'to change greatly'], ['unique', 'one of a kind'], ['valid', 'based on sound evidence or logic'], ['vary', 'to be different or change'], ['accurate', 'correct and free from mistakes'], ['analyze', 'to examine parts to understand the whole'], ['anticipate', 'to expect or prepare for something'], ['benefit', 'a helpful result or advantage'], ['challenge', 'a difficult task or problem'],
  ['collaborate', 'to work together'], ['communicate', 'to share information or ideas'], ['compare', 'to look at how things are alike or different'], ['concentrate', 'to focus attention'], ['conflict', 'a serious disagreement or struggle'], ['construct', 'to build or form'], ['context', 'the information around something that helps explain it'], ['cooperate', 'to work well with others'], ['curious', 'wanting to learn or know more'], ['deduce', 'to reach an answer from clues'],
  ['describe', 'to tell what something is like'], ['determine', 'to find out or decide'], ['emerge', 'to come into view or become known'], ['emphasize', 'to give extra importance to'], ['estimate', 'an educated guess'], ['evaluate', 'to judge the quality or value'], ['exclude', 'to leave out'], ['flexible', 'able to change or bend easily'], ['focus', 'the center of attention'], ['illustrate', 'to make an idea clear with an example'],
  ['infer', 'to figure out from evidence'], ['innovate', 'to introduce a new idea or method'], ['logical', 'using clear and sensible reasoning'], ['motivate', 'to give a reason or desire to act'], ['neutral', 'not taking either side'], ['objective', 'based on facts rather than feelings'], ['organize', 'to arrange in a useful order'], ['perspective', 'a particular way of seeing something'], ['predict', 'to say what may happen'], ['relevant', 'connected to the subject'],
  ['sequence', 'the order in which things happen'], ['summarize', 'to give the main points briefly'], ['support', 'to provide evidence or help'], ['theme', 'a central idea in a work'], ['thorough', 'complete and careful'], ['tone', 'the feeling or attitude in words'], ['transparent', 'easy to see through or understand'], ['verify', 'to check that something is true'], ['wisdom', 'good judgment gained from experience'], ['resource', 'a useful source of help or information']
];
const vocabularyPath = vocabularySeeds.map(([word, meaning], index) => ({ word, meaning, example: `Use “${word}” when talking about ${meaning}.`, skill: ['Meaning', 'Context', 'Sentence use', 'Reading clues'][index % 4] }));
const readingSeeds = [
  ['The Library Window', 'Jordan made a short plan, looked up two unfamiliar words, and asked for help with the hardest paragraph. By the end, the chapter felt less confusing.', 'Why did the chapter feel less confusing?', ['Jordan skipped it.', 'Jordan used a plan and asked for help.', 'The library became louder.', 'The words disappeared.'], 1],
  ['A Small Change', 'Every afternoon, Lena placed a bowl of water near the garden. After several days, more birds arrived, and Lena began writing down their colors and songs.', 'What did Lena’s habit help her do?', ['Notice more details', 'Close the garden', 'Forget the birds', 'Make afternoons shorter'], 0],
  ['The Seed Box', 'Kai found a box of seeds in a drawer. The label was faded, so Kai planted a few in different places and recorded what happened each week.', 'Why did Kai plant the seeds in different places?', ['To compare the results', 'To hide the drawer', 'To avoid writing', 'To make the label darker'], 0],
  ['Rain on the Field', 'The soccer team expected a sunny afternoon, but rain began before practice. The coach moved the drills into the gym and changed the plan.', 'What did the coach do?', ['Canceled every activity', 'Changed the plan for the weather', 'Sent everyone home immediately', 'Waited for the field to dry'], 1],
  ['The Map Room', 'Mara studied a map before the museum visit. She noticed that the science exhibit was far from the entrance, so she chose it as the first stop.', 'Why did Mara choose the science exhibit first?', ['It was near the entrance', 'The map showed it was far away', 'She disliked maps', 'The museum was closed'], 1],
  ['A Helpful Note', 'On the bus, Theo wrote a note explaining where the new stop was. Another passenger used the note and thanked Theo for making the directions clear.', 'What made the note useful?', ['It was very long', 'It explained the new location clearly', 'It used no words', 'It changed the bus route'], 1],
  ['The Quiet Contest', 'Nia practiced a piano passage slowly instead of playing it quickly. She marked the difficult measures and repeated them until the rhythm became steady.', 'How did Nia practice?', ['She skipped the difficult parts', 'She practiced slowly and repeated hard parts', 'She only listened to others', 'She changed the song'], 1],
  ['The Missing Button', 'When a button fell from his coat, Luis kept it in his pocket. At home, he matched it with a spare button and fixed the coat before the next cold morning.', 'What did Luis do with the button?', ['He threw it away', 'He used a spare to repair the coat', 'He sold the coat', 'He lost the coat'], 1],
  ['The Long Trail', 'The trail marker pointed uphill. Priya wanted to turn back, but the group checked their water, divided the distance into smaller parts, and continued carefully.', 'How did the group handle the trail?', ['They ignored their supplies', 'They divided the challenge into smaller parts', 'They ran without stopping', 'They removed the marker'], 1],
  ['The Borrowed Camera', 'Ari borrowed a camera for a class project. Before using it, Ari read the instructions and practiced taking pictures of objects with different lighting.', 'Why did Ari read the instructions?', ['To learn how to use the camera', 'To avoid taking pictures', 'To change the class project', 'To make the camera heavier'], 0],
  ['The Community Garden', 'Neighbors shared tools and chose different jobs in the community garden. Some planted seeds while others built a sign and watered the rows.', 'What did the neighbors share?', ['Only the sign', 'Tools and jobs', 'A single plant', 'Their houses'], 1],
  ['The New Recipe', 'Sofia followed a recipe but noticed that the soup was too salty. She added more vegetables and water, then tasted it again before serving it.', 'What problem did Sofia solve?', ['The soup was too cold', 'The soup was too salty', 'The vegetables were missing', 'The recipe was too short'], 1],
  ['The Science Model', 'For the model, Ben used paper, tape, and a small fan. The first design fell over, so Ben widened the base and tested it again.', 'What change improved the model?', ['A narrower base', 'A wider base', 'Less testing', 'Removing the fan'], 1],
  ['The Old Photograph', 'A photograph showed a street with fewer buildings than today. Elena compared it with a current map and noticed how the neighborhood had changed.', 'What did Elena compare?', ['Two recipes', 'An old photograph and a current map', 'Two songs', 'A plant and a building'], 1],
  ['The Team Plan', 'The group had four tasks and one afternoon. They listed the tasks, estimated the time for each, and assigned jobs before beginning.', 'What did the group do first?', ['They assigned no jobs', 'They made a plan', 'They left immediately', 'They erased the tasks'], 1],
  ['The River Stones', 'Sam wanted to cross the shallow river. Sam watched where the water moved slowly, selected flat stones, and tested each step before moving forward.', 'How did Sam choose where to step?', ['By watching the water and testing stones', 'By running quickly', 'By closing their eyes', 'By moving the river'], 0],
  ['The Museum Label', 'A label beside the painting used a word that June did not know. June looked at the nearby description and used the sentence around the word to make a careful guess.', 'What helped June understand the word?', ['The color of the wall', 'The surrounding description', 'A loud announcement', 'A different painting outside'], 1],
  ['The Early Train', 'The train schedule changed for the weekend. Omar checked the new time the night before and arrived at the station early.', 'Why did Omar check the schedule?', ['The time had changed', 'The station was a museum', 'The train had no schedule', 'The weekend was canceled'], 0],
  ['The Repaired Kite', 'After the kite string broke, Mei tied a stronger knot and tested it in a small breeze. The kite stayed steady, so Mei took it to the open field.', 'Why did Mei test the kite first?', ['To see if the repair worked', 'To make the breeze stop', 'To shorten the field', 'To lose the string'], 0],
  ['The New Neighbor', 'A new family moved into the neighborhood. Amara noticed they were still learning the bus routes, so she drew a simple map with the closest stops and shops.', 'How did Amara help?', ['She drew a useful map', 'She changed the buses', 'She removed the shops', 'She ignored the routes'], 0]
];
const readingBooks = readingSeeds.map(([title, passage, prompt, choices, answer]) => ({ title, author: 'Sample passage', passage, questions: [{ prompt, choices, answer }] }));

let state = { mode: null, questions: [], index: 0, answers: [], level: 'Not measured yet', chatMessages: [] };
let speechRecognition = null;
const $ = (selector) => document.querySelector(selector);
const API_BASE = window.location.protocol === 'file:' ? 'http://127.0.0.1:3000' : '';

function renderProgress() {
  const progress = window.progressStore.loadProgress();
  $('#current-level').textContent = progress.latestLevel;
  $('#session-count').textContent = `${progress.sessions} learning session${progress.sessions === 1 ? '' : 's'}`;
  $('#vocab-score').textContent = progress.vocabularyScore == null ? 'Not started' : `${progress.vocabularyScore}%`;
  $('#reading-score').textContent = progress.readingScore == null ? 'Not started' : `${progress.readingScore}%`;
  $('#path-score').textContent = progress.latestLevel === 'Not measured yet' ? 'Not assessed' : 'Available';
}

async function refreshStatus() {
  $('#ollama-status').textContent = 'Checking assistant status…';
  try {
    const response = await fetch(`${API_BASE}/api/health`);
    const data = await response.json();
    if (!data.ok) throw new Error(data.error);
    $('#ollama-status').textContent = 'Ready';
  } catch (error) {
    $('#ollama-status').textContent = 'Unavailable';
  }
}

function openWorkspace(kicker, title) { $('#workspace').classList.remove('hidden'); $('#workspace-kicker').textContent = kicker; $('#workspace-title').textContent = title; $('#workspace').scrollIntoView({ behavior: 'smooth', block: 'start' }); }

function startAssessment() { state = { mode: 'initial', questions: initialQuestions, index: 0, answers: [], level: 'Not measured yet', chatMessages: [] }; openWorkspace('Assessment · Part 1', 'English skills assessment'); renderQuestion(); }

function renderQuestion() {
  const question = state.questions[state.index];
  $('#question-count').textContent = `${state.index + 1} / ${state.questions.length}`;
  $('#workspace-content').innerHTML = `<div class="question"><h3>${question.prompt}</h3><div class="choice-grid">${question.choices.map((choice, index) => `<button class="choice" data-choice="${index}">${choice}</button>`).join('')}</div><div class="action-row"><span class="small-note">Select one answer.</span><button class="primary" id="next-question" disabled>${state.index === state.questions.length - 1 ? 'Continue' : 'Next'} <span>→</span></button></div></div>`;
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
    openWorkspace('Assessment · Part 2', 'Focused assessment');
    $('#workspace-content').innerHTML = `<div class="result"><h3>Part 1 complete.</h3><p>The second part contains questions in a narrower range.</p></div>`;
    setTimeout(renderQuestion, 900);
    return;
  }
  const refinedScore = Math.round((state.answers.filter((answer, index) => answer === state.questions[index].answer).length / state.questions.length) * 100);
  const finalLevel = levelFor(Math.round((refinedScore + (state.level === 'Strong explorer' ? 90 : 60)) / 2));
  const progress = window.progressStore.saveProgress({ sessions: window.progressStore.loadProgress().sessions + 1, latestLevel: finalLevel, assessmentScore: score, refinedScore });
  renderProgress();
  showPath(finalLevel, refinedScore, progress);
}

function showPath(level, score) { openWorkspace('Assessment result', 'Estimated level'); $('#question-count').textContent = 'Complete'; $('#workspace-content').innerHTML = `<div class="result"><h3>${level}</h3><p>Focused assessment score: ${score}%.</p><div class="action-row"><span class="small-note">Generated practice contains six multiple-choice questions.</span><button class="primary" id="open-guide">Open practice <span>→</span></button></div></div>`; $('#open-guide').addEventListener('click', () => startAiPractice('mixed')); }

function startPractice(type) { if (type === 'chat') return openChat(); startAiPractice(type); }

function openChat() {
  state.mode = 'chat';
  state.chatHistory = [];
  state.chatContext = state.chatContext || '';
  openWorkspace('Questions', 'Question');
  $('#question-count').textContent = 'Optional';
  $('#workspace-content').innerHTML = '<div class="chat-log" id="chat-log"><div class="bubble guide">Ask about a word, sentence, or reading passage.</div></div><form class="chat-form" id="chat-form"><input id="chat-input" autocomplete="off" placeholder="Ask a question" /><button class="primary" id="chat-send">Send <span>→</span></button></form>';
  $('#chat-form').addEventListener('submit', sendChat);
}

async function sendMessage(message) {
  addBubble('student', message);
  addBubble('guide', 'Thinking…');
  const sendButton = $('#chat-send');
  if (sendButton) sendButton.disabled = true;
  try {
    const response = await fetch(`${API_BASE}/api/ai`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, context: state.chatContext || '', history: state.chatHistory || [] }) });
    const data = await response.json();
    const thinking = [...document.querySelectorAll('.bubble.guide')].pop();
    if (thinking) thinking.textContent = data.answer || data.error || 'The guide could not answer.';
    if (data.answer) { state.chatHistory = [...(state.chatHistory || []), { role: 'user', content: message }, { role: 'assistant', content: data.answer }].slice(-8); }
  } catch {
    const thinking = [...document.querySelectorAll('.bubble.guide')].pop();
    if (thinking) thinking.textContent = 'The assistant is unavailable. Try again.';
  } finally {
    if (sendButton) sendButton.disabled = false;
  }
}

function addBubble(kind, text) { const log = $('#chat-log'); if (!log) return; const bubble = document.createElement('div'); bubble.className = `bubble ${kind}`; bubble.textContent = text; log.appendChild(bubble); log.scrollTop = log.scrollHeight; }
function sendChat(event) { event.preventDefault(); const input = $('#chat-input'); const message = input.value.trim(); if (!message) return; input.value = ''; sendMessage(message); }

function showVocabularyPage() {
  openWorkspace('Vocabulary', 'Word path');
  $('#question-count').textContent = `${vocabularyPath.length} words`;
  $('#workspace-content').innerHTML = `<p class="muted">Select a point on the path.</p><div class="word-path">${vocabularyPath.map((item, index) => `<button class="word-dot" data-word-index="${index}" aria-label="${item.word}">${index + 1}</button>`).join('')}</div><div id="word-detail" class="result"><h3>${vocabularyPath[0].word}</h3><p>${vocabularyPath[0].meaning}</p><p><strong>Example:</strong> ${vocabularyPath[0].example}</p><small>${vocabularyPath[0].skill}</small></div>`;
  document.querySelectorAll('[data-word-index]').forEach((button) => button.addEventListener('click', () => { const item = vocabularyPath[Number(button.dataset.wordIndex)]; $('#word-detail').innerHTML = `<h3>${item.word}</h3><p>${item.meaning}</p><p><strong>Example:</strong> ${item.example}</p><small>${item.skill}</small>`; }));
}

function showReadingPage() {
  openWorkspace('Reading', 'Books');
  $('#question-count').textContent = `${readingBooks.length} books`;
  $('#workspace-content').innerHTML = `<p class="muted">Choose a passage.</p><div class="book-list">${readingBooks.map((book, index) => `<button class="book-item" data-book-index="${index}"><strong>${book.title}</strong><span>${book.author}</span></button>`).join('')}</div>`;
  document.querySelectorAll('[data-book-index]').forEach((button) => button.addEventListener('click', () => openBook(Number(button.dataset.bookIndex))));
}

function openBook(index) {
  const book = readingBooks[index];
  state.currentBook = book;
  state.readingTranscript = '';
  openWorkspace('Reading', book.title);
  $('#question-count').textContent = 'Read aloud';
  $('#workspace-content').innerHTML = `<article class="book-page"><p>${book.passage}</p></article><div class="reading-tools"><button class="primary" id="start-reading">Start reading aloud</button><button class="secondary" id="stop-reading" disabled>Stop</button><span id="speech-status" class="small-note">No recording</span></div><div class="result"><h3>Transcript</h3><p id="reading-transcript">Your spoken words will appear here.</p><button class="secondary" id="rate-reading" disabled>Rate reading</button><p id="reading-feedback" class="small-note"></p></div><div class="result"><h3>Questions</h3><div id="book-questions">${book.questions.map((question, qIndex) => `<div class="book-question"><p><strong>${qIndex + 1}.</strong> ${question.prompt}</p><div class="choice-grid">${question.choices.map((choice, choiceIndex) => `<button class="choice" data-book-question="${qIndex}" data-book-choice="${choiceIndex}">${choice}</button>`).join('')}</div></div>`).join('')}</div><div class="action-row"><button class="primary" id="check-book">Check answers</button><span id="book-score" class="small-note"></span></div></div>`;
  document.querySelectorAll('[data-book-question]').forEach((button) => button.addEventListener('click', () => { const qIndex = Number(button.dataset.bookQuestion); document.querySelectorAll(`[data-book-question="${qIndex}"]`).forEach((item) => item.classList.remove('selected')); button.classList.add('selected'); }));
  $('#start-reading').addEventListener('click', startReadingAloud); $('#stop-reading').addEventListener('click', stopReadingAloud); $('#rate-reading').addEventListener('click', rateReading); $('#check-book').addEventListener('click', () => { const score = book.questions.reduce((total, question, qIndex) => total + (Number(document.querySelector(`[data-book-question="${qIndex}"].selected`)?.dataset.bookChoice) === question.answer ? 1 : 0), 0); $('#book-score').textContent = `${score} / ${book.questions.length} correct`; });
}

function startReadingAloud() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) { $('#speech-status').textContent = 'Speech recognition is not available in this browser.'; return; }
  const recognition = new Recognition(); speechRecognition = recognition; recognition.continuous = true; recognition.interimResults = true; recognition.lang = 'en-US';
  recognition.onstart = () => { $('#speech-status').textContent = 'Listening'; $('#start-reading').disabled = true; $('#stop-reading').disabled = false; };
  recognition.onresult = (event) => { state.readingTranscript = Array.from(event.results).map((result) => result[0].transcript).join(' '); $('#reading-transcript').textContent = state.readingTranscript; $('#rate-reading').disabled = !state.readingTranscript.trim(); };
  recognition.onerror = () => { $('#speech-status').textContent = 'Speech recognition stopped.'; $('#start-reading').disabled = false; $('#stop-reading').disabled = true; };
  recognition.onend = () => { $('#speech-status').textContent = state.readingTranscript ? 'Transcript ready' : 'No recording'; $('#start-reading').disabled = false; $('#stop-reading').disabled = true; };
  recognition.start();
}

function stopReadingAloud() { if (speechRecognition) speechRecognition.stop(); }
async function rateReading() { const feedback = $('#reading-feedback'); feedback.textContent = 'Rating…'; $('#rate-reading').disabled = true; try { const response = await fetch(`${API_BASE}/api/ai`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Rate this read-aloud transcript for a middle-school English learner. Give a short, kind score from 1 to 5 for fluency and one specific next practice tip.', context: `Book passage: ${state.currentBook.passage}\nStudent transcript: ${state.readingTranscript}` }) }); const data = await response.json(); feedback.textContent = data.answer || data.error || 'No rating available.'; } catch { feedback.textContent = 'The reading rating is unavailable.'; } finally { $('#rate-reading').disabled = false; } }

async function startAiPractice(type = 'mixed') {
  if (type === 'ai') type = 'mixed';
  const progress = window.progressStore.loadProgress();
  if (type !== 'test' && progress.latestLevel === 'Not measured yet') return startAssessment();
  state.mode = 'ai-practice';
  state.practiceType = type;
  openWorkspace('Practice set', 'Generating questions');
  $('#question-count').textContent = 'Thinking…';
  $('#workspace-content').innerHTML = '<div class="result"><h3>Generating questions.</h3><p>Six multiple-choice questions are being prepared.</p></div>';
  try {
    const response = await fetch(`${API_BASE}/api/practice`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ level: type === 'test' ? 'Not assessed yet' : progress.latestLevel, type: type === 'test' ? 'mixed' : type }) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'The AI could not make practice right now.');
    state.questions = data.questions;
    state.passage = data.passage;
    state.index = 0;
    state.answers = [];
    state.explanations = [];
    openWorkspace(type === 'reading' ? 'Reading' : type === 'vocabulary' ? 'Vocabulary' : 'Practice set', data.title || 'Questions');
    renderAiQuestion();
  } catch (error) {
    $('#question-count').textContent = 'Needs attention';
    $('#workspace-content').innerHTML = `<div class="result"><h3>Questions unavailable.</h3><p>${error.message}</p><button class="primary" id="retry-ai">Try again <span>↻</span></button></div>`;
    $('#retry-ai').addEventListener('click', () => startAiPractice(type));
  }
}

function renderAiQuestion() {
  const question = state.questions[state.index];
  $('#question-count').textContent = `${state.index + 1} / 6`;
  const passage = state.passage && state.index === 0 ? `<div class="result"><p><strong>Read this first:</strong> ${state.passage}</p></div>` : '';
  $('#workspace-content').innerHTML = `${passage}<div class="question"><h3>${question.prompt}</h3><div class="choice-grid">${question.choices.map((choice, index) => `<button class="choice" data-choice="${index}">${choice}</button>`).join('')}</div><div class="action-row"><button class="secondary" id="ask-current-question">Ask about question</button><button class="primary" id="next-question" disabled>${state.index === 5 ? 'Finish' : 'Next'} <span>→</span></button></div><p class="small-note">Select one answer.</p></div>`;
  let selected = null;
  $('#ask-current-question').addEventListener('click', () => { state.chatContext = `Practice type: ${state.practiceType || 'personal path'}\nQuestion ${state.index + 1} of 6: ${question.prompt}\nChoices: ${question.choices.join(' | ')}\nThe student wants help with this exact question. Give a hint or explain the skill without giving away the answer unless they ask for the answer.`; openChat(); });
  document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-choice]').forEach((item) => item.classList.remove('selected')); button.classList.add('selected'); selected = Number(button.dataset.choice); $('#next-question').disabled = false; }));
  $('#next-question').addEventListener('click', () => { state.answers.push(selected); state.explanations.push(question.explanation); state.index += 1; if (state.index < 6) renderAiQuestion(); else finishAiPractice(); });
}

function finishAiPractice() {
  const score = Math.round((state.answers.filter((answer, index) => answer === state.questions[index].answer).length / 6) * 100);
  const progress = window.progressStore.loadProgress();
  const changes = state.practiceType === 'vocabulary' ? { vocabularyScore: score } : state.practiceType === 'reading' ? { readingScore: score } : state.practiceType === 'test' ? { assessmentScore: score, latestLevel: levelFor(score), sessions: progress.sessions + 1 } : {};
  window.progressStore.saveProgress(changes);
  renderProgress();
  openWorkspace('Practice result', 'Score');
  $('#question-count').textContent = 'Complete';
  const review = state.questions.map((question, index) => `Q${index + 1}: ${question.prompt} Student choice: ${question.choices[state.answers[index]] || 'none'}. Correct choice: ${question.choices[question.answer]}.`).join('\n');
  $('#workspace-content').innerHTML = `<div class="result"><h3>${score}% correct</h3><p>Review the questions or generate another set.</p><div class="action-row"><button class="secondary" id="review-button">Review with assistant →</button><button class="secondary" id="again-button">Generate another set →</button></div></div>`;
  $('#review-button').addEventListener('click', () => { state.chatContext = `The student just completed a connected six-question ${state.practiceType || 'personal'} practice. Here is the review:\n${review}\nHelp the student notice patterns and choose what to practice next.`; openChat(); });
  $('#again-button').addEventListener('click', () => startAiPractice(state.practiceType));
}
function showProgressPage() {
  const progress = window.progressStore.loadProgress();
  $('#home-content').classList.add('hidden');
  openWorkspace('Progress', 'Results');
  $('#question-count').textContent = 'Saved here';
  $('#workspace-content').innerHTML = `<div class="result"><h3>${progress.latestLevel}</h3><p>Sessions: ${progress.sessions}</p><p>Vocabulary: ${progress.vocabularyScore == null ? 'Not started' : `${progress.vocabularyScore}%`}</p><p>Reading: ${progress.readingScore == null ? 'Not started' : `${progress.readingScore}%`}</p></div>`;
}

function showPage(page) {
  document.querySelectorAll('.top-tab').forEach((button) => button.classList.toggle('active', button.dataset.page === page));
  if (page === 'home') { $('#home-content').classList.remove('hidden'); $('#workspace').classList.add('hidden'); return; }
  $('#home-content').classList.add('hidden');
  if (page === 'vocabulary') return showVocabularyPage();
  if (page === 'reading') return showReadingPage();
  if (page === 'practice') return startAiPractice('test');
  if (page === 'questions') return openChat();
  if (page === 'progress') return showProgressPage();
}

document.querySelectorAll('.top-tab').forEach((button) => button.addEventListener('click', () => showPage(button.dataset.page)));
$('#refresh-status').addEventListener('click', refreshStatus);
renderProgress(); refreshStatus();
