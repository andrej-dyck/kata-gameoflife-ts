import { describe, expect, test } from 'vitest'
import { Board, conwaysOriginalRule, simulate } from './index.ts'
import { take } from './ts-sequences.ts'

const conwaysGameOfLife = (seed: Board) => simulate(conwaysOriginalRule, seed)

describe('oscillating patterns', () => {

  test('blinker', () => {
    const seed = testBoard(
      '..#..',
      '..#..',
      '..#..',
    )
    expectBoardSequence(
      seed,
      testBoard(
        '.....',
        '.###.',
        '.....',
      ),
      seed
    )
  })
})

describe('still-life', () => {

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

const expectBoardSequence = (seed: Board, ...boards: readonly Board[]) =>
  expect(take(conwaysGameOfLife(seed), boards.length + 1)).toEqual([seed, ...boards])

const expectNotChanging = (seed: Board) =>
  expectBoardSequence(seed, seed, seed)

const testBoard = (...rows: string[]): Board =>
  rows
