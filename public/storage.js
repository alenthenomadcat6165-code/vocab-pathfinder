const STORAGE_KEY = 'vocab-pathfinder-progress';

const starterProgress = {
  sessions: 0,
  latestLevel: 'Not measured yet',
  assessmentScore: null,
  refinedScore: null,
  vocabularyScore: null,
  readingScore: null,
  lastActivity: null
};

function loadProgress() {
  try {
    return { ...starterProgress, ...(JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}) };
  } catch {
    return { ...starterProgress };
  }
}

function saveProgress(changes) {
  const next = { ...loadProgress(), ...changes, lastActivity: new Date().toISOString() };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  return next;
}

window.progressStore = { loadProgress, saveProgress };
