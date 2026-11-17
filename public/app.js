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
const vocabularyPath = Array.from({ length: 250 }, (_, index) => {
  const [word, meaning] = vocabularySeeds[index % vocabularySeeds.length];
  return { word, meaning, example: `Use “${word}” when talking about ${meaning}.`, skill: ['Meaning', 'Context', 'Sentence use', 'Reading clues'][index % 4] };
});
const vocabularyNodes = vocabularyPath.flatMap((item, index) => [
  { type: 'lesson', lessonIndex: index, label: item.word },
  ...((index + 1) % 10 === 0 ? [{ type: 'checkpoint', checkpointIndex: (index + 1) / 10, label: `Checkpoint ${(index + 1) / 10}` }] : [])
]);
const lessonNodeIndex = (lessonIndex) => lessonIndex + Math.floor(lessonIndex / 10);
const checkpointNodeIndex = (checkpointIndex) => checkpointIndex * 10 + checkpointIndex - 1;
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
  ['The New Neighbor', 'A new family moved into the neighborhood. Amara noticed they were still learning the bus routes, so she drew a simple map with the closest stops and shops.', 'How did Amara help?', ['She drew a useful map', 'She changed the buses', 'She removed the shops', 'She ignored the routes'], 0],
  ['The Winter Birds', 'When the weather became colder, Jalen placed seeds near the window and kept a list of the birds that visited. The list grew as the season changed.', 'What did Jalen keep?', ['A list of visiting birds', 'A map of the library', 'A list of recipes', 'A box of tools'], 0],
  ['The Helpful Diagram', 'Rosa could not understand the machine from the paragraph alone. A diagram showed how each part connected, and the process became easier to explain.', 'What helped Rosa?', ['A diagram of the parts', 'A longer paragraph', 'A broken machine', 'A new classroom'], 0],
  ['The Rain Gauge', 'For a weather project, Eli checked a rain gauge at the same time each morning. After a week, Eli compared the measurements and found the rainiest day.', 'What did Eli compare?', ['Daily rain measurements', 'Different books', 'Morning buses', 'Classroom colors'], 0],
  ['The Rehearsal Plan', 'The play had several scenes, so the director wrote a schedule. The cast practiced each scene in order and saved the final scene for the end.', 'Why did the director write a schedule?', ['To organize practice', 'To remove every scene', 'To change the actors', 'To shorten the stage'], 0],
  ['The Recycled Poster', 'Instead of throwing away old paper, Noor turned the blank backs into a poster about saving water. The class added drawings and facts.', 'What did Noor reuse?', ['The blank backs of old paper', 'A broken chair', 'A full water bottle', 'A stage curtain'], 0],
  ['The Field Guide', 'Mateo carried a field guide during a walk. When he saw a leaf he did not recognize, he compared its shape with the pictures before naming it.', 'How did Mateo identify the leaf?', ['By comparing it with pictures', 'By asking the leaf', 'By guessing without looking', 'By changing its shape'], 0],
  ['The Practice Timer', 'Ava used a timer to practice a speech in short sections. She listened to each recording and changed the parts that sounded unclear.', 'What did Ava change?', ['Parts that sounded unclear', 'The speech topic every minute', 'The timer batteries', 'The room’s windows'], 0],
  ['The Shared Shelf', 'Students placed finished books on a shared shelf with a short note about each one. The notes helped classmates choose books that matched their interests.', 'What was the purpose of the notes?', ['To help classmates choose books', 'To hide the books', 'To count the shelves', 'To change the stories'], 0]
];
function expandReadingPassage(passage, title) {
  return `${passage} The setting gives the reader a clear place to begin. The main character notices something that needs attention. These details introduce the problem in the passage. They also give the reader a reason to keep reading.\n\nThe next step follows from that first observation. The character makes a choice and learns from what happens. Small details show why the choice matters. The choice changes what happens next. The middle of the passage gives clues about the main idea.\n\nBy the end, the situation has changed in a useful way. The reader can use the details to think about the main idea. The ending connects back to the earlier events. It also leaves a question for the reader to consider. ${title} leaves one idea to remember.`;
}
const readingBooks = readingSeeds.map(([title, passage, prompt, choices, answer]) => ({ title, author: 'Reading selection', passage: expandReadingPassage(passage, title), questions: [{ prompt, choices, answer }] }));

let state = { mode: null, questions: [], index: 0, answers: [], level: 'Not measured yet', chatMessages: [] };
let speechRecognition = null;
const $ = (selector) => document.querySelector(selector);
const API_BASE = window.location.protocol === 'file:' ? 'http://127.0.0.1:3000' : '';
const escapeHtml = (value) => String(value ?? '').replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' })[character]);
const icon = (name) => `<span class="material-symbols-rounded" aria-hidden="true">${name}</span>`;

