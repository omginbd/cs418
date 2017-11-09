const { eachKmer } = require('./utils')

const generateKmerCompositionHandler = dataString => {
  const [k, dna] = dataString.split('\n')
  return generateKmerComposition(dna, +k).join('\n')
}

module.exports.generateKmerCompositionHandler = generateKmerCompositionHandler

const generateKmerComposition = (dna, k) => {
  const kmers = []
  eachKmer(dna, k, kmer => {
    kmers.push(kmer)
  })
  return kmers.sort()
}

module.exports.generateKmerComposition = generateKmerComposition
