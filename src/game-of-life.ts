import { EvolutionRule } from './evolution-rule.ts'
import { Board } from './board.ts'
import { generateSeq } from './ts-extensions.ts'

export const simulate = (rule: EvolutionRule, seed: Board) =>
  generateSeq(seed, (board) => board.evolve(rule))

