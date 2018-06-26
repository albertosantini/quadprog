"use strict";

const qpgen2 = require("./qpgen2");

function solveQP(Dmat, dvec, Amat, bvec = [], meq = 0, factorized = [0, 0]) {
    const crval = [];
    const iact = [];
    const sol = [];
    const lagr = [];
    const work = [];
    const iter = [];

    let message = "";

    // In Fortran the array index starts from 1
    const n = Dmat.length - 1;
    const q = Amat[1].length - 1;

    if (!bvec) {
        for (let i = 1; i <= q; i += 1) {
            bvec[i] = 0;
        }
    }

    if (n !== Dmat[1].length - 1) {
        message = "Dmat is not symmetric!";
    }
    if (n !== dvec.length - 1) {
        message = "Dmat and dvec are incompatible!";
    }
    if (n !== Amat.length - 1) {
        message = "Amat and dvec are incompatible!";
    }
    if (q !== bvec.length - 1) {
        message = "Amat and bvec are incompatible!";
    }
    if ((meq > q) || (meq < 0)) {
        message = "Value of meq is invalid!";
    }

    if (message !== "") {
        return {
            message
        };
    }

    for (let i = 1; i <= q; i += 1) {
        iact[i] = 0;
        lagr[i] = 0;
    }

    const nact = 0;
    const r = Math.min(n, q);

    for (let i = 1; i <= n; i += 1) {
        sol[i] = 0;
    }
    crval[1] = 0;
    for (let i = 1; i <= (2 * n + (r * (r + 5)) / 2 + 2 * q + 1); i += 1) {
        work[i] = 0;
    }
    for (let i = 1; i <= 2; i += 1) {
        iter[i] = 0;
    }

    qpgen2(Dmat, dvec, n, n, sol, lagr, crval, Amat, bvec, n, q, meq, iact, nact, iter, work, factorized);

    if (factorized[1] === 1) {
        message = "constraints are inconsistent, no solution!";
    }
    if (factorized[1] === 2) {
        message = "matrix D in quadratic function is not positive definite!";
    }

    return {
        solution: sol,
        Lagrangian: lagr,
        value: crval,
        unconstrained_solution: dvec, // eslint-disable-line camelcase
        iterations: iter,
        iact,
        message
    };
}

exports.solveQP = solveQP;
