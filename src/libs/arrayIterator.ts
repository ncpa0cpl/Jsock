/**
 * Create a method for iterating over all elements of supplied array.
 *
 * @returns an object with `next()` method, every next call returns
 * consequntial array element, when reached the end of the array
 * returns undefined
 */
export function iterateOver<T extends any[]>(a: T) {
  const iterator = a[Symbol.iterator]();
  return {
    next(): T[number] {
      return iterator.next().value;
    },
  };
}
