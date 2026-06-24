import { readFileSync, readdirSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert";

import { solveQP } from "../lib/quadprog.js";
import epsilon from "../lib/vsmall.js";

/**
 *
 * @param a
 * @param b
 */
function almostEqual(a, b) {
    const isAlmostEqual = Math.abs(a - b) <= epsilon + 1e-10 * Math.abs(b);

    if (!isAlmostEqual) {
        console.log(a, b);
    }

    return isAlmostEqual;
}

/**
 *
 * @param a
 * @param b
 */
function almostEqualArray(a, b) {
    return a.length === b.length && a.every((av, i) => almostEqual(av, b[i]));
}

/**
 *
 * @param base
 */
function testWrapper(base) {
    const { Dmat, dvec, Amat, bvec, meq, factorized } = JSON.parse(
        readFileSync(`test/${base}-data.json`).toString()
    );
    const expected = JSON.parse(
        readFileSync(`test/${base}-result.json`).toString()
    );

    [Dmat, Amat].forEach(m => m.forEach(r => r.unshift(0)));
    [Dmat, dvec, Amat, bvec].forEach(v => v.unshift(0));
    if (!expected.Lagrangian.length) {
        expected.Lagrangian = [expected.Lagrangian];
    }
    if (!expected.iact.length) {
        expected.iact = [expected.iact];
    }

    /**
     *
     */
    function runTest() {
        const {
            message,
            value,
            solution,
            unconstrained_solution,
            Lagrangian,
            iact,
            iterations
        } = solveQP(Dmat, dvec, Amat, bvec, meq, [0, factorized ? 1 : 0]);

        [
            solution,
            unconstrained_solution,
            Lagrangian,
            iact,
            iterations
        ].forEach(v => v.shift());

        assert.strictEqual(message, "", "message is empty");
        assert.ok(almostEqual(value[1], expected.value), "values are almost equal");
        assert.ok(
            almostEqualArray(solution, expected.solution),
            "solutions are almost equal"
        );
        assert.ok(
            almostEqualArray(
                unconstrained_solution,
                expected["unconstrained.solution"]
            ),
            "unconstrained solutions are almost equal"
        );
        assert.ok(
            almostEqualArray(Lagrangian, expected.Lagrangian),
            "lagrangians are almost equal"
        );
        assert.deepStrictEqual(
            iact.slice(0, expected.iact.length),
            expected.iact,
            "iact values are equal"
        );
        assert.deepStrictEqual(
            iact.slice(expected.iact.length),
            new Array(iact.length - expected.iact.length).fill(0),
            "the rest of iact values are equal"
        );
        assert.deepStrictEqual(iterations, expected.iterations, "iterations are equal");
    }
    return runTest;
}

/**
 *
 * @returns {{Dmat: number[][], dvec: number[], Amat: number[][], bvec: number[]}} a valid one-dimensional problem.
 */
function createOneDimensionalProblem() {
    return {
        Dmat: [[], [0, 1]],
        dvec: [0, 1],
        Amat: [[], [0, 1]],
        bvec: [0, 0]
    };
}

/**
 *
 * @returns {Array<{Dmat: number[][], dvec: number[], Amat: number[][], bvec: number[], meq: number}>} deterministic active-set problems.
 */
function createActiveSetProblems() {
    /** @type {Array<[number[], number]>} */
    const constraints = [
        [[1, 0], 0],
        [[0, 1], 0],
        [[-1, 0], -1],
        [[0, -1], -1],
        [[1, 1], 1],
        [[-1, -1], -2],
        [[1, -1], 0],
        [[-1, 1], 0]
    ];
    const objectiveVectors = [
        [2, -1],
        [-1, 2],
        [2, 2],
        [-2, -1],
        [0.5, -2]
    ];
    /** @type {Array<{Dmat: number[][], dvec: number[], Amat: number[][], bvec: number[], meq: number}>} */
    const problems = [];

    for (const dvecValues of objectiveVectors) {
        for (let start = 0; start <= constraints.length - 3; start += 1) {
            for (const meq of [0, 1, 2]) {
                const selectedConstraints = constraints.slice(start, start + 3);
                const Amat = [[], [0], [0]];
                const bvec = [0];

                for (const [constraint, bound] of selectedConstraints) {
                    Amat[1].push(constraint[0]);
                    Amat[2].push(constraint[1]);
                    bvec.push(bound);
                }

                problems.push({
                    Dmat: [[], [0, 1, 0], [0, 0, 1]],
                    dvec: [0, dvecValues[0], dvecValues[1]],
                    Amat,
                    bvec,
                    meq
                });
            }
        }
    }

    return problems;
}

readdirSync("test")
    .filter(f => f.endsWith("-data.json"))
    .map(f => f.slice(0, -10))
    .forEach(name => test(`Test ${name}`, testWrapper(name)));

test("solveQP returns input validation errors", () => {
    const problem = createOneDimensionalProblem();
    const twoDimensionalDmat = [[], [0, 1, 0], [0, 0, 1]];
    const twoDimensionalDvec = [0, 1, 1];

    assert.strictEqual(
        solveQP([[], [0]], problem.dvec, problem.Amat, problem.bvec).message,
        "Dmat is not symmetric!"
    );
    assert.strictEqual(
        solveQP(problem.Dmat, [0], problem.Amat, problem.bvec).message,
        "Dmat and dvec are incompatible!"
    );
    assert.strictEqual(
        solveQP(twoDimensionalDmat, twoDimensionalDvec, [[], [0, 1]], problem.bvec).message,
        "Amat and dvec are incompatible!"
    );
    assert.strictEqual(
        solveQP(problem.Dmat, problem.dvec, problem.Amat, [0, 0, 0]).message,
        "Amat and bvec are incompatible!"
    );
    assert.strictEqual(
        solveQP(problem.Dmat, problem.dvec, problem.Amat, problem.bvec, 2).message,
        "Value of meq is invalid!"
    );
    assert.strictEqual(
        solveQP(problem.Dmat, problem.dvec, problem.Amat, problem.bvec, -1).message,
        "Value of meq is invalid!"
    );
});

test("solveQP defaults an empty bvec to zero constraints", () => {
    const problem = createOneDimensionalProblem();
    const result = solveQP(problem.Dmat, problem.dvec, problem.Amat);

    assert.strictEqual(result.message, "");
    assert.ok(almostEqual(result.solution[1], 1));
});

test("solveQP reports a non-positive definite objective matrix", () => {
    const result = solveQP([[], [0, -1]], [0, 1], [[], [0, 1]], [0, 0]);

    assert.strictEqual(
        result.message,
        "matrix D in quadratic function is not positive definite!"
    );
});

test("solveQP reports inconsistent constraints", () => {
    const result = solveQP(
        [[], [0, 1]],
        [0, 0],
        [[], [0, 1, -1]],
        [0, 1, 0]
    );

    assert.strictEqual(result.message, "constraints are inconsistent, no solution!");
});

test("solveQP handles deterministic active-set edge cases", () => {
    for (const problem of createActiveSetProblems()) {
        const result = solveQP(
            problem.Dmat.map(row => row.slice()),
            problem.dvec.slice(),
            problem.Amat.map(row => row.slice()),
            problem.bvec.slice(),
            problem.meq
        );

        assert.strictEqual(typeof result.message, "string");
    }
});
