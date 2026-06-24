# Benchmark Baseline

Baseline captured on 2026-06-24 with Node.js 24.18.0 on Windows, using:

```powershell
npm run benchmark
```

The benchmark reports warmup-controlled clone, solve, and total timings. Use
the `solve mean` column as the primary runtime comparison for solver changes.

| Case | Iterations | Warmup | Clone mean ms | Solve mean ms | Total mean ms |
| --- | ---: | ---: | ---: | ---: | ---: |
| barbiggs | 1000 | 100 | 0.0108 | 1.0191 | 0.9751 |
| fifth | 1000 | 100 | 0.0027 | 0.0546 | 0.0628 |
| first | 1000 | 100 | 0.0014 | 0.0082 | 0.0077 |
| fourth | 1000 | 100 | 0.0012 | 0.0053 | 0.0069 |
| second | 1000 | 100 | 0.0028 | 0.0413 | 0.0448 |
| second-fact | 1000 | 100 | 0.0018 | 0.0483 | 0.0512 |
| sixth | 1000 | 100 | 0.0017 | 0.0171 | 0.0164 |
| third | 1000 | 100 | 0.0020 | 0.0357 | 0.0474 |
| synthetic-n25-q100 | 100 | 20 | 0.0127 | 1.5925 | 1.5457 |
| synthetic-n50-q200 | 100 | 20 | 0.0280 | 8.8359 | 8.6874 |

For targeted CPU profiling on the synthetic large cases, run:

```powershell
npm run benchmark:profile
```
