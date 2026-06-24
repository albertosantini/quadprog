import vsmall from "./vsmall.js";
import dpori from "./dpori.js";
import dposl from "./dposl.js";
import dpofa from "./dpofa.js";

/**
 *
 * @param dmat
 * @param dvec
 * @param fddmat
 * @param n
 * @param sol
 * @param lagr
 * @param crval
 * @param amat
 * @param bvec
 * @param fdamat
 * @param q
 * @param meq
 * @param iact
 * @param nnact
 * @param iter
 * @param work
 * @param ierr
 */
function qpgen2(dmat, dvec, fddmat, n, sol, lagr, crval, amat, bvec, fdamat, q, meq, iact, nnact, iter, work, ierr) {
    let l1, it1, nvl, nact, temp, sum, t1, tt, gc, gs, nu, t1inf, t2min, go;

    const r = Math.min(n, q);

    let l = 2 * n + (r * (r + 5)) / 2 + 2 * q + 1;

    for (let i = 1; i <= n; i += 1) {
        work[i] = dvec[i];
    }
    for (let i = n + 1; i <= l; i += 1) {
        work[i] = 0;
    }
    for (let i = 1; i <= q; i += 1) {
        iact[i] = 0;
        lagr[i] = 0;
    }

    if (ierr[1] === 0) {
        const info = dpofa(dmat, fddmat, n);

        if (info !== 0) {
            ierr[1] = 2;
            return;
        }
        dposl(dmat, fddmat, n, dvec);
        dpori(dmat, fddmat, n);
    } else {
        for (let j = 1; j <= n; j += 1) {
            sol[j] = 0;
            for (let i = 1; i <= j; i += 1) {
                const dmatI = dmat[i];

                sol[j] += dmatI[j] * dvec[i];
            }
        }
        for (let j = 1; j <= n; j += 1) {
            const dmatJ = dmat[j];

            dvec[j] = 0;
            for (let i = j; i <= n; i += 1) {
                dvec[j] += dmatJ[i] * sol[i];
            }
        }
    }

    crval[1] = 0;
    for (let j = 1; j <= n; j += 1) {
        sol[j] = dvec[j];
        crval[1] += work[j] * sol[j];
        work[j] = 0;
        for (let i = j + 1; i <= n; i += 1) {
            const dmatI = dmat[i];

            dmatI[j] = 0;
        }
    }
    crval[1] = -crval[1] / 2;
    ierr[1] = 0;

    const iwzv = n;
    const iwrv = iwzv + n;
    const iwuv = iwrv + r;
    const iwrm = iwuv + r + 1;
    const iwsv = iwrm + (r * (r + 1)) / 2;
    const iwnbv = iwsv + q;
    const amatColumns = new Array(q + 1);

    for (let i = 1; i <= q; i += 1) {
        const amatColumn = new Array(n + 1);

        sum = 0;
        for (let j = 1; j <= n; j += 1) {
            const amatJ = amat[j];
            const constraintValue = amatJ[i];

            amatColumn[j] = constraintValue;
            sum += constraintValue * constraintValue;
        }
        amatColumns[i] = amatColumn;
        work[iwnbv + i] = Math.sqrt(sum);
    }

    nact = nnact;

    iter[1] = 0;
    iter[2] = 0;

    /**
     *
     */
    function fnGoto50() {
        iter[1] += 1;

        l = iwsv;
        for (let i = 1; i <= q; i += 1) {
            const amatColumn = amatColumns[i];

            l += 1;
            sum = -bvec[i];
            for (let j = 1; j <= n; j += 1) {
                sum += amatColumn[j] * sol[j];
            }
            if (Math.abs(sum) < vsmall) {
                sum = 0;
            }
            if (i > meq) {
                work[l] = sum;
            } else {
                work[l] = -Math.abs(sum);
                if (sum > 0) {
                    for (let j = 1; j <= n; j += 1) {
                        const amatJ = amat[j];
                        const constraintValue = -amatColumn[j];

                        amatColumn[j] = constraintValue;
                        amatJ[i] = constraintValue;
                    }
                    bvec[i] = -bvec[i];
                }
            }
        }

        for (let i = 1; i <= nact; i += 1) {
            work[iwsv + iact[i]] = 0;
        }

        nvl = 0;
        temp = 0;
        for (let i = 1; i <= q; i += 1) {
            if (work[iwsv + i] < temp * work[iwnbv + i]) {
                nvl = i;
                temp = work[iwsv + i] / work[iwnbv + i];
            }
        }
        if (nvl === 0) {
            for (let i = 1; i <= nact; i += 1) {
                lagr[iact[i]] = work[iwuv + i];
            }
            return 999;
        }

        return 0;
    }

    /**
     *
     */
    function fnGoto55() {
        const amatColumn = amatColumns[nvl];

        for (let i = 1; i <= n; i += 1) {
            work[i] = 0;
        }
        for (let j = 1; j <= n; j += 1) {
            const dmatJ = dmat[j];
            const constraintValue = amatColumn[j];

            for (let i = 1; i <= n; i += 1) {
                work[i] += dmatJ[i] * constraintValue;
            }
        }

        l1 = iwzv;
        for (let i = 1; i <= n; i += 1) {
            work[l1 + i] = 0;
        }
        for (let j = nact + 1; j <= n; j += 1) {
            const workJ = work[j];

            for (let i = 1; i <= n; i += 1) {
                const dmatI = dmat[i];
                const workIndex = l1 + i;

                work[workIndex] += dmatI[j] * workJ;
            }
        }

        t1inf = true;
        for (let i = nact; i >= 1; i -= 1) {
            sum = work[i];
            l = iwrm + (i * (i + 3)) / 2;
            l1 = l - i;
            for (let j = i + 1; j <= nact; j += 1) {
                sum -= work[l] * work[iwrv + j];
                l += j;
            }
            sum /= work[l1];
            work[iwrv + i] = sum;
            if (iact[i] <= meq) {
                continue;
            }
            if (sum <= 0) {
                continue;
            }
            t1inf = false;
            it1 = i;
        }

        if (!t1inf) {
            t1 = work[iwuv + it1] / work[iwrv + it1];
            for (let i = 1; i <= nact; i += 1) {
                if (iact[i] <= meq) {
                    continue;
                }
                if (work[iwrv + i] <= 0) {
                    continue;
                }
                temp = work[iwuv + i] / work[iwrv + i];
                if (temp < t1) {
                    t1 = temp;
                    it1 = i;
                }
            }
        }

        sum = 0;
        for (let i = iwzv + 1; i <= iwzv + n; i += 1) {
            sum += work[i] * work[i];
        }
        if (Math.abs(sum) <= vsmall) {
            if (t1inf) {
                ierr[1] = 1;

                return 999; // GOTO 999
            }
            for (let i = 1; i <= nact; i += 1) {
                work[iwuv + i] = work[iwuv + i] - t1 * work[iwrv + i];
            }
            work[iwuv + nact + 1] = work[iwuv + nact + 1] + t1;

            return 700; // GOTO 700
        }
        sum = 0;
        for (let i = 1; i <= n; i += 1) {
            sum += work[iwzv + i] * amatColumn[i];
        }
        tt = -work[iwsv + nvl] / sum;
        t2min = true;
        if (!t1inf) {
            if (t1 < tt) {
                tt = t1;
                t2min = false;
            }
        }

        for (let i = 1; i <= n; i += 1) {
            sol[i] += tt * work[iwzv + i];
            if (Math.abs(sol[i]) < vsmall) {
                sol[i] = 0;
            }
        }

        crval[1] += tt * sum * (tt / 2 + work[iwuv + nact + 1]);
        for (let i = 1; i <= nact; i += 1) {
            work[iwuv + i] = work[iwuv + i] - tt * work[iwrv + i];
        }
        work[iwuv + nact + 1] = work[iwuv + nact + 1] + tt;

        if (t2min) {
            nact += 1;
            iact[nact] = nvl;

            l = iwrm + ((nact - 1) * nact) / 2 + 1;
            for (let i = 1; i <= nact - 1; i += 1) {
                work[l] = work[i];
                l += 1;
            }

            if (nact === n) {
                work[l] = work[n];
            } else {
                for (let i = n; i >= nact + 1; i -= 1) {
                    if (work[i] === 0) {
                        continue;
                    }
                    gc = Math.max(Math.abs(work[i - 1]), Math.abs(work[i]));
                    gs = Math.min(Math.abs(work[i - 1]), Math.abs(work[i]));
                    if (work[i - 1] >= 0) {
                        temp = Math.abs(gc * Math.sqrt(1 + gs * gs /
                            (gc * gc)));
                    } else {
                        temp = -Math.abs(gc * Math.sqrt(1 + gs * gs /
                            (gc * gc)));
                    }
                    gc = work[i - 1] / temp;
                    gs = work[i] / temp;

                    /* node:coverage disable */
                    if (gc === 1) {
                        continue;
                    }
                    /* node:coverage enable */
                    if (gc === 0) {
                        work[i - 1] = gs * temp;
                        for (let j = 1; j <= n; j += 1) {
                            const dmatJ = dmat[j];

                            temp = dmatJ[i - 1];
                            dmatJ[i - 1] = dmatJ[i];
                            dmatJ[i] = temp;
                        }
                    } else {
                        work[i - 1] = temp;
                        nu = gs / (1 + gc);
                        for (let j = 1; j <= n; j += 1) {
                            const dmatJ = dmat[j];

                            temp = gc * dmatJ[i - 1] + gs * dmatJ[i];
                            dmatJ[i] = nu * (dmatJ[i - 1] + temp) -
                                dmatJ[i];
                            dmatJ[i - 1] = temp;

                        }
                    }
                }
                work[l] = work[nact];
            }
        } else {
            sum = -bvec[nvl];
            for (let j = 1; j <= n; j += 1) {
                sum += sol[j] * amatColumn[j];
            }
            if (nvl > meq) {
                work[iwsv + nvl] = sum;
            /* node:coverage disable */
            } else {
                work[iwsv + nvl] = -Math.abs(sum);
                if (sum > 0) {
                    for (let j = 1; j <= n; j += 1) {
                        const amatJ = amat[j];
                        const constraintValue = -amatColumn[j];

                        amatColumn[j] = constraintValue;
                        amatJ[nvl] = constraintValue;
                    }
                    bvec[nvl] = -bvec[nvl];
                }
            }
            /* node:coverage enable */

            return 700; // GOTO 700
        }

        return 0;
    }

    /**
     *
     */
    function fnGoto797() {
        l = iwrm + (it1 * (it1 + 1)) / 2 + 1;
        l1 = l + it1;
        /* node:coverage disable */
        if (work[l1] === 0) {
            return 798; // GOTO 798
        }
        /* node:coverage enable */
        gc = Math.max(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
        gs = Math.min(Math.abs(work[l1 - 1]), Math.abs(work[l1]));
        if (work[l1 - 1] >= 0) {
            temp = Math.abs(gc * Math.sqrt(1 + (gs / gc) * (gs / gc)));
        } else {
            temp = -Math.abs(gc * Math.sqrt(1 + (gs / gc) * (gs / gc)));
        }
        gc = work[l1 - 1] / temp;
        gs = work[l1] / temp;

        /* node:coverage disable */
        if (gc === 1) {
            return 798; // GOTO 798
        }
        /* node:coverage enable */
        if (gc === 0) {
            for (let i = it1 + 1; i <= nact; i += 1) {
                temp = work[l1 - 1];
                work[l1 - 1] = work[l1];
                work[l1] = temp;
                l1 += i;
            }
            for (let i = 1; i <= n; i += 1) {
                const dmatI = dmat[i];

                temp = dmatI[it1];
                dmatI[it1] = dmatI[it1 + 1];
                dmatI[it1 + 1] = temp;
            }
        } else {
            nu = gs / (1 + gc);
            for (let i = it1 + 1; i <= nact; i += 1) {
                temp = gc * work[l1 - 1] + gs * work[l1];
                work[l1] = nu * (work[l1 - 1] + temp) - work[l1];
                work[l1 - 1] = temp;
                l1 += i;
            }
            for (let i = 1; i <= n; i += 1) {
                const dmatI = dmat[i];

                temp = gc * dmatI[it1] + gs * dmatI[it1 + 1];
                dmatI[it1 + 1] = nu * (dmatI[it1] + temp) -
                    dmatI[it1 + 1];
                dmatI[it1] = temp;
            }
        }

        return 0;
    }

    /**
     *
     */
    function fnGoto798() {
        l1 = l - it1;
        for (let i = 1; i <= it1; i += 1) {
            work[l1] = work[l];
            l += 1;
            l1 += 1;
        }

        work[iwuv + it1] = work[iwuv + it1 + 1];
        iact[it1] = iact[it1 + 1];
        it1 += 1;
        if (it1 < nact) {
            return 797; // GOTO 797
        }

        return 0;
    }

    /**
     *
     */
    function fnGoto799() {
        work[iwuv + nact] = work[iwuv + nact + 1];
        work[iwuv + nact + 1] = 0;
        iact[nact] = 0;
        nact -= 1;
        iter[2] += 1;

        return 0;
    }

    while (true) {
        go = fnGoto50();
        if (go === 999) {
            return;
        }
        while (true) {
            go = fnGoto55();
            if (go === 0) {
                break;
            }
            if (go === 999) {
                return;
            }
            if (go === 700) {
                /* node:coverage disable */
                if (it1 === nact) {
                    fnGoto799();
                } else {
                    /* node:coverage enable */
                    while (true) {
                        fnGoto797();
                        go = fnGoto798();
                        if (go !== 797) {
                            break;
                        }
                    }
                    fnGoto799();
                }
            }
        }
    }

}

export default qpgen2;
