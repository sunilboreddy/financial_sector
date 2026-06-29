# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A finance-domain learning app implemented as a **single self-contained HTML file** (`index.html`). No build step, no package manager, no dependencies, no backend. All HTML, CSS (in a `<style>` block), and JavaScript (in a `<script>` block at the bottom) live in that one file.

It exists to teach a data engineer with no finance background the domain knowledge needed to work as a data engineer in financial services — markets, instruments, industry roles, finance-specific data modelling, risk, and regulation/compliance — explained in terms a data engineer already understands (schemas, pipelines, data quality issues), not generic finance-101 prose.

## Running / developing

There is no build or test tooling. To work on this app:
- Open `index.html` directly in a browser, or serve it locally (e.g. `python3 -m http.server`) and visit it.
- Reload the browser after any edit — there is no dev server with hot reload.
- Test changes manually in-browser by clicking through the sidebar and quiz.

## Deployment

Static GitHub Pages deploy from the `main` branch root, served at `https://sunilboreddy.github.io/financial_sector/`. GitHub Pages requires the file to be named exactly `index.html` at the repo root — do not rename it.

## Project docs

**Every change to `index.html` — feature or bug fix, no exceptions — must be traceable through `docs/` in three phases, each referencing the previous:**
- `docs/requirements/` — what we're building/fixing and why, never how. Small capability-focused files (one per module) with an `index.md` linking them.
- `docs/design/` — how we'll build it (content structure, data/state model). Each design doc references the specific `docs/requirements/*.md` file(s) it implements.
- `docs/build/` — implementation notes/changelog for the build phase. Each build doc references the specific `docs/design/*.md` file(s) it follows.

**Do not write or edit code before this chain exists for the change.** The order is always requirements → design → build → code:
1. Write or update the requirements doc first — what's broken or wanted, and why.
2. Write or update the design doc next, referencing that requirements doc — how it'll be implemented.
3. Only then touch `index.html`, and write/update the build doc referencing that design doc as you go — a real changelog (what was built, deviations, verification), not a pre-written task list.

This applies to bug fixes too, not just new capabilities: a one-line fix still gets a short requirements note (what was broken), a short design note (root cause + fix approach) if it's not trivial, and a build note (what changed, how it was verified) — added to the existing module's docs (e.g. a "Follow-up fix" section) rather than skipped because it's "just a bug." Don't let implementation details leak into requirements docs, and don't skip ahead in the chain even under time pressure.

## Architecture

Everything is in `index.html`, organized in three parts:

1. **`<style>` (head)** — light, navy/gold-themed CSS using custom properties (`--navy`, `--gold`, `--teal`, etc.) defined on `:root`.
2. **Body markup** — a fixed sidebar (`#sidebar`) with `.nav-item[data-page=...]` entries, each showing one content section. Sections are 9 modules in order: `overview`, `instruments`, `markets`, `participants`, `data`, `risk`, `compliance`, `pipelines`, `quiz`. See `docs/requirements/index.md` and `docs/design/index.md` for what each module covers and how it's built.
3. **`<script>` (bottom)** — all app logic, plain functions and `window.*`-style globals invoked from inline `onclick=` attributes:
   - `goto(id, el)` switches the visible section and updates the breadcrumb/done-button state.
   - `markDone()` marks the current page complete (`completedPages` Set) and auto-advances to the next module via the `pages` array.
   - `updateProgress()` recomputes the sidebar progress bar from `completedPages.size / pages.length`.
   - `toggleCard(el)` expands/collapses instrument detail cards.
   - Quiz: `quizData` (10 questions) → `buildQuiz()`, `answerQ()`, `showFeedback()`, `updateScore()`, `resetQuiz()`.
   - **All progress/quiz state is in-memory only** — there is no `localStorage` persistence, so reloading the page resets progress. See `docs/design/index.md` before assuming otherwise.

## Conventions to follow when editing

- Keep everything in `index.html` — don't introduce a build step or split into modules unless explicitly asked.
- New interactive elements created via `innerHTML` template strings that need `onclick` handlers must expose those handlers on `window`, since inline `onclick=` resolves against globals, not closures (follow the existing `goto`/`markDone`/`toggleCard` pattern).
- New module content should follow the existing per-module framing: explain the finance concept, then state the concrete data/pipeline implication or gotcha — not abstract finance theory.
- Any new persisted state should go through the requirements → design → build chain first, since the current build has no persistence layer to silently extend.
