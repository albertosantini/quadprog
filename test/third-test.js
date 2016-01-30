"use strict";

var test = require("tape"),
    third = require("./third");

test("Test 3", function (t) {
    var res = third();

    t.equal(res.message, "");
    t.equal(res.solution[1], 3.9989999999999997);
    t.equal(res.solution[2], 3.0020000000000007);
    t.equal(res.solution[3], 0.7470000000000052);
    t.equal(res.solution[4], 1.2500000000000013);
    t.equal(res.solution[5], 0.2480000000000018);
    t.equal(res.solution[6], 0.7509999999999986);
    t.equal(res.value[1], 167.63001900000017);
    t.equal(res.unconstrained_solution[1], -4.999999999999999);
    t.equal(res.unconstrained_solution[2], -4.999999999999999);
    t.equal(res.unconstrained_solution[3], -14.999999999999996);
    t.equal(res.unconstrained_solution[4], -9.999999999999998);
    t.equal(res.unconstrained_solution[5], -14.999999999999996);
    t.equal(res.unconstrained_solution[6], -9.999999999999998);
    t.equal(res.iterations[1], 8);
    t.equal(res.iterations[2], 2);
    t.equal(res.iact[1], 3);
    t.equal(res.iact[2], 5);
    t.equal(res.iact[3], 1);
    t.equal(res.iact[4], 7);
    t.equal(res.iact[5], 9);
    t.equal(res.Lagrangian[1], 33.48800000000001);
    t.equal(res.Lagrangian[2], 0);
    t.equal(res.Lagrangian[3], 31.49400000000001);
    t.equal(res.Lagrangian[4], 0);
    t.equal(res.Lagrangian[5], 30.496000000000002);
    t.equal(res.Lagrangian[6], 0);
    t.equal(res.Lagrangian[7], 15.490000000000004);
    t.equal(res.Lagrangian[8], 0);
    t.equal(res.Lagrangian[9], 8.994000000000003);
    t.equal(res.Lagrangian[10], 0);
    t.equal(res.Lagrangian[11], 0);
    t.equal(res.Lagrangian[12], 0);
    t.equal(res.Lagrangian[13], 0);
    t.equal(res.Lagrangian[14], 0);
    t.equal(res.Lagrangian[15], 0);

    t.end();
});