function showLockedLevelMessage() {
  openWorkspace('Vocabulary', 'Locked level');
  $('#question-count').textContent = 'Locked';
  $('#workspace-content').innerHTML = `<div class="locked-level-message"><img src="locked-level.webp" alt="A serious-looking white cat" /><h3>Get your levels right.</h3><p>Finish the lessons before this level to unlock it.</p><button class="secondary" id="back-to-path">Back to path</button></div>`;
  $('#back-to-path').addEventListener('click', showVocabularyPage);
}

function scoreFeedback(score) {
  if (score <= 20) return { message: 'Get your grades up.', alt: 'Cat photo for a score from 0 to 20 percent', image: 'score-cat-low.jpg' };
  if (score <= 50) return { message: 'Not good.', alt: 'Cat photo for a score from 21 to 50 percent', image: 'score-cat-midlow.jpg' };
  if (score <= 70) return { message: 'Not bad.', alt: 'Cat photo for a score from 51 to 70 percent', image: 'score-cat-midhigh.jpg' };
  return { message: 'Good job.', alt: 'Cat photo for a score from 71 to 100 percent', image: 'score-cat-high.jpg' };
}

function scoreFeedbackMarkup(score) {
  const feedback = scoreFeedback(score);
  return `<div class="score-feedback"><img src="${feedback.image}" alt="${feedback.alt}" /><strong>${feedback.message}</strong></div>`;
}

function normalizePracticeQuestions(data) {
  if (!Array.isArray(data?.questions) || data.questions.length < 6) throw new Error('The AI returned fewer than six questions. Try again.');
  const questions = data.questions.slice(0, 6).map((question) => {
    const choices = Array.isArray(question.choices) ? question.choices.map((choice) => typeof choice === 'object' ? choice.option || choice.text || choice.label || choice.value || '' : choice).map(String).slice(0, 4) : [];
    const answer = Number(question.answer);
    if (choices.length !== 4 || !Number.isInteger(answer) || answer < 0 || answer > 3) throw new Error('The AI returned an incomplete question. Try again.');
    return { skill: String(question.skill || 'General English'), prompt: String(question.prompt || 'Choose the best answer.'), choices, answer, explanation: String(question.explanation || 'Review the answer and try the next question.') };
  });
  return questions;
}

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
    $('#ollama-status').textContent = window.location.protocol === 'file:' ? 'Run npm start to use AI' : 'Unavailable';
  }
}

function openWorkspace(kicker, title) { $('#workspace').classList.remove('hidden'); $('#workspace-kicker').textContent = kicker; $('#workspace-title').textContent = title; $('#workspace').scrollIntoView({ behavior: 'smooth', block: 'start' }); }

function startAssessment() { return startReadingLevelCheck(); }

function renderQuestion() {
  const question = state.questions[state.index];
  if (!question) return showWorkspaceError('This question could not be loaded. Please return to the home page and try again.');
  $('#question-count').textContent = `${state.index + 1} / ${state.questions.length}`;
  const passage = state.passage && state.index === 0 ? `<div class="result"><p><strong>Read this passage first:</strong> ${escapeHtml(state.passage)}</p></div>` : '';
  $('#workspace-content').innerHTML = `${passage}<div class="question"><h3>${escapeHtml(question.prompt)}</h3><div class="choice-grid">${question.choices.map((choice, index) => `<button class="choice" data-choice="${index}">${escapeHtml(choice)}</button>`).join('')}</div><div class="action-row"><span class="small-note">Select one answer.</span><button class="primary" id="next-question" disabled>${state.index === state.questions.length - 1 ? 'Finish check' : 'Next'} ${icon('arrow_forward')}</button></div></div>`;
  let selected = null;
  document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-choice]').forEach((item) => item.classList.remove('selected')); button.classList.add('selected'); selected = Number(button.dataset.choice); $('#next-question').disabled = false; }));
  $('#next-question').addEventListener('click', () => { state.answers.push(selected); state.index += 1; if (state.index < state.questions.length) renderQuestion(); else finishQuestionSet(); });
}

function levelFor(score) { if (score < 40) return 'Foundations'; if (score < 70) return 'Growing'; if (score < 90) return 'Building confidence'; return 'Strong explorer'; }

