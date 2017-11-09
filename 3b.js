const { reduce } = require('lodash')

const stringFromPathHandler = dataString => {
  const patterns = dataString.split('\n')
  return stringFromPath(patterns)
}

module.exports.stringFromPathHandler = stringFromPathHandler

const stringFromPath = patterns =>
  reduce(
    patterns,
    (memo, pattern) => (memo === '' ? pattern : memo + pattern.slice(-1))
  )

module.exports.stringFromPath = stringFromPath
