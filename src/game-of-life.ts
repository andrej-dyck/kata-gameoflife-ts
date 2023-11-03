import { EvolutionRule } from './evolution-rule.ts'
import { Board } from './board.ts'
import { generateSequence } from './ts-extensions.ts'

export const simulate = (rule: EvolutionRule, seed: Board): Iterable<Board> =>
  generateSequence(seed, (board) => board.evolve(rule))

