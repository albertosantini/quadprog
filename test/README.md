Testing
=======

Base test cases are in json formatted files with the name `<name>-data.json`.
These can be passed into `solve.R` to create the standard R results for solveQP with the name `<name>-result.json`.
The standard usage is `Rscript solve.R *-data.json`, but you may wish to only create result files for specific tests.
The combination of these files is then used by `solution-test.js` and `bench.js`.


Adding Tests
------------

To add a new test simply create a file called `<name>-data.json` in the test directory, and then call `Rscript solve.R <name>-data.json` and commit the results.
