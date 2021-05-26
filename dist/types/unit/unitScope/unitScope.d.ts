import type { UnitPropertyStorage } from "../unitProperties";
import type { UnitScope } from ".";
export declare class UnitScopeManager {
    private static sideEffects;
    private static scopeStack;
    private static validateScopeExistence;
    private static enterScope;
    private static leaveScope;
    private static getScope;
    private static executeSideEffects;
    static with(scope: UnitScope): {
        run(fn: () => void): void;
    };
    static getStorage(): UnitPropertyStorage;
    static deferAction(action: () => void): void;
}
