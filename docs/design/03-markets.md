# Design: Markets & venues module

Implements [docs/requirements/03-markets.md](../requirements/03-markets.md).

- Section `data-page="markets"`: "Exchange vs OTC", "Order book mechanics", "Trade lifecycle: from order to settlement", "Market data types you'll work with".
- Trade lifecycle is presented as a sequence (order → settlement) so it can be referenced by id/stage from later modules (e.g. Pipelines' reconciliation content) without duplicating the explanation.
