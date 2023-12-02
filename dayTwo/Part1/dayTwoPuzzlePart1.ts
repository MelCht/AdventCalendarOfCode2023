import { dayTwoProperArray } from '../dayTwoProperArray'
import { CubeGame } from '../CubeGameClass'


function isPossibleGame (
  game: CubeGame,
  redCount: number,
  greenCount: number,
  blueCount: number
): boolean {
  let maxRed = 0
  let maxGreen = 0
  let maxBlue = 0

  for (const subset of game.subsets) {
    for (const { count, color } of subset) {
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
    }
  }

  const isPossible =
    maxRed <= redCount && maxGreen <= greenCount && maxBlue <= blueCount

  // console.log(`Game ${game.id}, Is Possible: ${isPossible}`)

  return isPossible
}

function findPossibleGames (
  games: CubeGame[],
  redCount: number,
  greenCount: number,
  blueCount: number
): number {
  let sumOfPossibleGameIDs = 0

  for (const game of games) {
    if (isPossibleGame(game, redCount, greenCount, blueCount)) {
      sumOfPossibleGameIDs += game.id
    }
  }

  return sumOfPossibleGameIDs
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
  ]),
  new CubeGame(4, [
    [
      { count: 1, color: 'green' },
      { count: 3, color: 'red' },
      { count: 6, color: 'blue' }
    ],
    [
      { count: 3, color: 'green' },
      { count: 6, color: 'red' }
    ],
    [
      { count: 3, color: 'green' },
      { count: 15, color: 'blue' },
      { count: 14, color: 'red' }
    ]
  ]),
  new CubeGame(5, [
    [
      { count: 6, color: 'red' },
      { count: 1, color: 'blue' },
      { count: 3, color: 'green' }
    ],
    [
      { count: 2, color: 'blue' },
      { count: 1, color: 'red' },
      { count: 2, color: 'green' }
    ]
  ])
]

const redCubes = 12
const greenCubes = 13
const blueCubes = 14

// const result = findPossibleGames(gameTest, redCubes, greenCubes, blueCubes)
const result = findPossibleGames(
  dayTwoProperArray,
  redCubes,
  greenCubes,
  blueCubes
)

console.log(result)
