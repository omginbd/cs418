const { map, filter } = require("lodash")

const reconstructFromBurrowsWheelerHandler = dataString => {
  return reconstructFromBurrowsWheeler(dataString)
}

module.exports.reconstructFromBurrowsWheelerHandler = reconstructFromBurrowsWheelerHandler

const reconstructFromBurrowsWheeler = bwtString => {
  let possibleStrings = new Array(bwtString.length).fill("")
  for (i = 0; i < bwtString.length; i++) {
    possibleStrings = map(possibleStrings, (string, index) => {
      return bwtString[index] + string
    }).sort()
  }
  return filter(possibleStrings, string => string.slice(-1) === "$")[0]
}

module.exports.reconstructFromBurrowsWheeler = reconstructFromBurrowsWheeler
