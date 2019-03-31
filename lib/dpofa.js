"use strict";

function dpofa(a, lda, n) {
    let info, jm1, t, s;

    for (let j = 1; j <= n; j += 1) {
        info = j;
        s = 0;
        jm1 = j - 1;
        if (jm1 < 1) {
            s = a[j][j] - s;
        } else {
            for (let k = 1; k <= jm1; k += 1) {

                // t = a[k][j] - ddot(k - 1, a[1][k], 1, a[1][j], 1);
                t = a[k][j];
                for (let i = 1; i < k; i += 1) {
                    t -= a[i][j] * a[i][k];
                }
                t /= a[k][k];
                a[k][j] = t;
                s += t * t;
            }
            s = a[j][j] - s;
        }

        if (s <= 0) {
            break;
        }

        a[j][j] = Math.sqrt(s);
        info = 0;
    }

    return info;
}

module.exports = dpofa;
