import { describe, expect, test } from 'vitest'
import { Board, simulate } from './game-of-life.ts'
import { take } from './ts-sequences.ts'
import { conwaysOriginalRule } from './evolution-rule.ts'

const conwaysGameOfLife = (seed: Board) => simulate(conwaysOriginalRule, seed)

describe('oscillating patterns', () => {

  test.skip('blinker', () => {
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