function finishQuestionSet() {
  const score = Math.round((state.answers.filter((answer, index) => answer === state.questions[index].answer).length / state.questions.length) * 100);
  if (state.mode === 'reading-level') {
    const progress = window.progressStore.loadProgress();
    const weakSkills = { ...(progress.weakSkills || {}) };
    state.questions.forEach((question, index) => { if (state.answers[index] !== question.answer) { const skill = question.skill || 'Reading'; weakSkills[skill] = (weakSkills[skill] || 0) + 1; } });
    const level = levelFor(score);
    window.progressStore.saveProgress({ sessions: progress.sessions + 1, latestLevel: level, assessmentScore: score, refinedScore: score, readingScore: score, weakSkills });
    renderProgress();
    showReadingLevelResult(level, score);
    return;
  }
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

async function startReadingLevelCheck() {
  state = { mode: 'reading-level', questions: [], index: 0, answers: [], level: 'Not measured yet', chatMessages: [], passage: '' };
  openWorkspace('Reading level check', 'Find your starting level');
  $('#question-count').textContent = 'Preparing…';
  $('#workspace-content').innerHTML = '<div class="result"><h3>Preparing six reading questions.</h3><p>The local assistant is making a short passage and questions for you.</p></div>';
  try {
    const response = await fetch(`${API_BASE}/api/practice`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ level: 'Not measured yet', type: 'reading', weakSkills: {} }), signal: AbortSignal.timeout(50000) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'The reading check is unavailable right now.');
    state.questions = normalizePracticeQuestions(data);
    state.passage = data.passage || '';
    state.index = 0;
    state.answers = [];
    renderQuestion();
  } catch (error) {
    $('#question-count').textContent = 'Needs attention';
    $('#workspace-content').innerHTML = `<div class="result"><h3>Reading check unavailable.</h3><p>${escapeHtml(error.message)}</p><button class="primary" id="retry-reading-check">Try again ${icon('refresh')}</button></div>`;
    $('#retry-reading-check').addEventListener('click', startReadingLevelCheck);
  }
}

function showReadingLevelResult(level, score) {
  openWorkspace('Reading level check', 'Your starting point');
  $('#question-count').textContent = `${score}%`;
  $('#workspace-content').innerHTML = `<div class="result"><h3>${escapeHtml(level)}</h3><p>You scored ${score}% on the six-question reading check. This is a starting estimate, not a permanent label.</p>${scoreFeedbackMarkup(score)}<button class="primary" id="open-level-practice">Open practice ${icon('arrow_forward')}</button></div>`;
  $('#open-level-practice').addEventListener('click', () => startAiPractice('mixed'));
}

function showPath(level, score) { openWorkspace('Assessment result', 'Estimated level'); $('#question-count').textContent = 'Complete'; $('#workspace-content').innerHTML = `<div class="result"><h3>${level}</h3><p>Focused assessment score: ${score}%.</p>${scoreFeedbackMarkup(score)}<div class="action-row"><span class="small-note">Generated practice contains six multiple-choice questions.</span><button class="primary" id="open-guide">Open practice ${icon('arrow_forward')}</button></div></div>`; $('#open-guide').addEventListener('click', () => startAiPractice('mixed')); }

function startPractice(type) { if (type === 'chat') return openChat(); startAiPractice(type); }

function openChat() {
  state.mode = 'chat';
  state.chatHistory = [];
  state.chatContext = state.chatContext || '';
  openWorkspace('Questions', 'Question');
  $('#question-count').textContent = 'Optional';
  $('#workspace-content').innerHTML = `<div class="chat-log" id="chat-log"><div class="bubble guide">Ask about a word, sentence, or reading passage.</div></div><form class="chat-form" id="chat-form"><input id="chat-input" autocomplete="off" placeholder="Ask a question" /><button class="primary" id="chat-send">Send ${icon('arrow_forward')}</button></form>`;
  $('#chat-form').addEventListener('submit', sendChat);
}

async function sendMessage(message) {
  addBubble('student', message);
  addBubble('guide', 'Thinking…');
  const sendButton = $('#chat-send');
  if (sendButton) sendButton.disabled = true;
  try {
    const response = await fetch(`${API_BASE}/api/ai`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message, context: state.chatContext || '', history: state.chatHistory || [] }), signal: AbortSignal.timeout(50000) });
    const data = await response.json();
    const thinking = [...document.querySelectorAll('.bubble.guide')].pop();
    if (thinking) thinking.textContent = data.answer || data.error || 'The guide could not answer.';
    if (data.answer) { state.chatHistory = [...(state.chatHistory || []), { role: 'user', content: message }, { role: 'assistant', content: data.answer }].slice(-8); }
  } catch {
    const thinking = [...document.querySelectorAll('.bubble.guide')].pop();
    if (thinking) thinking.textContent = window.location.protocol === 'file:' ? 'Start the local server with npm start, then try again.' : 'The assistant is unavailable. Try again.';
  } finally {
    if (sendButton) sendButton.disabled = false;
  }
}

function addBubble(kind, text) { const log = $('#chat-log'); if (!log) return; const bubble = document.createElement('div'); bubble.className = `bubble ${kind}`; bubble.textContent = text; log.appendChild(bubble); log.scrollTop = log.scrollHeight; }
function sendChat(event) { event.preventDefault(); const input = $('#chat-input'); const message = input.value.trim(); if (!message) return; input.value = ''; sendMessage(message); }

