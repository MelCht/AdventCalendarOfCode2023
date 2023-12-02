import * as fs from 'fs'
import path from 'path'

class CubeGame {
  id: number
  subsets: { count: number; color: string }[][]

  constructor (id: number, subsets: { count: number; color: string }[][]) {
    this.id = id
    this.subsets = subsets
  }
}

const inputFilePath = path.join(__dirname, 'rawData.txt')
const input: string = fs.readFileSync(inputFilePath, 'utf8')

export const dayTwoProperArray: CubeGame[] = input
  .split('\n')
  .map(line => {
    const match = line.match(/Game (\d+): (.+)/)

    if (match) {
      const [id, subsetsString] = match.slice(1)
      const subsets: { count: number; color: string }[][] = subsetsString
        .split(';')
        .map(subset =>
          subset
            .trim()
            .split(',')
            .map(entry => {
              const [count, color] = entry.trim().split(' ')
              return { count: parseInt(count), color }
            })
        )
      return new CubeGame(parseInt(id), subsets)
    }

    return null
  })
  .filter(game => game !== null) as CubeGame[]

// console.log(dayTwoProperArray)
