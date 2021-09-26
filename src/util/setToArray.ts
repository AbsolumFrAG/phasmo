export function setToArray<T>(set: Set<T>): T[] {
  const sink: T[] = [];
  set.forEach((v) => sink.push(v));
  return sink;
}
