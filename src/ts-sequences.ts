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
