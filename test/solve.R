require(rjson)
require(quadprog)

for (infile in commandArgs(trailingOnly=TRUE)) {
  data <- fromJSON(file=infile)
  Dmat <- data["Dmat"][[1]]
  Dmat <- matrix(unlist(Dmat), length(Dmat), byrow = TRUE)
  dvec <- data["dvec"][[1]]
  Amat <- data["Amat"][[1]]
  Amat <- matrix(unlist(Amat), length(Amat), byrow = TRUE)
  bvec <- data["bvec"][[1]]
  meq <- data["meq"][[1]]
  factorized <- data["factorized"][[1]]

  res <- solve.QP(Dmat, dvec, Amat, bvec, meq, factorized)
  outfile <- gsub("-data.json", "-result.json", infile, fixed = TRUE)
  cat(toJSON(res), file = outfile)
}
