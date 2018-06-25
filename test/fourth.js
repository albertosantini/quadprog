"use strict";

const qp = require("../lib/quadprog");

function fourth() {
    const dmat = [];
    const dvec = [];
    const amat = [];
    const bvec = [];

    dmat[1] = Array.from({ length: 4 }, () => 0);
    dmat[2] = Array.from({ length: 4 }, () => 0);
    dmat[3] = Array.from({ length: 4 }, () => 0);
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

    amat[1] = Array.from({ length: 2 }, () => 0);
    amat[2] = Array.from({ length: 2 }, () => 0);
    amat[3] = Array.from({ length: 2 }, () => 0);
    amat[1][1] = 0;
    amat[2][1] = 0;
    amat[3][1] = -1;

    bvec[1] = -25;

    const meq = 1;

    return qp.solveQP(dmat, dvec, amat, bvec, meq);
}

module.exports = fourth;
