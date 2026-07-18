# Life Power deterministic assertion

Screen 12 uses the ten-domain fixture below. The implemented shared calculation follows DVF-06:

`round(sum(values) × (1 + 0.15 × (1 - coefficientOfVariation(values))))`

Fixture values, in domain order: `57, 51, 49, 44, 37, 36, 43, 39, 41, 35`.

```json
{
  "domains": 10,
  "uniqueNames": 10,
  "sum": 432,
  "mean": 43.2,
  "cv": 0.157951,
  "multiplier": 1.126307,
  "score": 487,
  "expected": 487,
  "pass": true
}
```

The assertion was produced with an independent Node calculation before screen integration. Final acceptance also requires source review confirming that the polygon, axes, visible score, count, and accessible summary consume the same payload.
