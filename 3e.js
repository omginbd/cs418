const { deBruijnGlue, orderGraph, printGraph } = require('./utils')

const generateDeBruijnGraphFromKmersHandler = dataString => {
  const kmers = dataString.split('\n')
  return printGraph(generateDeBruijnGraphFromKmers(kmers))
}

module.exports.generateDeBruijnGraphFromKmersHandler = generateDeBruijnGraphFromKmersHandler

const generateDeBruijnGraphFromKmers = kmers => {
  const graph = {}
  kmers.forEach(kmer => deBruijnGlue(graph, kmer))
  return orderGraph(graph)
}

module.exports.generateDeBruijnGraphFromKmers = generateDeBruijnGraphFromKmers
