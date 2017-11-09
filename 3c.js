const { reduce } = require('lodash')

const generateOverlapGraphHandler = dataString => {
  const patterns = dataString.split('\n')
  return reduce(
    generateOverlapGraph(patterns, patterns[0].length),
    (memo, value, key) => memo + '\n' + `${key} -> ${value}`,
    ''
  )
}

module.exports.generateOverlapGraphHandler = generateOverlapGraphHandler

const generateOverlapGraph = (patterns, k) => {
  const graph = reduce(
    patterns,
    (memo, pattern) => {
      const suffix = pattern.slice(1)
      for (let i = 0; i < patterns.length; i++) {
        if (patterns[i] === pattern) continue
        const prefix = patterns[i].slice(0, -1)
        if (prefix === suffix) {
          memo[pattern] = patterns[i]
          return memo
        }
      }
      return memo
    },
    {}
  )
  const orderedGraph = {}
  Object.keys(graph)
    .sort()
    .forEach(key => (orderedGraph[key] = graph[key]))
  return orderedGraph
}

module.exports.enerateOverlapGraph = generateOverlapGraph
