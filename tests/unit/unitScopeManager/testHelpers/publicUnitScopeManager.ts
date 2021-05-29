import { UnitPropertyStorage, UnitScope, UnitScopeManager } from "../../../../src/unit";

interface PublicUnitScopeManager {
  sideEffects: Array<() => void>;
  scopeStack: UnitScope[];

  validateScopeExistence(): void;
  enterScope(scope: UnitScope): void;
  leaveScope(): void;
  getScope(): UnitScope;
  executeSideEffects(): void;
  with(scope: UnitScope): {
    run(fn: () => void): void;
  };
  getStorage(): UnitPropertyStorage;
  deferAction(action: () => void): void;
}

export const publicUnitScopeManager = UnitScopeManager as any as PublicUnitScopeManager;
