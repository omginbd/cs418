const { parseGraph, printGraph } = require('./utils')

const findEulerianCycleHandler = dataString => {
  const graph = parseGraph(dataString)
  return findEulerianCycle(graph).join('->')
}

module.exports.findEulerianCycleHandler = findEulerianCycleHandler

const findEulerianCycle = graph => {
  const path = []
  // Start node`
  path[0] = Object.keys(graph)[0]
  // traverse
  while (someTest) {
    if (!isEmpty(graph[path.slice(-1)])) {
      path.push(graph[path.slice(-1)].shift())
    } else {
    }
  }

  return path
}

module.exports.findEulerianCycle = findEulerianCycle
