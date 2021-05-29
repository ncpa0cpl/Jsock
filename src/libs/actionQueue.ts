/**
 * Creates a queue for executing actions, any action passed to the `exec()`
 * method will be executed after all previously passed actions are finished.
 */
export function actionQueue() {
  const queue: Array<() => void> = [];
  let isRunning = false;

  const start = () => {
    isRunning = true;
  };

  const finish = () => {
    isRunning = false;
  };

  const processQueue = () => {
    if (isRunning) {
      return;
    }
    start();
    while (true) {
      const nextAction = queue.shift();
      if (nextAction) nextAction();
      else break;
    }
    finish();
  };

  const exec = (action: () => void | Promise<void>) => {
    queue.push(action);
    processQueue();
  };

  return {
    exec,
    get isRunning() {
      return isRunning;
    },
  };
}