function showVocabularyPage() {
  openWorkspace('Vocabulary', 'Word path');
  $('#question-count').textContent = `${vocabularyPath.length} lessons`;
  const unlocked = window.progressStore.loadProgress().vocabUnlocked || 1;
  $('#workspace-content').innerHTML = `<p class="muted">Complete each lesson to open the next dot. Every tenth lesson ends with a 15-question checkpoint.</p><p class="small-note">There are 250 lessons in this path.</p><div class="word-path">${vocabularyNodes.map((node, index) => `<div class="path-node"><button class="word-dot ${index < unlocked ? '' : 'locked'} ${node.type === 'checkpoint' ? 'checkpoint-dot' : ''}" data-node-index="${index}" aria-label="${index < unlocked ? node.label : 'Locked lesson'}">${index < unlocked ? (node.type === 'checkpoint' ? icon('assignment') : node.lessonIndex + 1) : icon('lock')}</button></div>`).join('')}</div>`;
  document.querySelectorAll('[data-node-index]').forEach((button) => button.addEventListener('click', () => {
    const nodeIndex = Number(button.dataset.nodeIndex);
    const node = vocabularyNodes[nodeIndex];
    if (nodeIndex >= unlocked) return showLockedLevelMessage();
    if (node.type === 'checkpoint') return openVocabularyCheckpoint(node.checkpointIndex);
    return openVocabularyLesson(node.lessonIndex);
  }));
}

function vocabularyQuestions(item) {
  const otherWords = vocabularySeeds.filter(([word]) => word !== item.word).map(([word]) => word);
  const otherMeanings = vocabularySeeds.filter(([word]) => word !== item.word).map(([, meaning]) => meaning);
  const makeQuestion = (prompt, choices, questionNumber) => {
    const shift = (item.word.length * 3 + questionNumber * 2) % choices.length;
    const orderedChoices = choices.slice(shift).concat(choices.slice(0, shift));
    return { prompt, choices: orderedChoices, answer: (choices.length - shift) % choices.length };
  };
  return [
    makeQuestion(`In this sentence, what does “${item.word}” most likely mean? “The teacher explained that ${item.word} means ${item.meaning}.”`, [item.meaning, otherMeanings[0], otherMeanings[1], otherMeanings[2]], 0),
    makeQuestion(`Which situation best shows the meaning of “${item.word}”?`, [`A person does something that ${item.meaning}.`, `A person does something that ${otherMeanings[3]}.`, `A person does something that ${otherMeanings[4]}.`, `A person does something that ${otherMeanings[5]}.`], 1),
    makeQuestion(`Choose the word that best completes this sentence: “The author used ___ to describe something that ${item.meaning}.”`, [item.word, otherWords[0], otherWords[1], otherWords[2]], 2),
    makeQuestion(`Which definition would belong in a vocabulary notebook for “${item.word}”?`, [item.meaning, otherMeanings[6], otherMeanings[7], otherMeanings[8]], 3),
    makeQuestion(`Which clue would help a reader figure out “${item.word}” in a new passage?`, [`A nearby sentence explains that something ${item.meaning}.`, `A nearby sentence describes something that ${otherMeanings[9]}.`, `A nearby sentence describes something that ${otherMeanings[10]}.`, `A nearby sentence describes something that ${otherMeanings[11]}.`], 4),
    makeQuestion(`Which sentence uses “${item.word}” in a way that matches its meaning?`, [`The class discussed how something could ${item.meaning}.`, `The class discussed how something could ${otherMeanings[12]}.`, `The class discussed how something could ${otherMeanings[13]}.`, `The class discussed how something could ${otherMeanings[14]}.`], 5)
  ];
}

function openVocabularyLesson(index) {
  const item = vocabularyPath[index];
  state.vocabLessonIndex = index;
  state.vocabNodeIndex = lessonNodeIndex(index);
  state.vocabIsCheckpoint = false;
  state.vocabQuestions = vocabularyQuestions(item);
  state.vocabQuestionIndex = 0;
  state.vocabAnswers = [];
  window.progressStore.saveProgress({ currentVocabLesson: index, currentVocabQuestion: 0 });
  openWorkspace('Vocabulary lesson', item.word);
  $('#question-count').textContent = 'Lesson';
  $('#workspace-content').innerHTML = `<div class="lesson-heading"><small>Lesson ${index + 1} of ${vocabularyPath.length}</small><h3>${item.word}</h3><p>${item.meaning}</p><p><strong>Example:</strong> ${item.example}</p><button class="primary" id="start-vocab-quiz">Start six-question quiz ${icon('arrow_forward')}</button></div><button class="secondary" id="back-to-path">Back to path</button>`;
  $('#start-vocab-quiz').addEventListener('click', renderVocabularyQuestion);
  $('#back-to-path').addEventListener('click', showVocabularyPage);
}

