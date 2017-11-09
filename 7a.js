const { parseWeightedTree, printDistMatrix } = require('./utils')

const distanceBetweenLeavesHandler = dataString => {
  const [n, ...rest] = dataString.split('\n')
  const tree = parseWeightedTree(rest.join('\n'))
  return printDistMatrix(distanceBetweenLeaves(tree, n))
}
module.exports.distanceBetweenLeavesHandler = distanceBetweenLeavesHandler

const distanceBetweenLeaves = (tree, n) => {
  const distMatrix = []
  for (let i = 0; i < n; i++) {
    distMatrix.push([])
    for (let j = 0; j < n; j++) {
      distMatrix[i][j] = i === j ? 0 : 1000
    }
  }
  return distMatrix
}
module.exports.distanceBetweenLeaves = distanceBetweenLeaves
