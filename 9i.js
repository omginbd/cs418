const { reduce } = require("lodash")

const burrowsWheelerTransformHandler = dataString => {
  return burrowsWheelerTransform(dataString)
}

module.exports.burrowsWheelerTransformHandler = burrowsWheelerTransformHandler

const burrowsWheelerTransform = genome => {
  const rotations = []
  for (let i = 0; i < genome.length; i++) {
    rotations.push(genome)
    genome = genome.concat(genome.split("").shift()).slice(1)
  }
  rotations.sort()
  console.log(rotations)
  return reduce(rotations, (memo, rotation) => memo + rotation.slice(-1), "")
}

module.exports.burrowsWheelerTransform = burrowsWheelerTransform
