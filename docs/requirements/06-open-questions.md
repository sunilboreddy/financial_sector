# Open questions

Things not yet decided or covered, to revisit before adding new modules:

- Should module content be sourced/cited (e.g. specific regulation article numbers), or is the current "practitioner explainer" level sufficient for the learner's goal of breaking into a DE role?
- No mechanism yet for the learner to track real-world progress (e.g. interviews passed, roles applied to) — is that in scope for this app, or a separate concern?
- Quiz is currently fixed (10 static questions); no spaced-repetition or weak-area retesting. Worth adding if the learner finds they forget earlier modules.
- No persistence layer decided yet for quiz/progress state beyond whatever the current build implements — confirm with `docs/design/` before assuming it's localStorage.
