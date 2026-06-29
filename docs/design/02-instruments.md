# Design: Instruments module

Implements [docs/requirements/02-instruments.md](../requirements/02-instruments.md).

- Section `data-page="instruments"`: "The instrument hierarchy", "Key instruments explained" (expandable cards via `toggleCard(el)`), "Security identifiers — the bane of finance data".
- Each instrument card explains the field-level modelling gotcha, not just the definition (e.g. day count conventions, ISIN vs ticker) — new instrument cards should follow the same "what it is + what will break your pipeline" format.
