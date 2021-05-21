export declare function actionQueue(): {
    exec: (action: () => void) => void;
    readonly isRunning: boolean;
};
