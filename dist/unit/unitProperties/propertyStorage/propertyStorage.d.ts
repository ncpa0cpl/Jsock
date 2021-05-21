import type { UnitProperty } from "..";
export declare function unitPropertyStorage(handlePropertyChange: () => void): {
    reset: () => void;
    next: () => UnitProperty<unknown>;
};
