QUADPROG
========

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

See examples directory.

Installation
============

To install with [npm](http://github.com/isaacs/npm):

    npm install quadprog

Tested with node 0.4.11 and tested results with R 2.13.1.

Notes
=====

- In Fortran the array index starts from 1.

- Lagrangian is not calculated.

Applications
============

- [ConPA](https://github.com/albertosantini/node-conpa)

- [Numeric.js](https://github.com/sloisel/numeric)

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

- *Lagrangian* vector with the Lagragian at the solution (*to be implemented*).

- *iact* vector with the indices of the active constraints at the solution.

- *message* string containing an error message, if the call failed.

