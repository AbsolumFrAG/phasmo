export function without<T>(arr: T[], ...args: T[]): T[] {
  return arr.filter((item) => !args.includes(item));
}

export function difference<T>(a: T[], b: T[]): T[] {
  return a.filter((x) => !b.includes(x));
}
