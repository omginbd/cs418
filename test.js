const fs = require("fs")
const dataBuf = fs.readFileSync("./data.txt")

const data = dataBuf.toString()
console.log(data)

let a = 0
let c = 0
let g = 0
let t = 0

for (const ch of data.split("")) {
  console.log(ch)
  if (ch === "A") {
    a++
  } else if (ch === "C") {
    c++
  } else if (ch === "G") {
    g++
  } else if (ch === "T") {
    t++
  } else {
    continue
  }
}

console.log(a, c, g, t)
