const { reduce } = require("lodash")

const buildSuffixArrayHandler = dataString => {
  return reduce(
    buildSuffixArray(dataString),
    (memo, suffix) => memo + suffix.i + ", ",
    ""
  ).slice(0, -2)
}

module.exports.buildSuffixArrayHandler = buildSuffixArrayHandler

const buildSuffixArray = genome => {
  const suffixes = []
  for (let i = 0; i < genome.length; i++) {
    suffixes.push({ suffix: genome.slice(i), i })
  }
  suffixes.sort((a, b) => a.suffix.localeCompare(b.suffix))
  return suffixes
}

module.exports.buildSuffixArray = buildSuffixArray