function renderVocabularyQuestion() {
  const question = state.vocabQuestions[state.vocabQuestionIndex];
  if (!question) return showWorkspaceError('This vocabulary question could not be loaded. Please return to the word path and try again.');
  const totalQuestions = state.vocabQuestions.length;
  const heading = state.vocabIsCheckpoint ? `Checkpoint ${state.vocabCheckpointIndex}` : `Lesson ${state.vocabLessonIndex + 1}`;
  $('#question-count').textContent = `${state.vocabQuestionIndex + 1} / ${totalQuestions}`;
  $('#workspace-content').innerHTML = `<div class="lesson-heading"><small>${heading} · Question ${state.vocabQuestionIndex + 1} of ${totalQuestions}</small><h3>${state.vocabIsCheckpoint ? 'Checkpoint review' : 'Practice question'}</h3></div><div class="vocab-question"><p><strong>${state.vocabQuestionIndex + 1}.</strong> ${question.prompt}</p><div class="choice-grid">${question.choices.map((choice, choiceIndex) => `<button class="choice" data-vocab-choice="${choiceIndex}">${choice}</button>`).join('')}</div></div><div class="action-row"><button class="secondary" id="back-to-path">Back to path</button><button class="primary" id="next-vocab" disabled>${state.vocabQuestionIndex === totalQuestions - 1 ? (state.vocabIsCheckpoint ? 'Finish checkpoint' : 'Finish lesson') : 'Next'} ${icon('arrow_forward')}</button></div>`;
  let selected = null;
  document.querySelectorAll('[data-vocab-choice]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-vocab-choice]').forEach((choice) => choice.classList.remove('selected')); button.classList.add('selected'); selected = Number(button.dataset.vocabChoice); $('#next-vocab').disabled = false; }));
  $('#back-to-path').addEventListener('click', showVocabularyPage);
  $('#next-vocab').addEventListener('click', () => { state.vocabAnswers.push(selected); if (state.vocabQuestionIndex < state.vocabQuestions.length - 1) { state.vocabQuestionIndex += 1; window.progressStore.saveProgress({ currentVocabLesson: state.vocabLessonIndex, currentVocabQuestion: state.vocabQuestionIndex }); renderVocabularyQuestion(); } else { finishVocabularyActivity(); } });
}

function openVocabularyCheckpoint(checkpointIndex) {
  const start = (checkpointIndex - 1) * 10;
  const items = vocabularyPath.slice(start, start + 10);
  state.vocabLessonIndex = null;
  state.vocabCheckpointIndex = checkpointIndex;
  state.vocabNodeIndex = checkpointNodeIndex(checkpointIndex);
  state.vocabIsCheckpoint = true;
  state.vocabQuestions = items.map((item) => vocabularyQuestions(item)[0]).concat(items.slice(0, 5).map((item) => vocabularyQuestions(item)[1]));
  state.vocabQuestionIndex = 0;
  state.vocabAnswers = [];
  openWorkspace('Vocabulary checkpoint', `Checkpoint ${checkpointIndex}`);
  $('#question-count').textContent = `15 questions`;
  renderVocabularyQuestion();
}

function finishVocabularyActivity() {
  const progress = window.progressStore.loadProgress();
  const correctAnswers = state.vocabAnswers.reduce((total, answer, index) => total + (answer === state.vocabQuestions[index].answer ? 1 : 0), 0);
  const score = Math.round((correctAnswers / state.vocabQuestions.length) * 100);
  window.progressStore.saveProgress({ vocabularyScore: score, vocabUnlocked: Math.max(progress.vocabUnlocked || 1, state.vocabNodeIndex + 2), currentVocabLesson: state.vocabLessonIndex, currentVocabQuestion: state.vocabQuestions.length, sessions: progress.sessions + 1 });
  openWorkspace(state.vocabIsCheckpoint ? 'Vocabulary checkpoint' : 'Vocabulary lesson', state.vocabIsCheckpoint ? `Checkpoint ${state.vocabCheckpointIndex} complete` : 'Lesson complete');
  $('#question-count').textContent = `${score}%`;
  $('#workspace-content').innerHTML = `<div class="result"><h3>${score}% correct</h3><p>You scored ${correctAnswers} out of ${state.vocabQuestions.length}. The next dot is now available.</p>${scoreFeedbackMarkup(score)}<button class="primary" id="continue-vocab">Return to path ${icon('arrow_forward')}</button></div>`;
  $('#continue-vocab').addEventListener('click', showVocabularyPage);
}

function showReadingPage() {
  openWorkspace('Reading', 'Books');
  $('#question-count').textContent = `${readingBooks.length} books`;
  $('#workspace-content').innerHTML = `<p class="muted">Choose a passage.</p><div class="book-list">${readingBooks.map((book, index) => `<button class="book-item" data-book-index="${index}"><strong>${book.title}</strong><span>${book.author}</span></button>`).join('')}</div>`;
  document.querySelectorAll('[data-book-index]').forEach((button) => button.addEventListener('click', () => openBook(Number(button.dataset.bookIndex))));
}

