# Requirement: Finance data types module

**What:** The data modelling rules that are specific to finance and that a generalist data engineer is likely to get wrong: never use float for money, business dates vs calendar dates, bi-temporal modelling, multi-currency handling.

**Why:** This is the highest-leverage module for the learner's actual day job — these are concrete modelling decisions, not background knowledge, and getting them wrong causes real bugs (rounding errors, wrong-day cutoffs, irreproducible historical reports).

**Not:** Does not cover risk-specific data requirements (see Risk module) or pipeline-specific patterns (see Pipelines module) — this module is about the data types/values themselves.
