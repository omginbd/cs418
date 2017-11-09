const fs = require('fs')
const { each, isNaN, map, range, reduce } = require('lodash')

const { eachKmer, NucMap } = require('./utils')

const findProfilemostKmerHandler = datastring => {
  const [DNA, _k, pa, pc, pg, pt] = datastring.split('\n')
  const k = +_k

  const profile = [pa.split(' '), pc.split(' '), pg.split(' '), pt.split(' ')]

  return findProfilemostKmer(DNA, k, profile)
}

module.exports.findProfilemostKmerHandler = findProfilemostKmerHandler

const findProfilemostKmer = (DNA, k, profile) => {
  let bestKmer = ''
  let bestScore = -1

  eachKmer(DNA, k, substr => {
    const probs = []
    each(substr, (nuc, j) => {
      probs.push(profile[j][NucMap[nuc]])
    })
    const curScore = reduce(probs, (acc, val) => acc * +val, 1)
    if (curScore > bestScore) {
      bestScore = curScore
      bestKmer = substr
    }
  })

  return bestKmer
}

module.exports.findProfilemostKmer = findProfilemostKmer
