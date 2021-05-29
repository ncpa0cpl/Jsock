import type { UnitPropertyStorage } from "../unitProperties";
export interface UnitScope {
    storage: UnitPropertyStorage;
    sideEffects: Array<() => void>;
}
