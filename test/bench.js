import { readFileSync, readdirSync } from "node:fs";
import { performance } from "node:perf_hooks";
import { solveQP } from "../lib/quadprog.js";

const DEFAULT_ITERATIONS = 1000;
const DEFAULT_WARMUP_ITERATIONS = 100;
const PERCENTILE = 0.95;
const LARGE_CASE_ITERATIONS = 100;
const LARGE_CASE_WARMUP_ITERATIONS = 20;
const SYNTHETIC_ONLY = process.argv.includes("--synthetic-only");

/**
 * @typedef {Object} BenchmarkProblem
 * @property {string} name the benchmark case name.
 * @property {number[][]} Dmat the quadratic objective matrix.
 * @property {number[]} dvec the quadratic objective vector.
 * @property {number[][]} Amat the constraint matrix.
 * @property {number[]} bvec the constraint vector.
 * @property {number} meq the number of equality constraints.
 * @property {boolean} factorized whether Dmat is already factorized.
 * @property {number} [iterations] the benchmark iterations for this case.
 * @property {number} [warmupIterations] the warmup iterations for this case.
 */

/**
 *
 * @param {string} name
 * @param {number} fallback
 * @throws {Error} when the environment variable is not a positive integer.
 * @returns {number} the configured positive integer or fallback value.
 */
function readPositiveInteger(name, fallback) {
    const rawValue = process.env[name];

    if (!Object.hasOwn(process.env, name)) {
        return fallback;
    }

    const value = Number(rawValue);

    if (!Number.isInteger(value) || value <= 0) {
        throw new Error(`${name} must be a positive integer.`);
    }

    return value;
}

/**
 *
 * @param {string} file
 * @returns {BenchmarkProblem} the padded benchmark problem.
 */
function readProblem(file) {
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

    return {
        name: file.slice(5, -10),
        Dmat,
        dvec,
        Amat,
        bvec,
        meq,
        factorized
    };
}

/**
 *
 * @param {string} name
 * @param {number} n
 * @param {number} q
 * @returns {BenchmarkProblem} a deterministic benchmark problem.
 */
function createSyntheticProblem(name, n, q) {
    const Dmat = new Array(n + 1);
    const dvec = new Array(n + 1);
    const Amat = new Array(n + 1);
    const bvec = new Array(q + 1);

    Dmat[0] = [];
    dvec[0] = [];
    Amat[0] = [];
    bvec[0] = [];

    for (let i = 1; i <= n; i += 1) {
        Dmat[i] = new Array(n + 1).fill(0);
        Amat[i] = new Array(q + 1).fill(0);
        Dmat[i][i] = 1 + i / (10 * n);
        dvec[i] = 1;
    }

    for (let i = 1; i <= q; i += 1) {
        const variableIndex = ((i - 1) % n) + 1;

        if (i <= n) {
            Amat[variableIndex][i] = -1;
            bvec[i] = 0;
        } else {
            Amat[variableIndex][i] = 1;
            bvec[i] = -100 - i / q;
        }
    }

    return {
        name,
        Dmat,
        dvec,
        Amat,
        bvec,
        meq: 0,
        factorized: false,
        iterations: LARGE_CASE_ITERATIONS,
        warmupIterations: LARGE_CASE_WARMUP_ITERATIONS
    };
}

/**
 *
 * @param {BenchmarkProblem} problem
 * @returns {BenchmarkProblem} a mutable copy for one solver run.
 */
function cloneProblem(problem) {
    return {
        name: problem.name,
        Dmat: problem.Dmat.map(r => r.slice()),
        dvec: problem.dvec.slice(),
        Amat: problem.Amat.map(r => r.slice()),
        bvec: problem.bvec.slice(),
        meq: problem.meq,
        factorized: problem.factorized,
        iterations: problem.iterations,
        warmupIterations: problem.warmupIterations
    };
}

/**
 *
 * @param {BenchmarkProblem} problem
 * @returns {void} nothing.
 */
function solveProblem(problem) {
    solveQP(
        problem.Dmat,
        problem.dvec,
        problem.Amat,
        problem.bvec,
        problem.meq,
        [0, problem.factorized ? 1 : 0]
    );
}

/**
 *
 * @param {() => void} operation
 * @param {number} iterations
 * @returns {number[]} elapsed milliseconds for each operation run.
 */
function measure(operation, iterations) {
    const samples = new Array(iterations);

    for (let i = 0; i < iterations; i += 1) {
        const start = performance.now();

        operation();

        samples[i] = performance.now() - start;
    }

    return samples;
}

/**
 *
 * @param {BenchmarkProblem} problem
 * @param {number} iterations
 * @returns {number[]} elapsed milliseconds for each solver-only run.
 */
function measureSolve(problem, iterations) {
    const samples = new Array(iterations);

    for (let i = 0; i < iterations; i += 1) {
        const clonedProblem = cloneProblem(problem);
        const start = performance.now();

        solveProblem(clonedProblem);

        samples[i] = performance.now() - start;
    }

    return samples;
}

/**
 *
 * @param {number[]} samples
 * @returns {{min: number, mean: number, p95: number}} summary statistics for the samples.
 */
function summarize(samples) {
    const ordered = samples.slice().sort((left, right) => left - right);
    const total = samples.reduce((sum, value) => sum + value, 0);
    const percentileIndex = Math.min(
        ordered.length - 1,
        Math.ceil(ordered.length * PERCENTILE) - 1
    );

    return {
        min: ordered[0],
        mean: total / samples.length,
        p95: ordered[percentileIndex]
    };
}

/**
 *
 * @param {string} label
 * @param {{min: number, mean: number, p95: number}} stats
 * @returns {string} a compact benchmark summary.
 */
function formatStats(label, stats) {
    return `${label} min=${stats.min.toFixed(4)} mean=${stats.mean.toFixed(4)} p95=${stats.p95.toFixed(4)} ms`;
}

const iterations = readPositiveInteger("QUADPROG_BENCH_ITERATIONS", DEFAULT_ITERATIONS);
const warmupIterations = readPositiveInteger("QUADPROG_BENCH_WARMUP", DEFAULT_WARMUP_ITERATIONS);
const fixtureProblems = SYNTHETIC_ONLY ?
    [] :
    readdirSync("test")
        .filter(f => f.endsWith("-data.json"))
        .map(f => readProblem(`test/${f}`));
const syntheticProblems = [
    createSyntheticProblem("synthetic-n25-q100", 25, 100),
    createSyntheticProblem("synthetic-n50-q200", 50, 200)
];

fixtureProblems
    .concat(syntheticProblems)
    .forEach(problem => {
        const problemIterations = problem.iterations ?? iterations;
        const problemWarmupIterations = problem.warmupIterations ?? warmupIterations;

        for (let i = 0; i < problemWarmupIterations; i += 1) {
            solveProblem(cloneProblem(problem));
        }

        const cloneStats = summarize(measure(() => {
            cloneProblem(problem);
        }, problemIterations));
        const solveStats = summarize(measureSolve(problem, problemIterations));
        const totalStats = summarize(measure(() => {
            const clonedProblem = cloneProblem(problem);

            solveProblem(clonedProblem);
        }, problemIterations));

        console.warn(
            `${problem.name}: iterations=${problemIterations}, warmup=${problemWarmupIterations}; ${formatStats("clone", cloneStats)}; ${formatStats("solve", solveStats)}; ${formatStats("total", totalStats)}`
        );
    });
