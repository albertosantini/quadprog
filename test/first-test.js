"use strict";

 var vows = require("vows"),
    assert = require("assert"),
    t = require("./first");

vows.describe("Test 1").addBatch({
    "with the first test": {
        topic: t.first,

        "we get the result": function (topic) {
            assert.equal(0.47619047619047616, topic.solution[1]);
            assert.equal(1.0476190476190477, topic.solution[2]);
            assert.equal(2.0952380952380953, topic.solution[3]);
            assert.equal(-2.380952380952381, topic.value[1]);
            assert.equal(0, topic.unconstrained_solution[1]);
            assert.equal(5, topic.unconstrained_solution[2]);
            assert.equal(0, topic.unconstrained_solution[3]);
            assert.equal(3, topic.iterations[1]);
            assert.equal(0, topic.iterations[2]);
            assert.equal(3, topic.iact[1]);
            assert.equal(2, topic.iact[2]);
        }
    }

}).export(module);

