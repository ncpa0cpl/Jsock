import type { UnitPropertyStorage } from "../unitProperties";
import type { UnitScope } from ".";
import { UnitScopeIllegalScopeAccess, UnitScopeValidationError } from "./Helpers/unitScopeErrors";

const EFFECT_SCOPE: UnitScope = {
  storage: {
    reset() {
      throw new UnitScopeIllegalScopeAccess();
    },
    next() {
      throw new UnitScopeIllegalScopeAccess();
    },
  },
  sideEffects: [],
};

export class UnitScopeManager {
  private static scopeStack: UnitScope[] = [];

  private static validateScopeExistence(): void {
    if (UnitScopeManager.scopeStack.length === 0) {
      throw new UnitScopeValidationError();
    }
  }

  private static enterScope(scope: UnitScope) {
    UnitScopeManager.scopeStack.push(scope);
  }

  private static leaveScope() {
    const scope = UnitScopeManager.scopeStack.pop();

    if (scope && scope.sideEffects.length > 0) {
      const effects = [...scope.sideEffects];
      scope.sideEffects.splice(0, scope.sideEffects.length);
      UnitScopeManager.executeSideEffects(effects);
    }
  }

  private static getScope() {
    UnitScopeManager.validateScopeExistence();
    return UnitScopeManager.scopeStack[UnitScopeManager.scopeStack.length - 1]!;
  }

  private static executeSideEffects(effects: Array<() => void>) {
    UnitScopeManager.with(EFFECT_SCOPE).run(() => {
      for (const action of effects) {
        action();
      }
    });
  }

  static with(scope: UnitScope) {
    return {
      run(fn: () => void) {
        UnitScopeManager.enterScope(scope);
        fn();
        UnitScopeManager.leaveScope();
      },
    };
  }

  static getStorage(): UnitPropertyStorage {
    return UnitScopeManager.getScope().storage;
  }

  static getSideEffects() {
    return UnitScopeManager.getScope().sideEffects;
  }

  static deferAction(action: () => void) {
    if (UnitScopeManager.scopeStack.length > 0) {
      UnitScopeManager.getSideEffects().push(action);
      return;
    }
    action();
  }
}
