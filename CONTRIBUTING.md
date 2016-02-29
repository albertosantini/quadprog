We love pull requests. Here's a quick guide:

- Fork the repo.

- Run the tests. We only take pull requests with passing tests, and it's great
to know that you have a clean slate: `npm test`.

- Add a test for your use case. Only refactoring and documentation changes
require no new tests. If you are adding functionality or fixing a bug, we need
a test!

- It is very useful providing a companion R script to compare the results:
generally speaking there is an issue only if the results of this package are
not the same of R ones.

- Update the documentation, the surrounding one, examples elsewhere, guides,
whatever is affected by your contribution.

- Follow the conventions you see used in the source already. You may give a look
at `.eslintrc.yml`.

- Push to your fork and submit a pull request (squashing the commits into one).

At this point you are waiting on us. We like to at least comment on, if not
accept, pull requests as soon as possible. We may suggest some changes or
improvements or alternatives.

If you are submitting an issue with unexpected results, don't forget to test the
results with `quadprog` package in R. Please, provide the R script and the
Javascript one.
