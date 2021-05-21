import { actionQueue } from "../libs";
import { unitPropertyStorage } from "./unitProperties";
import type { UnitScopeData } from "./unitScope";
import { UnitScope } from "./unitScope";
import { unitSideEffects } from "./unitSideEffects";

export function Unit<ARGS extends any[], R>(body: (...args: ARGS) => R) {
  return (...args: ARGS) => {
    const unitContainer = {};
    const runAction = actionQueue();

    const onPropertyChange = () => {
      run();
    };

    const storage = unitPropertyStorage(onPropertyChange);
    const sideEffects = unitSideEffects();

    const scopeData: UnitScopeData = { storage, sideEffects };

    const run = () =>
      runAction.exec(() =>
        UnitScope.with(scopeData).run(() => {
          storage.reset();
          const newBody = body(...args);
          sideEffects.runQueue();
          Object.assign(unitContainer, newBody);
        })
      );

    run();

    return unitContainer as Readonly<R>;
  };
}
