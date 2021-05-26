/**
 * Create a method for iterating over all elements of supplied array.
 *
 * @returns an object with `next()` method, every next call returns
 * consequntial array element, when reached the end of the array
 * returns undefined
 */
export declare function iterateOver<T extends any[]>(a: T): {
    next(): T[number];
};
