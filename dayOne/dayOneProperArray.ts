import * as fs from 'fs'
import path from 'path'

const filePath = path.join(__dirname, 'rawArray.txt')

export const dayOneProperArray = fs
  .readFileSync(filePath, 'utf-8')
  .split('\n')
  .filter(Boolean)
