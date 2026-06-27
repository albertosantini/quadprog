# Benchmark Baseline

Baseline captured on 2026-06-27 with Node.js 24.18.0 on Windows, using:

```powershell
npm run benchmark
```

The benchmark reports warmup-controlled clone, solve, and total timings. Use
the `solve mean` column as the primary runtime comparison for solver changes.

| Case | Iterations | Warmup | Clone mean ms | Solve mean ms | Total mean ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| barbiggs | 1000 | 100 | 0.0079 | 0.8410 | 0.5882 |
| fifth | 1000 | 100 | 0.0027 | 0.0360 | 0.0506 |
| first | 1000 | 100 | 0.0034 | 0.0046 | 0.0062 |
| fourth | 1000 | 100 | 0.0017 | 0.0054 | 0.0083 |
| second | 1000 | 100 | 0.0016 | 0.0339 | 0.0416 |
| second-fact | 1000 | 100 | 0.0019 | 0.0397 | 0.0479 |
| sixth | 1000 | 100 | 0.0010 | 0.0153 | 0.0130 |
| third | 1000 | 100 | 0.0009 | 0.0348 | 0.0461 |
| synthetic-n25-q100 | 100 | 20 | 0.0113 | 0.9672 | 1.1330 |
| synthetic-n50-q200 | 100 | 20 | 0.0164 | 5.4844 | 5.6377 |

For targeted CPU profiling on the synthetic large cases, run:

```powershell
npm run benchmark:profile
```
