"use strict";

var vows = require("vows"),
    assert = require("assert"),
    t = require("./fourth");

vows.describe("Test 4").addBatch({
    "with the fourth test": {
        topic: t.fourth,

        "we get the result": function (topic) {
            assert.equal("", topic.message);
            assert.equal(-4.000000000000016, topic.solution[1]);
            assert.equal(11.000000000000007, topic.solution[2]);
            assert.equal(25, topic.solution[3]);
            assert.equal(2804.500000000001, topic.value[1]);
            assert.equal(-3.999999999999967, topic.unconstrained_solution[1]);
            assert.equal(-30.666666666666707, topic.unconstrained_solution[2]);
            assert.equal(-100.00000000000006, topic.unconstrained_solution[3]);
            assert.equal(2, topic.iterations[1]);
            assert.equal(0, topic.iterations[2]);
            assert.equal(1, topic.iact[1]);
            assert.equal(125, topic.Lagrangian[1]);
        }
    }

}).export(module);
