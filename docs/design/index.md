# Design index

How each requirement in `docs/requirements/` is implemented in `index.html`. All modules share one mechanism (see "Shared navigation/progress design" below); each file below covers what's specific to that module's content/layout.

1. [01-overview.md](01-overview.md)
2. [02-instruments.md](02-instruments.md)
3. [03-markets.md](03-markets.md)
4. [04-participants.md](04-participants.md)
5. [05-data.md](05-data.md)
6. [06-risk.md](06-risk.md)
7. [07-compliance.md](07-compliance.md)
8. [08-pipelines.md](08-pipelines.md)
9. [09-quiz.md](09-quiz.md)

## Shared navigation/progress design

- Sidebar nav items: `<div class="nav-item" data-page="<id>" onclick="goto('<id>',this)">`. `pages` array in the script (`['overview','instruments','markets','participants','data','risk','compliance','pipelines','quiz']`) defines order and drives "next module" advancement.
- `goto(id, el)` toggles the `active` class on the nav item and shows the matching content section, updates the breadcrumb via `breadcrumbMap`, and shows/hides the "done" button based on whether `id` is in `completedPages`.
- `markDone()` adds the current page id to the `completedPages` Set, checks its sidebar checkbox (`#chk-<id>`), calls `updateProgress()`, and auto-advances via `goto()` to `pages[idx + 1]`.
- `updateProgress()` recomputes `#prog-fill` width as `completedPages.size / pages.length`.
- **Progress is in-memory only** (`completedPages` is a plain `Set`, not persisted to `localStorage`) — it resets on every page reload. Any requirement that depends on progress surviving a reload needs a design change here first.
