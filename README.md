QUADPROG
========
[![Build Status](https://travis-ci.org/albertosantini/node-quadprog.png)](https://travis-ci.org/albertosantini/node-quadprog)
[![NPM version](https://badge.fury.io/js/quadprog.png)](http://badge.fury.io/js/quadprog)

This module contains routines for solving quadratic programming problems,
written in JavaScript.

quadprog is a porting of a [R](http://www.r-project.org) package:
[quadprog](http://cran.r-project.org/web/packages/quadprog/), implemented in
Fortran.

It implements the dual method of Goldfarb and Idnani (1982, 1983) for solving
quadratic programming problems of the form min(d T b + 1=2b T Db) with the
constraints AT b >= b0.

References
==========

D. Goldfarb and A. Idnani (1982). Dual and Primal-Dual Methods for Solving
Strictly Convex Quadratic Programs. In J. P. Hennart (ed.), Numerical Analysis,
Springer-Verlag, Berlin, pages 226–239.

D. Goldfarb and A. Idnani (1983). A numerically stable dual method for solving
strictly convex quadratic programs. Mathematical Programming, 27, 1–33.

Example
========

```
// ##
// ## Assume we want to minimize: -(0 5 0) %*% b + 1/2 b^T b
// ## under the constraints: A^T b >= b0
// ## with b0 = (-8,2,0)^T
// ## and
// ##     (-4 2  0)
// ## A = (-3 1 -2)
// ##     ( 0 0  1)
// ## we can use solve.QP as follows:
// ##
// Dmat <- matrix(0,3,3)
// diag(Dmat) <- 1
// dvec <- c(0,5,0)
// Amat <- matrix(c(-4,-3,0,2,1,0,0,-2,1),3,3)
// bvec <- c(-8,2,0)
// solve.QP(Dmat,dvec,Amat,bvec=bvec)

var qp = require('quadprog');

var Dmat = [], dvec = [], Amat = [], bvec = [], res;

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

res = qp.solveQP(Dmat, dvec, Amat, bvec)
```

Installation
============

To install with [npm](http://github.com/isaacs/npm):

    npm install quadprog

Tested locally with Node.js 10.x and with R 3.4.1.

Notes
=====

**To maintain a one-to-one porting with the Fortran implementation, the array
index starts from 1 and not from zero. Please, be aware and give a look at the
examples in the test folder**.

If you are using `node-quadprog` via Numeric.js, don't forget the releases may
be not in sync. Latest release is here.

Applications
============

- [ConPA](https://github.com/albertosantini/node-conpa)
- [Numeric.js](https://github.com/sloisel/numeric)

See also
========

- [GPU Accelerated JavaScript](https://github.com/gpujs/gpu.js)
- [Vincent Zoonekynd's Blog](http://zoonek.free.fr/blosxom/R/2012-06-01_Optimization.html)
- [fast.js](https://github.com/codemix/fast.js)
- [Vectorious](https://github.com/mateogianolio/vectorious)
- [More on Quadratic Programming in R](http://quantitate.blogspot.it/2015/02/more-on-quadratic-progamming-in-r.html)

Methods
=======

solveQP(Dmat, dvec, Amat, bvec, meq=0, factorized=FALSE)
-------

**Arguments**

- *Dmat* matrix appearing in the quadratic function to be minimized.

- *dvec* vector appearing in the quadratic function to be minimized.

- *Amat* matrix deﬁning the constraints under which we want to minimize the
quadratic function.

- *bvec* vector holding the values of b0 (defaults to zero).

- *meq* the ﬁrst meq constraints are treated as equality constraints, all
further as inequality constraints (defaults to 0).

- *factorized* logical ﬂag: if TRUE, then we are passing R1 (where D = RT R)
instead of the matrix D in the argument Dmat.

**Value**

An object with the following property:

- *solution* vector containing the solution of the quadratic programming
problem.

- *value* scalar, the value of the quadratic function at the solution

- *unconstrained.solution* vector containing the unconstrained minimizer of the
quadratic function.

- *iterations* vector of length 2, the ﬁrst component contains the number of
iterations the algorithm needed, the second indicates how often constraints
became inactive after becoming active ﬁrst.

- *Lagrangian* vector with the Lagrangian multipliers at the solution.

- *iact* vector with the indices of the active constraints at the solution.

- *message* string containing an error message, if the call failed, otherwise empty.

Testing
=======

Base test cases are in json formatted files with the name `<name>-data.json`.
These can be passed into `solve.R` to create the standard R results for solveQP with the name `<name>-result.json`.
The standard usage is `Rscript solve.R *-data.json`, but you may wish to only create result files for specific tests.
The combination of these files is then used by `solution-test.js` and `bench.js`.


Adding Tests
------------

To add a new test simply create a file called `<name>-data.json` in the test directory, and then call `Rscript solve.R <name>-data.json` and commit the results.
