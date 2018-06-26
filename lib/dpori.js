"use strict";

function dpori(a, lda, n) {
    let kp1, t;

    for (let k = 1; k <= n; k += 1) {
        a[k][k] = 1 / a[k][k];
        t = -a[k][k];

        // dscal(k - 1, t, a[1][k], 1);
        for (let i = 1; i < k; i += 1) {
            a[i][k] *= t;
        }

        kp1 = k + 1;
        if (n < kp1) {
            break;
        }
        for (let j = kp1; j <= n; j += 1) {
            t = a[k][j];
            a[k][j] = 0;

            // daxpy(k, t, a[1][k], 1, a[1][j], 1);
            for (let i = 1; i <= k; i += 1) {
                a[i][j] += t * a[i][k];
            }
        }
    }
}

module.exports = dpori;
