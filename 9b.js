const { omit } = require("lodash")

const { trieFromPattern, printTrieNode } = require("./9a")

const trieMatchingHandler = dataString => {
  const [text, ...patterns] = dataString.split("\n")
  const trie = trieFromPattern(patterns)
  return trieMatching(text, trie).join(" ")
}

module.exports.trieMatchingHandler = trieMatchingHandler

const trieMatching = (text, trie) => {
  const matches = []
  let i = 0
  while (text.length) {
    const match = prefixTrieMatching(text, trie)
    if (match) matches.push(i)
    i++
    text = text.slice(1)
  }
  return matches
}

module.exports.trieMatching = trieMatching

const prefixTrieMatching = (text, trie) => {
  // console.log(`Begin pattern matching for ${text}`)
  let curLetter = 0
  let symbol = text[curLetter]
  let v = trie.root
  let patternSoFar = ""
  while (true) {
    // console.log({ isLeaf: isLeaf(v), v, patternSoFar, symbol })
    if (isLeaf(v)) {
      return patternSoFar
    } else if (v[symbol]) {
      patternSoFar += symbol
      v = v[symbol]
      symbol = text[++curLetter]
    } else {
      return false
    }
  }
}

module.exports.prefixTrieMatching = prefixTrieMatching

const isLeaf = node => Object.keys(omit(node, ["i"])).length === 0
