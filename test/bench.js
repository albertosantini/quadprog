"use strict";

const Benchmark = require("benchmark");

const test1 = require("./first");
const test2 = require("./second");
const test3 = require("./third");
const test4 = require("./fourth");
const test5 = require("./fifth");
const test6 = require("./sixth");

const suite = new Benchmark.Suite("quadprog");

suite
    .add("test1", test1)
    .add("test2", test2)
    .add("test3", test3)
    .add("test4", test4)
    .add("test5", test5)
    .add("test6", test6)
    .on("cycle", event => {
        console.warn(String(event.target));
    })
    .run();
