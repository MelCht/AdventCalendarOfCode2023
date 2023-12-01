import { dayOneProperArray } from '../dayOneProperArray'
import { totalSumDigitsLines } from '../Part1/dayOnePuzzlePart1'

function replaceDigits (inputArray: string[]): string[] {
  const digitChangedArray: string[] = []

  for (let i = 0; i < inputArray.length; i++) {
    let replacedString = inputArray[i]

    replacedString = replacedString
      .replace(/one/g, 'one1one')
      .replace(/two/g, 'two2two')
      .replace(/three/g, 'three3three')
      .replace(/four/g, 'four4four')
      .replace(/five/g, 'five5five')
      .replace(/six/g, 'six6six')
      .replace(/seven/g, 'seven7seven')
      .replace(/eight/g, 'eight8eight')
      .replace(/nine/g, 'nine9nine')

    digitChangedArray.push(replacedString)
  }

  return digitChangedArray
}

let digitChangedArray = replaceDigits(dayOneProperArray)
let newResult = totalSumDigitsLines(digitChangedArray)

console.log('ResultPart2 : ' + newResult)
