export function* simulate(rule: Rule, seed: Board): Iterable<Board> {
  while(true) yield seed
}

export const conwaysOriginalRule = {}

export type Rule = unknown
export type Board = unknown
