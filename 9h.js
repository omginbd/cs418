const { reduce, uniq } = require("lodash")

const { buildSuffixArray } = require("./utils")

const suffixArrayPatternMatchHandler = dataString => {
  const [genome, ...patterns] = dataString.split("\n")
  return reduce(
    suffixArrayPatternMatch(genome, patterns),
    (memo, i) => memo + i + " ",
    ""
  )
}

module.exports.suffixArrayPatternMatchHandler = suffixArrayPatternMatchHandler

const suffixArrayPatternMatch = (genome, patterns) => {
  const suffixes = buildSuffixArray(genome)
  const matches = []
  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i]
    for (let j = 0; j < suffixes.length; j++) {
      const suffix = suffixes[j]
      if (suffix.suffix.slice(0, pattern.length) === pattern) {
        matches.push(suffix.i)
      }
    }
  }
  return uniq(matches.sort((a, b) => a - b))
}

module.exports.suffixArrayPatternMatch = suffixArrayPatternMatch
