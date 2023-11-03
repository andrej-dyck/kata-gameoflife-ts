import { EvolutionRule, isBorn, survives } from './evolution-rule.ts'
import { Record, Set } from 'immutable'
import { memoize } from './ts-extensions.ts'

export type Board = {
  evolve(rule: EvolutionRule): Board
}

export type Coordinate = Readonly<{ x: number, y: number }>
export const coordinate = Record<Coordinate>({ x: 0, y: 0 })

export type Infinite2dBoard = Board & { livingCells: Set<Coordinate> }

export const infinite2dBoard = (
  { livingCells }: Pick<Infinite2dBoard, 'livingCells'>
): Infinite2dBoard => {
  const liveNeighboursOf = (c: Coordinate) =>
    adjacentCells(c).count(n => livingCells.has(n))

  const survivingCells = (rule: EvolutionRule) =>
    livingCells.filter(c => survives(rule, liveNeighboursOf(c)))

  const adjacentDeadCells = () =>
    livingCells.flatMap(c => adjacentCells(c)).subtract(livingCells)

  const bornCells = (rule: EvolutionRule) =>
    adjacentDeadCells().filter(c => isBorn(rule, liveNeighboursOf(c)))

  return {
    livingCells,
    evolve: (rule: EvolutionRule) => infinite2dBoard({
      livingCells: survivingCells(rule).union(bornCells(rule))
    })
  }
}

const adjacentCells = memoize(({ x, y }: Coordinate) => Set<Coordinate>([
  coordinate({ x: x - 1, y: y - 1 }),
  coordinate({ x: x - 1, y: y }),
  coordinate({ x: x - 1, y: y + 1 }),
  coordinate({ x: x, y: y - 1 }),
  coordinate({ x: x, y: y + 1 }),
  coordinate({ x: x + 1, y: y - 1 }),
  coordinate({ x: x + 1, y: y }),
  coordinate({ x: x + 1, y: y + 1 }),
]))

