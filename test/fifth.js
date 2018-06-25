"use strict";

const qp = require("../lib/quadprog");

function fifth() {
    const dmat = JSON.parse(`[
        [],
        [0,2,0,0,0,0,0],
        [0,0,2,0,0,0,0],
        [0,0,0,2,0,0,0],
        [0,0,0,0,2,0,0],
        [0,0,0,0,0,2,0],
        [0,0,0,0,0,0,2]
    ]`);
    const dvec = JSON.parse("[0,-10,-10,-30,-20,-30,-20]");
    const amat = JSON.parse(`[
        [],
        [0,1,0,0,-1,0,0,1,0,0,0,0,0],
        [0,0,1,0,-1,0,0,0,1,0,0,0,0],
        [0,0,1,0,0,-1,0,0,0,1,0,0,0],
        [0,0,1,0,0,0,-1,0,0,0,1,0,0],
        [0,0,0,1,0,-1,0,0,0,0,0,1,0],
        [0,0,0,1,0,0,-1,0,0,0,0,0,1]
    ]`);
    const bvec = JSON.parse("[0,4,5,1,-7.001,-1.001,-2.001,0,0,0,0,0,0]");
    const meq = 3;

    return qp.solveQP(dmat, dvec, amat, bvec, meq);
}

module.exports = fifth;
