/**
 * Creates a queue for executing actions, any action passed to the `exec()`
 * method will be executed after all previously passed actions are finished.
 */
export declare function actionQueue(): {
    exec: (action: () => void | Promise<void>) => void;
    readonly isRunning: boolean;
};
