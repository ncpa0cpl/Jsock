import type { Widen } from "../types";
import type { Initializer } from "../unit";
export declare const isPropertyInterfaceSymbol: unique symbol;
export declare function isPropertyInterface(v: unknown): v is PropertyInterface<unknown>;
export declare type PropertyInterface<T> = {
    get(): Widen<T>;
    set(v: Initializer<Widen<T>>): void;
};
export declare function useProperty<T = undefined>(v: Initializer<Widen<T>>): PropertyInterface<T>;
