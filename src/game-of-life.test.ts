import { expect, test } from 'vitest'
import { Board, conwaysOriginalRule, simulate } from './index.ts'
import { take } from './ts-sequences.ts'

const conwaysGameOfLife = (seed: Board) => simulate(conwaysOriginalRule, seed)

test('empty board remains empty', () => {
  expectNotChanging(
    testBoard(
      '...',
      '...',
      '...'
    )
  )
})

const expectNotChanging = (board: Board) =>
  expect(take(conwaysGameOfLife(board), 3)).toEqual([board, board, board])

const testBoard = (...rows: string[]): Board =>
  undefined
