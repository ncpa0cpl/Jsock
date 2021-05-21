export function unitSideEffects() {
  const effectQueue: Array<() => void> = [];
  const reset = () => {
    effectQueue.splice(0, effectQueue.length);
  };
  const addEffectToQueue = (action: () => void) => {
    effectQueue.push(action);
  };
  const runQueue = () => {
    while (true) {
      const action = effectQueue.shift();
      if (action) action();
      else break;
    }
  };
  return {
    reset,
    addEffectToQueue,
    runQueue
  };
}
