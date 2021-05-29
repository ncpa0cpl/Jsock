import type { Widen } from "../types";
import type { Initializer } from "../unit";
export declare function useProperty<T = undefined>(v: Initializer<Widen<T>>): readonly [Widen<T>, (v: Initializer<Widen<T>>) => void];
