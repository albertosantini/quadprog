"use strict";

let epsilon = 1.0e-60;
let tmpa;
let tmpb;

do {
    epsilon += epsilon;
    tmpa = 1 + 0.1 * epsilon;
    tmpb = 1 + 0.2 * epsilon;
} while (tmpa <= 1 || tmpb <= 1);

module.exports = epsilon;