function openBook(index) {
  const book = readingBooks[index];
  if (!book) return showWorkspaceError('That reading selection could not be opened. Please choose another one.');
  state.currentBook = book;
  state.readingTranscript = '';
  state.readingBaseTranscript = '';
  openWorkspace('Reading', book.title);
  $('#question-count').textContent = 'Read aloud';
  const paragraphs = book.passage.split('\n\n').map((paragraph) => `<p>${paragraph}</p>`).join('');
  $('#workspace-content').innerHTML = `<article class="book-page">${paragraphs}</article><div class="reading-tools"><button class="primary" id="start-reading">Start reading aloud</button><button class="secondary" id="stop-reading" disabled>Stop</button><span id="speech-status" class="small-note">Read the full passage to unlock questions.</span></div><div class="result"><h3>Transcript</h3><p id="reading-transcript">Your spoken words will appear here.</p><button class="secondary" id="rate-reading" disabled>Rate reading</button><p id="reading-feedback" class="small-note"></p><div id="reading-score-feedback"></div></div><div class="result"><h3>Questions</h3><p id="book-questions-lock">Read the full passage aloud to unlock the questions.</p><div id="book-questions" class="hidden"></div><div id="book-question-actions" class="action-row hidden"><button class="primary" id="check-book">Check answers</button><span id="book-score" class="small-note"></span></div><div id="book-score-feedback"></div></div>`;
  $('#start-reading').addEventListener('click', startReadingAloud); $('#stop-reading').addEventListener('click', stopReadingAloud); $('#rate-reading').addEventListener('click', rateReading);
}

