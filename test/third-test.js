"use strict";

var vows = require("vows"),
    assert = require("assert"),
    t = require("./third");

vows.describe("Test 3").addBatch({
    "with the third test": {
        topic: t.third,

        "we get the result": function (topic) {
            assert.equal("", topic.message);
            assert.equal(3.9989999999999997, topic.solution[1]);
            assert.equal(3.0020000000000007, topic.solution[2]);
            assert.equal(0.7470000000000052, topic.solution[3]);
            assert.equal(1.2500000000000013, topic.solution[4]);
            assert.equal(0.2480000000000018, topic.solution[5]);
            assert.equal(0.7509999999999986, topic.solution[6]);
            assert.equal(167.63001900000017, topic.value[1]);
            assert.equal(-4.999999999999999, topic.unconstrained_solution[1]);
            assert.equal(-4.999999999999999, topic.unconstrained_solution[2]);
            assert.equal(-14.999999999999996, topic.unconstrained_solution[3]);
            assert.equal(-9.999999999999998, topic.unconstrained_solution[4]);
            assert.equal(-14.999999999999996, topic.unconstrained_solution[5]);
            assert.equal(-9.999999999999998, topic.unconstrained_solution[6]);
            assert.equal(8, topic.iterations[1]);
            assert.equal(2, topic.iterations[2]);
            assert.equal(3, topic.iact[1]);
            assert.equal(5, topic.iact[2]);
            assert.equal(1, topic.iact[3]);
            assert.equal(7, topic.iact[4]);
            assert.equal(9, topic.iact[5]);
            assert.equal(33.48800000000001, topic.Lagrangian[1]);
            assert.equal(0, topic.Lagrangian[2]);
            assert.equal(31.49400000000001, topic.Lagrangian[3]);
            assert.equal(0, topic.Lagrangian[4]);
            assert.equal(30.496000000000002, topic.Lagrangian[5]);
            assert.equal(0, topic.Lagrangian[6]);
            assert.equal(15.490000000000004, topic.Lagrangian[7]);
            assert.equal(0, topic.Lagrangian[8]);
            assert.equal(8.994000000000003, topic.Lagrangian[9]);
            assert.equal(0, topic.Lagrangian[10]);
            assert.equal(0, topic.Lagrangian[11]);
            assert.equal(0, topic.Lagrangian[12]);
            assert.equal(0, topic.Lagrangian[13]);
            assert.equal(0, topic.Lagrangian[14]);
            assert.equal(0, topic.Lagrangian[15]);
        }
    }

}).export(module);
