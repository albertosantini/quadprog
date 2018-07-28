"use strict";

const fs = require("fs");

const test = require("tape");

const qp = require("../lib/quadprog");
const epsilon = require("../lib/vsmall");

function almostEqual(a, b) {
    const isAlmostEqual = Math.abs(a - b) <= epsilon + 1e-10 * Math.abs(b);

    if (!isAlmostEqual) {
        console.log(a, b); // eslint-disable-line no-console
    }

    return isAlmostEqual;
}

function almostEqualArray(a, b) {
    return a.length === b.length && a.every((av, i) => almostEqual(av, b[i]));
}

function testWrapper(base) {
    const {
        Dmat,
        dvec,
        Amat,
        bvec,
        meq,
        factorized
    } = JSON.parse(fs.readFileSync(`test/${base}-data.json`).toString());
    const expected = JSON.parse(fs.readFileSync(`test/${base}-result.json`).toString());

    [Dmat, Amat].forEach(m => m.forEach(r => r.unshift(0)));
    [Dmat, dvec, Amat, bvec].forEach(v => v.unshift(0));
    if (expected.Lagrangian.length === undefined) { // eslint-disable-line no-undefined
        expected.Lagrangian = [expected.Lagrangian];
    }
    if (expected.iact.length === undefined) { // eslint-disable-line no-undefined
        expected.iact = [expected.iact];
    }

    function wrappedTest(t) {
        const {
            message,
            value,
            solution,
            unconstrained_solution, // eslint-disable-line camelcase
            Lagrangian,
            iact,
            iterations
        } = qp.solveQP(Dmat, dvec, Amat, bvec, meq, [, factorized ? 1 : 0]); // eslint-disable-line no-sparse-arrays

        [solution, unconstrained_solution, Lagrangian, iact, iterations].forEach(v => v.shift()); // eslint-disable-line camelcase

        t.equal(message, "",
            "message is empty");
        t.ok(almostEqual(value[1], expected.value),
            "values are almost equal");
        t.ok(almostEqualArray(solution, expected.solution),
            "solutions are almost equal");
        t.ok(almostEqualArray(unconstrained_solution, expected["unconstrained.solution"]),
            "unconstrained solutions are almost equal");
        t.ok(almostEqualArray(Lagrangian, expected.Lagrangian),
            "lagrangians are almost equal");
        t.deepEqual(iact.slice(0, expected.iact.length), expected.iact,
            "iact values are equal");
        t.deepEqual(iact.slice(expected.iact.length), new Array(iact.length - expected.iact.length).fill(0),
            "the rest of iact values are equal");
        t.deepEqual(iterations, expected.iterations,
            "iterations are equal");
        t.end();
    }
    return wrappedTest;
}

fs.readdirSync("test")
    .filter(f => f.endsWith("-data.json"))
    .map(f => f.slice(0, -10))
    .forEach(name => test(`Test ${name}`, testWrapper(name)));
