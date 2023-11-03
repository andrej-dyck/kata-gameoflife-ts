import { EvolutionRule } from './evolution-rule.ts'
import { Board } from './board.ts'
import { Seq } from 'immutable'
import { generateSequence } from './ts-extensions.ts'

export const simulate = (rule: EvolutionRule, seed: Board): Seq<number, Board> =>
  Seq(generateSequence(seed, (board) => board.evolve(rule)))

