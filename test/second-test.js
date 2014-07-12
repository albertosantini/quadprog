"use strict";

var vows = require("vows"),
    assert = require("assert"),
    t = require("./second");

vows.describe("Test 2").addBatch({
    "with the second test": {
        topic: t.second,

        "we get the result": function (topic) {
            assert.equal(0.09047051922254573, topic.solution[1]);
            assert.equal(0, topic.solution[2]);
            assert.equal(0, topic.solution[3]);
            assert.equal(0, topic.solution[4]);
            assert.equal(0.5, topic.solution[5]);
            assert.equal(0.4000853270556898, topic.solution[6]);
            assert.equal(0.009444153721764449, topic.solution[7]);
            assert.equal(-0.0000028843272901264766, topic.value[1]);
            assert.equal(0.6908662082183028, topic.unconstrained_solution[1]);
            assert.equal(-0.2267550614103905, topic.unconstrained_solution[2]);
            assert.equal(-0.12258714257773004, topic.unconstrained_solution[3]);
            assert.equal(-0.1445072473844702, topic.unconstrained_solution[4]);
            assert.equal(0.5624818457953373, topic.unconstrained_solution[5]);
            assert.equal(0.08811273327426143, topic.unconstrained_solution[6]);
            assert.equal(0.007507843634051298, topic.unconstrained_solution[7]);
            assert.equal(7, topic.iterations[1]);
            assert.equal(1, topic.iterations[2]);
            assert.equal(3, topic.iact[1]);
            assert.equal(5, topic.iact[2]);
            assert.equal(4, topic.iact[3]);
            assert.equal(1, topic.iact[4]);
            assert.equal(13, topic.iact[5]);
        }
    }

}).export(module);