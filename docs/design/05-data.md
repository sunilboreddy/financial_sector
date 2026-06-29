# Design: Finance data types module

Implements [docs/requirements/05-data.md](../requirements/05-data.md).

- Section `data-page="data"`: "What makes finance data different", "Critical data patterns" (no float for money, business vs calendar dates, bi-temporal modelling, multi-currency).
- Each pattern is written as a rule + the concrete failure mode if ignored — preserve that framing for any new pattern added here, since it's the most directly actionable module for the learner's day job.
