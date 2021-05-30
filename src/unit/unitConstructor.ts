import { actionQueue, limitedAction } from "../libs";
import { unitPropertyStorage } from "./unitProperties";
import type { UnitScope } from "./unitScopeManager";
import { UnitScopeManager } from "./unitScopeManager";

export const ON_STATE_UPDATE = Symbol("ON_STATE_UPDATE");

export function Unit<ARGS extends any[], R>(body: (...args: ARGS) => R) {
  return (...args: ARGS) => {
    const unitContainer = { [ON_STATE_UPDATE]: () => {} };
    const runAction = actionQueue();

    const propertyChangeHandler = limitedAction(() => {
      UnitScopeManager.deferAction(() => {
        run();
        unitContainer[ON_STATE_UPDATE]();
      });
    }, 1);

    const storage = unitPropertyStorage(() => propertyChangeHandler.call());

    const scopeData: UnitScope = { storage, sideEffects: [] };

    const run = () =>
      runAction.exec(() => {
        UnitScopeManager.with(scopeData).run(() => {
          propertyChangeHandler.reset();
          storage.reset();

          Object.assign(unitContainer, body(...args));
        });
      });

    run();

    return unitContainer as unknown as Readonly<R>;
  };
}
