/**
 * Creates an object providing a `call()` method which will execute the action passed as parameter.
 * `call()` can be executed only `limit` amount of times, after exceding the `limit` executing
 * `call()` will do nothing.
 *
 * Returned object also provides a `reset()` method which will reset the call counter,
 */
export function limitedAction<A extends any[], R>(action: (...args: A) => R, limit = 1) {
  const getLimitList = () => Array.from({ length: limit }, () => action);

  let limitList = getLimitList();

  const call = (...args: A) => {
    const action = limitList.pop() ?? (() => {});
    return action(...args);
  };

  /**
   * Reset the call counter making call() posiible to execute for `limit` amount of times.
   */
  const reset = () => {
    limitList = getLimitList();
  };

  return {
    call,
    reset,
  };
}
