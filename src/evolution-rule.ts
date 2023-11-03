export type Cell = 'alive' | 'dead'
export type EvolutionRule = (cell: Cell, numberOfLiveNeighbours: number) => Cell

export const conwaysOriginalRule: EvolutionRule = (cell, numberOfLiveNeighbours) => {
  const survivesWith = (n: number) => 2 <= n && n <= 3
  const bornWith = (n: number) => n === 3

  switch (cell) {
    case 'alive':
      return survivesWith(numberOfLiveNeighbours) ? 'alive' : 'dead'
    case 'dead':
      return bornWith(numberOfLiveNeighbours) ? 'alive' : 'dead'
  }
}

export const survives = (rule: EvolutionRule) => (numberOfLiveNeighbours: number) =>
  rule('alive', numberOfLiveNeighbours) === 'alive'

export const isBorn = (rule: EvolutionRule) => (numberOfLiveNeighbours: number) =>
  rule('dead', numberOfLiveNeighbours) === 'alive'
