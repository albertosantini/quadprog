"use strict";

const fs = require("fs");

const Benchmark = require("benchmark");

const solve = require("../lib/quadprog").solveQP;

const suite = new Benchmark.Suite("quadprog");

function wsolve(file) {
    const { Dmat, dvec, Amat, bvec, meq, factorized } = JSON.parse(fs.readFileSync(file));

    [Dmat, Amat].forEach(m => m.forEach(r => r.unshift(0)));
    [Dmat, dvec, Amat, bvec].forEach(v => v.unshift([]));

    function wrapped() {
        solve(Dmat.map(r => r.slice()), dvec.slice(), Amat.map(r => r.slice()), bvec.slice(), meq, [, factorized ? 1 : 0]); // eslint-disable-line no-sparse-arrays
    }
    return wrapped;
}

fs.readdirSync("test")
    .filter(f => f.endsWith("-data.json"))
    .forEach(f => suite.add(f.slice(0, -10), wsolve(`test/${f}`)));

suite
    .on("cycle", event => {
        console.warn(String(event.target));
    })
    .run();
