/**
 * Creates an object providing a `call()` method which will execute the action passed as parameter.
 * `call()` can be executed only `limit` amount of times, after exceding the `limit` executing
 * `call()` will do nothing.
 *
 * Returned object also provides a `reset()` method which will reset the call counter,
 */
export declare function limitedAction<A extends any[], R>(action: (...args: A) => R, limit?: number): {
    call: (...args: A) => void | R;
    reset: () => void;
};
