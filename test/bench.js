"use strict";

var Benchmark = require("benchmark");

var test1 = require("./first");
var test2 = require("./second");
var test3 = require("./third");
var test4 = require("./fourth");
var test5 = require("./fifth");

var suite = new Benchmark.Suite("quadprog");

suite
    .add("test1", test1)
    .add("test2", test2)
    .add("test3", test3)
    .add("test4", test4)
    .add("test5", test5)
    .on("cycle", function (event) {
        console.log(String(event.target));
    })
    .run();