function readingWords(text) { return String(text || '').toLowerCase().replace(/[^a-z0-9' ]/g, ' ').split(/\s+/).filter(Boolean); }

function readingMetrics() {
  const target = readingWords(state.currentBook?.passage);
  const spoken = readingWords(state.readingTranscript);
  let targetIndex = 0;
  let matched = 0;
  spoken.forEach((word) => {
    for (let index = targetIndex; index < Math.min(targetIndex + 8, target.length); index += 1) {
      if (target[index] === word) { matched += 1; targetIndex = index + 1; break; }
    }
  });
  return { matched, targetWords: target.length, spokenWords: spoken.length, coverage: target.length ? matched / target.length : 0, accuracy: spoken.length ? Math.min(1, matched / spoken.length) : 0 };
}

function updateReadingProgress() {
  const metrics = readingMetrics();
  const percent = Math.round(metrics.coverage * 100);
  $('#speech-status').textContent = `${percent}% of the passage matched`;
  if (percent >= 80) $('#speech-status').textContent = 'Passage read — stop recording to unlock questions.';
}

function unlockReadingQuestions() {
  const book = state.currentBook;
  if (!book || !state.readingTranscript.trim() || readingMetrics().coverage < 0.8) return;
  $('#book-questions-lock').classList.add('hidden');
  $('#book-questions').classList.remove('hidden');
  $('#book-question-actions').classList.remove('hidden');
  $('#book-questions').innerHTML = book.questions.map((question, qIndex) => `<div class="book-question"><p><strong>${qIndex + 1}.</strong> ${question.prompt}</p><div class="choice-grid">${question.choices.map((choice, choiceIndex) => `<button class="choice" data-book-question="${qIndex}" data-book-choice="${choiceIndex}">${choice}</button>`).join('')}</div></div>`).join('');
  document.querySelectorAll('[data-book-question]').forEach((button) => button.addEventListener('click', () => { const qIndex = Number(button.dataset.bookQuestion); document.querySelectorAll(`[data-book-question="${qIndex}"]`).forEach((item) => item.classList.remove('selected')); button.classList.add('selected'); }));
  $('#check-book').addEventListener('click', () => { const score = book.questions.reduce((total, question, qIndex) => total + (Number(document.querySelector(`[data-book-question="${qIndex}"].selected`)?.dataset.bookChoice) === question.answer ? 1 : 0), 0); const percent = Math.round((score / book.questions.length) * 100); $('#book-score').textContent = `${score} / ${book.questions.length} correct (${percent}%)`; $('#book-score-feedback').innerHTML = scoreFeedbackMarkup(percent); });
}

function startReadingAloud() {
  const Recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!Recognition) { $('#speech-status').textContent = 'Speech recognition is not available in this browser.'; return; }
  const recognition = new Recognition(); speechRecognition = recognition; state.readingBaseTranscript = state.readingTranscript || ''; recognition.continuous = true; recognition.interimResults = true; recognition.lang = 'en-US';
  recognition.onstart = () => { $('#speech-status').textContent = 'Listening'; $('#start-reading').disabled = true; $('#stop-reading').disabled = false; };
  recognition.onresult = (event) => { const liveTranscript = Array.from(event.results).map((result) => result[0].transcript).join(' '); state.readingTranscript = [state.readingBaseTranscript, liveTranscript].filter(Boolean).join(' '); $('#reading-transcript').textContent = state.readingTranscript; $('#rate-reading').disabled = !state.readingTranscript.trim(); updateReadingProgress(); };
  recognition.onerror = () => { $('#speech-status').textContent = 'Speech recognition stopped.'; $('#start-reading').disabled = false; $('#stop-reading').disabled = true; };
  recognition.onend = () => { $('#start-reading').disabled = false; $('#stop-reading').disabled = true; if (state.readingTranscript.trim() && readingMetrics().coverage >= 0.8) { $('#speech-status').textContent = 'Passage complete — questions unlocked.'; unlockReadingQuestions(); } else if (state.readingTranscript.trim()) { updateReadingProgress(); } else $('#speech-status').textContent = 'No recording'; };
  try { recognition.start(); } catch { $('#speech-status').textContent = 'The microphone could not start. Check browser microphone permission and try again.'; $('#start-reading').disabled = false; $('#stop-reading').disabled = true; }
}

function stopReadingAloud() { try { if (speechRecognition) speechRecognition.stop(); } catch { $('#speech-status').textContent = 'The recording could not be stopped. Try again.'; } }
async function rateReading() { const feedback = $('#reading-feedback'); feedback.textContent = 'Rating…'; $('#rate-reading').disabled = true; const metrics = readingMetrics(); const coveragePercent = Math.round(metrics.coverage * 100); const score = Math.max(1, Math.min(5, Math.round(((metrics.coverage * 0.7) + (metrics.accuracy * 0.3)) * 5))); $('#reading-score-feedback').innerHTML = scoreFeedbackMarkup(coveragePercent); try { const response = await fetch(`${API_BASE}/api/ai`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ message: 'Give kind, specific feedback on this read-aloud. Do not invent a score; use the measured passage coverage and word-order accuracy below. Give one strength and one next practice tip.', context: `Passage coverage: ${coveragePercent}%. Word-order accuracy: ${Math.round(metrics.accuracy * 100)}%. Local score: ${score}/5. Passage: ${state.currentBook.passage}\nStudent transcript: ${state.readingTranscript}` }), signal: AbortSignal.timeout(50000) }); const data = await response.json(); feedback.textContent = `Read-aloud score: ${score}/5 (${coveragePercent}% of the passage matched). ${data.answer || data.error || 'Keep practicing.'}`; } catch { feedback.textContent = `Read-aloud score: ${score}/5 (${coveragePercent}% of the passage matched). The AI tip is unavailable right now.`; } finally { $('#rate-reading').disabled = false; } }

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
    const response = await fetch(`${API_BASE}/api/practice`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ level: type === 'test' ? 'Not assessed yet' : progress.latestLevel, type: type === 'test' ? 'mixed' : type, weakSkills: progress.weakSkills || {} }), signal: AbortSignal.timeout(50000) });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'The AI could not make practice right now.');
    state.questions = normalizePracticeQuestions(data);
    state.passage = data.passage;
    state.index = 0;
    state.answers = [];
    state.explanations = [];
    openWorkspace(type === 'reading' ? 'Reading' : type === 'vocabulary' ? 'Vocabulary' : 'Practice set', data.title || 'Questions');
    renderAiQuestion();
  } catch (error) {
    $('#question-count').textContent = 'Needs attention';
    $('#workspace-content').innerHTML = `<div class="result"><h3>Questions unavailable.</h3><p>${error.message}</p><button class="primary" id="retry-ai">Try again ${icon('refresh')}</button></div>`;
    $('#retry-ai').addEventListener('click', () => startAiPractice(type));
  }
}

function renderAiQuestion() {
  const question = state.questions[state.index];
  if (!question) return showWorkspaceError('This practice question could not be loaded. Please generate a new set.');
  const questionCount = state.questions.length;
  $('#question-count').textContent = `${state.index + 1} / ${questionCount}`;
  const passage = state.passage && state.index === 0 ? `<div class="result"><p><strong>Read this first:</strong> ${escapeHtml(state.passage)}</p></div>` : '';
  $('#workspace-content').innerHTML = `${passage}<div class="question"><h3>${escapeHtml(question.prompt)}</h3><div class="choice-grid">${question.choices.map((choice, index) => `<button class="choice" data-choice="${index}">${escapeHtml(choice)}</button>`).join('')}</div><div class="action-row"><button class="secondary" id="ask-current-question">Ask about question</button><button class="primary" id="next-question" disabled>${state.index === questionCount - 1 ? 'Finish' : 'Next'} ${icon('arrow_forward')}</button></div><p class="small-note">Select one answer.</p></div>`;
  let selected = null;
  $('#ask-current-question').addEventListener('click', () => { state.chatContext = `Practice type: ${state.practiceType || 'personal path'}\nQuestion ${state.index + 1} of 6: ${question.prompt}\nChoices: ${question.choices.join(' | ')}\nThe student wants help with this exact question. Give a hint or explain the skill without giving away the answer unless they ask for the answer.`; openChat(); });
  document.querySelectorAll('[data-choice]').forEach((button) => button.addEventListener('click', () => { document.querySelectorAll('[data-choice]').forEach((item) => item.classList.remove('selected')); button.classList.add('selected'); selected = Number(button.dataset.choice); $('#next-question').disabled = false; }));
  $('#next-question').addEventListener('click', () => { state.answers.push(selected); state.explanations.push(question.explanation); state.index += 1; if (state.index < questionCount) renderAiQuestion(); else finishAiPractice(); });
}

