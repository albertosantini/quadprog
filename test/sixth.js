"use strict";

var qp = require("../lib/quadprog");

// base0to1 borrowed by
// https://github.com/sloisel/numeric/blob/master/src/quadprog.js
function base0to1(A) {
    if (typeof A !== "object") {
        return A;
    }

    var ret = [];
    var n = A.length;
    var i;

    for (i = 0; i < n; i += 1) {
        ret[i + 1] = base0to1(A[i]);
    }

    return ret;
}

function sixth() {
    var H = [
        [1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0],
        [0, 0, 1, 0, 0],
        [0, 0, 0, 1, 0],
        [0, 0, 0, 0, 1]
    ];

    var g = [-5, -0.5, 0, 0.2, 2];

    // l = [-1, -1, -1, ...]
    var l = [-1, -1, -1, -1, -1];

    // b =[l; -u]
    var b = l.concat(l);

    // A = [eye(n,n), -eye(n,n)]
    var A = [
        [1, 0, 0, 0, 0, -1, 0, 0, 0, 0],
        [0, 1, 0, 0, 0, 0, -1, 0, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, -1, 0, 0],
        [0, 0, 0, 1, 0, 0, 0, 0, -1, 0],
        [0, 0, 0, 0, 1, 0, 0, 0, 0, -1]
    ];

    var bvec = base0to1(b);
    var dvec = base0to1(g);
    var dmat = base0to1(H);
    var amat = base0to1(A);

    return qp.solveQP(dmat, dvec, amat, bvec);
}

module.exports = sixth;
