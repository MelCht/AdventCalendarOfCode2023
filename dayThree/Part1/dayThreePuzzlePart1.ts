import * as fs from 'fs'
import * as path from 'path'

function isPart (i: number, j: number, input: string[][]): boolean {
  const i_values = [-1, 0, 1]
  const j_values = [-1, 0, 1]
  const symbols = ['%', '#', '*', '/', '@', '$', '&', '=', '+', '-']

  for (const iv of i_values) {
    for (const jv of j_values) {
      if (
        !(
          i + iv < 0 ||
          i + iv >= input.length ||
          j + jv < 0 ||
          j + jv >= input[0].length
        )
      ) {
        if (symbols.includes(input[i + iv][j + jv])) {
          return true
        }
      }
    }
  }
  return false
}

const input: string[][] = String(
  fs.readFileSync(path.join(__dirname, '../rawPuzzle.txt'))
)
  .trim()
  .split('\n')
  .map(line => line.split(''))

const parts: number[] = []
let tempBuilder = ''
let tempPart = false

for (let i = 0; i < input.length; i++) {
  for (let j = 0; j < input[i].length; j++) {
    if (Number.isInteger(+input[i][j])) {
      tempBuilder += input[i][j]
      tempPart = tempPart || isPart(i, j, input)
    }
    if (!Number.isInteger(+input[i][j]) || j === input[i].length - 1) {
      if (tempBuilder.length > 0) {
        if (tempPart) {
          parts.push(+tempBuilder)
        }
        tempBuilder = ''
        tempPart = false
      }
    }
  }
}

console.log(parts.reduce((a, b) => a + b))
