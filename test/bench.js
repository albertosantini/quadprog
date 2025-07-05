import { readFileSync, readdirSync } from "node:fs";
import { performance } from "node:perf_hooks";
import { solveQP } from "../lib/quadprog.js";

function wsolve(file) {
    const {
        Dmat,
        dvec,
        Amat,
        bvec,
        meq,
        factorized
    } = JSON.parse(readFileSync(file).toString());

    [Dmat, Amat].forEach(m => m.forEach(r => r.unshift(0)));
    [Dmat, dvec, Amat, bvec].forEach(v => v.unshift([]));

    function wrapped() {
        solveQP(
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

readdirSync("test")
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
