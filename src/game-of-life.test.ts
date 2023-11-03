import { describe, expect, test } from 'vitest'
import { simulate } from './game-of-life.ts'
import { take } from './ts-sequences.ts'
import { conwaysOriginalRule } from './evolution-rule.ts'
import { Board, Coordinate, infinite2dBoard } from './board.ts'

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
  expect(
    take(conwaysGameOfLife(seed), boards.length + 1).map(omitFunctions)
  ).toEqual(
    [seed, ...boards].map(omitFunctions)
  )

const expectNotChanging = (seed: Board) =>
  expectBoardSequence(seed, seed, seed)

const testBoard = (...rows: string[]): Board => infinite2dBoard({
  livingCells: new Set(
    rows.flatMap((row, rowIndex) =>
      [...row].map((c, colIndex) => [c, colIndex] as const)
        .filter(([c]) => c === '#')
        .map(([c, colIndex]) => ({ x: rowIndex, y: colIndex } satisfies Coordinate))
    )
  )
})

const omitFunctions = <T extends Record<PropertyKey, unknown>>(obj: T): Partial<T> => {
  const copy = { ...obj }
  for (const k of Object.keys(obj)) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    if(typeof copy[k] === 'function') delete copy[k]
  }
  return copy
}
