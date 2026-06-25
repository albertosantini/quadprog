Unreleased
==========

* Normalize package repository metadata for npm consumers.
* Refine npm keywords to improve package discovery.

2.0.0 / 2026-06-25
==================

* Require Node.js 24.x and update CI to run on Node.js 24 with current
  GitHub Actions.
* Publish dual ESM and CommonJS entry points through package exports.
* Update package metadata for the `quadprog` repository name.
* Improve solver benchmark performance while preserving the 1-based
  Goldfarb-Idnani porting model.
* Fix and harden `qpgen2` edge cases covered by the expanded test suite.
* Refactor dpofa and vsmall internals.
* Modernize the test suite from tape to node:test and node:assert.
* Enforce 100% line, function, and branch coverage in npm test.
* Refactor benchmarks to use node:perf_hooks, add deterministic synthetic
  large cases, and add a CPU profiling script.
* Update README examples, mathematical notation, ESM and CommonJS usage,
  and Fortran porting notes.
* Rename repository references from node-quadprog to quadprog.
* Replace legacy lint configuration with ESLint flat config and update
  development dependencies.
* Add Dependabot configuration and project agent instructions.
* Remove Travis CI, legacy VS Code settings, and obsolete Copilot instructions.

1.6.1 / 2018-07-28
==================

* Refactor testing to be more general
  [PR #5](https://github.com/albertosantini/quadprog/pull/5)
  (thanks @erikbrinkman).
* Improve test diagnostics by printing compared values when approximate
  equality checks fail.
* Use `vsmall` as the starting epsilon for approximate equality comparisons.
* Add missing test descriptions and clean up solution and benchmark formatting.
* Add a Testing section to README and document local Node.js 10.x coverage.
* Update ESLint to 5.2.0.

1.6.0 / 2018-06-27
==================

* Support Node.js >=8.x and test on Node.js 8 and 10 in Travis CI.
* Refactor the code in ES2015 style.
* Split the monolithic solver into focused modules:
  `quadprog`, `qpgen2`, `dpofa`, `dposl`, `dpori`, and `vsmall`.
* Add module resolution settings to `jsconfig.json`.
* Add VS Code workspace settings for the linting workflow.
* Expand ESLint rules and update ESLint to 5.x.
* Update README links and examples.

1.5.1 / 2017-07-15
==================

* Add sixth example.
* Add the sixth benchmark case.
* Add `jsconfig.json` for editor linting support.
* Remove the unstable David dependency badge.
* Update benchmark and ESLint development dependencies.

1.5.0 / 2016-03-28
==================

* Refactor tests with tape.
* Add `bench.js` and benchmark task support.
* Update CONTRIBUTING with guidance for comparing results against R.
* Highlight in README that array indexes start from 1, not 0.
* Improve README notes and fix documentation typos.
* Update tape and ESLint development dependencies.

1.4.0 / 2015-12-10
==================

* Fix iterations and constraints condition
  [issue #4](https://github.com/albertosantini/quadprog/issues/4)
  (thanks @castek).
* Add input argument validation and test the returned message value.
* Add third, fourth, and fifth examples with matching R fixtures.
* Add third, fourth, and fifth cases to the benchmark suite.
* Rename HISTORY to CHANGELOG.
* Add CONTRIBUTING.md.
* Update README and development dependencies.

1.3.0 / 2015-02-27
==================

* Fix `Number.EPSILON` regression
  [issue #3](https://github.com/albertosantini/quadprog/issues/3)
  (thanks @cygnyx).
* Fix typo in HISTORY.

1.2.0 / 2015-02-19
==================

* Add Lagrangian output
  [PR #2](https://github.com/albertosantini/quadprog/pull/2)
  (thanks @cygnyx).
* Add Lagrangian tests for the first and second examples.
* Document Lagrangian output in README.
* Use `Number.EPSILON` instead of manually calculating machine epsilon.
* Add benchmark task support.
* Add Grunt support.
* Convert `.eslintrc` to YAML and expand lint rules.
* Update Travis CI for Node.js and io.js.
* Update README links and test environment notes.

1.1.0 / 2014-06-07
==================

* Fix active-set control flow for
  [issue #1](https://github.com/albertosantini/quadprog/issues/1)
  (thanks @vladimir-konnov).
* Add a second test case.
* Add eslint linting and fix lint errors.
* Add the first test folder.
* Update README badges, optimization links, and documentation typos.

1.0.3 / 2013-03-13
==================

* Add Travis CI integration.
* Add HISTORY file.
* Add Applications section to README.
* Fix Travis badge and notification configuration.

1.0.2 / 2011-09-19
==================

* Add assertions to the JavaScript example.
* Add the companion R example for comparison with the JavaScript example.
* Fix the example module path and a documentation typo.

1.0.1 / 2011-09-13
==================

* Fix engine version in package metadata for the supported Node.js version.

1.0.0 / 2011-09-13
==================

* Initial release of the JavaScript quadratic programming solver.
