import { dayTwoProperArray } from '../dayTwoProperArray'
import { CubeGame } from '../CubeGameClass'

// Could use the function that do kind of the same on part1, but I didn't understand the instructions for the exercise very well (confusing minimum cube by game instead of minimum cube needed to do the game)
function findmaximumCubes (game: CubeGame): {
  red: number
  green: number
  blue: number
} {
  let maxRed = 0
  let maxGreen = 0
  let maxBlue = 0

  game.subsets.forEach(subset => {
    subset.forEach(({ count, color }) => {
      switch (color) {
        case 'red':
          maxRed = Math.max(maxRed, count)
          break
        case 'green':
          maxGreen = Math.max(maxGreen, count)
          break
        case 'blue':
          maxBlue = Math.max(maxBlue, count)
          break
      }
    })
  })

  // console.log(`Game ${game.id}, maximum Red: ${maxRed}`)
  // console.log(`Game ${game.id}, maximum Green: ${maxGreen}`)
  // console.log(`Game ${game.id}, maximum Blue: ${maxBlue}`)

  return { red: maxRed, green: maxGreen, blue: maxBlue }
}

function calculatePower (red: number, green: number, blue: number): number {
  return red * green * blue
}

function sumOfPowers (games: CubeGame[]): number {
  let totalPower = 0

  for (const game of games) {
    const { red, green, blue } = findmaximumCubes(game)
    const power = calculatePower(red, green, blue)
    totalPower += power

    console.log(
      `Game ${game.id}: maximum cubes - Red: ${red}, Green: ${green}, Blue: ${blue}, Power: ${power}`
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
// const maximumCube = findmaximumCubes(gameTest)
console.log(`Sum of powers: ${totalPower}`)
// console.log(maximumCube)
