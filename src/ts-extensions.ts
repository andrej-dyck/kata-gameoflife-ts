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

export const omitFunctions = <T extends Record<PropertyKey, unknown>>(obj: T): Partial<T> => {
  const copy = { ...obj }
  for (const k of Object.keys(obj)) {
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    if (typeof copy[k] === 'function') delete copy[k]
  }
  return copy
}