function showWorkspaceError(message) {
  $('#question-count').textContent = 'Needs attention';
  $('#workspace-content').innerHTML = `<div class="result"><h3>Something went wrong.</h3><p>${escapeHtml(message)}</p></div>`;
}

function finishAiPractice() {
  const questionCount = state.questions.length;
  const correctCount = state.answers.filter((answer, index) => answer === state.questions[index]?.answer).length;
  const score = questionCount ? Math.round((correctCount / questionCount) * 100) : 0;
  const progress = window.progressStore.loadProgress();
  const weakSkills = { ...(progress.weakSkills || {}) };
  state.questions.forEach((question, index) => { if (state.answers[index] !== question.answer) { const skill = question.skill || state.practiceType || 'General English'; weakSkills[skill] = (weakSkills[skill] || 0) + 1; } });
  const changes = state.practiceType === 'vocabulary' ? { vocabularyScore: score, weakSkills } : state.practiceType === 'reading' ? { readingScore: score, weakSkills } : state.practiceType === 'test' ? { assessmentScore: score, latestLevel: levelFor(score), sessions: progress.sessions + 1, weakSkills } : { weakSkills };
  window.progressStore.saveProgress(changes);
  renderProgress();
  openWorkspace('Practice result', 'Score');
  $('#question-count').textContent = 'Complete';
  const review = state.questions.map((question, index) => `Q${index + 1}: ${question.prompt} Student choice: ${question.choices[state.answers[index]] || 'none'}. Correct choice: ${question.choices[question.answer]}.`).join('\n');
  const missed = state.questions.map((question, index) => ({ question, index })).filter(({ question, index }) => state.answers[index] !== question.answer);
  const reviewItems = missed.length ? missed.map(({ question, index }) => `<div class="review-item"><strong>Question ${index + 1}</strong><p>${escapeHtml(question.prompt)}</p><p class="wrong-answer">Your answer: ${escapeHtml(question.choices[state.answers[index]] || 'No answer')}</p><p class="right-answer">Right answer: ${escapeHtml(question.choices[question.answer])}</p><p>${escapeHtml(question.explanation)}</p></div>`).join('') : `<p>All ${questionCount} answers were correct.</p>`;
  $('#workspace-content').innerHTML = `<div class="result"><h3>${score}% correct</h3><p>You scored ${correctCount} out of ${questionCount}.</p>${scoreFeedbackMarkup(score)}<h3>Review</h3><div class="review-list">${reviewItems}</div><div class="action-row"><button class="secondary" id="review-button">Review with assistant ${icon('arrow_forward')}</button><button class="secondary" id="again-button">Generate another set ${icon('arrow_forward')}</button></div></div>`;
  $('#review-button').addEventListener('click', () => { state.chatContext = `The student just completed a connected six-question ${state.practiceType || 'personal'} practice. Here is the review:\n${review}\nHelp the student notice patterns and choose what to practice next.`; openChat(); });
  $('#again-button').addEventListener('click', () => startAiPractice(state.practiceType));
}
function showPracticePage() {
  const progress = window.progressStore.loadProgress();
  openWorkspace('Practice', 'Skill check');
  $('#question-count').textContent = 'Six questions';
  const focus = Object.entries(progress.weakSkills || {}).sort((a, b) => b[1] - a[1])[0]?.[0];
  $('#workspace-content').innerHTML = `<div class="result"><h3>Practice test</h3><p>Six different questions will check vocabulary, reading, spelling, and grammar. ${focus ? `Recent mistakes will give extra practice to ${focus}.` : ''}</p><button class="primary" id="generate-test">Generate test ${icon('arrow_forward')}</button></div>`;
  $('#generate-test').addEventListener('click', () => startAiPractice('test'));
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
  if (page === 'practice') return showPracticePage();
  if (page === 'questions') return openChat();
  if (page === 'progress') return showProgressPage();
}

document.querySelectorAll('.top-tab').forEach((button) => button.addEventListener('click', () => showPage(button.dataset.page)));
$('#refresh-status').addEventListener('click', refreshStatus);
$('#start-reading-check').addEventListener('click', startReadingLevelCheck);
renderProgress(); refreshStatus();
