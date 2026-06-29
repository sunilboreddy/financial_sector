# Design: Quiz module

Implements [docs/requirements/09-quiz.md](../requirements/09-quiz.md).

- Section `data-page="quiz"`, backed by `quizData` array (10 question objects), rendered by `buildQuiz()` into `#quiz-container`.
- `answerQ(qIdx, optIdx, btn)` locks in an answer per question, disables remaining option buttons for that question, and calls `showFeedback()`. `updateScore()` tracks `answered` (per-question bool array) and `score`. `resetQuiz()` clears both and rebuilds.
- State is in-memory only (`answered`, `score` are plain JS variables, not persisted) — a reload clears quiz progress along with module progress (see shared design in `docs/design/index.md`).
