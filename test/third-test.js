"use strict";

var vows = require("vows"),
    // assert = require("assert"),
    t = require("./third");

vows.describe("Test 3").addBatch({
    "with the third test": {
        topic: t.third,

        "we get the result": function (topic) {
            // only it prints the output, because the optimization fails
            // see #4
            console.log(topic);
        }
    }

}).export(module);
