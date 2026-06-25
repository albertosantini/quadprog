QUADPROG
========
[![NPM version](https://badge.fury.io/js/quadprog.svg)](https://badge.fury.io/js/quadprog)
![](https://github.com/albertosantini/quadprog/workflows/CI/badge.svg)

This module contains routines for solving quadratic programming problems,
written in JavaScript.

quadprog is a JavaScript port of the [R](https://www.r-project.org) package
[quadprog](https://cran.r-project.org/web/packages/quadprog/), implemented in
Fortran.

It implements the dual method of Goldfarb and Idnani (1982, 1983) for solving
quadratic programming problems of the form

$$
\begin{aligned}
\text{minimize} \quad & -d^T b + \frac{1}{2} b^T D b \\
\text{subject to} \quad & A^T b \geq b_0
\end{aligned}
$$

References
==========

- D. Goldfarb and A. Idnani (1982). Dual and Primal-Dual Methods for Solving
Strictly Convex Quadratic Programs. In J. P. Hennart (ed.), Numerical Analysis,
Springer-Verlag, Berlin, pages 226–239.

- D. Goldfarb and A. Idnani (1983). A numerically stable dual method for solving
strictly convex quadratic programs. Mathematical Programming, 27, 1–33.


Installation and usage
======================

To install with [npm](https://www.npmjs.com/package/quadprog):

    npm install quadprog

Usage:

    import { solveQP } from "quadprog"; // ESM

or

    const { solveQP } = require("quadprog"); // CJS

Tested locally with Node.js 24.x and with R 4.x.

Example
========

```r
## Assume we want to minimize: -(0 5 0) %*% b + 1/2 b^T b
## under the constraints: A^T b >= b0
## with b0 = (-8,2,0)^T
## and
##     (-4 2  0)
## A = (-3 1 -2)
##     ( 0 0  1)
## we can use solve.QP as follows:
##
require(quadprog)

Dmat <- matrix(0, 3, 3)
diag(Dmat) <- 1
dvec <- c(0, 5 ,0)
Amat <- matrix(c(-4, -3, 0, 2, 1, 0, 0, -2, 1), 3, 3)
bvec <- c(-8, 2 ,0)

solve.QP(Dmat, dvec, Amat, bvec=bvec)

# $solution
# [1] 0.4761905 1.0476190 2.0952381

# $value
# [1] -2.380952

# $unconstrained.solution
# [1] 0 5 0

# $iterations
# [1] 3 0

# $Lagrangian
# [1] 0.0000000 0.2380952 2.0952381

# $iact
# [1] 3 2
```

```javascript
import { solveQP } from "quadprog";

const Dmat = [], dvec = [], Amat = [], bvec = [];

Dmat[1] = [];
Dmat[2] = [];
Dmat[3] = [];
Dmat[1][1] = 1;
Dmat[2][1] = 0;
Dmat[3][1] = 0;
Dmat[1][2] = 0;
Dmat[2][2] = 1;
Dmat[3][2] = 0;
Dmat[1][3] = 0;
Dmat[2][3] = 0;
Dmat[3][3] = 1;

dvec[1] = 0;
dvec[2] = 5;
dvec[3] = 0;

Amat[1] = [];
Amat[2] = [];
Amat[3] = [];
Amat[1][1] = -4;
Amat[2][1] = -3;
Amat[3][1] = 0;
Amat[1][2] = 2;
Amat[2][2] = 1;
Amat[3][2] = 0;
Amat[1][3] = 0;
Amat[2][3] = -2;
Amat[3][3] = 1;

bvec[1] = -8;
bvec[2] = 2;
bvec[3] = 0;

solveQP(Dmat, dvec, Amat, bvec)

// {
//   solution: [
//     <1 empty item>,
//     0.47619047619047616,
//     1.0476190476190477,
//     2.0952380952380953
//   ],
//   Lagrangian: [ <1 empty item>, 0, 0.23809523809523808, 2.0952380952380953 ],
//   value: [ <1 empty item>, -2.380952380952381 ],
//   unconstrained_solution: [ <1 empty item>, 0, 5, 0 ],
//   iterations: [ <1 empty item>, 3, 0 ],
//   iact: [ <1 empty item>, 3, 2, 0 ],
//   message: ''
// }
```

Notes
=====

This is a direct port of the Fortran code contained in the R package
[quadprog](https://cran.r-project.org/web/packages/quadprog/).

**To preserve one-to-one alignment with the Fortran implementation, arrays are
1-based rather than 0-based. See the examples in the test folder for the
expected input shape**.

If you are using `quadprog` via
[Numeric.js](https://github.com/sloisel/numeric), don't forget the releases
may not be in sync.

Latest releases are [here](https://github.com/albertosantini/quadprog/releases).

See also
========

- [GPU Accelerated JavaScript](https://github.com/gpujs/gpu.js)
- [Vincent Zoonekynd's Blog](http://zoonek.free.fr/blosxom/R/2012-06-01_Optimization.html)
- [fast.js](https://github.com/codemix/fast.js)
- [Vectorious](https://github.com/mateogianolio/vectorious)

Methods
=======

solveQP(Dmat, dvec, Amat, bvec = [], meq = 0, factorized = [0, 0])
-------

**Arguments**

- *Dmat* matrix appearing in the quadratic function to be minimized.

- *dvec* vector appearing in the quadratic function to be minimized.

- *Amat* matrix defining the constraints under which we want to minimize the
quadratic function.

- *bvec* vector holding the values of b0 (defaults to zero).

- *meq* the first meq constraints are treated as equality constraints, all
further as inequality constraints (defaults to 0).

- *factorized* port-style flag array. Omit it or pass `[0, 0]` for the same
behavior as R's `factorized=FALSE`. Pass `[0, 1]` when `Dmat` contains
`R^-1`, where `D = R^T R`.

**Value**

An object with the following properties:

- *solution* vector containing the solution of the quadratic programming
problem.

- *value* scalar, the value of the quadratic function at the solution.

- *unconstrained_solution* vector containing the unconstrained minimizer of the
quadratic function.

- *iterations* vector of length 2, the first component contains the number of
iterations the algorithm needed, the second indicates how often constraints
became inactive after becoming active first.

- *Lagrangian* vector with the Lagrangian multipliers at the solution.

- *iact* vector with the indices of the active constraints at the solution.

- *message* string containing an error message, if the call failed, otherwise
empty.

Testing
=======

Run the full local validation suite with:

    npm run validate

This runs linting, TypeScript checking, the Node.js test runner with 100%
coverage gates, and the benchmark suite.

Base test cases are in JSON formatted files with the name `<name>-data.json`.
These can be passed into `solve.R` to create the standard R results for
`solveQP` with the name `<name>-result.json`. The standard usage is
`Rscript solve.R *-data.json`, but you may wish to only create result files for
specific tests. The combination of these files is then used by
`solution-test.js` and `bench.js`.


Adding Tests
------------

To add a new test, create a file called `<name>-data.json` in the test
directory, then call `Rscript solve.R <name>-data.json` and commit the results.
