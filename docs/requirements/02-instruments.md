# Requirement: Instruments module

**What:** Explain the core financial instruments a data engineer will need to model — equities, bonds, derivatives, swaps, funds — and the practical gotchas in representing them as data (security identifier schemes, day count conventions).

**Why:** Instrument data is the backbone of most finance data pipelines (positions, trades, market data). The learner needs to recognize instrument types and their known data traps (e.g. ISIN vs ticker ambiguity) before touching real datasets, since these mistakes are a common source of bad joins/reconciliation breaks.

**Not:** Does not cover where/how instruments trade (see Markets module) or how they're risk-managed (see Risk module).
