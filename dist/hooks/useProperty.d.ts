import type { Initializer } from "../unit";
export declare function useProperty<T = undefined>(
  v: Initializer<T>
): readonly [T, (v: Initializer<T>) => void];
