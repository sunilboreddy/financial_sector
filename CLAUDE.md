# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A single self-contained static HTML page (`index.html`) — "Finance Domain — Data Engineer's Field Guide". There is no build system, package manager, server, or test suite; the entire site is one file with inline `<style>` and (if present) inline `<script>` blocks.

The page is published via GitHub Pages from the `main` branch root. GitHub Pages requires the file to be named exactly `index.html` at the repo root to be served automatically — do not rename it.

## Working with the file

- Edit `index.html` directly; there is no compilation or bundling step.
- To preview changes, open `index.html` in a browser locally (no server required) or push to `main` and check `https://sunilboreddy.github.io/financial_sector/`.
- Keep all CSS in the existing `<style>` block in `<head>` rather than introducing external stylesheets or build tooling, consistent with the current single-file structure.
