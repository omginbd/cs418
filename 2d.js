const { each, map } = require('lodash')

const { findProfilemostKmer } = require('./2c')
const {
  eachKmer,
  generateProfile,
  nthKmer,
  NucMap,
  scoreMotifs
} = require('./utils')

const greedyMotifSearchHandler = dataString => {
  const [kt, ...rest] = dataString.trim().split('\n')
  const [k, t] = kt.split(' ')
  return greedyMotifSearch(rest, k, t)
}

module.exports.greedyMotifSearchHandler = greedyMotifSearchHandler

const greedyMotifSearch = (DNA, k, t) => {
  let bestMotifs = map(DNA, dnaString => {
    return nthKmer(dnaString, k, 0)
  })
  let bestScore = scoreMotifs(bestMotifs, k)
  eachKmer(DNA[0], k, curKmer => {
    const motifs = [curKmer]
    for (let i = 1; i < t; i++) {
      const profile = generateProfile(motifs, k)
      motifs.push(findProfilemostKmer(DNA[i], k, profile))
    }
    const curScore = scoreMotifs(motifs, k)
    if (curScore < bestScore) {
      bestScore = curScore
      bestMotifs = motifs
    }
  })
  return bestMotifs.join('\n')
}

module.exports.greedyMotifSearch = greedyMotifSearch
