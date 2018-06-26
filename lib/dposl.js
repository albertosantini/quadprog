"use strict";

function dposl(a, lda, n, b) {
    let k, t;

    for (k = 1; k <= n; k += 1) {

        // t = ddot(k - 1, a[1][k], 1, b[1], 1);
        t = 0;
        for (let i = 1; i < k; i += 1) {
            t += a[i][k] * b[i];
        }

        b[k] = (b[k] - t) / a[k][k];
    }

    for (let kb = 1; kb <= n; kb += 1) {
        k = n + 1 - kb;
        b[k] /= a[k][k];
        t = -b[k];

        // daxpy(k - 1, t, a[1][k], 1, b[1], 1);
        for (let i = 1; i < k; i += 1) {
            b[i] += t * a[i][k];
        }
    }
}

module.exports = dposl;
