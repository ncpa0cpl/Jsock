export function actionQueue() {
  const queue: Array<() => void> = [];
  let isRunning = false;

  const start = () => {
    isRunning = true;
  };

  const finish = () => {
    isRunning = false;
    while (true) {
      const nextAction = queue.shift();
      if (nextAction) exec(nextAction);
      else break;
    }
  };

  function exec(action: () => void) {
    if (isRunning) {
      queue.push(action);
      return;
    }
    start();
    action();
    finish();
  }

  return {
    exec,
    get isRunning() {
      return isRunning;
    },
  };
}
