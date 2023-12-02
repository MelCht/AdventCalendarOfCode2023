import { dayTwoProperArray } from '../dayTwoProperArray'
import { CubeGame } from '../CubeGameClass'

function findMinimumCubes (game: CubeGame): {
  red: number
  green: number
  blue: number
} {
  let minRed = Infinity
  let minGreen = Infinity
  let minBlue = Infinity

  game.subsets.forEach(subset => {
    subset.forEach(({ count, color }) => {
      switch (color) {
        case 'red':
          minRed = Math.min(minRed, count)
          break
        case 'green':
          minGreen = Math.min(minGreen, count)
          break
        case 'blue':
          minBlue = Math.min(minBlue, count)
          break
      }
    })
  })

  // console.log(`Game ${game.id}, Minimum Red: ${minRed}`)
  // console.log(`Game ${game.id}, Minimum Green: ${minGreen}`)
  // console.log(`Game ${game.id}, Minimum Blue: ${minBlue}`)

  return { red: minRed, green: minGreen, blue: minBlue }
}

function calculatePower (red: number, green: number, blue: number): number {
  return red * green * blue
}

function sumOfPowers (games: CubeGame[]): number {
  let totalPower = 0

  for (const game of games) {
    const { red, green, blue } = findMinimumCubes(game)
    const power = calculatePower(red, green, blue)
    totalPower += power

    console.log(
      `Game ${game.id}: Minimum cubes - Red: ${red}, Green: ${green}, Blue: ${blue}, Power: ${power}`
    )
  }

  return totalPower
}

const gameTest: CubeGame[] = [
  new CubeGame(1, [
    [
      { count: 7, color: 'red' },
      { count: 14, color: 'blue' }
    ],
    [
      { count: 2, color: 'blue' },
      { count: 3, color: 'red' },
      { count: 3, color: 'green' }
    ],
    [
      { count: 4, color: 'green' },
      { count: 12, color: 'blue' },
      { count: 15, color: 'red' }
    ],
    [
      { count: 3, color: 'green' },
      { count: 12, color: 'blue' },
      { count: 3, color: 'red' }
    ],
    [
      { count: 11, color: 'red' },
      { count: 2, color: 'green' }
    ]
  ]),
  new CubeGame(2, [
    [
      { count: 16, color: 'blue' },
      { count: 9, color: 'red' },
      { count: 5, color: 'green' }
    ],
    [{ count: 8, color: 'red' }],
    [
      { count: 8, color: 'blue' },
      { count: 5, color: 'green' },
      { count: 12, color: 'red' }
    ],
    [
      { count: 11, color: 'blue' },
      { count: 8, color: 'green' },
      { count: 17, color: 'red' }
    ]
  ]),
  new CubeGame(3, [
    [
      { count: 8, color: 'green' },
      { count: 1, color: 'blue' },
      { count: 7, color: 'red' }
    ],
    [
      { count: 12, color: 'red' },
      { count: 6, color: 'blue' },
      { count: 9, color: 'green' }
    ],
    [
      { count: 2, color: 'blue' },
      { count: 1, color: 'red' },
      { count: 14, color: 'green' }
    ],
    [
      { count: 9, color: 'green' },
      { count: 4, color: 'red' }
    ],
    [
      { count: 2, color: 'red' },
      { count: 1, color: 'blue' },
      { count: 8, color: 'green' }
    ]
  ])
]

// const totalPower = sumOfPowers(gameTest)
const totalPower = sumOfPowers(dayTwoProperArray)
// const minimumCube = findMinimumCubes(gameTest)
console.log(`Sum of powers: ${totalPower}`)
// console.log(minimumCube)
