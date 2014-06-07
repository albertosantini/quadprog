"use strict";

var qp = require("../lib/quadprog"),
    vows = require("vows"),
    assert = require("assert");

vows.describe("Test 2").addBatch({
    "with the second test": {
        topic: function () {
            var Dmat = [],
                dvec = [],
                Amat = [],
                bvec = [],
                meq = 0;

            Dmat[1] = [];
            Dmat[2] = [];
            Dmat[3] = [];
            Dmat[4] = [];
            Dmat[5] = [];
            Dmat[6] = [];
            Dmat[7] = [];
            Dmat[1][1] =  4.523032e-04;
            Dmat[2][1] =  5.097330e-04;
            Dmat[3][1] =  5.724848e-04;
            Dmat[4][1] =  5.049878e-04;
            Dmat[5][1] = -1.126059e-05;
            Dmat[6][1] =  1.955939e-04;
            Dmat[7][1] =  3.306526e-04;

            Dmat[1][2] =  5.097330e-04;
            Dmat[2][2] =  6.951339e-04;
            Dmat[3][2] =  6.417501e-04;
            Dmat[4][2] =  6.697231e-04;
            Dmat[5][2] = -1.935067e-06;
            Dmat[6][2] =  2.421462e-04;
            Dmat[7][2] =  3.854708e-04;

            Dmat[1][3] =  5.724848e-04;
            Dmat[2][3] =  6.417501e-04;
            Dmat[3][3] =  8.401752e-04;
            Dmat[4][3] =  6.540224e-04;
            Dmat[5][3] = -1.253942e-05;
            Dmat[6][3] =  2.540068e-04;
            Dmat[7][3] =  4.705115e-04;

            Dmat[1][4] = 5.049878e-04;
            Dmat[2][4] = 6.697231e-04;
            Dmat[3][4] = 6.540224e-04;
            Dmat[4][4] = 8.528426e-04;
            Dmat[5][4] = 1.678568e-05;
            Dmat[6][4] = 2.643017e-04;
            Dmat[7][4] = 3.590997e-04;

            Dmat[1][5] = -1.126059e-05;
            Dmat[2][5] = -1.935067e-06;
            Dmat[3][5] = -1.253942e-05;
            Dmat[4][5] =  1.678568e-05;
            Dmat[5][5] =  6.029220e-05;
            Dmat[6][5] =  2.831196e-05;
            Dmat[7][5] = -2.742019e-05;

            Dmat[1][6] = 1.955939e-04;
            Dmat[2][6] = 2.421462e-04;
            Dmat[3][6] = 2.540068e-04;
            Dmat[4][6] = 2.643017e-04;
            Dmat[5][6] = 2.831196e-05;
            Dmat[6][6] = 1.417604e-04;
            Dmat[7][6] = 1.441332e-04;

            Dmat[1][7] =  3.306526e-04;
            Dmat[2][7] =  3.854708e-04;
            Dmat[3][7] =  4.705115e-04;
            Dmat[4][7] =  3.590997e-04;
            Dmat[5][7] = -2.742019e-05;
            Dmat[6][7] =  1.441332e-04;
            Dmat[7][7] =  2.275453e-03;

            Amat[1] = [];
            Amat[2] = [];
            Amat[3] = [];
            Amat[4] = [];
            Amat[5] = [];
            Amat[6] = [];
            Amat[7] = [];

            Amat[1][1] = 1;
            Amat[2][1] = 1;
            Amat[3][1] = 1;
            Amat[4][1] = 1;
            Amat[5][1] = 1;
            Amat[6][1] = 1;
            Amat[7][1] = 1;

            Amat[1][2] = 1;
            Amat[2][2] = 0;
            Amat[3][2] = 0;
            Amat[4][2] = 0;
            Amat[5][2] = 0;
            Amat[6][2] = 0;
            Amat[7][2] = 0;

            Amat[1][3] = 0;
            Amat[2][3] = 1;
            Amat[3][3] = 0;
            Amat[4][3] = 0;
            Amat[5][3] = 0;
            Amat[6][3] = 0;
            Amat[7][3] = 0;

            Amat[1][4] = 0;
            Amat[2][4] = 0;
            Amat[3][4] = 1;
            Amat[4][4] = 0;
            Amat[5][4] = 0;
            Amat[6][4] = 0;
            Amat[7][4] = 0;

            Amat[1][5] = 0;
            Amat[2][5] = 0;
            Amat[3][5] = 0;
            Amat[4][5] = 1;
            Amat[5][5] = 0;
            Amat[6][5] = 0;
            Amat[7][5] = 0;

            Amat[1][6] = 0;
            Amat[2][6] = 0;
            Amat[3][6] = 0;
            Amat[4][6] = 0;
            Amat[5][6] = 1;
            Amat[6][6] = 0;
            Amat[7][6] = 0;

            Amat[1][7] = 0;
            Amat[2][7] = 0;
            Amat[3][7] = 0;
            Amat[4][7] = 0;
            Amat[5][7] = 0;
            Amat[6][7] = 1;
            Amat[7][7] = 0;

            Amat[1][8] = 0;
            Amat[2][8] = 0;
            Amat[3][8] = 0;
            Amat[4][8] = 0;
            Amat[5][8] = 0;
            Amat[6][8] = 0;
            Amat[7][8] = 1;

            Amat[1][9] = -1;
            Amat[2][9] = 0;
            Amat[3][9] = 0;
            Amat[4][9] = 0;
            Amat[5][9] = 0;
            Amat[6][9] = 0;
            Amat[7][9] = 0;

            Amat[1][10] = 0;
            Amat[2][10] = -1;
            Amat[3][10] = 0;
            Amat[4][10] = 0;
            Amat[5][10] = 0;
            Amat[6][10] = 0;
            Amat[7][10] = 0;

            Amat[1][11] = 0;
            Amat[2][11] = 0;
            Amat[3][11] = -1;
            Amat[4][11] = 0;
            Amat[5][11] = 0;
            Amat[6][11] = 0;
            Amat[7][11] = 0;

            Amat[1][12] = 0;
            Amat[2][12] = 0;
            Amat[3][12] = 0;
            Amat[4][12] = -1;
            Amat[5][12] = 0;
            Amat[6][12] = 0;
            Amat[7][12] = 0;

            Amat[1][13] = 0;
            Amat[2][13] = 0;
            Amat[3][13] = 0;
            Amat[4][13] = 0;
            Amat[5][13] = -1;
            Amat[6][13] = 0;
            Amat[7][13] = 0;

            Amat[1][14] = 0;
            Amat[2][14] = 0;
            Amat[3][14] = 0;
            Amat[4][14] = 0;
            Amat[5][14] = 0;
            Amat[6][14] = -1;
            Amat[7][14] = 0;

            Amat[1][15] = 0;
            Amat[2][15] = 0;
            Amat[3][15] = 0;
            Amat[4][15] = 0;
            Amat[5][15] = 0;
            Amat[6][15] = 0;
            Amat[7][15] = -1;

            bvec[1] = 1;
            bvec[2] = 0;
            bvec[3] = 0;
            bvec[4] = 0;
            bvec[5] = 0;
            bvec[6] = 0;
            bvec[7] = 0;
            bvec[8] = 0;
            bvec[9] = -0.5;
            bvec[10] = -0.5;
            bvec[11] = -0.5;
            bvec[12] = -0.5;
            bvec[13] = -0.5;
            bvec[14] = -0.5;
            bvec[15] = -0.5;

            dvec[1] = 6.712571e-05;
            dvec[2] = 4.222380e-05;
            dvec[3] = 7.134523e-05;
            dvec[4] = 2.902528e-05;
            dvec[5] = 2.797279e-05;
            dvec[6] = 4.038785e-05;
            dvec[7] = 4.581844e-05;

            meq = 1;

            return qp.solveQP(Dmat, dvec, Amat, bvec, meq);
        },

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

