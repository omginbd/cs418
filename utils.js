const fs = require("fs")
const { each, isEmpty, reduce } = require("lodash")

const numKmers = (DNA, k) => DNA.length - k + 1

module.exports.numKmers = numKmers

module.exports.eachKmer = (DNA, k, cb) => {
  for (let i = 0; i < module.exports.numKmers(DNA, k); i++) {
    cb(DNA.substr(i, k))
  }
}

const nthKmer = (DNA, k, i) => {
  if (i + k < DNA.length + 1 && i >= 0) {
    return DNA.substr(i, k)
  } else {
    throw new Error(`requested ${i} k-mer is outside range`)
  }
}

module.exports.nthKmer = nthKmer

module.exports.readFileAsString = filename => {
  return fs.readFileSync(filename).toString()
}

const NucMap = {
  A: 0,
  C: 1,
  G: 2,
  T: 3
}
module.exports.NucMap = NucMap

const generateProfile = (motifs, k, pseudocounts) => {
  const counts = []
  for (let i = 0; i < k; i++) {
    counts.push(pseudocounts ? [1, 1, 1, 1] : [0, 0, 0, 0])
  }
  // Counts
  each(motifs, motif => {
    for (let i = 0; i < k; i++) {
      counts[i][NucMap[motif[i]]]++
    }
  })
  // Proportions
  const profile = []
  for (let i = 0; i < k; i++) {
    profile.push([0, 0, 0, 0])
    for (let j = 0; j < 4; j++) {
      profile[i][j] = counts[i][j] / motifs.length
    }
  }
  return profile
}

module.exports.generateProfile = generateProfile

const scoreMotifs = (motifs, k) => {
  let score = 0
  for (let i = 0; i < k; i++) {
    let mostCount = "A"
    const counts = { A: 0, C: 0, G: 0, T: 0 }
    for (let curMotif = 0; curMotif < motifs.length; curMotif++) {
      counts[motifs[curMotif][i]]++
      if (counts[motifs[curMotif][i]] > counts[mostCount]) {
        mostCount = motifs[curMotif][i]
      }
    }
    score += motifs.length - counts[mostCount]
  }
  return score
}

module.exports.scoreMotifs = scoreMotifs

const getRandomKmerFromDNAString = (DNA, k) => {
  const kmerStart = Math.floor(Math.random() * numKmers(DNA, k))
  return nthKmer(DNA, k, kmerStart)
}

module.exports.getRandomKmerFromDNAString = getRandomKmerFromDNAString

const prefixSuffix = kmer => {
  return { prefix: kmer.slice(0, -1), suffix: kmer.slice(1) }
}

module.exports.prefixSuffix = prefixSuffix

const orderGraph = graph => {
  const orderedGraph = {}
  Object.keys(graph)
    .sort()
    .forEach(key => (orderedGraph[key] = graph[key]))
  return orderedGraph
}

module.exports.orderGraph = orderGraph

const printGraph = graph => {
  return reduce(
    graph,
    (memo, value, key) => memo + "\n" + `${key} -> ${value}`,
    ""
  )
}

module.exports.printGraph = printGraph

const parseGraph = adjacencyString => {
  const graph = {}
  const nodes = adjacencyString.split("\n")
  nodes.forEach(node => {
    const [_from, tos] = node.split("->")
    const from = _from.trim()
    tos.split(",").forEach(to => {
      if (!isEmpty(graph[from])) {
        graph[from].push(to.trim())
        graph[from].sort()
      } else {
        graph[from] = [to.trim()]
      }
    })
  })
  return graph
}

module.exports.parseGraph = parseGraph

const parseWeightedTree = treeString => {
  const graph = {}
  const nodes = treeString.split("\n")
  nodes.forEach(node => {
    const [from, _to] = node.split("->")
    const [to, weight] = _to.split(":")
    if (!isEmpty(graph[from])) {
      graph[from].push({ to, weight })
      graph[from].sort((a, b) => a.to - b.to)
    } else {
      graph[from] = [{ to, weight }]
    }
  })
  return graph
}

module.exports.parseWeightedTree = parseWeightedTree

const printDistMatrix = matrix => {
  let printString = ""
  for (let i = 0; i < matrix.length; i++) {
    printString += "\n"
    printString += matrix[i].join(" ")
  }
  return printString
}

module.exports.printDistMatrix = printDistMatrix

const deBruijnGlue = (graph, kmer) => {
  const { prefix, suffix } = prefixSuffix(kmer)
  if (!isEmpty(graph[prefix])) {
    graph[prefix].push(suffix)
    graph[prefix].sort()
  } else {
    graph[prefix] = [suffix]
  }
  return graph
}

module.exports.deBruijnGlue = deBruijnGlue

const buildSuffixArray = genome => {
  const suffixes = []
  for (let i = 0; i < genome.length; i++) {
    suffixes.push({ suffix: genome.slice(i), i })
  }
  suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix))
  return suffixes
}

module.exports.buildSuffixArray = buildSuffixArray
