import * as fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, '../rawPuzzle.txt')

const dayFourArray = fs
  .readFileSync(filePath, 'utf-8')
  .split('\n')
  .filter(Boolean)
  .map(line => line.split(/\s*\|\s*/).filter(Boolean))

function processScratchcards (cards: string[][]): Map<string, number> {
  let cardInstances = new Map<string, number>()

  // Initialize the cardInstances map with the original cards
  cards.forEach((card, index) => {
    const cardKey = `Card ${index + 1}`
    cardInstances.set(cardKey, 1)
  })

  let updated = true

  while (updated) {
    updated = false

    cards.forEach((card, index) => {
      const cardKey = `Card ${index + 1}`
      const [winningNumbersStr, yourNumbersStr] = card
      const winningNumbers = winningNumbersStr.split(/\s+/)
      const yourNumbers = yourNumbersStr.split(/\s+/)

      if (cardInstances.get(cardKey) > 0) {
        yourNumbers.forEach(number => {
          if (winningNumbers.includes(number)) {
            for (let i = index + 1; i < cards.length; i++) {
              const nextCardKey = `Card ${i + 1}`
              cardInstances.set(
                nextCardKey,
                (cardInstances.get(nextCardKey) || 0) +
                  cardInstances.get(cardKey)
              )
              updated = true
            }
          }
        })
      }
    })
  }

  return cardInstances
}

const cardTestArray = [
  'Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53',
  'Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19',
  'Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1',
  'Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83',
  'Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36',
  'Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11'
]

const cardTest = cardTestArray.map(line =>
  line.split(/\s*\|\s*/).filter(Boolean)
)

// Functionnal test of the function calculatePoints (expected answer => 30)
const cardInstances = processScratchcards(cardTest)
// Calculate the total number of scratchcards
const totalScratchcards = Array.from(cardInstances.values()).reduce(
  (total, count) => total + count,
  0
)

// const cardInstances = processScratchcards(dayFourArray);
// // Calculate the total number of scratchcards
// const totalScratchcards = Array.from(cardInstances.values()).reduce((total, count) => total + count, 0);

console.log(`Total Scratchcards: ${totalScratchcards}`)
