require(quadprog)

Dmat <- matrix(c(13,18,-6, 18,27,-9, -6,-9,4),3,3)
dvec <- c(-4,0,-100)
Amat <- matrix(c(0,0,-1),3,1)
bvec <- c(-25)

solve.QP(Dmat,dvec,Amat,bvec=bvec,meq=1)
