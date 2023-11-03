import { describe, expect, test } from 'vitest'
import { Board, conwaysOriginalRule, simulate } from './index.ts'
import { take } from './ts-sequences.ts'

const conwaysGameOfLife = (seed: Board) => simulate(conwaysOriginalRule, seed)

describe('still-life', () => {

  const expectNotChanging = (board: Board) =>
    expect(take(conwaysGameOfLife(board), 3)).toEqual([board, board, board])

  test('empty board', () => expectNotChanging(
    testBoard(
      '...',
      '...',
      '...',
    )
  ))
  test('square', () => expectNotChanging(
    testBoard(
      '.##.',
      '.##.',
    )
  ))
  test('boat', () => expectNotChanging(
    testBoard(
      '.##..',
      '.#.#.',
      '..#..',
    )
  ))
  test('loaf', () => expectNotChanging(
    testBoard(
      '..##..',
      '.#..#.',
      '.#.#..',
      '..#...'
    )
  ))
  test('oval', () => expectNotChanging(
    testBoard(
      '..#..',
      '.#.#.',
      '.#.#.',
      '..#..'
    )
  ))
  test('ship', () => expectNotChanging(
    testBoard(
      '.##..',
      '.#.#.',
      '..##.'
    )
  ))
})

const testBoard = (...rows: string[]): Board =>
  rows
