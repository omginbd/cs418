const { omit, reduce } = require("lodash")

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
  return tree
}

module.exports.buildSuffixTree = buildSuffixTree

const printSuffixTree = tree => tree.join("\n")

const treeFromTrie = trie => {
  const node = trie.root
  const patterns = []
  if (node.A) buildPaths(node.A, "A", patterns)
  if (node.T) buildPaths(node.T, "T", patterns)
  if (node.C) buildPaths(node.C, "C", patterns)
  if (node.G) buildPaths(node.G, "G", patterns)
  if (node["$"]) buildPaths(node["$"], "$", patterns)
  return patterns
}

const buildPaths = (node, buffer, patterns) => {
  if (isLeaf(node)) {
    patterns.push(buffer)
  }
  if (isBranch(node)) {
    patterns.push(buffer)
    buffer = ""
  }
  if (node.A) buildPaths(node.A, buffer + "A", patterns)
  if (node.T) buildPaths(node.T, buffer + "T", patterns)
  if (node.C) buildPaths(node.C, buffer + "C", patterns)
  if (node.G) buildPaths(node.G, buffer + "G", patterns)
  if (node["$"]) buildPaths(node["$"], buffer + "$", patterns)
}

const isLeaf = node => Object.keys(omit(node, ["i"])).length === 0
const isBranch = node => Object.keys(omit(node, ["i"])).length > 1
