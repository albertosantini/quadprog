/*eslint new-parens: 0*/
"use strict";

var Benchmark = require("benchmark");
var test1 = require("./first");
var test2 = require("./second");
var test3 = require("./third");
var test4 = require("./fourth");
var test5 = require("./fifth");

var suite = new Benchmark.Suite;

suite
    .add("test1", test1.first)
    .add("test2", test2.second)
    .add("test3", test3.third)
    .add("test4", test4.fourth)
    .add("test5", test5.fifth)
    .on("cycle", function (event) {
        console.log(String(event.target));
    })
    .run();
