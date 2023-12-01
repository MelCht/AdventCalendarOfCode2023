import { dayOneProperArray } from '../dayOneProperArray'

const test: string[] = [
  'pqr3stu8vwx',
  'a1b2c3d4e5f',
  'treb7uchet',
  '3331',
  '22meight1',
  'nine2sixrtwothree'
]

function concatFirstAndLastDigits (string: string): number {
  const matches = string.match(/\d/g)

  if (!matches || matches.length === 0) {
    return 0
  }

  const firstNumber = parseInt(matches[0], 10)
  const lastNumber = parseInt(matches[matches.length - 1], 10)

  if (isNaN(firstNumber) || isNaN(lastNumber)) {
    return 0
  }

  return parseInt(firstNumber.toString() + lastNumber.toString(), 10)
}

// Functionnal test of the function concatFirstAndLastDigits (expected answer => [ 38, 15, 77, 31, 21, 22 ])
// const resultArray: number[] = test.map(item => concatFirstAndLastDigits(item))
// console.log(resultArray)

export function totalSumDigitsLines (array: string[]): number {
  let totalSum = 0
  for (const line of array) {
    const sumLine = concatFirstAndLastDigits(line)
    totalSum += sumLine
  }
  return totalSum
}

const totalSum = totalSumDigitsLines(dayOneProperArray)
// Functionnal test of totalSumDigitsLines (expected answer => Result: 204)
// const totalSum = totalSumDigitsLines(test)

console.log('ResultPart1:', totalSum)
