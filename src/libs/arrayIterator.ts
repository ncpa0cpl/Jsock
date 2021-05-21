export function iterateOver<T extends any[]>(a: T) {
  const iterator = a[Symbol.iterator]();
  return {
    next(): T[number] {
      return iterator.next().value;
    }
  };
}
