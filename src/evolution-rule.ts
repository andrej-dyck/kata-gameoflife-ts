export type EvolutionRule = (cell: 'alive' | 'dead', numberOfLiveNeighbours: number) => 'alive' | 'dead'

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

