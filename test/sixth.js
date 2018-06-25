"use strict";

const qp = require("../lib/quadprog");

// base0to1 borrowed by
// https://github.com/sloisel/numeric/blob/master/src/quadprog.js
function base0to1(A) {
    if (typeof A !== "object") {
        return A;
    }

    const ret = [];
    const n = A.length;

    for (let i = 0; i < n; i += 1) {
        ret[i + 1] = base0to1(A[i]);
    }

    return ret;
}

function sixth() {
    const H = [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1]
    ];

    const g = [-5, -0.5, 0, 0.2, 2];

    // l = [-1, -1, -1, ...]
    const l = [-1, -1, -1, -1, -1];

    // b =[l; -u]
    const b = l.concat(l);

    // A = [eye(n,n), -eye(n,n)]
    const A = [
        [1, 0, 0, 0, 0, -1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, -1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, -1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, -1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, -1]
    ];

    const bvec = base0to1(b);
    const dvec = base0to1(g);
    const dmat = base0to1(H);
    const amat = base0to1(A);

    return qp.solveQP(dmat, dvec, amat, bvec);
}

module.exports = sixth;
