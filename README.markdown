QUADPROG
========
[![Build Status](https://travis-ci.org/albertosantini/node-quadprog.png)](https://travis-ci.org/albertosantini/node-quadprog)
[![NPM version](https://badge.fury.io/js/quadprog.png)](http://badge.fury.io/js/quadprog)
[![NGN Dependencies](https://david-dm.org/albertosantini/node-quadprog.png)](https://david-dm.org/albertosantini/node-quadprog)

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

Tested with node 0.12.x and with R 3.1.2.

Notes
=====

- In Fortran the array index starts from 1.

Applications
============

- [ConPA](https://github.com/albertosantini/node-conpa)
- [Numeric.js](https://github.com/sloisel/numeric)

See also
========

- [Vincent Zoonekynd's Blog](http://zoonek.free.fr/blosxom/R/2012-06-01_Optimization.html)
- [fast.js](https://github.com/codemix/fast.js)
- [Typed arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays)

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

- *message* string containing an error message, if the call failed.

TODO
====

- Add a test converting the following snippet:

```
# http://quantitate.blogspot.it/2015/02/more-on-quadratic-progamming-in-r.html

library("quadprog")

data(iris)
train <- iris
train$y <-ifelse(train[,5]=="setosa", 1, -1)

# order the training data labeling to avoid oddities with
# training labels in libsvm
# see http://www.csie.ntu.edu.tw/~cjlin/libsvm/faq.html#f430
train <- train[order(train$y, decreasing=TRUE),]

# set the problem data and parameters
X <- as.matrix(train[,c("Petal.Length", "Petal.Width")])
y <- as.matrix(train$y)
n <- dim(X)[1]

# solve QP with quadprog and the perturbance hack
# quadprog solver requires that the D matrix be symmetric positive definite.
# As a hack, we can perturb D by a small diagonal matrix and obtain positive
# definite matrix.
# Choose eps a relatively small value for the diagonal perturbance.
eps <- 5e-4

# build the system matrices
Q <- sapply(1:n, function(i) y[i]*t(X)[,i])
D <- t(Q)%*%Q
d <- matrix(1, nrow=n)
b0 <- rbind( matrix(0, nrow=1, ncol=1) , matrix(0, nrow=n, ncol=1) )
A <- t(rbind(matrix(y, nrow=1, ncol=n), diag(nrow=n)))

# call the QP solver:
sol <- solve.QP(D +eps*diag(n), d, A, b0, meq=1, factorized=FALSE)
qpsol <- matrix(sol$solution, nrow=n)
```
