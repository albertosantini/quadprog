# Contributing

We love pull requests. This project is a close JavaScript port of the R
`quadprog` package, so correctness and parity with the reference behavior matter
more than cosmetic rewrites.

## Development Setup

1. Fork the repository.
2. Use Node.js 24.x.
3. Install dependencies with:

    ```sh
    npm install
    ```

## Validation

Run the full validation suite before opening a pull request:

```sh
npm run validate
```

This runs linting, TypeScript checking, unit tests with 100% line, function, and
branch coverage, and the benchmark suite.

For benchmark-only checks, use:

```sh
npm run benchmark
```

## Tests

Add a test for every bug fix or behavior change. Documentation-only changes and
pure refactors may not need new tests, but any functional change must keep
project coverage at 100%.

Tests should be explicit enough to show:

1. The unit under test.
2. The expected behavior.
3. The actual solver output.
4. The expected output.
5. The failure mode the test would catch.

Prefer local factory data or JSON fixtures over shared mutable test state.

## Numerical Results

When reporting or fixing numerical behavior, compare the same input against the
R `quadprog` package whenever possible. Please provide both:

- A JavaScript reproduction.
- A companion R script or generated result fixture.

In general, unexpected results are actionable when this package diverges from R
`quadprog` for the same quadratic program.

## Documentation

Update every document affected by your change. Depending on the contribution,
this can include README examples, API notes, benchmark baselines, or changelog
entries.

If benchmark semantics or meaningful performance baselines change, update
`test/benchmark-baseline.md` and compare solver changes primarily through the
`solve mean` column.

## Style

Follow the conventions used in the existing source. The most relevant files are:

- `eslint.config.js` for linting rules.
- `jsconfig.json` for type checking.
- `AGENTS.md` for project workflow and release rules.
- Existing tests under `test/` for fixture and assertion style.

The solver intentionally preserves the 1-based indexing and port-style control
flow needed to stay aligned with the original Fortran and R implementations.
Avoid rewrites that make parity harder to review.

## Pull Requests

Before submitting a pull request:

1. Keep the change focused on one logical unit.
2. Run `npm run validate`.
3. Include tests for functional changes.
4. Update relevant documentation.
5. Squash your commits into one commit when appropriate.

After you submit the pull request, we will review it as soon as possible. We may
suggest changes, improvements, or alternatives before merging.

## Issues

When opening an issue for unexpected results, include:

- The JavaScript input and output.
- The matching R `quadprog` script and output.
- The Node.js version.
- Any relevant platform details.
