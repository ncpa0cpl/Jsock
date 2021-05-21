import type { UnitPropertyStorage } from "../unitProperties";
import type { UnitSideEffects } from "../unitSideEffects";
import type { UnitScopeData } from ".";

export class UnitScope {
  private static scopeData: UnitScopeData | undefined;

  static with(data: UnitScopeData) {
    return {
      run<T>(fn: () => T): T {
        const prevData = UnitScope.scopeData;
        UnitScope.scopeData = data;
        const result = fn();
        UnitScope.scopeData = prevData;
        return result;
      },
    };
  }

  static getStorage(): UnitPropertyStorage {
    UnitScope.validateScopeExistence();
    return UnitScope.scopeData!.storage;
  }

  static getSideEffects(): UnitSideEffects {
    UnitScope.validateScopeExistence();
    return UnitScope.scopeData!.sideEffects;
  }

  static validateScopeExistence(): void {
    if (!UnitScope.scopeData) {
      throw new Error("Usage of hooks outside of unit body is forbidden.");
    }
  }
}
