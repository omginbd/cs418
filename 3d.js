const fs = require('fs')
const { includes, isEmpty } = require('lodash')

const {
  deBruijnGlue,
  eachKmer,
  orderGraph,
  prefixSuffix,
  printGraph
} = require('./utils')

const generateDeBruijnGraphFromStringHandler = dataString => {
  const [k, dnaString] = dataString.split('\n')
  fs.writeFileSync(
    'out.txt',
    printGraph(generateDeBruijnGraphFromString(dnaString, +k))
  )
  return printGraph(generateDeBruijnGraphFromString(dnaString, +k))
}

module.exports.generateDeBruijnGraphFromStringHandler = generateDeBruijnGraphFromStringHandler

const generateDeBruijnGraphFromString = (dnaString, k) => {
  const graph = {}
  eachKmer(dnaString, k, kmer => {
    deBruijnGlue(graph, kmer)
  })
  return orderGraph(graph)
}

module.exports.generateDeBruijnGraphFromString = generateDeBruijnGraphFromString
