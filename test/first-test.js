/*jshint node:true */

'use strict';

var qp = require('../lib/quadprog'),
    vows = require('vows'),
    assert = require('assert');

vows.describe('Tests').addBatch({
    'with the first test': {
        topic: function () {
            var dmat = [], dvec = [], amat = [], bvec = [];

            dmat[1] = [];
            dmat[2] = [];
            dmat[3] = [];
            dmat[1][1] = 1;
            dmat[2][1] = 0;
            dmat[3][1] = 0;
            dmat[1][2] = 0;
            dmat[2][2] = 1;
            dmat[3][2] = 0;
            dmat[1][3] = 0;
            dmat[2][3] = 0;
            dmat[3][3] = 1;

            dvec[1] = 0;
            dvec[2] = 5;
            dvec[3] = 0;

            amat[1] = [];
            amat[2] = [];
            amat[3] = [];
            amat[1][1] = -4;
            amat[2][1] = -3;
            amat[3][1] = 0;
            amat[1][2] = 2;
            amat[2][2] = 1;
            amat[3][2] = 0;
            amat[1][3] = 0;
            amat[2][3] = -2;
            amat[3][3] = 1;

            bvec[1] = -8;
            bvec[2] = 2;
            bvec[3] = 0;

            return qp.solveQP(dmat, dvec, amat, bvec);
        },

        'we get the result': function (topic) {
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

