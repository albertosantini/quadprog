/*jslint node:true */

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

var qp = require('../lib/quadprog'),
    assert = require("assert");

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

res = qp.solveQP(Dmat, dvec, Amat, bvec);

console.log(res);

assert.equal(0.47619047619047616, res.solution[1]);
assert.equal(1.0476190476190477, res.solution[2]);
assert.equal(2.0952380952380953, res.solution[3]);
assert.equal(-2.380952380952381, res.value[1]);
assert.equal(0, res.unconstrained_solution[1]);
assert.equal(5, res.unconstrained_solution[2]);
assert.equal(0, res.unconstrained_solution[3]);
assert.equal(3, res.iterations[1]);
assert.equal(0, res.iterations[2]);
assert.equal(3, res.iact[1]);
assert.equal(2, res.iact[2]);

