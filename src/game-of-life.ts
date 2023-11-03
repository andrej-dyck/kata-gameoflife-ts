import { EvolutionRule } from './evolution-rule.ts'

export function* simulate(rule: EvolutionRule, seed: Board): Iterable<Board> {
  while(true) yield seed
}

export type Board = unknown
