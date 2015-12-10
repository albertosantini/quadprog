"use strict";

var vows = require("vows"),
    assert = require("assert"),
    t = require("./fifth");

vows.describe("Test 5").addBatch({
    "with the fifth test": {
        topic: t.fifth,

        "we get the result": function (topic) {
            assert.equal("", topic.message);
            assert.equal(4.000000000000001, topic.solution[1]);
            assert.equal(3.0009999999999994, topic.solution[2]);
            assert.equal(0.748750000000002, topic.solution[3]);
            assert.equal(1.250250000000001, topic.solution[4]);
            assert.equal(0.24924999999999922, topic.solution[5]);
            assert.equal(0.7507499999999989, topic.solution[6]);
            assert.equal(167.72550375, topic.value[1]);
            assert.equal(-4.999999999999999, topic.unconstrained_solution[1]);
            assert.equal(-4.999999999999999, topic.unconstrained_solution[2]);
            assert.equal(-14.999999999999996, topic.unconstrained_solution[3]);
            assert.equal(-9.999999999999998, topic.unconstrained_solution[4]);
            assert.equal(-14.999999999999996, topic.unconstrained_solution[5]);
            assert.equal(-9.999999999999998, topic.unconstrained_solution[6]);
            assert.equal(8, topic.iterations[1]);
            assert.equal(2, topic.iterations[2]);
            assert.equal(2, topic.iact[1]);
            assert.equal(3, topic.iact[2]);
            assert.equal(1, topic.iact[3]);
            assert.equal(4, topic.iact[4]);
            assert.equal(6, topic.iact[5]);
            assert.equal(33.4955, topic.Lagrangian[1]);
            assert.equal(31.497500000000002, topic.Lagrangian[2]);
            assert.equal(30.4985, topic.Lagrangian[3]);
            assert.equal(15.495499999999998, topic.Lagrangian[4]);
            assert.equal(0, topic.Lagrangian[5]);
            assert.equal(8.996999999999996, topic.Lagrangian[6]);
            assert.equal(0, topic.Lagrangian[7]);
            assert.equal(0, topic.Lagrangian[8]);
            assert.equal(0, topic.Lagrangian[9]);
            assert.equal(0, topic.Lagrangian[10]);
            assert.equal(0, topic.Lagrangian[11]);
            assert.equal(0, topic.Lagrangian[12]);
        }
    }

}).export(module);
