"use strict";

var test = require("tape"),
    first = require("./first");

test("Test 1", function (t) {
    var res = first();

    t.equal(res.message, "");
    t.equal(res.solution[1], 0.47619047619047616);
    t.equal(res.solution[2], 1.0476190476190477);
    t.equal(res.solution[3], 2.0952380952380953);
    t.equal(res.value[1], -2.380952380952381);
    t.equal(res.unconstrained_solution[1], 0);
    t.equal(res.unconstrained_solution[2], 5);
    t.equal(res.unconstrained_solution[3], 0);
    t.equal(res.iterations[1], 3);
    t.equal(res.iterations[2], 0);
    t.equal(res.iact[1], 3);
    t.equal(res.iact[2], 2);
    t.equal(res.Lagrangian[1], 0);
    t.equal(res.Lagrangian[2], 0.23809523809523808);
    t.equal(res.Lagrangian[3], 2.0952380952380953);

    t.end();
});
