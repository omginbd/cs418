const { reduce } = require("lodash")

const { trieFromPattern, printTrieNode } = require("./9a")

const buildSuffixTreeHandler = dataString => {
  return printSuffixTree(buildSuffixTree(dataString))
}

module.exports.buildSuffixTreeHandler = buildSuffixTreeHandler

const buildSuffixTree = genome => {
  const patterns = []
  for (let i = 0; i < genome.length; i++) {
    patterns.push(genome.slice(i))
  }
  const trie = trieFromPattern(patterns)
  const tree = treeFromTrie(trie)
  return trie
}

module.exports.buildSuffixTree = buildSuffixTree

const printSuffixTree = tree => JSON.stringify(tree)

const treeFromTrie = trie => {}

const isLeaf = node => Object.keys(omit(node, ["i"])).length === 0
