export function* generateSequence<T>(seed: T, next: (c: T) => T | undefined): Generator<T> {
  let n: T | undefined = seed
  while (!!n) {
    yield n
    n = next(n)
  }
}

export const take = <T>(sequence: Iterable<T>, n: number): readonly T[] => {
  const result: T[] = []
  let i = 0
  for (const item of sequence) {
    if (i >= n) break
    result.push(item)
    i++
  }
  return result
}
