const { cloneDeep, filter, map } = require('lodash')

const { findProfilemostKmer } = require('./2c')
const {
  generateProfile,
  getRandomKmerFromDNAString,
  scoreMotifs
} = require('./utils')

const gibbsSamplerHandler = dataString => {
  const [kt, ...rest] = dataString.split('\n')
  const [k, t, N] = kt.split(' ')
  let numIterations = 20
  let bestScore = 10000
  let bestMotifs = []
  while (numIterations-- > 0) {
    console.log({ numIterations })
    const { motifs, score } = gibbsSampler(rest, +k, +t, +N)
    if (score < bestScore) {
      bestMotifs = motifs
      bestScore = score
    }
  }
  return bestMotifs
}

module.exports.gibbsSamplerHandler = gibbsSamplerHandler

const gibbsSampler = (DNA, k, t, N) => {
  let motifs = map(DNA, dnaString => getRandomKmerFromDNAString(dnaString, k))
  let bestMotifs = motifs
  let bestScore = scoreMotifs(motifs, k)
  while (N-- > 0) {
    console.log({ N })
    const motifToRemove = Math.floor(Math.random() * bestMotifs.length)
    const tempMotifs = filter(bestMotifs, (_, i) => i !== motifToRemove)
    const profile = generateProfile(tempMotifs, k, true)
    const newMotifs = map(bestMotifs, (motif, i) => {
      return i === motifToRemove
        ? findProfilemostKmer(DNA[i], k, profile)
        : motif
    })
    const newScore = scoreMotifs(newMotifs, k)
    if (newScore < bestScore) {
      bestMotifs = newMotifs
      bestScore = newScore
    }
  }
  return { motifs: bestMotifs, score: bestScore }
}

module.exports.gibbsSampler = gibbsSampler
