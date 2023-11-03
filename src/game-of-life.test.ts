import { describe, expect, test } from 'vitest'
import { simulate } from './game-of-life.ts'
import { conwaysOriginalRule } from './evolution-rule.ts'
import { Board, Coordinate, coordinate, infinite2dBoard } from './board.ts'
import { Set } from 'immutable'
import { omitFunctions, take } from './ts-extensions.ts'

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
  test('clock', () => {
    const seed = testBoard(
      '...#..',
      '.##...',
      '...##.',
      '..#...',
    )
    expectBoardSequence(
      seed,
      testBoard(
        '..#...',
        '..#.#.',
        '.#.#..',
        '...#..',
      ),
      seed
    )
  })
  test('glider', () => {
    const seed = testBoard(
      '..#....',
      '...#...',
      '.###...',
      '.......',
    )
    expectBoardSequence(
      seed,
      testBoard(
        '.......',
        '.#.#...',
        '..##...',
        '..#....',
      ),
      testBoard(
        '.......',
        '...#...',
        '.#.#...',
        '..##...',
      ),
      testBoard(
        '.......',
        '..#....',
        '...##..',
        '..##...',
      ),
      testBoard(
        '.......',
        '...#...',
        '....#..',
        '..###..',
      )
    )
  })
  test('pulsar', () => {
    const seed = testBoard(
      '.................',
      '.................',
      '....###...###....',
      '.................',
      '..#....#.#....#..',
      '..#....#.#....#..',
      '..#....#.#....#..',
      '....###...###....',
      '.................',
      '....###...###....',
      '..#....#.#....#..',
      '..#....#.#....#..',
      '..#....#.#....#..',
      '.................',
      '....###...###....',
      '.................',
      '.................',
      '.................',
    )
    expectBoardSequence(
      seed,
      testBoard(
        '.................',
        '.....#.....#.....',
        '.....#.....#.....',
        '.....##...##.....',
        '.................',
        '.###..##.##..###.',
        '...#.#.#.#.#.#...',
        '.....##...##.....',
        '.................',
        '.....##...##.....',
        '...#.#.#.#.#.#...',
        '.###..##.##..###.',
        '.................',
        '.....##...##.....',
        '.....#.....#.....',
        '.....#.....#.....',
        '.................',
        '.................',
      ),
      testBoard(
        '.................',
        '.................',
        '....##.....##....',
        '.....##...##.....',
        '..#..#.#.#.#..#..',
        '..###.##.##.###..',
        '...#.#.#.#.#.#...',
        '....###...###....',
        '.................',
        '....###...###....',
        '...#.#.#.#.#.#...',
        '..###.##.##.###..',
        '..#..#.#.#.#..#..',
        '.....##...##.....',
        '....##.....##....',
        '.................',
        '.................',
        '.................',
      ),
      seed
    )
  })
})

describe('stable patterns', () => {

  test('small rotated-L', () => {
    const seed = testBoard(
      '.##.',
      '.#..',
    )
    const stable = testBoard(
      '.##.',
      '.##.',
    )
    expectBoardSequence(
      seed,
      stable,
      stable
    )
  })
  test('large rotated-L', () => {
    const seed = testBoard(
      '.....',
      '.###.',
      '.#...',
      '.....',
    )
    const stable = testBoard(
      '.##..',
      '#..#.',
      '.##..',
      '.....',
    )
    expectBoardSequence(
      seed,
      testBoard(
        '..#..',
        '.##..',
        '.#...',
        '.....',
      ),
      testBoard(
        '.##..',
        '.##..',
        '.##..',
        '.....',
      ),
      stable,
      stable
    )
  })
  test('large I', () => {
    const seed = testBoard(
      '...#...',
      '...#...',
      '...#...',
      '...#...',
    )
    const stable = testBoard(
      '...#...',
      '..#.#..',
      '..#.#..',
      '...#...',
    )
    expectBoardSequence(
      seed,
      testBoard(
        '.......',
        '..###..',
        '..###..',
        '.......',
      ),
      stable,
      stable
    )
  })
})

describe('dying patterns', () => {

  test('i', () => expectBoardSequence(
    testBoard(
      '..#.',
      '.#..',
      '.#..',
    ),
    testBoard(
      '....',
      '.##.',
      '....',
    ),
    emptyBoard
  ))
  test('diagonal line', () => expectBoardSequence(
    testBoard(
      '...#.',
      '..#..',
      '.#...',
    ),
    testBoard(
      '.....',
      '..#..',
      '.....',
    ),
    emptyBoard
  ))
  test('rotated-i', () => expectBoardSequence(
    testBoard(
      '......',
      '.#....',
      '..###.',
      '......',
    ),
    testBoard(
      '......',
      '..##..',
      '..##..',
      '...#..',
    ),
    testBoard(
      '......',
      '..##..',
      '....#.',
      '..##..',
    ),
    testBoard(
      '......',
      '...#..',
      '....#.',
      '...#..',
    ),
    testBoard(
      '......',
      '......',
      '...##.',
      '......',
    ),
    emptyBoard
  ))
})

describe('still-life', () => {

  test('empty board', () => expectNotChanging(
    emptyBoard
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
  livingCells: Set(
    rows.flatMap((row, rowIndex) =>
      [...row].map((c, colIndex) => [c, colIndex] as const)
        .filter(([c]) => c === '#')
        .map(([_, colIndex]) => coordinate({ x: rowIndex, y: colIndex }))
    )
  )
})

const emptyBoard = infinite2dBoard({ livingCells: Set<Coordinate>() })
