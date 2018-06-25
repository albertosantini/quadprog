"use strict";

const test = require("tape");

const second = require("./second");

test("Test 2", t => {
    const res = second();

    t.equal(res.message, "");
    t.equal(res.solution[1], 0.09047051922254573);
    t.equal(res.solution[2], 0);
    t.equal(res.solution[3], 0);
    t.equal(res.solution[4], 0);
    t.equal(res.solution[5], 0.5);
    t.equal(res.solution[6], 0.4000853270556898);
    t.equal(res.solution[7], 0.009444153721764449);
    t.equal(res.value[1], -0.0000028843272901264766);
    t.equal(res.unconstrained_solution[1], 0.6908662082183028);
    t.equal(res.unconstrained_solution[2], -0.2267550614103905);
    t.equal(res.unconstrained_solution[3], -0.12258714257773004);
    t.equal(res.unconstrained_solution[4], -0.1445072473844702);
    t.equal(res.unconstrained_solution[5], 0.5624818457953373);
    t.equal(res.unconstrained_solution[6], 0.08811273327426143);
    t.equal(res.unconstrained_solution[7], 0.007507843634051298);
    t.equal(res.iterations[1], 7);
    t.equal(res.iterations[2], 1);
    t.equal(res.iact[1], 3);
    t.equal(res.iact[2], 5);
    t.equal(res.iact[3], 4);
    t.equal(res.iact[4], 1);
    t.equal(res.iact[5], 13);
    t.equal(res.Lagrangian[1], 0.000049541083784517924);
    t.equal(res.Lagrangian[2], 0);
    t.equal(res.Lagrangian[3], 0.000053902979003092);
    t.equal(res.Lagrangian[4], 0.000030704949904724455);
    t.equal(res.Lagrangian[5], 0.00008464760953664744);
    t.equal(res.Lagrangian[6], 0);
    t.equal(res.Lagrangian[7], 0);
    t.equal(res.Lagrangian[8], 0);
    t.equal(res.Lagrangian[9], 0);
    t.equal(res.Lagrangian[10], 0);
    t.equal(res.Lagrangian[11], 0);
    t.equal(res.Lagrangian[12], 0);
    t.equal(res.Lagrangian[13], 0.0000373182859218225);
    t.equal(res.Lagrangian[14], 0);
    t.equal(res.Lagrangian[15], 0);

    t.end();
});
