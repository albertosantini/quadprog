"use strict";

var qp = require("../lib/quadprog");

function fourth() {
    var dmat = [], dvec = [], amat = [], bvec = [], meq;

    dmat[1] = [];
    dmat[2] = [];
    dmat[3] = [];
    dmat[1][1] = 13;
    dmat[2][1] = 18;
    dmat[3][1] = -6;
    dmat[1][2] = 18;
    dmat[2][2] = 27;
    dmat[3][2] = -9;
    dmat[1][3] = -6;
    dmat[2][3] = -9;
    dmat[3][3] = 4;

    dvec[1] = -4;
    dvec[2] = 0;
    dvec[3] = -100;

    amat[1] = [];
    amat[2] = [];
    amat[3] = [];
    amat[1][1] = 0;
    amat[2][1] = 0;
    amat[3][1] = -1;

    bvec[1] = -25;

    meq = 1;

    return qp.solveQP(dmat, dvec, amat, bvec, meq);
}

module.exports = fourth;
