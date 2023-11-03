import { describe, expect, test } from 'vitest'
import { conwaysOriginalRule } from './evolution-rule.ts'

describe('Conway\'s original rule', () => {

  test.each(
    [0, 1]
  )('any live cell with fewer than two live neighbours dies, as if caused by underpopulation; %n', (numberOfLiveNeighbours) =>
    expect(conwaysOriginalRule('alive', numberOfLiveNeighbours)).toBe('dead')
  )

  test.each(
    [2, 3]
  )('any live cell with two or three live neighbours lives on to the next generation; %n', (numberOfLiveNeighbours) =>
    expect(conwaysOriginalRule('alive', numberOfLiveNeighbours)).toBe('alive')
  )

  test.each(
    [4, 5, 6, 7, 8]
  )('any live cell with more than three live neighbours dies, as if by overpopulation; %n', (numberOfLiveNeighbours) =>
    expect(conwaysOriginalRule('alive', numberOfLiveNeighbours)).toBe('dead')
  )

  test('any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction', () =>
    expect(conwaysOriginalRule('dead', 3)).toBe('alive')
  )
})
