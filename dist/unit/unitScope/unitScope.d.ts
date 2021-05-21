import type { UnitPropertyStorage } from "../unitProperties";
import type { UnitSideEffects } from "../unitSideEffects";
import type { UnitScopeData } from ".";
export declare class UnitScope {
  private static scopeData;
  static with(data: UnitScopeData): {
    run<T>(fn: () => T): T;
  };
  static getStorage(): UnitPropertyStorage;
  static getSideEffects(): UnitSideEffects;
  static validateScopeExistence(): void;
}
