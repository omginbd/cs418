const { map } = require('lodash')

const { findProfilemostKmer } = require('./2c')
const {
  generateProfile,
  getRandomKmerFromDNAString,
  nthKmer,
  numKmers,
  scoreMotifs
} = require('./utils')

const randomizedMotifSearchHandler = dataString => {
  const [kt, ...rest] = dataString.split('\n')
  const [k, t] = kt.split(' ')
  let numIterations = 1000
  let bestScore = 10000
  let bestMotifs = []
  while (numIterations-- > 0) {
    console.log({ numIterations })
    const { motifs, score } = randomizedMotifSearch(rest, +k, +t)
    if (score < bestScore) {
      bestMotifs = motifs
      bestScore = score
    }
  }
  return bestMotifs
}

module.exports.randomizedMotifSearchHandler = randomizedMotifSearchHandler

const randomizedMotifSearch = (DNA, k, t) => {
  let motifs = map(DNA, dnaString => getRandomKmerFromDNAString(dnaString, k))
  let bestMotifs = motifs
  let bestScore = scoreMotifs(motifs, k)
  while (1) {
    const profile = generateProfile(bestMotifs, k, true)
    const newMotifs = map(DNA, dnaString => {
      return findProfilemostKmer(dnaString, k, profile)
    })
    const newScore = scoreMotifs(newMotifs, k)
    if (newScore < bestScore) {
      bestMotifs = newMotifs
      bestScore = newScore
    } else {
      return { motifs: bestMotifs, score: bestScore }
    }
  }
}

module.exports.randomizedMotifSearch = randomizedMotifSearch
