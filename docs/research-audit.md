# Portfolio research audit

This audit records the evidence currently used by the portfolio pages. It is
deliberately limited to checked artifacts; claims without a saved artifact are
not promoted to verified results.

## GridCast

| Area | Status | Evidence |
| --- | --- | --- |
| CAISO provenance | VERIFIED | `gridcast-audit/verification.json`; CAISO OASIS endpoint and target checksums in `experiments/results/summary.json` |
| Historical window | VERIFIED | 2024-01-01 through 2025-12-31; demand 17,543 rows with one missing hour; price 17,544 rows |
| Chronological evaluation | VERIFIED | `experiments/results/summary.json` records validation from 2025-01-01 and test from 2025-07-01 |
| Baselines and intervals | VERIFIED | `experiments/results/summary.json` contains historical, calendar, seasonal and model rows plus 90% coverage fields |
| Operational/live forecast claim | QUALIFIED | Results are historical backtests; future-vintage weather and market availability remain documented limitations |

## Crash Test

| Area | Status | Evidence |
| --- | --- | --- |
| Source snapshot | VERIFIED | `crash-test-audit/artifacts/public/provenance.json`: 78,715 reports, 148 beats, 2015-03-19 to 2026-11-06 |
| Held-out evaluation | VERIFIED | `crash-test-audit/artifacts/public/summary.json`: 7,696 held-out 2025 rows; gradient boosting MAE 0.6969 vs 0.8418 Poisson and 0.8876 seasonal naive |
| Ranking metric | VERIFIED | Same artifact: top-decile lift 3.5873 and recall 0.5610 |
| Leakage controls | VERIFIED | Chronological split, one-week shifted lags/rolls, disjoint-beat test, and 2025 exclusion are recorded in `summary.json` |
| Street-level map claim | UNVERIFIED | The source has block address fields, not verified coordinates; portfolio copy therefore describes beat-level risk only |

## OrbitRisk

| Area | Status | Evidence |
| --- | --- | --- |
| Public orbital input | VERIFIED | `orbitrisk` static snapshot metadata: CelesTrak Stations URL, retrieval timestamp, SHA-256, 13 objects |
| Propagation | VERIFIED | SGP4 output is retained as TEME position/velocity in km and km/s; the report states the frame explicitly |
| Geometric screening | VERIFIED | Snapshot contains 13 trajectories and a deterministic screen result; the current threshold-qualified event list is empty, and the portfolio carousel consumes all catalog trajectories |
| Collision probability | QUALIFIED | Probability views are synthetic seeded uncertainty experiments, not operational covariance-based risk |
| Earth-fixed accuracy | QUALIFIED | The release does not claim an Earth-fixed transformation or operational conjunction assessment |

## Integrity rules

- `MarketRegime` is intentionally outside this audit and was not modified.
- No raw datasets, credentials, model checkpoints, or private replay bundles are
  included in the portfolio repository.
- A repeated statement across a page, README, or PDF is not independent
  verification; the artifact path above is the source of truth.
