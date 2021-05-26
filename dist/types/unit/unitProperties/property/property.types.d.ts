import type { Initializer } from "..";
export interface UnitProperty<T = unknown> {
    value: T;
    set(v: Initializer<T>): void;
    init(v: Initializer<T>): void;
}
