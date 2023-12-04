import * as fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, '../rawPuzzle.txt')

const dayFourArray = fs
  .readFileSync(filePath, 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(line => line.split(/\s*\|\s*/).filter(Boolean))

function calculatePoints (cards: string[][]): number {
  let totalPoints = 0

  cards.forEach((card, index) => {
    const [winningNumbersStr, yourNumbersStr] = card
    const winningNumbers = winningNumbersStr.split(/\s+/)
    const yourNumbers = yourNumbersStr.split(/\s+/)

    let points = 0
    let winningNumbersFoundCount = 0

    // console.log(`Traitement de la carte ${index + 1}:`)
    // console.log(`Nombres gagnants: ${winningNumbers.join(', ')}`)
    // console.log(`Vos numéros: ${yourNumbers.join(', ')}`)

    yourNumbers.forEach(number => {
      if (winningNumbers.includes(number)) {
        points = Math.pow(2, winningNumbersFoundCount)
        winningNumbersFoundCount++
      }
    })

    // console.log(
    //   `Nombre de numéros gagnants trouvés: ${winningNumbersFoundCount}`
    // )

    const cardPoints = points
    totalPoints += cardPoints

    // console.log(`Points pour la carte ${index + 1}: ${cardPoints}\n`)
  })

  return totalPoints
}

const cardTestArray = [
  '41 48 83 86 17 | 83 86 6 31 17 9 48 53',
  '13 32 20 16 61 | 61 30 68 82 17 32 24 19',
  '1 21 53 59 44 | 69 82 63 72 16 21 14 1',
  '41 92 73 84 69 | 59 84 76 51 58 5 54 83',
  '87 83 26 28 32 | 88 30 70 12 93 22 82 36',
  '31 18 13 56 72 | 74 77 10 23 35 67 36 11'
]

const cardTest = cardTestArray.map(line =>
  line.split(/\s*\|\s*/).filter(Boolean)
)

// Functionnal test of the function calculatePoints (expected answer => 13)
// const totalPoints = calculatePoints(cardTest)
const totalPoints = calculatePoints(dayFourArray)
console.log(`Total : ${totalPoints}`)
