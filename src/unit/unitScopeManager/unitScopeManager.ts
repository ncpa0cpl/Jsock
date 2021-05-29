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
};

export class UnitScopeManager {
  private static sideEffects: Array<() => void> = [];
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
    UnitScopeManager.scopeStack.pop();

    if (UnitScopeManager.scopeStack.length === 0 && UnitScopeManager.sideEffects.length > 0) {
      UnitScopeManager.executeSideEffects();
    }
  }

  private static getScope() {
    UnitScopeManager.validateScopeExistence();
    return UnitScopeManager.scopeStack[UnitScopeManager.scopeStack.length - 1]!;
  }

  private static executeSideEffects() {
    const effects = [...UnitScopeManager.sideEffects];
    UnitScopeManager.sideEffects = [];

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

  static deferAction(action: () => void) {
    if (UnitScopeManager.scopeStack.length > 0) {
      UnitScopeManager.sideEffects.push(action);
      return;
    }
    action();
  }
}
