"use strict";

const test = require("tape");

const sixth = require("./sixth");

test("Test 6", t => {
    const res = sixth();

    t.equal(res.message, "");
    t.equal(res.solution[1], -1);
    t.equal(res.solution[2], -0.5);
    t.equal(res.solution[3], 0);
    t.equal(res.solution[4], 0.2);
    t.equal(res.solution[5], 1);
    t.equal(res.value[1], -6.145);
    t.equal(res.unconstrained_solution[1], -5);
    t.equal(res.unconstrained_solution[2], -0.5);
    t.equal(res.unconstrained_solution[3], 0);
    t.equal(res.unconstrained_solution[4], 0.2);
    t.equal(res.unconstrained_solution[5], 2);
    t.equal(res.iterations[1], 3);
    t.equal(res.iterations[2], 0);
    t.equal(res.iact[1], 1);
    t.equal(res.iact[2], 10);
    t.equal(res.iact[3], 0);
    t.equal(res.iact[4], 0);
    t.equal(res.iact[5], 0);
    t.equal(res.iact[6], 0);
    t.equal(res.iact[7], 0);
    t.equal(res.iact[8], 0);
    t.equal(res.iact[9], 0);
    t.equal(res.iact[10], 0);
    t.equal(res.Lagrangian[1], 4);
    t.equal(res.Lagrangian[2], 0);
    t.equal(res.Lagrangian[3], 0);
    t.equal(res.Lagrangian[4], 0);
    t.equal(res.Lagrangian[5], 0);
    t.equal(res.Lagrangian[6], 0);
    t.equal(res.Lagrangian[7], 0);
    t.equal(res.Lagrangian[8], 0);
    t.equal(res.Lagrangian[9], 0);
    t.equal(res.Lagrangian[10], 1);

    t.end();
});
