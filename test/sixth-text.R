require(quadprog)

Dmat <- matrix(0,5,5)
diag(Dmat) <- 1
dvec <- c(-5, -0.5, 0, 0.2, 2)
Amat <- cbind(Dmat,-Dmat)
bvec <- c(-1,-1,-1,-1,-1,-1,-1,-1,-1,-1)

solve.QP(Dmat,dvec,Amat,bvec)

# $solution
# [1] -1.0 -0.5  0.0  0.2  1.0

# $value
# [1] -6.145

# $unconstrained.solution
# [1] -5.0 -0.5  0.0  0.2  2.0

# $iterations
# [1] 3 0

# $Lagrangian
#  [1] 4 0 0 0 0 0 0 0 0 1

# $iact
# [1]  1 10


# Matlab script
#
# clc
# n = 5;
# H = eye(n);
# g = [-5,-0.5,0,0.2,2]';
# l = -ones(n,1);
# u = ones(n,1);
# A = -[H; -H];
# b = -[l; -u];
# options = optimoptions(@quadprog,'Display',...
#     'off','Algorithm','active-set');
# x = quadprog(H,g,A,b,[],[],[],[],[],options)

# % What happens to solution, x,
# % for different values of g

# %    g 				x
# % -----------------------
# % g > u 		--> 	l
# % l < g < u 	--> 	- g
# % g < l  		--> 	u
# % g = 0 		--> 	0
