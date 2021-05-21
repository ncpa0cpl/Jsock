export declare function Unit<ARGS extends any[], R>(
  body: (...args: ARGS) => R
): (...args: ARGS) => Readonly<R>;
