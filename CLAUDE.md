# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A single self-contained static HTML page (`index.html`) — "Finance Domain — Data Engineer's Field Guide". It's a personal learning app for the repo owner, a data engineer with no finance background who is trying to break into the financial sector. The content is deliberately written for someone who already thinks like a data engineer (pipelines, schemas, ETL) but needs to build finance domain knowledge — markets, instruments, the players, and regulation/compliance — from scratch.

There is no build system, package manager, server, or test suite; the entire app is one file with inline `<style>` and `<script>` blocks (sidebar nav, section switching, progress tracking, and quiz logic all live inline).

The page is published via GitHub Pages from the `main` branch root. GitHub Pages requires the file to be named exactly `index.html` at the repo root to be served automatically — do not rename it.

## Content structure

Navigation is a `goto('<page>', this)` call per sidebar item (`<div class="nav-item" data-page="...">`), which shows/hides corresponding sections. The pages, in learning order, are:

1. `overview` — how the financial system fits together (banking, asset management, capital markets), framed around example data schemas per sector.
2. `instruments` — equities, bonds, derivatives, swaps, funds; identifier traps (ISIN vs ticker), day count conventions.
3. `markets` — exchange vs OTC, order book mechanics, trade lifecycle (order → settlement), market data types (tick, OHLCV, reference data).
4. `participants` — buy side vs sell side, front/middle/back office, custodians, CCPs, data vendors.
5. `data` — finance-specific data modelling rules: no floats for money, business vs calendar dates, bi-temporal modelling, multi-currency handling.
6. `risk` — market/credit/operational/liquidity risk and the data each requires.
7. `compliance` — MiFID II, EMIR, Basel III, GDPR-in-finance, BCBS 239, AML/KYC, regulatory timeline and DE implications.
8. `pipelines` — position reconciliation, EOD batch processing, corporate actions, regulatory reporting, tools comparison.
9. `quiz` — 10 applied questions written for a data engineer, not a finance student.

Progress is tracked client-side (sidebar) and "Mark as done" advances to the next module.

## Working with the file

- Edit `index.html` directly; there is no compilation or bundling step.
- Keep new content consistent with the existing tone: explain finance concepts in terms a data engineer already understands (schemas, pipelines, data quality issues), not generic finance-101 prose.
- To preview changes, open `index.html` in a browser locally (no server required) or push to `main` and check `https://sunilboreddy.github.io/financial_sector/`.
- Keep all CSS/JS in the existing inline `<style>`/`<script>` blocks rather than introducing external files or build tooling, consistent with the single-file structure.
- When adding a new module/page, follow the existing pattern: add a `nav-item` with a `data-page` key, a matching content section, and wire it into the `goto()` switcher and progress tracker.
