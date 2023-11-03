export function* generateSequence<T extends NonNullable<unknown>>(seed: T, next: (c: T) => T | undefined): Iterable<T> {
  let n: T | undefined = seed
  while (n) {
    yield n
    n = next(n)
  }
}

export function memoize<T, R>(f: (arg: T) => R): (arg: T) => R {
  const values = new Map<T, R>()
  return (arg) => {
    if(!values.has(arg)) {
      values.set(arg, f(arg))
    }
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return values.get(arg)!
  }
}
