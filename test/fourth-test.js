"use strict";

var test = require("tape"),
    fourth = require("./fourth");

test("Test 4", function (t) {
    var res = fourth();

    t.equal(res.message, "");
    t.equal(res.solution[1], -4.000000000000016);
    t.equal(res.solution[2], 11.000000000000007);
    t.equal(res.solution[3], 25);
    t.equal(res.value[1], 2804.500000000001);
    t.equal(res.unconstrained_solution[1], -3.999999999999967);
    t.equal(res.unconstrained_solution[2], -30.666666666666707);
    t.equal(res.unconstrained_solution[3], -100.00000000000006);
    t.equal(res.iterations[1], 2);
    t.equal(res.iterations[2], 0);
    t.equal(res.iact[1], 1);
    t.equal(res.Lagrangian[1], 125);

    t.end();
});
