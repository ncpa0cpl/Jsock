export declare const ON_STATE_UPDATE: unique symbol;
export declare function Unit<ARGS extends any[], R>(body: (...args: ARGS) => R): (...args: ARGS) => Readonly<R>;
