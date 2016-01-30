"use strict";

var test = require("tape"),
    fifth = require("./fifth");

test("Test 5", function (t) {
    var res = fifth();

    t.equal(res.message, "");
    t.equal(res.solution[1], 4.000000000000001);
    t.equal(res.solution[2], 3.0009999999999994);
    t.equal(res.solution[3], 0.748750000000002);
    t.equal(res.solution[4], 1.250250000000001);
    t.equal(res.solution[5], 0.24924999999999922);
    t.equal(res.solution[6], 0.7507499999999989);
    t.equal(res.value[1], 167.72550375);
    t.equal(res.unconstrained_solution[1], -4.999999999999999);
    t.equal(res.unconstrained_solution[2], -4.999999999999999);
    t.equal(res.unconstrained_solution[3], -14.999999999999996);
    t.equal(res.unconstrained_solution[4], -9.999999999999998);
    t.equal(res.unconstrained_solution[5], -14.999999999999996);
    t.equal(res.unconstrained_solution[6], -9.999999999999998);
    t.equal(res.iterations[1], 8);
    t.equal(res.iterations[2], 2);
    t.equal(res.iact[1], 2);
    t.equal(res.iact[2], 3);
    t.equal(res.iact[3], 1);
    t.equal(res.iact[4], 4);
    t.equal(res.iact[5], 6);
    t.equal(res.Lagrangian[1], 33.4955);
    t.equal(res.Lagrangian[2], 31.497500000000002);
    t.equal(res.Lagrangian[3], 30.4985);
    t.equal(res.Lagrangian[4], 15.495499999999998);
    t.equal(res.Lagrangian[5], 0);
    t.equal(res.Lagrangian[6], 8.996999999999996);
    t.equal(res.Lagrangian[7], 0);
    t.equal(res.Lagrangian[8], 0);
    t.equal(res.Lagrangian[9], 0);
    t.equal(res.Lagrangian[10], 0);
    t.equal(res.Lagrangian[11], 0);
    t.equal(res.Lagrangian[12], 0);

    t.end();
});
