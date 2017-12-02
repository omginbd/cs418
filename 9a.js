const { each, omit } = require("lodash")

const trieFromPatternHandler = dataString => {
  const patterns = dataString.split("\n")
  return printTrieNode(trieFromPattern(patterns).root)
}

module.exports.trieFromPatternHandler = trieFromPatternHandler

const trieFromPattern = patterns => {
  const trie = { root: { i: 0 } }
  let curnode = trie.root
  let curI = 1
  for (let i = 0; i < patterns.length; i++) {
    const pattern = patterns[i]
    for (j = 0; j < pattern.length; j++) {
      if (curnode[pattern[j]]) {
        curnode = curnode[pattern[j]]
      } else {
        curnode[pattern[j]] = { i: curI++ }
        curnode = curnode[pattern[j]]
      }
    }
    curnode = trie.root
  }
  return trie
}

module.exports.trieFromPattern = trieFromPattern

const printTrieNode = node => {
  let toReturn = ""
  each(omit(node, ["i"]), (value, key) => {
    toReturn += node.i + "->" + node[key].i + ":" + key + "\n"
  })
  each(omit(node, ["i"]), (value, key) => {
    toReturn += printTrieNode(node[key])
  })
  return toReturn
}

module.exports.printTrieNode = printTrieNode
