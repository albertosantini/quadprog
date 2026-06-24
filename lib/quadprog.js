import qpgen2 from "./qpgen2.js";

/**
 * Solve a Quadratic Programming problem.
 * @param {number[][]} Dmat matrix appearing in the quadratic function to be minimized.
 * @param {number[]} dvec vector appearing in the quadratic function to be minimized.
 * @param {number[][]} Amat matrix defining the constraints under which the minimization should take place.
 * @param {number[]} [bvec] vector defining the constraints under which the minimization should take place.
 * @param {number} [meq] the first meq constraints are treated as equality constraints, all further as inequality constraints.
 * @param {number[]} [factorized] a logical value: if TRUE, Dmat is the Cholesky decomposition of the matrix appearing in the quadratic function.
 * @returns {any} a list with the following components: solution, value, unconstrainedSolution, iterations, Lagrangian, iact, message.
 */
function solveQP(Dmat, dvec, Amat, bvec = [], meq = 0, factorized = [0, 0]) {
    let message = "";

    // In Fortran the array index starts from 1
    const n = Dmat.length - 1;
    const q = Amat[1].length - 1;

    if (bvec.length === 0) {
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

    const nact = 0;
    const r = Math.min(n, q);
    const workSize = 2 * n + (r * (r + 5)) / 2 + 2 * q + 1;
    const crval = new Array(2);
    const iact = new Array(q + 1);
    const sol = new Array(n + 1);
    const lagr = new Array(q + 1);
    const work = new Array(workSize + 1);
    const iter = new Array(3);

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
        unconstrained_solution: dvec,
        iterations: iter,
        iact,
        message
    };
}

export { solveQP };
