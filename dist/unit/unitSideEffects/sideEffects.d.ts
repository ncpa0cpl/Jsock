export declare function unitSideEffects(): {
  reset: () => void;
  addEffectToQueue: (action: () => void) => void;
  runQueue: () => void;
};
