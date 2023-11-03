import { EvolutionRule, survives } from './evolution-rule.ts'

export type Board = {
  evolve(rule: EvolutionRule): Board
}

export type Coordinate = { x: number, y: number }
export type Infinite2dBoard = Board & { livingCells: Set<Coordinate> }

export const infinite2dBoard = ({ livingCells }: Pick<Infinite2dBoard, 'livingCells'>): Infinite2dBoard => {
  // TODO survivingCells + bornCells

  return {
    livingCells,
    evolve: (rule: EvolutionRule) => infinite2dBoard({
      livingCells// : survivingCells + bornCells
    })
  }
}
