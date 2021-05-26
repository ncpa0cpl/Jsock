import { actionQueue, limitedAction } from "../libs";
import { unitPropertyStorage } from "./unitProperties";
import type { UnitScope } from "./unitScope";
import { UnitScopeManager } from "./unitScope";

export function Unit<ARGS extends any[], R>(body: (...args: ARGS) => R) {
  return (...args: ARGS) => {
    const unitContainer = {};
    const runAction = actionQueue();

    const propertyChangeHandler = limitedAction(() => {
      UnitScopeManager.deferAction(run);
    }, 1);

    const storage = unitPropertyStorage(() => propertyChangeHandler.call());

    const scopeData: UnitScope = { storage };

    const run = () =>
      runAction.exec(() =>
        UnitScopeManager.with(scopeData).run(() => {
          propertyChangeHandler.reset();
          storage.reset();

          Object.assign(unitContainer, body(...args));
        })
      );

    run();

    return unitContainer as Readonly<R>;
  };
}
