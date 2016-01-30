"use strict";

var qp = require("../lib/quadprog");

function first() {
    var dmat = [], dvec = [], amat = [], bvec = [];

    dmat[1] = [];
    dmat[2] = [];
    dmat[3] = [];
    dmat[1][1] = 1;
    dmat[2][1] = 0;
    dmat[3][1] = 0;
    dmat[1][2] = 0;
    dmat[2][2] = 1;
    dmat[3][2] = 0;
    dmat[1][3] = 0;
    dmat[2][3] = 0;
    dmat[3][3] = 1;

    dvec[1] = 0;
    dvec[2] = 5;
    dvec[3] = 0;

    amat[1] = [];
    amat[2] = [];
    amat[3] = [];
    amat[1][1] = -4;
    amat[2][1] = -3;
    amat[3][1] = 0;
    amat[1][2] = 2;
    amat[2][2] = 1;
    amat[3][2] = 0;
    amat[1][3] = 0;
    amat[2][3] = -2;
    amat[3][3] = 1;

    bvec[1] = -8;
    bvec[2] = 2;
    bvec[3] = 0;

    return qp.solveQP(dmat, dvec, amat, bvec);
}

module.exports = first;
