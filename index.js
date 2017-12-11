const CFonts = require("cfonts")
const fs = require("fs")
const { each } = require("lodash")
const menu = require("node-menu")

const { findProfilemostKmerHandler } = require("./2c")
const { greedyMotifSearchHandler } = require("./2d")
const { greedyMotifSearchPseudoCountsHandler } = require("./2e")
const { randomizedMotifSearchHandler } = require("./2f")
const { gibbsSamplerHandler } = require("./2g")
const { generateKmerCompositionHandler } = require("./3a")
const { stringFromPathHandler } = require("./3b")
const { generateOverlapGraphHandler } = require("./3c")
const { generateDeBruijnGraphFromStringHandler } = require("./3d")
const { generateDeBruijnGraphFromKmersHandler } = require("./3e")
const { findEulerianCycleHandler } = require("./3f")
const { distanceBetweenLeavesHandler } = require("./7a")
const { trieFromPatternHandler } = require("./9a")
const { trieMatchingHandler } = require("./9b")
const { buildSuffixTreeHandler } = require("./9c")
const { buildSuffixArrayHandler } = require("./9g")
const { suffixArrayPatternMatchHandler } = require("./9h")
const { burrowsWheelerTransformHandler } = require("./9i")
const { reconstructFromBurrowsWheelerHandler } = require("./9j")
const { lastToFirstMappingHandler } = require("./9k")
const { readFileAsString } = require("./utils")

const options = [
  {
    label: "Find Profile-most K-mer in DNA string",
    handler: findProfilemostKmerHandler
  },
  {
    label: "Greedy Motif Search",
    handler: greedyMotifSearchHandler
  },
  {
    label: "Greedy Motif Search (With Pseudo Counts)",
    handler: greedyMotifSearchPseudoCountsHandler
  },
  {
    label: "Randomized Motif Search",
    handler: randomizedMotifSearchHandler
  },
  {
    label: "Gibbs Sampler",
    handler: gibbsSamplerHandler
  },
  {
    label: "Generate Kmer Compasition",
    handler: generateKmerCompositionHandler
  },
  {
    label: "Generate String from Kmers",
    handler: stringFromPathHandler
  },
  {
    label: "Generate Overlap Graph",
    handler: generateOverlapGraphHandler
  },
  {
    label: "Generate De Bruijn Graph From String",
    handler: generateDeBruijnGraphFromStringHandler
  },
  {
    label: "Generate De Bruijn Graph From Kmers",
    handler: generateDeBruijnGraphFromKmersHandler
  },
  {
    label: "Find Eulerian Cycle",
    handler: findEulerianCycleHandler
  },
  {
    label: "Compute Distances Between Leaves",
    handler: distanceBetweenLeavesHandler
  },
  {
    label: "Trie From Patterns",
    handler: trieFromPatternHandler
  },
  {
    label: "Prefix Trie Matching",
    handler: trieMatchingHandler
  },
  {
    label: "Build Suffix Tree",
    handler: buildSuffixTreeHandler
  },
  {
    label: "Suffix Array from Genome",
    handler: buildSuffixArrayHandler
  },
  {
    label: "Pattern Match Suffix Array",
    handler: suffixArrayPatternMatchHandler
  },
  {
    label: "Burrows Wheeler Transform",
    handler: burrowsWheelerTransformHandler
  },
  {
    label: "Reconstruct from Burrows Wheeler Transform",
    handler: reconstructFromBurrowsWheelerHandler
  },
  {
    label: "Last to First Mapping",
    handler: lastToFirstMappingHandler
  }
]

menu.customHeader(() => {
  CFonts.say("BIOINFORMATICS", {
    font: "block",
    align: "center",
    colors: ["green"],
    background: "black",
    letterSpacing: 1,
    lineHeight: 1,
    space: true
  })
})

each(options, option => {
  menu.addItem(
    option.label,
    filename => {
      const result = option.handler(readFileAsString(filename))
      console.log(result)
      fs.writeFileSync("out.txt", result)
    },
    null,
    [{ name: "filename", type: "string" }]
  )
})

menu.start()
