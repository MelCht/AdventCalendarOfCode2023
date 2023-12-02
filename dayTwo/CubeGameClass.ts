export class CubeGame {
  id: number
  subsets: { count: number; color: string }[][]

  constructor (id: number, subsets: { count: number; color: string }[][]) {
    this.id = id
    this.subsets = subsets
  }
}
