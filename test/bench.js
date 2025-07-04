"use strict";

const fs = require("node:fs");

const { performance } = require("node:perf_hooks");

const solve = require("../lib/quadprog").solveQP;

function wsolve(file) {
    const {
        Dmat,
        dvec,
        Amat,
        bvec,
        meq,
        factorized
    } = JSON.parse(fs.readFileSync(file).toString());

    [Dmat, Amat].forEach(m => m.forEach(r => r.unshift(0)));
    [Dmat, dvec, Amat, bvec].forEach(v => v.unshift([]));

    function wrapped() {
        solve(
            Dmat.map(r => r.slice()),
            dvec.slice(),
            Amat.map(r => r.slice()),
            bvec.slice(),
            meq,
            [, factorized ? 1 : 0] // eslint-disable-line no-sparse-arrays
        );
    }
    return wrapped;
}

fs.readdirSync("test")
    .filter(f => f.endsWith("-data.json"))
    .forEach(f => {
        const testName = f.slice(0, -10);
        const funcToBench = wsolve(`test/${f}`);
        const iterations = 1000; // Number of iterations for benchmarking

        let totalTime = 0;

        for (let i = 0; i < iterations; i++) {
            const start = performance.now();

            funcToBench();

            const end = performance.now();

            totalTime += (end - start);
        }

        const averageTime = totalTime / iterations;

        console.warn(`${testName}: Average time = ${averageTime.toFixed(4)} ms over ${iterations} iterations`);
    });
