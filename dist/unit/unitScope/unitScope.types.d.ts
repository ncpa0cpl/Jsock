import type { UnitPropertyStorage } from "../unitProperties";
import type { UnitSideEffects } from "../unitSideEffects";
export interface UnitScopeData {
  storage: UnitPropertyStorage;
  sideEffects: UnitSideEffects;
}
