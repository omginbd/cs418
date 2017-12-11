const { countBy, map, range, reduce } = require("lodash")

const lastToFirstMappingHandler = dataString => {
  const [lastString, indexToReturn] = dataString.split("\n")
  return lastToFirstMapping(lastString, indexToReturn)
}

module.exports.lastToFirstMappingHandler = lastToFirstMappingHandler

const lastToFirstMapping = (lastString, indexToReturn) => {
  const counts = countBy(lastString)
  const cTable = {
    $: 0,
    A: 1,
    C: counts.A + counts["$"],
    G: counts.A + counts["$"] + counts.C,
    T: counts.A + counts["$"] + counts.C + counts.G
  }

  const subStrings = reduce(
    range(lastString.length),
    (memo, val) => {
      memo.push(lastString.slice(0, val + 1))
      return memo
    },
    []
  )
  const occTable = map(subStrings, subString => {
    const _counts = countBy(subString)
    return {
      $: _counts["$"],
      A: _counts.A,
      C: _counts.C,
      G: _counts.G,
      T: _counts.T
    }
  })
  return (
    cTable[lastString[indexToReturn]] +
    occTable[indexToReturn][lastString[indexToReturn]] -
    1
  )
}

module.exports.lastToFirstMapping = lastToFirstMapping
